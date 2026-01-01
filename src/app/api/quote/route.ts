import { NextRequest, NextResponse } from "next/server";
import { quoteSchema, type QuoteRecord } from "@/lib/quote";
import { notifyQuote } from "@/lib/notifications";
import { getRecentQuotes, isSupabaseConfigured, saveQuoteRecord } from "@/lib/quote-store";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";
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
  const rateHeaders = {
    "X-RateLimit-Limit": String(quoteRateLimit.max),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
  };

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de demandes. Reessaie dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...rateHeaders, "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const turnstileToken = typeof payload?.turnstileToken === "string" ? payload.turnstileToken.trim() : "";
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Captcha manquant" },
        { status: 400, headers: rateHeaders }
      );
    }

    const verification = await verifyTurnstile(turnstileToken, remoteIp);
    if (!verification.success) {
      const errorCodes = verification["error-codes"] ?? [];
      const errorSuffix = errorCodes.length ? ` (codes: ${errorCodes.join(", ")})` : "";
      return NextResponse.json(
        { error: `Captcha invalide${errorSuffix}`, details: errorCodes },
        { status: 400, headers: rateHeaders }
      );
    }

    const websiteField = typeof payload?.website === "string" ? payload.website.trim() : "";
    if (websiteField) {
      return NextResponse.json({ ok: true }, { headers: rateHeaders });
    }
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
