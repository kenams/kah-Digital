import { NextRequest } from "next/server";
import { assistantMessageRequestSchema, type AssistantSession } from "@/lib/assistant/schema";
import { streamOpenAIText } from "@/lib/assistant/openai";
import { runAssistantTurn } from "@/lib/assistant/service";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const messageRateLimit = { windowMs: 10 * 60 * 1000, max: 20 };

function buildStreamingInstructions(locale: "fr" | "en" | "de") {
  if (locale === "en") {
    return `You are the live writing layer for the KAH-Digital website assistant.
Rewrite the prepared answer so it feels natural, direct, and premium.
Keep the exact business meaning, structure, budget ranges, numbers, constraints, and next step.
Do not invent new promises, prices, or timelines.
Keep the tone concise, professional, simple, and human.
Do not mention JSON, internal scoring, or backend logic.`;
  }

  if (locale === "de") {
    return `Du bist die Live-Antwortschicht des KAH-Digital Website-Assistenten.
Formuliere die vorbereitete Antwort natuerlich, direkt und hochwertig.
Behalte Bedeutung, Struktur, Budgetspannen, Zahlen, Grenzen und den naechsten Schritt exakt bei.
Erfinde keine neuen Zusagen, Preise oder Fristen.
Der Ton muss knapp, professionell, klar und menschlich sein.
Keine Hinweise auf JSON, internes Scoring oder Backend-Logik.`;
  }

  return `Tu es la couche de reponse live de l'assistant du site KAH-Digital.
Reformule la reponse preparee pour qu'elle paraisse naturelle, directe et premium.
Conserve exactement le sens metier, la structure, les fourchettes budget, les chiffres, les limites et la prochaine etape.
N'invente aucune promesse, aucun prix ou delai supplementaire.
Le ton doit rester concis, professionnel, simple et humain.
Ne parle jamais de JSON, de scoring interne ou de logique backend.`;
}

function patchAssistantReply(session: AssistantSession, reply: string) {
  const nextTranscript = [...session.transcript];
  for (let index = nextTranscript.length - 1; index >= 0; index -= 1) {
    if (nextTranscript[index]?.role === "assistant") {
      nextTranscript[index] = {
        ...nextTranscript[index],
        content: reply,
      };
      break;
    }
  }

  return {
    ...session,
    transcript: nextTranscript,
  };
}

function createSseEvent(event: string, payload: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
}

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  const rate = rateLimit(`assistant:message:${ip}`, messageRateLimit);

  if (!rate.allowed) {
    return new Response(
      createSseEvent("error", {
        error: `Trop de messages. Reessaie dans ${rate.retryAfter}s.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-RateLimit-Limit": String(messageRateLimit.max),
          "X-RateLimit-Remaining": String(rate.remaining),
          "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
          "Retry-After": String(rate.retryAfter),
        },
      }
    );
  }

  let parsedBody: ReturnType<typeof assistantMessageRequestSchema.safeParse>;
  try {
    const payload = await request.json();
    parsedBody = assistantMessageRequestSchema.safeParse(payload);
  } catch {
    parsedBody = assistantMessageRequestSchema.safeParse(null);
  }

  if (!parsedBody.success) {
    return new Response(
      createSseEvent("error", {
        error: "Donnees invalides",
        details: parsedBody.error.flatten(),
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      }
    );
  }

  const encoder = new TextEncoder();
  const body = parsedBody.data;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, payload: unknown) => {
        controller.enqueue(encoder.encode(createSseEvent(event, payload)));
      };

      try {
        const result = await runAssistantTurn(body);
        let finalReply = result.reply;
        let finalSession = result.session;
        let streamedReply = "";

        try {
          const streamed = await streamOpenAIText({
            instructions: buildStreamingInstructions(body.locale),
            input: JSON.stringify({
              locale: body.locale,
              user_message: body.message,
              intent: result.session.intent,
              project_type: result.session.projectType,
              progress: result.progress,
              summary: result.summary,
              prepared_reply: result.reply,
            }),
            onDelta(delta) {
              streamedReply += delta;
              send("text", { delta });
            },
          });

          if (streamed && streamed.trim()) {
            finalReply = streamed.trim();
            finalSession = patchAssistantReply(result.session, finalReply);
          }
        } catch (error) {
          console.warn("[api/assistant/message/stream] OpenAI streaming fallback", error);
        }

        if (!streamedReply.trim()) {
          send("text", { delta: finalReply });
        }

        send("done", {
          ...result,
          reply: finalReply,
          session: finalSession,
        });
      } catch (error) {
        console.error("[api/assistant/message/stream] Failed", error);
        send("error", { error: "Erreur serveur" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-RateLimit-Limit": String(messageRateLimit.max),
      "X-RateLimit-Remaining": String(rate.remaining),
      "X-RateLimit-Reset": String(Math.ceil(rate.resetAt / 1000)),
    },
  });
}
