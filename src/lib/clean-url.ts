// Une variable d'environnement collée avec `echo` garde un retour à la ligne (ex.
// "https://kah-digital.ch \r\n") : toute URL construite par concaténation devient
// invalide et la redirection plante en 500. On nettoie à la lecture.
export function cleanUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[\s"']+/g, "").replace(/\/+$/, "");
  return cleaned || undefined;
}
