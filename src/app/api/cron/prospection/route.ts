/**
 * Cron Route — Prospection autonome 3x/jour
 * Schedule : 07:00 / 11:00 / 17:00 UTC (voir vercel.json)
 * Flux : découverte → audit → email → envoi + backlog auto-send
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { discoverLeads } from "@/lib/agents/lead-discovery";
import { auditWebsite } from "@/lib/agents/website-auditor";
import { composeProspectingEmail } from "@/lib/agents/email-composer";
import { getResendFromAddress } from "@/lib/mail";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function sendProspectingEmail(to: string, subject: string, html: string, textFallback: string, prospectId?: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) throw new Error("RESEND_API_KEY manquant");
  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: getResendFromAddress(),
    to,
    replyTo: "kahdigital42@gmail.com",
    subject,
    html,
    text: textFallback || html.replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, 500),
    ...(prospectId ? { tags: [{ name: "prospect_id", value: prospectId }] } : {}),
  });
  if (error) throw new Error(error.message);
}

const EMAILS_PER_RUN = 25;   // 25 × 12 slots = 300 emails/jour
const SCORE_THRESHOLD = 60;  // Sites avec score < 60 sont prospectés

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function getSlot(): "morning" | "noon" | "evening" {
  const h = new Date().getUTCHours();
  if (h < 10) return "morning";
  if (h < 14) return "noon";
  return "evening";
}

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch";
}

function extractRootDomain(website: string): string {
  return website.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].split("?")[0].toLowerCase().trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function websiteAlreadySent(supabase: any, website: string): Promise<boolean> {
  const domain = extractRootDomain(website);
  const { data } = await supabase
    .from("prospects")
    .select("id")
    .ilike("website", `%${domain}%`)
    .not("status", "eq", "rejected")
    .limit(1);
  return (data?.length ?? 0) > 0;
}

export async function POST(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  const hasCronSecret = cronSecret && authHeader === `Bearer ${cronSecret}`;
  if (!hasCronSecret) {
    try {
      const supabaseAuth = await createSupabaseServerClient();
      if (!supabaseAuth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const { data: { user } } = await supabaseAuth.auth.getUser();
      if (!user || !isAdminUser(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = getSupabase();
  const slot = getSlot();
  const siteUrl = getSiteUrl();
  const batchErrors: string[] = [];
  let sent = 0;
  let found = 0;
  let backlogSent = 0;

  console.log(`[cron:prospection] Démarrage slot=${slot} max=${EMAILS_PER_RUN}`);

  try {
    // ── 1. Nouveaux leads ────────────────────────────────────────────────────
    const leads = await discoverLeads(EMAILS_PER_RUN * 3); // 3x buffer
    found = leads.length;
    console.log(`[cron:prospection] ${found} leads découverts`);

    for (const lead of leads) {
      if (sent >= EMAILS_PER_RUN) break;
      if (!lead.website) continue;

      try {
        const alreadySent = await websiteAlreadySent(supabase, lead.website);
        if (alreadySent) continue;

        console.log(`[cron:prospection] Audit: ${lead.website}`);
        const audit = await auditWebsite(lead);
        if (!audit) { batchErrors.push(`Audit échoué: ${lead.website}`); continue; }

        if (audit.score > SCORE_THRESHOLD) {
          console.log(`[cron:prospection] Skip site OK: ${lead.website} score=${audit.score}`);
          continue;
        }

        const { data: prospect, error: insertErr } = await supabase
          .from("prospects")
          .insert({
            businessName: audit.businessName,
            website: lead.website,
            email: lead.email ?? null,
            phone: lead.phone ?? null,
            emailGuessed: lead.emailGuessed ?? false,
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

        if (insertErr || !prospect) { batchErrors.push(`DB insert: ${lead.website}`); continue; }

        const email = await composeProspectingEmail(lead, audit, siteUrl, prospect.id as string);

        await supabase.from("prospects").update({
          emailSubject: email.subject,
          emailBody: email.html,
        }).eq("id", prospect.id);

        if (!lead.email) {
          console.log(`[cron:prospection] Sans email: ${lead.businessName} — backlog`);
          continue;
        }

        await sendProspectingEmail(lead.email, email.subject, email.html, email.textFallback, prospect.id as string);
        await supabase.from("prospects").update({ status: "sent", sentAt: new Date().toISOString() }).eq("id", prospect.id);
        sent++;
        console.log(`[cron:prospection] ✅ ${lead.businessName} (${lead.email})`);
        await new Promise((r) => setTimeout(r, 2000));

      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        batchErrors.push(`${lead.website}: ${msg}`);
      }
    }

    // ── 2. Backlog : prospects analysés non encore envoyés ───────────────────
    // Récupère les anciens prospects avec email qui n'ont jamais été envoyés
    if (sent < EMAILS_PER_RUN) {
      const remaining = EMAILS_PER_RUN - sent;
      const { data: backlog } = await supabase
        .from("prospects")
        .select("id, businessName, website, email, emailSubject, emailBody")
        .eq("status", "analyzed")
        .not("email", "is", null)
        .not("emailBody", "is", null)
        .order("createdAt", { ascending: true })
        .limit(remaining);

      for (const p of (backlog ?? [])) {
        if (sent >= EMAILS_PER_RUN) break;
        try {
          await sendProspectingEmail(
            p.email!,
            p.emailSubject ?? "Analyse de votre site web — KAH-Digital",
            p.emailBody!,
            ""
          );
          await supabase.from("prospects")
            .update({ status: "sent", sentAt: new Date().toISOString() })
            .eq("id", p.id);
          sent++;
          backlogSent++;
          console.log(`[cron:prospection] 📦 Backlog envoyé: ${p.businessName} (${p.email})`);
          await new Promise((r) => setTimeout(r, 2000));
        } catch (err) {
          batchErrors.push(`Backlog ${p.website ?? p.id}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
    }

    // ── 3. Log du batch ──────────────────────────────────────────────────────
    await supabase.from("prospect_batches").insert({ slot, found, sent, errors: batchErrors });

    return NextResponse.json({ ok: true, slot, found, sent, backlogSent, errors: batchErrors.length });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cron:prospection] Erreur critique:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
