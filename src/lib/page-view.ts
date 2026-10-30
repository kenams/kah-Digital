export type PageLocale = "fr" | "en" | "de";

export type PageSection = "home" | "cyber" | "devis" | "commander" | "offres" | "contact" | "blog" | "seo" | "other";

export function splitLocale(pathname: string): { locale: PageLocale; base: string } {
  const match = pathname.match(/^\/(en|de)(\/.*)?$/);
  if (match) return { locale: match[1] as PageLocale, base: match[2] || "/" };
  return { locale: "fr", base: pathname || "/" };
}

export function classifyPath(pathname: string): { locale: PageLocale; section: PageSection } {
  const { locale, base } = splitLocale(pathname);
  if (base === "/") return { locale, section: "home" };
  if (base === "/cybersecurite" || base.startsWith("/cybersecurite/")) return { locale, section: "cyber" };
  if (base.startsWith("/devis")) return { locale, section: "devis" };
  if (base.startsWith("/commander")) return { locale, section: "commander" };
  if (base.startsWith("/offres")) return { locale, section: "offres" };
  if (base.startsWith("/contact")) return { locale, section: "contact" };
  if (base.startsWith("/blog")) return { locale, section: "blog" };
  if (/^\/(agence-web|site-web|webagentur|webentwicklung|web-development|ai-agency|ki-agentur|agence-ia)/.test(base)) return { locale, section: "seo" };
  return { locale, section: "other" };
}

/** Pages privées ou techniques : jamais comptées. */
export function isTrackablePath(pathname: string) {
  if (!pathname.startsWith("/") || pathname.length > 200) return false;
  return !/^(\/(en|de))?\/(admin|api|_next|maquette|p\/|espace|proposition|pulse|merci)/.test(pathname);
}
