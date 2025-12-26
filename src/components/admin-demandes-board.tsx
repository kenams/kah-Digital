"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { QuoteRecord } from "@/lib/quote";

type AdminDemandesBoardProps = {
  initialItems: QuoteRecord[];
};

const statusStorageKey = "kah-admin-status-map";

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

type ItemStatus = {
  feasibility: (typeof feasibilityOptions)[number]["value"];
  deposit: (typeof depositOptions)[number]["value"];
};

const feasibilityBadges: Record<ItemStatus["feasibility"], string> = {
  pending: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  feasible: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  blocked: "bg-rose-100/15 text-rose-200 border border-rose-200/30",
};

const depositBadges: Record<ItemStatus["deposit"], string> = {
  none: "bg-white/10 text-white/70 border border-white/15",
  deposit: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  servers: "bg-purple-100/20 text-purple-100 border border-purple-200/40",
};

const feasibilityLabels: Record<ItemStatus["feasibility"], string> = {
  pending: "À qualifier",
  feasible: "Faisable",
  blocked: "Non faisable",
};

const depositLabels: Record<ItemStatus["deposit"], string> = {
  none: "Statut paiement",
  deposit: "Acompte validé",
  servers: "Infra en place",
};

export function AdminDemandesBoard({ initialItems }: AdminDemandesBoardProps) {
  const [items, setItems] = useState<QuoteRecord[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, ItemStatus>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [feasibilityFilter, setFeasibilityFilter] = useState<ItemStatus["feasibility"] | "all">("all");
  const [depositFilter, setDepositFilter] = useState<ItemStatus["deposit"] | "all">("all");

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(statusStorageKey);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        setStatusMap(parsed as Record<string, ItemStatus>);
      }
    } catch (error) {
      console.warn("[admin] Failed to read status cache", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(statusStorageKey, JSON.stringify(statusMap));
  }, [statusMap]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/quotes", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!ignore && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const interval = setInterval(load, 60000);
    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  const resolvedStatus = useMemo(() => {
    const record: Record<string, ItemStatus> = { ...statusMap };
    items.forEach((item) => {
      const key = item.submittedAt;
      if (!record[key]) {
        record[key] = { feasibility: "pending", deposit: "none" };
      }
    });
    return record;
  }, [items, statusMap]);

  const insights = useMemo(() => {
    const feasibility = { pending: 0, feasible: 0, blocked: 0 };
    const deposit = { none: 0, deposit: 0, servers: 0 };
    items.forEach((item) => {
      const status = resolvedStatus[item.submittedAt];
      if (!status) return;
      feasibility[status.feasibility] += 1;
      deposit[status.deposit] += 1;
    });

    return {
      total: items.length,
      feasibility,
      deposit,
    };
  }, [items, resolvedStatus]);

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const status = resolvedStatus[item.submittedAt];
      if (feasibilityFilter !== "all" && status?.feasibility !== feasibilityFilter) {
        return false;
      }
      if (depositFilter !== "all" && status?.deposit !== depositFilter) {
        return false;
      }

      if (!query) return true;

      const haystack = [
        item.name,
        item.email,
        item.phone,
        item.companyName,
        item.projectType,
        item.goal,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [items, resolvedStatus, searchTerm, feasibilityFilter, depositFilter]);

  const kpis = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = dayMs * 7;
    const monthMs = dayMs * 30;
    let last24h = 0;
    let last7d = 0;
    let last30d = 0;
    let webCount = 0;
    let mobileCount = 0;
    let configuratorCount = 0;

    filteredItems.forEach((item) => {
      const submittedAtMs = Date.parse(item.submittedAt);
      if (!Number.isNaN(submittedAtMs)) {
        const delta = now - submittedAtMs;
        if (delta <= dayMs) last24h += 1;
        if (delta <= weekMs) last7d += 1;
        if (delta <= monthMs) last30d += 1;
      }

      const focus = item.projectFocus ?? "web";
      if (focus === "mobile") {
        mobileCount += 1;
      } else {
        webCount += 1;
      }

      if (item.configurator) {
        configuratorCount += 1;
      }
    });

    return {
      last24h,
      last7d,
      last30d,
      webCount,
      mobileCount,
      configuratorCount,
      classicCount: Math.max(0, filteredItems.length - configuratorCount),
    };
  }, [filteredItems]);

  const updateStatus = (id: string, patch: Partial<ItemStatus>) => {
    setStatusMap((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const exportCsv = (records: QuoteRecord[], label: string) => {
    if (typeof window === "undefined") return;
    if (records.length === 0) return;

    const escapeValue = (value: string) => `"${value.replace(/"/g, "\"\"")}"`;
    const header = [
      "submittedAt",
      "name",
      "email",
      "phone",
      "clientType",
      "companyName",
      "projectType",
      "budget",
      "timeline",
      "projectFocus",
      "goal",
      "pages",
      "mobilePlatforms",
      "mobileFeatures",
      "storeSupport",
      "techPreferences",
      "inspirations",
      "message",
      "feasibility",
      "deposit",
    ];

    const rows = records.map((item) => {
      const status = resolvedStatus[item.submittedAt];
      const values = [
        item.submittedAt,
        item.name ?? "",
        item.email ?? "",
        item.phone ?? "",
        item.clientType ?? "",
        item.companyName ?? "",
        item.projectType ?? "",
        item.budget ?? "",
        item.timeline ?? "",
        item.projectFocus ?? "",
        item.goal ?? "",
        item.pages?.join(", ") ?? "",
        item.mobilePlatforms?.join(", ") ?? "",
        item.mobileFeatures?.join(", ") ?? "",
        item.storeSupport ?? "",
        item.techPreferences ?? "",
        item.inspirations ?? "",
        item.message ?? "",
        status?.feasibility ?? "pending",
        status?.deposit ?? "none",
      ];

      return values.map((value) => escapeValue(String(value))).join(",");
    });

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kah-digital-demandes-${label}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const focusTotal = kpis.webCount + kpis.mobileCount;
  const focusWebPct = focusTotal ? Math.round((kpis.webCount / focusTotal) * 100) : 0;
  const focusMobilePct = focusTotal ? 100 - focusWebPct : 0;
  const sourceTotal = kpis.configuratorCount + kpis.classicCount;
  const configuratorPct = sourceTotal ? Math.round((kpis.configuratorCount / sourceTotal) * 100) : 0;
  const classicPct = sourceTotal ? 100 - configuratorPct : 0;
  const activityMax = Math.max(kpis.last24h, kpis.last7d, kpis.last30d, 1);
  const activityBars = [
    { label: "24h", value: kpis.last24h },
    { label: "7j", value: kpis.last7d },
    { label: "30j", value: kpis.last30d },
  ];

  const focusBars = [
    { label: "Web", value: kpis.webCount },
    { label: "Mobile", value: kpis.mobileCount },
    { label: "Config", value: kpis.configuratorCount },
    { label: "Devis", value: kpis.classicCount },
  ];
  const focusMax = Math.max(...focusBars.map((bar) => bar.value), 1);

  const dailySeries = useMemo(() => {
    const days = 30;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const buckets = Array.from({ length: days }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (days - 1 - index));
      return {
        date,
        key: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
        count: 0,
      };
    });

    const indexByKey = new Map(buckets.map((bucket, index) => [bucket.key, index]));

    filteredItems.forEach((item) => {
      const submittedAt = new Date(item.submittedAt);
      if (Number.isNaN(submittedAt.getTime())) return;
      submittedAt.setHours(0, 0, 0, 0);
      const key = submittedAt.toISOString().slice(0, 10);
      const bucketIndex = indexByKey.get(key);
      if (bucketIndex === undefined) return;
      buckets[bucketIndex].count += 1;
    });

    return buckets;
  }, [filteredItems]);

  const seriesMax = Math.max(1, ...dailySeries.map((entry) => entry.count));
  const sparklinePoints = dailySeries
    .map((entry, index) => {
      const x = dailySeries.length === 1 ? 0 : (index / (dailySeries.length - 1)) * 100;
      const y = 100 - (entry.count / seriesMax) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  const hasData = filteredItems.length > 0;
  const sparklineStartLabel = dailySeries[0]?.label ?? "";
  const sparklineEndLabel = dailySeries.at(-1)?.label ?? "";

  return (
    <div className="section-shell space-y-10">
      <motion.div
        className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="rounded-[32px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-8 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Admin</p>
          <h1 className="mt-3 text-4xl font-semibold">Demandes reçues</h1>
          <p className="mt-3 text-white/70 max-w-2xl">
            Vue pipeline des demandes issues du configurateur + devis classique. Les badges ci-dessous sont locaux pour qualifier
            rapidement avant de pousser l&apos;info vers Notion, Airtable ou ton CRM.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
            >
              ← Accueil
            </Link>
            <Link
              href="/configurateur"
              className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
            >
              Configurateur
            </Link>
            <Link
              href="/devis"
              className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200"
            >
              Devis classique
            </Link>
          </div>
          <div className="mt-6 grid gap-3 text-sm md:grid-cols-[1.4fr,1fr,1fr]">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Recherche (nom, email, societe)"
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            />
            <select
              value={feasibilityFilter}
              onChange={(event) =>
                setFeasibilityFilter(event.target.value as ItemStatus["feasibility"] | "all")
              }
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="all">Toutes faisabilites</option>
              {feasibilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={depositFilter}
              onChange={(event) => setDepositFilter(event.target.value as ItemStatus["deposit"] | "all")}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="all">Tous paiements</option>
              {depositOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            <button
              type="button"
              onClick={() => exportCsv(filteredItems, "filtre")}
              className="rounded-full border border-white/20 px-4 py-2 text-[0.65rem] font-semibold text-white/70 transition hover:border-white hover:text-white"
            >
              Export CSV (filtre)
            </button>
            <button
              type="button"
              onClick={() => exportCsv(items, "toutes")}
              className="rounded-full border border-white/20 px-4 py-2 text-[0.65rem] font-semibold text-white/70 transition hover:border-white hover:text-white"
            >
              Export CSV (tout)
            </button>
            <span>
              Affiche {filteredItems.length} / {items.length}
            </span>
            <span>Rechargement auto toutes les 60s</span>
          </div>
          {loading && <p className="mt-2 text-sm text-white/50">Mise à jour en cours...</p>}
        </div>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-1">
          <div className="rounded-[28px] bg-black/70 p-6">
            <Image
              src="/mockups/global-dashboard.svg"
              alt="Aperçu dashboard demandes"
              width={640}
              height={400}
              className="h-full w-full rounded-2xl border border-white/10 object-cover"
              priority={false}
            />
            <div className="mt-6 grid gap-4 text-xs text-white/70 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/50">Faisables</p>
                <p className="mt-1 text-2xl font-semibold text-white">{insights.feasibility.feasible}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/50">À qualifier</p>
                <p className="mt-1 text-2xl font-semibold text-white">{insights.feasibility.pending}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Demandes</p>
          <p className="mt-2 text-3xl font-semibold">{insights.total}</p>
          <p className="text-sm text-white/60">total reçues</p>
        </div>
        <div className="rounded-3xl border border-amber-200/30 bg-amber-100/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">À qualifier</p>
          <p className="mt-2 text-3xl font-semibold text-amber-100">{insights.feasibility.pending}</p>
          <p className="text-sm text-white/60">en attente de tri</p>
        </div>
        <div className="rounded-3xl border border-emerald-200/30 bg-emerald-100/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Faisables</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-100">{insights.feasibility.feasible}</p>
          <p className="text-sm text-white/60">validées</p>
        </div>
        <div className="rounded-3xl border border-sky-200/30 bg-sky-100/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Acompte</p>
          <p className="mt-2 text-3xl font-semibold text-sky-100">
            {insights.deposit.deposit + insights.deposit.servers}
          </p>
          <p className="text-sm text-white/60">clients engagés</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Nouveaux</p>
          <p className="mt-2 text-3xl font-semibold">{kpis.last24h}</p>
          <p className="text-sm text-white/60">derniere 24h</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">7 jours</p>
          <p className="mt-2 text-3xl font-semibold">{kpis.last7d}</p>
          <p className="text-sm text-white/60">derniere semaine</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">30 jours</p>
          <p className="mt-2 text-3xl font-semibold">{kpis.last30d}</p>
          <p className="text-sm text-white/60">dernier mois</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Focus</p>
          <p className="mt-2 text-3xl font-semibold">
            {kpis.webCount} web / {kpis.mobileCount} mobile
          </p>
          <p className="text-sm text-white/60">
            {kpis.configuratorCount} configurateur / {kpis.classicCount} devis
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Activite recente</p>
          {hasData ? (
            <>
              <div className="mt-6 flex items-end gap-6 text-xs text-white/60">
                {activityBars.map((bar) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="flex h-24 w-10 items-end overflow-hidden rounded-full bg-white/10"
                      title={`${bar.label}: ${bar.value}`}
                    >
                      <div
                        className="w-full bg-emerald-200/80"
                        style={{
                          height: `${Math.max(6, (bar.value / activityMax) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="uppercase tracking-[0.2em]">{bar.label}</span>
                    <span className="text-sm text-white">{bar.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Sparkline 30 jours</p>
                <div className="mt-3 h-20 w-full rounded-2xl border border-white/10 bg-black/30 p-3">
                  <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
                    <polyline
                      points={sparklinePoints}
                      fill="none"
                      stroke="rgba(148, 163, 255, 0.9)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="mt-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
                  <span>{sparklineStartLabel}</span>
                  <span>{sparklineEndLabel}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-sm text-white/60">
              Aucune donnee pour les graphiques.
            </div>
          )}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Focus & source</p>
          {hasData ? (
            <div className="mt-6 grid gap-4">
              {focusBars.map((bar) => (
                <div key={bar.label} className="space-y-2">
                  <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
                    <span>{bar.label}</span>
                    <span className="text-white">{bar.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10" title={`${bar.label}: ${bar.value}`}>
                    <div
                      className="h-full rounded-full bg-sky-200/80"
                      style={{ width: `${(bar.value / focusMax) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-sm text-white/60">
              Aucune donnee pour les graphiques.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Repartition</p>
        {hasData ? (
          <div className="mt-4 space-y-4 text-sm text-white/70">
            <div>
              <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
                <span>Focus</span>
                <span>{kpis.webCount} web / {kpis.mobileCount} mobile</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="flex h-full">
                  <span
                    className="h-full bg-emerald-300/80"
                    style={{ width: `${focusWebPct}%` }}
                  />
                  <span
                    className="h-full bg-sky-200/80"
                    style={{ width: `${focusMobilePct}%` }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
                <span>Source</span>
                <span>{kpis.configuratorCount} configurateur / {kpis.classicCount} devis</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="flex h-full">
                  <span
                    className="h-full bg-purple-200/80"
                    style={{ width: `${configuratorPct}%` }}
                  />
                  <span
                    className="h-full bg-amber-200/80"
                    style={{ width: `${classicPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-sm text-white/60">
            Aucune donnee pour les graphiques.
          </div>
        )}
      </div>

      {!loading && items.length === 0 && (
        <div className="rounded-3xl border border-dashed border-white/20 bg-black/20 p-8 text-white/70">
          Aucune demande pour le moment.
        </div>
      )}

      {!loading && items.length > 0 && filteredItems.length === 0 && (
        <div className="rounded-3xl border border-dashed border-white/20 bg-black/20 p-8 text-white/70">
          Aucun resultat avec ces filtres.
        </div>
      )}

      <div className="space-y-6">
        {filteredItems.map((item, index) => {
          const status = resolvedStatus[item.submittedAt];
          const feasibilityClass = feasibilityBadges[status?.feasibility ?? "pending"];
          const depositClass = depositBadges[status?.deposit ?? "none"];
          return (
            <motion.article
              key={item.submittedAt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 to-white/0 p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {new Date(item.submittedAt).toLocaleString("fr-FR")}
                  </p>
                  <h2 className="text-2xl font-semibold">{item.name || "Sans nom"}</h2>
                  <p className="text-sm text-white/70">
                    {item.projectType} · {item.clientType ?? "Client"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`rounded-full px-3 py-1 font-medium ${feasibilityClass}`}>
                    {feasibilityLabels[status?.feasibility ?? "pending"]}
                  </span>
                  <span className={`rounded-full px-3 py-1 font-medium ${depositClass}`}>
                    {depositLabels[status?.deposit ?? "none"]}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr,0.7fr]">
                <div className="grid gap-3 text-sm text-white/80 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Budget</p>
                    <p className="mt-1 text-white">{item.budget}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Délai</p>
                    <p className="mt-1 text-white">{item.timeline}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Entreprise</p>
                    <p className="mt-1 text-white">{item.companyName ?? "N/A"}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Contact</p>
                  <p className="mt-1">{item.email}</p>
                  {item.phone && <p>{item.phone}</p>}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-white/70">
                  Faisabilité
                  <select
                    value={status?.feasibility}
                    onChange={(event) =>
                      updateStatus(item.submittedAt, { feasibility: event.target.value as ItemStatus["feasibility"] })
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
                    value={status?.deposit}
                    onChange={(event) =>
                      updateStatus(item.submittedAt, { deposit: event.target.value as ItemStatus["deposit"] })
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

              {item.configurator && (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Configurateur</p>
                    <p>Type : {item.configurator.siteType ?? "-"}</p>
                    <p>Vision : {item.configurator.strategy ?? "-"}</p>
                    <p>Style : {item.configurator.mood ?? "-"}</p>
                    <p>Options : {item.configurator.features?.join(", ") || "-"}</p>
                    <p>Intégrations : {item.configurator.integrations?.join(", ") || "-"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0f2c] to-[#1f1244] p-4 text-sm text-white/80">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Focus</p>
                    <p>Projet : {item.projectFocus === "mobile" ? "MVP Mobile" : "Web / site"}</p>
                    {item.projectFocus === "mobile" && (
                      <>
                        <p>Plateformes : {item.mobilePlatforms?.length ? item.mobilePlatforms.join(", ") : "-"}</p>
                        <p>Fonctionnalités : {item.mobileFeatures?.length ? item.mobileFeatures.join(", ") : "-"}</p>
                        <p>Stores : {item.storeSupport ?? "-"}</p>
                      </>
                    )}
                    {item.projectFocus !== "mobile" && <p>Intention : {item.goal ?? "Brief classique"}</p>}
                  </div>
                </div>
              )}

              {item.message && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Message</p>
                  <p className="mt-2 whitespace-pre-line">{item.message}</p>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
