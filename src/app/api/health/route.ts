import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getRecentAssistantRecords, isSupabaseConfigured as isAssistantSupabaseConfigured } from "@/lib/assistant-store";
import { getRecentQuotes, isSupabaseConfigured as isQuoteSupabaseConfigured } from "@/lib/quote-store";
import { isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

type CheckStatus = "ok" | "degraded";

type ServiceCheck = {
  status: CheckStatus;
  detail: string;
};

function makeCheck(status: CheckStatus, detail: string): ServiceCheck {
  return { status, detail };
}

export async function GET() {
  const checks: Record<string, ServiceCheck> = {
    app: makeCheck("ok", "Application reachable"),
    resend: process.env.RESEND_API_KEY
      ? makeCheck("ok", "RESEND_API_KEY present")
      : makeCheck("degraded", "RESEND_API_KEY missing"),
    stripe: isStripeConfigured()
      ? makeCheck("ok", "Stripe configured")
      : makeCheck("degraded", "Stripe not configured"),
    turnstile: process.env.TURNSTILE_SECRET_KEY
      ? makeCheck("ok", "Turnstile configured")
      : makeCheck("degraded", "Turnstile secret missing"),
    anthropic: makeCheck("ok", "checking..."),
    openai: process.env.OPENAI_API_KEY
      ? makeCheck("ok", "OPENAI_API_KEY present")
      : makeCheck("degraded", "OPENAI_API_KEY missing"),
    gmail: process.env.GMAIL_APP_PASSWORD
      ? makeCheck("ok", "GMAIL_APP_PASSWORD present")
      : makeCheck("degraded", "GMAIL_APP_PASSWORD missing — admin notifications disabled"),
  };

  // Test Anthropic API key with a real ping
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 5,
        messages: [{ role: "user", content: "ping" }],
      });
      checks.anthropic = makeCheck("ok", "ANTHROPIC_API_KEY valid — API responding");
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      checks.anthropic = makeCheck("degraded", `ANTHROPIC_API_KEY set but API error: ${msg.slice(0, 200)}`);
    }
  } else {
    checks.anthropic = makeCheck("degraded", "ANTHROPIC_API_KEY missing — audits use rule-based fallback");
  }

  const supabaseReady = isQuoteSupabaseConfigured() && isAssistantSupabaseConfigured();
  if (!supabaseReady) {
    checks.supabase = makeCheck("degraded", "Supabase env vars missing");
  } else {
    const [quotesCheck, assistantCheck] = await Promise.allSettled([
      getRecentQuotes(1),
      getRecentAssistantRecords(1),
    ]);

    const quoteOk = quotesCheck.status === "fulfilled";
    const assistantOk = assistantCheck.status === "fulfilled";

    checks.supabase = quoteOk && assistantOk
      ? makeCheck("ok", "Quotes and assistant stores reachable")
      : makeCheck("degraded", "At least one Supabase query failed");
  }

  const degraded = Object.values(checks).some((check) => check.status === "degraded");

  return NextResponse.json(
    {
      status: degraded ? "degraded" : "ok",
      checkedAt: new Date().toISOString(),
      checks,
    },
    {
      status: degraded ? 503 : 200,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    }
  );
}
