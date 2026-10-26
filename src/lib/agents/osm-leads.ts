// Source de leads durable : OpenStreetMap (Overpass). DuckDuckGo/Brave/Google CSE
// bloquent les IP Vercel et GitHub, alors qu'Overpass est un service public sans
// clé. On récupère les sites web d'artisans/services locaux référencés par ville,
// puis le pipeline habituel (extractSiteInfo) cherche l'e-mail réel sur le site.

type OsmTarget = { city: string; country: "FR" | "CH"; language: "fr" | "de" };

const OSM_CITIES: OsmTarget[] = [
  { city: "Toulouse", country: "FR", language: "fr" }, { city: "Lyon", country: "FR", language: "fr" },
  { city: "Marseille", country: "FR", language: "fr" }, { city: "Bordeaux", country: "FR", language: "fr" },
  { city: "Nantes", country: "FR", language: "fr" }, { city: "Lille", country: "FR", language: "fr" },
  { city: "Montpellier", country: "FR", language: "fr" }, { city: "Rennes", country: "FR", language: "fr" },
  { city: "Grenoble", country: "FR", language: "fr" }, { city: "Strasbourg", country: "FR", language: "fr" },
  { city: "Nice", country: "FR", language: "fr" }, { city: "Dijon", country: "FR", language: "fr" },
  { city: "Angers", country: "FR", language: "fr" }, { city: "Metz", country: "FR", language: "fr" },
  { city: "Caen", country: "FR", language: "fr" }, { city: "Clermont-Ferrand", country: "FR", language: "fr" },
  { city: "Lausanne", country: "CH", language: "fr" }, { city: "Genève", country: "CH", language: "fr" },
  { city: "Fribourg", country: "CH", language: "fr" }, { city: "Sion", country: "CH", language: "fr" },
  { city: "Neuchâtel", country: "CH", language: "fr" },
];

const TRADES: { sector: string; filter: string }[] = [
  { sector: "service-local", filter: 'nwr["craft"~"^(plumber|electrician|roofer|painter|carpenter|tiler|hvac|plasterer|glaziery)$"]["website"]' },
  { sector: "service-local", filter: 'nwr["shop"~"^(hairdresser|beauty)$"]["website"]' },
  { sector: "service-local", filter: 'nwr["office"~"^(accountant|lawyer|estate_agent|insurance)$"]["website"]' },
  { sector: "service-local", filter: 'nwr["amenity"~"^(dentist|physiotherapist|veterinary)$"]["website"]' },
];

const ENDPOINTS = [
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

export type OsmLeadUrl = { url: string; country: string; language: string; sector: string; name: string };

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Les tags OSM sont saisis par n'importe qui : on refuse les hôtes internes
// (SSRF) avant que le pipeline ne télécharge la page.
function isPublicHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal") || !h.includes(".")) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(h) || h.includes(":")) return false;
  return true;
}

function cleanUrl(raw: string): string | null {
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!/^https?:$/.test(u.protocol) || !isPublicHost(u.hostname)) return null;
    return `${u.protocol}//${u.hostname}${u.pathname === "/" ? "" : u.pathname}`.replace(/\/$/, "");
  } catch {
    return null;
  }
}

async function queryOverpass(limit: number, deadline: number): Promise<OsmLeadUrl[]> {
  const target = pick(OSM_CITIES);
  const trade = pick(TRADES);
  const query = `[out:json][timeout:40];area["name"="${target.city}"]["boundary"="administrative"]->.a;${trade.filter}(area.a);out tags ${limit * 2};`;

  for (const endpoint of ENDPOINTS) {
    const remaining = deadline - Date.now();
    if (remaining < 3000) break;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "kah-digital-prospection/1.0 (kahdigital42@gmail.com)" },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(Math.min(15000, remaining)),
      });
      if (!res.ok) continue;
      const json = (await res.json()) as { elements?: { tags?: Record<string, string> }[] };
      const seen = new Set<string>();
      const out: OsmLeadUrl[] = [];
      for (const el of json.elements ?? []) {
        const tags = el.tags ?? {};
        const url = cleanUrl(tags.website ?? tags["contact:website"] ?? "");
        if (!url || seen.has(url)) continue;
        seen.add(url);
        out.push({ url, country: target.country, language: target.language, sector: trade.sector, name: tags.name ?? "" });
      }
      console.log(`[osm-leads] ${target.city}: ${out.length} sites via ${new URL(endpoint).hostname}`);
      return out.sort(() => Math.random() - 0.5).slice(0, limit);
    } catch {
      /* miroir suivant */
    }
  }
  console.warn(`[osm-leads] aucun miroir Overpass disponible pour ${target.city}`);
  return [];
}

// Une ville + un métier tirés au hasard donnent parfois 0 site (petites villes) :
// on enchaîne jusqu'à 5 tirages et on agrège.
export async function discoverOsmUrls(limit = 40): Promise<OsmLeadUrl[]> {
  const seen = new Set<string>();
  const all: OsmLeadUrl[] = [];
  // Budget global : la fonction Vercel est limitée à 300 s et le reste du pipeline
  // (téléchargement des sites, audit, envoi) a besoin de temps.
  const deadline = Date.now() + 40_000;
  const enough = Math.min(limit, 20);
  for (let attempt = 0; attempt < 5 && all.length < enough && Date.now() < deadline; attempt++) {
    for (const lead of await queryOverpass(limit, deadline)) {
      if (seen.has(lead.url)) continue;
      seen.add(lead.url);
      all.push(lead);
    }
  }
  return all.slice(0, limit);
}
