import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { discoverLeads } from "@/lib/agents/lead-discovery";
import { auditWebsite } from "@/lib/agents/website-auditor";
import { composeProspectingEmail } from "@/lib/agents/email-composer";
import {
  compactProspectionError,
  createProspectionBatch,
  getProspectionSlot,
  type ProspectionSlot,
  updateProspectionBatch,
} from "@/lib/prospection-batches";
import { htmlToTextFallback, sanitizeEmailSubject } from "@/lib/prospection-email";

// Ramp progressif (2026-07-13) : 5 → 12 par run × 2 runs/j = 24/j.
// Warmup domaine sûr (open rate ~52% = réputation saine), sous le plafond
// Resend Free (100/j). Palier suivant vers plus de volume = domaine d'envoi
// dédié + plan Resend Pro (voir mémoire projet). Réversible : remettre 5.
export const PROSPECTION_EMAILS_PER_RUN = 12;

const SCORE_THRESHOLD = 78; // Site trop bon = pas besoin de nous
const SCORE_MIN = 20;       // Site mort = pas de budget
const SEND_DELAY_MS = 400;

type ProspectBacklogRow = {
  id: string;
  businessName: string | null;
  website: string | null;
  email: string | null;
  emailSubject: string | null;
  emailBody: string | null;
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch";
}

function extractRootDomain(website: string) {
  return website.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split("?")[0].toLowerCase().trim();
}

async function delayAfterSend() {
  await new Promise((resolve) => setTimeout(resolve, SEND_DELAY_MS));
}

async function websiteAlreadySent(client: SupabaseClient, website: string, email?: string | null) {
  const domain = extractRootDomain(website);

  // Only block domains already contacted (sent/replied/clicked) — not rejected/analyzed
  const { data: byDomain } = await client
    .from("prospects")
    .select("id")
    .ilike("website", `%${domain}%`)
    .in("status", ["sent", "replied", "clicked"])
    .limit(1);
  if ((byDomain?.length ?? 0) > 0) return true;

  // Check by email — prevent same address getting multiple series
  if (email) {
    const { data: byEmail } = await client
      .from("prospects")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .in("status", ["sent", "replied", "clicked"])
      .limit(1);
    if ((byEmail?.length ?? 0) > 0) return true;
  }

  return false;
}

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY!);
}

async function sendProspectingEmail(
  resend: Resend,
  to: string,
  subject: string | null | undefined,
  html: string,
  textFallback: string,
) {
  const { error } = await resend.emails.send({
    from: "KAH Digital <contact@kah-digital.ch>",
    to,
    replyTo: "kahdigital42@gmail.com",
    subject: sanitizeEmailSubject(subject),
    html,
    text: textFallback || htmlToTextFallback(html),
  });
  if (error) throw new Error(error.message);
}

function rememberError(errors: string[], message: string) {
  errors.push(compactProspectionError(message));
}

async function sendBacklog(params: {
  supabase: SupabaseClient;
  resend: Resend;
  batchId: string | null;
  errors: string[];
  maxEmails: number;
}) {
  const { supabase, resend, batchId, errors, maxEmails } = params;
  let sent = 0;

  if (maxEmails <= 0) return sent;

  const { data: backlog, error } = await supabase
    .from("prospects")
    .select("id, businessName, website, email, emailSubject, emailBody")
    .eq("status", "analyzed")
    .eq("emailGuessed", false)
    .not("email", "is", null)
    .not("emailBody", "is", null)
    .order("createdAt", { ascending: true })
    .limit(maxEmails);

  if (error) {
    rememberError(errors, `Backlog query: ${error.message}`);
    await updateProspectionBatch(supabase, batchId, { sent, errors });
    return sent;
  }

  for (const prospect of (backlog ?? []) as ProspectBacklogRow[]) {
    if (sent >= maxEmails) break;

    try {
      if (!prospect.email || !prospect.emailBody) continue;

      await sendProspectingEmail(
        resend,
        prospect.email,
        prospect.emailSubject,
        prospect.emailBody,
        "",
      );

      await supabase
        .from("prospects")
        .update({ status: "sent", sentAt: new Date().toISOString() })
        .eq("id", prospect.id);

      sent++;
      await updateProspectionBatch(supabase, batchId, { sent, errors });
      console.log(`[prospection] backlog sent: ${prospect.businessName ?? prospect.website}`);
      await delayAfterSend();
    } catch (error) {
      rememberError(
        errors,
        `Backlog ${prospect.website ?? prospect.id}: ${error instanceof Error ? error.message : String(error)}`
      );
      await updateProspectionBatch(supabase, batchId, { sent, errors });
    }
  }

  return sent;
}

async function discoverAnalyzeAndSend(params: {
  supabase: SupabaseClient;
  resend: Resend;
  batchId: string | null;
  errors: string[];
  maxEmails: number;
  alreadySent: number;
  siteUrl: string;
}) {
  const { supabase, resend, batchId, errors, maxEmails, alreadySent, siteUrl } = params;
  let sent = 0;

  if (alreadySent >= maxEmails) return { found: 0, sent };

  const leads = await discoverLeads(maxEmails * 3);
  const found = leads.length;
  await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent, errors });
  console.log(`[prospection] ${found} leads discovered`);

  for (const lead of leads) {
    if (alreadySent + sent >= maxEmails) break;
    if (!lead.website) continue;

    try {
      if (await websiteAlreadySent(supabase, lead.website, lead.email)) continue;

      const audit = await auditWebsite(lead);
      if (!audit) {
        rememberError(errors, `Audit failed: ${lead.website}`);
        await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent + sent, errors });
        continue;
      }

      if (audit.score > SCORE_THRESHOLD) continue; // site trop bon, pas besoin de nous
      if (audit.score < SCORE_MIN) continue;        // site mort = pas de budget

      // Skip leads with generic/invalid business names
      const JUNK_NAMES = /^(accueil|home|index|pme|entreprise|société|company|website|site web|page d'accueil|welcome|bienvenue|lorem ipsum|test|demo|example|untitled|default|new page|\d+)$/i;
      if (!audit.businessName || JUNK_NAMES.test(audit.businessName.trim())) {
        rememberError(errors, `Junk businessName skipped: ${audit.businessName} (${lead.website})`);
        continue;
      }

      // Ne pas traiter les emails devinés (info@domain) — bounce élevé + réputation Brevo
      if (!lead.email || lead.emailGuessed) {
        await supabase.from("prospects").insert({
          businessName: audit.businessName,
          website: lead.website,
          email: lead.email ?? null,
          emailGuessed: true,
          sector: audit.sector,
          country: lead.country,
          language: audit.language,
          status: "no_email",
          audit: { score: audit.score, problems: audit.problems, recommendations: audit.recommendations },
        });
        continue;
      }

      const { data: prospect, error: insertError } = await supabase
        .from("prospects")
        .insert({
          businessName: audit.businessName,
          website: lead.website,
          email: lead.email,
          phone: lead.phone ?? null,
          emailGuessed: false,
          sector: audit.sector,
          country: lead.country,
          language: audit.language,
          screenshotUrl: audit.screenshotUrl,
          status: "analyzed",
          audit: {
            score: audit.score,
            problems: audit.problems,
            recommendations: audit.recommendations,
            estimatedPrice: audit.estimatedPrice,
            priceRange: audit.priceRange,
          },
        })
        .select()
        .single();

      if (insertError || !prospect) {
        rememberError(errors, `DB insert ${lead.website}: ${insertError?.message ?? "no prospect"}`);
        await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent + sent, errors });
        continue;
      }

      const email = await composeProspectingEmail(lead, audit, siteUrl, prospect.id as string);
      const emailSubject = sanitizeEmailSubject(email.subject);

      await supabase
        .from("prospects")
        .update({ emailSubject, emailBody: email.html })
        .eq("id", prospect.id);

      await sendProspectingEmail(resend, lead.email, emailSubject, email.html, email.textFallback);
      await supabase
        .from("prospects")
        .update({ status: "sent", sentAt: new Date().toISOString() })
        .eq("id", prospect.id);

      sent++;
      await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent + sent, errors });
      console.log(`[prospection] sent: ${lead.businessName} (${lead.email})`);
      await delayAfterSend();
    } catch (error) {
      rememberError(errors, `${lead.website}: ${error instanceof Error ? error.message : String(error)}`);
      await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent + sent, errors });
    }
  }

  return { found, sent };
}

export async function runProspectionBatch(
  options: { source?: "cron" | "manual"; maxEmails?: number; batchId?: string | null; slot?: ProspectionSlot } = {}
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY manquant");
  }

  const supabase = getSupabase();
  const resend = getResendClient();
  const slot = options.slot ?? getProspectionSlot();
  const batchId = typeof options.batchId === "undefined" ? await createProspectionBatch(supabase, slot) : options.batchId;
  const errors: string[] = [];
  const maxEmails = options.maxEmails ?? PROSPECTION_EMAILS_PER_RUN;
  let found = 0;
  let sent = 0;
  let backlogSent = 0;

  console.log(`[prospection:${options.source ?? "cron"}] start slot=${slot} max=${maxEmails} batch=${batchId ?? "none"}`);

  try {
    backlogSent = await sendBacklog({ supabase, resend, batchId, errors, maxEmails });
    sent += backlogSent;

    const discovery = await discoverAnalyzeAndSend({
      supabase,
      resend,
      batchId,
      errors,
      maxEmails,
      alreadySent: sent,
      siteUrl: getSiteUrl(),
    });

    found = discovery.found;
    sent += discovery.sent;

    await updateProspectionBatch(supabase, batchId, { found, sent, errors });
    return { ok: true, slot, found, sent, backlogSent, errors: errors.length, batchId };
  } catch (error) {
    rememberError(errors, `Critical: ${error instanceof Error ? error.message : String(error)}`);
    await updateProspectionBatch(supabase, batchId, { found, sent, errors });
    throw error;
  }
}
