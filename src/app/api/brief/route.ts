import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { brandContact } from "@/config/brand";
import { sendAdminWhatsAppNotification } from "@/lib/admin-alerts";
import { renderBrandedEmail } from "@/lib/email-template";
import { getResendFromAddress } from "@/lib/mail";

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const notificationEmails = (process.env.QUOTE_NOTIFICATION_EMAIL ?? brandContact.email ?? "")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxPdfBytes = 4 * 1024 * 1024;
const rateConfig = { windowMs: 10 * 60 * 1000, max: 6 };

const fieldLabels = [
  { key: "company", fr: "Entreprise / Organisation", en: "Company / Organization" },
  { key: "contact", fr: "Contact principal", en: "Main contact" },
  { key: "email", fr: "Email / Téléphone", en: "Email / Phone" },
  { key: "goals", fr: "Objectifs principaux", en: "Main goals" },
  { key: "audience", fr: "Cible / utilisateurs", en: "Audience / users" },
  { key: "pages", fr: "Pages & fonctionnalités clés", en: "Key pages & features" },
  { key: "appPlatforms", fr: "Plateformes app mobile", en: "Mobile app platforms" },
  { key: "appFeatures", fr: "Fonctionnalités MVP", en: "MVP features" },
  { key: "style", fr: "Style visuel", en: "Visual style" },
  { key: "references", fr: "Références", en: "References" },
  { key: "budget", fr: "Budget", en: "Budget" },
  { key: "deadline", fr: "Deadline", en: "Deadline" },
  { key: "integrations", fr: "Intégrations / outils", en: "Integrations / tools" },
  { key: "notes", fr: "Notes", en: "Notes" },
];

type BriefFields = Record<string, string | undefined>;

function normalizeEmail(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(emailRegex);
  return match?.[0] ?? "";
}

function buildSummary(fields: BriefFields, locale: "fr" | "en") {
  return fieldLabels
    .map((item) => {
      const label = locale === "en" ? item.en : item.fr;
      const value = fields[item.key]?.trim() || "/";
      return `${label}: ${value}`;
    })
    .join("\n");
}

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const limit = rateLimit(`brief:${ip}`, rateConfig);
  const rateHeaders = getRateLimitHeaders(limit, rateConfig.max);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Trop de requêtes. Réessaie dans ${limit.retryAfter}s.` },
      { status: 429, headers: { ...rateHeaders, "Retry-After": String(limit.retryAfter) } }
    );
  }

  if (!resendClient) {
    return NextResponse.json({ error: "Service email indisponible" }, { status: 503, headers: rateHeaders });
  }

  try {
    const body = await request.json();
    const rawEmail = typeof body?.email === "string" ? body.email : "";
    const email = normalizeEmail(rawEmail);
    const locale = body?.locale === "en" ? "en" : "fr";
    const fields: BriefFields = typeof body?.fields === "object" && body?.fields ? body.fields : {};
    const pdfBase64 = typeof body?.pdfBase64 === "string" ? body.pdfBase64 : "";

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400, headers: rateHeaders });
    }

    if (!pdfBase64) {
      return NextResponse.json({ error: "PDF manquant" }, { status: 400, headers: rateHeaders });
    }

    const cleanBase64 = pdfBase64.includes(",") ? pdfBase64.split(",")[1] ?? "" : pdfBase64;
    const pdfBuffer = Buffer.from(cleanBase64, "base64");
    if (!pdfBuffer.length || pdfBuffer.length > maxPdfBytes) {
      return NextResponse.json({ error: "PDF trop volumineux" }, { status: 413, headers: rateHeaders });
    }

    const summary = buildSummary(fields, locale);
    const subject =
      locale === "en" ? "Your Kah-Digital project brief" : "Votre cahier des charges Kah-Digital";
    const text =
      locale === "en"
        ? `Hello,\n\nHere is your filled project brief. We will review it and get back to you shortly.\n\n${summary}\n\nOptional: premium AI modules are available (automation, chatbot, scoring).\n\nBest,\nKah-Digital`
        : `Bonjour,\n\nVoici votre cahier des charges rempli. Nous le consultons et revenons vers vous rapidement.\n\n${summary}\n\nOption : modules IA premium disponibles (automatisation, chatbot, scoring).\n\nBien à vous,\nKah-Digital`;
    const html = renderBrandedEmail({
      eyebrow: locale === "en" ? "Project brief" : "Cahier des charges",
      title: locale === "en" ? "Your brief is ready" : "Votre brief est prêt",
      intro:
        locale === "en"
          ? "We received your completed project brief. The PDF is attached and our team will review it shortly."
          : "Nous avons bien reçu votre cahier des charges rempli. Le PDF est joint et notre équipe le consulte rapidement.",
      metrics: [
        { label: locale === "en" ? "Company" : "Entreprise", value: fields.company?.trim() || "/" },
        { label: locale === "en" ? "Budget" : "Budget", value: fields.budget?.trim() || "/" },
        { label: locale === "en" ? "Deadline" : "Deadline", value: fields.deadline?.trim() || "/" },
      ],
      sections: [
        {
          title: locale === "en" ? "Project summary" : "Résumé projet",
          items: [
            { label: locale === "en" ? "Goals" : "Objectifs", value: fields.goals?.trim() || "/" },
            { label: locale === "en" ? "Audience" : "Cible", value: fields.audience?.trim() || "/" },
            {
              label: locale === "en" ? "Pages / features" : "Pages / fonctionnalites",
              value: fields.pages?.trim() || "/",
            },
            { label: locale === "en" ? "Integrations" : "Integrations", value: fields.integrations?.trim() || "/" },
          ],
        },
      ],
      footer:
        locale === "en"
          ? "Optional AI modules are available: automation, chatbot, scoring."
          : "Modules IA premium disponibles : automatisation, chatbot, scoring.",
    });

    const bcc = notificationEmails.filter((adminEmail) => adminEmail.toLowerCase() !== email.toLowerCase());

    await resendClient.emails.send({
      from: getResendFromAddress(),
      to: email,
      bcc: bcc.length ? bcc : undefined,
      replyTo: brandContact.email ?? undefined,
      subject,
      html,
      text,
      attachments: [
        {
          filename: locale === "en" ? "kah-digital-brief.pdf" : "cahier-des-charges-kah-digital.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    await sendAdminWhatsAppNotification({
      title: `Nouveau brief - ${fields.company?.trim() || fields.contact?.trim() || email}`,
      source: "brief",
      summary: `Budget ${fields.budget?.trim() || "-"} | Deadline ${fields.deadline?.trim() || "-"} | ${fields.goals?.trim() || "Brief reçu"}`,
      email,
      company: fields.company?.trim(),
      adminPath: "/admin/demandes",
    });

    return NextResponse.json({ ok: true }, { headers: rateHeaders });
  } catch (error) {
    console.error("[api/brief] Failed to send brief", error);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500, headers: rateHeaders });
  }
}
