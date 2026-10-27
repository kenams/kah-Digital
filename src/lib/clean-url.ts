// Une variable d'environnement collée avec `echo` garde un retour à la ligne (ex.
// "https://kah-digital.ch \r\n") : toute URL construite par concaténation devient
// invalide et la redirection plante en 500. On nettoie à la lecture.
export function cleanUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[\s"']+/g, "").replace(/\/+$/, "");
  return cleaned || undefined;
}

// Un lien de suivi envoyé dans un mail ne doit jamais pouvoir renvoyer vers un autre
// site (open redirect : hameçonnage sous notre domaine). On n'accepte qu'une adresse
// de notre propre site (avec ou sans "www."), sinon on retombe sur le défaut.
export function safeSiteRedirect(raw: string | null | undefined, siteUrl: string, fallback: string): string {
  if (!raw) return fallback;
  try {
    let candidate = raw;
    try { candidate = decodeURIComponent(raw); } catch { /* déjà décodé */ }
    const base = new URL(siteUrl);
    const url = new URL(candidate, base);
    const bare = (h: string) => h.toLowerCase().replace(/^www\./, "");
    const sameSite = (url.protocol === "https:" || url.protocol === "http:") && bare(url.hostname) === bare(base.hostname) && !url.username && !url.password;
    return sameSite ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}
