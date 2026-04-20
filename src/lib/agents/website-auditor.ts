/**
 * Agent 2 : Website Auditor
 * Claude visite le site, détecte les faiblesses, génère le rapport + devis.
 * S'adapte automatiquement à la langue du site cible.
 */

import Anthropic from "@anthropic-ai/sdk";
import type { DiscoveredLead } from "./lead-discovery";

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
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(normalized, {
      signal: ctrl.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KAH-Digital-Scout/1.0; +https://kah-digital.fr)" },
    });
    const html = await res.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s{3,}/g, "  ")
      .slice(0, 7000);
  } catch {
    return `[Contenu non récupérable] URL: ${url}`;
  } finally {
    clearTimeout(t);
  }
}

export function getScreenshotUrl(_siteUrl: string): string | null {
  return null; // Screenshot désactivé — mockup HTML inclus dans l'email
}

const AUDIT_PROMPT: Record<string, string> = {
  fr: `Tu es un expert en développement web et design digital. Analyse ce site pour une PME ou un commerce local.`,
  en: `You are a web development and digital design expert. Analyze this website for a local business or SME.`,
  es: `Eres un experto en desarrollo web y diseño digital. Analiza este sitio web para una pyme o negocio local.`,
  de: `Du bist ein Experte fuer Webentwicklung und digitales Design. Analysiere diese Website fuer ein kleines Unternehmen.`,
  it: `Sei un esperto di sviluppo web e design digitale. Analizza questo sito web per una PMI o un negozio locale.`,
  nl: `Je bent een expert in webontwikkeling en digitaal design. Analyseer deze website voor een lokaal bedrijf.`,
};

export async function auditWebsite(lead: DiscoveredLead): Promise<SiteAudit | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY manquant");

  const client = new Anthropic({ apiKey });
  const content = await fetchWebsiteContent(lead.website);
  const screenshotUrl = getScreenshotUrl(lead.website);
  const sysIntro = AUDIT_PROMPT[lead.language] ?? AUDIT_PROMPT.fr;
  const lang = lead.language;

  const prompt = `${sysIntro}

Site analysé : ${lead.website}
Nom : ${lead.businessName}
Secteur : ${lead.sector}
Pays : ${lead.country}
Contenu extrait :
---
${content}
---

LANGUE DE RÉPONSE OBLIGATOIRE : "${lang}" (réponds dans cette langue pour tous les champs texte)

Retourne UNIQUEMENT un JSON valide (sans markdown) :
{
  "language": "${lang}",
  "businessName": "nom du commerce",
  "sector": "secteur",
  "score": 35,
  "problems": [
    {
      "title": "titre court du problème",
      "detail": "explication concrète en 1-2 phrases",
      "severity": "critical|medium|low",
      "category": "design|seo|mobile|speed|ux|conversion|security"
    }
  ],
  "recommendations": [
    {
      "title": "titre de la solution",
      "detail": "ce que KAH-Digital ferait concrètement",
      "impact": "high|medium|low"
    }
  ],
  "estimatedPrice": 1400,
  "priceRange": "entre 1200€ et 1800€",
  "mockupDescription": "Description poétique et convaincante du futur site redesigné : couleurs, style, ambiance, fonctionnalités clés — en 3-4 phrases dans la langue cible"
}

Règles d'évaluation du score :
- 0-30 : site très faible (bon prospect)
- 31-50 : site moyen (bon prospect)
- 51-70 : site correct (prospect froid)
- 71-100 : bon site (skip si > 65)

Règles de prix (marché local) :
- Site vitrine simple : 800-1800€
- Site avec réservation/menu : 1500-2800€
- E-commerce : 2500-5000€
- App mobile : 4000-9000€

Retourne 3-5 problèmes et 2-3 recommandations dans la langue "${lang}".`;

  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = msg.content[0].type === "text" ? msg.content[0].text : "";
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
