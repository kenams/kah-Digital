// Échappement et validation des champs saisis par des visiteurs avant de les
// insérer dans un e-mail HTML, un message Telegram (parse_mode HTML) ou un sujet.
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Coupe à `max` caractères et retire les caractères de contrôle (dont CR/LF :
// pas d'injection d'en-tête e-mail). `multiline` conserve les retours à la ligne.
export function clip(value: unknown, max: number, multiline = false): string {
  const text = typeof value === "string" ? value : "";
  const cleaned = multiline
    ? text.replace(/\r/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : text.replace(/[\u0000-\u001F\u007F]/g, " ");
  return cleaned.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]{2,}$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 200 && EMAIL_RE.test(value);
}

export function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 300) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
