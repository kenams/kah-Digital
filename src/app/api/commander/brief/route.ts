import { NextRequest, NextResponse } from "next/server";
import { handleBriefSubmitted, parsePackOrder, type BriefInput } from "@/lib/pack-order-notify";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { getStripeClient, isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const briefRateLimit = { windowMs: 10 * 60 * 1000, max: 10 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Service indisponible." }, { status: 503 });
  }

  const rate = rateLimit(`brief:${getRequestIp(request)}`, briefRateLimit);
  const rateHeaders = getRateLimitHeaders(rate, briefRateLimit.max);
  if (!rate.allowed) {
    return NextResponse.json({ error: `Trop de tentatives. Réessayez dans ${rate.retryAfter}s.` }, { status: 429, headers: rateHeaders });
  }

  try {
    const body = await request.json();
    const sessionId = clean(body?.sessionId, 200);
    if (!sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Commande introuvable." }, { status: 400 });
    }

    const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
    const order = session.status === "complete" ? parsePackOrder(session) : null;
    if (!order) {
      return NextResponse.json({ error: "Commande introuvable ou non payée." }, { status: 404 });
    }

    const brief: BriefInput = {
      businessName: clean(body?.businessName, 120),
      activity: clean(body?.activity, 300),
      city: clean(body?.city, 120),
      services: clean(body?.services, 2000),
      tone: clean(body?.tone, 500),
      existingDomain: clean(body?.existingDomain, 160),
      links: clean(body?.links, 1000),
      assets: clean(body?.assets, 1000),
      notes: clean(body?.notes, 2000),
    };

    if (brief.activity.length < 3) {
      return NextResponse.json({ error: "Décrivez votre activité en quelques mots." }, { status: 400 });
    }

    await handleBriefSubmitted(order, brief);
    return NextResponse.json({ ok: true }, { headers: rateHeaders });
  } catch (error) {
    console.error("[api/commander/brief]", error);
    return NextResponse.json({ error: "Impossible d'envoyer le brief. Réessayez ou écrivez-nous." }, { status: 400 });
  }
}
