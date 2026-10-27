import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SLUG = "visibilite-locale";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Liste d'attente du test « Visibilité locale » : même table que l'usine à idées,
// l'alerte Telegram part toute seule à 15 inscrits.
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string };
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!EMAIL.test(email) || email.length > 200) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data: existing } = await supabase
      .from("idea_leads")
      .select("id")
      .eq("idea_slug", SLUG)
      .eq("email", email)
      .limit(1);
    if (existing && existing.length > 0) return NextResponse.json({ ok: true });

    const { error } = await supabase.from("idea_leads").insert({ idea_slug: SLUG, email });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
