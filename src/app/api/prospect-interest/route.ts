export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // à configurer dans Vercel env vars

async function sendTelegramAlert(msg: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  const token = TELEGRAM_BOT_TOKEN.startsWith("bot") ? TELEGRAM_BOT_TOKEN.slice(3) : TELEGRAM_BOT_TOKEN;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg, parse_mode: "HTML" }),
  }).catch(() => {});
}

export async function POST(req: NextRequest) {
  try {
    const { prospectId, name, email, phone, businessName, siteUrl } = await req.json() as {
      prospectId?: string; name?: string; email?: string;
      phone?: string; businessName?: string; siteUrl?: string;
    };

    const safeName = (name ?? "").trim();
    const safeEmail = (email ?? "").trim();
    const safePhone = (phone ?? "").trim();
    const safeBusiness = (businessName ?? siteUrl ?? "?").trim();
    const safeSite = (siteUrl ?? "").trim();

    if (!safeName || !safeEmail) {
      return NextResponse.json({ ok: false, error: "name + email requis" }, { status: 400 });
    }

    // Telegram — notif immédiate
    const waLink = safePhone ? `https://wa.me/${safePhone.replace(/[^0-9]/g, "")}` : null;
    const telegramMsg = [
      `🔥 <b>NOUVEAU LEAD — ${safeBusiness}</b>`,
      `👤 ${safeName}`,
      `📧 ${safeEmail}`,
      safePhone ? `📱 ${safePhone}` : null,
      `🌐 ${safeSite}`,
      waLink ? `<a href="${waLink}">WhatsApp →</a>` : null,
      `\n<a href="https://kah-digital.ch/admin/prospection">Voir admin →</a>`,
    ].filter(Boolean).join("\n");
    void sendTelegramAlert(telegramMsg);

    // Email à Kenams
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "KAH Digital <noreply@kah-digital.ch>",
      to: "kahdigital42@gmail.com",
      subject: `🔥 Nouveau lead : ${safeBusiness}`,
      html: `
        <h2 style="color:#7c3aed;">Nouveau prospect intéressé 🔥</h2>
        <table style="font-size:14px;line-height:1.8;">
          <tr><td><strong>Nom :</strong></td><td>${safeName}</td></tr>
          <tr><td><strong>Email :</strong></td><td>${safeEmail}</td></tr>
          ${safePhone ? `<tr><td><strong>Téléphone :</strong></td><td>${safePhone}</td></tr>` : ""}
          <tr><td><strong>Entreprise :</strong></td><td>${safeBusiness}</td></tr>
          <tr><td><strong>Site :</strong></td><td><a href="${safeSite}">${safeSite}</a></td></tr>
        </table>
        <p style="margin-top:20px;">
          ${safePhone ? `<a href="https://wa.me/${safePhone.replace(/[^0-9]/g, "")}" style="background:#25D366;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;margin-right:8px;">WhatsApp →</a>` : ""}
          <a href="mailto:${safeEmail}?subject=Suite — ${encodeURIComponent(safeBusiness)}" style="background:#1e3a8a;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:700;">Répondre par email →</a>
        </p>
      `,
    }).catch(console.error);

    // Supabase — marquer hot_lead + repliedAt
    if (prospectId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await supabase.from("prospects").update({
        status: "replied",
        repliedAt: new Date().toISOString(),
        draftReply: `HOT LEAD: ${safeName} — ${safeEmail}${safePhone ? ` / ${safePhone}` : ""}`,
      }).eq("id", prospectId);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[prospect-interest]", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
