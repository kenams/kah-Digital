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

type AuditLocale = "fr" | "en" | "de";

const MAIL_COPY: Record<AuditLocale, {
  subject: (name: string, score: number) => string; hello: string; intro: (name: string) => string; score: string;
  problems: string; recos: string; budget: string; cta: string; question: string;
  text: { intro: (name: string, score: number) => string; problems: string; report: string; quote: string };
  ackSubject: string; ackBody: (name: string) => string; quotePath: string;
}> = {
  fr: {
    subject: (n, sc) => `Votre audit gratuit — ${n} : ${sc}/100`, hello: "Bonjour,",
    intro: (n) => `Voici l'audit gratuit de <strong>${n}</strong> que vous avez demandé sur kah-digital.ch.`, score: "Score",
    problems: "Points à améliorer", recos: "Nos recommandations", budget: "Budget indicatif", cta: "Voir mon rapport complet",
    question: "Une question ? Répondez simplement à cet email, je lis tous les messages. Pour un devis :",
    text: { intro: (n, sc) => `Voici l'audit gratuit de ${n} : score ${sc}/100.`, problems: "Points à améliorer :", report: "Rapport complet", quote: "Devis" },
    ackSubject: "Votre demande d'audit gratuit est bien reçue",
    ackBody: (n) => `Nous avons bien reçu votre demande d'audit pour <strong>${n}</strong>. Nous analysons votre site et revenons vers vous personnellement sous 24 h.`,
    quotePath: "/devis?ref=audit",
  },
  en: {
    subject: (n, sc) => `Your free audit — ${n}: ${sc}/100`, hello: "Hello,",
    intro: (n) => `Here is the free audit of <strong>${n}</strong> you requested on kah-digital.ch.`, score: "Score",
    problems: "Areas to improve", recos: "Our recommendations", budget: "Indicative budget", cta: "View my full report",
    question: "Any question? Simply reply to this email, I read every message. For a quote:",
    text: { intro: (n, sc) => `Here is the free audit of ${n}: score ${sc}/100.`, problems: "Areas to improve:", report: "Full report", quote: "Quote" },
    ackSubject: "We received your free audit request",
    ackBody: (n) => `We received your audit request for <strong>${n}</strong>. We are reviewing your site and will get back to you personally within 24 hours.`,
    quotePath: "/en/devis?ref=audit",
  },
  de: {
    subject: (n, sc) => `Ihr kostenloses Audit — ${n}: ${sc}/100`, hello: "Guten Tag,",
    intro: (n) => `Hier ist das kostenlose Audit von <strong>${n}</strong>, das Sie auf kah-digital.ch angefordert haben.`, score: "Bewertung",
    problems: "Verbesserungspunkte", recos: "Unsere Empfehlungen", budget: "Richtbudget", cta: "Vollständigen Bericht ansehen",
    question: "Eine Frage? Antworten Sie einfach auf diese E-Mail, ich lese jede Nachricht. Für eine Offerte:",
    text: { intro: (n, sc) => `Hier ist das kostenlose Audit von ${n}: Bewertung ${sc}/100.`, problems: "Verbesserungspunkte:", report: "Vollständiger Bericht", quote: "Offerte" },
    ackSubject: "Ihre Anfrage für das kostenlose Audit ist eingegangen",
    ackBody: (n) => `Wir haben Ihre Audit-Anfrage für <strong>${n}</strong> erhalten. Wir prüfen Ihre Website und melden uns innerhalb von 24 Stunden persönlich bei Ihnen.`,
    quotePath: "/de/devis?ref=audit",
  },
};

function mailShell(inner: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:560px;color:#374151;font-size:15px;line-height:1.7;">${inner}
<p style="margin-top:24px;">KAH Digital Studio<br/><span style="color:#6b7280;font-size:13px;">kahdigital42@gmail.com · 07 59 55 84 14</span></p>
</div>`;
}

// Le visiteur a demandé un audit : il reçoit le rapport (score, points faibles,
// recommandations) et le lien vers sa page d'audit, pas un mail de prospection.
function buildAuditDeliveryEmail(locale: AuditLocale, name: string, audit: DeliveredAudit, reportUrl: string, siteUrl: string) {
  const c = MAIL_COPY[locale];
  const quoteUrl = `${siteUrl}${c.quotePath}`;
  const problems = audit.problems.slice(0, 5).map((p) => `<li style="margin-bottom:8px;"><strong>${esc(p.title)}</strong><br/><span style="color:#6b7280;">${esc(p.detail)}</span></li>`).join("");
  const recos = audit.recommendations.slice(0, 3).map((r) => `<li style="margin-bottom:8px;"><strong>${esc(r.title)}</strong><br/><span style="color:#6b7280;">${esc(r.detail)}</span></li>`).join("");
  const subject = c.subject(name, audit.score);
  const html = mailShell(`
<p>${c.hello}</p>
<p>${c.intro(esc(name))}</p>
<p style="font-size:22px;margin:16px 0;"><strong>${c.score} : ${audit.score}/100</strong></p>
<p><strong>${c.problems}</strong></p><ul style="padding-left:20px;">${problems}</ul>
<p><strong>${c.recos}</strong></p><ul style="padding-left:20px;">${recos}</ul>
${audit.priceRange ? `<p>${c.budget} : <strong>${esc(audit.priceRange)}</strong></p>` : ""}
<p><a href="${reportUrl}" style="display:inline-block;background:#4f46e5;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:700;">${c.cta}</a></p>
<p>${c.question} <a href="${quoteUrl}">${quoteUrl}</a></p>`);
  const NL = String.fromCharCode(10);
  const bullets = audit.problems.slice(0, 5).map((p) => `- ${p.title}`).join(NL);
  const text = [c.hello, "", c.text.intro(name, audit.score), "", c.text.problems, bullets, "", `${c.text.report} : ${reportUrl}`, `${c.text.quote} : ${quoteUrl}`, "", "KAH Digital Studio"].join(NL);
  return { subject, html, text };
}

// Aucun constat fiable (site correct, déjà équipé, injoignable) : on accuse réception honnêtement au lieu de rester muet.
function buildAuditAckEmail(locale: AuditLocale, name: string) {
  const c = MAIL_COPY[locale];
  const NL = String.fromCharCode(10);
  const html = mailShell(`<p>${c.hello}</p><p>${c.ackBody(esc(name))}</p>`);
  const text = `${c.hello}${NL}${NL}${c.ackBody(name).replace(/<[^>]+>/g, "")}`;
  return { subject: c.ackSubject, html, text };
}

export async function POST(req: Request) {
  try {
    // Endpoint public qui lance un audit (téléchargement d'un site, IA) et envoie un e-mail : on limite l'abus.
    const rate = rateLimit(`audit-gratuit:${getRequestIp(req)}`, { windowMs: 60 * 60 * 1000, max: 5 });
    if (!rate.allowed) {
      return NextResponse.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
    }
    const { businessName, website, email, phone, locale: rawLocale } = await req.json() as {
      businessName?: string; website?: string; email: string; phone?: string; locale?: string;
    };
    const locale: AuditLocale = rawLocale === "en" || rawLocale === "de" ? rawLocale : "fr";

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
        language: locale,
        country: locale === "de" ? "CH" : "FR",
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
          address: locale === "de" ? "CH" : "FR",
          country: locale === "de" ? "CH" : "FR",
          language: locale,
          sector: "inbound",
          placeId: prospectId,
          email,
          phone: phone || null,
          emailGuessed: false,
        };

        const audit = await auditWebsite(lead);
        if (!audit) {
          const ack = buildAuditAckEmail(locale, businessName || siteWebsite);
          const resendAck = new Resend(process.env.RESEND_API_KEY!);
          await resendAck.emails.send({ from: getResendFromAddress(), to: email, replyTo: "kahdigital42@gmail.com", subject: ack.subject, html: ack.html, text: ack.text });
          return;
        }

        await supabase.from("prospects").update({ audit, sector: audit.sector }).eq("id", prospectId);

        const displayName = businessName || siteWebsite;
        const composed = buildAuditDeliveryEmail(locale, displayName, audit, `${siteUrl}/p/${prospectId}`, siteUrl);

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
