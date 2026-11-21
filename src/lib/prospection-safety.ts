// Garde-fous de volume : peu d'envois, mais surs. Plafond journalier, interrupteur
// manuel et coupe-circuit automatique si trop d'adresses rebondissent.

import type { SupabaseClient } from "@supabase/supabase-js";

export const DEFAULT_DAILY_CAP = 8;
export const BOUNCE_WINDOW_DAYS = 14;
export const BOUNCE_MIN_COUNT = 2;      // au moins 2 rebonds/plaintes…
export const BOUNCE_MAX_RATE = 0.04;    // …et plus de 4 % des envois récents (seuil de suspension des fournisseurs ; sain < 2 %)

export type SendBudget = {
  allowed: number;
  paused: boolean;
  reason?: string;
  sentToday: number;
  cap: number;
};

// Décalage Paris/UTC (ms) à un instant donné : +1 h l'hiver, +2 h l'été.
function parisOffsetMs(instantMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris", hourCycle: "h23",
    year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric",
  }).formatToParts(new Date(instantMs));
  const v = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const wall = Date.UTC(v("year"), v("month") - 1, v("day"), v("hour"), v("minute"), v("second"));
  return Math.round((wall - Math.floor(instantMs / 1000) * 1000) / 60000) * 60000;
}

// Début de la journée en Europe/Paris, en ISO UTC.
export function startOfParisDayIso(now = new Date()): string {
  const offset = parisOffsetMs(now.getTime());
  const wall = new Date(now.getTime() + offset);
  const utcMidnightOfParisDay = Date.UTC(wall.getUTCFullYear(), wall.getUTCMonth(), wall.getUTCDate());
  // Le décalage peut différer à minuit (jour de changement d'heure) : deuxième passe.
  const guess = utcMidnightOfParisDay - parisOffsetMs(utcMidnightOfParisDay - offset);
  return new Date(guess).toISOString();
}

export function evaluateBounces(sent: number, bounced: number): { tripped: boolean; rate: number } {
  const rate = sent > 0 ? bounced / sent : 0;
  return { tripped: bounced >= BOUNCE_MIN_COUNT && rate > BOUNCE_MAX_RATE, rate };
}

// Reprise prudente : sans nouveaux envois, le taux de rebonds ne baisse jamais et la pause
// durerait 14 jours. Après 72 h sans rebond, on teste à petit volume ; le moindre rebond
// relance une pause de 72 h. Le seuil du coupe-circuit, lui, ne change pas.
export const PROBE_COOLDOWN_MS = 72 * 3600_000;
export const PROBE_DAILY_CAP = 2;

export function evaluateProbe(nowMs: number, lastBounceAt: string | null, sentToday: number): { allowed: number; resumeAt: number | null } {
  const last = lastBounceAt ? Date.parse(lastBounceAt) : NaN;
  if (Number.isFinite(last) && nowMs - last < PROBE_COOLDOWN_MS) {
    return { allowed: 0, resumeAt: last + PROBE_COOLDOWN_MS };
  }
  return { allowed: Math.max(0, PROBE_DAILY_CAP - sentToday), resumeAt: null };
}

export function dailyCap(): number {
  const n = Number(process.env.PROSPECTION_DAILY_CAP);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : DEFAULT_DAILY_CAP;
}

export async function getSendBudget(supabase: SupabaseClient, wantedThisRun: number): Promise<SendBudget> {
  const cap = dailyCap();
  const base = { cap, sentToday: 0 };

  if (process.env.PROSPECTION_PAUSED === "1") {
    return { ...base, allowed: 0, paused: true, reason: "PROSPECTION_PAUSED=1 (interrupteur manuel)" };
  }

  const since = new Date(Date.now() - BOUNCE_WINDOW_DAYS * 86400000).toISOString();
  const [{ count: sentRecent }, { count: bouncedRecent }, { count: sentToday }] = await Promise.all([
    supabase.from("prospects").select("id", { count: "exact", head: true }).gte("sentAt", since),
    supabase.from("prospects").select("id", { count: "exact", head: true }).gte("bouncedAt", since),
    supabase.from("prospects").select("id", { count: "exact", head: true }).gte("sentAt", startOfParisDayIso()),
  ]);

  const { tripped, rate } = evaluateBounces(sentRecent ?? 0, bouncedRecent ?? 0);
  if (tripped) {
    const { data: lastBounce } = await supabase
      .from("prospects").select("bouncedAt").not("bouncedAt", "is", null)
      .order("bouncedAt", { ascending: false }).limit(1).maybeSingle();
    const probe = evaluateProbe(Date.now(), lastBounce?.bouncedAt ?? null, sentToday ?? 0);
    const why = `coupe-circuit: ${bouncedRecent} rebonds/plaintes sur ${sentRecent} envois en ${BOUNCE_WINDOW_DAYS} j (${(rate * 100).toFixed(1)} %)`;
    return {
      ...base,
      sentToday: sentToday ?? 0,
      allowed: Math.min(wantedThisRun, probe.allowed),
      paused: probe.allowed === 0,
      reason: probe.resumeAt
        ? `${why}, reprise prudente à partir du ${new Date(probe.resumeAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris", dateStyle: "short", timeStyle: "short" })}`
        : `${why}, reprise prudente : ${PROBE_DAILY_CAP} envois/jour, nouvelle pause au moindre rebond`,
    };
  }

  const left = Math.max(0, cap - (sentToday ?? 0));
  return { cap, sentToday: sentToday ?? 0, allowed: Math.min(wantedThisRun, left), paused: false, reason: left === 0 ? `plafond journalier atteint (${cap})` : undefined };
}

// Un clic dans les 2 minutes qui suivent N'IMPORTE QUEL envoi (premier mail ou relance) vient d'un
// scanner anti-spam d'entreprise, pas d'une personne.
export const SCANNER_WINDOW_MS = 120_000;

export function isScannerClick(nowMs: number, sentAts: (string | null | undefined)[]): boolean {
  return sentAts.some((t) => {
    const ms = t ? Date.parse(t) : NaN;
    return Number.isFinite(ms) && nowMs - ms >= 0 && nowMs - ms < SCANNER_WINDOW_MS;
  });
}
