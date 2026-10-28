import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import { getResendFromAddress } from "@/lib/mail";

function signingSecret() {
  return process.env.PULSE_SIGNING_SECRET || process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

/** Signature du lien de désinscription d'un rendez-vous. */
export function signAppointment(id: string) {
  return createHmac("sha256", signingSecret()).update(`pulse-unsub:${id}`).digest("hex").slice(0, 32);
}

export function verifyAppointmentSignature(id: string, sig: string) {
  const secret = signingSecret();
  if (!secret || !sig) return false;
  const expected = Buffer.from(signAppointment(id));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

function escapeHtml(v: string) {
  return v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function senderAddress() {
  const from = getResendFromAddress();
  const m = /<([^>]+)>/.exec(from);
  return m ? m[1]! : from;
}

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(params: { to: string; fromName: string; replyTo?: string | null; subject: string; text: string; footer?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Resend non configuré.");
  const safeName = params.fromName.replace(/[<>"]/g, "").slice(0, 60);
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#111827;max-width:520px">${escapeHtml(params.text).replace(/\n/g, "<br>")}${
    params.footer ? `<p style="margin-top:24px;font-size:12px;color:#6b7280">${params.footer}</p>` : ""
  }</div>`;
  const { error } = await new Resend(apiKey).emails.send({
    from: `${safeName} <${senderAddress()}>`,
    to: params.to,
    replyTo: params.replyTo || undefined,
    subject: params.subject,
    html,
    text: params.text,
  });
  if (error) throw new Error(error.message);
}

export function smsConfigured() {
  return Boolean(process.env.PULSE_TWILIO_SID && process.env.PULSE_TWILIO_TOKEN && process.env.PULSE_TWILIO_FROM);
}

/** SMS via Twilio (si configuré). `to` au format international. */
export async function sendSms(to: string, body: string) {
  if (!smsConfigured()) throw new Error("SMS non configuré.");
  const sid = process.env.PULSE_TWILIO_SID!;
  const auth = Buffer.from(`${sid}:${process.env.PULSE_TWILIO_TOKEN!}`).toString("base64");
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ To: to, From: process.env.PULSE_TWILIO_FROM!, Body: body.slice(0, 600) }),
  });
  if (!res.ok) throw new Error(`Twilio ${res.status}`);
}

/** Normalise un numéro français/suisse vers +E.164 (ex. 06 12 34 56 78 → +33612345678). */
export function toE164(raw: string, defaultCountry = "33") {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  if (digits.startsWith("0")) return `+${defaultCountry}${digits.slice(1)}`;
  return `+${digits}`;
}

export function whatsappConfigured() {
  return Boolean(process.env.PULSE_WA_TOKEN && process.env.PULSE_WA_PHONE_ID);
}

/** Réponse texte WhatsApp (Cloud API) — valable dans la fenêtre de 24 h après un message du commerçant. */
export async function sendWhatsAppText(toDigits: string, text: string) {
  if (!whatsappConfigured()) throw new Error("WhatsApp non configuré.");
  const res = await fetch(`https://graph.facebook.com/v21.0/${process.env.PULSE_WA_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.PULSE_WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: toDigits, type: "text", text: { body: text.slice(0, 1500) } }),
  });
  if (!res.ok) throw new Error(`WhatsApp ${res.status}`);
}
