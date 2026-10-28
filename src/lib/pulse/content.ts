/**
 * KAH Pulse — contenu « vivant » d'un site client + opérations autorisées.
 * L'IA ne peut écrire QUE via ces opérations, toutes validées et nettoyées ici.
 */

export const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Day = (typeof DAYS)[number];

export const DAY_LABELS_FR: Record<Day, string> = {
  mon: "Lundi", tue: "Mardi", wed: "Mercredi", thu: "Jeudi", fri: "Vendredi", sat: "Samedi", sun: "Dimanche",
};

export type PulseContent = {
  announcement?: { text: string; until?: string };
  closure?: { from: string; to: string; text?: string };
  hours?: Partial<Record<Day, string>>;
  promo?: { title: string; text?: string; until?: string };
  special?: { title: string; items: string[]; date?: string };
  contact?: { phone?: string; email?: string; address?: string; whatsapp?: string };
};

export type PulseOp =
  | { op: "set_announcement"; text: string; until?: string }
  | { op: "clear_announcement" }
  | { op: "set_closure"; from: string; to: string; text?: string }
  | { op: "clear_closure" }
  | { op: "set_hours"; day: Day | "all"; value: string }
  | { op: "set_promo"; title: string; text?: string; until?: string }
  | { op: "clear_promo" }
  | { op: "set_special"; title: string; items: string[]; date?: string }
  | { op: "clear_special" }
  | { op: "set_contact"; field: "phone" | "email" | "address" | "whatsapp"; value: string };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Retire balises, caractères de contrôle et espaces multiples ; tronque. */
export function cleanText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanDate(value: unknown): string | undefined {
  if (typeof value !== "string" || !DATE_RE.test(value)) return undefined;
  const d = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? undefined : value;
}

function isDay(value: unknown): value is Day | "all" {
  return value === "all" || (typeof value === "string" && (DAYS as readonly string[]).includes(value));
}

/** Valide une opération brute (venant de l'IA) ; renvoie null si invalide. */
export function sanitizeOp(raw: unknown): PulseOp | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  switch (o.op) {
    case "set_announcement": {
      const text = cleanText(o.text, 200);
      return text ? { op: "set_announcement", text, until: cleanDate(o.until) } : null;
    }
    case "clear_announcement":
    case "clear_closure":
    case "clear_promo":
    case "clear_special":
      return { op: o.op };
    case "set_closure": {
      const from = cleanDate(o.from);
      const to = cleanDate(o.to) ?? from;
      if (!from || !to || to < from) return null;
      return { op: "set_closure", from, to, text: cleanText(o.text, 160) || undefined };
    }
    case "set_hours": {
      if (!isDay(o.day)) return null;
      const value = cleanText(o.value, 40);
      return value ? { op: "set_hours", day: o.day, value } : null;
    }
    case "set_promo": {
      const title = cleanText(o.title, 80);
      return title ? { op: "set_promo", title, text: cleanText(o.text, 200) || undefined, until: cleanDate(o.until) } : null;
    }
    case "set_special": {
      const title = cleanText(o.title, 80);
      const items = Array.isArray(o.items) ? o.items.map((i) => cleanText(i, 90)).filter(Boolean).slice(0, 8) : [];
      return title || items.length ? { op: "set_special", title: title || "Plat du jour", items, date: cleanDate(o.date) } : null;
    }
    case "set_contact": {
      if (o.field !== "phone" && o.field !== "email" && o.field !== "address" && o.field !== "whatsapp") return null;
      const value = cleanText(o.value, o.field === "address" ? 160 : 80);
      if (!value) return null;
      if (o.field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
      if ((o.field === "phone" || o.field === "whatsapp") && !/^[+\d][\d\s().-]{5,}$/.test(value)) return null;
      return { op: "set_contact", field: o.field, value };
    }
    default:
      return null;
  }
}

export function applyOps(content: PulseContent, ops: PulseOp[]): PulseContent {
  const next: PulseContent = JSON.parse(JSON.stringify(content ?? {}));

  for (const op of ops) {
    switch (op.op) {
      case "set_announcement":
        next.announcement = { text: op.text, ...(op.until ? { until: op.until } : {}) };
        break;
      case "clear_announcement":
        delete next.announcement;
        break;
      case "set_closure":
        next.closure = { from: op.from, to: op.to, ...(op.text ? { text: op.text } : {}) };
        break;
      case "clear_closure":
        delete next.closure;
        break;
      case "set_hours": {
        const hours = { ...(next.hours ?? {}) };
        if (op.day === "all") for (const d of DAYS) hours[d] = op.value;
        else hours[op.day] = op.value;
        next.hours = hours;
        break;
      }
      case "set_promo":
        next.promo = { title: op.title, ...(op.text ? { text: op.text } : {}), ...(op.until ? { until: op.until } : {}) };
        break;
      case "clear_promo":
        delete next.promo;
        break;
      case "set_special":
        next.special = { title: op.title, items: op.items, ...(op.date ? { date: op.date } : {}) };
        break;
      case "clear_special":
        delete next.special;
        break;
      case "set_contact":
        next.contact = { ...(next.contact ?? {}), [op.field]: op.value };
        break;
    }
  }
  return next;
}

/** Date du jour AAAA-MM-JJ dans un fuseau donné. */
export function todayIn(timeZone: string, now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Contenu à exposer publiquement : retire ce qui a expiré. */
export function publicView(content: PulseContent, timeZone: string, now: Date = new Date()): PulseContent {
  const today = todayIn(timeZone, now);
  const out: PulseContent = JSON.parse(JSON.stringify(content ?? {}));
  if (out.announcement?.until && out.announcement.until < today) delete out.announcement;
  if (out.promo?.until && out.promo.until < today) delete out.promo;
  if (out.closure && out.closure.to < today) delete out.closure;
  if (out.special?.date && out.special.date < today) delete out.special;
  return out;
}

/** Résumé lisible du contenu, pour l'IA et l'espace client. */
export function describeContent(content: PulseContent): string[] {
  const lines: string[] = [];
  if (content.announcement) lines.push(`Annonce : ${content.announcement.text}${content.announcement.until ? ` (jusqu'au ${content.announcement.until})` : ""}`);
  if (content.closure) lines.push(`Fermeture : du ${content.closure.from} au ${content.closure.to}${content.closure.text ? ` — ${content.closure.text}` : ""}`);
  if (content.promo) lines.push(`Promo : ${content.promo.title}${content.promo.text ? ` — ${content.promo.text}` : ""}${content.promo.until ? ` (jusqu'au ${content.promo.until})` : ""}`);
  if (content.special) lines.push(`${content.special.title} : ${content.special.items.join(", ")}`);
  if (content.hours) {
    const h = DAYS.filter((d) => content.hours?.[d]).map((d) => `${DAY_LABELS_FR[d]} ${content.hours?.[d]}`);
    if (h.length) lines.push(`Horaires : ${h.join(" · ")}`);
  }
  if (content.contact) {
    const c = Object.entries(content.contact).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
    if (c.length) lines.push(`Contact : ${c.join(" · ")}`);
  }
  return lines;
}
