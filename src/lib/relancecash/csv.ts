export type Currency = "EUR" | "CHF" | "USD";

export type ParsedInvoice = {
  number: string;
  clientName: string;
  clientEmail: string | null;
  amountCents: number;
  currency: Currency;
  issueDate: string | null;
  dueDate: string;
};

export type ParseResult = { rows: ParsedInvoice[]; errors: string[] };

const MAX_ROWS = 2000;

const strip = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function detectDelimiter(line: string) {
  const counts: Array<[string, number]> = [[";", 0], [",", 0], ["\t", 0]];
  let quoted = false;
  for (const ch of line) {
    if (ch === '"') quoted = !quoted;
    if (!quoted) for (const c of counts) if (c[0] === ch) c[1]++;
  }
  counts.sort((a, b) => b[1] - a[1]);
  return counts[0][1] > 0 ? counts[0][0] : ";";
}

function splitRecords(text: string, delimiter: string): string[][] {
  const records: string[][] = [];
  let field = "";
  let record: string[] = [];
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === delimiter) { record.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      record.push(field); field = "";
      if (record.some((c) => c.trim() !== "")) records.push(record);
      record = [];
    } else field += ch;
  }
  record.push(field);
  if (record.some((c) => c.trim() !== "")) records.push(record);
  return records;
}

type Field = "number" | "client" | "email" | "amount" | "currency" | "issue" | "due";

function fieldFor(header: string): Field | null {
  const h = strip(header);
  if (!h) return null;
  if (h.includes("echeance") || h === "due" || h.includes("due date") || h.includes("date limite")) return "due";
  if (h.includes("emission") || h.includes("issue") || h === "date" || h.includes("date facture")) return "issue";
  if (h.includes("mail") || h.includes("courriel")) return "email";
  if (h.includes("devise") || h === "currency") return "currency";
  if (h.includes("montant") || h.includes("amount") || h === "total" || h.includes("ttc")) return "amount";
  if (h.includes("client") || h.includes("societe") || h.includes("customer") || h === "nom" || h.includes("raison")) return "client";
  if (h.startsWith("num") || h.includes("facture") || h.includes("invoice") || h === "n" || h === "ref" || h.includes("reference")) return "number";
  return null;
}

export function parseAmount(raw: string): number | null {
  let s = raw.replace(/[\s  ]/g, "").replace(/[€$]|chf|eur|usd/gi, "");
  if (!s || !/^-?[\d.,]+$/.test(s)) return null;
  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");
  if (lastComma >= 0 && lastDot >= 0) {
    const decimal = lastComma > lastDot ? "," : ".";
    const thousands = decimal === "," ? "." : ",";
    s = s.split(thousands).join("").replace(decimal, ".");
  } else if (lastComma >= 0) {
    s = s.split(",").length > 2 ? s.split(",").join("") : s.replace(",", ".");
  } else if (lastDot >= 0 && s.split(".").length > 2) {
    s = s.split(".").join("");
  }
  const value = Number(s);
  if (!Number.isFinite(value) || value < 0 || value > 100_000_000) return null;
  return Math.round(value * 100);
}

export function parseDate(raw: string): string | null {
  const s = raw.trim();
  let y: number, m: number, d: number;
  let match = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) { y = +match[1]; m = +match[2]; d = +match[3]; }
  else if ((match = s.match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/))) { d = +match[1]; m = +match[2]; y = +match[3]; }
  else return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const EMAIL_RE = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]{2,}$/;

export function parseInvoicesCsv(input: string): ParseResult {
  const text = input.replace(/^﻿/, "");
  const errors: string[] = [];
  if (!text.trim()) return { rows: [], errors: ["Le fichier est vide."] };
  const firstLine = text.split(/\r?\n/, 1)[0] ?? "";
  const records = splitRecords(text, detectDelimiter(firstLine));
  const header = records.shift();
  if (!header) return { rows: [], errors: ["Aucune ligne trouvée."] };

  const index: Partial<Record<Field, number>> = {};
  header.forEach((h, i) => {
    const f = fieldFor(h);
    if (f && index[f] === undefined) index[f] = i;
  });
  const missing = (["number", "client", "amount", "due"] as const).filter((f) => index[f] === undefined);
  if (missing.length) {
    const names = { number: "numéro de facture", client: "client", amount: "montant", due: "échéance" } as const;
    return { rows: [], errors: [`Colonnes introuvables : ${missing.map((f) => names[f]).join(", ")}. Première ligne attendue : numéro; client; email; montant; échéance.`] };
  }
  if (records.length > MAX_ROWS) return { rows: [], errors: [`Trop de lignes (maximum ${MAX_ROWS}).`] };

  const rows: ParsedInvoice[] = [];
  const seen = new Set<string>();
  records.forEach((rec, i) => {
    const line = i + 2;
    const get = (f: Field) => (index[f] === undefined ? "" : (rec[index[f]!] ?? "").trim());
    const number = get("number").slice(0, 60);
    const clientName = get("client").slice(0, 160);
    const amountCents = parseAmount(get("amount"));
    const dueDate = parseDate(get("due"));
    const rawIssue = get("issue");
    const issueDate = rawIssue ? parseDate(rawIssue) : null;
    const email = get("email").toLowerCase();
    const rawCurrency = get("currency").toUpperCase();
    const currency: Currency = rawCurrency === "CHF" || rawCurrency === "USD" ? rawCurrency : "EUR";
    const problem = !number ? "numéro manquant" : !clientName ? "client manquant" : amountCents === null ? "montant illisible" : !dueDate ? "date d'échéance illisible (jj/mm/aaaa ou aaaa-mm-jj)" : seen.has(number) ? "numéro en double dans le fichier" : null;
    if (problem) { errors.push(`Ligne ${line} : ${problem}.`); return; }
    seen.add(number);
    rows.push({
      number, clientName, amountCents: amountCents!, currency, dueDate: dueDate!,
      issueDate: rawIssue && !issueDate ? null : issueDate,
      clientEmail: email && EMAIL_RE.test(email) ? email : null,
    });
  });
  return { rows, errors };
}
