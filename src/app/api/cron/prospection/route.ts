/**
 * Cron Route — Prospection autonome 3x/jour
 * Schedule : 07:00 / 11:00 / 17:00 UTC (voir vercel.json)
 * Chaque run : trouve 5 leads → audite → génère email → envoie depuis Gmail
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { discoverLeads } from "@/lib/agents/lead-discovery";
import { auditWebsite } from "@/lib/agents/website-auditor";
import { composeProspectingEmail } from "@/lib/agents/email-composer";
import { sendGmail } from "@/lib/gmail";

const EMAILS_PER_RUN = 5;

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
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app";
}

// Vérifie si ce prospect existe déjà (anti-doublon par website)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function websiteAlreadySent(supabase: any, website: string): Promise<boolean> {
  const normalized = website.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const { data } = await supabase
    .from("prospects")
    .select("id")
    .ilike("website", `%${normalized}%`)
    .not("status", "eq", "rejected")
    .limit(1);
  return (data?.length ?? 0) > 0;
}

export async function POST(req: Request) {
  // Vérification du secret Vercel Cron ou clé admin
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const slot = getSlot();
  const siteUrl = getSiteUrl();
  const batchErrors: string[] = [];
  let sent = 0;
  let found = 0;

  console.log(`[cron:prospection] Démarrage slot=${slot}`);

  try {
    // 1. Découverte des leads
    const leads = await discoverLeads(EMAILS_PER_RUN * 2); // On découvre 2x pour avoir des doublons filtrables
    found = leads.length;
    console.log(`[cron:prospection] ${found} leads découverts`);

    for (const lead of leads) {
      if (sent >= EMAILS_PER_RUN) break;
      if (!lead.email && !lead.website) continue;

      try {
        // Anti-doublon
        const alreadySent = await websiteAlreadySent(supabase, lead.website);
        if (alreadySent) {
          console.log(`[cron:prospection] Skip doublon: ${lead.website}`);
          continue;
        }

        // 2. Audit du site (Claude)
        console.log(`[cron:prospection] Audit: ${lead.website}`);
        const audit = await auditWebsite(lead);
        if (!audit) {
          batchErrors.push(`Audit échoué: ${lead.website}`);
          continue;
        }

        // Skip les bons sites (score > 65)
        if (audit.score > 65) {
          console.log(`[cron:prospection] Skip site trop bon: ${lead.website} score=${audit.score}`);
          continue;
        }

        // 3. Création du prospect en DB (génère trackingId)
        const { data: prospect, error: insertErr } = await supabase
          .from("prospects")
          .insert({
            businessName: audit.businessName,
            website: lead.website,
            email: lead.email ?? null,
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

        if (insertErr || !prospect) {
          batchErrors.push(`DB insert échoué: ${lead.website}`);
          continue;
        }

        // 4. Composition de l'email (Claude Haiku — plus rapide)
        const email = await composeProspectingEmail(lead, audit, siteUrl, prospect.id as string);

        // Mise à jour du prospect avec l'email
        await supabase.from("prospects").update({
          emailSubject: email.subject,
          emailBody: email.html,
        }).eq("id", prospect.id);

        // 5. Envoi Gmail
        // Si pas d'email trouvé via Places, on ne peut pas envoyer — on garde en "analyzed" pour review admin
        if (!lead.email) {
          console.log(`[cron:prospection] Pas d'email pour ${lead.businessName} — en attente review admin`);
          continue;
        }

        await sendGmail({
          to: lead.email,
          subject: email.subject,
          html: email.html,
          text: email.textFallback,
          replyTo: "kahdigital42@gmail.com",
        });

        // 6. Mise à jour status → sent
        await supabase.from("prospects").update({
          status: "sent",
          sentAt: new Date().toISOString(),
        }).eq("id", prospect.id);

        sent++;
        console.log(`[cron:prospection] ✅ Envoyé à ${lead.businessName} (${lead.email})`);

        // Délai anti-spam entre emails (2s)
        await new Promise((r) => setTimeout(r, 2000));

      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        batchErrors.push(`${lead.website}: ${msg}`);
        console.error(`[cron:prospection] Erreur pour ${lead.website}:`, msg);
      }
    }

    // 7. Log du batch
    await supabase.from("prospect_batches").insert({
      slot,
      found,
      sent,
      errors: batchErrors,
    });

    return NextResponse.json({
      ok: true,
      slot,
      found,
      sent,
      errors: batchErrors.length,
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cron:prospection] Erreur critique:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// GET pour test manuel depuis le dashboard
export async function GET(req: Request) {
  return POST(req);
}
