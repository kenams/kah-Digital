import Anthropic from "@anthropic-ai/sdk";

export type ProspectAudit = {
  businessName: string;
  sector: string;
  problems: Array<{ title: string; detail: string; severity: "critical" | "medium" | "low" }>;
  recommendations: Array<{ title: string; detail: string; estimatedValue: string }>;
  estimatedPrice: number;
  priceRange: string;
  emailSubject: string;
  emailBody: string;
};

// Fetch the website HTML (max 80KB to avoid huge pages)
async function fetchWebsiteContent(url: string): Promise<string> {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KAH-Digital-Scout/1.0)" },
    });
    const html = await res.text();
    // Extract meaningful text: strip scripts/styles, keep tags for context
    const stripped = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s{3,}/g, "  ")
      .slice(0, 8000);
    return stripped;
  } finally {
    clearTimeout(timeout);
  }
}

export async function auditWebsite(websiteUrl: string): Promise<ProspectAudit | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY manquant");

  const client = new Anthropic({ apiKey });

  let websiteContent = "";
  try {
    websiteContent = await fetchWebsiteContent(websiteUrl);
  } catch {
    websiteContent = `Site : ${websiteUrl} (contenu non récupérable — analyse basée sur l'URL uniquement)`;
  }

  const prompt = `Tu es un expert en développement web et marketing digital pour PME/commerçants français.
Analyse ce site web et génère un audit + email de prospection personnalisé pour KAH-Digital.

URL analysée : ${websiteUrl}
Contenu extrait :
---
${websiteContent}
---

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown) respectant exactement ce schéma :
{
  "businessName": "nom détecté ou déduit",
  "sector": "secteur d'activité (ex: restauration, commerce, artisanat, immobilier...)",
  "problems": [
    { "title": "problème court", "detail": "explication concrète en 1-2 phrases", "severity": "critical|medium|low" }
  ],
  "recommendations": [
    { "title": "solution", "detail": "ce que KAH-Digital ferait concrètement", "estimatedValue": "valeur apportée" }
  ],
  "estimatedPrice": 1200,
  "priceRange": "entre 900€ et 1800€",
  "emailSubject": "objet de l'email accrocheur et personnalisé",
  "emailBody": "corps de l'email complet en HTML (utilise <p>, <ul><li>, <strong>, pas de style inline). Commence par bonjour, présente 3 problèmes concrets du site, propose une solution KAH-Digital avec un prix ancré, ajoute un CTA clair."
}

Règles :
- 3 à 5 problèmes, du plus critique au moins critique
- 2 à 3 recommandations concrètes
- Prix réaliste pour PME/commerçant français (site vitrine 800-2500€, refonte 1500-4500€, appli 3000-8000€)
- Email chaleureux mais direct, pro mais pas froid, 200-350 mots
- Mentionne des détails spécifiques du site pour montrer qu'on l'a vraiment analysé`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;

  try {
    return JSON.parse(text.slice(start, end + 1)) as ProspectAudit;
  } catch {
    return null;
  }
}
