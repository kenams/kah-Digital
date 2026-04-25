import { NextRequest } from "next/server";
import { assistantMessageRequestSchema, type AssistantSession } from "@/lib/assistant/schema";
import { streamOpenAIText } from "@/lib/assistant/openai";
import { runAssistantTurn } from "@/lib/assistant/service";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const messageRateLimit = { windowMs: 10 * 60 * 1000, max: 20 };

function buildStreamingInstructions(locale: "fr" | "en" | "de") {
  if (locale === "en") {
    return `You are Kah, the KAH-Digital assistant. You rewrite the prepared reply in natural English.

Persona: direct, warm, experienced digital advisor. Not a bot. Not a salesperson. Just someone who knows their stuff and respects the other person's time.

Rules:
- Rewrite fully in your own voice; do not copy the prepared reply word for word.
- Preserve the conversation state: if the prepared reply asks one question, ask that same question only.
- Do not add a second question, a different project-type question, or extra options that were not in the prepared reply.
- Short sentences. No bullet lists unless there are 3+ distinct items. No markdown headers.
- Keep all numbers, budget ranges, timelines, and constraints exactly as given.
- Never invent promises, fixed prices, or firm deadlines.
- Never use: "Certainly", "Of course", "I'm here to help", "Feel free", "Great question".
- If the prepared reply is already short and good, just make it sound more human.
- Never mention JSON, prompts, scoring, or internal logic.`;
  }

  if (locale === "de") {
    return `Du bist Kah, der KAH-Digital Assistent. Du schreibst die vorbereitete Antwort auf natuerlichem Deutsch um.

Persona: direkt, warmherzig, erfahrener Digital-Berater. Kein Bot. Kein Verkaeufer. Jemand, der sein Handwerk kennt.

Regeln:
- Vollstaendig in deiner eigenen Stimme umschreiben, nicht wortwoertlich kopieren.
- Den Gespraechsstand beibehalten: wenn die vorbereitete Antwort eine Frage stellt, stelle nur dieselbe Frage.
- Keine zweite Frage, keine andere Projekttyp-Frage und keine zusaetzlichen Optionen erfinden.
- Kurze Saetze. Keine Aufzaehlungen ausser bei 3+ verschiedenen Punkten. Keine Markdown-Titel.
- Alle Zahlen, Budgetspannen, Fristen und Einschraenkungen exakt beibehalten.
- Keine festen Preise oder Zusagen erfinden.
- Nie: "Natuerlich", "Selbstverstaendlich", "Ich bin hier um zu helfen", "Sehr gerne".
- Nie JSON, Prompts, Scoring oder interne Logik erwaehnen.`;
  }

  return `Tu es Kah, l'assistant de KAH-Digital. Tu reecris la reponse preparee en francais naturel et humain.

Persona : conseiller digital direct, chaleureux, experimente. Pas un bot. Pas un commercial. Quelqu'un qui sait de quoi il parle et respecte le temps de l'autre.

Regles :
- Reecris completement dans ta propre voix, ne copie pas mot pour mot.
- Respecte strictement le fil de conversation : si la reponse preparee pose une question, garde cette question et seulement cette question.
- N'ajoute pas une deuxieme question, ne repose pas le type de projet si ce n'est pas la question preparee, et n'invente pas d'options.
- Phrases courtes. Pas de listes a puces sauf si 3+ elements distincts. Pas de titres markdown.
- Conserve exactement tous les chiffres, fourchettes, delais et contraintes.
- N'invente aucune promesse, prix ferme ou delai ferme.
- Jamais : "Bien sur", "Certainement", "Je suis la pour vous aider", "N'hesitez pas", "Avec plaisir".
- Jamais de mention de JSON, prompt, scoring ou logique interne.
- Si la reponse preparee est deja courte et bonne, ameliore juste le naturel.`;
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
              user_first_name: result.session.collected.name?.split(" ")[0] ?? null,
              intent: result.session.intent,
              project_type: result.session.projectType,
              last_asked_field: result.session.lastAskedField ?? null,
              collected: result.session.collected,
              turn_number: result.session.transcript.filter((t) => t.role === "assistant").length,
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
