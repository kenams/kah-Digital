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
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
  if (pathname === "/de") return "/";
  if (pathname.startsWith("/de/")) return pathname.replace(/^\/de/, "") || "/";
  return pathname;
}

export function localizePath(pathname: string | null, locale: Locale) {
  const basePath = stripLocalePrefix(pathname);

  if (locale === "fr") {
    if (basePath === "/politique-de-confidentialite" || basePath === "/confidentialite") {
      return "/confidentialite";
    }
    return basePath;
  }

  if (locale === "de") {
    if (basePath === "/confidentialite" || basePath === "/politique-de-confidentialite") {
      return "/de/politique-de-confidentialite";
    }
    return basePath === "/" ? "/de" : `/de${basePath}`;
  }

  if (basePath === "/confidentialite" || basePath === "/politique-de-confidentialite") {
    return "/en/politique-de-confidentialite";
  }
  return basePath === "/" ? "/en" : `/en${basePath}`;
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
