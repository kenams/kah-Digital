import { Resend } from "resend";
import type { QuoteRecord } from "@/lib/quote";

const resendClient = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const notificationEmail = process.env.QUOTE_NOTIFICATION_EMAIL;
const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;

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
  const mobileSummary =
    quote.projectFocus === "mobile"
      ? `\n\nMVP mobile:\n- Plateformes: ${platformsLine}\n- Fonctions: ${featuresLine}\n- Stores: ${
          quote.storeSupport ?? "-"
        }\n- Stack/API: ${quote.techPreferences ?? "-"}`
      : "";

  await resendClient.emails.send({
    from: "Kah-Digital <notifications@kah-digital.io>",
    to: notificationEmail.split(",").map((mail) => mail.trim()),
    subject: `Nouvelle demande de devis - ${quote.name}`,
    text: `Projet: ${quote.projectType} / Budget: ${quote.budget} / Timeline: ${quote.timeline}\nClient: ${
      quote.clientType ?? "-"
    } ${quote.companyName ? `/ ${quote.companyName}` : ""}\nObjectif: ${quote.goal}\nPages: ${pagesLine}\nInspirations: ${
      quote.inspirations ?? "-"
    }\nVision: ${
      quote.message ?? "-"
    }\nContact: ${quote.email} ${quote.phone ?? ""}${mobileSummary}${configuratorSummary}`,
  });
}

async function sendWebhookBackup(quote: QuoteRecord) {
  if (!webhookUrl) {
    console.info("[notifyQuote] Webhook backup désactivé (GOOGLE_SHEET_WEBHOOK manquant)");
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote),
  });
}

export async function notifyQuote(quote: QuoteRecord) {
  const results = await Promise.allSettled([
    sendEmailNotification(quote),
    sendWebhookBackup(quote),
  ]);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      const channel = index === 0 ? "email" : "webhook";
      console.error(`[notifyQuote] ${channel} failed`, result.reason);
    }
  });
}
