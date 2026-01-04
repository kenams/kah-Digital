import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";
import { brandContact } from "@/config/brand";

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
  { key: "email", fr: "Email / Telephone", en: "Email / Phone" },
  { key: "goals", fr: "Objectifs principaux", en: "Main goals" },
  { key: "audience", fr: "Cible / utilisateurs", en: "Audience / users" },
  { key: "pages", fr: "Pages & fonctionnalites cles", en: "Key pages & features" },
  { key: "appPlatforms", fr: "Plateformes app mobile", en: "Mobile app platforms" },
  { key: "appFeatures", fr: "Fonctionnalites MVP", en: "MVP features" },
  { key: "style", fr: "Style visuel", en: "Visual style" },
  { key: "references", fr: "References", en: "References" },
  { key: "budget", fr: "Budget", en: "Budget" },
  { key: "deadline", fr: "Deadline", en: "Deadline" },
  { key: "integrations", fr: "Integrations / outils", en: "Integrations / tools" },
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
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `Trop de requetes. Reessaie dans ${limit.retryAfter}s.` },
      { status: 429 }
    );
  }

  if (!resendClient) {
    return NextResponse.json({ error: "Service email indisponible" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const rawEmail = typeof body?.email === "string" ? body.email : "";
    const email = normalizeEmail(rawEmail);
    const locale = body?.locale === "en" ? "en" : "fr";
    const fields: BriefFields = typeof body?.fields === "object" && body?.fields ? body.fields : {};
    const pdfBase64 = typeof body?.pdfBase64 === "string" ? body.pdfBase64 : "";

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!pdfBase64) {
      return NextResponse.json({ error: "PDF manquant" }, { status: 400 });
    }

    const cleanBase64 = pdfBase64.includes(",") ? pdfBase64.split(",")[1] ?? "" : pdfBase64;
    const pdfBuffer = Buffer.from(cleanBase64, "base64");
    if (!pdfBuffer.length || pdfBuffer.length > maxPdfBytes) {
      return NextResponse.json({ error: "PDF trop volumineux" }, { status: 413 });
    }

    const summary = buildSummary(fields, locale);
    const subject =
      locale === "en" ? "Your Kah-Digital project brief" : "Votre cahier des charges Kah-Digital";
    const text =
      locale === "en"
        ? `Hello,\n\nHere is your filled project brief. We will review it and get back to you shortly.\n\n${summary}\n\nOptional: premium AI modules are available (automation, chatbot, scoring).\n\nBest,\nKah-Digital`
        : `Bonjour,\n\nVoici votre cahier des charges rempli. Nous le consultons et revenons vers vous rapidement.\n\n${summary}\n\nOption: modules IA premium disponibles (automatisation, chatbot, scoring).\n\nBien a vous,\nKah-Digital`;

    const bcc = notificationEmails.filter((adminEmail) => adminEmail.toLowerCase() !== email.toLowerCase());

    await resendClient.emails.send({
      from: "Kah-Digital <notifications@kah-digital.io>",
      to: email,
      bcc: bcc.length ? bcc : undefined,
      replyTo: brandContact.email ?? undefined,
      subject,
      text,
      attachments: [
        {
          filename: locale === "en" ? "kah-digital-brief.pdf" : "cahier-des-charges-kah-digital.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/brief] Failed to send brief", error);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}
