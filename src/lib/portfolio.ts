export type PortfolioStatus = "en_cours" | "livre" | "paye" | "annule";
export type PortfolioCategory =
  | "site"
  | "app"
  | "refonte"
  | "automatisation"
  | "seo"
  | "maintenance"
  | "autre";

export type PortfolioProject = {
  id?: string;
  client: string;
  url?: string | null;
  category: PortfolioCategory;
  summary?: string | null;
  priceEur?: number | null;
  status: PortfolioStatus;
  deliveredOn?: string | null;
  paidOn?: string | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export const PORTFOLIO_STATUSES: PortfolioStatus[] = ["en_cours", "livre", "paye", "annule"];
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "site",
  "app",
  "refonte",
  "automatisation",
  "seo",
  "maintenance",
  "autre",
];

const statusLabels: Record<PortfolioStatus, string> = {
  en_cours: "En cours",
  livre: "Livré",
  paye: "Payé",
  annule: "Annulé",
};

const categoryLabels: Record<PortfolioCategory, string> = {
  site: "Site web",
  app: "Application",
  refonte: "Refonte",
  automatisation: "Automatisation",
  seo: "SEO",
  maintenance: "Maintenance",
  autre: "Autre",
};

export function portfolioStatusLabel(value: string): string {
  return statusLabels[value as PortfolioStatus] ?? value;
}

export function portfolioCategoryLabel(value: string): string {
  return categoryLabels[value as PortfolioCategory] ?? value;
}

export function isPortfolioStatus(value: unknown): value is PortfolioStatus {
  return typeof value === "string" && PORTFOLIO_STATUSES.includes(value as PortfolioStatus);
}

export function isPortfolioCategory(value: unknown): value is PortfolioCategory {
  return typeof value === "string" && PORTFOLIO_CATEGORIES.includes(value as PortfolioCategory);
}

const eurFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export function formatEur(value?: number | null): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  return eurFormatter.format(value);
}

export function parseEurAmount(raw: unknown): number | null {
  if (raw === null || raw === undefined || raw === "") return null;
  const normalized = String(raw).replace(/\s/g, "").replace(",", ".").replace(/[^0-9.]/g, "");
  if (!normalized) return null;
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100) / 100;
}
