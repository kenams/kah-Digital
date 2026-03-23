"use client";

import Link from "next/link";
import { useState } from "react";
import type { QuoteActivityRecord, QuoteRecord } from "@/lib/quote";
import { formatChfFromCents, getQuotePaymentStatusLabel, parseChfAmountToCents } from "@/lib/quote-payments";

type Props = {
  initialItem: QuoteRecord;
  initialActivities: QuoteActivityRecord[];
};

const feasibilityOptions = [
  { value: "pending", label: "À qualifier" },
  { value: "feasible", label: "Faisable" },
  { value: "blocked", label: "Non faisable" },
] as const;

const depositOptions = [
  { value: "none", label: "Non défini" },
  { value: "deposit", label: "Acompte validé" },
  { value: "servers", label: "Serveurs / outils réglés" },
] as const;

const feasibilityBadges = {
  pending: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  feasible: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  blocked: "bg-rose-100/15 text-rose-200 border border-rose-200/30",
} as const;

const depositBadges = {
  none: "bg-white/10 text-white/70 border border-white/15",
  deposit: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  servers: "bg-purple-100/20 text-purple-100 border border-purple-200/40",
} as const;

const paymentStatusBadges = {
  none: "bg-white/10 text-white/70 border border-white/15",
  pending: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  partial: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  paid: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  expired: "bg-rose-100/15 text-rose-200 border border-rose-200/30",
} as const;

function getLeadSummary(item: QuoteRecord) {
  const parts = [item.goal, item.message, item.configurator?.strategy, item.configurator?.siteType]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  return parts[0] || "Aucun résumé client saisi pour cette demande.";
}

function formatPaymentDraft(value?: number) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return "";
  return (value / 100).toFixed(2);
}

function getActivityTone(action: QuoteActivityRecord["action"]) {
  switch (action) {
    case "payment_received":
      return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100";
    case "payment_link_created":
      return "border-sky-300/25 bg-sky-300/10 text-sky-100";
    case "payment_link_expired":
      return "border-rose-300/25 bg-rose-300/10 text-rose-100";
    default:
      return "border-white/10 bg-white/[0.04] text-white/80";
  }
}

export function AdminQuoteDetailPage({ initialItem, initialActivities }: Props) {
  const [item, setItem] = useState(initialItem);
  const [activities, setActivities] = useState(initialActivities);
  const [saveError, setSaveError] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [paymentDraft, setPaymentDraft] = useState({
    total: formatPaymentDraft(initialItem.paymentTotalAmount),
    deposit: formatPaymentDraft(initialItem.paymentDepositAmount),
  });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<{ tone: "success" | "error"; body: string } | null>(null);

  const paymentStatus = item.paymentStatus ?? "none";
  const remainingAmount = Math.max(0, (item.paymentTotalAmount ?? 0) - (item.paymentPaidAmount ?? 0));

  async function updateStatus(patch: {
    feasibility?: "pending" | "feasible" | "blocked";
    deposit?: "none" | "deposit" | "servers";
  }) {
    setSaveError("");
    setSavingStatus(true);
    const previous = item;
    const next = { ...item, ...patch };
    setItem(next);

    try {
      const response = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: item.id ?? null,
          submittedAt: item.submittedAt,
          feasibility: next.feasibility ?? "pending",
          deposit: next.deposit ?? "none",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? "Impossible de mettre à jour la demande.");
      }

      if (Array.isArray(data?.activities) && data.activities.length > 0) {
        setActivities((prev) => [...data.activities, ...prev]);
      }
    } catch (error) {
      setItem(previous);
      setSaveError(error instanceof Error ? error.message : "Erreur de mise à jour.");
    } finally {
      setSavingStatus(false);
    }
  }

  async function createPaymentLink(mode: "deposit" | "full") {
    setPaymentLoading(true);
    setPaymentMessage(null);

    try {
      const response = await fetch("/api/admin/quotes/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: item.id ?? null,
          submittedAt: item.submittedAt,
          paymentMode: mode,
          paymentTotalAmount: paymentDraft.total,
          paymentDepositAmount: paymentDraft.deposit,
          locale: "fr",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? "Impossible de créer le lien.");
      }

      const totalAmount = parseChfAmountToCents(paymentDraft.total);
      const depositAmount = paymentDraft.deposit ? parseChfAmountToCents(paymentDraft.deposit) : undefined;

      setItem((prev) => ({
        ...prev,
        paymentStatus: data?.paymentStatus ?? (mode === "deposit" ? "pending" : prev.paymentStatus),
        paymentCurrency: "CHF",
        paymentTotalAmount: totalAmount,
        paymentDepositAmount: depositAmount,
        paymentLastSessionUrl: data?.url ?? prev.paymentLastSessionUrl,
        paymentLastSessionMode: mode,
        paymentLastSessionCreatedAt: new Date().toISOString(),
      }));

      if (data?.activity) {
        setActivities((prev) => [data.activity, ...prev]);
      }

      setPaymentMessage({
        tone: "success",
        body: mode === "deposit" ? "Lien Stripe d'acompte généré." : "Lien Stripe total / solde généré.",
      });
    } catch (error) {
      setPaymentMessage({
        tone: "error",
        body: error instanceof Error ? error.message : "Erreur Stripe.",
      });
    } finally {
      setPaymentLoading(false);
    }
  }

  async function copyPaymentLink() {
    const url = item.paymentLastSessionUrl?.trim();
    if (!url || typeof navigator === "undefined" || !navigator.clipboard) {
      setPaymentMessage({ tone: "error", body: "Aucun lien à copier pour cette demande." });
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setPaymentMessage({ tone: "success", body: "Lien Stripe copié dans le presse-papiers." });
    } catch {
      setPaymentMessage({ tone: "error", body: "Impossible de copier le lien." });
    }
  }

  return (
    <section className="section-shell py-10">
      <div className="premium-card rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0d111f] via-[#0b1526] to-[#131014] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/demandes?section=demandes&view=pipeline"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:border-white hover:text-white"
            >
              Retour pipeline
            </Link>
            <Link
              href="/admin/demandes?section=demandes&view=payments"
              className="rounded-full border border-[#7fb8c7]/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#cce9f0] transition hover:border-[#7fb8c7]/60"
            >
              Aller aux paiements
            </Link>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">
            Fiche demande • {new Date(item.submittedAt).toLocaleString("fr-FR")}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Demande</p>
            <h1 className="mt-2 text-4xl font-semibold">{item.name || "Sans nom"}</h1>
            <p className="mt-2 text-white/68">
              {item.projectType} • {item.clientType ?? "Client"} • {item.companyName ?? "Sans société"}
            </p>
            <p className="mt-4 max-w-3xl text-sm text-white/78">{getLeadSummary(item)}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-3 py-1 font-medium ${feasibilityBadges[item.feasibility ?? "pending"]}`}>
              {feasibilityOptions.find((option) => option.value === (item.feasibility ?? "pending"))?.label}
            </span>
            <span className={`rounded-full px-3 py-1 font-medium ${depositBadges[item.deposit ?? "none"]}`}>
              {depositOptions.find((option) => option.value === (item.deposit ?? "none"))?.label}
            </span>
            <span className={`rounded-full px-3 py-1 font-medium ${paymentStatusBadges[paymentStatus]}`}>
              {getQuotePaymentStatusLabel(paymentStatus)}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Contact</p>
                <p className="mt-2 text-sm text-white">{item.email ?? "-"}</p>
                <p className="mt-1 text-sm text-white/70">{item.phone ?? "-"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Cadrage</p>
                <p className="mt-2 text-sm text-white">Budget : {item.budget ?? "-"}</p>
                <p className="mt-1 text-sm text-white/70">Délai : {item.timeline ?? "-"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Qualification</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-white/70">
                  Faisabilité
                  <select
                    value={item.feasibility ?? "pending"}
                    onChange={(event) =>
                      updateStatus({ feasibility: event.target.value as "pending" | "feasible" | "blocked" })
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                  >
                    {feasibilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-white/70">
                  Avance / serveurs
                  <select
                    value={item.deposit ?? "none"}
                    onChange={(event) =>
                      updateStatus({ deposit: event.target.value as "none" | "deposit" | "servers" })
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                  >
                    {depositOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {savingStatus ? <p className="mt-3 text-sm text-white/50">Mise à jour en cours...</p> : null}
              {saveError ? <p className="mt-3 text-sm text-rose-200">{saveError}</p> : null}
            </div>

            {item.message ? (
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Message client</p>
                <p className="mt-3 whitespace-pre-line text-sm text-white/80">{item.message}</p>
              </div>
            ) : null}

            {item.configurator ? (
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Configurateur</p>
                <div className="mt-4 grid gap-3 text-sm text-white/78 md:grid-cols-2">
                  <p>Type : {item.configurator.siteType ?? "-"}</p>
                  <p>Vision : {item.configurator.strategy ?? "-"}</p>
                  <p>Style : {item.configurator.mood ?? "-"}</p>
                  <p>Options : {item.configurator.features?.join(", ") || "-"}</p>
                  <p className="md:col-span-2">Intégrations : {item.configurator.integrations?.join(", ") || "-"}</p>
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Journal d'activité</p>
                  <p className="mt-1 text-sm text-white/65">Historique des changements admin, liens Stripe et paiements.</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/55">
                  {activities.length} entrées
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {activities.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-white/50">
                    Aucun événement enregistré pour cette demande.
                  </div>
                ) : (
                  activities.map((activity) => (
                    <article
                      key={activity.id}
                      className={`rounded-2xl border p-4 ${getActivityTone(activity.action)}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.22em]">
                        <span>{new Date(activity.createdAt).toLocaleString("fr-FR")}</span>
                        <span>{activity.actorEmail ?? "Système"}</span>
                      </div>
                      <p className="mt-3 text-sm font-medium text-white">{activity.summary}</p>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#7fb8c7]/20 bg-[#08101a] p-5 text-sm text-white/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#7fb8c7]">Paiement client</p>
                <p className="mt-1 text-white/70">Lien Stripe admin pour acompte ou paiement total.</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${paymentStatusBadges[paymentStatus]}`}>
                {getQuotePaymentStatusLabel(paymentStatus)}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-white/70">
                Total projet (CHF)
                <input
                  type="text"
                  inputMode="decimal"
                  value={paymentDraft.total}
                  onChange={(event) => setPaymentDraft((prev) => ({ ...prev, total: event.target.value }))}
                  placeholder="2500.00"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                />
              </label>
              <label className="text-sm text-white/70">
                Acompte (CHF)
                <input
                  type="text"
                  inputMode="decimal"
                  value={paymentDraft.deposit}
                  onChange={(event) => setPaymentDraft((prev) => ({ ...prev, deposit: event.target.value }))}
                  placeholder="800.00"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Total</p>
                <p className="mt-2 text-white">{formatChfFromCents(item.paymentTotalAmount)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Encaissé</p>
                <p className="mt-2 text-white">{formatChfFromCents(item.paymentPaidAmount ?? 0)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Reste</p>
                <p className="mt-2 text-white">{formatChfFromCents(remainingAmount)}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => createPaymentLink("deposit")}
                disabled={paymentLoading}
                className="rounded-full bg-[#d6b36a] px-4 py-2 text-xs font-semibold text-[#17120a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Créer lien acompte
              </button>
              <button
                type="button"
                onClick={() => createPaymentLink("full")}
                disabled={paymentLoading}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Créer lien total / solde
              </button>
              <button
                type="button"
                onClick={copyPaymentLink}
                disabled={!item.paymentLastSessionUrl}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Copier dernier lien
              </button>
              {item.paymentLastSessionUrl ? (
                <a
                  href={item.paymentLastSessionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#7fb8c7]/35 px-4 py-2 text-xs font-semibold text-[#cce9f0] transition hover:border-[#7fb8c7]/60"
                >
                  Ouvrir le lien
                </a>
              ) : null}
            </div>

            {item.paymentLastSessionCreatedAt ? (
              <p className="mt-4 text-xs text-white/50">
                Dernier lien généré le {new Date(item.paymentLastSessionCreatedAt).toLocaleString("fr-FR")}
                {item.paymentLastSessionExpiresAt
                  ? ` • expire le ${new Date(item.paymentLastSessionExpiresAt).toLocaleString("fr-FR")}`
                  : ""}
              </p>
            ) : null}

            {paymentMessage ? (
              <p className={`mt-4 text-sm ${paymentMessage.tone === "success" ? "text-emerald-200" : "text-rose-200"}`}>
                {paymentMessage.body}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
