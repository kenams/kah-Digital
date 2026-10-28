import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/lib/locales";
import { handleBriefSubmitted, parsePackOrder, type BriefInput } from "@/lib/pack-order-notify";
import { isOrderLocale } from "@/lib/pack-orders";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { getStripeClient, isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const briefRateLimit = { windowMs: 10 * 60 * 1000, max: 10 };

const MESSAGES: Record<Locale, { unavailable: string; tooMany: (s: number) => string; notFound: string; activity: string; failed: string }> = {
  fr: {
    unavailable: "Service indisponible.",
    tooMany: (s) => `Trop de tentatives. Réessayez dans ${s}s.`,
    notFound: "Commande introuvable ou non payée.",
    activity: "Décrivez votre activité en quelques mots.",
    failed: "Impossible d'envoyer le brief. Réessayez ou écrivez-nous.",
  },
  en: {
    unavailable: "Service unavailable.",
    tooMany: (s) => `Too many attempts. Try again in ${s}s.`,
    notFound: "Order not found or not paid.",
    activity: "Please describe your business in a few words.",
    failed: "Unable to send the brief. Please try again or write to us.",
  },
  de: {
    unavailable: "Dienst nicht verfügbar.",
    tooMany: (s) => `Zu viele Versuche. Bitte in ${s}s erneut versuchen.`,
    notFound: "Bestellung nicht gefunden oder nicht bezahlt.",
    activity: "Bitte beschreiben Sie Ihre Tätigkeit in wenigen Worten.",
    failed: "Das Briefing konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns.",
  },
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  let locale: Locale = "fr";

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: MESSAGES.fr.unavailable }, { status: 503 });
  }

  try {
    const body = await request.json();
    locale = isOrderLocale(body?.locale) ? body.locale : "fr";
    const msg = MESSAGES[locale];

    const rate = rateLimit(`brief:${getRequestIp(request)}`, briefRateLimit);
    const rateHeaders = getRateLimitHeaders(rate, briefRateLimit.max);
    if (!rate.allowed) {
      return NextResponse.json({ error: msg.tooMany(rate.retryAfter) }, { status: 429, headers: rateHeaders });
    }

    const sessionId = clean(body?.sessionId, 200);
    if (!sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: msg.notFound }, { status: 400 });
    }

    const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
    const order = session.status === "complete" ? parsePackOrder(session) : null;
    if (!order) {
      return NextResponse.json({ error: msg.notFound }, { status: 404 });
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
      return NextResponse.json({ error: msg.activity }, { status: 400 });
    }

    await handleBriefSubmitted(order, brief);
    return NextResponse.json({ ok: true }, { headers: rateHeaders });
  } catch (error) {
    console.error("[api/commander/brief]", error);
    return NextResponse.json({ error: MESSAGES[locale].failed }, { status: 400 });
  }
}
