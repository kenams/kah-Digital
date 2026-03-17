import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { brandContact } from "@/config/brand";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";
import { getResendClient } from "@/lib/resend";
import { verifyTurnstile } from "@/lib/turnstile";

const notificationEmail = process.env.QUOTE_NOTIFICATION_EMAIL ?? brandContact.email;
const contactRateLimit = { windowMs: 10 * 60 * 1000, max: 6 };

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  website: z.string().optional(),
  turnstileToken: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const resendClient = getResendClient();

  if (!resendClient || !notificationEmail) {
    return NextResponse.json({ error: "Service email indisponible" }, { status: 503 });
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    return NextResponse.json({ error: "Captcha non configure" }, { status: 503 });
  }

  const ip = getRequestIp(request);
  const remoteIp = ip === "unknown" ? null : ip;
  const rate = rateLimit(`contact:${ip}`, contactRateLimit);
  const rateHeaders = {
    "X-RateLimit-Limit": String(contactRateLimit.max),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
  };

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de messages. Reessaie dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...rateHeaders, "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers: rateHeaders }
      );
    }

    const { website, turnstileToken, ...contact } = parsed.data;
    if (website && website.trim()) {
      return NextResponse.json({ ok: true }, { headers: rateHeaders });
    }

    const verification = await verifyTurnstile(turnstileToken, remoteIp);
    if (!verification.success) {
      const errorCodes = verification["error-codes"] ?? [];
      const errorSuffix = errorCodes.length ? ` (codes: ${errorCodes.join(", ")})` : "";
      return NextResponse.json(
        { error: `Captcha invalide${errorSuffix}`, details: errorCodes },
        { status: 400, headers: rateHeaders }
      );
    }

    await resendClient.emails.send({
      from: "Kah-Digital <notifications@kah-digital.io>",
      to: notificationEmail.split(",").map((mail) => mail.trim()),
      replyTo: contact.email,
      subject: `Nouveau message contact - ${contact.subject}`,
      text: `Nom: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nSociete: ${
        contact.company ?? "-"
      }\nSujet: ${contact.subject}\n\nMessage:\n${contact.message}`,
    });

    return NextResponse.json({ ok: true }, { headers: rateHeaders });
  } catch (error) {
    console.error("[api/contact] Failed to send contact email", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers: rateHeaders });
  }
}
