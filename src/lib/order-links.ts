import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";
import { defaultCurrency, type Currency, type PackId } from "@/lib/pack-orders";

/** Pages dont les prix sont affichés en CHF (villes et pages suisses, quelle que soit la langue). */
const SWISS_PATH =
  /^(?:\/(?:en|de))?\/(?:agence-web-(?:geneve|lausanne|suisse|zurich|berne|basel|lugano)|site-web-(?:geneve|lausanne|fribourg)|application-web-suisse|automatisation-ia-suisse|webagentur-schweiz|webentwicklung-(?:zuerich|bern|basel|genf|lausanne))(?:\/|$)/;

/** Devise affichée sur une page : CHF sur les pages suisses, sinon selon la langue (FR €, EN $, DE CHF). */
export function pageCurrency(locale: Locale, pathname: string | null | undefined): Currency {
  if (isGermanPath(pathname)) return "eur";
  return isSwissPath(pathname) ? "chf" : defaultCurrency(locale);
}

/** Pages d'Allemagne (Berlin, Munich) : prix et commande en euros, même en allemand. */
export function isGermanPath(pathname: string | null | undefined) {
  return Boolean(pathname && /^\/de\/(?:webentwicklung|ki-agentur)-(?:berlin|muenchen)(?:\/|$)/.test(pathname));
}

export function isSwissPath(pathname: string | null | undefined) {
  return Boolean(pathname && SWISS_PATH.test(pathname));
}

/** Lien vers la commande, avec la bonne langue et la bonne devise selon la page d'où l'on vient. */
export function orderHref(locale: Locale, opts: { pathname?: string | null; pack?: PackId; currency?: Currency } = {}) {
  const params: string[] = [];
  if (opts.pack) params.push(`pack=${opts.pack}`);
  const swiss = isSwissPath(opts.pathname);
  const currency = opts.currency ?? (isGermanPath(opts.pathname) ? "eur" : swiss && locale !== "de" ? "chf" : undefined);
  if (currency) params.push(`devise=${currency}`);
  const base = withLocalePrefix("/commander", locale);
  return params.length ? `${base}?${params.join("&")}` : base;
}
