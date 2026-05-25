"use client";

import { useState, useEffect, useCallback } from "react";
import { FiMail, FiRefreshCw, FiCheck, FiClock, FiCalendar, FiTrendingUp, FiX } from "react-icons/fi";

type ProspectStatus = "sent" | "no_reply" | "replied" | "demo_scheduled" | "won" | "lost";

type Prospect = {
  id: string;
  name: string;
  email: string;
  company: string;
  sector: string | null;
  contact_role: string | null;
  personal_note: string | null;
  status: ProspectStatus;
  sent_at: string;
  replied_at: string | null;
  notes: string | null;
};

const STATUS_CONFIG: Record<ProspectStatus, { label: string; bg: string; text: string }> = {
  sent:           { label: "Envoyé",          bg: "bg-blue-500/15",    text: "text-blue-400" },
  no_reply:       { label: "Sans réponse",    bg: "bg-white/8",        text: "text-white/40" },
  replied:        { label: "🔥 Répondu",       bg: "bg-emerald-500/15", text: "text-emerald-400" },
  demo_scheduled: { label: "📅 Démo planif.", bg: "bg-violet-500/15",  text: "text-violet-400" },
  won:            { label: "✅ Gagné",          bg: "bg-green-500/15",   text: "text-green-400" },
  lost:           { label: "Perdu",            bg: "bg-red-500/15",     text: "text-red-400" },
};

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <p className="text-xs text-white/50 uppercase tracking-widest">{label}</p>
      <p className="mt-1 text-3xl font-bold text-white">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-white/40">{sub}</p>}
    </div>
  );
}

export function AdminKahSupportBoard() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [noteEdit, setNoteEdit] = useState<{ id: string; value: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/kah-support-prospects");
    if (res.ok) setProspects(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: ProspectStatus) {
    setUpdating(id);
    await fetch("/api/admin/kah-support-prospects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setProspects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    setUpdating(null);
  }

  async function saveNote(id: string, notes: string) {
    await fetch("/api/admin/kah-support-prospects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    setProspects(prev => prev.map(p => p.id === id ? { ...p, notes } : p));
    setNoteEdit(null);
  }

  const stats = {
    total: prospects.length,
    sent: prospects.filter(p => p.status === "sent").length,
    replied: prospects.filter(p => p.status === "replied" || p.status === "demo_scheduled" || p.status === "won").length,
    won: prospects.filter(p => p.status === "won").length,
  };

  return (
    <section className="section-shell pt-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Campagne GLPI · 25 mai 2026</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Prospection KAH-Support</h2>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-white/25 hover:text-white disabled:opacity-40"
        >
          <FiRefreshCw size={12} className={loading ? "animate-spin" : ""} />
          Actualiser
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Envoyés" value={stats.total} sub="30 entreprises GLPI" />
        <StatCard label="En attente" value={stats.sent} sub="sans retour" />
        <StatCard label="Réponses" value={stats.replied} sub={`${stats.total > 0 ? Math.round((stats.replied / stats.total) * 100) : 0}% taux`} />
        <StatCard label="Gagnés" value={stats.won} sub="contrats signés" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left text-xs text-white/40 uppercase tracking-wider">
                <th className="px-4 py-3">Entreprise</th>
                <th className="px-4 py-3 hidden sm:table-cell">Secteur</th>
                <th className="px-4 py-3 hidden md:table-cell">Contact</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3 hidden lg:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {[1,2,3,4,5,6].map(j => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded bg-white/8 animate-pulse" style={{ width: `${50 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : prospects.map(p => {
                const sc = STATUS_CONFIG[p.status];
                return (
                  <tr key={p.id} className="border-b border-white/5 transition hover:bg-white/3">
                    <td className="px-4 py-3 font-medium text-white">{p.company}</td>
                    <td className="px-4 py-3 text-white/55 hidden sm:table-cell">{p.sector ?? "—"}</td>
                    <td className="px-4 py-3 text-white/55 hidden md:table-cell text-xs">{p.contact_role ?? "—"}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${p.email}`} className="text-indigo-400 hover:text-indigo-300 text-xs">{p.email}</a>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={p.status}
                        disabled={updating === p.id}
                        onChange={e => updateStatus(p.id, e.target.value as ProspectStatus)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium border-0 outline-none cursor-pointer ${sc.bg} ${sc.text}`}
                      >
                        {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {noteEdit?.id === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            autoFocus
                            value={noteEdit.value}
                            onChange={e => setNoteEdit({ id: p.id, value: e.target.value })}
                            onKeyDown={e => { if (e.key === "Enter") saveNote(p.id, noteEdit.value); if (e.key === "Escape") setNoteEdit(null); }}
                            className="w-40 rounded-lg bg-white/10 px-2 py-1 text-xs text-white outline-none border border-white/20"
                            placeholder="Note..."
                          />
                          <button onClick={() => saveNote(p.id, noteEdit.value)} className="text-emerald-400"><FiCheck size={12} /></button>
                          <button onClick={() => setNoteEdit(null)} className="text-white/40"><FiX size={12} /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setNoteEdit({ id: p.id, value: p.notes ?? "" })}
                          className="max-w-[160px] truncate text-xs text-white/40 hover:text-white/70 text-left"
                        >
                          {p.notes || <span className="italic opacity-50">+ note</span>}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-white/30">
        Source : campagne Resend · <code className="font-mono">contact@kah-digital.ch</code> · réponses sur <code className="font-mono">kahdigital42@gmail.com</code>
      </p>
    </section>
  );
}
