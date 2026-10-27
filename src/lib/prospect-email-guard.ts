// Adresses factices ou non prospectables qui remontent du scraping de sites
// (placeholders de formulaires, démos de thèmes, boîtes techniques). Les envoyer
// génère des bounces et abîme la réputation du domaine d'envoi.
const PLACEHOLDER_DOMAINS = [
  "exemple.", "example.", "email.ch", "email.com", "email.fr", "domaine.", "domain.",
  "yourdomain", "votredomaine", "mondomaine", "monsite.", "yoursite", "yourcompany",
  "votreentreprise", "sample.", "test.", "localhost", "invalid", "nomdedomaine",
];

const PLACEHOLDER_LOCALS = new Set([
  "vous", "votre", "votre.email", "your", "youremail", "your.email", "you", "jean", "jean.dupont",
  "john", "john.doe", "johndoe", "nom", "prenom", "prenom.nom", "name", "firstname", "email",
  "mail", "test", "exemple", "example", "user", "username", "adresse", "monemail", "mon.email",
  "admin@", "postmaster", "abuse", "webmaster", "hostmaster",
]);

const THIRD_PARTY_DOMAINS = [
  "cloudbeds.com", "wix.com", "wixsite.com", "sentry", "godaddy.com", "ovh.", "gandi.net",
  "hostinger.", "squarespace.com", "shopify.com", "jimdo.com", "weebly.com", "semrush.com",
  "booksy.com", "planity.com", "treatwell.", "fresha.com", "doctolib.", "mindbody", "calendly.com",
  "pagesjaunes.", "tripadvisor.", "yelp.", "facebook.com", "instagram.com", "google.com", "groupon.",
];

export function isPlaceholderEmail(email: string | null | undefined): boolean {
  if (!email) return true;
  const lower = email.trim().toLowerCase();
  const at = lower.lastIndexOf("@");
  if (at < 1) return true;
  const local = lower.slice(0, at);
  const domain = lower.slice(at + 1);
  if (PLACEHOLDER_DOMAINS.some((d) => domain.includes(d))) return true;
  if (THIRD_PARTY_DOMAINS.some((d) => domain.includes(d))) return true;
  if (PLACEHOLDER_LOCALS.has(local)) return true;
  if (/^(no-?reply|do-?not-?reply|mailer-daemon|bounce)/.test(local)) return true;
  if (/\d{6,}/.test(local)) return true;
  return false;
}

// ── Ciblage : on ne démarche que des indépendants qui décident de leur site ──

const FREE_MAIL = [
  "gmail.com", "googlemail.com", "outlook.", "hotmail.", "live.", "yahoo.", "orange.fr", "wanadoo.fr",
  "free.fr", "sfr.fr", "neuf.fr", "laposte.net", "icloud.com", "me.com", "bluewin.ch", "gmx.",
  "proton.me", "protonmail.com", "sunrise.ch", "hispeed.ch", "bbox.fr",
];

// Réseaux nationaux, franchises et groupes : le site est géré par le siège,
// l'agence locale ne peut pas commander un site.
const NETWORK_BRANDS = [
  "axa.", "swisslife.", "allianz.", "generali.", "groupama.", "maif.", "macif.", "maaf.", "mma.",
  "gan.", "thelem", "april.", "hiscox.", "credit-agricole", "creditmutuel", "banquepopulaire",
  "caisse-epargne", "lcl.", "bnpparibas", "societegenerale", "labanquepostale",
  "century21", "orpi.", "laforet.", "guy-hoquet", "stephaneplaza", "foncia.", "nexity.", "iadfrance",
  "la-francaise-immobiliere", "francaiseimmo", "ajp-immobilier", "era-immobilier", "safti.", "capifrance",
  "tchip.", "jeancoutu", "saintalgue", "franck-provost", "dessange", "camille-albane", "jacques-dessange",
  "planet-fitness", "basicfit", "fitnesspark", "keepcool", "neoness",
  "mondial-relay", "midas.", "norauto.", "speedy.", "feuvert.", "euromaster", "vulco.",
  "optic2000", "krys.", "afflelou", "grandoptical", "genericoptic",
  "mcdonalds.", "kfc.", "quick.fr", "subway.",
];

// Sous-domaines de "store locator" des réseaux (agence.axa.fr, salons.tchip.fr…)
const LOCATOR_SUBDOMAINS = /^(agence|agences|salon|salons|magasin|magasins|boutique|boutiques|store|stores|point-de-vente|pdv|cabinet|cabinets|franchise|reseau|annuaire)\./i;

function registrableDomain(host: string): string {
  const parts = host.toLowerCase().replace(/^www\./, "").split(".").filter(Boolean);
  if (parts.length <= 2) return parts.join(".");
  const sld = parts[parts.length - 2];
  if (["co", "com", "org", "net", "gouv"].includes(sld)) return parts.slice(-3).join(".");
  return parts.slice(-2).join(".");
}

export function isNetworkOrLocatorUrl(website: string): boolean {
  try {
    const u = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
    const host = u.hostname.toLowerCase();
    if (LOCATOR_SUBDOMAINS.test(host)) return true;
    if (NETWORK_BRANDS.some((b) => host.includes(b))) return true;
    // Un indépendant a un site à la racine (ou une seule rubrique) ; une fiche
    // /agences/ville/nom est une page d'un réseau ou d'un annuaire.
    const depth = u.pathname.split("/").filter(Boolean).length;
    if (depth >= 2) return true;
    return false;
  } catch {
    return true;
  }
}

// L'adresse doit appartenir à l'entreprise (même domaine que son site) ou être
// une boîte perso (gmail, orange…). Sinon c'est souvent l'agence web qui a
// réalisé le site, ou un salarié d'un groupe.
export function emailBelongsToSite(email: string, website: string): boolean {
  try {
    const domain = email.trim().toLowerCase().split("@")[1] ?? "";
    if (!domain) return false;
    if (FREE_MAIL.some((d) => domain === d || (d.endsWith(".") && domain.startsWith(d)))) return true;
    const host = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`).hostname;
    return registrableDomain(domain) === registrableDomain(host);
  } catch {
    return false;
  }
}

export function isProspectableLead(lead: { website?: string | null; email?: string | null }): { ok: boolean; reason?: string } {
  if (!lead.website) return { ok: false, reason: "no-website" };
  if (isNetworkOrLocatorUrl(lead.website)) return { ok: false, reason: "network-or-locator" };
  if (lead.email) {
    if (isPlaceholderEmail(lead.email)) return { ok: false, reason: "placeholder-email" };
    if (!emailBelongsToSite(lead.email, lead.website)) return { ok: false, reason: "email-not-site-domain" };
  }
  return { ok: true };
}
