import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { getSiteUrl } from "@/lib/email-template";
import { cleanText } from "@/lib/pulse/content";
import { db, DEFAULT_REMINDERS, isPulseConfigured, newToken } from "@/lib/pulse/store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return false;
  const { data } = await supabase.auth.getUser();
  return isAdminUser(data.user);
}

function snippet(siteKey: string) {
  return `<script src="${getSiteUrl()}/pulse.js" data-site="${siteKey}" defer></script>`;
}

/** Liste des sites connectés (admin). */
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  if (!isPulseConfigured()) return NextResponse.json({ error: "Supabase non configuré." }, { status: 503 });

  const { data } = await db()
    .from("pulse_sites")
    .select("id,site_key,access_token,client_name,owner_email,plan,whatsapp_numbers,reminder_settings,active,updated_at")
    .order("created_at", { ascending: false });
  const sites = ((data as Array<Record<string, unknown>> | null) ?? []).map((s) => ({
    ...s,
    espaceUrl: `${getSiteUrl()}/espace/${s.access_token as string}`,
    snippet: snippet(s.site_key as string),
  }));
  return NextResponse.json({ sites });
}

/** Création d'un site connecté (admin) : renvoie le lien « Mon espace » et le script à coller sur le site du client. */
export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  if (!isPulseConfigured()) return NextResponse.json({ error: "Supabase non configuré." }, { status: 503 });

  const b = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const siteKey = cleanText(b.site_key, 60).toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "");
  const clientName = cleanText(b.client_name, 80);
  if (siteKey.length < 2 || !clientName) return NextResponse.json({ error: "Identifiant du site et nom du client requis." }, { status: 400 });

  const numbers = (Array.isArray(b.whatsapp_numbers) ? b.whatsapp_numbers : [])
    .map((n) => String(n).replace(/\D/g, ""))
    .filter((n) => n.length >= 8 && n.length <= 15);

  const { data, error } = await db()
    .from("pulse_sites")
    .insert({
      site_key: siteKey,
      access_token: newToken(),
      client_name: clientName,
      owner_email: cleanText(b.owner_email, 120) || null,
      plan: b.plan === "pro" ? "pro" : "confort",
      whatsapp_numbers: numbers,
      reminder_settings: { ...DEFAULT_REMINDERS, enabled: b.plan === "pro" },
    })
    .select("site_key,access_token")
    .single();
  if (error) return NextResponse.json({ error: error.code === "23505" ? "Cet identifiant existe déjà." : "Création impossible." }, { status: 400 });

  const row = data as { site_key: string; access_token: string };
  return NextResponse.json({ ok: true, siteKey: row.site_key, espaceUrl: `${getSiteUrl()}/espace/${row.access_token}`, snippet: snippet(row.site_key) });
}
