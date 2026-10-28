import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";
import type { Currency, PackId } from "@/lib/pack-orders";

/** Pages dont les prix sont affichés en CHF (villes et pages suisses, quelle que soit la langue). */
const SWISS_PATH =
  /^(?:\/(?:en|de))?\/(?:agence-web-(?:geneve|lausanne|suisse|zurich|berne|basel|lugano)|site-web-(?:geneve|lausanne|fribourg)|application-web-suisse|automatisation-ia-suisse|webagentur-schweiz|webentwicklung-(?:zuerich|bern|basel|genf|lausanne))(?:\/|$)/;

export function isSwissPath(pathname: string | null | undefined) {
  return Boolean(pathname && SWISS_PATH.test(pathname));
}

/** Lien vers la commande, avec la bonne langue et la bonne devise selon la page d'où l'on vient. */
export function orderHref(locale: Locale, opts: { pathname?: string | null; pack?: PackId; currency?: Currency } = {}) {
  const params: string[] = [];
  if (opts.pack) params.push(`pack=${opts.pack}`);
  const swiss = isSwissPath(opts.pathname);
  const currency = opts.currency ?? (swiss && locale !== "de" ? "chf" : undefined);
  if (currency) params.push(`devise=${currency}`);
  const base = withLocalePrefix("/commander", locale);
  return params.length ? `${base}?${params.join("&")}` : base;
}
