/**
 * Agent 2 : Website Auditor
 * Claude visite le site, détecte les faiblesses, génère le rapport + demande de devis.
 * S'adapte automatiquement à la langue du site cible.
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { DiscoveredLead } from "./lead-discovery";

const AUDIT_SYSTEM_PROMPT = `Tu es un expert en développement web, UX/UI et SEO technique. Tu analyses des sites de PME et commerces locaux pour identifier leurs faiblesses et proposer des améliorations concrètes. Tu génères des audits JSON précis, utiles et actionnables. Tu adaptes toujours ta réponse à la langue cible indiquée. Tu es direct, factuel et orienté résultats business.`;

async function callLLM(prompt: string, maxTokens: number): Promise<string> {
  if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
    console.warn("[website-auditor] No AI provider configured — add OPENAI_API_KEY or ANTHROPIC_API_KEY to Vercel env");
    throw new Error("No AI provider configured");
  }
  if (process.env.OPENAI_API_KEY) {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const resp = await client.chat.completions.create({
        model: "gpt-4o",
        max_tokens: maxTokens,
        messages: [
          { role: "system", content: AUDIT_SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      });
      return resp.choices[0]?.message?.content ?? "";
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(`[website-auditor] OpenAI error (${msg.slice(0, 120)}) — falling back to Anthropic`);
      if (!process.env.ANTHROPIC_API_KEY) throw e;
    }
  }
  if (process.env.ANTHROPIC_API_KEY) {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
      system: [{ type: "text", text: AUDIT_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }] as Parameters<typeof client.messages.create>[0]["system"],
      messages: [{ role: "user", content: prompt }],
    });
    return msg.content[0].type === "text" ? msg.content[0].text : "";
  }
  throw new Error("No AI provider available");
}

function ruleBasedAudit(lead: DiscoveredLead, html: string): SiteAudit {
  const lower = html.toLowerCase();
  const problems: SiteAudit["problems"] = [];
  const recommendations: SiteAudit["recommendations"] = [];
  let score = 60;

  if (!lower.includes('viewport')) {
    problems.push({ title: "Invisible sur mobile", detail: "Plus de 60% de vos visiteurs arrivent sur mobile — et repartent sans prendre contact.", severity: "critical", category: "mobile" });
    score -= 20;
  }
  if (!lower.includes('<meta name="description"') && !lower.includes("<meta name='description'")) {
    problems.push({ title: "Absent des résultats Google", detail: "Votre site n'apparaît pas correctement dans Google — vos concurrents captent ces clients à votre place.", severity: "critical", category: "seo" });
    score -= 15;
  }
  if (!lower.includes('schema.org') && !lower.includes('application/ld+json')) {
    problems.push({ title: "Non référencé localement", detail: "Votre activité n'apparaît pas dans les recherches de proximité — vous perdez des clients qui cherchent exactement ce que vous faites.", severity: "medium", category: "seo" });
    score -= 10;
  }
  if (lower.includes('jquery-1.') || lower.includes('jquery-2.') || lower.includes('jquery/1.') || lower.includes('jquery/2.')) {
    problems.push({ title: "Site lent — visiteurs qui fuient", detail: "Un site qui charge trop lentement perd 53% de ses visiteurs avant même qu'ils voient votre offre.", severity: "medium", category: "speed" });
    score -= 8;
  }
  if (!lower.includes('gtag') && !lower.includes('google-analytics') && !lower.includes('googletagmanager')) {
    problems.push({ title: "Aucune mesure des résultats", detail: "Vous ne savez pas combien de clients votre site génère — ni pourquoi certains repartent sans vous contacter.", severity: "low", category: "conversion" });
    score -= 5;
  }
  if (!lower.includes('button') && !lower.includes('cta') && !lower.includes('contact') && !lower.includes('rdv') && !lower.includes('appointment')) {
    problems.push({ title: "Visiteurs sans direction claire", detail: "Vos visiteurs ne savent pas quoi faire sur votre site — ils repartent sans vous contacter.", severity: "medium", category: "conversion" });
    score -= 10;
  }
  if (lower.includes('http://') && !lower.includes('https://')) {
    problems.push({ title: "Site signalé comme non sécurisé", detail: "Les navigateurs affichent un avertissement de sécurité à vos visiteurs — ça détruit la confiance avant même qu'ils lisent votre offre.", severity: "critical", category: "security" });
    score -= 15;
  }

  if (problems.length === 0) {
    problems.push({ title: "Design qui date — crédibilité en jeu", detail: "La première impression se fait en 0.05 secondes — un site vieillissant fait douter de votre sérieux.", severity: "medium", category: "design" });
    score -= 12;
  }

  recommendations.push({ title: "Site qui convertit des visiteurs en clients", detail: "KAH Digital prend en charge la conception et la livraison complète — vous validez, on livre.", impact: "high" });
  recommendations.push({ title: "Visible sur Google dès le lancement", detail: "Votre site sort optimisé SEO du premier jour — prêt à ranker et à générer du trafic qualifié.", impact: "high" });
  recommendations.push({ title: "Clients qui passent à l'action", detail: "Chaque page est conçue pour guider vos visiteurs vers un appel, une réservation ou un achat.", impact: "medium" });

  const finalScore = Math.max(22, Math.min(58, score));
  const quality = finalScore < 30 ? "poor" : finalScore < 45 ? "medium" : "ok";
  const { price, range } = getCountryBasePrice(lead.country ?? "FR", quality);

  return {
    language: lead.language,
    businessName: lead.businessName,
    sector: lead.sector,
    score: finalScore,
    problems,
    recommendations,
    estimatedPrice: price,
    priceRange: range,
    mockupDescription: `Un site moderne, rapide et optimisé pour ${lead.sector} — design épuré, mobile-first, avec réservation en ligne et tunnel de conversion pour transformer chaque visiteur en client.`,
    screenshotUrl: null,
  };
}

export type SiteAudit = {
  language: string;         // langue détectée (fr/en/es/de/it/nl...)
  businessName: string;
  sector: string;
  score: number;            // 0-100 (score qualité actuel)
  problems: Array<{
    title: string;
    detail: string;
    severity: "critical" | "medium" | "low";
    category: "design" | "seo" | "mobile" | "speed" | "ux" | "conversion" | "security";
  }>;
  recommendations: Array<{
    title: string;
    detail: string;
    impact: "high" | "medium" | "low";
  }>;
  estimatedPrice: number;
  priceRange: string;
  mockupDescription: string; // Description du futur site pour l'email
  screenshotUrl: string | null;
};

async function fetchWebsiteContent(url: string): Promise<string> {
  const normalized = url.startsWith("http") ? url : `https://${url}`;
  const attempts = [normalized];
  if (normalized.startsWith("https://")) attempts.push(normalized.replace("https://", "http://"));

  for (const u of attempts) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(u, {
        signal: ctrl.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; KAH Digital-Scout/1.0; +https://KAH Digital.fr)" },
      });
      if (!res.ok) continue;
      const html = await res.text();
      return html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s{3,}/g, "  ")
        .slice(0, 7000);
    } catch { /* try next */ } finally {
      clearTimeout(t);
    }
  }
  return `[Contenu non récupérable] URL: ${url}`;
}

export function getScreenshotUrl(_url: string): string | null {
  return null; // Screenshot désactivé — mockup HTML inclus dans l'email
}

const AUDIT_PROMPT: Record<string, string> = {
  fr: `Tu es un expert en développement web et design digital. Analyse ce site pour une PME ou un commerce local.`,
  en: `You are a web development and digital design expert. Analyze this website for a local business or SME.`,
  es: `Eres un experto en desarrollo web y diseño digital. Analiza este sitio web para una pyme o negocio local.`,
  de: `Du bist ein Experte für Webentwicklung und digitales Design. Analysiere diese Website für ein kleines Unternehmen.`,
  it: `Sei un esperto di sviluppo web e design digitale. Analizza questo sito web per una PMI o un negozio locale.`,
  nl: `Je bent een expert in webontwikkeling en digitaal design. Analyseer deze website voor een lokaal bedrijf.`,
};

// Orientation commerciale adaptée au marché local, sans prix public.
function getPricingGuide(country: string): string {
  const guides: Record<string, string> = {
    CH: `Swiss market: emphasize premium positioning, trust, clarity, and an estimate adapted after scoping. Do not provide public amounts.`,
    GB: `UK market: emphasize conversion, credibility, and an estimate adapted after scoping. Do not provide public amounts.`,
    US: `US market: emphasize business outcome, speed, and an estimate adapted after scoping. Do not provide public amounts.`,
    AU: `Australian market: emphasize clarity, trust, and an estimate adapted after scoping. Do not provide public amounts.`,
    CA: `Canadian market: emphasize clear scope, trust, and an estimate adapted after scoping. Do not provide public amounts.`,
    MA: `Moroccan market: adapt the recommendation to local buying power, but do not provide public amounts.`,
    SN: `Senegal/West Africa market: adapt the recommendation to local buying power, but do not provide public amounts.`,
    CI: `Ivory Coast/West Africa market: adapt the recommendation to local buying power, but do not provide public amounts.`,
    CM: `Cameroon/West Africa market: adapt the recommendation to local buying power, but do not provide public amounts.`,
    TN: `Tunisian market: adapt the recommendation to local buying power, but do not provide public amounts.`,
  };
  return guides[country] ?? `European market: no public fixed pricing. Each proposal is adjusted after scoping the real need, complexity, timeline, support level, useful features, available budget, and business priorities.`;
}

function getCountryBasePrice(country: string, quality: "poor" | "medium" | "ok"): { price: number; range: string } {
  void country;
  void quality;
  return { price: 0, range: "Devis personnalisé après cadrage" };
}

export async function auditWebsite(lead: DiscoveredLead): Promise<SiteAudit | null> {
  const content = await fetchWebsiteContent(lead.website);
  const screenshotUrl = getScreenshotUrl(lead.website);

  // Fallback sans IA si aucune clé disponible
  if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    return { ...ruleBasedAudit(lead, content), screenshotUrl };
  }

  const sysIntro = AUDIT_PROMPT[lead.language] ?? AUDIT_PROMPT.en;
  const lang = lead.language;
  const pricingGuide = getPricingGuide(lead.country);

  const prompt = `${sysIntro}

Site: ${lead.website}
Business name: ${lead.businessName}
Sector: ${lead.sector}
Country: ${lead.country}
Extracted content:
---
${content}
---

MANDATORY RESPONSE LANGUAGE: "${lang}" — write ALL text fields in this language.

Return ONLY a valid JSON object (no markdown):
{
  "language": "${lang}",
  "businessName": "detected business name",
  "sector": "activity sector",
  "score": 35,
  "problems": [
    {
      "title": "short problem title focused on business symptom",
      "detail": "1-2 sentences about BUSINESS IMPACT only — what it costs them in clients/revenue/trust. NEVER explain how to fix it technically. The goal is to make them feel the pain, not to teach them the solution.",
      "severity": "critical|medium|low",
      "category": "design|seo|mobile|speed|ux|conversion|security"
    }
  ],
  "recommendations": [
    {
      "title": "outcome-focused title (what the client gains)",
      "detail": "What KAH Digital delivers as an outcome — NOT technical steps. e.g. 'Un site livré en 3 semaines, optimisé pour convertir vos visiteurs en clients.' Never say 'add viewport meta tag' or 'compress images'.",
      "impact": "high|medium|low"
    }
  ],
  "estimatedPrice": 0,
  "priceRange": "devis personnalisé après cadrage",
  "mockupDescription": "Compelling 3-4 sentence description of the future redesigned site in language '${lang}'"
}

Score evaluation rules:
- 0-30: very weak site (great prospect)
- 31-50: average site (good prospect)
- 51-70: decent site (cold prospect)
- 71-100: good site (skip if > 65)

${pricingGuide}
Do not output public fixed prices, currencies, or pricing ranges. Use estimatedPrice: 0 and priceRange: a custom quote / personalized estimate message in language "${lang}".

Return 3-5 problems and 2-3 recommendations, all written in language "${lang}".`;

  let text: string;
  try {
    text = await callLLM(prompt, 2000);
  } catch {
    return { ...ruleBasedAudit(lead, content), screenshotUrl };
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return { ...ruleBasedAudit(lead, content), screenshotUrl };

  try {
    const audit = JSON.parse(text.slice(start, end + 1)) as SiteAudit;
    return { ...audit, screenshotUrl };
  } catch {
    return { ...ruleBasedAudit(lead, content), screenshotUrl };
  }
}
