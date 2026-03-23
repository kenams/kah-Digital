import type { QuotePaymentMode, QuotePaymentStatus, QuoteRecord } from "@/lib/quote";

const currencyFormatter = new Intl.NumberFormat("fr-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatChfFromCents(amount?: number | null) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return "-";
  }
  return currencyFormatter.format(amount / 100);
}

export function parseChfAmountToCents(input: unknown) {
  if (typeof input === "number" && Number.isFinite(input)) {
    return Math.round(input * 100);
  }

  if (typeof input !== "string") {
    throw new Error("Montant invalide.");
  }

  const normalized = input.replace(/\s/g, "").replace(",", ".").trim();
  if (!normalized) {
    throw new Error("Montant manquant.");
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    throw new Error("Format de montant invalide.");
  }

  return Math.round(Number(normalized) * 100);
}

export function getQuotePaymentStatusLabel(status?: QuotePaymentStatus) {
  switch (status) {
    case "pending":
      return "Lien actif";
    case "partial":
      return "Acompte reçu";
    case "paid":
      return "Réglé";
    case "expired":
      return "Lien expiré";
    default:
      return "Non configuré";
  }
}

export function computeAmountToCharge(params: {
  mode: QuotePaymentMode;
  totalAmount: number;
  depositAmount?: number | null;
  paidAmount?: number | null;
}) {
  const paidAmount = Math.max(0, params.paidAmount ?? 0);
  const totalAmount = Math.max(0, params.totalAmount);
  const depositAmount = Math.max(0, params.depositAmount ?? 0);

  if (params.mode === "deposit") {
    return Math.max(0, depositAmount - paidAmount);
  }

  return Math.max(0, totalAmount - paidAmount);
}

export function computeNextPaymentStatus(params: {
  totalAmount: number;
  paidAmount: number;
  fallback?: QuotePaymentStatus;
}) {
  const totalAmount = Math.max(0, params.totalAmount);
  const paidAmount = Math.max(0, params.paidAmount);

  if (totalAmount > 0 && paidAmount >= totalAmount) {
    return "paid" satisfies QuotePaymentStatus;
  }

  if (paidAmount > 0) {
    return "partial" satisfies QuotePaymentStatus;
  }

  return params.fallback ?? "none";
}

export function buildStripePaymentLabel(params: {
  mode: QuotePaymentMode;
  quote: QuoteRecord;
}) {
  const projectLabel = params.quote.projectType?.trim() || "Projet KAH-Digital";
  if (params.mode === "deposit") {
    return `Acompte projet - ${projectLabel}`;
  }

  const totalAmount = params.quote.paymentTotalAmount ?? 0;
  const paidAmount = params.quote.paymentPaidAmount ?? 0;
  if (paidAmount > 0 && totalAmount > paidAmount) {
    return `Solde projet - ${projectLabel}`;
  }

  return `Paiement projet - ${projectLabel}`;
}
