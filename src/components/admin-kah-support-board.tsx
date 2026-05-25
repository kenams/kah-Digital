"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  FiRefreshCw, FiCheck, FiX, FiBell, FiActivity,
  FiFilter, FiSearch, FiGlobe, FiZap, FiMail,
} from "react-icons/fi";

type ProspectStatus = "pending" | "sent" | "no_reply" | "replied" | "demo_scheduled" | "won" | "lost";

type Prospect = {
  id: string;
  name: string;
  email: string;
  company: string;
  domain?: string | null;
  sector: string | null;
  contact_role: string | null;
  personal_note: string | null;
  status: ProspectStatus;
  sent_at: string | null;
  replied_at: string | null;
  notes: string | null;
};

const STATUS_CONFIG: Record<ProspectStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending:        { label: "⏳ En attente",    bg: "bg-gray-500/15",    text: "text-gray-400",    dot: "bg-gray-500" },
  sent:           { label: "Envoyé",           bg: "bg-blue-500/15",    text: "text-blue-400",    dot: "bg-blue-400" },
  no_reply:       { label: "Sans réponse",     bg: "bg-white/8",        text: "text-white/40",    dot: "bg-white/30" },
  replied:        { label: "🔥 Répondu",        bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  demo_scheduled: { label: "📅 Démo planif.",  bg: "bg-violet-500/15",  text: "text-violet-400",  dot: "bg-violet-400" },
  won:            { label: "✅ Gagné",           bg: "bg-green-500/15",   text: "text-green-400",   dot: "bg-green-400" },
  lost:           { label: "Perdu",             bg: "bg-red-500/15",     text: "text-red-400",     dot: "bg-red-400" },
};

type ActiveTab = "live" | "chauds" | "prospects" | "domaines";

type DomainStatus = "ok" | "error" | "pending";
type DomainInfo = { domain: string; count: number; statuses: ProspectStatus[]; mxOk: DomainStatus };

function extractDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

function StatCard({ label, value, sub, color = "text-white" }: {
  label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
      <p className="text-xs text-white/50 uppercase tracking-widest">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${color}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-white/40">{sub}</p>}
    </div>
  );
}

function FunnelBar({ label, value, max, color, pct }: {
  label: string; value: number; max: number; color: string; pct: number | null;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="font-bold text-white">
          {value}{pct !== null ? <span className="text-gray-500 font-normal"> ({pct}%)</span> : null}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: max > 0 ? `${Math.min(100, Math.round((value / max) * 100))}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function AdminKahSupportBoard() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [noteEdit, setNoteEdit] = useState<{ id: string; value: string } | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("live");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [domainResults, setDomainResults] = useState<Record<string, DomainStatus>>({});
  const [checkingDomains, setCheckingDomains] = useState(false);
  const [firing, setFiring] = useState(false);
  const [fireMsg, setFireMsg] = useState<string | null>(null);
  const [batchProgress, setBatchProgress] = useState<{ step: number; total: number; email?: string; company?: string; ok?: boolean } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/kah-support-prospects");
    if (res.ok) setProspects(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  // Auto-refresh 30s
  useEffect(() => {
    const id = setInterval(() => { void load(); }, 30_000);
    return () => clearInterval(id);
  }, [load]);

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

  async function fireBatch() {
    // Prend les 5 premiers pending depuis le state déjà chargé
    const toSend = prospects.filter(p => p.status === "pending").slice(0, 5);
    if (toSend.length === 0) {
      setFireMsg("ℹ️ Aucun prospect en attente");
      return;
    }

    setFiring(true);
    setFireMsg(null);
    setBatchProgress({ step: 0, total: toSend.length });

    let sent = 0;
    let failed = 0;

    for (let i = 0; i < toSend.length; i++) {
      const p = toSend[i];
      // Update progress AVANT l'envoi (nom de l'entreprise en cours)
      setBatchProgress({ step: i, total: toSend.length, email: p.email, company: p.company });

      try {
        const res = await fetch("/api/admin/kah-support-send-one", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: p.id }),
        });
        const data = await res.json() as { ok?: boolean; error?: string; skipped?: boolean };
        if (res.ok && (data.ok || data.skipped)) {
          sent++;
          // Met à jour localement sans recharger
          setProspects(prev => prev.map(x => x.id === p.id ? { ...x, status: "sent" as ProspectStatus } : x));
        } else {
          failed++;
        }
      } catch {
        failed++;
      }

      // Progress APRÈS l'envoi : i+1 cases remplies
      setBatchProgress({ step: i + 1, total: toSend.length, email: p.email, company: p.company, ok: failed === 0 });
    }

    setFireMsg(
      sent > 0
        ? `✅ ${sent} email${sent > 1 ? "s" : ""} envoyé${sent > 1 ? "s" : ""}${failed > 0 ? ` · ${failed} échoué${failed > 1 ? "s" : ""}` : ""}`
        : `❌ Tous les envois ont échoué`
    );
    setFiring(false);
  }

  async function checkAllDomains() {
    setCheckingDomains(true);
    const domains = [...new Set(prospects.map(p => extractDomain(p.email)).filter(Boolean))];
    const results: Record<string, DomainStatus> = {};
    for (const domain of domains) {
      try {
        const r = await fetch(`/api/admin/kah-support-domains?domain=${encodeURIComponent(domain)}`);
        const data = await r.json() as { ok: boolean };
        results[domain] = data.ok ? "ok" : "error";
      } catch {
        results[domain] = "error";
      }
    }
    setDomainResults(results);
    setCheckingDomains(false);
  }

  const stats = useMemo(() => {
    const pending = prospects.filter(p => p.status === "pending").length;
    const sent = prospects.filter(p => p.status !== "pending").length;
    const total = prospects.length;
    const replied = prospects.filter(p => ["replied", "demo_scheduled", "won"].includes(p.status)).length;
    const demo = prospects.filter(p => p.status === "demo_scheduled").length;
    const won = prospects.filter(p => p.status === "won").length;
    const lost = prospects.filter(p => p.status === "lost").length;
    const noReply = prospects.filter(p => p.status === "no_reply" || p.status === "sent").length;
    const replyRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;
    const convRate = sent > 0 ? Math.round((won / sent) * 100) : 0;
    return { total, pending, sent, replied, demo, won, lost, noReply, replyRate, convRate };
  }, [prospects]);

  const hotProspects = useMemo(() =>
    prospects.filter(p => p.status === "replied" || p.status === "demo_scheduled"),
    [prospects]
  );

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return prospects.filter(p => {
      if (filterStatus !== "all" && p.status !== filterStatus) return false;
      if (q && !`${p.company} ${p.email} ${p.sector ?? ""} ${p.contact_role ?? ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [prospects, filterStatus, searchQuery]);

  const domainGroups = useMemo((): DomainInfo[] => {
    const map = new Map<string, { statuses: ProspectStatus[] }>();
    for (const p of prospects) {
      const d = extractDomain(p.email);
      if (!d) continue;
      if (!map.has(d)) map.set(d, { statuses: [] });
      map.get(d)!.statuses.push(p.status);
    }
    return [...map.entries()]
      .map(([domain, { statuses }]) => ({
        domain,
        count: statuses.length,
        statuses,
        mxOk: (domainResults[domain] ?? "pending") as DomainStatus,
      }))
      .sort((a, b) => b.count - a.count);
  }, [prospects, domainResults]);

  const tabs: { id: ActiveTab; label: string; icon: typeof FiBell }[] = [
    { id: "live",      label: "Live & Stats",        icon: FiActivity },
    { id: "chauds",    label: `Prospects chauds${hotProspects.length > 0 ? ` (${hotProspects.length})` : ""}`, icon: FiBell },
    { id: "prospects", label: "Tous les prospects",  icon: FiFilter },
    { id: "domaines",  label: "Domaines",            icon: FiGlobe },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-gray-900 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              🎯 Prospection KAH-Support GLPI
              {hotProspects.length > 0 && (
                <span className="animate-pulse rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold">
                  {hotProspects.length} chaud{hotProspects.length > 1 ? "s" : ""}
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-400">Campagne Resend · 30 entreprises GLPI · contact@kah-digital.ch → kahdigital42@gmail.com</p>
          </div>
          <div className="flex items-center gap-2">
            {stats.pending > 0 && (
              <span className="rounded-lg border border-gray-500/30 bg-gray-500/10 px-3 py-2 text-xs text-gray-400">
                ⏳ {stats.pending} en file
              </span>
            )}
            <button
              onClick={() => void fireBatch()}
              disabled={firing || stats.pending === 0}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold hover:bg-violet-700 disabled:opacity-50"
            >
              <FiZap size={13} /> {firing ? "Envoi..." : `Lancer batch (5 emails)`}
            </button>
            <button
              onClick={() => void load()}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 disabled:opacity-50"
            >
              <FiRefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl flex gap-1 mt-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Bar */}
      <div className="border-b border-white/10 bg-gray-900/50 px-6 py-3">
        <div className="mx-auto max-w-7xl flex flex-wrap gap-6 text-sm">
          {[
            { label: "⏳ File d'attente", value: stats.pending, color: "text-gray-400" },
            { label: "📤 Envoyés",        value: stats.sent,    color: "text-white" },
            { label: "🔥 Répondus",       value: `${stats.replied} (${stats.replyRate}%)`, color: "text-emerald-400" },
            { label: "📅 Démos",          value: stats.demo,    color: "text-violet-400" },
            { label: "✅ Gagnés",          value: `${stats.won} (${stats.convRate}%)`, color: "text-green-400" },
            { label: "❌ Perdus",          value: stats.lost,    color: "text-red-400" },
            { label: "📭 Sans réponse",   value: stats.noReply, color: "text-yellow-400" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
              <span className="text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TAB: LIVE ── */}
      {activeTab === "live" && (
        <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">

          {/* Guide lecture */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
            <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">📖 Comment lire ces chiffres ?</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs text-gray-400">
              <div className="flex gap-2"><span>📤</span><span><strong className="text-white">Envoyés</strong> — emails partis via Resend (contact@kah-digital.ch)</span></div>
              <div className="flex gap-2"><span>🔥</span><span><strong className="text-white">Répondus</strong> — a répondu, démo planifiée, ou gagné</span></div>
              <div className="flex gap-2"><span>📅</span><span><strong className="text-white">Démo</strong> — appel/démo planifié(e) avec le prospect</span></div>
              <div className="flex gap-2"><span>✅</span><span><strong className="text-white">Gagné</strong> — contrat signé, client actif sur kah-support.ch</span></div>
            </div>
            <p className="mt-2 text-xs text-yellow-400/80">
              ⚠️ Les vraies réponses email arrivent sur <strong>kahdigital42@gmail.com</strong> — met à jour le statut manuellement ici.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Envoyés" value={stats.sent} sub="30 entreprises GLPI" />
            <StatCard
              label="Taux réponse"
              value={`${stats.replyRate}%`}
              sub={`${stats.replied} prospect${stats.replied > 1 ? "s" : ""}`}
              color={stats.replyRate >= 10 ? "text-emerald-400" : stats.replyRate >= 5 ? "text-yellow-400" : "text-orange-400"}
            />
            <StatCard
              label="Démos planif."
              value={stats.demo}
              sub="appels confirmés"
              color={stats.demo > 0 ? "text-violet-400" : "text-white"}
            />
            <StatCard
              label="Gagnés"
              value={stats.won}
              sub={`${stats.convRate}% conversion`}
              color={stats.won > 0 ? "text-green-400" : "text-white"}
            />
          </div>

          {/* Funnel */}
          <div className="rounded-2xl border border-white/8 bg-gray-900/60 p-5">
            <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <FiActivity size={14} className="text-blue-400" /> Funnel de conversion
            </h2>
            <div className="space-y-3">
              <FunnelBar label="⏳ File d'attente" value={stats.pending} max={stats.total} color="bg-gray-600" pct={stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0} />
              <FunnelBar label="📤 Envoyés" value={stats.sent} max={stats.total} color="bg-blue-500" pct={stats.total > 0 ? Math.round((stats.sent / stats.total) * 100) : 0} />
              <FunnelBar label="🔥 Répondus" value={stats.replied} max={stats.sent || 1} color="bg-emerald-500" pct={stats.replyRate} />
              <FunnelBar label="📅 Démos planifiées" value={stats.demo} max={stats.sent || 1} color="bg-violet-500" pct={stats.sent > 0 ? Math.round((stats.demo / stats.sent) * 100) : 0} />
              <FunnelBar label="✅ Gagnés (clients)" value={stats.won} max={stats.sent || 1} color="bg-green-500" pct={stats.convRate} />
            </div>

            {/* KPI benchmarks */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Taux réponse",
                  value: `${stats.replyRate}%`,
                  score: stats.replyRate >= 10 ? "🟢 Excellent" : stats.replyRate >= 5 ? "🟡 Correct" : "🟠 Peu",
                  bench: "Objectif ≥ 10%",
                  color: stats.replyRate >= 10 ? "text-emerald-400" : stats.replyRate >= 5 ? "text-yellow-400" : "text-orange-400",
                },
                {
                  label: "Taux démo",
                  value: stats.sent > 0 ? `${Math.round((stats.demo / stats.sent) * 100)}%` : "0%",
                  score: stats.demo >= 3 ? "🟢 Très bon" : stats.demo >= 1 ? "🟡 En route" : "⚪ Pas encore",
                  bench: "Objectif ≥ 3 démos",
                  color: stats.demo >= 3 ? "text-emerald-400" : stats.demo >= 1 ? "text-violet-400" : "text-gray-400",
                },
                {
                  label: "Conversion",
                  value: `${stats.convRate}%`,
                  score: stats.won >= 1 ? "🟢 Premier client !" : "⚪ Pas encore",
                  bench: "Objectif ≥ 1 client",
                  color: stats.won >= 1 ? "text-green-400" : "text-gray-400",
                },
                {
                  label: "Sans réponse",
                  value: stats.noReply.toString(),
                  score: stats.noReply > 20 ? "⚠️ À relancer" : stats.noReply > 0 ? "🟡 Normal" : "✅ Tous répondus",
                  bench: "Relance J+7",
                  color: "text-yellow-400",
                },
              ].map(kpi => (
                <div key={kpi.label} className="rounded-xl border border-white/8 bg-gray-800/50 p-3 text-center">
                  <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{kpi.label}</div>
                  <div className="text-xs mt-1 font-semibold">{kpi.score}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{kpi.bench}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lancer la prospection */}
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6">
            <h3 className="mb-1 font-bold text-white flex items-center gap-2 text-lg">
              <FiZap size={18} className="text-violet-400" /> Prospection automatique GLPI
            </h3>
            <p className="text-sm text-gray-400 mb-5">
              Cron actif tous les jours à 15h (lun–ven) — envoie <strong className="text-white">5 emails/jour</strong> depuis la file d&apos;attente.
              {stats.pending > 0 && (
                <span className="ml-2 text-gray-300">
                  <strong className="text-violet-300">{stats.pending} prospects</strong> en attente ({Math.round(stats.pending / 5)} jours restants).
                </span>
              )}
            </p>

            <button
              onClick={() => void fireBatch()}
              disabled={firing || stats.pending === 0}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 disabled:opacity-50 transition mb-4"
            >
              <FiZap size={16} /> {firing ? "Envoi en cours..." : "Lancer batch maintenant (5 emails)"}
            </button>

            {/* Barre de progression — s'affiche dès le clic jusqu'à la fin */}
            {(firing || (batchProgress && batchProgress.step > 0)) && (
              <div className="rounded-xl border border-violet-500/20 bg-black/20 p-4 mb-3 space-y-3">
                {/* Label entreprise en cours */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400 truncate flex items-center gap-2">
                    {firing && batchProgress && batchProgress.step < batchProgress.total && (
                      <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse flex-shrink-0" />
                    )}
                    {batchProgress && batchProgress.step < batchProgress.total
                      ? `Envoi vers ${batchProgress.company ?? batchProgress.email ?? "..."}`
                      : batchProgress && batchProgress.step === batchProgress.total
                      ? "Batch terminé"
                      : "Démarrage..."}
                  </span>
                  <span className="font-mono text-sm font-bold text-violet-300 flex-shrink-0">
                    {batchProgress ? `${batchProgress.step}/${batchProgress.total}` : "0/5"}
                  </span>
                </div>

                {/* Barre principale 0% → 100% */}
                <div className="relative h-3 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-400 transition-all duration-500 ease-out"
                    style={{ width: batchProgress ? `${Math.round((batchProgress.step / batchProgress.total) * 100)}%` : "0%" }}
                  />
                </div>

                {/* Segments individuels */}
                <div className="flex gap-1.5">
                  {batchProgress && Array.from({ length: batchProgress.total }, (_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        i < batchProgress.step ? "bg-violet-400" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Pourcentage */}
                {batchProgress && (
                  <p className="text-center text-xs font-mono text-violet-300">
                    {Math.round((batchProgress.step / batchProgress.total) * 100)}%
                  </p>
                )}
              </div>
            )}

            {fireMsg && (
              <p className={`text-center text-sm font-semibold ${fireMsg.startsWith("✅") ? "text-emerald-400" : fireMsg.startsWith("ℹ️") ? "text-blue-400" : "text-red-400"}`}>
                {fireMsg}
              </p>
            )}
            {stats.pending === 0 && !firing && (
              <p className="text-center text-xs text-gray-500">File d&apos;attente vide — tous les prospects ont été contactés.</p>
            )}
          </div>

          {/* Répartition par statut */}
          <div className="rounded-2xl border border-white/8 bg-gray-900/60 p-5">
            <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <FiZap size={14} className="text-yellow-400" /> Répartition des statuts
            </h2>
            <div className="space-y-2">
              {(Object.entries(STATUS_CONFIG) as [ProspectStatus, typeof STATUS_CONFIG[ProspectStatus]][]).map(([key, sc]) => {
                const count = prospects.filter(p => p.status === key).length;
                return (
                  <div key={key} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${sc.dot}`} />
                    <span className="w-32 text-xs text-gray-400">{sc.label.replace(/[🔥📅✅]/gu, "").trim()}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sc.dot} transition-all`}
                        style={{ width: prospects.length > 0 ? `${Math.round((count / prospects.length) * 100)}%` : "0%" }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs font-bold text-white">{count}</span>
                    <span className="w-10 text-right text-xs text-gray-500">
                      {prospects.length > 0 ? `${Math.round((count / prospects.length) * 100)}%` : "0%"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ── TAB: CHAUDS ── */}
      {activeTab === "chauds" && (
        <div className="mx-auto max-w-7xl px-6 py-6 space-y-4">
          <div className="flex flex-wrap gap-3 mb-4 text-xs">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-300 font-semibold">🔥 Répondu → contacte MAINTENANT</span>
            <span className="flex items-center gap-1.5 rounded-full bg-violet-500/20 px-3 py-1 text-violet-300">📅 Démo planifiée → prépare la présentation</span>
          </div>

          {hotProspects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-12 text-center text-gray-500">
              <FiBell size={28} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">Aucun prospect chaud pour l'instant</p>
              <p className="text-xs mt-1 text-gray-600">
                Marque un prospect comme "Répondu" ou "Démo planifiée" depuis la liste pour le voir ici.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hotProspects.map(p => {
                const sc = STATUS_CONFIG[p.status];
                return (
                  <div key={p.id} className={`rounded-2xl border p-5 ${p.status === "demo_scheduled" ? "border-violet-500/40 bg-violet-500/5" : "border-emerald-500/30 bg-emerald-500/5"}`}>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-bold text-base text-white">{p.company}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{p.sector ?? "—"} · {p.contact_role ?? "—"}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap ${sc.bg} ${sc.text}`}>
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-mono mb-1">{p.email}</p>
                    {p.replied_at && (
                      <p className="text-xs text-gray-500 mb-3">Répondu le {fmtDate(p.replied_at)}</p>
                    )}
                    {p.notes && (
                      <p className="text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-2 mb-3 border-l-2 border-emerald-500/50">
                        {p.notes}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(p.email)}&su=${encodeURIComponent(`Suite — ${p.company} · KAH-Support GLPI`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center rounded-lg bg-blue-600 px-2 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        ✉ Répondre via Gmail
                      </a>
                      {p.status === "replied" && (
                        <button
                          onClick={() => void updateStatus(p.id, "demo_scheduled")}
                          className="rounded-lg bg-violet-600/30 px-2 py-1.5 text-xs font-semibold text-violet-300 hover:bg-violet-600/50"
                        >
                          📅 Planifier démo
                        </button>
                      )}
                      {p.status === "demo_scheduled" && (
                        <button
                          onClick={() => void updateStatus(p.id, "won")}
                          className="rounded-lg bg-green-600/30 px-2 py-1.5 text-xs font-semibold text-green-300 hover:bg-green-600/50"
                        >
                          ✅ Marquer gagné
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: PROSPECTS ── */}
      {activeTab === "prospects" && (
        <div className="mx-auto max-w-7xl px-6 py-6 space-y-4">

          {/* Filtres */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher entreprise, email, secteur..."
                className="w-full rounded-lg border border-white/10 bg-gray-800 pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-600"
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm text-white"
            >
              <option value="all">Tous les statuts</option>
              {(Object.entries(STATUS_CONFIG) as [ProspectStatus, typeof STATUS_CONFIG[ProspectStatus]][]).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <span className="flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400">
              {filtered.length} / {prospects.length}
            </span>
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
                    <th className="px-4 py-3">Envoyé</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 hidden lg:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="border-b border-white/5">
                        {[1,2,3,4,5,6,7].map(j => (
                          <td key={j} className="px-4 py-3">
                            <div className="h-4 rounded bg-white/8 animate-pulse w-3/4" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : filtered.map(p => {
                    const sc = STATUS_CONFIG[p.status];
                    return (
                      <tr key={p.id} className={`border-b border-white/5 transition hover:bg-white/3 ${["replied","demo_scheduled","won"].includes(p.status) ? "bg-emerald-950/20" : ""}`}>
                        <td className="px-4 py-3 font-medium text-white">{p.company}</td>
                        <td className="px-4 py-3 text-white/55 hidden sm:table-cell">{p.sector ?? "—"}</td>
                        <td className="px-4 py-3 text-white/55 hidden md:table-cell text-xs">{p.contact_role ?? "—"}</td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${p.email}`} className="text-indigo-400 hover:text-indigo-300 text-xs font-mono">{p.email}</a>
                        </td>
                        <td className="px-4 py-3 text-xs text-white/40">{fmtDate(p.sent_at)}</td>
                        <td className="px-4 py-3">
                          <select
                            value={p.status}
                            disabled={updating === p.id}
                            onChange={e => void updateStatus(p.id, e.target.value as ProspectStatus)}
                            className={`rounded-full px-2.5 py-1 text-xs font-medium border-0 outline-none cursor-pointer ${sc.bg} ${sc.text}`}
                          >
                            {(Object.entries(STATUS_CONFIG) as [ProspectStatus, typeof STATUS_CONFIG[ProspectStatus]][]).map(([k, v]) => (
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
                                onKeyDown={e => { if (e.key === "Enter") void saveNote(p.id, noteEdit.value); if (e.key === "Escape") setNoteEdit(null); }}
                                className="w-36 rounded-lg bg-white/10 px-2 py-1 text-xs text-white outline-none border border-white/20"
                                placeholder="Note..."
                              />
                              <button onClick={() => void saveNote(p.id, noteEdit.value)} className="text-emerald-400"><FiCheck size={12} /></button>
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
        </div>
      )}

      {/* ── TAB: DOMAINES ── */}
      {activeTab === "domaines" && (
        <div className="mx-auto max-w-7xl px-6 py-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <FiGlobe size={14} className="text-blue-400" /> Validation des domaines emails
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Vérifie que les domaines ont bien des enregistrements MX (emails délivrables).
              </p>
            </div>
            <button
              onClick={() => void checkAllDomains()}
              disabled={checkingDomains || loading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              <FiRefreshCw size={13} className={checkingDomains ? "animate-spin" : ""} />
              {checkingDomains ? "Vérification..." : "Vérifier tous les domaines"}
            </button>
          </div>

          {/* Résumé */}
          {Object.keys(domainResults).length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-center">
                <div className="text-2xl font-black text-emerald-400">
                  {Object.values(domainResults).filter(v => v === "ok").length}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Domaines OK ✅</div>
              </div>
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-center">
                <div className="text-2xl font-black text-red-400">
                  {Object.values(domainResults).filter(v => v === "error").length}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Sans MX ❌</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/4 p-3 text-center">
                <div className="text-2xl font-black text-gray-400">
                  {domainGroups.filter(d => domainResults[d.domain] === undefined).length}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Non vérifiés ⏳</div>
              </div>
            </div>
          )}

          {/* Liste domaines */}
          <div className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 text-left text-xs text-white/40 uppercase tracking-wider">
                  <th className="px-4 py-3">Domaine</th>
                  <th className="px-4 py-3">Prospects</th>
                  <th className="px-4 py-3">Statuts</th>
                  <th className="px-4 py-3">MX Records</th>
                  <th className="px-4 py-3">Emails concernés</th>
                </tr>
              </thead>
              <tbody>
                {domainGroups.map(({ domain, count, statuses, mxOk }) => {
                  const hot = statuses.filter(s => ["replied","demo_scheduled","won"].includes(s)).length;
                  const mxColor = mxOk === "ok" ? "text-emerald-400" : mxOk === "error" ? "text-red-400" : "text-gray-500";
                  const mxLabel = mxOk === "ok" ? "✅ OK" : mxOk === "error" ? "❌ Pas de MX" : "—";
                  return (
                    <tr key={domain} className={`border-b border-white/5 transition hover:bg-white/3 ${mxOk === "error" ? "bg-red-950/10" : ""}`}>
                      <td className="px-4 py-3 font-mono text-sm text-white">{domain}</td>
                      <td className="px-4 py-3 text-white font-bold">{count}</td>
                      <td className="px-4 py-3">
                        {hot > 0 ? (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400 font-semibold">
                            🔥 {hot} chaud{hot > 1 ? "s" : ""}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">En attente</span>
                        )}
                      </td>
                      <td className={`px-4 py-3 text-sm font-semibold ${mxColor}`}>{mxLabel}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {prospects.filter(p => extractDomain(p.email) === domain).map(p => p.company).join(", ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-white/30">
            La vérification MX utilise Cloudflare DNS-over-HTTPS (1.1.1.1). Un domaine sans MX = les emails peuvent ne pas être délivrés.
          </p>
        </div>
      )}

      <div className="px-6 pb-4">
        <p className="text-xs text-white/20 text-center">
          Campagne Resend · <code className="font-mono">contact@kah-digital.ch</code> · Réponses → <code className="font-mono">kahdigital42@gmail.com</code>
        </p>
      </div>

    </div>
  );
}
