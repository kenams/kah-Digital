/**
 * Agent 1 : Lead Discovery
 * Utilise Google Places API pour trouver des commerces avec sites web faibles.
 * Rotation automatique : villes mondiales × types de commerces.
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

// Rotation : villes du monde entier
const CITY_ROTATION = [
  { city: "Paris", country: "FR", lang: "fr" },
  { city: "Lyon", country: "FR", lang: "fr" },
  { city: "Marseille", country: "FR", lang: "fr" },
  { city: "Bordeaux", country: "FR", lang: "fr" },
  { city: "Toulouse", country: "FR", lang: "fr" },
  { city: "Brussels", country: "BE", lang: "fr" },
  { city: "Montreal", country: "CA", lang: "fr" },
  { city: "Geneva", country: "CH", lang: "fr" },
  { city: "London", country: "GB", lang: "en" },
  { city: "Manchester", country: "GB", lang: "en" },
  { city: "Toronto", country: "CA", lang: "en" },
  { city: "Sydney", country: "AU", lang: "en" },
  { city: "New York", country: "US", lang: "en" },
  { city: "Miami", country: "US", lang: "en" },
  { city: "Barcelona", country: "ES", lang: "es" },
  { city: "Madrid", country: "ES", lang: "es" },
  { city: "Berlin", country: "DE", lang: "de" },
  { city: "Munich", country: "DE", lang: "de" },
  { city: "Rome", country: "IT", lang: "it" },
  { city: "Milan", country: "IT", lang: "it" },
  { city: "Amsterdam", country: "NL", lang: "nl" },
  { city: "Casablanca", country: "MA", lang: "fr" },
  { city: "Dakar", country: "SN", lang: "fr" },
  { city: "Abidjan", country: "CI", lang: "fr" },
];

// Types de commerces ciblés
const BUSINESS_TYPES = [
  "restaurant",
  "cafe",
  "bakery",
  "bar",
  "beauty_salon",
  "hair_care",
  "clothing_store",
  "shoe_store",
  "jewelry_store",
  "florist",
  "pharmacy",
  "dentist",
  "doctor",
  "lawyer",
  "real_estate_agency",
  "car_dealer",
  "car_repair",
  "plumber",
  "electrician",
  "painter",
  "gym",
  "spa",
  "hotel",
  "travel_agency",
  "insurance_agency",
  "accounting",
  "photography_studio",
];

// Détermine le slot du jour (matin/midi/soir) → index dans la rotation des villes
function getDailyIndex(): number {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  return dayOfYear % CITY_ROTATION.length;
}

function getSlotType(): "morning" | "noon" | "evening" {
  const h = new Date().getUTCHours();
  if (h < 10) return "morning";
  if (h < 14) return "noon";
  return "evening";
}

// Appel Google Places Text Search
async function searchBusinesses(query: string, city: string, apiKey: string): Promise<PlaceResult[]> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + " " + city)}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json() as { results?: PlaceResult[] };
  return data.results ?? [];
}

// Détails d'un lieu (pour récupérer le website)
async function getPlaceDetails(placeId: string, apiKey: string): Promise<{ website?: string; formatted_phone_number?: string } | null> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=website,formatted_phone_number&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json() as { result?: { website?: string; formatted_phone_number?: string } };
  return data.result ?? null;
}

type PlaceResult = {
  place_id: string;
  name: string;
  formatted_address: string;
  types?: string[];
};

export async function discoverLeads(count = 5): Promise<DiscoveredLead[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.warn("[lead-discovery] GOOGLE_PLACES_API_KEY manquant — mode démo actif");
    return getDemoLeads(count);
  }

  const idx = getDailyIndex();
  const slot = getSlotType();
  // Chaque slot cible un type différent dans la même ville
  const slotOffset = slot === "morning" ? 0 : slot === "noon" ? 1 : 2;
  const cityConfig = CITY_ROTATION[(idx + slotOffset) % CITY_ROTATION.length];
  const businessType = BUSINESS_TYPES[Math.floor(Math.random() * BUSINESS_TYPES.length)];

  console.log(`[lead-discovery] Recherche : ${businessType} dans ${cityConfig.city} (${cityConfig.country})`);

  const results = await searchBusinesses(businessType, cityConfig.city, apiKey);
  const leads: DiscoveredLead[] = [];

  for (const place of results.slice(0, count * 3)) {
    if (leads.length >= count) break;

    const details = await getPlaceDetails(place.place_id, apiKey);
    if (!details?.website) continue; // Skip sans site web

    // Filtre les big brands (Tripadvisor, Yelp, etc.)
    const site = details.website.toLowerCase();
    if (site.includes("tripadvisor") || site.includes("yelp") || site.includes("pages.business") || site.includes("facebook.com/")) continue;

    leads.push({
      businessName: place.name,
      website: details.website,
      address: place.formatted_address,
      country: cityConfig.country,
      language: cityConfig.lang,
      sector: businessType.replace(/_/g, " "),
      placeId: place.place_id,
    });
  }

  return leads;
}

// Leads de démo quand pas de clé API
function getDemoLeads(count: number): DiscoveredLead[] {
  const demos: DiscoveredLead[] = [
    { businessName: "Le Bistrot du Coin", website: "https://example-restaurant-fr.fr", address: "12 rue de la Paix, Paris", country: "FR", language: "fr", sector: "restaurant", placeId: "demo-1" },
    { businessName: "Coiffure Marie", website: "https://coiffure-marie.wixsite.com", address: "5 avenue des Fleurs, Lyon", country: "FR", language: "fr", sector: "hair_care", placeId: "demo-2" },
    { businessName: "The Corner Cafe", website: "https://cornercafe.co.uk", address: "22 High Street, London", country: "GB", language: "en", sector: "cafe", placeId: "demo-3" },
    { businessName: "Tienda Moda Bella", website: "https://modabella.es", address: "Calle Mayor 8, Madrid", country: "ES", language: "es", sector: "clothing_store", placeId: "demo-4" },
    { businessName: "Bäckerei Schmidt", website: "https://baeckerei-schmidt.de", address: "Hauptstrasse 15, Munich", country: "DE", language: "de", sector: "bakery", placeId: "demo-5" },
  ];
  return demos.slice(0, count);
}
