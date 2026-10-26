// Génère src/lib/locale-routes.ts : routes réellement disponibles par langue.
// Le sélecteur de langue s'en sert pour ne jamais pointer vers une page traduite
// inexistante (404). Relancer après l'ajout d'une page ou d'une traduction :
//   node scripts/gen-locale-routes.mjs [sitemap-urls.txt]
import fs from "fs";
import path from "path";

const root = path.resolve("src/app");
const groups = { fr: "(fr)", en: "(en)/en", de: "(de)/de" };
const routes = { fr: new Set(), en: new Set(), de: new Set() };

function walk(dir, base, locale) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith("[") || e.name === "api") continue;
      const seg = /^\(.*\)$/.test(e.name) ? "" : `/${e.name}`;
      walk(full, base + seg, locale);
    } else if (e.name === "page.tsx") {
      routes[locale].add(base || "/");
    }
  }
}
for (const [locale, rel] of Object.entries(groups)) {
  const dir = path.join(root, rel);
  if (fs.existsSync(dir)) walk(dir, "", locale);
}

// Pages /projets/[slug] : slugs lus dans les données de portfolio de chaque langue.
const portfolioFiles = { fr: "src/data/portfolio.ts", en: "src/data/portfolio.en.ts", de: "src/data/portfolio.de.ts" };
for (const [locale, file] of Object.entries(portfolioFiles)) {
  if (!fs.existsSync(file)) continue;
  for (const m of fs.readFileSync(file, "utf8").matchAll(/^\s*slug:\s*"([^"]+)"/gm)) routes[locale].add(`/projets/${m[1]}`);
}

const seed = process.argv[2];
if (seed && fs.existsSync(seed)) {
  for (const raw of fs.readFileSync(seed, "utf8").split(/\r?\n/).map((s) => s.trim()).filter(Boolean)) {
    const p = new URL(raw).pathname.replace(/\/$/, "") || "/";
    const m = p.match(/^\/(en|de)(\/.*)?$/);
    if (m) routes[m[1]].add(m[2] || "/");
    else routes.fr.add(p);
  }
}

const out = `// Fichier généré par scripts/gen-locale-routes.mjs — ne pas éditer à la main.
export const LOCALE_ROUTES: Record<"fr" | "en" | "de", readonly string[]> = ${JSON.stringify(
  Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, [...v].sort()])),
  null,
  2,
)};
`;
fs.writeFileSync("src/lib/locale-routes.ts", out);
console.log(Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, v.size])));
