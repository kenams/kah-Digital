import { NextRequest, NextResponse } from "next/server";
import { assistantEmailRequestSchema } from "@/lib/assistant/schema";
import { sendEmail } from "@/lib/assistant/service";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const emailRateLimit = { windowMs: 10 * 60 * 1000, max: 6 };

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const rate = rateLimit(`assistant:email:${ip}`, emailRateLimit);
  const headers = {
    "X-RateLimit-Limit": String(emailRateLimit.max),
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
    const parsed = assistantEmailRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Donnees invalides", details: parsed.error.flatten() },
        { status: 400, headers }
      );
    }

    const result = await sendEmail(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: "error" in result ? result.error : "Erreur assistant" }, { status: 400, headers });
    }

    return NextResponse.json(result, { headers });
  } catch (error) {
    console.error("[api/assistant/email] Failed", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers });
  }
}
