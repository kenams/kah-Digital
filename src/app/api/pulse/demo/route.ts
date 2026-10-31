import { NextRequest, NextResponse } from "next/server";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import type { PulseContent } from "@/lib/pulse/content";
import { handlePulseMessage } from "@/lib/pulse/service";
import { db, getSiteByKey, isPulseConfigured, newToken, type PulseSite } from "@/lib/pulse/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const limit = { windowMs: 10 * 60 * 1000, max: 8 };
const DEMO_KEY = "demo";
const RESET_AFTER_MS = 30 * 60 * 1000;

export const DEMO_CONTENT: PulseContent = {
  hours: { mon: "Fermé", tue: "11h30-14h30 · 19h-22h", wed: "11h30-14h30 · 19h-22h", thu: "11h30-14h30 · 19h-22h", fri: "11h30-14h30 · 19h-23h", sat: "19h-23h", sun: "Fermé" },
  contact: { phone: "05 00 00 00 00", address: "10 rue de la Démo" },
};

async function demoSite(): Promise<PulseSite> {
  const existing = await getSiteByKey(DEMO_KEY);
  if (existing) {
    const stale = Date.now() - new Date(existing.updated_at).getTime() > RESET_AFTER_MS;
    if (stale && JSON.stringify(existing.content) !== JSON.stringify(DEMO_CONTENT)) {
      await db().from("pulse_sites").update({ content: DEMO_CONTENT, updated_at: new Date().toISOString() }).eq("id", existing.id);
      return { ...existing, content: DEMO_CONTENT };
    }
    return existing;
  }
  const { data, error } = await db()
    .from("pulse_sites")
    .insert({ site_key: DEMO_KEY, access_token: newToken(), client_name: "Chez Léna (démo)", plan: "demo", content: DEMO_CONTENT })
    .select("*")
    .single();
  if (error) throw error;
  return data as PulseSite;
}

/** Démo publique : un seul site « demo », limité en débit et remis à zéro automatiquement. */
export async function POST(request: NextRequest) {
  if (!isPulseConfigured()) return NextResponse.json({ error: "Démo indisponible." }, { status: 503 });

  const rate = rateLimit(`pulse-demo:${getRequestIp(request)}`, limit);
  const headers = getRateLimitHeaders(rate, limit.max);
  if (!rate.allowed) return NextResponse.json({ error: `Trop d'essais. Réessayez dans ${rate.retryAfter}s.` }, { status: 429, headers });

  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 240) : "";
  if (message.length < 3) return NextResponse.json({ error: "Écrivez un message plus complet." }, { status: 400, headers });

  const site = await demoSite();
  // Les rendez-vous éventuels restent dans le site démo, dont les rappels sont désactivés : aucun message n'est envoyé.
  const outcome = await handlePulseMessage(site, message, "demo");
  return NextResponse.json({ reply: outcome.reply, status: outcome.status, content: outcome.content }, { headers });
}

/** État courant de la démo (pour afficher le site simulé). */
export async function GET() {
  if (!isPulseConfigured()) return NextResponse.json({ error: "Démo indisponible." }, { status: 503 });
  const site = await demoSite();
  const { publicView } = await import("@/lib/pulse/content");
  return NextResponse.json({ content: publicView(site.content, site.timezone) });
}
