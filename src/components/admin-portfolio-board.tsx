"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_STATUSES,
  formatEur,
  portfolioCategoryLabel,
  portfolioStatusLabel,
  type PortfolioProject,
} from "@/lib/portfolio";

type Props = {
  initialItems: PortfolioProject[];
};

type Feedback = { tone: "success" | "error"; body: string } | null;

const statusBadge: Record<string, string> = {
  en_cours: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  livre: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  paye: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  annule: "bg-white/10 text-white/55 border border-white/15",
};

const emptyForm = {
  client: "",
  url: "",
  category: "site",
  summary: "",
  priceEur: "",
  status: "livre",
  deliveredOn: "",
  paidOn: "",
  notes: "",
};

export function AdminPortfolioBoard({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [rowBusy, setRowBusy] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const stats = useMemo(() => {
    const clients = new Set(items.map((item) => item.client.trim().toLowerCase()));
    let billed = 0;
    let collected = 0;
    for (const item of items) {
      const price = typeof item.priceEur === "number" ? item.priceEur : 0;
      if (item.status === "livre" || item.status === "paye") billed += price;
      if (item.status === "paye") collected += price;
    }
    return { clients: clients.size, count: items.length, billed, collected };
  }, [items]);

  async function submitNew(event: React.FormEvent) {
    event.preventDefault();
    if (!form.client.trim()) {
      setFeedback({ tone: "error", body: "Le nom du client est requis." });
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? "Enregistrement impossible.");
      setItems((prev) => [data.item as PortfolioProject, ...prev]);
      setForm(emptyForm);
      setShowForm(false);
      setFeedback({ tone: "success", body: "Prestation ajoutée." });
    } catch (error) {
      setFeedback({ tone: "error", body: error instanceof Error ? error.message : "Erreur." });
    } finally {
      setSaving(false);
    }
  }

  async function patchRow(id: string, patch: Partial<PortfolioProject>) {
    setRowBusy(id);
    setFeedback(null);
    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, ...patch }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? "Mise à jour impossible.");
      setItems((prev) => prev.map((item) => (item.id === id ? (data.item as PortfolioProject) : item)));
    } catch (error) {
      setFeedback({ tone: "error", body: error instanceof Error ? error.message : "Erreur." });
    } finally {
      setRowBusy(null);
    }
  }

  async function removeRow(id: string, client: string) {
    if (typeof window !== "undefined" && !window.confirm(`Supprimer la prestation « ${client} » ?`)) {
      return;
    }
    setRowBusy(id);
    setFeedback(null);
    try {
      const response = await fetch("/api/admin/portfolio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? "Suppression impossible.");
      setItems((prev) => prev.filter((item) => item.id !== id));
      setFeedback({ tone: "success", body: "Prestation supprimée." });
    } catch (error) {
      setFeedback({ tone: "error", body: error instanceof Error ? error.message : "Erreur." });
    } finally {
      setRowBusy(null);
    }
  }

  return (
    <section className="section-shell pt-10">
      <div className="premium-card rounded-[32px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Portfolio clients</p>
            <h1 className="mt-3 text-3xl font-semibold">Suivi des prestations KAH Digital</h1>
            <p className="mt-3 max-w-3xl text-sm text-white/70">
              Chaque site, application ou prestation livrée, avec le client, le lien, le prix et le statut.
              L&apos;historique complet de l&apos;activité, année après année.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Clients" value={String(stats.clients)} />
            <StatCard label="Prestations" value={String(stats.count)} />
            <StatCard label="Facturé" value={formatEur(stats.billed)} />
            <StatCard label="Encaissé" value={formatEur(stats.collected)} />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setShowForm((value) => !value)}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            {showForm ? "Fermer" : "+ Ajouter une prestation"}
          </button>
        </div>

        {feedback ? (
          <p className={`mt-4 text-sm ${feedback.tone === "success" ? "text-emerald-200" : "text-rose-200"}`}>
            {feedback.body}
          </p>
        ) : null}

        {showForm ? (
          <form
            onSubmit={submitNew}
            className="mt-4 grid gap-4 rounded-[24px] border border-white/12 bg-black/25 p-5 sm:grid-cols-2"
          >
            <Field label="Client *">
              <input
                value={form.client}
                onChange={(event) => setForm((f) => ({ ...f, client: event.target.value }))}
                className={inputClass}
                placeholder="BCS Nettoyage"
                required
              />
            </Field>
            <Field label="Lien du site / de l'app">
              <input
                value={form.url}
                onChange={(event) => setForm((f) => ({ ...f, url: event.target.value }))}
                className={inputClass}
                placeholder="https://bcs-nettoyage.fr"
              />
            </Field>
            <Field label="Type de prestation">
              <select
                value={form.category}
                onChange={(event) => setForm((f) => ({ ...f, category: event.target.value }))}
                className={inputClass}
              >
                {PORTFOLIO_CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {portfolioCategoryLabel(value)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Prix (€)">
              <input
                value={form.priceEur}
                onChange={(event) => setForm((f) => ({ ...f, priceEur: event.target.value }))}
                className={inputClass}
                inputMode="decimal"
                placeholder="150"
              />
            </Field>
            <Field label="Statut">
              <select
                value={form.status}
                onChange={(event) => setForm((f) => ({ ...f, status: event.target.value }))}
                className={inputClass}
              >
                {PORTFOLIO_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {portfolioStatusLabel(value)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Livré le">
              <input
                type="date"
                value={form.deliveredOn}
                onChange={(event) => setForm((f) => ({ ...f, deliveredOn: event.target.value }))}
                className={inputClass}
              />
            </Field>
            <Field label="Payé le">
              <input
                type="date"
                value={form.paidOn}
                onChange={(event) => setForm((f) => ({ ...f, paidOn: event.target.value }))}
                className={inputClass}
              />
            </Field>
            <Field label="Ce qui a été fait" full>
              <textarea
                value={form.summary}
                onChange={(event) => setForm((f) => ({ ...f, summary: event.target.value }))}
                className={`${inputClass} min-h-[80px]`}
                placeholder="Site vitrine + réservation en ligne, design sur-mesure, SEO local…"
              />
            </Field>
            <Field label="Notes internes" full>
              <textarea
                value={form.notes}
                onChange={(event) => setForm((f) => ({ ...f, notes: event.target.value }))}
                className={`${inputClass} min-h-[60px]`}
              />
            </Field>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#d6b36a] px-6 py-2.5 text-sm font-semibold text-[#17120a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </form>
        ) : null}

        {items.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-5 text-sm text-white/65">
            Aucune prestation enregistrée pour l&apos;instant.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-[28px] border border-white/10 bg-black/20">
            <table className="min-w-[1100px] w-full text-left text-sm text-white/80">
              <thead className="bg-white/[0.04] text-[0.68rem] uppercase tracking-[0.28em] text-white/45">
                <tr>
                  <th className="px-4 py-4">Client / lien</th>
                  <th className="px-4 py-4">Prestation</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Prix</th>
                  <th className="px-4 py-4">Statut</th>
                  <th className="px-4 py-4">Dates</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const id = item.id as string;
                  const busy = rowBusy === id;
                  return (
                    <tr key={id} className="border-t border-white/8 align-top">
                      <td className="px-4 py-4">
                        <p className="font-semibold text-white">{item.client}</p>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block max-w-[220px] truncate text-xs text-[#7fb8c7] hover:text-[#cce9f0]"
                          >
                            {item.url.replace(/^https?:\/\//, "")}
                          </a>
                        ) : (
                          <p className="mt-1 text-xs text-white/35">Pas de lien</p>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <p className="max-w-[280px] text-white/75">{item.summary || "—"}</p>
                        {item.notes ? (
                          <p className="mt-2 max-w-[280px] text-xs text-white/40">{item.notes}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={item.category}
                          disabled={busy}
                          onChange={(event) => patchRow(id, { category: event.target.value as PortfolioProject["category"] })}
                          className={miniInput}
                        >
                          {PORTFOLIO_CATEGORIES.map((value) => (
                            <option key={value} value={value}>
                              {portfolioCategoryLabel(value)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <PriceCell
                          value={item.priceEur ?? null}
                          disabled={busy}
                          onCommit={(next) => patchRow(id, { priceEur: next })}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={item.status}
                          disabled={busy}
                          onChange={(event) => patchRow(id, { status: event.target.value as PortfolioProject["status"] })}
                          className={`${miniInput} ${statusBadge[item.status] ?? ""}`}
                        >
                          {PORTFOLIO_STATUSES.map((value) => (
                            <option key={value} value={value} className="bg-neutral-900 text-white">
                              {portfolioStatusLabel(value)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-xs text-white/55">
                        <p>Livré : {item.deliveredOn ?? "—"}</p>
                        <p className="mt-1">Payé : {item.paidOn ?? "—"}</p>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => removeRow(id, item.client)}
                          disabled={busy}
                          className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/60 transition hover:border-rose-300/50 hover:text-rose-200 disabled:opacity-40"
                        >
                          Suppr.
                        </button>
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

function PriceCell({
  value,
  disabled,
  onCommit,
}: {
  value: number | null;
  disabled: boolean;
  onCommit: (next: number | null) => void;
}) {
  return (
    <input
      key={value === null ? "empty" : String(value)}
      defaultValue={value === null ? "" : String(value)}
      disabled={disabled}
      inputMode="decimal"
      onBlur={(event) => {
        const normalized = event.target.value.trim().replace(",", ".");
        const parsed = normalized === "" ? null : Number.parseFloat(normalized);
        const nextValue = parsed === null || Number.isNaN(parsed) ? null : Math.round(parsed * 100) / 100;
        if (nextValue !== value) onCommit(nextValue);
      }}
      placeholder="€"
      className={`${miniInput} w-24`}
    />
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 text-xs text-white/60 ${full ? "sm:col-span-2" : ""}`}>
      <span className="uppercase tracking-[0.2em]">{label}</span>
      {children}
    </label>
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

const inputClass =
  "rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none";
const miniInput =
  "rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs text-white focus:border-white/40 focus:outline-none disabled:opacity-50";
