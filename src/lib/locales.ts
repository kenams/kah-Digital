export type Locale = "fr" | "en" | "de";

export function getLocalePrefix(locale: Locale) {
  if (locale === "en") return "/en";
  if (locale === "de") return "/de";
  return "";
}

export function withLocalePrefix(path: string, locale: Locale) {
  if (!path.startsWith("/")) return path;
  const prefix = getLocalePrefix(locale);
  return prefix ? `${prefix}${path}` : path;
}

export function getLocalizedPath(path: string, locale: Locale) {
  if (path === "/") return getLocalePrefix(locale) || "/";
  return withLocalePrefix(path, locale);
}
