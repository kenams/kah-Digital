"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { QuoteRecord } from "@/lib/quote";
import { formatChfFromCents, getQuotePaymentStatusLabel, parseChfAmountToCents } from "@/lib/quote-payments";

type Props = {
  initialItems: QuoteRecord[];
};

type PaymentMessage = {
  tone: "success" | "error";
  body: string;
};

type PaymentStatusFilter = "all" | "none" | "pending" | "partial" | "paid" | "expired";

const paymentStatusBadges = {
  none: "bg-white/10 text-white/70 border border-white/15",
  pending: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  partial: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  paid: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  expired: "bg-rose-100/15 text-rose-200 border border-rose-200/30",
} as const;

function formatPaymentDraft(value?: number) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return "";
  }

  return (value / 100).toFixed(2);
}

function getItemKey(item: QuoteRecord) {
  return item.id ?? item.submittedAt;
}

function matchesSearch(item: QuoteRecord, term: string) {
  if (!term) return true;
  const haystack = [item.name, item.email, item.companyName, item.projectType, item.goal, item.message]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(term);
}

export function AdminPaymentsTable({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>("all");
  const [paymentDrafts, setPaymentDrafts] = useState<Record<string, { total: string; deposit: string }>>({});
  const [paymentMessages, setPaymentMessages] = useState<Record<string, PaymentMessage | undefined>>({});
  const [paymentLoadingKey, setPaymentLoadingKey] = useState<string | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      const paymentStatus = item.paymentStatus ?? "none";
      if (statusFilter !== "all" && paymentStatus !== statusFilter) {
        return false;
      }

      return matchesSearch(item, term);
    });
  }, [items, searchTerm, statusFilter]);

  const overview = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.total += 1;
        if ((item.paymentTotalAmount ?? 0) > 0) acc.configured += 1;
        if (item.paymentStatus === "pending") acc.links += 1;
        acc.collected += Math.max(0, item.paymentPaidAmount ?? 0);
        acc.remaining += Math.max(0, (item.paymentTotalAmount ?? 0) - (item.paymentPaidAmount ?? 0));
        return acc;
      },
      { total: 0, configured: 0, links: 0, collected: 0, remaining: 0 }
    );
  }, [items]);

  function getDraft(item: QuoteRecord) {
    const itemKey = getItemKey(item);
    return (
      paymentDrafts[itemKey] ?? {
        total: formatPaymentDraft(item.paymentTotalAmount),
        deposit: formatPaymentDraft(item.paymentDepositAmount),
      }
    );
  }

  async function createPaymentLink(item: QuoteRecord, mode: "deposit" | "full") {
    const itemKey = getItemKey(item);
    const draft = getDraft(item);

    setPaymentLoadingKey(itemKey);
    setPaymentMessages((prev) => ({ ...prev, [itemKey]: undefined }));

    try {
      const response = await fetch("/api/admin/quotes/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: item.id ?? null,
          submittedAt: item.submittedAt,
          paymentMode: mode,
          paymentTotalAmount: draft.total,
          paymentDepositAmount: draft.deposit,
          locale: "fr",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? "Impossible de créer le lien.");
      }

      const totalAmount = parseChfAmountToCents(draft.total);
      const depositAmount = draft.deposit ? parseChfAmountToCents(draft.deposit) : undefined;
      const nowIso = new Date().toISOString();

      setItems((prev) =>
        prev.map((entry) =>
          getItemKey(entry) === itemKey
            ? {
                ...entry,
                paymentStatus: data?.paymentStatus ?? (mode === "deposit" ? "pending" : entry.paymentStatus),
                paymentCurrency: "CHF",
                paymentTotalAmount: totalAmount,
                paymentDepositAmount: depositAmount,
                paymentLastSessionUrl: data?.url ?? entry.paymentLastSessionUrl,
                paymentLastSessionMode: mode,
                paymentLastSessionCreatedAt: nowIso,
                paymentLastSessionExpiresAt: data?.expiresAt ?? entry.paymentLastSessionExpiresAt,
              }
            : entry
        )
      );

      setPaymentMessages((prev) => ({
        ...prev,
        [itemKey]: {
          tone: "success",
          body: mode === "deposit" ? "Lien d’acompte généré." : "Lien total / solde généré.",
        },
      }));
    } catch (error) {
      setPaymentMessages((prev) => ({
        ...prev,
        [itemKey]: {
          tone: "error",
          body: error instanceof Error ? error.message : "Erreur Stripe.",
        },
      }));
    } finally {
      setPaymentLoadingKey(null);
    }
  }

  async function copyPaymentLink(item: QuoteRecord) {
    const itemKey = getItemKey(item);
    const url = item.paymentLastSessionUrl?.trim();

    if (!url || typeof navigator === "undefined" || !navigator.clipboard) {
      setPaymentMessages((prev) => ({
        ...prev,
        [itemKey]: { tone: "error", body: "Aucun lien à copier." },
      }));
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setPaymentMessages((prev) => ({
        ...prev,
        [itemKey]: { tone: "success", body: "Lien copié." },
      }));
    } catch {
      setPaymentMessages((prev) => ({
        ...prev,
        [itemKey]: { tone: "error", body: "Impossible de copier le lien." },
      }));
    }
  }

  return (
    <section className="section-shell pt-10">
      <div className="premium-card rounded-[32px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Paiements clients</p>
            <h2 className="mt-3 text-3xl font-semibold">Vue compacte pour liens, statuts et encaissement</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/70">
              Ici on garde seulement le flux utile : configurer les montants, générer les liens Stripe et suivre
              l’encaissement.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Dossiers" value={String(overview.total)} />
            <StatCard label="Configurés" value={String(overview.configured)} />
            <StatCard label="Liens actifs" value={String(overview.links)} />
            <StatCard label="Encaissé" value={formatChfFromCents(overview.collected)} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.2fr,0.8fr,auto]">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Recherche client, société, projet..."
            className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as PaymentStatusFilter)}
            className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
          >
            <option value="all">Tous statuts</option>
            <option value="none">Non configuré</option>
            <option value="pending">Lien actif</option>
            <option value="partial">Acompte reçu</option>
            <option value="paid">Réglé</option>
            <option value="expired">Lien expiré</option>
          </select>
          <Link
            href="/admin/demandes?section=demandes&view=pipeline"
            className="rounded-full border border-white/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:border-white hover:text-white"
          >
            Retour pipeline
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/55">
          <span>Reste à encaisser : {formatChfFromCents(overview.remaining)}</span>
          <span>Résultats : {filteredItems.length}</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-sm text-white/65">
            Aucun dossier paiement pour ce filtre.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-[28px] border border-white/10 bg-black/20">
            <table className="min-w-[1260px] w-full text-left text-sm text-white/80">
              <thead className="bg-white/[0.04] text-[0.68rem] uppercase tracking-[0.28em] text-white/45">
                <tr>
                  <th className="px-4 py-4">Client</th>
                  <th className="px-4 py-4">Projet</th>
                  <th className="px-4 py-4">Statut</th>
                  <th className="px-4 py-4">Total</th>
                  <th className="px-4 py-4">Encaissé</th>
                  <th className="px-4 py-4">Reste</th>
                  <th className="px-4 py-4">Montants</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const itemKey = getItemKey(item);
                  const paymentStatus = item.paymentStatus ?? "none";
                  const draft = getDraft(item);
                  const remaining = Math.max(0, (item.paymentTotalAmount ?? 0) - (item.paymentPaidAmount ?? 0));

                  return (
                    <tr key={itemKey} className="border-t border-white/8 align-top">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-white">{item.name || "Sans nom"}</p>
                        <p className="mt-1 text-white/60">{item.email || "-"}</p>
                        <p className="mt-1 text-white/45">{item.companyName || "Sans société"}</p>
                        <Link
                          href={item.id ? `/admin/demandes/${item.id}` : "/admin/demandes?section=demandes&view=pipeline"}
                          className="mt-3 inline-flex rounded-full border border-white/15 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-white/70 transition hover:border-white hover:text-white"
                        >
                          Ouvrir fiche
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-white">{item.projectType}</p>
                        <p className="mt-1 max-w-[220px] text-white/60">{item.goal || item.message || "-"}</p>
                        <p className="mt-3 text-xs text-white/40">
                          {new Date(item.submittedAt).toLocaleString("fr-FR")}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${paymentStatusBadges[paymentStatus]}`}>
                          {getQuotePaymentStatusLabel(paymentStatus)}
                        </span>
                        {item.paymentLastSessionExpiresAt ? (
                          <p className="mt-3 max-w-[180px] text-xs text-white/45">
                            Expire le {new Date(item.paymentLastSessionExpiresAt).toLocaleString("fr-FR")}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 text-white">{formatChfFromCents(item.paymentTotalAmount)}</td>
                      <td className="px-4 py-4 text-white">{formatChfFromCents(item.paymentPaidAmount ?? 0)}</td>
                      <td className="px-4 py-4 text-white">{formatChfFromCents(remaining)}</td>
                      <td className="px-4 py-4">
                        <div className="grid gap-2 min-w-[220px]">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={draft.total}
                            onChange={(event) =>
                              setPaymentDrafts((prev) => ({
                                ...prev,
                                [itemKey]: { ...draft, total: event.target.value },
                              }))
                            }
                            placeholder="Total CHF"
                            className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
                          />
                          <input
                            type="text"
                            inputMode="decimal"
                            value={draft.deposit}
                            onChange={(event) =>
                              setPaymentDrafts((prev) => ({
                                ...prev,
                                [itemKey]: { ...draft, deposit: event.target.value },
                              }))
                            }
                            placeholder="Acompte CHF"
                            className="rounded-2xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex min-w-[260px] flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => createPaymentLink(item, "deposit")}
                            disabled={paymentLoadingKey === itemKey}
                            className="rounded-full bg-[#d6b36a] px-3 py-2 text-xs font-semibold text-[#17120a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Acompte
                          </button>
                          <button
                            type="button"
                            onClick={() => createPaymentLink(item, "full")}
                            disabled={paymentLoadingKey === itemKey}
                            className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Total / solde
                          </button>
                          <button
                            type="button"
                            onClick={() => copyPaymentLink(item)}
                            disabled={!item.paymentLastSessionUrl}
                            className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Copier
                          </button>
                          {item.paymentLastSessionUrl ? (
                            <a
                              href={item.paymentLastSessionUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-[#7fb8c7]/35 px-3 py-2 text-xs font-semibold text-[#cce9f0] transition hover:border-[#7fb8c7]/60"
                            >
                              Ouvrir
                            </a>
                          ) : null}
                        </div>
                        {paymentMessages[itemKey] ? (
                          <p
                            className={`mt-3 text-xs ${
                              paymentMessages[itemKey]?.tone === "success" ? "text-emerald-200" : "text-rose-200"
                            }`}
                          >
                            {paymentMessages[itemKey]?.body}
                          </p>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
