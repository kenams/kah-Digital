import { NextRequest, NextResponse } from "next/server";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { handlePulseMessage } from "@/lib/pulse/service";
import { getSiteByToken, isPulseConfigured } from "@/lib/pulse/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const limit = { windowMs: 10 * 60 * 1000, max: 30 };

/** Message du commerçant depuis « Mon espace » (jeton secret dans l'en-tête x-pulse-token). */
export async function POST(request: NextRequest) {
  if (!isPulseConfigured()) return NextResponse.json({ error: "Service indisponible." }, { status: 503 });

  const token = request.headers.get("x-pulse-token") ?? "";
  const rate = rateLimit(`pulse-msg:${token.slice(0, 12)}:${getRequestIp(request)}`, limit);
  const headers = getRateLimitHeaders(rate, limit.max);
  if (!rate.allowed) return NextResponse.json({ error: `Trop de messages. Réessayez dans ${rate.retryAfter}s.` }, { status: 429, headers });

  const site = await getSiteByToken(token);
  if (!site) return NextResponse.json({ error: "Accès refusé." }, { status: 401, headers });

  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message : "";
  const outcome = await handlePulseMessage(site, message, "web");
  return NextResponse.json(outcome, { headers });
}
