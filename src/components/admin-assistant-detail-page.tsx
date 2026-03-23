"use client";

import Link from "next/link";
import { useState } from "react";
import type { AssistantRecord } from "@/lib/assistant/schema";

type Props = {
  initialItem: AssistantRecord;
};

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
  project_quote: "Projet / devis",
  support_glpi: "Support / GLPI",
  faq: "FAQ",
  general_info: "Info générale",
  unknown: "Non classé",
};

const projectTypeLabels: Record<AssistantRecord["projectType"], string> = {
  showcase_website: "Site vitrine",
  corporate_website: "Site corporate",
  ecommerce: "E-commerce",
  web_app: "Application web",
  mobile_app: "Application mobile",
  dashboard_portal: "Dashboard / portail",
  glpi_assistant: "Workflow GLPI",
  unknown: "Projet non défini",
};

const statusLabels: Record<AssistantRecord["status"], string> = {
  new: "Nouveau",
  processed: "Traité",
};

function formatBudget(item: AssistantRecord) {
  if (item.summary.budget_range.max <= 0) {
    return "À définir";
  }

  return `${new Intl.NumberFormat("fr-CH").format(item.summary.budget_range.min)} - ${new Intl.NumberFormat("fr-CH").format(item.summary.budget_range.max)} CHF`;
}

export function AdminAssistantDetailPage({ initialItem }: Props) {
  const [item, setItem] = useState(initialItem);
  const [statusMessage, setStatusMessage] = useState<{ tone: "success" | "error"; body: string } | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  async function updateStatus(nextStatus: AssistantRecord["status"]) {
    setStatusLoading(true);
    setStatusMessage(null);
    const previous = item;
    setItem((current) => ({ ...current, status: nextStatus }));

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

      setStatusMessage({
        tone: "success",
        body: nextStatus === "processed" ? "Lead marqué comme traité." : "Lead remis en nouveau.",
      });
    } catch (error) {
      setItem(previous);
      setStatusMessage({
        tone: "error",
        body: error instanceof Error ? error.message : "Erreur de mise à jour.",
      });
    } finally {
      setStatusLoading(false);
    }
  }

  const nextStatus = item.status === "new" ? "processed" : "new";

  return (
    <section className="section-shell py-10">
      <div className="premium-card rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0d111f] via-[#0b1526] to-[#131014] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/demandes?section=assistant"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:border-white hover:text-white"
            >
              Retour assistant
            </Link>
            <Link
              href="/admin/demandes?section=demandes&view=pipeline"
              className="rounded-full border border-[#7fb8c7]/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#cce9f0] transition hover:border-[#7fb8c7]/60"
            >
              Aller au pipeline
            </Link>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">
            Fiche assistant • {new Date(item.submittedAt).toLocaleString("fr-FR")}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Lead assistant</p>
            <h1 className="mt-2 text-4xl font-semibold">{item.name || item.email || "Demande anonyme"}</h1>
            <p className="mt-2 text-white/68">
              {projectTypeLabels[item.projectType]} • {actionLabels[item.action]} • {intentLabels[item.intent]}
            </p>
            <p className="mt-4 max-w-3xl text-sm text-white/78">{item.summary.next_step}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-3 py-1 font-medium ${scoreClasses[item.score]}`}>{item.scoreLabel}</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium text-white/80">
              {actionLabels[item.action]}
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium text-white/80">
              {statusLabels[item.status]}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => updateStatus(nextStatus)}
            disabled={statusLoading}
            className="rounded-full border border-[#7fb8c7]/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#cce9f0] transition hover:border-[#7fb8c7]/60 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {item.status === "new" ? "Marquer traité" : "Remettre en nouveau"}
          </button>
          {statusMessage ? (
            <p className={`self-center text-sm ${statusMessage.tone === "success" ? "text-emerald-200" : "text-rose-200"}`}>
              {statusMessage.body}
            </p>
          ) : null}
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr,1.05fr]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Contact</p>
                <p className="mt-2 text-sm text-white">{item.email ?? "-"}</p>
                <p className="mt-1 text-sm text-white/70">Téléphone : {item.phone ?? "-"}</p>
                <p className="mt-1 text-sm text-white/70">Société : {item.company ?? "-"}</p>
                <p className="mt-1 text-sm text-white/70">Consentement : {item.consent ? "oui" : "non"}</p>
                <p className="mt-1 text-sm text-white/70">Locale : {item.locale.toUpperCase()}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Qualification</p>
                <p className="mt-2 text-sm text-white">Clarté : {item.summary.clarity_score}/100</p>
                <p className="mt-1 text-sm text-white/70">Complexité : {item.summary.complexity}</p>
                <p className="mt-1 text-sm text-white/70">Budget : {formatBudget(item)}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Lecture rapide</p>
              <p className="mt-3 text-sm text-white/80">{item.scoreReason}</p>
              <div className="mt-4 grid gap-3 text-sm text-white/72 md:grid-cols-2">
                <p>Intent : {intentLabels[item.intent]}</p>
                <p>Projet : {projectTypeLabels[item.projectType]}</p>
                <p>Jours estimés : {item.summary.estimated_days}</p>
                <p>Statut : {statusLabels[item.status]}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Rôles recommandés</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.summary.roles.length ? (
                  item.summary.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-white/55">Aucun rôle spécifié.</span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Infos manquantes</p>
              {item.summary.missing_info.length ? (
                <ul className="mt-3 space-y-2 text-sm text-white/78">
                  {item.summary.missing_info.map((entry) => (
                    <li key={entry} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                      {entry}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-white/55">Aucune information bloquante manquante.</p>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Prochaine étape</p>
              <p className="mt-3 text-sm text-white/80">{item.summary.next_step}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Transcript complet</p>
              {item.transcript.length ? (
                <div className="mt-3 space-y-2">
                  {item.transcript.map((entry, index) => (
                    <div key={`${entry.at ?? index}-${entry.role}`} className="rounded-2xl bg-white/[0.03] px-3 py-3">
                      <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/45">
                        {entry.role} {entry.at ? `• ${new Date(entry.at).toLocaleString("fr-FR")}` : ""}
                      </p>
                      <p className="mt-2 text-sm text-white/78">{entry.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-white/55">Aucun transcript disponible.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
