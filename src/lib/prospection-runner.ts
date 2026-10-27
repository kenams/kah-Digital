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
import { isPlaceholderEmail, isProspectableLead } from "@/lib/prospect-email-guard";
import { assertSendable, checkSendable, SendBlockedError } from "@/lib/prospect-send-gate";
import { getSendBudget } from "@/lib/prospection-safety";
import { sendAdminNotification } from "@/lib/gmail";

// Ramp progressif (2026-07-13) : 5 → 12 par run × 2 runs/j = 24/j.
// Warmup domaine sûr (open rate ~52% = réputation saine), sous le plafond
// Resend Free (100/j). Palier suivant vers plus de volume = domaine d'envoi
// dédié + plan Resend Pro (voir mémoire projet). Réversible : remettre 5.
export const PROSPECTION_EMAILS_PER_RUN = 4; // peu mais sûr : 2 runs/jour, plafond journalier dans prospection-safety.ts

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

  // Domaine déjà contacté (sent/replied/clicked). Match par sous-chaîne : au pire
  // on saute un lead, jamais grave. On n'y met PAS "rejected" pour éviter qu'un
  // opt-out (potentiellement déclenché par un scanner d'e-mails qui suit le lien
  // de désinscription) ne balaie des domaines voisins par simple sous-chaîne.
  const { data: byDomain } = await client
    .from("prospects")
    .select("id")
    .ilike("website", `%${domain}%`)
    .in("status", ["sent", "replied", "clicked"])
    .limit(1);
  if ((byDomain?.length ?? 0) > 0) return true;

  // Domaine d'un prospect qui s'est désinscrit ou a rebondi : comparaison EXACTE du
  // domaine racine (pas de sous-chaîne, pour ne pas balayer des domaines voisins).
  const { data: rejectedSites } = await client
    .from("prospects")
    .select("website")
    .ilike("website", `%${domain}%`)
    .eq("status", "rejected")
    .limit(20);
  if ((rejectedSites ?? []).some((r) => extractRootDomain(String(r.website ?? "")) === domain)) return true;

  // Par e-mail (match EXACT) : empêche plusieurs séries sur la même adresse ET
  // re-prospecter une personne qui s'est désinscrite (status='rejected').
  if (email) {
    const { data: byEmail } = await client
      .from("prospects")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .in("status", ["sent", "replied", "clicked", "rejected"])
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
  prospectId: string | undefined,
  ctx: { website: string | null; businessName: string | null },
) {
  if (isPlaceholderEmail(to)) throw new Error(`Adresse non prospectable: ${to}`);
  await assertSendable({ to, website: ctx.website, businessName: ctx.businessName, subject, html });
  const { error } = await resend.emails.send({
    from: "KAH Digital <contact@kah-digital.ch>",
    to,
    replyTo: "kahdigital42@gmail.com",
    subject: sanitizeEmailSubject(subject),
    html,
    text: textFallback || htmlToTextFallback(html),
    tags: prospectId ? [{ name: "prospect_id", value: prospectId }] : undefined,
  });
  if (error) throw new Error(error.message);
}

function rememberError(errors: string[], message: string) {
  errors.push(compactProspectionError(message));
}

export type DryRunItem = {
  to: string;
  website: string;
  businessName: string;
  subject: string;
  problems: string[];
  score: number;
  verdict: string;
  html: string;
};

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
        prospect.id,
        { website: prospect.website, businessName: prospect.businessName },
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
      if (error instanceof SendBlockedError) {
        console.log(`[prospection] backlog bloqué ${prospect.website}: ${error.reasons.join(", ")}`);
        await supabase.from("prospects").update({ status: "no_email" }).eq("id", prospect.id);
        continue;
      }
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
  deadline: number;
  dryRun?: boolean;
  preview?: DryRunItem[];
}) {
  const { supabase, resend, batchId, errors, maxEmails, alreadySent, siteUrl, deadline, dryRun, preview } = params;
  let sent = 0;

  if (alreadySent >= maxEmails) return { found: 0, sent };

  const leads = await discoverLeads(maxEmails * 3);
  const found = leads.length;
  await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent, errors });
  console.log(`[prospection] ${found} leads discovered`);

  for (const lead of leads) {
    if (alreadySent + sent >= maxEmails) break;
    // La fonction Vercel est tuée à 300 s : on s'arrête proprement avant.
    if (Date.now() > deadline) {
      rememberError(errors, "Budget temps atteint — run arrêté avant la fin de la liste");
      break;
    }
    if (!lead.website) continue;
    const fit = isProspectableLead(lead);
    if (!fit.ok) {
      console.log(`[prospection] skip ${lead.website}: ${fit.reason}`);
      continue;
    }

    let createdId: string | null = null;
    try {
      if (await websiteAlreadySent(supabase, lead.website, lead.email)) continue;

      const audit = await auditWebsite(lead);
      if (!audit) {
        console.log(`[prospection] skip ${lead.website}: injoignable ou rien de vérifiable à signaler`);
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

      if (dryRun) {
        // Simulation : on compose et on contrôle exactement comme en vrai, sans rien écrire ni envoyer.
        const fakeId = "00000000-0000-4000-8000-000000000000";
        const email = await composeProspectingEmail(lead, audit, siteUrl, fakeId);
        const subject = sanitizeEmailSubject(email.subject);
        const verdict = await checkSendable({ to: lead.email, website: lead.website, businessName: audit.businessName, subject, html: email.html });
        preview?.push({
          to: lead.email,
          website: lead.website,
          businessName: audit.businessName,
          subject,
          problems: audit.problems.map((p) => p.title),
          score: audit.score,
          verdict: verdict.ok ? "ENVOYABLE" : `BLOQUÉ: ${verdict.reasons.join(", ")}`,
          html: email.html,
        });
        if (verdict.ok) sent++;
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

      createdId = prospect.id as string;
      const email = await composeProspectingEmail(lead, audit, siteUrl, prospect.id as string);
      const emailSubject = sanitizeEmailSubject(email.subject);

      await supabase
        .from("prospects")
        .update({ emailSubject, emailBody: email.html })
        .eq("id", prospect.id);

      await sendProspectingEmail(resend, lead.email, emailSubject, email.html, email.textFallback, prospect.id as string, {
        website: lead.website,
        businessName: audit.businessName,
      });
      await supabase
        .from("prospects")
        .update({ status: "sent", sentAt: new Date().toISOString() })
        .eq("id", prospect.id);

      sent++;
      await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent + sent, errors });
      console.log(`[prospection] sent: ${lead.businessName} (${lead.email})`);
      await delayAfterSend();
    } catch (error) {
      if (error instanceof SendBlockedError) {
        // Bloqué par le contrôle final : rien n'est parti, on supprime la fiche créée pour ne pas la relancer.
        console.log(`[prospection] bloqué ${lead.website}: ${error.reasons.join(", ")}`);
        if (createdId) await supabase.from("prospects").delete().eq("id", createdId);
        continue;
      }
      rememberError(errors, `${lead.website}: ${error instanceof Error ? error.message : String(error)}`);
      await updateProspectionBatch(supabase, batchId, { found, sent: alreadySent + sent, errors });
    }
  }

  return { found, sent };
}

export async function runProspectionBatch(
  options: { source?: "cron" | "manual"; maxEmails?: number; batchId?: string | null; slot?: ProspectionSlot; dryRun?: boolean } = {}
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY manquant");
  }

  const dryRun = options.dryRun === true;
  const supabase = getSupabase();
  const resend = getResendClient();
  const slot = options.slot ?? getProspectionSlot();

  // Volume : plafond journalier, interrupteur manuel, coupe-circuit sur les rebonds.
  const budget = await getSendBudget(supabase, options.maxEmails ?? PROSPECTION_EMAILS_PER_RUN);
  if (!dryRun && budget.allowed <= 0) {
    console.warn(`[prospection] aucun envoi: ${budget.reason ?? "budget nul"}`);
    if (budget.paused) {
      void sendAdminNotification({
        subject: "⏸️ Prospection en pause",
        body: `<strong>La prospection ne part pas.</strong><br/>${budget.reason}<br/><br/>Plafond/jour : ${budget.cap} · envoyés aujourd'hui : ${budget.sentToday}`,
      }).catch(console.error);
    }
    return { ok: true, slot, found: 0, sent: 0, backlogSent: 0, errors: 0, batchId: null, skipped: budget.reason ?? "budget nul", paused: budget.paused };
  }

  const batchId = dryRun ? null : typeof options.batchId === "undefined" ? await createProspectionBatch(supabase, slot) : options.batchId;
  const errors: string[] = [];
  const maxEmails = dryRun ? (options.maxEmails ?? PROSPECTION_EMAILS_PER_RUN) : budget.allowed;
  const runStartedAt = Date.now();
  const preview: DryRunItem[] = [];
  let found = 0;
  let sent = 0;
  let backlogSent = 0;

  console.log(`[prospection:${options.source ?? "cron"}] start slot=${slot} max=${maxEmails} (jour ${budget.sentToday}/${budget.cap}) dry=${dryRun} batch=${batchId ?? "none"}`);

  try {
    if (!dryRun) {
      backlogSent = await sendBacklog({ supabase, resend, batchId, errors, maxEmails });
      sent += backlogSent;
    }

    const discovery = await discoverAnalyzeAndSend({
      supabase,
      resend,
      batchId,
      errors,
      maxEmails,
      alreadySent: sent,
      siteUrl: getSiteUrl(),
      deadline: runStartedAt + 250_000,
      dryRun,
      preview,
    });

    found = discovery.found;
    sent += discovery.sent;

    await updateProspectionBatch(supabase, batchId, { found, sent, errors });

    if (!dryRun && sent > 0) {
      const { data: rows } = await supabase
        .from("prospects")
        .select("id, businessName, website, email, emailSubject")
        .gte("sentAt", new Date(runStartedAt).toISOString())
        .order("sentAt", { ascending: true });
      const list = (rows ?? [])
        .map((r) => `<li><strong>${r.businessName}</strong> — ${r.email}<br/><span style="color:#6b7280;">${r.emailSubject}</span> · <a href="${getSiteUrl()}/p/${r.id}">sa page</a></li>`)
        .join("");
      void sendAdminNotification({
        subject: `📤 Prospection : ${sent} mail(s) envoyé(s)`,
        body: `<strong>${sent} envoi(s)</strong> sur ${found} lead(s) étudiés — aujourd'hui ${budget.sentToday + sent}/${budget.cap}.<ul>${list}</ul>${errors.length ? `<p style="color:#b45309;">Avertissements : ${errors.join(" | ")}</p>` : ""}`,
      }).catch(console.error);
    }

    return { ok: true, slot, found, sent, backlogSent, errors: errors.length, batchId, ...(dryRun ? { dryRun: true, preview } : {}) };
  } catch (error) {
    rememberError(errors, `Critical: ${error instanceof Error ? error.message : String(error)}`);
    await updateProspectionBatch(supabase, batchId, { found, sent, errors });
    throw error;
  }
}
