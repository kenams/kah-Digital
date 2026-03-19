import { NextRequest, NextResponse } from "next/server";
import { assistantMessageRequestSchema } from "@/lib/assistant/schema";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";
import { runAssistantTurn } from "@/lib/assistant/service";

const messageRateLimit = { windowMs: 10 * 60 * 1000, max: 20 };

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const rate = rateLimit(`assistant:message:${ip}`, messageRateLimit);
  const headers = {
    "X-RateLimit-Limit": String(messageRateLimit.max),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
  };

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de messages. Reessaie dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...headers, "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const parsed = assistantMessageRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers }
      );
    }

    const result = await runAssistantTurn(parsed.data);
    return NextResponse.json(result, { headers });
  } catch (error) {
    console.error("[api/assistant/message] Failed", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers });
  }
}
