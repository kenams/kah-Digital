import { NextRequest, NextResponse } from "next/server";
import { cleanText } from "@/lib/pulse/content";
import { zonedToUtcIso } from "@/lib/pulse/service";
import { db, getSiteByToken, isPulseConfigured } from "@/lib/pulse/store";

export const dynamic = "force-dynamic";

async function authed(request: NextRequest) {
  if (!isPulseConfigured()) return null;
  return getSiteByToken(request.headers.get("x-pulse-token") ?? "");
}

/**
 * Création d'un rendez-vous. Utilisé par « Mon espace » ET par le formulaire de réservation d'un site client
 * (appel serveur à serveur avec le jeton du site), pour déclencher rappels et demande d'avis.
 * Corps : { customer_name, customer_email?, customer_phone?, service?, local_start "AAAA-MM-JJTHH:mm" | starts_at ISO, consent }
 */
export async function POST(request: NextRequest) {
  const site = await authed(request);
  if (!site) return NextResponse.json({ error: "Accès refusé." }, { status: 401 });

  const b = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const name = cleanText(b.customer_name, 80);
  if (name.length < 2) return NextResponse.json({ error: "Nom du client requis." }, { status: 400 });

  let iso: string | null = null;
  if (typeof b.starts_at === "string" && !Number.isNaN(Date.parse(b.starts_at))) iso = new Date(b.starts_at).toISOString();
  else if (typeof b.local_start === "string") iso = zonedToUtcIso(b.local_start, site.timezone);
  if (!iso) return NextResponse.json({ error: "Date et heure invalides." }, { status: 400 });
  if (new Date(iso).getTime() < Date.now() - 3600_000) return NextResponse.json({ error: "Ce rendez-vous est dans le passé." }, { status: 400 });

  const email = cleanText(b.customer_email, 120);
  const phone = cleanText(b.customer_phone, 30);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "E-mail du client invalide." }, { status: 400 });

  const { data, error } = await db()
    .from("pulse_appointments")
    .insert({
      site_id: site.id,
      customer_name: name,
      customer_email: email || null,
      customer_phone: phone || null,
      service: cleanText(b.service, 80) || null,
      starts_at: iso,
      consent: b.consent === true,
      source: typeof b.source === "string" ? cleanText(b.source, 20) : "web",
    })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: "Enregistrement impossible." }, { status: 500 });
  return NextResponse.json({ ok: true, id: (data as { id: string }).id });
}

/** Annulation : { id } → statut « cancelled » (plus aucun rappel). */
export async function DELETE(request: NextRequest) {
  const site = await authed(request);
  if (!site) return NextResponse.json({ error: "Accès refusé." }, { status: 401 });
  const b = (await request.json().catch(() => ({}))) as { id?: unknown };
  if (typeof b.id !== "string") return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
  const { error } = await db().from("pulse_appointments").update({ status: "cancelled" }).eq("id", b.id).eq("site_id", site.id);
  if (error) return NextResponse.json({ error: "Annulation impossible." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
