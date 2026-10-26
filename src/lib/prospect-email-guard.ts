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
