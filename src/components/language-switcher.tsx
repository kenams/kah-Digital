"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localizePath, stripLocalePrefix, type Locale } from "@/lib/locale";
import { LOCALE_ROUTES } from "@/lib/locale-routes";

const labels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};

const ariaLabels: Record<Locale, string> = {
  fr: "Afficher le site en français",
  en: "View the site in English",
  de: "Website auf Deutsch anzeigen",
};

// Une page n'existe pas toujours dans les trois langues : dans ce cas on renvoie
// vers l'accueil de la langue plutôt que vers un 404.
function targetHref(pathname: string | null, locale: Locale) {
  const base = stripLocalePrefix(pathname) || "/";
  const normalized = base.length > 1 ? base.replace(/\/$/, "") : base;
  if (LOCALE_ROUTES[locale].includes(normalized)) return localizePath(pathname, locale);
  return localizePath("/", locale);
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-1.5 py-1 text-xs font-semibold uppercase tracking-[0.15em]">
      {(["fr", "en", "de"] as const).map((locale) => {
        const active = currentLocale === locale;
        return (
          <Link
            key={locale}
            href={targetHref(pathname, locale)}
            className={`rounded-full px-2.5 py-1 transition ${
              active ? "bg-white text-black" : "text-white/70 hover:text-white"
            }`}
            aria-label={ariaLabels[locale]}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
