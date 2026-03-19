"use client";

import { useEffect, useMemo, useState } from "react";
import type { AssistantRecord } from "@/lib/assistant/schema";

type Props = {
  initialItems: AssistantRecord[];
};

const scoreClasses: Record<AssistantRecord["score"], string> = {
  hot: "border border-emerald-200/30 bg-emerald-100/15 text-emerald-200",
  medium: "border border-amber-200/30 bg-amber-100/15 text-amber-200",
  low: "border border-white/15 bg-white/10 text-white/70",
  support_urgent: "border border-rose-200/30 bg-rose-100/15 text-rose-200",
  out_of_scope: "border border-slate-200/20 bg-slate-100/10 text-slate-200",
};

const actionLabels: Record<AssistantRecord["action"], string> = {
  summary_email: "Resume envoye",
  human_followup: "Reprise humaine",
  glpi_ticket: "Ticket GLPI",
};

export function AdminAssistantBoard({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);

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

  const stats = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.total += 1;
        if (item.score === "hot") acc.hot += 1;
        if (item.score === "support_urgent") acc.urgent += 1;
        if (item.action === "human_followup") acc.human += 1;
        if (item.action === "glpi_ticket") acc.glpi += 1;
        return acc;
      },
      { total: 0, hot: 0, urgent: 0, human: 0, glpi: 0 }
    );
  }, [items]);

  return (
    <section className="section-shell pt-10">
      <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0d111f] via-[#0b1526] to-[#131014] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-white/50">Assistant qualifieur</p>
            <h2 className="mt-3 text-3xl font-semibold">Leads et support captes via l&apos;assistant</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/68">
              Cette section centralise les resumes consentis transmis par le widget assistant: demandes qualifiees, reprises
              humaines et tickets support.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Leads chauds" value={stats.hot} />
            <StatCard label="Urgents" value={stats.urgent} />
            <StatCard label="Tickets GLPI" value={stats.glpi} />
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-sm text-white/65">
              Aucune demande assistant persistee pour le moment. Les enregistrements apparaissent des qu&apos;un resume est
              envoye, une reprise humaine demandee ou un ticket GLPI cree avec consentement.
            </div>
          ) : (
            items.map((item, index) => (
              <article
                key={item.id ?? `${item.submittedAt}-${item.email ?? index}`}
                className="rounded-[30px] border border-white/10 bg-black/20 p-5"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                      {new Date(item.submittedAt).toLocaleString("fr-FR")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.name || item.email || "Demande anonyme"}</h3>
                    <p className="mt-1 text-sm text-white/60">
                      {item.projectType} · {actionLabels[item.action]} · {item.intent}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`rounded-full px-3 py-1 font-medium ${scoreClasses[item.score]}`}>{item.scoreLabel}</span>
                    {item.humanNeeded ? (
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-medium text-white/80">
                        Reprise humaine
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 xl:grid-cols-[1fr,1fr,1.2fr]">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Contact</p>
                    <p className="mt-2 text-sm text-white/85">{item.email || "-"}</p>
                    <p className="mt-1 text-sm text-white/65">Consentement: {item.consent ? "oui" : "non"}</p>
                    <p className="mt-1 text-sm text-white/65">Action: {actionLabels[item.action]}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Score</p>
                    <p className="mt-2 text-sm text-white/85">{item.scoreReason}</p>
                    <p className="mt-3 text-sm text-white/65">Complexite: {item.summary.complexity}</p>
                    <p className="mt-1 text-sm text-white/65">
                      Budget:{" "}
                      {item.summary.budget_range.max > 0
                        ? `${new Intl.NumberFormat("fr-CH").format(item.summary.budget_range.min)} - ${new Intl.NumberFormat("fr-CH").format(item.summary.budget_range.max)} CHF`
                        : "n/a"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Resume</p>
                    <p className="mt-2 text-sm text-white/85">{item.summary.next_step}</p>
                    {item.summary.missing_info.length ? (
                      <p className="mt-2 text-sm text-white/65">Infos manquantes: {item.summary.missing_info.join(", ")}</p>
                    ) : null}
                    <p className="mt-2 text-sm text-white/65">Roles: {item.summary.roles.join(", ") || "-"}</p>
                  </div>
                </div>

                {item.transcript.length ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Transcript</p>
                    <div className="mt-3 space-y-2">
                      {item.transcript.slice(-6).map((entry, entryIndex) => (
                        <div key={`${entry.at ?? entryIndex}-${entry.role}`} className="rounded-2xl bg-white/[0.03] px-3 py-2 text-sm text-white/78">
                          <span className="mr-2 text-[0.65rem] uppercase tracking-[0.25em] text-white/45">{entry.role}</span>
                          {entry.content}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
