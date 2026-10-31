export type Level = 1 | 2 | 3;

const DAY = 24 * 60 * 60 * 1000;

export function todayParis(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

const toUtc = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));

/** Jours de retard à la date `today` (négatif : pas encore échue). */
export function daysLate(dueDate: string, today: string): number {
  return Math.round((toUtc(today) - toUtc(dueDate)) / DAY);
}

export function levelFor(late: number): Level | null {
  if (late < 1) return null;
  if (late < 15) return 1;
  if (late < 30) return 2;
  return 3;
}

export const LEVEL_LABEL: Record<Level, string> = { 1: "Rappel amical", 2: "Relance", 3: "Dernier rappel" };

export function formatDateFr(iso: string) {
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;
}

export function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(cents / 100);
}

export type DraftInput = { number: string; clientName: string; amountCents: number; currency: string; dueDate: string; late: number; sender: string };

/** Brouillon neutre, à relire et modifier avant envoi : aucune menace chiffrée ni mention juridique inventée. */
export function buildDraft(level: Level, d: DraftInput): { subject: string; body: string } {
  const amount = formatAmount(d.amountCents, d.currency);
  const due = formatDateFr(d.dueDate);
  const hello = `Bonjour ${d.clientName},`;
  const sign = `Cordialement,\n${d.sender}`;
  if (level === 1) {
    return {
      subject: `Rappel : facture ${d.number} échue le ${due}`,
      body: `${hello}\n\nSauf erreur de ma part, la facture ${d.number} d'un montant de ${amount}, échue le ${due}, n'apparaît pas encore comme réglée.\n\nSi le paiement est déjà en cours, merci de ne pas tenir compte de ce message. Sinon, pouvez-vous me confirmer la date de règlement prévue ?\n\n${sign}`,
    };
  }
  if (level === 2) {
    return {
      subject: `Relance : facture ${d.number}, ${d.late} jours de retard`,
      body: `${hello}\n\nJe reviens vers vous au sujet de la facture ${d.number} (${amount}), échue le ${due} et toujours impayée à ce jour, soit ${d.late} jours de retard.\n\nPouvez-vous me communiquer la date de paiement ou me signaler un éventuel point bloquant afin que nous puissions le résoudre ?\n\n${sign}`,
    };
  }
  return {
    subject: `Dernier rappel : facture ${d.number}`,
    body: `${hello}\n\nMalgré mes précédents messages, la facture ${d.number} (${amount}), échue le ${due}, reste impayée depuis ${d.late} jours.\n\nMerci de procéder au règlement sous 8 jours, ou de me contacter si un point vous empêche de le faire. Sans retour de votre part, d'autres démarches devront être envisagées.\n\n${sign}`,
  };
}
