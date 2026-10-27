// Dernier contrôle avant tout envoi de prospection (premier mail, backlog, relance).
// Principe : on préfère ne rien envoyer que d'envoyer un mail faux, mal adressé
// ou mal rédigé. Toute règle qui échoue bloque l'envoi.

import { resolveMx, resolve4 } from "node:dns/promises";
import { isProspectableLead } from "@/lib/prospect-email-guard";

export type GateInput = {
  to: string;
  website: string | null | undefined;
  businessName: string | null | undefined;
  subject: string | null | undefined;
  html: string | null | undefined;
  /** Les relances ont leur propre lien de désinscription mais pas de pixel obligatoire. */
  requireUnsubscribe?: boolean;
};

export class SendBlockedError extends Error {
  reasons: string[];
  constructor(reasons: string[]) {
    super(`Envoi bloqué: ${reasons.join(", ")}`);
    this.name = "SendBlockedError";
    this.reasons = reasons;
  }
}

// Jetons qui trahissent un gabarit non rempli ou une donnée interne qui fuit.
const LEAK_PATTERNS: [RegExp, string][] = [
  [/\{\{[^}]*\}\}/, "placeholder {{…}}"],
  [/\bundefined\b/i, "undefined"],
  [/\bnull\b/i, "null"],
  [/\bNaN\b/, "NaN"],
  [/\[object [A-Za-z]+\]/, "[object]"],
  [/\bservice-local\b/i, "slug service-local"],
  [/\bno_email\b|\bpme-it\b/i, "slug interne"],
  [/\$\{/, "gabarit ${…}"],
];

export function checkContent(input: Pick<GateInput, "businessName" | "subject" | "html" | "requireUnsubscribe">): string[] {
  const reasons: string[] = [];
  const name = (input.businessName ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const html = input.html ?? "";

  if (name.length < 2 || name.length > 80) reasons.push("nom d'entreprise absent ou trop long");
  if (/https?:\/\//i.test(name) || name.split(/\s+/).length > 12) reasons.push("nom d'entreprise douteux");

  if (subject.length < 5) reasons.push("sujet vide");
  if (subject.length > 95) reasons.push("sujet trop long");
  if (/[\r\n]/.test(subject)) reasons.push("sujet multi-ligne");

  if (html.replace(/<[^>]+>/g, " ").trim().length < 80) reasons.push("corps trop court");

  for (const [re, label] of LEAK_PATTERNS) {
    if (re.test(subject)) reasons.push(`sujet: ${label}`);
    // Le HTML contient légitimement "null"/"undefined" dans des attributs rares : on ne teste que le texte visible.
    if (re.test(html.replace(/<[^>]+>/g, " "))) reasons.push(`corps: ${label}`);
  }

  if (input.requireUnsubscribe !== false && !/\/api\/unsubscribe\?id=[0-9a-f-]{36}/i.test(html)) {
    reasons.push("lien de désinscription absent");
  }

  return [...new Set(reasons)];
}

// L'adresse doit pouvoir recevoir du courrier : un domaine sans MX (ni A) bounce à coup sûr.
export async function domainCanReceiveMail(email: string, timeoutMs = 5000): Promise<boolean> {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  const withTimeout = <T,>(p: Promise<T>) =>
    Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error("dns-timeout")), timeoutMs))]);
  try {
    const mx = await withTimeout(resolveMx(domain));
    if (mx.length > 0) return true;
  } catch {
    /* on tente l'enregistrement A, règle RFC 5321 */
  }
  try {
    const a = await withTimeout(resolve4(domain));
    return a.length > 0;
  } catch {
    return false;
  }
}

export async function checkSendable(input: GateInput, opts: { skipDns?: boolean } = {}): Promise<{ ok: boolean; reasons: string[] }> {
  const reasons = checkContent(input);

  const fit = isProspectableLead({ website: input.website, email: input.to });
  if (!fit.ok) reasons.push(`cible: ${fit.reason}`);

  if (!opts.skipDns && fit.ok && !(await domainCanReceiveMail(input.to))) {
    reasons.push("domaine de l'adresse sans serveur mail");
  }

  return { ok: reasons.length === 0, reasons };
}

export async function assertSendable(input: GateInput, opts: { skipDns?: boolean } = {}): Promise<void> {
  const res = await checkSendable(input, opts);
  if (!res.ok) throw new SendBlockedError(res.reasons);
}
