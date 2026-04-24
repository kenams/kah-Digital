"use client";

import { useState, useEffect, useCallback } from "react";
import { FiPlus, FiZap, FiSend, FiTrash2, FiEdit2, FiEye, FiX, FiCheck, FiAlertCircle, FiClock, FiRefreshCw, FiBell, FiActivity, FiPlay } from "react-icons/fi";

type ProspectAuditProblem = { title: string; detail: string; severity: "critical" | "medium" | "low" };
type ProspectAuditRecommendation = { title: string; detail: string; estimatedValue: string };

type ProspectAudit = {
  problems: ProspectAuditProblem[];
  recommendations: ProspectAuditRecommendation[];
  estimatedPrice: number;
  priceRange: string;
};

type Prospect = {
  id: string;
  createdAt: string;
  businessName: string | null;
  website: string;
  email: string | null;
  phone: string | null;
  sector: string | null;
  status: "pending" | "analyzing" | "analyzed" | "draft" | "sent" | "replied" | "rejected";
  audit: ProspectAudit | null;
  emailSubject: string | null;
  emailBody: string | null;
  draftReply: string | null;
  emailGuessed: boolean | null;
  sentAt: string | null;
  notes: string | null;
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: "En attente",  color: "bg-gray-100 text-gray-700" },
  analyzing: { label: "Analyse...",  color: "bg-blue-100 text-blue-700" },
  analyzed:  { label: "Analysé",     color: "bg-indigo-100 text-indigo-700" },
  draft:     { label: "Brouillon",   color: "bg-yellow-100 text-yellow-700" },
  sent:      { label: "Envoyé",      color: "bg-green-100 text-green-700" },
  replied:   { label: "🔥 Chaud",      color: "bg-emerald-100 text-emerald-700" },
  rejected:  { label: "Rejeté",      color: "bg-red-100 text-red-700" },
};

const SEVERITY_COLOR: Record<string, string> = {
  critical: "text-red-600 bg-red-50 border-red-200",
  medium:   "text-orange-600 bg-orange-50 border-orange-200",
  low:      "text-blue-600 bg-blue-50 border-blue-200",
};

type NoEmailProspect = { id: string; businessName: string | null; website: string; sector: string | null; country: string | null; audit: ProspectAudit | null; createdAt: string };

type LiveStats = {
  stats: { total: number; sent: number; opened: number; clicked: number; replied: number; noEmail: number; j3Sent: number; j7Sent: number; openRate: number; clickRate: number; replyRate: number };
  batches: Array<{ id: string; createdAt: string; slot: string; found: number; sent: number; errors: string[] }>;
  hotProspects: Array<{ id: string; businessName: string | null; website: string; email: string | null; status: string; openedAt: string | null; clickedAt: string | null; sector: string | null; country: string | null; draftReply: string | null }>;
  noEmailProspects: NoEmailProspect[];
};

export function ProspectionDashboard() {
  const [activeTab, setActiveTab] = useState<"prospects" | "live" | "batches" | "noemail">("live");
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Prospect | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const [sending, setSending] = useState<string | null>(null);
  const [editEmail, setEditEmail] = useState<{ subject: string; body: string } | null>(null);
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);
  const [cronRunning, setCronRunning] = useState(false);
  const [followupRunning, setFollowupRunning] = useState(false);
  const [fireRunning, setFireRunning] = useState(false);
  const [fireMessage, setFireMessage] = useState<string | null>(null);

  // Add form state
  const [addForm, setAddForm] = useState({ website: "", email: "", businessName: "", sector: "" });
  const [addLoading, setAddLoading] = useState(false);

  const fetchLiveStats = useCallback(async () => {
    const res = await fetch("/api/prospection/stats");
    const data = await res.json() as LiveStats;
    setLiveStats(data);
  }, []);

  useEffect(() => {
    void fetchLiveStats();
    const interval = setInterval(() => void fetchLiveStats(), 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetchLiveStats]);

  async function handleFireBatch() {
    setFireRunning(true);
    setFireMessage(null);
    try {
      const res = await fetch("/api/prospection/fire?key=KAH2026FIRE");
      const data = await res.json() as { ok?: boolean; message?: string; error?: string };
      if (data.ok) {
        setFireMessage("✓ Batch lancé — les emails partent en background. Actualisez dans 5-10 min.");
        setTimeout(() => void fetchLiveStats(), 15000);
      } else {
        setFireMessage(`Erreur: ${data.error ?? "inconnue"}`);
        setFireRunning(false);
      }
    } catch (err) {
      setFireMessage(`Erreur réseau: ${String(err)}`);
      setFireRunning(false);
    }
  }

  async function handleManualCron() {
    setCronRunning(true);
    try {
      const res = await fetch("/api/cron/prospection", { method: "POST" });
      const data = await res.json() as { sent?: number; found?: number; errors?: number };
      alert(`Batch terminé : ${data.sent ?? 0} emails envoyés sur ${data.found ?? 0} leads trouvés (${data.errors ?? 0} erreurs)`);
      void fetchLiveStats();
      void fetchProspects();
    } finally {
      setCronRunning(false);
    }
  }

  function buildLinkedInMessage(prospect: Prospect): string {
    const name = prospect.businessName ?? prospect.website;
    const score = prospect.audit?.problems?.length
      ? `J'ai détecté ${prospect.audit.problems.filter((p) => p.severity === "critical").length} point(s) critique(s) sur votre site`
      : "J'ai analysé votre site";
    const price = prospect.audit?.priceRange ?? "entre 900€ et 2500€";
    return `Bonjour,\n\nJe suis Kénan, fondateur de KAH-Digital (studio digital). ${score} (${name}).\n\nJe pense qu'on pourrait l'améliorer significativement — ma proposition serait ${price}.\n\nVous avez 10 min cette semaine pour en discuter ?\n\nKénan — KAH-Digital\nkah-digital.ch`;
  }

  function copyLinkedIn(prospect: Prospect) {
    void navigator.clipboard.writeText(buildLinkedInMessage(prospect)).then(() => alert("Message LinkedIn copié !"));
  }

  async function handleManualFollowup() {
    setFollowupRunning(true);
    try {
      const res = await fetch("/api/cron/followup", { method: "POST" });
      const data = await res.json() as { j3Sent?: number; j7Sent?: number; errors?: number };
      alert(`Relances envoyées : J+3 → ${data.j3Sent ?? 0} · J+7 → ${data.j7Sent ?? 0} · Erreurs: ${data.errors ?? 0}`);
      void fetchLiveStats();
    } finally {
      setFollowupRunning(false);
    }
  }

  const fetchProspects = useCallback(async () => {
    setLoading(true);
    const url = filterStatus === "all" ? "/api/prospection/prospects" : `/api/prospection/prospects?status=${filterStatus}`;
    const res = await fetch(url);
    const data = await res.json() as { prospects?: Prospect[] };
    setProspects(data.prospects ?? []);
    setLoading(false);
  }, [filterStatus]);

  useEffect(() => { void fetchProspects(); }, [fetchProspects]);

  async function handleAdd() {
    if (!addForm.website.trim()) return;
    setAddLoading(true);
    try {
      const res = await fetch("/api/prospection/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json() as { prospect?: Prospect; error?: string };
      if (data.prospect) {
        setProspects((p) => [data.prospect!, ...p]);
        setAddForm({ website: "", email: "", businessName: "", sector: "" });
        setAddOpen(false);
        setSelected(data.prospect);
      } else {
        alert(`Erreur: ${data.error ?? "inconnue"}`);
      }
    } finally {
      setAddLoading(false);
    }
  }

  async function handleAnalyze(prospect: Prospect) {
    setAnalyzing(prospect.id);
    try {
      const res = await fetch("/api/prospection/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: prospect.website, email: prospect.email, businessName: prospect.businessName }),
      });
      const data = await res.json() as { prospect?: Prospect; error?: string };
      if (data.prospect) {
        setProspects((p) => p.map((x) => x.id === prospect.id ? data.prospect! : x));
        setSelected(data.prospect);
      }
    } finally {
      setAnalyzing(null);
    }
  }

  async function handleSend(prospect: Prospect) {
    if (!prospect.email) {
      const email = prompt("Email du destinataire :");
      if (!email) return;
      await fetch("/api/prospection/prospects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: prospect.id, email }),
      });
      prospect = { ...prospect, email };
    }

    setSending(prospect.id);
    try {
      const payload: Record<string, string> = { prospectId: prospect.id };
      if (editEmail) {
        payload.overrideSubject = editEmail.subject;
        payload.overrideBody = editEmail.body;
      }
      const res = await fetch("/api/prospection/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as { success?: boolean; error?: string };
      if (data.success) {
        setProspects((p) => p.map((x) => x.id === prospect.id ? { ...x, status: "sent", sentAt: new Date().toISOString() } : x));
        setSelected((s) => s?.id === prospect.id ? { ...s, status: "sent" } : s);
        setEditEmail(null);
        alert("Email envoyé !");
      } else {
        alert(`Erreur envoi: ${data.error ?? "inconnue"}`);
      }
    } finally {
      setSending(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce prospect ?")) return;
    await fetch(`/api/prospection/prospects?id=${id}`, { method: "DELETE" });
    setProspects((p) => p.filter((x) => x.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  async function handleStatusChange(prospect: Prospect, status: string) {
    await fetch("/api/prospection/prospects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prospect.id, status }),
    });
    setProspects((p) => p.map((x) => x.id === prospect.id ? { ...x, status: status as Prospect["status"] } : x));
    setSelected((s) => s?.id === prospect.id ? { ...s, status: status as Prospect["status"] } : s);
  }

  const filtered = filterStatus === "all" ? prospects : prospects.filter((p) => p.status === filterStatus);

  const stats = {
    total: prospects.length,
    analyzed: prospects.filter((p) => ["analyzed","draft","sent","replied"].includes(p.status)).length,
    sent: prospects.filter((p) => p.status === "sent").length,
    replied: prospects.filter((p) => p.status === "replied").length,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-gray-900 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              Prospection IA
              {liveStats && liveStats.hotProspects.length > 0 && (
                <span className="animate-pulse rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold">
                  {liveStats.hotProspects.filter((p) => p.clickedAt).length} chaud
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-400">Autonome — jusqu'à 90 emails/jour · 6 batches · relances J+2/J+5 · multilingue · mondial</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => void handleManualCron()}
              disabled={cronRunning}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold hover:bg-violet-700 disabled:opacity-50"
            >
              <FiPlay size={13} /> {cronRunning ? "En cours..." : "Lancer batch"}
            </button>
            <button onClick={() => { void fetchProspects(); void fetchLiveStats(); }} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5">
              <FiRefreshCw size={14} />
            </button>
            <button
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
            >
              <FiPlus size={16} /> Ajouter
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl flex gap-1 mt-4">
          {[
            { id: "live" as const, label: "Live & Notifications", icon: FiBell },
            { id: "noemail" as const, label: `Sans email${liveStats?.stats.noEmail ? ` (${liveStats.stats.noEmail})` : ""}`, icon: FiAlertCircle },
            { id: "prospects" as const, label: "Prospects", icon: FiZap },
            { id: "batches" as const, label: "Historique batches", icon: FiActivity },
          ].map((tab) => (
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

      {/* KPI bar */}
      {liveStats && (
        <div className="border-b border-white/10 bg-gray-900/50 px-6 py-3">
          <div className="mx-auto max-w-7xl flex flex-wrap gap-6 text-sm">
            {[
              { label: "📤 Envoyés", value: liveStats.stats.sent, color: "text-white" },
              { label: "👁 Ouverts", value: `${liveStats.stats.opened} (${liveStats.stats.openRate}%)`, color: "text-blue-400" },
              { label: "🖱 Cliqués", value: `${liveStats.stats.clicked} (${liveStats.stats.clickRate}%)`, color: "text-orange-400" },
              { label: "🔥 Chauds", value: `${liveStats.stats.replied} (${liveStats.stats.replyRate}%)`, color: "text-emerald-400" },
              { label: "🔁 Relances J+3", value: liveStats.stats.j3Sent, color: "text-violet-400" },
              { label: "🔁 Relances J+7", value: liveStats.stats.j7Sent, color: "text-pink-400" },
              { label: "⚠️ Sans email", value: liveStats.stats.noEmail, color: "text-yellow-400" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
                <span className="text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: LIVE ────────────────────────────────────────────────────────── */}
      {activeTab === "live" && (
        <div className="mx-auto max-w-7xl px-6 py-6 space-y-6">
          {!liveStats ? (
            <div className="text-center text-gray-500 py-12">Chargement...</div>
          ) : (
            <>
              {/* ─ Guide rapide ─ */}
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">📖 Comment lire ces chiffres ?</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 text-xs text-gray-400">
                  <div className="flex gap-2"><span>📤</span><span><strong className="text-white">Envoyés</strong> — emails partis via Resend (pas dans Gmail Envoyés)</span></div>
                  <div className="flex gap-2"><span>👁</span><span><strong className="text-white">Ouverts</strong> — la personne a ouvert l&apos;email</span></div>
                  <div className="flex gap-2"><span>🖱</span><span><strong className="text-white">Cliqués</strong> — a cliqué un lien dans l&apos;email → lead chaud !</span></div>
                  <div className="flex gap-2"><span>🔥</span><span><strong className="text-white">Chauds</strong> — prospects qui ont cliqué (≠ vraie réponse Gmail)</span></div>
                </div>
                <p className="mt-2 text-xs text-yellow-400/80">⚠️ Une vraie réponse email arrive dans <strong>kahdigital42@gmail.com</strong> directement — ce tableau ne la capture pas.</p>
              </div>

              {/* ─ Funnel Analytics ─ */}
              <div className="rounded-2xl border border-white/8 bg-gray-900/60 p-5">
                <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <FiActivity size={14} className="text-blue-400" /> Funnel de conversion
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "📤 Envoyés", value: liveStats.stats.sent, max: liveStats.stats.sent, color: "bg-gray-400", pct: null },
                    { label: "👁 Ouverts", value: liveStats.stats.opened, max: liveStats.stats.sent, color: "bg-blue-500", pct: liveStats.stats.openRate },
                    { label: "🖱 Cliqués", value: liveStats.stats.clicked, max: liveStats.stats.sent, color: "bg-orange-500", pct: liveStats.stats.clickRate },
                    { label: "🔥 Chauds (ont cliqué)", value: liveStats.stats.replied, max: liveStats.stats.sent, color: "bg-emerald-500", pct: liveStats.stats.replyRate },
                  ].map((step) => (
                    <div key={step.label}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400">{step.label}</span>
                        <span className="font-bold text-white">{step.value} {step.pct !== null ? <span className="text-gray-500 font-normal">({step.pct}%)</span> : null}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${step.color} transition-all`}
                          style={{ width: step.max > 0 ? `${Math.round((step.value / step.max) * 100)}%` : "100%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    {
                      label: "Ouverture",
                      value: `${liveStats.stats.openRate}%`,
                      color: liveStats.stats.openRate >= 25 ? "text-emerald-400" : liveStats.stats.openRate >= 15 ? "text-yellow-400" : "text-red-400",
                      score: liveStats.stats.openRate >= 25 ? "🟢 Excellent" : liveStats.stats.openRate >= 15 ? "🟡 Correct" : "🔴 Faible",
                      bench: "Objectif ≥ 25%",
                    },
                    {
                      label: "Clic",
                      value: `${liveStats.stats.clickRate}%`,
                      color: liveStats.stats.clickRate >= 5 ? "text-emerald-400" : liveStats.stats.clickRate >= 2 ? "text-yellow-400" : "text-red-400",
                      score: liveStats.stats.clickRate >= 5 ? "🟢 Excellent" : liveStats.stats.clickRate >= 2 ? "🟡 Correct" : "🔴 Faible",
                      bench: "Objectif ≥ 5%",
                    },
                    {
                      label: "Chauds",
                      value: `${liveStats.stats.replyRate}%`,
                      color: liveStats.stats.replyRate >= 3 ? "text-emerald-400" : liveStats.stats.replyRate >= 1 ? "text-yellow-400" : "text-orange-400",
                      score: liveStats.stats.replyRate >= 3 ? "🟢 Très bon" : liveStats.stats.replyRate >= 1 ? "🟡 Normal" : "🟠 Peu",
                      bench: "Objectif ≥ 1%",
                    },
                    {
                      label: "Sans email",
                      value: liveStats.stats.noEmail.toString(),
                      color: "text-yellow-400",
                      score: liveStats.stats.noEmail > 0 ? "⚠️ À traiter" : "✅ Aucun",
                      bench: "Action manuelle",
                    },
                  ].map((kpi) => (
                    <div key={kpi.label} className="rounded-xl border border-white/8 bg-gray-800/50 p-3 text-center">
                      <div className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{kpi.label}</div>
                      <div className="text-xs mt-1 font-semibold">{kpi.score}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{kpi.bench}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hot prospects (opened/clicked) */}
              <div>
                <h2 className="mb-1 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <FiBell size={14} className="text-orange-400" /> Prospects actifs — à relancer
                </h2>
                <div className="flex flex-wrap gap-3 mb-3 text-xs">
                  <span className="flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-1 text-orange-300 font-semibold">🔥 Cliqué = lead brûlant → contacte MAINTENANT</span>
                  <span className="flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-blue-300">👁 Ouvert = intéressé → relance dans 48h</span>
                </div>
                {liveStats.hotProspects.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-gray-500">
                    <FiBell size={24} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-medium">Aucun prospect actif pour l&apos;instant</p>
                    <p className="text-xs mt-1 text-gray-600">Dès qu&apos;un prospect ouvre ou clique votre email, il apparaît ici automatiquement.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {liveStats.hotProspects.map((p) => (
                      <div key={p.id} className={`rounded-xl border p-4 ${p.clickedAt ? "border-orange-500/40 bg-orange-500/5" : "border-blue-500/20 bg-blue-500/5"}`}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-semibold text-sm">{p.businessName ?? p.website}</p>
                            <p className="text-xs text-gray-400">{p.sector} · {p.country}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {p.clickedAt && <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">🔥 CLIQUÉ</span>}
                            {p.openedAt && !p.clickedAt && <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-bold text-white">👁 OUVERT</span>}
                          </div>
                        </div>
                        {p.email && <p className="text-xs text-gray-300 font-mono">{p.email}</p>}
                        {p.clickedAt && (
                          <p className="mt-2 text-xs text-orange-300 font-semibold">
                            → Contacte-le maintenant !
                          </p>
                        )}
                        <div className="mt-3 flex gap-2">
                          <a
                            href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(p.email ?? "")}&su=${encodeURIComponent(`Suite — ${p.businessName ?? ""}`)}&body=${encodeURIComponent(p.draftReply ?? `Bonjour,\n\nJe fais suite à mon email concernant votre site web.\n\nCordialement,\nKénan — KAH-Digital\nkahdigital42@gmail.com`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 text-center rounded-lg px-2 py-1.5 text-xs font-semibold hover:opacity-90 ${p.draftReply ? "bg-blue-600 text-white" : "bg-white/10"}`}
                          >
                            {p.draftReply ? "📧 Envoyer brouillon IA →" : "✉ Répondre via Gmail"}
                          </a>
                          <button
                            onClick={() => { setActiveTab("prospects"); setFilterStatus("all"); }}
                            className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-gray-400 hover:bg-white/10"
                          >
                            Fiche
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Déclenchement manuel */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
                <h3 className="mb-1 font-bold text-white flex items-center gap-2 text-lg">
                  <FiZap size={18} className="text-emerald-400" /> Lancer la prospection
                </h3>
                <p className="text-sm text-gray-400 mb-5">
                  Chaque batch découvre des leads, audite leur site avec l&apos;IA et envoie jusqu&apos;à <strong className="text-white">25 emails personnalisés</strong>. Le batch tourne en background — tu peux fermer l&apos;onglet.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => void handleFireBatch()}
                    disabled={fireRunning}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50 transition"
                  >
                    <FiZap size={16} /> {fireRunning ? "Batch lancé en background ✓" : "🚀 Lancer un batch (25 emails)"}
                  </button>
                  <button
                    onClick={() => void handleManualFollowup()}
                    disabled={followupRunning}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-pink-500/30 bg-pink-500/10 py-4 text-base font-bold text-pink-300 hover:bg-pink-500/20 disabled:opacity-50 transition"
                  >
                    <FiSend size={16} /> {followupRunning ? "Relances envoyées ✓" : "Relances J+2 / J+5 / J+10"}
                  </button>
                </div>
                {fireMessage && (
                  <p className="mt-3 text-center text-sm text-emerald-400 font-semibold">{fireMessage}</p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── TAB: SANS EMAIL ──────────────────────────────────────────────────── */}
      {activeTab === "noemail" && (
        <div className="mx-auto max-w-5xl px-6 py-6">
          <h2 className="mb-1 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <FiAlertCircle size={14} className="text-yellow-400" /> Prospects sans email — action manuelle requise
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Ces sites ont été audités mais aucun email n&apos;a pu être extrait automatiquement. Visite leur site pour trouver un email de contact, puis ajoute-le via le panneau Prospects.
          </p>
          {!liveStats || liveStats.noEmailProspects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-gray-500">
              <FiCheck size={24} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Aucun prospect sans email en attente</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {liveStats.noEmailProspects.map((p) => (
                <div key={p.id} className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-semibold text-sm">{p.businessName ?? p.website}</p>
                      <p className="text-xs text-gray-400">{p.sector} · {p.country}</p>
                    </div>
                    {p.audit && (
                      <span className="rounded-full bg-indigo-500/20 text-indigo-300 px-2 py-0.5 text-xs font-bold shrink-0">
                        {p.audit.priceRange}
                      </span>
                    )}
                  </div>
                  <a
                    href={p.website.startsWith("http") ? p.website : `https://${p.website}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline truncate block mb-3"
                  >{p.website}</a>
                  <div className="flex gap-2">
                    <a
                      href={p.website.startsWith("http") ? `${p.website}/contact` : `https://${p.website}/contact`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center rounded-lg bg-yellow-600/30 px-2 py-1.5 text-xs font-semibold hover:bg-yellow-600/50 text-yellow-200"
                    >
                      🔍 Chercher email
                    </a>
                    <button
                      onClick={() => { setActiveTab("prospects"); setFilterStatus("analyzed"); }}
                      className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-gray-400 hover:bg-white/10"
                    >
                      Voir fiche
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: BATCHES ─────────────────────────────────────────────────────── */}
      {activeTab === "batches" && (
        <div className="mx-auto max-w-4xl px-6 py-6">
          <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <FiActivity size={14} /> Historique des batches
          </h2>
          {!liveStats || liveStats.batches.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-gray-500">
              Aucun batch exécuté — lance le premier batch pour voir l&apos;historique
            </div>
          ) : (
            <div className="space-y-2">
              {liveStats.batches.map((b) => (
                <div key={b.id} className="rounded-xl border border-white/10 bg-gray-900 p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold capitalize">{b.slot === "morning" ? "🌅 Matin" : b.slot === "noon" ? "☀️ Midi" : "🌙 Soir"}</span>
                      <span className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleString("fr-FR")}</span>
                    </div>
                    {b.errors.length > 0 && (
                      <p className="mt-1 text-xs text-red-400">{b.errors.length} erreur(s)</p>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-right">
                    <div><span className="text-white font-bold">{b.found}</span><span className="text-gray-500 ml-1">leads</span></div>
                    <div><span className="text-green-400 font-bold">{b.sent}</span><span className="text-gray-500 ml-1">envoyés</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: PROSPECTS ───────────────────────────────────────────────────── */}
      {activeTab === "prospects" && (
      <div className="mx-auto max-w-7xl px-6 py-6 flex gap-6">
        {/* List */}
        <div className="w-96 shrink-0">
          {/* Filters */}
          <div className="mb-4 flex flex-wrap gap-2">
            {["all", "pending", "analyzed", "sent", "replied"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  filterStatus === s ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {s === "all" ? "Tous" : STATUS_LABELS[s]?.label ?? s}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500">Chargement...</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-gray-500">
              <FiZap className="mx-auto mb-2" size={24} />
              <p>Aucun prospect</p>
              <button onClick={() => setAddOpen(true)} className="mt-3 text-sm text-blue-400 hover:text-blue-300">
                + Ajouter le premier
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelected(p); setEditEmail(null); }}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selected?.id === p.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-sm">{p.businessName ?? p.website}</p>
                      <p className="truncate text-xs text-gray-400">{p.website}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_LABELS[p.status]?.color ?? ""}`}>
                      {STATUS_LABELS[p.status]?.label ?? p.status}
                    </span>
                  </div>
                  {p.sector && <p className="mt-1 text-xs text-gray-500">{p.sector}</p>}
                  {p.audit && (
                    <p className="mt-1 text-xs text-indigo-400 font-medium">{p.audit.priceRange}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="rounded-xl border border-white/10 bg-gray-900">
              {/* Detail header */}
              <div className="border-b border-white/10 p-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold">{selected.businessName ?? selected.website}</h2>
                  <a href={selected.website.startsWith("http") ? selected.website : `https://${selected.website}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline">{selected.website}</a>
                  {selected.email && (
                    <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1.5">
                      ✉ {selected.email}
                      {selected.emailGuessed && <span className="rounded-full bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 text-xs">estimé</span>}
                    </p>
                  )}
                  {selected.phone && <p className="text-sm text-green-400 mt-0.5">📞 {selected.phone}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={selected.status}
                    onChange={(e) => void handleStatusChange(selected, e.target.value)}
                    className="rounded-lg border border-white/10 bg-gray-800 px-2 py-1 text-xs text-white"
                  >
                    {Object.entries(STATUS_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => void handleAnalyze(selected)}
                    disabled={analyzing === selected.id}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <FiZap size={12} />
                    {analyzing === selected.id ? "Analyse..." : "Re-analyser"}
                  </button>
                  {selected.status === "analyzed" && (
                    <button
                      onClick={() => void handleSend(selected)}
                      disabled={sending === selected.id}
                      className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold hover:bg-green-700 disabled:opacity-50"
                    >
                      <FiSend size={12} />
                      {sending === selected.id ? "Envoi..." : "Envoyer"}
                    </button>
                  )}
                  <button
                    onClick={() => copyLinkedIn(selected)}
                    title="Copier message LinkedIn"
                    className="flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/20"
                  >
                    💼 LinkedIn
                  </button>
                  <button onClick={() => void handleDelete(selected.id)} className="rounded-lg border border-red-500/30 p-1.5 text-red-400 hover:bg-red-500/10">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>

              {selected.status === "analyzing" && (
                <div className="flex items-center gap-3 p-6 text-blue-400">
                  <FiClock size={18} className="animate-spin" />
                  <span>Claude analyse le site web...</span>
                </div>
              )}

              {selected.audit && (
                <div className="p-5 space-y-5">
                  {/* Pricing */}
                  <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-4">
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Prix estimé</p>
                    <p className="mt-1 text-2xl font-bold text-white">{selected.audit.priceRange}</p>
                    <p className="text-xs text-gray-400">Valeur centrale : {selected.audit.estimatedPrice}€</p>
                  </div>

                  {/* Problems */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <FiAlertCircle size={14} /> Problèmes détectés ({selected.audit.problems.length})
                    </h3>
                    <div className="space-y-2">
                      {selected.audit.problems.map((prob, i) => (
                        <div key={i} className={`rounded-lg border p-3 ${SEVERITY_COLOR[prob.severity]}`}>
                          <p className="font-semibold text-sm">{prob.title}</p>
                          <p className="mt-0.5 text-xs opacity-80">{prob.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <FiCheck size={14} /> Recommandations ({selected.audit.recommendations.length})
                    </h3>
                    <div className="space-y-2">
                      {selected.audit.recommendations.map((rec, i) => (
                        <div key={i} className="rounded-lg bg-green-500/5 border border-green-500/20 p-3">
                          <p className="font-semibold text-sm text-green-400">{rec.title}</p>
                          <p className="mt-0.5 text-xs text-gray-400">{rec.detail}</p>
                          <p className="mt-1 text-xs text-green-300 font-medium">→ {rec.estimatedValue}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Brouillon de réponse automatique */}
              {selected.draftReply && (
                <div className="border-t border-white/10 p-5">
                  <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    💬 Brouillon de réponse (généré par IA)
                  </h3>
                  <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4 mb-3">
                    <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{selected.draftReply}</p>
                  </div>
                  {selected.email && (
                    <a
                      href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selected.email)}&su=${encodeURIComponent(`Suite — ${selected.businessName ?? selected.website}`)}&body=${encodeURIComponent(selected.draftReply)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-700"
                    >
                      📧 Envoyer depuis Gmail en 1 clic →
                    </a>
                  )}
                </div>
              )}

              {/* Email preview / editor */}
              {(selected.emailSubject || selected.emailBody) && (
                <div className="border-t border-white/10 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <FiEye size={14} /> Email généré
                    </h3>
                    <button
                      onClick={() => setEditEmail(editEmail ? null : { subject: selected.emailSubject ?? "", body: selected.emailBody ?? "" })}
                      className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1 text-xs text-gray-400 hover:bg-white/5"
                    >
                      {editEmail ? <><FiX size={11} /> Annuler</> : <><FiEdit2 size={11} /> Modifier</>}
                    </button>
                  </div>

                  {editEmail ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Objet</label>
                        <input
                          value={editEmail.subject}
                          onChange={(e) => setEditEmail({ ...editEmail, subject: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-sm text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Corps (HTML)</label>
                        <textarea
                          value={editEmail.body}
                          onChange={(e) => setEditEmail({ ...editEmail, body: e.target.value })}
                          rows={12}
                          className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2 text-xs font-mono text-white"
                        />
                      </div>
                      <button
                        onClick={() => void handleSend(selected)}
                        disabled={sending === selected.id}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
                      >
                        <FiSend size={14} /> {sending === selected.id ? "Envoi en cours..." : "Envoyer cet email"}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Objet</p>
                      <p className="text-sm font-medium text-white mb-3">{selected.emailSubject}</p>
                      <p className="text-xs text-gray-500 mb-1">Aperçu</p>
                      <div
                        className="rounded-lg bg-white/5 border border-white/10 p-4 text-sm text-gray-200 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: selected.emailBody ?? "" }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-dashed border-white/10 text-gray-500">
              <FiZap size={32} className="mb-3 text-gray-600" />
              <p className="text-sm">Sélectionne un prospect pour voir le détail</p>
            </div>
          )}
        </div>
      </div>
      )} {/* end tab prospects */}

      {/* Add modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Nouveau prospect</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-400 hover:text-white">
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Site web *</label>
                <input
                  placeholder="https://mon-resto-paris.fr"
                  value={addForm.website}
                  onChange={(e) => setAddForm({ ...addForm, website: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email de contact</label>
                <input
                  placeholder="contact@business.fr"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Nom entreprise</label>
                  <input
                    placeholder="Le Petit Bistrot"
                    value={addForm.businessName}
                    onChange={(e) => setAddForm({ ...addForm, businessName: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Secteur</label>
                  <input
                    placeholder="restauration"
                    value={addForm.sector}
                    onChange={(e) => setAddForm({ ...addForm, sector: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setAddOpen(false)}
                className="flex-1 rounded-lg border border-white/10 py-2.5 text-sm text-gray-400 hover:bg-white/5"
              >
                Annuler
              </button>
              <button
                onClick={() => void handleAdd()}
                disabled={!addForm.website.trim() || addLoading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
              >
                <FiZap size={14} />
                {addLoading ? "Analyse en cours..." : "Analyser avec Claude"}
              </button>
            </div>

            {addLoading && (
              <p className="mt-3 text-center text-xs text-gray-500">
                Claude visite et analyse le site web... (~10-20s)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
