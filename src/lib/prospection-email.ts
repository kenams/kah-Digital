const DEFAULT_SUBJECT = "Analyse de votre site web - KAH Digital";

export function sanitizeEmailSubject(subject?: string | null, fallback = DEFAULT_SUBJECT) {
  const cleaned = (subject ?? fallback)
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const normalized = cleaned || fallback;
  return normalized.length > 140 ? `${normalized.slice(0, 137).trim()}...` : normalized;
}

export function htmlToTextFallback(html: string, maxLength = 900) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}
