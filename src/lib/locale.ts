"use client";

import { usePathname } from "next/navigation";

export type Locale = "fr" | "en";

export function getLocaleFromPathname(pathname: string | null): Locale {
  if (!pathname) return "fr";
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

export function getLocalePrefix(locale: Locale) {
  return locale === "en" ? "/en" : "";
}

export function stripLocalePrefix(pathname: string | null) {
  if (!pathname) return "/";
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.replace(/^\/en/, "") || "/";
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

  if (basePath === "/confidentialite" || basePath === "/politique-de-confidentialite") {
    return "/en/politique-de-confidentialite";
  }

  return basePath === "/" ? "/en" : `/en${basePath}`;
}

export function getAlternateLocalePath(pathname: string | null): { locale: Locale; path: string } {
  const current = pathname ?? "/";
  const locale = getLocaleFromPathname(current);
  const basePath = locale === "en" ? current.replace(/^\/en(\/|$)/, "/") : current;
  const normalized = basePath === "" ? "/" : basePath;
  if (locale === "en") {
    return { locale: "fr", path: normalized };
  }
  return { locale: "en", path: normalized === "/" ? "/en" : `/en${normalized}` };
}

export function useLocale() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  return {
    locale,
    isEnglish: locale === "en",
    prefix: getLocalePrefix(locale),
    pathname,
  };
}
