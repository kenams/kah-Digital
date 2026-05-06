/**
 * Agent 2 : Website Auditor
 * Claude visite le site, détecte les faiblesses, génère le rapport + devis.
 * S'adapte automatiquement à la langue du site cible.
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { DiscoveredLead } from "./lead-discovery";

const AUDIT_SYSTEM_PROMPT = `Tu es un expert en développement web, UX/UI et SEO technique. Tu analyses des sites de PME et commerces locaux pour identifier leurs faiblesses et proposer des améliorations concrètes. Tu génères des audits JSON précis, utiles et actionnables. Tu adaptes toujours ta réponse à la langue cible indiquée. Tu es direct, factuel et orienté résultats business.`;

async function callLLM(prompt: string, maxTokens: number): Promise<string> {
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
  if (process.env.OPENAI_API_KEY) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const resp = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    });
    return resp.choices[0]?.message?.content ?? "";
  }
  throw new Error("No AI provider configured");
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

  recommendations.push({ title: "Site qui convertit des visiteurs en clients", detail: "KAH-Digital prend en charge la conception et la livraison complète — vous validez, on livre.", impact: "high" });
  recommendations.push({ title: "Visible sur Google dès le lancement", detail: "Votre site sort optimisé SEO du premier jour — prêt à ranker et à générer du trafic qualifié.", impact: "high" });
  recommendations.push({ title: "Clients qui passent à l'action", detail: "Chaque page est conçue pour guider vos visiteurs vers un appel, une réservation ou un achat.", impact: "medium" });

  const finalScore = Math.max(10, Math.min(60, score));
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
        headers: { "User-Agent": "Mozilla/5.0 (compatible; KAH-Digital-Scout/1.0; +https://kah-digital.fr)" },
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

// Grille tarifaire adaptée au marché local
function getPricingGuide(country: string): string {
  const guides: Record<string, string> = {
    CH: `Pricing in CHF (Swiss market — premium pricing applies):
- Landing page (1 page): CHF 500–900
- Professional website (5-8 pages): CHF 1200–2400
- Business web tool: CHF 2300–4600
- Mobile app / SaaS MVP: CHF 3800–12000
estimatedPrice should be the CHF mid-range value. priceRange in CHF (e.g. "CHF 1200 – CHF 2400").`,
    GB: `Pricing in GBP (UK market):
- Landing page (1 page): £280–550
- Professional website (5-8 pages): £700–1500
- Business web tool: £1300–2500
- Mobile app / SaaS MVP: £2200–7000
estimatedPrice in GBP mid-range. priceRange in GBP (e.g. "£700 – £1500").`,
    US: `Pricing in USD (US market):
- Landing page (1 page): $320–600
- Professional website (5-8 pages): $800–1600
- Business web tool: £1400–2800
- Mobile app / SaaS MVP: $2500–8000
estimatedPrice in USD mid-range. priceRange in USD (e.g. "$800 – $1600").`,
    AU: `Pricing in AUD (Australian market):
- Landing page (1 page): AUD 450–850
- Professional website (5-8 pages): AUD 1100–2000
- Business web tool: AUD 1800–3500
- Mobile app / SaaS MVP: AUD 3000–8000
estimatedPrice in AUD mid-range. priceRange in AUD (e.g. "AUD 1100 – AUD 2000").`,
    CA: `Pricing in CAD (Canadian market):
- Landing page (1 page): CAD 400–750
- Professional website (5-8 pages): CAD 1000–1900
- Business web tool: CAD 1700–3200
- Mobile app / SaaS MVP: CAD 2800–7500
estimatedPrice in CAD mid-range. priceRange in CAD (e.g. "CAD 1000 – CAD 1900").`,
    MA: `Pricing in EUR adapted to Moroccan market (lower purchasing power):
- Landing / single-page: 200–400€
- Standard website: 400–900€
- Site with booking/blog: 700–1400€
- E-commerce: 1200–2500€
estimatedPrice and priceRange in EUR at these lower rates.`,
    SN: `Pricing in EUR adapted to Senegal/West Africa market:
- Landing / single-page: 150–350€
- Standard website: 350–800€
- Site with booking/blog: 600–1200€
estimatedPrice and priceRange in EUR at these lower rates.`,
    CI: `Pricing in EUR adapted to Ivory Coast/West Africa market:
- Landing / single-page: 150–350€
- Standard website: 350–800€
- Site with booking/blog: 600–1200€
estimatedPrice and priceRange in EUR at these lower rates.`,
    CM: `Pricing in EUR adapted to Cameroon/West Africa market:
- Landing / single-page: 150–350€
- Standard website: 350–800€
- Site with booking/blog: 600–1200€
estimatedPrice and priceRange in EUR at these lower rates.`,
    TN: `Pricing in EUR adapted to Tunisian market:
- Landing / single-page: 200–400€
- Standard website: 400–900€
- Site with booking/blog: 700–1400€
estimatedPrice and priceRange in EUR at these lower rates.`,
  };
  // Default: European EUR market (FR, BE, DE, IT, ES, etc.)
  return guides[country] ?? `Pricing in EUR — KAH-Digital official rates:
- Landing page (1 page): from 300€ (5-10 days)
- Showcase website (5-8 pages): from 900€, typically 900–1500€ (2-3 weeks)
- Corporate website: typically 2200–4500€ (3-5 weeks)
- AI automation: typically 1500–8000€ (2-6 weeks)
- Business web app or dashboard: typically 4000–12000€ (4-10 weeks)
- Mobile app MVP: typically 6000–20000€
estimatedPrice is the EUR mid-range integer for the most relevant offer. priceRange in EUR (e.g. "entre 900€ et 1500€").`;
}

// Prix fallback rule-based adapté au pays
function getCountryBasePrice(country: string, quality: "poor" | "medium" | "ok"): { price: number; range: string } {
  const base = quality === "poor" ? 1400 : quality === "medium" ? 1100 : 900;
  const multipliers: Record<string, { mult: number; currency: string; symbol: string }> = {
    CH: { mult: 1.55, currency: "CHF", symbol: "CHF " },
    GB: { mult: 1.15, currency: "GBP", symbol: "£" },
    US: { mult: 1.15, currency: "USD", symbol: "$" },
    AU: { mult: 1.35, currency: "AUD", symbol: "AUD " },
    CA: { mult: 1.25, currency: "CAD", symbol: "CAD " },
    MA: { mult: 0.45, currency: "EUR", symbol: "" },
    SN: { mult: 0.40, currency: "EUR", symbol: "" },
    CI: { mult: 0.40, currency: "EUR", symbol: "" },
    CM: { mult: 0.40, currency: "EUR", symbol: "" },
    TN: { mult: 0.45, currency: "EUR", symbol: "" },
  };
  const m = multipliers[country] ?? { mult: 1.0, currency: "EUR", symbol: "" };
  const price = Math.round(base * m.mult / 100) * 100;
  const low = Math.round((price - 200 * m.mult) / 100) * 100;
  const high = Math.round((price + 400 * m.mult) / 100) * 100;
  const sym = m.symbol;
  const suffix = m.currency === "EUR" ? "€" : "";
  return { price, range: `${sym}${low}${suffix} – ${sym}${high}${suffix}` };
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
      "detail": "What KAH-Digital delivers as an outcome — NOT technical steps. e.g. 'Un site livré en 3 semaines, optimisé pour convertir vos visiteurs en clients.' Never say 'add viewport meta tag' or 'compress images'.",
      "impact": "high|medium|low"
    }
  ],
  "estimatedPrice": 1400,
  "priceRange": "...",
  "mockupDescription": "Compelling 3-4 sentence description of the future redesigned site in language '${lang}'"
}

Score evaluation rules:
- 0-30: very weak site (great prospect)
- 31-50: average site (good prospect)
- 51-70: decent site (cold prospect)
- 71-100: good site (skip if > 65)

${pricingGuide}

Return 3-5 problems and 2-3 recommendations, all written in language "${lang}".`;

  let text: string;
  try {
    text = await callLLM(prompt, 2000);
  } catch {
    return { ...ruleBasedAudit(lead, content), screenshotUrl };
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;

  try {
    const audit = JSON.parse(text.slice(start, end + 1)) as SiteAudit;
    return { ...audit, screenshotUrl };
  } catch {
    return null;
  }
}
