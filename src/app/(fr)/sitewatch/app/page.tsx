import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPilotAuth } from "@/lib/pilot-auth";
import {
  findAccount, incidentCount30d, listChecks, listIncidents, MAX_CHECKS, uptime7d, type Check, type Kind,
} from "@/lib/sitewatch/store";
import { createCheckAction, deleteCheckAction, runNowAction, toggleCheckAction } from "./actions";

export const metadata: Metadata = { title: "SiteWatch", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const auth = createPilotAuth("sitewatch");

const KIND_LABEL: Record<Kind, string> = { page: "Page / lien clé", form: "Formulaire de contact", booking: "Réservation", payment: "Parcours de paiement" };
const FREQ_LABEL: Record<number, string> = { 15: "15 min", 30: "30 min", 60: "1 h", 360: "6 h", 1440: "24 h" };

const ERRORS: Record<string, string> = {
  champs: "Champs invalides : vérifiez le nom, le type et la fréquence.",
  url: "Adresse refusée : elle doit être publique (http ou https) et joignable.",
  limite: `Limite atteinte : ${MAX_CHECKS} points de contrôle maximum pendant le pilote.`,
};

const fmt = (iso: string) => new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(iso));

function duration(from: string, to: string | null) {
  const mins = Math.max(1, Math.round(((to ? new Date(to).getTime() : Date.now()) - new Date(from).getTime()) / 60_000));
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  return h < 48 ? `${h} h ${String(mins % 60).padStart(2, "0")}` : `${Math.floor(h / 24)} j`;
}

const field = "w-full rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2.5 text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]";
const primary = "inline-flex rounded-full bg-[#d6b36a] px-5 py-2.5 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]";
const ghost = "inline-flex rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]";

function status(c: Check) {
  if (!c.active) return { label: "En pause", tone: "border-white/25 text-white/60" };
  if (c.last_ok === null) return { label: "Pas encore vérifié", tone: "border-white/25 text-white/60" };
  if (c.incident_open) return { label: "En panne", tone: "border-red-400/60 bg-red-400/10 text-red-200" };
  if (!c.last_ok) return { label: "Raté, à confirmer", tone: "border-[#d6b36a]/60 bg-[#d6b36a]/10 text-[#f0d99b]" };
  return { label: "Fonctionne", tone: "border-emerald-400/50 bg-emerald-400/10 text-emerald-200" };
}

export default async function SiteWatchAppPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const email = await auth.getSessionEmail();
  const account = email ? await findAccount(email) : null;
  if (!account) redirect("/sitewatch/connexion");
  const { erreur } = await searchParams;

  const checks = await listChecks(account.id);
  const [incidents, stats] = await Promise.all([
    listIncidents(checks.map((c) => c.id)),
    Promise.all(checks.map(async (c) => ({ id: c.id, up: await uptime7d(c.id), inc: await incidentCount30d(c.id) }))),
  ]);
  const statOf = (id: string) => stats.find((s) => s.id === id)!;
  const nameOf = (id: string) => checks.find((c) => c.id === id)?.name ?? "—";
  const down = checks.filter((c) => c.incident_open).length;

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f0d99b]">SiteWatch · pilote</p>
              <h1 className="mt-2 text-3xl font-bold">Vos points d&apos;entrée clients</h1>
              <p className="mt-2 text-sm text-white/60">Connecté : {account.email}</p>
            </div>
            <form action="/api/sitewatch/logout" method="post">
              <button type="submit" className={ghost}>Se déconnecter</button>
            </form>
          </div>

          {erreur && ERRORS[erreur] && <p role="alert" className="mt-6 rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{ERRORS[erreur]}</p>}

          {checks.length > 0 && (
            <p role="status" className={`mt-6 rounded-xl border p-4 text-sm ${down ? "border-red-400/40 bg-red-400/10 text-red-100" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"}`}>
              {down ? `${down} point(s) de contrôle en panne. Un email d'alerte vous a été envoyé.` : "Tous vos points de contrôle actifs fonctionnent."}
            </p>
          )}

          <details className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6" open={checks.length === 0}>
            <summary className="cursor-pointer text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">Ajouter un point de contrôle</summary>
            <form action={createCheckAction} className="mt-5 grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="c-name" className="mb-1 block text-sm text-white/75">Nom</label>
                <input id="c-name" name="name" required maxLength={80} className={field} placeholder="Formulaire de devis" />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="c-kind" className="mb-1 block text-sm text-white/75">Type de parcours</label>
                <select id="c-kind" name="kind" className={field} defaultValue="form">
                  {(Object.keys(KIND_LABEL) as Kind[]).map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}
                </select>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="c-url" className="mb-1 block text-sm text-white/75">Adresse de la page à vérifier</label>
                <input id="c-url" name="url" required maxLength={500} className={field} placeholder="https://monsite.fr/contact" />
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="c-text" className="mb-1 block text-sm text-white/75">Texte qui doit apparaître sur la page (facultatif)</label>
                <input id="c-text" name="mustContain" maxLength={120} className={field} placeholder="Envoyer ma demande" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="c-freq" className="mb-1 block text-sm text-white/75">Vérifier toutes les</label>
                <select id="c-freq" name="frequency" className={field} defaultValue="60">
                  {Object.entries(FREQ_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="sm:col-span-6"><button type="submit" className={primary}>Ajouter</button></div>
            </form>
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              La V1 vérifie que la page répond correctement et que le texte attendu est présent (un bouton, un titre de formulaire). Elle n&apos;envoie pas de faux formulaire : l&apos;envoi réel n&apos;est pas testé.
            </p>
          </details>

          {checks.length === 0 && <p className="mt-8 text-white/60">Aucun point de contrôle pour l&apos;instant. Ajoutez-en un pour être alerté dès qu&apos;il lâche.</p>}

          <ul className="mt-8 space-y-4">
            {checks.map((c) => {
              const st = status(c);
              const s = statOf(c.id);
              const pct = s.up.total ? Math.round((s.up.ok / s.up.total) * 1000) / 10 : null;
              return (
                <li key={c.id} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold">{c.name}</h2>
                      <p className="mt-1 break-all text-sm text-white/55">{KIND_LABEL[c.kind]} · {c.url}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${st.tone}`}>{st.label}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    {c.last_checked_at ? `Dernière vérification : ${fmt(c.last_checked_at)}` : "En attente de la première vérification"}
                    {c.last_latency_ms !== null && c.last_ok ? ` · ${c.last_latency_ms} ms` : ""} · toutes les {FREQ_LABEL[c.frequency_minutes] ?? `${c.frequency_minutes} min`}
                  </p>
                  {c.last_ok === false && c.last_error && <p className="mt-2 rounded-lg bg-red-400/10 p-3 text-sm text-red-200">{c.last_error}</p>}
                  <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-black/25 p-3"><dt className="text-[11px] uppercase tracking-widest text-white/45">Dispo. 7 j</dt><dd className="mt-1 text-lg font-bold">{pct === null ? "—" : `${pct} %`}</dd></div>
                    <div className="rounded-xl bg-black/25 p-3"><dt className="text-[11px] uppercase tracking-widest text-white/45">Vérifs 7 j</dt><dd className="mt-1 text-lg font-bold">{s.up.total}</dd></div>
                    <div className="rounded-xl bg-black/25 p-3"><dt className="text-[11px] uppercase tracking-widest text-white/45">Incidents 30 j</dt><dd className="mt-1 text-lg font-bold">{s.inc}</dd></div>
                  </dl>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <form action={runNowAction}><input type="hidden" name="checkId" value={c.id} /><button type="submit" className={ghost}>Vérifier maintenant</button></form>
                    <form action={toggleCheckAction}><input type="hidden" name="checkId" value={c.id} /><input type="hidden" name="active" value={String(!c.active)} /><button type="submit" className={ghost}>{c.active ? "Mettre en pause" : "Reprendre"}</button></form>
                    <form action={deleteCheckAction}><input type="hidden" name="checkId" value={c.id} /><button type="submit" className={ghost}>Supprimer</button></form>
                  </div>
                </li>
              );
            })}
          </ul>

          <h2 className="mt-12 text-2xl font-bold">Historique des incidents</h2>
          {incidents.length === 0 ? (
            <p className="mt-3 text-white/60">Aucun incident enregistré.</p>
          ) : (
            <ul className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
              {incidents.map((i) => (
                <li key={i.id} className="p-4">
                  <p className="font-semibold">{nameOf(i.check_id)} <span className={`ml-2 text-xs ${i.resolved_at ? "text-emerald-300" : "text-red-300"}`}>{i.resolved_at ? "Résolu" : "En cours"}</span></p>
                  <p className="mt-1 text-sm text-white/60">Début {fmt(i.started_at)} · durée {duration(i.started_at, i.resolved_at)}{i.error ? ` · ${i.error}` : ""}</p>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-12 text-xs leading-relaxed text-white/45">
            SiteWatch est un complément à un suivi de disponibilité : il surveille les parcours qui rapportent des demandes, pas une surveillance continue 24 h/24 (fréquence minimale : 15 minutes). Pas de correction automatique des pannes.
          </p>
        </div>
      </section>
    </div>
  );
}
