import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { discoverLeads } from "@/lib/agents/lead-discovery";
import { auditWebsite } from "@/lib/agents/website-auditor";
import { composeProspectingEmail } from "@/lib/agents/email-composer";
import { getResendFromAddress } from "@/lib/mail";
import { Resend } from "resend";
import { waitUntil } from "@vercel/functions";

const FIRE_KEY = "KAH2026FIRE";
const EMAILS_PER_RUN = 25;
const SITE_URL = "https://kah-digital.ch";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

function extractDomain(website: string): string {
  return website.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].toLowerCase().trim();
}

async function alreadySent(supabase: ReturnType<typeof getSupabase>, website: string): Promise<boolean> {
  const d = extractDomain(website);
  const { data } = await supabase.from("prospects").select("id").ilike("website", `%${d}%`).not("status", "eq", "rejected").limit(1);
  return (data?.length ?? 0) > 0;
}

async function runBatch() {
  const supabase = getSupabase();
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const errors: string[] = [];
  let sent = 0;
  let found = 0;

  const leads = await discoverLeads(EMAILS_PER_RUN * 3);
  found = leads.length;

  for (const lead of leads) {
    if (sent >= EMAILS_PER_RUN) break;
    try {
      if (!lead.website || !lead.email) continue;
      if (await alreadySent(supabase, lead.website)) continue;

      const audit = await auditWebsite(lead);
      if (!audit || audit.score >= 60) continue;

      const { data: inserted } = await supabase.from("prospects").insert({
        businessName: lead.businessName, website: lead.website, email: lead.email,
        phone: lead.phone ?? null, country: lead.country, language: lead.language ?? "fr",
        sector: lead.sector ?? null, status: "analyzed",
        audit: { problems: audit.problems, recommendations: audit.recommendations, estimatedPrice: audit.estimatedPrice, priceRange: audit.priceRange, score: audit.score },
      }).select("id").single();
      if (!inserted?.id) continue;

      const composed = await composeProspectingEmail(lead, audit, SITE_URL, inserted.id);
      const { error } = await resend.emails.send({
        from: getResendFromAddress(),
        to: lead.email,
        replyTo: "kahdigital42@gmail.com",
        subject: composed.subject,
        html: composed.html,
        tags: [{ name: "prospect_id", value: inserted.id }],
      });
      if (error) throw new Error(error.message);

      await supabase.from("prospects").update({ status: "sent", sentAt: new Date().toISOString(), emailSubject: composed.subject, emailBody: composed.html }).eq("id", inserted.id);
      sent++;
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err) {
      errors.push(`${lead.website}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  await supabase.from("prospect_batches").insert({ slot: "fire", found, sent, errors });
  console.log(`[fire] Batch terminé: ${sent}/${found} envoyés, ${errors.length} erreurs`);
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== FIRE_KEY) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  waitUntil(runBatch());
  return NextResponse.json({ ok: true, message: "Batch lancé en background. Résultats dans /admin/prospection." });
}
