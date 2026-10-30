"use client";

import { useCallback, useEffect, useState } from "react";
import { FiActivity, FiMousePointer, FiRefreshCw, FiShield, FiTarget, FiUsers } from "react-icons/fi";

type Stats = {
  days: number;
  totals: { cyberViews: number; cyberViewsPrevious: number; siteViews: number; ctaArrivals: number; leads: number };
  byLocale: Record<string, number>;
  devices: Record<string, number>;
  daily: Array<{ date: string; cyber: number; site: number }>;
  topPages: Array<{ path: string; count: number }>;
  referrers: Array<{ host: string; count: number }>;
  leads: Array<{ submittedAt: string; name: string | null; companyName: string | null; projectType: string | null }>;
  crossSell: Record<string, number>;
  trackingStartedAt: string | null;
};

const SEGMENTS = [
  {
    title: "RGPD : professions réglementées (Toulouse)",
    who: "Experts-comptables, avocats d'affaires, conseillers en gestion de patrimoine, courtiers en assurance et en crédit",
    angle: "Cookies déposés avant le consentement, politique de confidentialité absente : constat vérifiable par le prospect lui-même (navigation privée).",
    offer: "Diagnostic dès 1 000 € HT · RGPD dès 3 000 € HT · correctif web dès 490 € HT",
    status: "4 mails envoyés le 29/10/2026 (détail dans KAH-Digital-Admin/prospection/cyber-toulouse-2026-10-29.md)",
    tone: "emerald",
  },
  {
    title: "DORA : finance et prestataires IT",
    who: "Banques, assureurs, sociétés de gestion, établissements de paiement et leurs prestataires informatiques",
    angle: "Seule cible où DORA s'applique. Ne jamais le vendre aux petits cabinets, courtiers ou avocats (hors périmètre).",
    offer: "Diagnostic dès 1 000 € HT · accompagnement ISO 27001 / DORA / EBIOS RM sur devis",
    status: "À qualifier : aucune prospection lancée",
    tone: "sky",
  },
  {
    title: "Éditeurs de logiciels et sociétés de services",
    who: "Éditeurs et sociétés de services toulousains qui traitent des données de clients",
    angle: "Sécurité des produits et exigences de leurs propres clients (questionnaires de sécurité, ISO 27001).",
    offer: "Diagnostic dès 1 000 € HT · sensibilisation et analyse de risques sur devis",
    status: "À qualifier : repérés lors de la recherche du 29/10, non contactés",
    tone: "violet",
  },
  {
    title: "Clients web de KAH Digital Studio",
    who: "Tous les clients à qui nous livrons un site",
    angle: "Vente croisée : revue de sécurité du site (en-têtes, accès, sauvegardes) et conformité (mentions, cookies, formulaires).",
    offer: "Revue de sécurité du site dès 490 € HT",
    status: "À proposer à chaque livraison",
    tone: "amber",
  },
] as const;

const TONES: Record<string, string> = {
  emerald: "border-emerald-400/30 bg-emerald-400/[0.06]",
  sky: "border-sky-400/30 bg-sky-400/[0.06]",
  violet: "border-violet-400/30 bg-violet-400/[0.06]",
  amber: "border-amber-400/30 bg-amber-400/[0.06]",
};

function Delta({ now, before }: { now: number; before: number }) {
  if (before === 0) return <span className="text-xs text-white/40">{now > 0 ? "nouveau" : "pas de comparaison"}</span>;
  const pct = Math.round(((now - before) / before) * 100);
  return (
    <span className={`text-xs font-semibold ${pct >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
      {pct >= 0 ? "+" : ""}
      {pct} % vs période précédente
    </span>
  );
}

function Bar({ value, max, label }: { value: number; max: number; label: string }) {
  const width = max > 0 && value > 0 ? Math.max(2, Math.round((value / max) * 100)) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="truncate text-white/80">{label}</span>
        <span className="shrink-0 font-semibold text-white">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-emerald-400" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export function AdminCyberBoard() {
  const [days, setDays] = useState<7 | 30 | 90>(30);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (period: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/cyber-stats?days=${period}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erreur");
      setStats(json as Stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(days);
  }, [days, load]);

  const t = stats?.totals;
  const conversion = t && t.cyberViews > 0 ? ((t.leads / t.cyberViews) * 100).toFixed(1) : "0.0";
  const share = t && t.siteViews > 0 ? ((t.cyberViews / t.siteViews) * 100).toFixed(1) : "0.0";
  const maxDaily = stats ? Math.max(1, ...stats.daily.map((d) => d.cyber)) : 1;
  const maxLocale = stats ? Math.max(1, ...Object.values(stats.byLocale)) : 1;
  const maxDevice = stats ? Math.max(1, stats.devices.mobile ?? 0, stats.devices.desktop ?? 0) : 1;
  const maxPage = stats ? Math.max(1, ...stats.topPages.map((p) => p.count)) : 1;
  const maxRef = stats ? Math.max(1, ...stats.referrers.map((p) => p.count)) : 1;

  const kpis = t
    ? [
        { icon: FiUsers, label: "Visites de la page cyber", value: String(t.cyberViews), extra: <Delta now={t.cyberViews} before={t.cyberViewsPrevious} /> },
        { icon: FiActivity, label: "Part du trafic du site", value: `${share} %`, extra: <span className="text-xs text-white/40">{t.siteViews} pages vues au total</span> },
        { icon: FiMousePointer, label: "Clics « diagnostic »", value: String(t.ctaArrivals), extra: <span className="text-xs text-white/40">arrivées sur le devis cyber</span> },
        { icon: FiTarget, label: "Demandes cyber", value: String(t.leads), extra: <span className="text-xs text-white/40">hors tests internes</span> },
        { icon: FiShield, label: "Visite vers demande", value: `${conversion} %`, extra: <span className="text-xs text-white/40">sur la période</span> },
      ]
    : [];

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <FiShield size={13} aria-hidden="true" /> Cybersécurité et conformité
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Audience et ciblage de l&apos;offre cyber</h1>
          <p className="mt-1 max-w-2xl text-sm text-white/55">
            Visites de la page cyber (FR, EN, DE), arrivées depuis les boutons « diagnostic », demandes reçues et cibles à démarcher.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {([7, 30, 90] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${days === d ? "bg-emerald-400 text-[#04120c]" : "bg-white/10 text-white/70 hover:bg-white/15"}`}
            >
              {d} j
            </button>
          ))}
          <button onClick={() => void load(days)} aria-label="Actualiser" className="rounded-lg bg-white/10 p-2 text-white/70 hover:bg-white/15">
            <FiRefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200" role="alert">
          {error}
        </p>
      ) : null}

      {stats && t ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <k.icon size={16} className="text-emerald-300" aria-hidden="true" />
                <p className="mt-3 text-3xl font-black">{k.value}</p>
                <p className="mt-1 text-sm text-white/70">{k.label}</p>
                <div className="mt-1">{k.extra}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/40">
            Mesure anonyme, sans cookie ni adresse IP conservée ; les robots sont exclus.
            {stats.trackingStartedAt
              ? ` Premières données le ${new Date(stats.trackingStartedAt).toLocaleDateString("fr-FR")}.`
              : " Aucune donnée pour l'instant : le compteur démarre avec la mise en ligne de cette version."}
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">Visites de la page cyber par jour</h2>
            <div className="mt-4 flex h-32 items-end gap-[2px]" role="img" aria-label="Visites quotidiennes de la page cybersécurité">
              {stats.daily.map((d) => (
                <div key={d.date} className="flex h-full flex-1 items-end" title={`${d.date} : ${d.cyber} visite(s)`}>
                  <div className="w-full rounded-t bg-emerald-400/80" style={{ height: `${d.cyber > 0 ? Math.max(6, (d.cyber / maxDaily) * 100) : 1}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/40">
              <span>{stats.daily[0]?.date}</span>
              <span>{stats.daily[stats.daily.length - 1]?.date}</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">Langues</h2>
              {(["fr", "en", "de"] as const).map((l) => (
                <Bar key={l} label={l === "fr" ? "Français" : l === "en" ? "English" : "Deutsch"} value={stats.byLocale[l] ?? 0} max={maxLocale} />
              ))}
              <h2 className="pt-2 text-sm font-semibold uppercase tracking-widest text-white/60">Appareils</h2>
              <Bar label="Mobile" value={stats.devices.mobile ?? 0} max={maxDevice} />
              <Bar label="Ordinateur" value={stats.devices.desktop ?? 0} max={maxDevice} />
            </div>
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">Pages cyber les plus vues</h2>
              {stats.topPages.length ? (
                stats.topPages.map((p) => <Bar key={p.path} label={p.path} value={p.count} max={maxPage} />)
              ) : (
                <p className="text-sm text-white/40">Pas encore de visite.</p>
              )}
            </div>
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">D&apos;où viennent les visiteurs</h2>
              {stats.referrers.length ? (
                stats.referrers.map((p) => <Bar key={p.host} label={p.host} value={p.count} max={maxRef} />)
              ) : (
                <p className="text-sm text-white/40">Pas encore de visite.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60">Dernières demandes cyber</h2>
            {stats.leads.length ? (
              <ul className="mt-3 divide-y divide-white/10">
                {stats.leads.map((l) => (
                  <li key={l.submittedAt} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                    <span className="font-medium">
                      {l.name}
                      {l.companyName ? ` · ${l.companyName}` : ""}
                    </span>
                    <span className="text-white/45">{new Date(l.submittedAt).toLocaleString("fr-FR")}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-white/40">Aucune demande cyber sur cette période.</p>
            )}
          </div>
        </>
      ) : loading ? (
        <p className="text-sm text-white/50">Chargement…</p>
      ) : null}

      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <FiTarget size={18} className="text-emerald-300" aria-hidden="true" /> Ciblage cyber
        </h2>
        <p className="mt-1 text-sm text-white/55">Les cibles de l&apos;offre cyber, avec l&apos;argument à utiliser et l&apos;état d&apos;avancement.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {SEGMENTS.map((s) => (
            <div key={s.title} className={`rounded-2xl border p-5 ${TONES[s.tone]}`}>
              <h3 className="text-base font-bold text-white">{s.title}</h3>
              <dl className="mt-3 space-y-2 text-sm text-white/75">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-white/45">Qui</dt>
                  <dd>{s.who}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-white/45">Argument</dt>
                  <dd>{s.angle}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-white/45">Offre</dt>
                  <dd>{s.offer}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-white/45">État</dt>
                  <dd>{s.status}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        {stats ? (
          <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
            Prospects web déjà en base dans les métiers concernés par le volet RGPD : <strong className="text-white">{stats.crossSell.comptable ?? 0}</strong>{" "}
            experts-comptables, <strong className="text-white">{stats.crossSell.avocat ?? 0}</strong> avocats, <strong className="text-white">{stats.crossSell.notaire ?? 0}</strong>{" "}
            notaires. Ils peuvent recevoir l&apos;argument cyber en plus de l&apos;offre web.
          </p>
        ) : null}
      </div>
    </div>
  );
}
