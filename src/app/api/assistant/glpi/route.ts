import { NextRequest, NextResponse } from "next/server";
import { assistantGlpiRequestSchema } from "@/lib/assistant/schema";
import { createGlpiTicket } from "@/lib/assistant/service";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const glpiRateLimit = { windowMs: 10 * 60 * 1000, max: 6 };

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const rate = rateLimit(`assistant:glpi:${ip}`, glpiRateLimit);
  const headers = {
    "X-RateLimit-Limit": String(glpiRateLimit.max),
    "X-RateLimit-Remaining": String(rate.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
  };

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de demandes. Reessaie dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...headers, "Retry-After": String(rate.retryAfter) } }
    );
  }

  try {
    const payload = await request.json();
    const parsed = assistantGlpiRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers }
      );
    }

    const result = await createGlpiTicket(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: "error" in result ? result.error : "Erreur assistant" }, { status: 400, headers });
    }

    return NextResponse.json(result, { headers });
  } catch (error) {
    console.error("[api/assistant/glpi] Failed", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers });
  }
}
