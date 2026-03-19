import { NextRequest, NextResponse } from "next/server";
import { assistantLeadRequestSchema } from "@/lib/assistant/schema";
import { createLead } from "@/lib/assistant/service";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const leadRateLimit = { windowMs: 10 * 60 * 1000, max: 6 };

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const rate = rateLimit(`assistant:lead:${ip}`, leadRateLimit);
  const headers = {
    "X-RateLimit-Limit": String(leadRateLimit.max),
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
    const parsed = assistantLeadRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers }
      );
    }

    const result = await createLead(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: "error" in result ? result.error : "Erreur assistant" }, { status: 400, headers });
    }

    return NextResponse.json(result, { headers });
  } catch (error) {
    console.error("[api/assistant/lead] Failed", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers });
  }
}
