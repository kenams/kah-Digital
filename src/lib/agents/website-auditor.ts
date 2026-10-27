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

const BOOKING_PROVIDERS = /planity|calendly|doctolib|resalib|setmore|reservio|simplybook|bookly|timify|kiute|mindbody|treatwell|fresha|booksy|zenchef|thefork|rendez-vous en ligne|réserver en ligne|reserver en ligne|prise de rendez-vous en ligne|book online|online booking/i;

// Lit les balises <meta> une à une : le texte d'une description contient souvent
// une apostrophe, qui casse n'importe quel regex "tout-en-un".
function hasMetaDescription(html: string): boolean {
  for (const tag of html.match(/<meta[^>]*>/gi) ?? []) {
    if (!/name\s*=\s*["']?description["']?/i.test(tag)) continue;
    const m = tag.match(/content\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
    if ((m?.[1] ?? m?.[2] ?? "").trim().length >= 20) return true;
  }
  return false;
}

// Audit sans IA. Il lit le HTML brut et ne signale que ce qui est réellement
// constaté ; s'il n'y a rien de vrai à dire, il renvoie null (le lead est écarté
// plutôt que d'envoyer une accroche inventée).
function ruleBasedAudit(lead: DiscoveredLead, page: FetchedPage): SiteAudit | null {
  if (!page.ok) return null;
  const html = page.html;
  const lower = html.toLowerCase();
  if (lower.length < 500) return null; // page vide / JS only : rien de fiable à mesurer
  if (BOOKING_PROVIDERS.test(html)) return null; // réservation en ligne déjà en place : notre pitch ne lui apporte rien

  const problems: SiteAudit["problems"] = [];
  const recommendations: SiteAudit["recommendations"] = [];
  let score = 70;

  if (!lower.includes("viewport")) {
    problems.push({ title: "Invisible sur mobile", detail: "Plus de 60% de vos visiteurs arrivent sur mobile — et repartent sans prendre contact.", severity: "critical", category: "mobile" });
    score -= 22;
  }
  if (!hasMetaDescription(html)) {
    problems.push({ title: "Mal présenté dans Google", detail: "Votre site n'affiche pas de description claire dans les résultats Google — des clients passent à côté de vous.", severity: "critical", category: "seo" });
    score -= 12;
  }
  if (!lower.includes("schema.org") && !lower.includes("application/ld+json")) {
    problems.push({ title: "Non référencé localement", detail: "Votre activité n'apparaît pas dans les recherches de proximité — vous perdez des clients qui cherchent exactement ce que vous faites.", severity: "medium", category: "seo" });
    score -= 8;
  }
  if (/jquery[-/.]?(1|2)\.\d/.test(lower)) {
    problems.push({ title: "Site lent — visiteurs qui fuient", detail: "Un site qui charge trop lentement perd 53% de ses visiteurs avant même qu'ils voient votre offre.", severity: "medium", category: "speed" });
    score -= 8;
  }
  if (!page.https) {
    problems.push({ title: "Site signalé comme non sécurisé", detail: "Les navigateurs affichent un avertissement de sécurité à vos visiteurs — ça détruit la confiance avant même qu'ils lisent votre offre.", severity: "critical", category: "security" });
    score -= 18;
  }
  if (/(©|&copy;|copyright)\s*(19\d\d|200\d|201[0-8])\b/i.test(html)) {
    problems.push({ title: "Design qui date — crédibilité en jeu", detail: "La première impression se fait en quelques secondes — un site qui n'a pas bougé depuis des années fait douter de votre sérieux.", severity: "medium", category: "design" });
    score -= 10;
  }

  // Un seul point faible mineur ne justifie pas de déranger quelqu'un : il faut du solide.
  if (!problems.some((p) => p.severity === "critical") && problems.length < 2) return null;

  recommendations.push({ title: "Un site qui prend les rendez-vous à votre place", detail: "KAH Digital prend en charge la conception et la livraison complète — vous validez, on livre.", impact: "high" });
  recommendations.push({ title: "Visible sur Google dès le lancement", detail: "Votre site sort optimisé SEO du premier jour — prêt à générer du trafic qualifié.", impact: "high" });

  const finalScore = Math.max(25, Math.min(60, score));
  const quality = finalScore < 35 ? "poor" : "medium";
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

import { safeFetch } from "@/lib/safe-fetch";

type FetchedPage = { ok: boolean; html: string; text: string; https: boolean };

async function fetchWebsiteContent(url: string): Promise<FetchedPage> {
  const normalized = url.startsWith("http") ? url : `https://${url}`;
  const attempts = [normalized];
  if (normalized.startsWith("https://")) attempts.push(normalized.replace("https://", "http://"));

  for (const u of attempts) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 10000);
    try {
      const res = await safeFetch(u, {
        signal: ctrl.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; KAH-Digital-Scout/1.0; +https://kah-digital.ch)" },
      });
      if (!res.ok) continue;
      const html = (await res.text()).slice(0, 400_000);
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s{3,}/g, "  ")
        .slice(0, 7000);
      return { ok: true, html, text, https: u.startsWith("https://") };
    } catch { /* try next */ } finally {
      clearTimeout(t);
    }
  }
  return { ok: false, html: "", text: "", https: true };
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
  const currency = country === "CH" ? "CHF" : "EUR";
  return `Official KAH Digital offer (use these exact figures, adapt currency symbol to ${currency}): "Forfait Essentiel" at 790 for a decent/average site needing targeted fixes, "Forfait Refonte" at 1490 for a weak/critical site needing a full rebuild, both with an optional maintenance subscription starting at 89/month. Pick whichever forfait matches the site's actual state.`;
}

function getCountryBasePrice(country: string, quality: "poor" | "medium" | "ok"): { price: number; range: string } {
  const currency = country === "CH" ? "CHF" : "EUR";
  if (quality === "poor") return { price: 1490, range: `Dès ${1490} ${currency}` };
  if (quality === "medium") return { price: 790, range: `Dès ${790} ${currency}` };
  return { price: 790, range: `Dès ${790} ${currency}` };
}

export async function auditWebsite(lead: DiscoveredLead): Promise<SiteAudit | null> {
  const page = await fetchWebsiteContent(lead.website);
  const content = page.text;
  const screenshotUrl = getScreenshotUrl(lead.website);

  // Site injoignable : aucun constat fiable possible, on n'écrit pas à l'aveugle.
  if (!page.ok) return null;
  if (BOOKING_PROVIDERS.test(page.html)) return null; // déjà équipé : hors cible

  const withShot = (a: SiteAudit | null) => (a ? { ...a, screenshotUrl } : null);

  // Fallback sans IA si aucune clé disponible
  if (!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    return withShot(ruleBasedAudit(lead, page));
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
Set estimatedPrice to 790 or 1490 (whichever forfait fits, based on the score) and priceRange to a short string like "Dès 790 €" or "Dès 1490 CHF" (use the right currency and amount) translated naturally in language "${lang}".

Return 3-5 problems and 2-3 recommendations, all written in language "${lang}".`;

  let text: string;
  try {
    text = await callLLM(prompt, 2000);
  } catch {
    return withShot(ruleBasedAudit(lead, page));
  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return withShot(ruleBasedAudit(lead, page));

  try {
    const audit = JSON.parse(text.slice(start, end + 1)) as SiteAudit;
    return { ...audit, screenshotUrl };
  } catch {
    return withShot(ruleBasedAudit(lead, page));
  }
}
