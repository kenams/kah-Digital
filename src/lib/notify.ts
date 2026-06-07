/**
 * Notifications admin centralisées.
 * Telegram : lit TELEGRAM_CHAT_ID depuis env var, sinon depuis Supabase app_settings.
 * Email : utilise Resend → kahdigital42@gmail.com
 */
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

let _cachedChatId: string | null | undefined = undefined; // undefined = not loaded yet

async function getTelegramChatId(): Promise<string | null> {
  if (process.env.TELEGRAM_CHAT_ID) return process.env.TELEGRAM_CHAT_ID;
  if (_cachedChatId !== undefined) return _cachedChatId;
  try {
    const supabase = getSupabase();
    const { data } = await supabase.from("app_settings").select("value").eq("key", "telegram_chat_id").single();
    _cachedChatId = data?.value ?? null;
    return _cachedChatId;
  } catch {
    _cachedChatId = null;
    return null;
  }
}

export async function sendTelegramAlert(msg: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return;
  const chatId = await getTelegramChatId();
  if (!chatId) return;
  const token = botToken.startsWith("bot") ? botToken.slice(3) : botToken;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: "HTML" }),
  }).catch(() => {});
}

export async function sendAdminEmail(subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "KAH Digital <noreply@kah-digital.ch>",
    to: "kahdigital42@gmail.com",
    subject,
    html,
  }).catch(() => {});
}

export async function notifyNewLead(params: {
  businessName: string;
  name: string;
  email: string;
  phone?: string;
  siteUrl?: string;
  prospectPageUrl?: string;
}): Promise<void> {
  const { businessName, name, email, phone, siteUrl, prospectPageUrl } = params;
  const waLink = phone ? `https://wa.me/${phone.replace(/[^0-9]/g, "")}` : null;

  // Telegram
  const tgMsg = [
    `🔥 <b>NOUVEAU LEAD — ${businessName}</b>`,
    `👤 ${name}`,
    `📧 ${email}`,
    phone ? `📱 ${phone}` : null,
    siteUrl ? `🌐 ${siteUrl}` : null,
    waLink ? `<a href="${waLink}">WhatsApp →</a>` : null,
    prospectPageUrl ? `<a href="${prospectPageUrl}">Page prospect →</a>` : null,
    `\n<a href="https://kah-digital.ch/admin/prospection">Admin →</a>`,
  ].filter(Boolean).join("\n");
  void sendTelegramAlert(tgMsg);

  // Email
  const emailHtml = `
    <h2 style="color:#7c3aed;">Nouveau prospect intéressé 🔥</h2>
    <table style="font-size:14px;line-height:1.8;">
      <tr><td><strong>Nom :</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email :</strong></td><td>${email}</td></tr>
      ${phone ? `<tr><td><strong>Tel :</strong></td><td>${phone}</td></tr>` : ""}
      <tr><td><strong>Entreprise :</strong></td><td>${businessName}</td></tr>
      ${siteUrl ? `<tr><td><strong>Site :</strong></td><td><a href="${siteUrl}">${siteUrl}</a></td></tr>` : ""}
    </table>
    <p style="margin-top:20px;">
      ${waLink ? `<a href="${waLink}" style="background:#25D366;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;margin-right:8px;">WhatsApp →</a>` : ""}
      <a href="mailto:${email}?subject=Suite — ${encodeURIComponent(businessName)}" style="background:#1e3a8a;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;">Répondre →</a>
    </p>
  `;
  void sendAdminEmail(`🔥 Nouveau lead : ${businessName}`, emailHtml);
}
