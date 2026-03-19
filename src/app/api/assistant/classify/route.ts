import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { classifyRequest } from "@/lib/assistant/service";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const requestSchema = z.object({
  input: z.string().min(1),
  locale: z.enum(["fr", "en", "de"]).default("fr"),
});

const classifyRateLimit = { windowMs: 10 * 60 * 1000, max: 30 };

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const rate = rateLimit(`assistant:classify:${ip}`, classifyRateLimit);
  const headers = {
    "X-RateLimit-Limit": String(classifyRateLimit.max),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
  };

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de requetes. Reessaie dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...headers, "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const parsed = requestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers }
      );
    }

    const result = await classifyRequest(parsed.data.input, parsed.data.locale);
    return NextResponse.json(result, { headers });
  } catch (error) {
    console.error("[api/assistant/classify] Failed", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers });
  }
}
