import { NextRequest, NextResponse } from "next/server";
import { assistantMessageRequestSchema } from "@/lib/assistant/schema";
import { generateOpenAIJson } from "@/lib/assistant/openai";
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

    // Try to enhance the reply with OpenAI (non-streaming fallback)
    try {
      const locale = parsed.data.locale ?? "fr";
      const firstName = result.session.collected.name?.split(" ")[0] ?? null;
      const recentTranscript = result.session.transcript
        .slice(-6)
        .map((t) => `${t.role === "assistant" ? "Kah" : "User"}: ${t.content}`)
        .join("\n");

      const instructions =
        locale === "en"
          ? `You are Kah, KAH Digital advisor. Rewrite the prepared reply in natural English. Be direct, give real numbers, no filler phrases. Short sentences.`
          : locale === "de"
            ? `Du bist Kah, KAH Digital Berater. Schreibe die vorbereitete Antwort auf natürlichem Deutsch um. Direkt, echte Zahlen, kurze Sätze.`
            : `Tu es Kah, conseiller KAH Digital. Réécris la réponse préparée en français naturel et direct. Donne de vrais chiffres, phrases courtes. Pas de "Bien sûr", "N'hésitez pas", "Avec plaisir."`;

      const enhanced = await generateOpenAIJson<{ reply: string }>({
        instructions,
        input: JSON.stringify({
          user_message: parsed.data.message,
          conversation: recentTranscript,
          prepared_reply: result.reply,
          first_name: firstName,
        }),
      });

      if (enhanced?.reply?.trim()) {
        const patchedTranscript = [...result.session.transcript];
        for (let i = patchedTranscript.length - 1; i >= 0; i--) {
          if (patchedTranscript[i]?.role === "assistant") {
            patchedTranscript[i] = { ...patchedTranscript[i], content: enhanced.reply.trim() };
            break;
          }
        }
        return NextResponse.json(
          { ...result, reply: enhanced.reply.trim(), session: { ...result.session, transcript: patchedTranscript } },
          { headers }
        );
      }
    } catch {
      // Silent fallback to rule-based reply
    }

    return NextResponse.json(result, { headers });
  } catch (error) {
    console.error("[api/assistant/message] Failed", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500, headers });
  }
}
