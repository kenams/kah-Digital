type AdminAlertInput = {
  title: string;
  source: "quote" | "assistant" | "contact" | "brief";
  summary: string;
  email?: string;
  phone?: string;
  company?: string;
  adminPath?: string;
};

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID?.trim();
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN?.trim();
const twilioWhatsappFrom = process.env.TWILIO_WHATSAPP_FROM?.trim();
const twilioMessagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID?.trim();
const twilioWhatsappContentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID?.trim();
const whatsappRecipients = (process.env.WHATSAPP_NOTIFICATION_TO ?? "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

function isTwilioConfigured() {
  return Boolean(
    twilioAccountSid &&
      twilioAuthToken &&
      whatsappRecipients.length > 0 &&
      (twilioWhatsappFrom || twilioMessagingServiceSid)
  );
}

function normalizeWhatsappAddress(value: string) {
  return value.startsWith("whatsapp:") ? value : `whatsapp:${value}`;
}

function buildAdminUrl(path?: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://kah-digital.ch";
  if (!path) {
    return `${siteUrl.replace(/\/+$/, "")}/admin`;
  }

  return `${siteUrl.replace(/\/+$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildWhatsappBody(input: AdminAlertInput) {
  const lines = [
    `KAH Digital`,
    `Nouvelle alerte: ${input.title}`,
    `Source: ${input.source}`,
    input.company ? `Societe: ${input.company}` : null,
    input.email ? `Email: ${input.email}` : null,
    input.phone ? `Telephone: ${input.phone}` : null,
    `Resume: ${input.summary}`,
    `Admin: ${buildAdminUrl(input.adminPath)}`,
  ].filter(Boolean);

  return lines.join("\n");
}

function buildWhatsappTemplateVariables(input: AdminAlertInput) {
  return JSON.stringify({
    "1": input.title,
    "2": input.source,
    "3": input.company || input.email || input.phone || "-",
    "4": buildAdminUrl(input.adminPath),
  });
}

async function sendTwilioMessage(recipient: string, input: AdminAlertInput) {
  if (!twilioAccountSid || !twilioAuthToken) {
    throw new Error("Twilio non configure");
  }

  const payload = new URLSearchParams();
  payload.set("To", normalizeWhatsappAddress(recipient));

  if (twilioMessagingServiceSid) {
    payload.set("MessagingServiceSid", twilioMessagingServiceSid);
  } else if (twilioWhatsappFrom) {
    payload.set("From", normalizeWhatsappAddress(twilioWhatsappFrom));
  }

  if (twilioWhatsappContentSid) {
    payload.set("ContentSid", twilioWhatsappContentSid);
    payload.set("ContentVariables", buildWhatsappTemplateVariables(input));
  } else {
    payload.set("Body", buildWhatsappBody(input));
  }

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Twilio WhatsApp failed (${response.status}) ${body}`.trim());
  }
}

export async function sendAdminWhatsAppNotification(input: AdminAlertInput) {
  if (!isTwilioConfigured()) {
    console.info(
      "[admin-alerts] WhatsApp notification skipped: missing Twilio/recipient configuration"
    );
    return;
  }

  const results = await Promise.allSettled(
    whatsappRecipients.map((recipient) => sendTwilioMessage(recipient, input))
  );

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("[admin-alerts] WhatsApp notification failed", result.reason);
    }
  });
}
