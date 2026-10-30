/**
 * Piste « RGPD » : repère les sites qui chargent des traceurs (Google Analytics, Facebook Pixel,
 * Hotjar…) sans aucun outil de consentement aux cookies. Analyse STATIQUE du HTML : on ne prétend
 * donc que ce qui se voit dans le code (« chargé », « je n'ai repéré aucun outil de consentement »),
 * jamais « cookie déposé » (cela demande un navigateur).
 *
 * Précision avant rappel : il faut au moins UN traceur direct dans le code ET aucune signature d'outil
 * de consentement. Un site qui ne charge que Google Tag Manager est ignoré (le consentement peut être
 * géré dans GTM, on ne peut pas le voir).
 */
import type { DiscoveredLead } from "./lead-discovery";
import type { FetchedPage, SiteAudit } from "./website-auditor";

const DIRECT_TRACKERS: { name: string; re: RegExp }[] = [
  { name: "Google Analytics", re: /googletagmanager\.com\/gtag\/js|google-analytics\.com\/(?:analytics|ga)\.js|gtag\(\s*['"]config['"]/i },
  { name: "le pixel Facebook", re: /connect\.facebook\.net\/[^"'\s]*\/fbevents\.js|fbq\(\s*['"]init['"]/i },
  { name: "Hotjar", re: /static\.hotjar\.com|hotjar\.com\/c\/hotjar/i },
  { name: "Microsoft Clarity", re: /clarity\.ms\/tag/i },
  { name: "LinkedIn Insight", re: /snap\.licdn\.com\/li\.lms-analytics/i },
  { name: "le pixel TikTok", re: /analytics\.tiktok\.com\/i18n\/pixel/i },
];

export const CONSENT_TOOL_RE =
  /tarteaucitron|cookiebot|didomi|axeptio|onetrust|cookielaw|cookieyes|cmplz|complianz|iubenda|cookie-notice|cookie_notice|cookieconsent|cookie-consent|klaro|osano|termly|usercentrics|civiccomputing|gdpr-cookie|cc-window|silktide|cookie-law-info|cookiefirst|quantcast|sirdata|consentmanager|moove_gdpr|wpgdprc|real-cookie-banner|borlabs|cookie-banner|cookiebanner|rgpd-cookie|consent-banner/i;

const PRIVACY_LINK_RE =
  /<a\b[^>]*href=["'][^"']*(?:confidentialit|donnees-personnelles|donnees_personnelles|rgpd|privacy|politique-cookies|cookies)[^"']*["']|>\s*[^<]{0,40}(?:confidentialité|données personnelles|politique de cookies)[^<]{0,40}</i;

export type RgpdFindings = {
  trackers: string[];
  consentTool: boolean;
  privacyLink: boolean;
  forms: number;
};

export function detectRgpd(html: string): RgpdFindings {
  return {
    trackers: DIRECT_TRACKERS.filter((t) => t.re.test(html)).map((t) => t.name),
    consentTool: CONSENT_TOOL_RE.test(html),
    privacyLink: PRIVACY_LINK_RE.test(html),
    forms: (html.match(/<form\b/gi) ?? []).length,
  };
}

export function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} et ${names[names.length - 1]}`;
}

export function rgpdAudit(lead: DiscoveredLead, page: FetchedPage): SiteAudit | null {
  if (!page.ok || page.html.length < 500) return null;
  if (lead.language !== "fr") return null; // piste française : CNIL et RGPD s'adressent au marché FR
  const f = detectRgpd(page.html);
  if (f.trackers.length === 0 || f.consentTool) return null;

  const names = joinNames(f.trackers);
  const detail = `${names} ${f.trackers.length > 1 ? "sont chargés" : "est chargé"} dès l'arrivée du visiteur et aucun outil de consentement n'a été repéré${f.privacyLink ? "" : ", ni politique de confidentialité"}.`;
  return {
    language: "fr",
    businessName: lead.businessName,
    sector: lead.sector,
    score: 45,
    problems: [
      {
        title: `${names} sans outil de consentement`,
        detail,
        severity: "critical",
        category: "privacy",
      },
    ],
    recommendations: [
      {
        title: "Bannière de consentement conforme et politique de confidentialité",
        detail: "Refuser et accepter à égalité, traceurs chargés seulement après accord. Prix fixe 490 € HT, livré sous 3 jours ouvrés.",
        impact: "high",
      },
    ],
    estimatedPrice: 490,
    priceRange: "Dès 490 EUR",
    mockupDescription: "",
    screenshotUrl: null,
  };
}
