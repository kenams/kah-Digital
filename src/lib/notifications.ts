import { Resend } from "resend";
import { brandContact } from "@/config/brand";
import { sendAdminWhatsAppNotification } from "@/lib/admin-alerts";
import { getSiteUrl, renderBrandedEmail } from "@/lib/email-template";
import { getResendFromAddress } from "@/lib/mail";
import type { QuoteRecord } from "@/lib/quote";

const resendClient = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const notificationEmail = process.env.QUOTE_NOTIFICATION_EMAIL ?? brandContact.email;
const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
const adminUrl = `${getSiteUrl()}/admin/demandes`;

function valueOrFallback(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed || "-";
}

async function sendEmailNotification(quote: QuoteRecord) {
  if (!resendClient || !notificationEmail) {
    console.warn("[notifyQuote] Email notification skipped: missing RESEND_API_KEY or QUOTE_NOTIFICATION_EMAIL");
    return;
  }

  const configuratorSummary = quote.configurator
    ? `\n\nConfigurateur:\n- Type: ${quote.configurator.siteType ?? "-"}\n- Vision: ${
        quote.configurator.strategy ?? "-"
      }\n- Style: ${quote.configurator.mood ?? "-"}\n- Options: ${
        quote.configurator.features?.join(", ") || "-"
      }\n- Intégrations: ${quote.configurator.integrations?.join(", ") || "-"}`
    : "";

  const pagesLine = quote.pages && quote.pages.length > 0 ? quote.pages.join(", ") : "-";
  const platformsLine =
    quote.mobilePlatforms && quote.mobilePlatforms.length > 0
      ? quote.mobilePlatforms.join(", ")
      : "-";
  const featuresLine =
    quote.mobileFeatures && quote.mobileFeatures.length > 0
      ? quote.mobileFeatures.join(", ")
      : "-";
  const aiModulesLine =
    quote.aiModules && quote.aiModules.length > 0 ? quote.aiModules.join(", ") : "-";
  const mobileSummary =
    quote.projectFocus === "mobile"
      ? `\n\nMVP mobile:\n- Plateformes: ${platformsLine}\n- Fonctions: ${featuresLine}\n- Stores: ${
          quote.storeSupport ?? "-"
        }\n- Stack/API: ${quote.techPreferences ?? "-"}`
      : "";

  const html = renderBrandedEmail({
    eyebrow: "Nouveau devis",
    title: `${quote.name} a envoye une demande`,
    intro: "Une nouvelle demande de devis est arrivee sur le site. Les infos utiles sont structurees ci-dessous pour un tri rapide.",
    metrics: [
      { label: "Projet", value: quote.projectType },
      { label: "Budget", value: quote.budget },
      { label: "Delai", value: quote.timeline },
    ],
    sections: [
      {
        title: "Contact",
        items: [
          { label: "Nom", value: quote.name },
          { label: "Email", value: quote.email },
          { label: "Telephone", value: valueOrFallback(quote.phone) },
          { label: "Societe", value: valueOrFallback(quote.companyName) },
          { label: "Type client", value: valueOrFallback(quote.clientType) },
        ],
      },
      {
        title: "Projet",
        items: [
          { label: "Objectif", value: quote.goal },
          { label: "Pages", value: pagesLine },
          { label: "Inspirations", value: valueOrFallback(quote.inspirations) },
          { label: "Modules IA", value: aiModulesLine },
          { label: "Message", value: valueOrFallback(quote.message) },
        ],
      },
      {
        title: "Option mobile",
        items: [
          { label: "Plateformes", value: platformsLine },
          { label: "Fonctions", value: featuresLine },
          { label: "Stores", value: valueOrFallback(quote.storeSupport) },
          { label: "Stack / API", value: valueOrFallback(quote.techPreferences) },
        ],
      },
      {
        title: "Configurateur",
        items: [
          { label: "Type", value: valueOrFallback(quote.configurator?.siteType) },
          { label: "Vision", value: valueOrFallback(quote.configurator?.strategy) },
          { label: "Style", value: valueOrFallback(quote.configurator?.mood) },
          { label: "Options", value: quote.configurator?.features?.join(", ") || "-" },
          { label: "Integrations", value: quote.configurator?.integrations?.join(", ") || "-" },
        ],
      },
    ],
    ctaLabel: "Ouvrir l'admin",
    ctaUrl: adminUrl,
    footer: `Reponds directement a ${quote.email} pour reprendre le lead.`,
  });

  await resendClient.emails.send({
    from: getResendFromAddress(),
    to: notificationEmail.split(",").map((mail) => mail.trim()),
    replyTo: quote.email,
    subject: `Nouveau devis KAH Digital - ${quote.name}`,
    html,
    text: `Projet: ${quote.projectType} / Budget: ${quote.budget} / Timeline: ${quote.timeline}\nClient: ${
      quote.clientType ?? "-"
    } ${quote.companyName ? `/ ${quote.companyName}` : ""}\nObjectif: ${quote.goal}\nPages: ${pagesLine}\nInspirations: ${
      quote.inspirations ?? "-"
    }\nModules IA: ${aiModulesLine}\nVision: ${
      quote.message ?? "-"
    }\nContact: ${quote.email} ${quote.phone ?? ""}${mobileSummary}${configuratorSummary}`,
  });
}

async function sendWebhookBackup(quote: QuoteRecord) {
  if (!webhookUrl) {
    console.info("[notifyQuote] Webhook backup désactivé (GOOGLE_SHEET_WEBHOOK manquant)");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Webhook backup failed (${response.status}) ${body}`.trim());
  }
}

export async function notifyQuote(quote: QuoteRecord) {
  const results = await Promise.allSettled([
    sendEmailNotification(quote),
    sendWebhookBackup(quote),
    sendAdminWhatsAppNotification({
      title: `Nouveau devis - ${quote.name}`,
      source: "quote",
      summary: `${quote.projectType} | Budget ${quote.budget} | Delai ${quote.timeline}`,
      email: quote.email,
      phone: quote.phone,
      company: quote.companyName,
      adminPath: "/admin/demandes",
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      const channel = index === 0 ? "email" : index === 1 ? "webhook" : "whatsapp";
      console.error(`[notifyQuote] ${channel} failed`, result.reason);
    }
  });
}
