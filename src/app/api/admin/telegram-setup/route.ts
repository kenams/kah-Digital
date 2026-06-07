/**
 * Auto-capture du Telegram chat_id via getUpdates.
 * Kenams envoie /start au bot, puis appelle cet endpoint — chat_id stocké en DB.
 * GET  → vérifie si déjà configuré
 * POST → tente de capturer depuis getUpdates + sauvegarde en Supabase
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) return true;
  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

async function getChatIdFromDb() {
  const supabase = getSupabase();
  const { data } = await supabase.from("app_settings").select("value").eq("key", "telegram_chat_id").single();
  return data?.value ?? null;
}

export async function GET(req: NextRequest) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const chatId = process.env.TELEGRAM_CHAT_ID ?? await getChatIdFromDb();
  return NextResponse.json({ configured: Boolean(chatId), chatId: chatId ? "***" + String(chatId).slice(-3) : null });
}

export async function POST(req: NextRequest) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!BOT_TOKEN) return NextResponse.json({ error: "TELEGRAM_BOT_TOKEN manquant" }, { status: 500 });

  const token = BOT_TOKEN.startsWith("bot") ? BOT_TOKEN.slice(3) : BOT_TOKEN;
  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=10&timeout=5`);
  const data = await res.json() as { ok: boolean; result?: Array<{ message?: { from?: { id: number; first_name?: string }; text?: string } }> };

  if (!data.ok || !data.result?.length) {
    return NextResponse.json({ ok: false, message: "Aucun message reçu. Envoie /start au bot Telegram d'abord." });
  }

  // Prend le premier message d'un utilisateur humain
  const firstMsg = data.result.find(u => u.message?.from?.id);
  if (!firstMsg?.message?.from?.id) {
    return NextResponse.json({ ok: false, message: "Aucun utilisateur trouvé dans les updates." });
  }

  const chatId = String(firstMsg.message.from.id);
  const firstName = firstMsg.message.from.first_name ?? "?";

  const supabase = getSupabase();
  await supabase.from("app_settings").upsert({ key: "telegram_chat_id", value: chatId, updated_at: new Date().toISOString() });

  // Test : envoie un message de confirmation
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: "✅ KAH Digital — Notifications activées. Vous recevrez une alerte dès qu'un client répond." }),
  });

  return NextResponse.json({ ok: true, chatId: "***" + chatId.slice(-3), firstName });
}
