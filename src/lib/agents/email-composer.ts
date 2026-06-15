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

// Pitch agents IA → sites avec score >= 45 (base correcte, peut automatiser)
// Pitch refonte site → sites avec score < 45 (base trop faible, besoin urgent)
function getTrack(audit: SiteAudit): "agent" | "site" {
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
  const pitchInstruction = track === "agent"
    ? `Pitch : propose un agent IA qui automatise la prospection ou le support client de leur activité. Pas de site à refaire, juste l'agent IA.`
    : `Pitch : propose une refonte de leur site web car il a des problèmes techniques graves.`;

  const prompt = `Tu représentes KAH Digital, un studio digital.
Écris un email de prospection en "${lang}" pour : ${bName} (${audit.sector}).
${pitchInstruction}

Problèmes réels trouvés sur ${lead.website} :
${top2Problems || "- Présence digitale limitée"}

Règles STRICTES :
- Max 6 lignes de texte, ton naturel et humain
- Mentionne 1 seul problème concret de leur site (le plus impactant)
- CTA = "répondez à cet email" uniquement, aucun autre lien
- Zéro prix, zéro chiffre, zéro promesse vague
- Signature = "KAH Digital" uniquement, pas de prénom
- Pas de "Bonjour [Nom]" générique — commence directement
- Pas de bullet points, pas de tableau

Réponds UNIQUEMENT avec le corps de l'email (pas de sujet, pas d'explication).`;

  let body = "";
  try {
    body = (await callLLMFast(prompt)).trim();
  } catch {
    // Fallback statique si LLM échoue
    const fallbacks: Record<string, string> = {
      fr: `J'ai regardé le site de ${bName} et j'ai remarqué ${topProblem.toLowerCase()}.\n\nOn travaille sur ce genre de problème chez KAH Digital — si c'est quelque chose qui vous préoccupe, répondez à cet email et on en parle.\n\nKAH Digital`,
      en: `I looked at ${bName}'s website and noticed ${topProblem.toLowerCase()}.\n\nWe handle this kind of issue at KAH Digital — if it's something you care about, just reply to this email.\n\nKAH Digital`,
      de: `Ich habe die Website von ${bName} angeschaut und ${topProblem.toLowerCase()} bemerkt.\n\nWir arbeiten bei KAH Digital an solchen Problemen — wenn Sie Interesse haben, antworten Sie einfach auf diese E-Mail.\n\nKAH Digital`,
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
