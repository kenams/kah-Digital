import { cleanUrl } from "@/lib/clean-url";
import { waitUntil } from "@vercel/functions";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auditWebsite } from "@/lib/agents/website-auditor";
import { sendAdminNotification } from "@/lib/gmail";
import { Resend } from "resend";
import { getResendFromAddress } from "@/lib/mail";
import { isValidEmail } from "@/lib/html-escape";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const maxDuration = 120;

function esc(value: unknown) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

type DeliveredAudit = {
  score: number;
  problems: Array<{ title: string; detail: string }>;
  recommendations: Array<{ title: string; detail: string }>;
  priceRange?: string;
};

// Le visiteur a demandé un audit : il reçoit le rapport (score, points faibles,
// recommandations) et le lien vers sa page d'audit, pas un mail de prospection.
function buildAuditDeliveryEmail(name: string, audit: DeliveredAudit, reportUrl: string, quoteUrl: string) {
  const problems = audit.problems.slice(0, 5).map((p) => `<li style="margin-bottom:8px;"><strong>${esc(p.title)}</strong><br/><span style="color:#6b7280;">${esc(p.detail)}</span></li>`).join("");
  const recos = audit.recommendations.slice(0, 3).map((r) => `<li style="margin-bottom:8px;"><strong>${esc(r.title)}</strong><br/><span style="color:#6b7280;">${esc(r.detail)}</span></li>`).join("");
  const subject = `Votre audit gratuit — ${name} : ${audit.score}/100`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;color:#374151;font-size:15px;line-height:1.7;">
<p>Bonjour,</p>
<p>Voici l'audit gratuit de <strong>${esc(name)}</strong> que vous avez demandé sur kah-digital.ch.</p>
<p style="font-size:22px;margin:16px 0;"><strong>Score : ${audit.score}/100</strong></p>
<p><strong>Points à améliorer</strong></p><ul style="padding-left:20px;">${problems}</ul>
<p><strong>Nos recommandations</strong></p><ul style="padding-left:20px;">${recos}</ul>
${audit.priceRange ? `<p>Budget indicatif : <strong>${esc(audit.priceRange)}</strong></p>` : ""}
<p><a href="${reportUrl}" style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;">Voir mon rapport complet</a></p>
<p>Une question ? Répondez simplement à cet email, je lis tous les messages. Pour un devis : <a href="${quoteUrl}">${quoteUrl}</a></p>
<p style="margin-top:24px;">KAH Digital Studio<br/><span style="color:#6b7280;font-size:13px;">kahdigital42@gmail.com · 07 59 55 84 14</span></p>
</div>`;
  const NL = String.fromCharCode(10);
  const bullets = audit.problems.slice(0, 5).map((p) => `- ${p.title}`).join(NL);
  const text = ["Bonjour,", "", `Voici l'audit gratuit de ${name} : score ${audit.score}/100.`, "", "Points à améliorer :", bullets, "", `Rapport complet : ${reportUrl}`, `Devis : ${quoteUrl}`, "", "KAH Digital Studio"].join(NL);
  return { subject, html, text };
}

export async function POST(req: Request) {
  try {
    // Endpoint public qui lance un audit (téléchargement d'un site, IA) et envoie un e-mail : on limite l'abus.
    const rate = rateLimit(`audit-gratuit:${getRequestIp(req)}`, { windowMs: 60 * 60 * 1000, max: 5 });
    if (!rate.allowed) {
      return NextResponse.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
    }
    const { businessName, website, email, phone } = await req.json() as {
      businessName?: string; website?: string; email: string; phone?: string;
    };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const siteUrl = (cleanUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://kah-digital.ch").trim();
    const supabase = getSupabase();

    // Vérifie si déjà prospecté
    const { data: existing } = await supabase
      .from("prospects")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({ ok: true, message: "Already queued" });
    }

    const siteWebsite = website?.trim() || null;

    // Insert prospect avec statut "inbound"
    const { data: inserted } = await supabase
      .from("prospects")
      .insert({
        businessName: businessName || null,
        website: siteWebsite,
        email,
        phone: phone || null,
        status: siteWebsite ? "inbound" : "no-website",
        language: "fr",
        country: "FR",
        sentAt: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (!inserted) {
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    const prospectId = inserted.id;

    // Prévient l'équipe : un visiteur vient de demander un audit.
    await sendAdminNotification({
      subject: `🔎 AUDIT GRATUIT — ${esc(businessName || email)}`,
      body: `<strong>Nouvelle demande d'audit gratuit</strong><br/><br/>Entreprise : ${esc(businessName) || "?"}<br/>Site : ${esc(siteWebsite) || "aucun"}<br/>Email : ${esc(email)}<br/>Téléphone : ${esc(phone) || "non renseigné"}`,
    }).catch(console.error);

    // Si pas de site web, on stocke juste le lead et on notifie
    if (!siteWebsite) {
      return NextResponse.json({ ok: true });
    }

    // Sur Vercel, une promesse non rattachée est gelée dès la réponse envoyée :
    // waitUntil garde la fonction vivante jusqu'à l'envoi de l'audit.
    waitUntil((async () => {
      try {
        const lead = {
          businessName: businessName || siteWebsite,
          website: siteWebsite,
          address: "FR",
          country: "FR",
          language: "fr",
          sector: "inbound",
          placeId: prospectId,
          email,
          phone: phone || null,
          emailGuessed: false,
        };

        const audit = await auditWebsite(lead);
        if (!audit) return;

        await supabase.from("prospects").update({ audit, sector: audit.sector }).eq("id", prospectId);

        const displayName = businessName || siteWebsite;
        const composed = buildAuditDeliveryEmail(displayName, audit, `${siteUrl}/p/${prospectId}`, `${siteUrl}/devis?ref=audit`);

        const resend = new Resend(process.env.RESEND_API_KEY!);
        await resend.emails.send({
          from: getResendFromAddress(),
          to: email,
          replyTo: "kahdigital42@gmail.com",
          subject: composed.subject,
          html: composed.html,
          text: composed.text,
          tags: [{ name: "prospect_id", value: prospectId }],
        });

        await supabase.from("prospects").update({ status: "sent", emailSubject: composed.subject }).eq("id", prospectId);
      } catch (err) {
        console.error("[audit-gratuit:background]", err);
      }
    })());

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
