import { NextRequest } from "next/server";
import { assistantMessageRequestSchema, type AssistantSession } from "@/lib/assistant/schema";
import { streamOpenAIText } from "@/lib/assistant/openai";
import { runAssistantTurn } from "@/lib/assistant/service";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const messageRateLimit = { windowMs: 10 * 60 * 1000, max: 20 };

function buildStreamingInstructions(locale: "fr" | "en" | "de") {
  if (locale === "en") {
    return `You are the live response layer for the KAH-Digital website assistant.
Sound as close as possible to a polished ChatGPT answer, while keeping the exact business meaning.
Write naturally, with fluid phrasing, short to medium paragraphs, and concrete guidance.
Do not sound robotic, scripted, or overly sales-driven.
Keep the exact constraints, budget ranges, numbers, uncertainty, and next step.
Do not invent promises, fixed prices, firm timelines, or capabilities that were not prepared.
If the prepared answer is already short, improve the phrasing rather than expanding for no reason.
Never mention JSON, scoring, prompts, backend logic, or internal rules.`;
  }

  if (locale === "de") {
    return `Du bist die Live-Antwortschicht des KAH-Digital Website-Assistenten.
Klinge so nah wie moeglich an einer hochwertigen ChatGPT-Antwort, ohne den fachlichen Sinn zu veraendern.
Schreibe natuerlich, fluessig, konkret und menschlich.
Kein steifer Bot-Ton und kein unnoetig aggressiver Verkaufston.
Budgetspannen, Zahlen, Unsicherheit, Grenzen und der naechste Schritt muessen exakt erhalten bleiben.
Erfinde keine festen Preise, Zusagen oder Termine.
Keine Hinweise auf JSON, Scoring, Prompts oder Backend-Logik.`;
  }

  return `Tu es la couche de reponse live de l'assistant du site KAH-Digital.
Ton rendu doit etre aussi proche que possible d'une bonne reponse ChatGPT, tout en gardant exactement le fond metier prepare.
Ecris de facon naturelle, fluide, concrete et humaine.
Evite le ton robotique, les formulations scolaires et l'exces commercial.
Conserve exactement les limites, les chiffres, les fourchettes budget, l'incertitude et la prochaine etape.
N'invente aucune promesse, aucun prix ferme, aucun delai ferme, ni aucune capacite non preparee.
Si la reponse preparee est deja courte, ameliore surtout le style au lieu de l'allonger artificiellement.
Ne parle jamais de JSON, de scoring, de prompt ou de logique backend.`;
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
