"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AssistantRecord } from "@/lib/assistant/schema";

type Props = {
  initialItems: AssistantRecord[];
};

type StatusFilter = "all" | "new" | "processed";
type IntentFilter = "all" | "project_quote" | "support_glpi" | "general";

const scoreClasses: Record<AssistantRecord["score"], string> = {
  hot: "border border-emerald-200/30 bg-emerald-100/15 text-emerald-200",
  medium: "border border-amber-200/30 bg-amber-100/15 text-amber-200",
  low: "border border-white/15 bg-white/10 text-white/70",
  support_urgent: "border border-rose-200/30 bg-rose-100/15 text-rose-200",
  out_of_scope: "border border-slate-200/20 bg-slate-100/10 text-slate-200",
};

const actionLabels: Record<AssistantRecord["action"], string> = {
  summary_email: "Résumé envoyé",
  human_followup: "Reprise humaine",
  glpi_ticket: "Ticket GLPI",
};

const intentLabels: Record<AssistantRecord["intent"], string> = {
  project_quote: "Projet",
  support_glpi: "Support",
  faq: "FAQ",
  general_info: "Info",
  unknown: "Inconnu",
};

const projectTypeLabels: Record<AssistantRecord["projectType"], string> = {
  landing_portfolio: "Landing / portfolio",
  showcase_website: "Site vitrine",
  corporate_website: "Site corporate",
  ecommerce: "E-commerce",
  web_app: "Application web / SaaS",
  mobile_app: "Application mobile",
  dashboard_portal: "Dashboard / portail",
  glpi_assistant: "Workflow GLPI",
  automation_ai: "Automatisation IA",
  unknown: "Projet à préciser",
};

const statusLabels: Record<AssistantRecord["status"], string> = {
  new: "Nouveau",
  processed: "Traité",
};

const priorityBucketLabels: Record<"urgent" | "hot" | "normal", string> = {
  urgent: "Urgent",
  hot: "Chaud",
  normal: "À cadrer",
};

function getItemKey(item: AssistantRecord) {
  return item.id ?? item.submittedAt;
}

function formatBudget(item: AssistantRecord) {
  if (item.summary.budget_range.max <= 0) {
    return "À définir";
  }

  return `${new Intl.NumberFormat("fr-CH").format(item.summary.budget_range.min)} - ${new Intl.NumberFormat("fr-CH").format(item.summary.budget_range.max)} CHF`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function matchesSearch(item: AssistantRecord, term: string) {
  if (!term) return true;
  const haystack = [
    item.name,
    item.email,
    item.company,
    item.scoreReason,
    item.summary.next_step,
    item.summary.roles.join(" "),
    item.projectType,
    item.intent,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(term);
}

function getPriorityBucket(item: AssistantRecord) {
  if (item.score === "support_urgent") return "urgent";
  if (item.score === "hot") return "hot";
  return "normal";
}

function getPriorityTone(bucket: "urgent" | "hot" | "normal") {
  if (bucket === "urgent") {
    return "border-rose-300/30 bg-rose-200/10 text-rose-100";
  }
  if (bucket === "hot") {
    return "border-emerald-300/30 bg-emerald-200/10 text-emerald-100";
  }
  return "border-white/15 bg-white/[0.06] text-white/80";
}

export function AdminAssistantBoard({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [intentFilter, setIntentFilter] = useState<IntentFilter>("all");
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, { tone: "success" | "error"; body: string } | undefined>>(
    {}
  );

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const response = await fetch("/api/admin/assistant", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!ignore && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch (error) {
        console.error("[admin/assistant] refresh failed", error);
      }
    }

    const interval = window.setInterval(load, 60000);
    return () => {
      ignore = true;
      window.clearInterval(interval);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }

      if (intentFilter !== "all") {
        if (intentFilter === "general" && !["faq", "general_info", "unknown"].includes(item.intent)) {
          return false;
        }
        if (intentFilter !== "general" && item.intent !== intentFilter) {
          return false;
        }
      }

      return matchesSearch(item, term);
    });
  }, [intentFilter, items, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.total += 1;
        if (item.status === "new") acc.newItems += 1;
        if (item.status === "processed") acc.processed += 1;
        if (item.score === "hot") acc.hot += 1;
        if (item.score === "support_urgent") acc.urgent += 1;
        if (item.action === "human_followup") acc.human += 1;
        return acc;
      },
      { total: 0, newItems: 0, processed: 0, hot: 0, urgent: 0, human: 0 }
    );
  }, [items]);

  const priorityItems = useMemo(
    () =>
      filteredItems
        .filter((item) => item.status === "new")
        .sort((a, b) => {
          const bucketOrder = { urgent: 0, hot: 1, normal: 2 };
          const bucketDiff = bucketOrder[getPriorityBucket(a)] - bucketOrder[getPriorityBucket(b)];
          if (bucketDiff !== 0) return bucketDiff;
          return +new Date(b.submittedAt) - +new Date(a.submittedAt);
        })
        .slice(0, 4),
    [filteredItems]
  );

  const newItems = useMemo(
    () =>
      filteredItems
        .filter((item) => item.status === "new")
        .sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)),
    [filteredItems]
  );

  const processedItems = useMemo(
    () =>
      filteredItems
        .filter((item) => item.status === "processed")
        .sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)),
    [filteredItems]
  );

  async function updateStatus(item: AssistantRecord, nextStatus: AssistantRecord["status"]) {
    const itemKey = getItemKey(item);
    const previous = items;
    setLoadingKey(itemKey);
    setMessages((prev) => ({ ...prev, [itemKey]: undefined }));
    setItems((prev) =>
      prev.map((entry) => (getItemKey(entry) === itemKey ? { ...entry, status: nextStatus } : entry))
    );

    try {
      const response = await fetch("/api/admin/assistant", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: item.id ?? null,
          submittedAt: item.submittedAt,
          status: nextStatus,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? "Impossible de mettre à jour le statut assistant.");
      }

      setMessages((prev) => ({
        ...prev,
        [itemKey]: {
          tone: "success",
          body: nextStatus === "processed" ? "Lead marqué comme traité." : "Lead remis en nouveau.",
        },
      }));
    } catch (error) {
      setItems(previous);
      setMessages((prev) => ({
        ...prev,
        [itemKey]: {
          tone: "error",
          body: error instanceof Error ? error.message : "Erreur de mise à jour.",
        },
      }));
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <section className="section-shell pt-10">
      <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0d111f] via-[#0b1526] to-[#131014] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.34em] text-white/50">CRM assistant</p>
            <h2 className="mt-3 text-3xl font-semibold">Leads captés via le chatbot</h2>
            <p className="mt-3 text-sm text-white/68">
              Vue orientée CRM : priorités en haut, file active par type de lead au centre, puis historique traité en bas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <StatCard label="À traiter" value={String(stats.newItems)} />
            <StatCard label="Traités" value={String(stats.processed)} />
            <StatCard label="Chauds" value={String(stats.hot)} />
            <StatCard label="Urgents" value={String(stats.urgent)} />
            <StatCard label="Reprises" value={String(stats.human)} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.2fr,0.8fr,auto]">
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Recherche nom, email, société, raison, projet..."
            className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
          />
          <div className="flex rounded-2xl border border-white/10 bg-black/35 p-1">
            {(["all", "new", "processed"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setStatusFilter(value)}
                className={`flex-1 rounded-xl px-4 py-2 text-sm transition ${
                  statusFilter === value ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {value === "all" ? "Tous" : value === "new" ? "Nouveaux" : "Traités"}
              </button>
            ))}
          </div>
          <Link
            href="/admin/demandes?section=demandes&view=kanban"
            className="rounded-full border border-white/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:border-white hover:text-white"
          >
            Ouvrir CRM devis
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {([
            { value: "all", label: "Tous les leads" },
            { value: "project_quote", label: "Projets" },
            { value: "support_glpi", label: "Support" },
            { value: "general", label: "FAQ / infos" },
          ] as const).map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setIntentFilter(filter.value)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${
                intentFilter === filter.value
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/[0.04] text-white/72 hover:border-white/35 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#f3d089]">À traiter maintenant</p>
              <h3 className="mt-1 text-xl font-semibold text-white">Priorités du moment</h3>
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">{priorityItems.length} en focus</p>
          </div>

          {priorityItems.length === 0 ? (
            <EmptyState label="Aucune priorité pour ce filtre." />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {priorityItems.map((item) => (
                <PriorityCard
                  key={getItemKey(item)}
                  item={item}
                  loading={loadingKey === getItemKey(item)}
                  message={messages[getItemKey(item)]}
                  onToggleStatus={updateStatus}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <SectionHeader
            eyebrow="Nouveaux leads"
            title="File active"
            meta={`${newItems.length} lead${newItems.length > 1 ? "s" : ""}`}
          />
          {newItems.length === 0 ? (
            <EmptyState label="Aucun nouveau lead pour ce filtre." />
          ) : (
            <div className="space-y-4">
              {newItems.map((item) => (
                <LeadRow
                  key={getItemKey(item)}
                  item={item}
                  loading={loadingKey === getItemKey(item)}
                  message={messages[getItemKey(item)]}
                  onToggleStatus={updateStatus}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <SectionHeader
            eyebrow="Historique"
            title="Traités récemment"
            meta={`${processedItems.length} lead${processedItems.length > 1 ? "s" : ""}`}
          />
          {processedItems.length === 0 ? (
            <EmptyState label="Aucun lead traité pour ce filtre." />
          ) : (
            <div className="space-y-4">
              {processedItems.map((item) => (
                <LeadRow
                  key={getItemKey(item)}
                  item={item}
                  loading={loadingKey === getItemKey(item)}
                  message={messages[getItemKey(item)]}
                  onToggleStatus={updateStatus}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, meta }: { eyebrow: string; title: string; meta: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/42">{eyebrow}</p>
        <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{meta}</p>
    </div>
  );
}

function PriorityCard(props: {
  item: AssistantRecord;
  loading: boolean;
  message?: { tone: "success" | "error"; body: string };
  onToggleStatus: (item: AssistantRecord, nextStatus: AssistantRecord["status"]) => void;
}) {
  const { item, loading, message, onToggleStatus } = props;
  const nextStatus = item.status === "new" ? "processed" : "new";
  const priorityBucket = getPriorityBucket(item);

  return (
    <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${getPriorityTone(priorityBucket)}`}>
              {priorityBucketLabels[priorityBucket]}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${scoreClasses[item.score]}`}>{item.scoreLabel}</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {actionLabels[item.action]}
            </span>
          </div>
          <h4 className="mt-4 text-xl font-semibold text-white">{item.name || item.email || "Demande anonyme"}</h4>
          <p className="mt-1 text-sm text-white/60">
            {[item.company, item.email].filter(Boolean).join(" • ") || "Sans coordonnées complètes"}
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.24em] text-white/45">{formatDate(item.submittedAt)}</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <MiniInfo label="Projet" value={projectTypeLabels[item.projectType]} />
        <MiniInfo label="Budget" value={formatBudget(item)} />
        <MiniInfo label="Clarté" value={`${item.summary.clarity_score}/100`} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs uppercase tracking-[0.26em] text-white/45">Prochaine action</p>
        <p className="mt-2 text-sm text-white/82">{item.summary.next_step}</p>
        <p className="mt-3 text-sm text-white/55">{item.scoreReason}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.id ? (
          <Link
            href={`/admin/assistant/${item.id}`}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78 transition hover:border-white hover:text-white"
          >
            Ouvrir fiche
          </Link>
        ) : null}
        <button
          type="button"
          onClick={() => onToggleStatus(item, nextStatus)}
          disabled={loading}
          className="rounded-full border border-[#7fb8c7]/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#cce9f0] transition hover:border-[#7fb8c7]/60 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {item.status === "new" ? "Marquer traité" : "Remettre en nouveau"}
        </button>
      </div>

      {message ? (
        <p className={`mt-3 text-xs ${message.tone === "success" ? "text-emerald-200" : "text-rose-200"}`}>{message.body}</p>
      ) : null}
    </div>
  );
}

function LeadRow(props: {
  item: AssistantRecord;
  loading: boolean;
  message?: { tone: "success" | "error"; body: string };
  onToggleStatus: (item: AssistantRecord, nextStatus: AssistantRecord["status"]) => void;
}) {
  const { item, loading, message, onToggleStatus } = props;
  const nextStatus = item.status === "new" ? "processed" : "new";

  return (
    <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-semibold text-white">{item.name || item.email || "Demande anonyme"}</h4>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${scoreClasses[item.score]}`}>{item.scoreLabel}</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              {statusLabels[item.status]}
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/75">
              {intentLabels[item.intent]}
            </span>
          </div>
          <p className="mt-2 text-sm text-white/60">
            {[item.company, item.email, projectTypeLabels[item.projectType]].filter(Boolean).join(" • ")}
          </p>
          <p className="mt-3 max-w-4xl text-sm text-white/82">{item.summary.next_step}</p>
        </div>

        <div className="min-w-[220px] text-sm text-white/60 xl:text-right">
          <p>{formatDate(item.submittedAt)}</p>
          <p className="mt-1">{actionLabels[item.action]}</p>
          <p className="mt-1">Budget : {formatBudget(item)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-[1.3fr,0.8fr,auto]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs uppercase tracking-[0.26em] text-white/45">Lecture rapide</p>
          <p className="mt-2 text-sm text-white/72">{item.scoreReason}</p>
          {item.summary.missing_info.length ? (
            <p className="mt-3 text-sm text-white/55">
              Manque : {item.summary.missing_info.slice(0, 3).join(", ")}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MiniInfo label="Clarté" value={`${item.summary.clarity_score}/100`} />
          <MiniInfo label="Complexité" value={item.summary.complexity} />
          <MiniInfo label="Rôles" value={item.summary.roles.length ? String(item.summary.roles.length) : "0"} />
          <MiniInfo label="Escalade" value={item.humanNeeded ? "Oui" : "Non"} />
        </div>

        <div className="flex flex-wrap items-start justify-end gap-2 xl:w-[220px]">
          {item.id ? (
            <Link
              href={`/admin/assistant/${item.id}`}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78 transition hover:border-white hover:text-white"
            >
              Ouvrir fiche
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => onToggleStatus(item, nextStatus)}
            disabled={loading}
            className="rounded-full border border-[#7fb8c7]/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#cce9f0] transition hover:border-[#7fb8c7]/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {item.status === "new" ? "Traiter" : "Réouvrir"}
          </button>
        </div>
      </div>

      {message ? (
        <p className={`mt-3 text-xs ${message.tone === "success" ? "text-emerald-200" : "text-rose-200"}`}>{message.body}</p>
      ) : null}
    </div>
  );
}

function MiniInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-sm text-white/65">
      {label}
    </div>
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
