// Pages villes retirées de l'index Google (13/11/2026).
// Search Console : 0 impression en 3 mois et pages jugées trop proches les unes des autres
// (« Détectée/Explorée, actuellement non indexée »). Elles restent en ligne et suivent les liens
// (noindex, follow) ; on les sort aussi du sitemap pour concentrer Google sur les pages qui marchent.
// Les pages suisses (Lausanne, Genève, Berne, Bâle, Lugano, Zurich, Fribourg) restent indexées : ciblage prioritaire.
// Pour en réindexer une : la retirer de cette liste.

const FR_NOINDEX_CITIES = [
  "bordeaux",
  "nantes",
  "strasbourg",
  "nice",
  "lille",
  "montpellier",
  "rennes",
  "grenoble",
  "rouen",
  "aix-en-provence",
  "angers",
  "dijon",
  "clermont-ferrand",
  "metz",
  "toulouse",
  "geneve", // doublon de /site-web-geneve, qui est la page vue par Google
];

// Pages anglaises sur des villes françaises / secondaires : aucune recherche en anglais.
const EN_NOINDEX_CITIES = [
  ...FR_NOINDEX_CITIES.filter((c) => c !== "geneve"),
  "paris",
  "lyon",
  "marseille",
  "caen",
];

export const NOINDEX_PATHS: readonly string[] = [
  ...FR_NOINDEX_CITIES.map((c) => `/agence-web-${c}`),
  ...EN_NOINDEX_CITIES.map((c) => `/en/agence-web-${c}`),
];

export const NOINDEX_SET: ReadonlySet<string> = new Set(NOINDEX_PATHS);
