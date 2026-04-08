"use client";

import { usePathname } from "next/navigation";

export type Locale = "fr" | "en" | "de";

export function getLocaleFromPathname(pathname: string | null): Locale {
  if (!pathname) return "fr";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  return "fr";
}

export function getLocalePrefix(locale: Locale) {
  if (locale === "en") return "/en";
  if (locale === "de") return "/de";
  return "";
}

export function stripLocalePrefix(pathname: string | null) {
  if (!pathname) return "/";
  if (pathname === "/en" || pathname === "/de") return "/";
  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
  if (pathname.startsWith("/de/")) return pathname.replace(/^\/de/, "") || "/";
  return pathname;
}

export function localizePath(pathname: string | null, locale: Locale) {
  const basePath = stripLocalePrefix(pathname);
  const germanRouteMap: Record<string, string> = {
    "/": "/de",
    "/services": "/de/services",
    "/services/site-web": "/de/services/site-web",
    "/services/applications": "/de/services/applications",
    "/services/glpi": "/de/services/glpi",
    "/contact": "/de/contact",
    "/factures": "/de/factures",
    "/devis": "/de/devis",
    "/devis/mvp": "/de/devis/mvp",
    "/projets": "/de/projets",
    "/projets/kah-prod": "/de/projets/kah-prod",
    "/mentions-legales": "/de/mentions-legales",
    "/politique-de-confidentialite": "/de/politique-de-confidentialite",
    "/confidentialite": "/de/politique-de-confidentialite",
    "/merci": "/de/merci",
    "/offres": "/de/offres",
    "/configurateur": "/de/configurateur",
    "/cahier-des-charges": "/de/cahier-des-charges",
    "/lexique": "/de/lexique",
  };

  if (locale === "fr") {
    if (basePath === "/politique-de-confidentialite" || basePath === "/confidentialite") {
      return "/confidentialite";
    }
    return basePath;
  }

  if (locale === "en") {
    if (basePath === "/confidentialite" || basePath === "/politique-de-confidentialite") {
      return "/en/politique-de-confidentialite";
    }
    return basePath === "/" ? "/en" : `/en${basePath}`;
  }

  if (basePath.startsWith("/projets/")) {
    return `/de${basePath}`;
  }

  return germanRouteMap[basePath] ?? "/de";
}

export function useLocale() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return {
    locale,
    isEnglish: locale === "en",
    isGerman: locale === "de",
    prefix: getLocalePrefix(locale),
    pathname,
  };
}
