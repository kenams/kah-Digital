import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Remise à zéro des compteurs : on enregistre une date de départ.
// Aucun prospect n'est supprimé (l'historique protège contre les doubles envois).
const STATS_SINCE_KEY = "prospection_stats_since";

async function isAdmin() {
  try {
    const auth = await createSupabaseServerClient();
    if (!auth) return false;
    const { data: { user } } = await auth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const viaSecret = Boolean(cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`);
  if (!viaSecret && !(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { clear?: boolean };
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const value = body.clear ? null : new Date().toISOString();
  const { error } = await supabase
    .from("app_settings")
    .upsert({ key: STATS_SINCE_KEY, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, statsSince: value });
}
