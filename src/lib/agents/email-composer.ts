/**
 * Agent 3 : Email Composer
 * Email court, humain, agents IA en priorité.
 * Pas de prix, pas de score, pas de tableau HTML lourd.
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { SiteAudit } from "./website-auditor";
import type { DiscoveredLead } from "./lead-discovery";

export type ComposedEmail = {
  subject: string;
  html: string;
  textFallback: string;
};

async function callLLMFast(prompt: string): Promise<string> {
  if (process.env.OPENAI_API_KEY) {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const resp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      });
      return resp.choices[0]?.message?.content ?? "";
    } catch { /* fall through */ }
  }
  if (process.env.ANTHROPIC_API_KEY) {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });
    return msg.content[0].type === "text" ? msg.content[0].text : "";
  }
  throw new Error("No AI provider");
}

// Routing par secteur + score
function getTrack(audit: SiteAudit): "esn" | "pme-it" | "app" | "agent" | "site" {
  const s = (audit.sector ?? "").toLowerCase();
  if (s === "esn") return "esn";
  if (s === "pme-it") return "pme-it";
  if (s === "app") return "app";
  return audit.score >= 45 ? "agent" : "site";
}

// A/B sujets — 6 variantes, rotation par jour
const SUBJECTS: Record<string, string[]> = {
  fr: [
    "{{name}} — j'ai regardé votre site",
    "Une idée pour {{name}}",
    "{{name}} — j'ai une suggestion rapide",
    "Question pour {{name}}",
    "{{name}} — retour sur votre présence en ligne",
    "{{problem}} — {{name}}",
  ],
  en: [
    "{{name}} — I looked at your website",
    "An idea for {{name}}",
    "{{name}} — quick suggestion",
    "Question for {{name}}",
    "{{name}} — feedback on your online presence",
    "{{problem}} — {{name}}",
  ],
  de: [
    "{{name}} — ich habe Ihre Website angeschaut",
    "Eine Idee für {{name}}",
    "{{name}} — kurzer Vorschlag",
    "Frage für {{name}}",
    "{{name}} — Rückmeldung zu Ihrer Online-Präsenz",
    "{{problem}} — {{name}}",
  ],
  es: [
    "{{name}} — vi su sitio web",
    "Una idea para {{name}}",
    "{{name}} — sugerencia rápida",
    "Pregunta para {{name}}",
    "{{name}} — retroalimentación sobre su presencia online",
    "{{problem}} — {{name}}",
  ],
  it: [
    "{{name}} — ho guardato il tuo sito",
    "Un'idea per {{name}}",
    "{{name}} — suggerimento rapido",
    "Domanda per {{name}}",
    "{{name}} — feedback sulla tua presenza online",
    "{{problem}} — {{name}}",
  ],
  nl: [
    "{{name}} — ik bekeek uw website",
    "Een idee voor {{name}}",
    "{{name}} — snelle suggestie",
    "Vraag voor {{name}}",
    "{{name}} — feedback over uw online aanwezigheid",
    "{{problem}} — {{name}}",
  ],
};

// Optout texts courts
const OPTOUT: Record<string, string> = {
  fr: "Pas intéressé(e) ? Répondez juste \"stop\".",
  en: "Not interested? Just reply \"stop\".",
  de: "Kein Interesse? Antworten Sie einfach \"stop\".",
  es: "¿Sin interés? Responda simplemente \"stop\".",
  it: "Non interessa? Rispondi semplicemente \"stop\".",
  nl: "Geen interesse? Antwoord gewoon \"stop\".",
};

export async function composeProspectingEmail(
  lead: DiscoveredLead,
  audit: SiteAudit,
  trackingBaseUrl: string,
  prospectId: string
): Promise<ComposedEmail> {
  const lang = audit.language ?? "fr";
  const baseUrl = trackingBaseUrl.replace(/[\r\n\s]+/g, "").replace(/\/$/, "");
  const pixelUrl = `${baseUrl}/api/tracking/open/${prospectId}`;
  const unsubUrl = `${baseUrl}/api/unsubscribe?id=${prospectId}`;

  const bName = audit.businessName.trim() || lead.website.replace(/https?:\/\/(www\.)?/, "").split(/[/?#]/)[0];
  const topProblem = audit.problems[0]?.title ?? "point à améliorer";
  const track = getTrack(audit);

  // Subject A/B
  const abVariant = Math.floor(Date.now() / 86400000) % 6;
  const langSubjects = SUBJECTS[lang] ?? SUBJECTS.fr;
  const subject = langSubjects[abVariant]!
    .replace("{{name}}", bName)
    .replace("{{problem}}", topProblem);

  // Prompt LLM : email court, naturel, basé sur l'audit réel
  const top2Problems = audit.problems.slice(0, 2).map((p) => `- ${p.title}: ${p.detail}`).join("\n");
  const pitchInstruction =
    track === "esn"
      ? `Pitch : propose à cette ESN / société IT de tester notre outil de gestion de tickets IA (triage auto, réponses niveau 1, tableau de bord) pour leurs clients PME — en marque blanche si souhaité. Objectif = décrocher un appel de 20 min, pas vendre directement. Mentionne qu'on gère le niveau 1 à leur place, ça libère leurs équipes.`
      : track === "pme-it"
      ? `Pitch : propose à cette PME un support informatique IA disponible 7j/7 pour leurs équipes — incidents résolus rapidement, sans prestataire à l'heure. Objectif = les amener à contacter KAH Digital ou appeler le 07 59 55 84 14. Pas de prix. Juste un appel de 20 min pour voir si ça colle.`
      : track === "app"
      ? `Pitch : propose à cette startup / entreprise de développer leur application mobile ou web sur mesure avec KAH Digital. Angle : MVP rapide, stack moderne, livraison en semaines pas en mois. Objectif = les amener à contacter KAH Digital ou appeler le 07 59 55 84 14. Pas de prix, juste une conversation.`
      : track === "agent"
      ? `Pitch : propose un agent IA qui automatise la prospection ou le support client de leur activité. Pas de site à refaire, juste l'agent IA.`
      : `Pitch : propose une refonte de leur site web car il a des problèmes techniques graves.`;

  // Grandes entreprises (banques, cabinets, hôpitaux, assurances, groupes) = ton formel
  const bigCorpSectors = ["finance", "banque", "assurance", "avocat", "notaire", "medecin", "clinique", "hopital", "pharmacie", "fiduciaire", "audit", "consulting", "groupe", "holding"];
  const isBigCorp = bigCorpSectors.some(s => audit.sector?.toLowerCase().includes(s));

  const toneInstruction = isBigCorp
    ? `Ton : professionnel et formel. Vouvoiement obligatoire. Pas de familiarité. Sobre, direct, crédible.`
    : `Ton : humain, naturel, légèrement direct. Tutoiement possible selon le secteur. Pas de langue de bois.`;

  const prompt = `Tu représentes KAH Digital, un studio digital basé à Lausanne.
Écris un email de prospection en "${lang}" pour : ${bName} (${audit.sector}).
${pitchInstruction}

Problèmes réels trouvés sur ${lead.website} :
${top2Problems || "- Présence digitale limitée"}

${toneInstruction}

RÈGLES ANTI-IA STRICTES (le texte doit sembler 100% écrit par un humain) :
- JAMAIS : "il est essentiel de", "dans un premier temps", "n'hésitez pas à", "je me permets de", "impact significatif", "solution complète", "Bien sûr", "Absolument"
- JAMAIS de phrases miroir (A fait X. B fait Y. C fait Z.)
- JAMAIS de paragraphes identiques en longueur
- Varier les longueurs de phrases — alterner courtes et longues
- Commencer par une observation directe sur LEUR site, pas une intro générique
- 1 seule imperfection stylistique légère autorisée (naturel humain)
- Max 5-6 lignes au total
- Mentionne 1 seul problème concret (le plus impactant)
- CTA = "répondez à cet email" OU "appelez le 07 59 55 84 14" OU "kah-digital.ch" — selon le contexte
- Zéro prix, zéro promesse vague
- Signature = "KAH Digital — kah-digital.ch" — jamais de prénom seul
- Pas de bullet points, pas de tableau

Réponds UNIQUEMENT avec le corps de l'email (pas de sujet, pas d'explication).`;

  let body = "";
  try {
    body = (await callLLMFast(prompt)).trim();
  } catch {
    // Fallback statique si LLM échoue
    const fallbacks: Record<string, string> = {
      fr: isBigCorp
        ? `J'ai analysé le site de ${bName} cette semaine et ai identifié ${topProblem.toLowerCase()}.\n\nChez KAH Digital, nous accompagnons des structures comme la vôtre sur ce type de problématique. Si cela correspond à une priorité actuelle, je suis disponible pour en échanger.\n\nKAH Digital`
        : `J'ai regardé votre site cette semaine — et honnêtement, ${topProblem.toLowerCase()} c'est exactement ce qui freine la conversion.\n\nOn règle ce genre de chose chez KAH Digital, souvent plus vite qu'on ne le croit. Si vous êtes curieux, répondez à cet email.\n\nKAH Digital`,
      en: isBigCorp
        ? `I reviewed ${bName}'s website this week and noticed ${topProblem.toLowerCase()}.\n\nAt KAH Digital, we help organisations like yours address these kinds of issues. If this is currently a priority, I'd be happy to discuss further.\n\nKAH Digital`
        : `Took a look at your website this week — ${topProblem.toLowerCase()} is genuinely holding you back.\n\nWe fix this kind of thing at KAH Digital, usually faster than you'd expect. If you're curious, just reply.\n\nKAH Digital`,
      de: isBigCorp
        ? `Ich habe die Website von ${bName} diese Woche analysiert und ${topProblem.toLowerCase()} festgestellt.\n\nBei KAH Digital unterstützen wir Unternehmen wie Ihres bei solchen Herausforderungen. Falls dies aktuell eine Priorität ist, stehe ich gerne für ein Gespräch zur Verfügung.\n\nKAH Digital`
        : `Ich habe Ihre Website diese Woche angeschaut — ${topProblem.toLowerCase()} bremst Sie wirklich aus.\n\nSolche Probleme lösen wir bei KAH Digital, meistens schneller als erwartet. Antworten Sie einfach auf diese Mail.\n\nKAH Digital`,
    };
    body = fallbacks[lang] ?? fallbacks.fr ?? "";
  }

  // HTML minimaliste — ressemble à un vrai email perso
  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:24px 12px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
<tr><td>

  <!-- Corps email -->
  <div style="font-size:15px;color:#1f2937;line-height:1.75;white-space:pre-line;">${body.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>

  <!-- Optout discret -->
  <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:11px;color:#9ca3af;">
      ${OPTOUT[lang] ?? OPTOUT.fr}
      &nbsp;&mdash;&nbsp;
      <a href="${unsubUrl}" style="color:#9ca3af;text-decoration:underline;">Se désinscrire</a>
    </p>
  </div>

</td></tr>
</table>

<!-- Pixel tracking -->
<img src="${pixelUrl}" width="1" height="1" style="display:none;" alt="" />
</body>
</html>`;

  const textFallback = `${body}\n\n---\n${OPTOUT[lang] ?? OPTOUT.fr}`;

  return { subject, html, textFallback };
}
