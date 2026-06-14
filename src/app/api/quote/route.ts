import { NextRequest, NextResponse } from "next/server";
import { quoteSchema, type QuoteAttribution, type QuoteRecord } from "@/lib/quote";
import { notifyQuote } from "@/lib/notifications";
import { getRecentQuotes, isSupabaseConfigured, saveQuoteRecord } from "@/lib/quote-store";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const adminToken = process.env.ADMIN_API_TOKEN;
const quoteRateLimit = { windowMs: 10 * 60 * 1000, max: 6 };

export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }

  if (!adminToken) {
    return NextResponse.json({ error: "Admin token absent" }, { status: 503 });
  }

  const header = request.headers.get("authorization");
  if (!header || header !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const items = await getRecentQuotes();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("[api/quote] Failed to fetch quotes", error);
    return NextResponse.json({ error: "Erreur de lecture des demandes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    return NextResponse.json({ error: "Captcha non configure" }, { status: 503 });
  }

  const ip = getRequestIp(request);
  const remoteIp = ip === "unknown" ? null : ip;
  const rate = rateLimit(`quote:${ip}`, quoteRateLimit);
  const rateHeaders = getRateLimitHeaders(rate, quoteRateLimit.max);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de demandes. Reessaie dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...rateHeaders, "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const turnstileToken = typeof payload?.turnstileToken === "string" ? payload.turnstileToken.trim() : "";
    // Captcha optionnel — widget non chargé sur kah-digital.ch (domaine non whitelisté Cloudflare)
    if (turnstileToken) {
      const verification = await verifyTurnstile(turnstileToken, remoteIp);
      if (!verification.success) {
        const errorCodes = verification["error-codes"] ?? [];
        const errorSuffix = errorCodes.length ? ` (codes: ${errorCodes.join(", ")})` : "";
        return NextResponse.json(
          { error: `Captcha invalide${errorSuffix}`, details: errorCodes },
          { status: 400, headers: rateHeaders }
        );
      }
    }

    const websiteField = typeof payload?.website === "string" ? payload.website.trim() : "";
    if (websiteField) {
      return NextResponse.json({ ok: true }, { headers: rateHeaders });
    }

    // Extract attribution before zod strips unknown fields
    const attribution: QuoteAttribution = {
      utm_source: payload?.utm_source || undefined,
      utm_medium: payload?.utm_medium || undefined,
      utm_campaign: payload?.utm_campaign || undefined,
      utm_content: payload?.utm_content || undefined,
      referrer: payload?.referrer || undefined,
      landing_page: payload?.landing_page || undefined,
    };

    const sanitized = { ...payload };
    delete sanitized.turnstileToken;
    const parsed = quoteSchema.safeParse(sanitized);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers: rateHeaders }
      );
    }

    const quote: QuoteRecord = {
      ...parsed.data,
      ...attribution,
      feasibility: "pending",
      deposit: "none",
      submittedAt: new Date().toISOString(),
    };
    await saveQuoteRecord(quote);

    await notifyQuote(quote);

    return NextResponse.json({ ok: true }, { headers: rateHeaders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers: rateHeaders });
  }
}
