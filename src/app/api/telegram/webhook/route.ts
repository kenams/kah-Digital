/**
 * Webhook Telegram — capture automatique du chat_id au premier message.
 * Telegram appelle ce endpoint quand quelqu'un envoie un message au bot.
 * Chat_id sauvegardé en Supabase → notifications actives immédiatement.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

type TelegramUpdate = {
  update_id: number;
  message?: {
    chat: { id: number; type: string; first_name?: string; username?: string };
    from?: { id: number; first_name?: string; username?: string };
    text?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as TelegramUpdate;
    const chat = body.message?.chat;
    if (!chat?.id) return NextResponse.json({ ok: true });

    const chatId = String(chat.id);
    const firstName = chat.first_name ?? body.message?.from?.first_name ?? "?";

    const supabase = getSupabase();

    // Sauvegarder le chat_id (upsert — idempotent)
    await supabase.from("app_settings").upsert({
      key: "telegram_chat_id",
      value: chatId,
      updated_at: new Date().toISOString(),
    });

    const botToken = process.env.TELEGRAM_BOT_TOKEN ?? "";
    const token = botToken.startsWith("bot") ? botToken.slice(3) : botToken;

    // Répondre à Kenams pour confirmer
    if (token) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `✅ KAH Digital — Notifications activées, ${firstName} !\n\nTu recevras une alerte ici dès qu'un prospect remplit le formulaire ou répond à un email.`,
          parse_mode: "HTML",
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram/webhook]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Vercel health check
export async function GET() {
  return NextResponse.json({ ok: true, service: "telegram-webhook" });
}
