"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { QuotePipelineStatus, QuoteRecord } from "@/lib/quote";

type Props = {
  initialItems: QuoteRecord[];
};

const pipelineOptions = [
  { value: "new", label: "Nouveau" },
  { value: "qualified", label: "Qualifié" },
  { value: "quote", label: "Devis envoyé" },
  { value: "negotiation", label: "Négociation" },
  { value: "won", label: "Gagné" },
  { value: "lost", label: "Perdu" },
] as const satisfies ReadonlyArray<{ value: QuotePipelineStatus; label: string }>;

const pipelineBadges: Record<QuotePipelineStatus, string> = {
  new: "bg-white/10 text-white/70 border border-white/15",
  qualified: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  quote: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  negotiation: "bg-purple-100/20 text-purple-100 border border-purple-200/40",
  won: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  lost: "bg-rose-100/15 text-rose-200 border border-rose-200/30",
};

function getItemKey(item: QuoteRecord) {
  if (item.id) return item.id;
  const email = item.email?.trim() || item.name?.trim() || "unknown";
  return `${item.submittedAt}-${email}`;
}

function getLeadSummary(item: QuoteRecord) {
  const parts = [item.goal, item.message, item.configurator?.strategy, item.configurator?.siteType]
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean);

  if (parts.length === 0) {
    return "Aucun résumé client saisi.";
  }

  const summary = parts[0];
  return summary.length > 120 ? `${summary.slice(0, 117)}...` : summary;
}

function matchesSearch(item: QuoteRecord, term: string) {
  if (!term) return true;
  const haystack = [item.name, item.email, item.companyName, item.projectType, item.goal, item.message]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(term);
}

export function AdminPipelineKanban({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | "configurator" | "classic">("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, { tone: "success" | "error"; body: string } | undefined>>(
    {}
  );

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = items.filter((item) => {
      if (sourceFilter === "configurator" && !item.configurator) return false;
      if (sourceFilter === "classic" && item.configurator) return false;
      return matchesSearch(item, term);
    });

    filtered.sort((a, b) => {
      const aTime = Date.parse(a.submittedAt) || 0;
      const bTime = Date.parse(b.submittedAt) || 0;
      return sortOrder === "recent" ? bTime - aTime : aTime - bTime;
    });

    return filtered;
  }, [items, searchTerm, sourceFilter, sortOrder]);

  const columns = useMemo(() => {
    return pipelineOptions.map((column) => ({
      ...column,
      items: filteredItems.filter((item) => (item.pipeline ?? "new") === column.value),
    }));
  }, [filteredItems]);

  const totals = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        acc.total += column.items.length;
        if (column.value === "won") acc.won += column.items.length;
        if (column.value === "quote") acc.quote += column.items.length;
        if (column.value === "negotiation") acc.negotiation += column.items.length;
        return acc;
      },
      { total: 0, won: 0, quote: 0, negotiation: 0 }
    );
  }, [columns]);

  async function updatePipeline(item: QuoteRecord, nextPipeline: QuotePipelineStatus) {
    const key = getItemKey(item);
    const currentPipeline = item.pipeline ?? "new";
    if (currentPipeline === nextPipeline) return;

    setLoadingKey(key);
    setMessages((prev) => ({ ...prev, [key]: undefined }));
    setItems((prev) =>
      prev.map((entry) => (getItemKey(entry) === key ? { ...entry, pipeline: nextPipeline } : entry))
    );

    try {
      const response = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: item.id ?? null,
          submittedAt: item.submittedAt,
          feasibility: item.feasibility ?? "pending",
          deposit: item.deposit ?? "none",
          pipeline: nextPipeline,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? "Impossible de mettre à jour le pipeline.");
      }

      setMessages((prev) => ({
        ...prev,
        [key]: {
          tone: "success",
          body: `Stage passé à ${pipelineOptions.find((entry) => entry.value === nextPipeline)?.label}.`,
        },
      }));
    } catch (error) {
      setItems((prev) =>
        prev.map((entry) => (getItemKey(entry) === key ? { ...entry, pipeline: currentPipeline } : entry))
      );
      setMessages((prev) => ({
        ...prev,
        [key]: {
          tone: "error",
          body: error instanceof Error ? error.message : "Erreur de mise à jour pipeline.",
        },
      }));
    } finally {
      setLoadingKey(null);
    }
  }

  function movePipeline(item: QuoteRecord, direction: -1 | 1) {
    const current = item.pipeline ?? "new";
    const index = pipelineOptions.findIndex((entry) => entry.value === current);
    const next = pipelineOptions[index + direction];
    if (!next) return;
    void updatePipeline(item, next.value);
  }

  return (
    <section className="section-shell pt-10">
      <div className="premium-card rounded-[32px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">CRM pipeline</p>
            <h2 className="mt-3 text-3xl font-semibold">Vue kanban pour suivre le cycle commercial</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/70">
              Ici on pilote le pipeline commercial de façon persistante : chaque stage est maintenant sauvegardé en
              base.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Visibles" value={String(totals.total)} />
            <StatCard label="Devis" value={String(totals.quote)} />
            <StatCard label="Négociation" value={String(totals.negotiation)} />
            <StatCard label="Gagnés" value={String(totals.won)} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.2fr,0.8fr,0.8fr,auto]">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Recherche client, société, projet..."
            className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
          />
          <select
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value as "all" | "configurator" | "classic")}
            className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
          >
            <option value="all">Toutes sources</option>
            <option value="configurator">Configurateur</option>
            <option value="classic">Devis</option>
          </select>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as "recent" | "oldest")}
            className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
          >
            <option value="recent">Tri : récents</option>
            <option value="oldest">Tri : anciens</option>
          </select>
          <Link
            href="/admin/demandes?section=demandes&view=pipeline"
            className="rounded-full border border-white/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:border-white hover:text-white"
          >
            Voir liste
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto pb-2">
          <div className="flex min-w-[1480px] gap-4">
            {columns.map((column) => (
              <div
                key={column.value}
                className="w-[240px] shrink-0 rounded-[28px] border border-white/10 bg-black/20 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">Stage</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{column.label}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${pipelineBadges[column.value]}`}>
                    {column.items.length}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {column.items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-white/45">
                      Aucun lead.
                    </div>
                  ) : (
                    column.items.map((item) => {
                      const key = getItemKey(item);
                      const pipeline = item.pipeline ?? "new";
                      const source = item.configurator ? "Configurateur" : "Devis";

                      return (
                        <article key={key} className="rounded-2xl border border-white/10 bg-black/35 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-white">{item.name || "Sans nom"}</p>
                              <p className="mt-1 text-xs text-white/55">{item.companyName || item.email || "-"}</p>
                            </div>
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/55">
                              {source}
                            </span>
                          </div>

                          <p className="mt-3 text-sm text-white/78">{item.projectType}</p>
                          <p className="mt-2 text-sm text-white/55">{getLeadSummary(item)}</p>

                          <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/45">
                            <span>{item.budget || "À définir"}</span>
                            <span>•</span>
                            <span>{item.timeline || "À définir"}</span>
                          </div>

                          <div className="mt-4 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => movePipeline(item, -1)}
                              disabled={loadingKey === key || pipeline === "new"}
                              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/65 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Reculer dans le pipeline"
                            >
                              ←
                            </button>
                            <select
                              value={pipeline}
                              onChange={(event) => void updatePipeline(item, event.target.value as QuotePipelineStatus)}
                              disabled={loadingKey === key}
                              className="min-w-0 flex-1 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-xs text-white focus:border-white/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {pipelineOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => movePipeline(item, 1)}
                              disabled={loadingKey === key || pipeline === "lost" || pipeline === "won"}
                              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/65 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label="Avancer dans le pipeline"
                            >
                              →
                            </button>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.id ? (
                              <Link
                                href={`/admin/demandes/${item.id}`}
                                className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/75 transition hover:border-white hover:text-white"
                              >
                                Ouvrir fiche
                              </Link>
                            ) : null}
                            <Link
                              href="/admin/demandes?section=demandes&view=payments"
                              className="rounded-full border border-[#7fb8c7]/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#cce9f0] transition hover:border-[#7fb8c7]/60"
                            >
                              Paiement
                            </Link>
                          </div>

                          {messages[key] ? (
                            <p className={`mt-3 text-xs ${messages[key]?.tone === "success" ? "text-emerald-200" : "text-rose-200"}`}>
                              {messages[key]?.body}
                            </p>
                          ) : null}
                        </article>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
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
