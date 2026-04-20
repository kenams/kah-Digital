/**
 * Agent 1 : Lead Discovery — 100% gratuit, aucune API key requise
 * Utilise DuckDuckGo HTML search pour trouver des commerces avec sites web.
 */

export type DiscoveredLead = {
  businessName: string;
  website: string;
  address: string;
  country: string;
  language: string;
  sector: string;
  placeId: string;
  email?: string | null;
  phone?: string | null;
};

// Rotation villes × secteurs × langues
const TARGETS = [
  // France
  { query: "restaurant paris site web", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "coiffeur lyon site web", country: "FR", lang: "fr", sector: "coiffure" },
  { query: "boulangerie marseille site web", country: "FR", lang: "fr", sector: "boulangerie" },
  { query: "plombier bordeaux site web", country: "FR", lang: "fr", sector: "plomberie" },
  { query: "fleuriste toulouse site web", country: "FR", lang: "fr", sector: "fleuriste" },
  { query: "cabinet dentaire nantes site web", country: "FR", lang: "fr", sector: "dentiste" },
  { query: "agence immobiliere strasbourg site web", country: "FR", lang: "fr", sector: "immobilier" },
  { query: "garage automobile rennes site web", country: "FR", lang: "fr", sector: "garage" },
  { query: "pizzeria nice site web", country: "FR", lang: "fr", sector: "restaurant" },
  { query: "salon esthetique montpellier site web", country: "FR", lang: "fr", sector: "esthetique" },
  // Belgique / Suisse
  { query: "restaurant bruxelles site web", country: "BE", lang: "fr", sector: "restaurant" },
  { query: "coiffeur geneve site web", country: "CH", lang: "fr", sector: "coiffure" },
  // Canada
  { query: "restaurant montreal site web", country: "CA", lang: "fr", sector: "restaurant" },
  { query: "boutique quebec site web", country: "CA", lang: "fr", sector: "boutique" },
  // Maroc / Afrique
  { query: "restaurant casablanca site web", country: "MA", lang: "fr", sector: "restaurant" },
  { query: "salon coiffure dakar site web", country: "SN", lang: "fr", sector: "coiffure" },
  // Angleterre
  { query: "restaurant london website small business", country: "GB", lang: "en", sector: "restaurant" },
  { query: "hair salon manchester website", country: "GB", lang: "en", sector: "hair salon" },
  // USA
  { query: "restaurant miami small business website", country: "US", lang: "en", sector: "restaurant" },
  { query: "bakery new york small business website", country: "US", lang: "en", sector: "bakery" },
  // Espagne
  { query: "restaurante barcelona pagina web", country: "ES", lang: "es", sector: "restaurante" },
  { query: "peluqueria madrid web", country: "ES", lang: "es", sector: "peluqueria" },
  // Allemagne
  { query: "restaurant berlin website kleinunternehmen", country: "DE", lang: "de", sector: "restaurant" },
  { query: "friseur munich website", country: "DE", lang: "de", sector: "friseur" },
  // Italie
  { query: "ristorante roma sito web piccola impresa", country: "IT", lang: "it", sector: "ristorante" },
];

// Obtenir la cible du jour selon le slot
function getDailyTarget(): typeof TARGETS[number] {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const hour = now.getUTCHours();
  const slotOffset = hour < 10 ? 0 : hour < 14 ? 1 : 2;
  return TARGETS[(dayOfYear * 3 + slotOffset) % TARGETS.length];
}

// Extrait les URLs des résultats DuckDuckGo HTML
async function searchDuckDuckGo(query: string): Promise<string[]> {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);

  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html",
        "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
      },
    });
    const html = await res.text();

    // Extraire les URLs des résultats (pattern DuckDuckGo)
    const matches = html.matchAll(/uddg=([^"&]+)/g);
    const urls: string[] = [];
    for (const m of matches) {
      try {
        const decoded = decodeURIComponent(m[1]);
        if (decoded.startsWith("http") && !isBlacklisted(decoded)) {
          urls.push(decoded);
        }
      } catch { /* skip */ }
    }
    return [...new Set(urls)].slice(0, 20); // dédoublonner
  } finally {
    clearTimeout(t);
  }
}

// Extraire le titre/nom depuis l'HTML d'un site
async function extractBusinessName(url: string): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KAH-Digital-Scout/1.0)" },
    });
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]{2,80})<\/title>/i);
    if (titleMatch?.[1]) {
      return titleMatch[1].trim().replace(/\s*[-|–—]\s*.*/g, "").trim().slice(0, 60);
    }
    return new URL(url).hostname.replace("www.", "").split(".")[0];
  } catch {
    return new URL(url).hostname.replace("www.", "").split(".")[0];
  } finally {
    clearTimeout(t);
  }
}

// Sites à ignorer (plateformes, annuaires, réseaux sociaux)
function isBlacklisted(url: string): boolean {
  const blocked = [
    "facebook.com", "instagram.com", "twitter.com", "linkedin.com", "youtube.com",
    "tripadvisor", "yelp.com", "pagesjaunes", "lafourchette", "thefork",
    "google.com", "apple.com", "amazon.", "wikipedia", "bing.com",
    "booking.com", "leboncoin", "airbnb", "uber", "deliveroo", "ubereats",
    "doctolib", "pages.business", "wix.com/site", "squarespace.com",
    ".gov", ".gouv", "mairie-", "prefecture",
  ];
  return blocked.some((b) => url.toLowerCase().includes(b));
}

export async function discoverLeads(count = 5): Promise<DiscoveredLead[]> {
  const target = getDailyTarget();
  console.log(`[lead-discovery] Recherche DuckDuckGo: "${target.query}"`);

  const urls = await searchDuckDuckGo(target.query);
  console.log(`[lead-discovery] ${urls.length} URLs trouvées`);

  const leads: DiscoveredLead[] = [];

  for (const url of urls) {
    if (leads.length >= count) break;

    try {
      const hostname = new URL(url).hostname;
      const businessName = await extractBusinessName(url);

      leads.push({
        businessName,
        website: url,
        address: target.country,
        country: target.country,
        language: target.lang,
        sector: target.sector,
        placeId: `ddg-${hostname}`,
        email: null,
      });

      // Petit délai pour ne pas surcharger
      await new Promise((r) => setTimeout(r, 500));
    } catch { /* skip URL invalide */ }
  }

  // Fallback si aucun résultat
  if (leads.length === 0) {
    console.warn("[lead-discovery] Aucun résultat DuckDuckGo — fallback liste statique");
    return getStaticFallback(count, target);
  }

  return leads;
}

// Liste statique de secours (sites réels à faible design)
function getStaticFallback(count: number, target: typeof TARGETS[number]): DiscoveredLead[] {
  const fallbacks: DiscoveredLead[] = [
    { businessName: "Restaurant Le Vieux Lyon", website: "http://www.restaurant-vieux-lyon.fr", address: "Lyon, France", country: "FR", lang: "fr", sector: "restaurant", placeId: "static-1" } as unknown as DiscoveredLead,
    { businessName: "Coiffure Tendance Paris", website: "http://www.coiffure-tendance-paris.com", address: "Paris, France", country: "FR", lang: "fr", sector: "coiffure", placeId: "static-2" } as unknown as DiscoveredLead,
    { businessName: "Boulangerie du Centre", website: "http://www.boulangerie-du-centre.fr", address: "Bordeaux, France", country: "FR", lang: "fr", sector: "boulangerie", placeId: "static-3" } as unknown as DiscoveredLead,
  ];
  return fallbacks.slice(0, count).map((f) => ({ ...f, language: target.lang, country: target.country }));
}
