// Récolte des sites d'entreprises locales (OpenStreetMap / Overpass) dans
// src/data/lead-pool.json. Overpass est trop instable pour être interrogé en
// direct depuis une fonction serverless : le cron pioche dans ce fichier.
// Usage : node scripts/harvest-leads.mjs   (peut être relancé pour compléter)
import fs from "fs";

const CITIES = [
  ["Toulouse", "FR", "fr"], ["Lyon", "FR", "fr"], ["Marseille", "FR", "fr"], ["Bordeaux", "FR", "fr"],
  ["Nantes", "FR", "fr"], ["Lille", "FR", "fr"], ["Montpellier", "FR", "fr"], ["Rennes", "FR", "fr"],
  ["Grenoble", "FR", "fr"], ["Strasbourg", "FR", "fr"], ["Nice", "FR", "fr"], ["Dijon", "FR", "fr"],
  ["Angers", "FR", "fr"], ["Metz", "FR", "fr"], ["Caen", "FR", "fr"], ["Clermont-Ferrand", "FR", "fr"],
  ["Lausanne", "CH", "fr"], ["Genève", "CH", "fr"], ["Fribourg", "CH", "fr"], ["Sion", "CH", "fr"], ["Neuchâtel", "CH", "fr"],
];
const TRADES = [
  'nwr["craft"~"^(plumber|electrician|roofer|painter|carpenter|tiler|hvac|plasterer|glaziery)$"]["website"]',
  'nwr["shop"~"^(hairdresser|beauty)$"]["website"]',
  'nwr["office"~"^(accountant|lawyer|estate_agent|insurance)$"]["website"]',
  'nwr["amenity"~"^(dentist|physiotherapist|veterinary)$"]["website"]',
];
const ENDPOINTS = [
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const OUT = "src/data/lead-pool.json";
const pool = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
const seen = new Set(pool.map((p) => p.url));
const done = new Set(pool.map((p) => `${p.city}|${p.q}`));

function clean(raw) {
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".") || /^\d+\.\d+\.\d+\.\d+$/.test(u.hostname)) return null;
    return `${u.protocol}//${u.hostname}${u.pathname === "/" ? "" : u.pathname}`.replace(/\/$/, "");
  } catch { return null; }
}

async function query(q, city) {
  const body = `data=${encodeURIComponent(`[out:json][timeout:60];area["name"="${city}"]["boundary"="administrative"]->.a;${q}(area.a);out tags 400;`)}`;
  for (let round = 0; round < 3; round++) {
    for (const ep of ENDPOINTS) {
      try {
        const res = await fetch(ep, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "kah-digital-prospection/1.0 (kahdigital42@gmail.com)" }, body, signal: AbortSignal.timeout(70000) });
        if (res.ok) return (await res.json()).elements ?? [];
      } catch { /* suivant */ }
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  return null;
}

for (const [city, country, language] of CITIES) {
  for (let i = 0; i < TRADES.length; i++) {
    const key = `${city}|${i}`;
    if (done.has(key)) continue;
    const els = await query(TRADES[i], city);
    if (els === null) { console.log(`✗ ${city} #${i} indisponible`); continue; }
    let added = 0;
    for (const el of els) {
      const t = el.tags ?? {};
      const url = clean(t.website ?? t["contact:website"] ?? "");
      if (!url || seen.has(url)) continue;
      seen.add(url);
      pool.push({ url, name: t.name ?? "", country, language, sector: "service-local", city, q: i });
      added++;
    }
    console.log(`✓ ${city} #${i}: +${added} (total ${pool.length})`);
    fs.writeFileSync(OUT, JSON.stringify(pool));
  }
}
console.log("terminé", pool.length);
