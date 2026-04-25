/**
 * Agent 2 : Website Auditor
 * Claude visite le site, détecte les faiblesses, génère le rapport + devis.
 * S'adapte automatiquement à la langue du site cible.
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { DiscoveredLead } from "./lead-discovery";

async function callLLM(prompt: string, maxTokens: number): Promise<string> {
  if (process.env.ANTHROPIC_API_KEY) {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: maxTokens,
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
    problems.push({ title: "Site non adapté mobile", detail: "Aucune balise viewport détectée — le site s'affiche mal sur smartphone.", severity: "critical", category: "mobile" });
    score -= 20;
  }
  if (!lower.includes('<meta name="description"') && !lower.includes("<meta name='description'")) {
    problems.push({ title: "Meta description absente", detail: "Google ne peut pas générer un extrait pertinent pour ce site.", severity: "critical", category: "seo" });
    score -= 15;
  }
  if (!lower.includes('schema.org') && !lower.includes('application/ld+json')) {
    problems.push({ title: "Données structurées manquantes", detail: "Pas de Schema.org — le site est invisible dans les rich snippets Google.", severity: "medium", category: "seo" });
    score -= 10;
  }
  if (lower.includes('jquery-1.') || lower.includes('jquery-2.') || lower.includes('jquery/1.') || lower.includes('jquery/2.')) {
    problems.push({ title: "Librairie jQuery obsolète", detail: "Version ancienne de jQuery détectée — risque de sécurité et lenteur.", severity: "medium", category: "speed" });
    score -= 8;
  }
  if (!lower.includes('gtag') && !lower.includes('google-analytics') && !lower.includes('googletagmanager')) {
    problems.push({ title: "Pas de suivi analytique", detail: "Impossible de mesurer le trafic et les conversions sans Google Analytics.", severity: "low", category: "conversion" });
    score -= 5;
  }
  if (!lower.includes('button') && !lower.includes('cta') && !lower.includes('contact') && !lower.includes('rdv') && !lower.includes('appointment')) {
    problems.push({ title: "Pas d'appel à l'action visible", detail: "Aucun bouton CTA détecté — les visiteurs ne savent pas quoi faire.", severity: "medium", category: "conversion" });
    score -= 10;
  }
  if (lower.includes('http://') && !lower.includes('https://')) {
    problems.push({ title: "Site non sécurisé (HTTP)", detail: "Le site n'utilise pas HTTPS — pénalisé par Google et rejeté par les navigateurs.", severity: "critical", category: "security" });
    score -= 15;
  }

  if (problems.length === 0) {
    problems.push({ title: "Design vieillissant", detail: "Le site manque de modernité comparé aux standards actuels.", severity: "medium", category: "design" });
    score -= 12;
  }

  recommendations.push({ title: "Refonte design responsive", detail: "KAH-Digital créerait un site moderne, rapide et optimisé mobile.", impact: "high" });
  recommendations.push({ title: "SEO technique complet", detail: "Balises meta, Schema.org, sitemap, Core Web Vitals — tout optimisé.", impact: "high" });
  recommendations.push({ title: "Tunnel de conversion", detail: "Boutons CTA stratégiques, formulaire de contact, prise de RDV en ligne.", impact: "medium" });

  const finalScore = Math.max(10, Math.min(60, score));
  const quality = finalScore < 30 ? "poor" : finalScore < 45 ? "medium" : "ok";
  const { price, range } = getCountryBasePrice(lead.country, quality);

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

export function getScreenshotUrl(_siteUrl: string): string | null {
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
- Landing / single-page portfolio: CHF 500–900
- Standard website (5-8 pages): CHF 1400–2800
- Site with booking/menu/blog: CHF 2200–4200
- E-commerce: CHF 3800–7500
- Custom web app: CHF 6000–18000
estimatedPrice should be the CHF mid-range value. priceRange in CHF (e.g. "CHF 1400 – CHF 2200").`,
    GB: `Pricing in GBP (UK market):
- Landing / single-page: £350–650
- Standard website (5-8 pages): £750–1600
- Site with booking/blog: £1300–2500
- E-commerce: £2200–5000
- Custom web app: £4000–12000
estimatedPrice in GBP mid-range. priceRange in GBP (e.g. "£750 – £1600").`,
    US: `Pricing in USD (US market):
- Landing / single-page: $400–700
- Standard website (5-8 pages): $900–1800
- Site with booking/blog: $1500–2800
- E-commerce: $2500–5500
- Custom web app: $4500–13000
estimatedPrice in USD mid-range. priceRange in USD (e.g. "$900 – $1800").`,
    AU: `Pricing in AUD (Australian market):
- Landing / single-page: AUD 500–900
- Standard website (5-8 pages): AUD 1100–2200
- Site with booking/blog: AUD 1800–3500
- E-commerce: AUD 3000–7000
estimatedPrice in AUD mid-range. priceRange in AUD (e.g. "AUD 1100 – AUD 2200").`,
    CA: `Pricing in CAD (Canadian market):
- Landing / single-page: CAD 450–800
- Standard website (5-8 pages): CAD 1000–2000
- Site with booking/blog: CAD 1600–3000
- E-commerce: CAD 2800–6000
estimatedPrice in CAD mid-range. priceRange in CAD (e.g. "CAD 1000 – CAD 2000").`,
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
  return guides[country] ?? `Pricing in EUR (European market):
- Landing / single-page portfolio: 300–600€
- Standard website (5-8 pages): 900–1800€
- Site with booking/menu/blog: 1500–2800€
- E-commerce: 2500–5000€
- Custom web app: 4000–12000€
estimatedPrice is the EUR mid-range integer. priceRange in EUR (e.g. "entre 900€ et 1800€").`;
}

// Prix fallback rule-based adapté au pays
function getCountryBasePrice(country: string, quality: "poor" | "medium" | "ok"): { price: number; range: string } {
  const base = quality === "poor" ? 1800 : quality === "medium" ? 1400 : 1200;
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
      "title": "short problem title",
      "detail": "concrete explanation in 1-2 sentences",
      "severity": "critical|medium|low",
      "category": "design|seo|mobile|speed|ux|conversion|security"
    }
  ],
  "recommendations": [
    {
      "title": "solution title",
      "detail": "what KAH-Digital would concretely do",
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
