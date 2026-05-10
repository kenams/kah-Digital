"use client";

import { useState, useEffect, useCallback } from "react";
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiMinus, FiTwitter, FiLinkedin, FiMapPin } from "react-icons/fi";
import type { SocialLog } from "@/lib/social-store";

const PLATFORM_ICON: Record<string, React.ReactNode> = {
  linkedin: <FiLinkedin size={12} />,
  x:        <FiTwitter size={12} />,
  gmb:      <FiMapPin size={12} />,
};

const PLATFORM_COLOR: Record<string, string> = {
  linkedin: "text-blue-400 bg-blue-900/30",
  x:        "text-sky-400 bg-sky-900/30",
  gmb:      "text-emerald-400 bg-emerald-900/30",
};

const STATUS_CONFIG = {
  ok:      { icon: <FiCheckCircle size={12} />, label: "OK",      cls: "text-emerald-400 bg-emerald-900/30" },
  error:   { icon: <FiXCircle size={12} />,     label: "Erreur",  cls: "text-red-400 bg-red-900/30" },
  skipped: { icon: <FiMinus size={12} />,        label: "Ignoré", cls: "text-white/30 bg-white/5" },
};

function fmt(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function Chip({ cls, icon, label }: { cls: string; icon: React.ReactNode; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}>
      {icon}{label}
    </span>
  );
}

export function AdminSocialDashboard() {
  const [logs, setLogs] = useState<SocialLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "ok" | "error">("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/social-logs");
      if (res.ok) setLogs(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const visible = filter === "all" ? logs : logs.filter((l) => l.status === filter);

  const stats = {
    ok:    logs.filter((l) => l.status === "ok").length,
    error: logs.filter((l) => l.status === "error").length,
    total: logs.length,
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Social Poster</h1>
          <p className="mt-0.5 text-sm text-white/45">Historique des posts automatiques LinkedIn · X · GMB</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/50 transition hover:border-white/22 hover:text-white/80 disabled:opacity-40"
        >
          <FiRefreshCw size={11} className={loading ? "animate-spin" : ""} />
          Actualiser
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        {[
          { label: "Posts réussis",  value: stats.ok,    cls: "text-emerald-400" },
          { label: "Erreurs",        value: stats.error,  cls: "text-red-400" },
          { label: "Total (100 derniers)", value: stats.total, cls: "text-white" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/8 bg-white/3 p-4">
            <p className="text-xs text-white/40">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.cls}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        {(["all", "ok", "error"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              filter === f ? "bg-white/12 text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {f === "all" ? "Tous" : f === "ok" ? "Réussis" : "Erreurs"}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading && logs.length === 0 ? (
        <div className="py-16 text-center text-sm text-white/30">Chargement...</div>
      ) : visible.length === 0 ? (
        <div className="py-16 text-center text-sm text-white/30">Aucun log trouvé.</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/3">
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Plateforme</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Lang</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/40">Contenu / Erreur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {visible.map((log) => {
                const sc = STATUS_CONFIG[log.status] ?? STATUS_CONFIG.error;
                return (
                  <tr key={log.id} className="transition hover:bg-white/3">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-white/40">{fmt(log.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Chip
                        cls={PLATFORM_COLOR[log.platform] ?? "text-white/50 bg-white/5"}
                        icon={PLATFORM_ICON[log.platform] ?? null}
                        label={log.platform.toUpperCase()}
                      />
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-white/60">{log.lang}</td>
                    <td className="px-4 py-3">
                      <Chip cls={sc.cls} icon={sc.icon} label={sc.label} />
                    </td>
                    <td className="max-w-xs px-4 py-3">
                      {log.status === "error" && log.error ? (
                        <span className="text-xs text-red-400 line-clamp-2">{log.error}</span>
                      ) : log.content ? (
                        <span className="text-xs text-white/50 line-clamp-2">{log.content}</span>
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
  );
}
