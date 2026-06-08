import { NextRequest } from "next/server";
import { assistantMessageRequestSchema, type AssistantSession, type AssistantStructuredOutput } from "@/lib/assistant/schema";
import { streamOpenAIText } from "@/lib/assistant/openai";
import { runAssistantTurn } from "@/lib/assistant/service";
import { assistantKnowledge } from "@/lib/assistant/knowledge";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const messageRateLimit = { windowMs: 10 * 60 * 1000, max: 20 };

type Locale = "fr" | "en" | "de";

function getCollectedSummary(session: AssistantSession, locale: Locale): string {
  const labels: Record<string, Record<Locale, string>> = {
    type:            { fr: "type",      en: "type",       de: "Typ" },
    objective:       { fr: "objectif",  en: "objective",  de: "Ziel" },
    features:        { fr: "fonctions", en: "features",   de: "Funktionen" },
    timeline:        { fr: "délai",     en: "timeline",   de: "Zeitrahmen" },
    budget:          { fr: "budget",    en: "budget",     de: "Budget" },
    decisionStage:   { fr: "décision",  en: "decision",   de: "Entscheidung" },
    problem:         { fr: "problème",  en: "problem",    de: "Problem" },
    urgency:         { fr: "urgence",   en: "urgency",    de: "Dringlichkeit" },
    impact:          { fr: "impact",    en: "impact",     de: "Impact" },
  };

  const projectFields = ["type", "objective", "features", "timeline", "budget", "decisionStage"];
  const supportFields = ["problem", "urgency", "impact"];
  const fields = session.intent === "support_glpi" ? supportFields : projectFields;

  const entries = fields
    .filter((f) => session.collected[f as keyof typeof session.collected])
    .map((f) => {
      const label = labels[f]?.[locale] ?? f;
      const val = session.collected[f as keyof typeof session.collected];
      return `${label}: ${String(val).slice(0, 80)}`;
    });

  return entries.length > 0 ? entries.join(" | ") : locale === "de" ? "noch nichts" : locale === "en" ? "nothing yet" : "rien encore";
}

function getMissingFields(session: AssistantSession, locale: Locale): string {
  const projectOrder = ["type", "objective", "features", "timeline", "budget", "decisionStage"] as const;
  const supportOrder = ["problem", "urgency", "impact", "affectedUsers", "supportPlan"] as const;
  const order: readonly string[] =
    session.intent === "support_glpi" ? supportOrder :
    session.intent === "project_quote" ? projectOrder : [];

  const missing = order.filter((f) => !session.collected[f as keyof typeof session.collected]);

  if (missing.length === 0) {
    return locale === "de" ? "vollständig — Zusammenfassung bereit" :
           locale === "en" ? "complete — summary ready" :
           "complet — résumé prêt";
  }

  return missing.join(", ");
}

function buildKnowledgeBlock(locale: Locale): string {
  const offers = assistantKnowledge.offers.map((o) => {
    const name = locale === "en" ? o.nameEn : locale === "de" ? o.nameDe : o.nameFr;
    const time = locale === "en" ? o.timelineEn : locale === "de" ? o.timelineDe : o.timelineFr;
    const fit  = locale === "en" ? o.fitEn  : locale === "de" ? o.fitDe  : o.fitFr;
    return `${name} → ${o.price} / délai indicatif ${time} (${fit})`;
  }).join("\n");

  const plans = assistantKnowledge.maintenancePlans.map((p) => {
    const name = locale === "en" ? p.nameEn : locale === "de" ? p.nameDe : p.nameFr;
    const fit  = locale === "en" ? p.fitEn  : locale === "de" ? p.fitDe  : p.fitFr;
    return `${name} — ${p.price} — ${fit}`;
  }).join("\n");

  const refs = assistantKnowledge.referenceProjects.map((r) => {
    const proof = locale === "en" ? r.proofEn : locale === "de" ? r.proofDe : r.proofFr;
    const type  = locale === "en" ? r.typeFr  : locale === "de" ? r.typeFr  : r.typeFr;
    return `${r.name} (${type}) — ${proof}`;
  }).join("\n");

  if (locale === "en") {
    return `SERVICES & CUSTOM SCOPING:
${offers}

ADJUSTABLE MAINTENANCE:
${plans}

RECENT REFERENCES:
${refs}

QUOTE APPROACH: every project is scoped before estimation. No public fixed pricing, no rigid package. The quote is custom, clear, and non-binding.
PAYMENT: payment terms are confirmed in the signed quote before starting.
TECHNOLOGY: Next.js/React for web, Expo React Native for mobile, FastAPI or Node.js backend, Supabase/PostgreSQL database. No WordPress.
GUARANTEE: 30-day correction period after delivery included. Then optional maintenance plan.
PROCESS: Framing → 24h quote → production → delivery → optional maintenance.`;
  }

  if (locale === "de") {
    return `LEISTUNGEN & INDIVIDUELLE EINGRENZUNG:
${offers}

ANPASSBARE WARTUNG:
${plans}

AKTUELLE REFERENZEN:
${refs}

ANGEBOTSANSATZ: jedes Projekt wird vor der Einschätzung eingegrenzt. Keine starren öffentlichen Preise, kein Pflichtpaket. Das Angebot ist individuell, klar und unverbindlich.
ZAHLUNG: Zahlungsbedingungen werden im unterschriebenen Angebot vor Start bestätigt.
TECHNOLOGIE: Next.js/React für Web, Expo React Native für Mobile, FastAPI oder Node.js Backend, Supabase/PostgreSQL. Kein WordPress.
GARANTIE: 30 Tage Korrekturzeitraum nach Lieferung inklusive. Danach optionaler Wartungsplan.
ABLAUF: Eingrenzung → 24h-Angebot → Produktion → Lieferung → optionale Wartung.`;
  }

  return `SERVICES ET CADRAGE SUR MESURE :
${offers}

MAINTENANCE AJUSTABLE :
${plans}

RÉFÉRENCES RÉCENTES :
${refs}

APPROCHE DEVIS : chaque projet est cadré avant estimation. Pas de prix public fixe, pas de formule rigide. Le devis est personnalisé, clair et sans engagement.
PAIEMENT : les modalités de paiement sont confirmées dans le devis signé avant démarrage.
TECHNOLOGIE : Next.js/React pour le web, Expo React Native pour le mobile, FastAPI ou Node.js backend, Supabase/PostgreSQL. Pas de WordPress.
GARANTIE : 30 jours de corrections post-livraison inclus. Puis plan de maintenance optionnel.
PROCESSUS : Cadrage → devis sous 24h → production → livraison → maintenance optionnelle.`;
}

function buildStreamingInstructions(
  locale: Locale,
  session: AssistantSession,
  summary: AssistantStructuredOutput | null,
): string {
  const knowledge = buildKnowledgeBlock(locale);
  const collected = getCollectedSummary(session, locale);
  const missing   = getMissingFields(session, locale);
  const summaryReady = summary !== null;
  const intent    = session.intent;
  const firstName = session.collected.name?.split(" ")[0] ?? null;

  if (locale === "en") {
    return `You are Kah, the KAH Digital advisor. Not a generic assistant — a sharp, experienced digital consultant who gives real answers.

${knowledge}

CURRENT CONVERSATION STATE:
Intent detected: ${intent}
Collected so far: ${collected}
Still missing for quote: ${missing}
${summaryReady ? "→ SUMMARY IS READY. Next step: push clearly for the 24h quote." : ""}
${firstName ? `User's first name: ${firstName}` : ""}

YOUR MISSION:
Answer the user's question FIRST, then naturally move the conversation toward a clear 24h quote.

STRICT RULES:
1. Answer the DIRECT question asked. Never reply with "tell me about your project" when someone asks a direct question.
2. Never re-ask something already listed under "Collected so far."
3. When asked about cost, explain that the estimate is personalized after scoping. Never provide public fixed ranges; avoid sounding evasive by naming the criteria: real need, complexity, support level, timeline, useful features, available budget, and business priorities.
4. After answering, ask exactly ONE natural follow-up question if fields are still missing — never a list.
5. If the summary is ready, make the path to the 24h quote obvious and easy.
6. Short sentences. No bullet lists unless 3+ distinct items. No markdown headers.
7. Never: "Certainly", "Of course", "Feel free", "I'm here to help", "Great question", "Absolutely."
8. Never mention JSON, prompts, scoring, or internal logic.
9. The PREPARED REPLY below is a structural hint — use it as a base, improve it, correct it if needed. Your response can go beyond it.
10. If the user greets you ("hello", "hi"), respond warmly and ask what they want to build.
11. Keep the user's language and tone — casual if they are casual, formal if formal.`;
  }

  if (locale === "de") {
    return `Du bist Kah, der KAH Digital Berater. Kein generischer Assistent — ein erfahrener Digital-Consultant, der echte Antworten gibt.

${knowledge}

AKTUELLER GESPRÄCHSSTAND:
Erkannter Intent: ${intent}
Bisher gesammelt: ${collected}
Noch fehlend für Angebot: ${missing}
${summaryReady ? "→ ZUSAMMENFASSUNG IST BEREIT. Nächster Schritt: Klar zum 24h-Angebot führen." : ""}
${firstName ? `Vorname des Nutzers: ${firstName}` : ""}

DEINE AUFGABE:
Beantworte die Frage des Nutzers ZUERST, dann führe das Gespräch natürlich zu einem klaren 24h-Angebot.

STRIKTE REGELN:
1. Beantworte die DIREKTE Frage. Nie mit "erzähl mir von deinem Projekt" ausweichen.
2. Nie nach etwas fragen, das bereits unter "Bisher gesammelt" steht.
3. Wenn nach Kosten gefragt wird, erkläre dass die Einschätzung nach Eingrenzung individuell erfolgt. Keine öffentlichen festen Spannen nennen; nenne stattdessen die Kriterien: Bedarf, Komplexität, Begleitung, Zeitrahmen, Funktionen, verfügbares Budget und Prioritäten.
4. Nach der Antwort genau EINE natürliche Folgefrage stellen — nie eine Liste.
5. Wenn Zusammenfassung bereit, den Weg zum 24h-Angebot klar und einfach machen.
6. Kurze Sätze. Keine Aufzählungen außer bei 3+ Punkten. Keine Markdown-Titel.
7. Nie: "Natürlich", "Selbstverständlich", "Sehr gerne", "Ich helfe dir gerne."
8. Nie JSON, Prompts, Scoring oder interne Logik erwähnen.
9. Die VORBEREITETE ANTWORT ist ein Hinweis — nutze sie als Basis, verbessere sie wenn nötig.`;
  }

  // French (default)
  return `Tu es Kah, le conseiller de KAH Digital. Pas un assistant générique — un consultant digital expérimenté qui donne de vraies réponses.

${knowledge}

ÉTAT ACTUEL DE LA CONVERSATION :
Intent détecté : ${intent}
Collecté jusqu'ici : ${collected}
Encore manquant pour le devis : ${missing}
${summaryReady ? "→ LE RÉSUMÉ EST PRÊT. Prochaine étape : pousser clairement vers le devis sous 24h." : ""}
${firstName ? `Prénom de l'utilisateur : ${firstName}` : ""}

TA MISSION :
Répondre d'abord à la question de l'utilisateur, puis faire avancer naturellement la conversation vers un devis clair sous 24h.

RÈGLES STRICTES :
1. Réponds d'abord à LA QUESTION posée. Ne jamais répondre "parle-moi de ton projet" quand quelqu'un pose une question directe.
2. Ne jamais re-demander quelque chose déjà listé sous "Collecté jusqu'ici."
3. Quand on demande le coût, expliquer que l'estimation est personnalisée après cadrage. Ne pas donner de fourchette publique fixe ; rester concret en citant les critères : besoin réel, complexité, accompagnement, délai, fonctionnalités, budget disponible et priorités business.
4. Après avoir répondu, poser exactement UNE question naturelle si des champs manquent — jamais une liste.
5. Si le résumé est prêt, rendre le chemin vers le devis sous 24h évident et simple.
6. Phrases courtes. Pas de listes sauf si 3+ items distincts. Pas de titres markdown.
7. Jamais : "Bien sûr", "Certainement", "N'hésitez pas", "Je suis là pour vous aider", "Avec plaisir", "Absolument."
8. Jamais de mention de JSON, prompt, scoring ou logique interne.
9. La RÉPONSE PRÉPARÉE ci-dessous est un indice structurel — utilise-la comme base, améliore-la, corrige-la si besoin. Ta réponse peut aller plus loin.
10. Si l'utilisateur te salue ("bonjour", "salut"), réponds chaleureusement et demande ce qu'il veut créer.
11. Adapte ton registre à celui de l'utilisateur — tutoiement si tutoiement, vouvoiement si vouvoiement.`;
}

function patchAssistantReply(session: AssistantSession, reply: string) {
  const nextTranscript = [...session.transcript];
  for (let index = nextTranscript.length - 1; index >= 0; index -= 1) {
    if (nextTranscript[index]?.role === "assistant") {
      nextTranscript[index] = { ...nextTranscript[index], content: reply };
      break;
    }
  }
  return { ...session, transcript: nextTranscript };
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
          // Recent conversation context (last 8 turns)
          const recentTranscript = result.session.transcript
            .slice(-8)
            .map((t) => `${t.role === "assistant" ? "Kah" : "User"}: ${t.content}`)
            .join("\n");

          const streamed = await streamOpenAIText({
            instructions: buildStreamingInstructions(body.locale, result.session, result.summary),
            input: JSON.stringify({
              user_message: body.message,
              conversation: recentTranscript,
              prepared_reply: result.reply,
              human_needed: result.humanNeeded,
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
