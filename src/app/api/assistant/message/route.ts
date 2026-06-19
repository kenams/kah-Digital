import { NextRequest, NextResponse } from "next/server";
import { assistantMessageRequestSchema } from "@/lib/assistant/schema";
import { streamOpenAIText } from "@/lib/assistant/openai";
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

    // Humanizer — rewrite rule-based reply into natural Kah persona
    try {
      const locale = parsed.data.locale ?? "fr";
      const firstName = result.session.collected.name?.split(" ")[0] ?? null;
      const recentTranscript = result.session.transcript
        .slice(-10)
        .map((t) => `${t.role === "assistant" ? "Kah" : "Visiteur"}: ${t.content}`)
        .join("\n");

      const instructions =
        locale === "en"
          ? `You are Kah, the KAH Digital advisor. Your tone: direct, sharp, no corporate filler.
Rules:
- Never start with "Of course", "Sure", "Absolutely", "Feel free", "With pleasure", "I'm here to"
- Use short sentences. Give concrete numbers when available.
- Keep the full meaning of the prepared reply — rephrase, don't summarize.
- If the visitor has a name, use it once naturally.
- Output only the final reply text, nothing else.

Examples of bad → good rewrites:
BAD: "Of course! I'd be happy to help you frame your project."
GOOD: "Let's frame this properly."
BAD: "Don't hesitate to share more details about your needs."
GOOD: "What's the main feature you need on day one?"`
          : locale === "de"
            ? `Du bist Kah, der KAH Digital Berater. Dein Ton: direkt, klar, kein Unternehmenssprech.
Regeln:
- Nie starten mit "Natürlich", "Gerne", "Selbstverständlich", "Zögern Sie nicht"
- Kurze Sätze. Echte Zahlen wenn vorhanden.
- Den vollen Sinn der vorbereiteten Antwort behalten — umformulieren, nicht kürzen.
- Wenn der Name bekannt ist, einmal natürlich verwenden.
- Nur den finalen Antworttext ausgeben, nichts anderes.`
            : `Tu es Kah, le conseiller de KAH Digital. Ton style : direct, franc, zéro langue de bois.
Règles strictes :
- Ne jamais commencer par "Bien sûr", "Avec plaisir", "N'hésitez pas", "Je suis là pour", "Absolument", "Parfait !"
- Phrases courtes. Chiffres concrets quand disponibles.
- Garder le sens complet de la réponse préparée — reformuler, pas résumer.
- Si le prénom est connu, l'utiliser une fois naturellement.
- Retourner uniquement le texte final de la réponse, rien d'autre.

Exemples bon → mauvais :
MAUVAIS: "Bien sûr ! Je suis là pour vous aider à cadrer votre projet."
BON: "On cadre ça proprement."
MAUVAIS: "N'hésitez pas à me donner plus de détails sur votre besoin."
BON: "Quelle est la fonctionnalité indispensable au lancement ?"
MAUVAIS: "Avec plaisir, voici ce que je peux vous proposer."
BON: "Voici ce que j'ai pour toi."`;

      const input = [
        firstName ? `Prénom du visiteur : ${firstName}` : "",
        `Conversation récente :\n${recentTranscript}`,
        `Message du visiteur : ${parsed.data.message}`,
        `Réponse préparée à reformuler : ${result.reply}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const enhanced = await streamOpenAIText({
        instructions,
        input,
        onDelta: () => {},
      });

      if (enhanced?.trim()) {
        const patchedTranscript = [...result.session.transcript];
        for (let i = patchedTranscript.length - 1; i >= 0; i--) {
          if (patchedTranscript[i]?.role === "assistant") {
            patchedTranscript[i] = { ...patchedTranscript[i], content: enhanced.trim() };
            break;
          }
        }
        return NextResponse.json(
          { ...result, reply: enhanced.trim(), session: { ...result.session, transcript: patchedTranscript } },
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
