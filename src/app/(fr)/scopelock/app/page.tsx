import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/scopelock/auth";
import {
  findAccount, formatMoney, listEvents, listProjects, listRequests, type RequestStatus, type ScopeEvent, type ScopeRequest,
} from "@/lib/scopelock/store";
import { SITE_URL } from "@/lib/shared-metadata";
import { createProjectAction, createRequestAction, sendRequestAction } from "./actions";

export const metadata: Metadata = { title: "ScopeLock", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const STATUS: Record<RequestStatus, { label: string; tone: string }> = {
  draft: { label: "Brouillon", tone: "border-white/25 text-white/70" },
  sent: { label: "En attente du client", tone: "border-[#d6b36a]/60 bg-[#d6b36a]/10 text-[#f0d99b]" },
  accepted: { label: "Accepté", tone: "border-emerald-400/50 bg-emerald-400/10 text-emerald-200" },
  refused: { label: "Refusé", tone: "border-red-400/50 bg-red-400/10 text-red-200" },
};

const EVENT_LABEL: Record<string, string> = { created: "Créée", sent: "Envoyée au client", accepted: "Acceptée par le client", refused: "Refusée par le client" };

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(iso));

const field = "w-full rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2.5 text-white placeholder:text-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]";
const primary = "inline-flex rounded-full bg-[#d6b36a] px-5 py-2.5 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]";

const ERRORS: Record<string, string> = {
  projet: "Projet invalide : vérifiez le nom, le client et son adresse email.",
  demande: "Demande invalide : vérifiez le titre, le prix et le délai.",
  envoi: "L'email n'a pas pu être envoyé au client. La demande reste en brouillon, réessayez.",
};

export default async function ScopeLockAppPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const email = await getSessionEmail();
  const account = email ? await findAccount(email) : null;
  if (!account) redirect("/scopelock/connexion");
  const { erreur } = await searchParams;

  const projects = await listProjects(account.id);
  const requests = await listRequests(projects.map((p) => p.id));
  const events = await listEvents(requests.map((r) => r.id));
  const eventsBy = (id: string): ScopeEvent[] => events.filter((e) => e.request_id === id);
  const requestsBy = (id: string): ScopeRequest[] => requests.filter((r) => r.project_id === id);

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f0d99b]">ScopeLock · pilote</p>
              <h1 className="mt-2 text-3xl font-bold">Vos demandes de changement</h1>
              <p className="mt-2 text-sm text-white/60">Connecté : {account.email}</p>
            </div>
            <form action="/api/scopelock/logout" method="post">
              <button type="submit" className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">Se déconnecter</button>
            </form>
          </div>

          {erreur && ERRORS[erreur] && (
            <p role="alert" className="mt-6 rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{ERRORS[erreur]}</p>
          )}

          <details className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6" open={projects.length === 0}>
            <summary className="cursor-pointer text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">Nouveau projet</summary>
            <form action={createProjectAction} className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="p-name" className="mb-1 block text-sm text-white/75">Nom du projet</label>
                <input id="p-name" name="name" required maxLength={120} className={field} placeholder="Refonte site vitrine" />
              </div>
              <div>
                <label htmlFor="p-client" className="mb-1 block text-sm text-white/75">Nom du client</label>
                <input id="p-client" name="clientName" required maxLength={120} className={field} placeholder="Atelier Martin" />
              </div>
              <div>
                <label htmlFor="p-email" className="mb-1 block text-sm text-white/75">Email du client</label>
                <input id="p-email" name="clientEmail" type="email" required maxLength={200} className={field} placeholder="client@exemple.fr" />
              </div>
              <div className="sm:col-span-3"><button type="submit" className={primary}>Créer le projet</button></div>
            </form>
          </details>

          {projects.length === 0 && <p className="mt-8 text-white/60">Aucun projet pour l&apos;instant. Créez-en un pour soumettre votre première demande de changement.</p>}

          <div className="mt-8 space-y-8">
            {projects.map((project) => (
              <article key={project.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-xl font-bold">{project.name}</h2>
                <p className="text-sm text-white/60">Client : {project.client_name} · {project.client_email}</p>

                <ul className="mt-5 space-y-4">
                  {requestsBy(project.id).map((r) => {
                    const st = STATUS[r.status];
                    return (
                      <li key={r.id} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="font-semibold">{r.title}</h3>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${st.tone}`}>{st.label}</span>
                        </div>
                        {r.description && <p className="mt-2 whitespace-pre-line text-sm text-white/70">{r.description}</p>}
                        <p className="mt-3 text-sm text-white/85">
                          {formatMoney(r.price_cents, r.currency)} · {r.delay_days ? `${r.delay_days} jour${r.delay_days > 1 ? "s" : ""}` : "délai à convenir"}
                        </p>
                        {r.decision_note && <p className="mt-2 rounded-lg bg-white/[0.05] p-3 text-sm text-white/75">Message du client : {r.decision_note}</p>}
                        {r.status === "draft" && (
                          <form action={sendRequestAction} className="mt-4">
                            <input type="hidden" name="requestId" value={r.id} />
                            <button type="submit" className={primary}>Envoyer au client pour validation</button>
                          </form>
                        )}
                        {r.status === "sent" && (
                          <p className="mt-3 break-all text-xs text-white/50">Lien de validation : {SITE_URL}/scopelock/v/{r.token}</p>
                        )}
                        <ol className="mt-4 space-y-1 border-l border-white/15 pl-4 text-xs text-white/55">
                          {eventsBy(r.id).map((e) => (
                            <li key={e.id}>{fmtDate(e.created_at)} · {EVENT_LABEL[e.type] ?? e.type}</li>
                          ))}
                        </ol>
                      </li>
                    );
                  })}
                  {requestsBy(project.id).length === 0 && <li className="text-sm text-white/50">Aucune demande pour ce projet.</li>}
                </ul>

                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">+ Nouvelle demande de changement</summary>
                  <form action={createRequestAction} className="mt-4 grid gap-4 sm:grid-cols-6">
                    <input type="hidden" name="projectId" value={project.id} />
                    <div className="sm:col-span-6">
                      <label htmlFor={`t-${project.id}`} className="mb-1 block text-sm text-white/75">Titre</label>
                      <input id={`t-${project.id}`} name="title" required maxLength={160} className={field} placeholder="Ajouter une page Tarifs" />
                    </div>
                    <div className="sm:col-span-6">
                      <label htmlFor={`d-${project.id}`} className="mb-1 block text-sm text-white/75">Description</label>
                      <textarea id={`d-${project.id}`} name="description" rows={3} maxLength={4000} className={field} placeholder="Ce qui est demandé et ce qui n'est pas inclus." />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={`pr-${project.id}`} className="mb-1 block text-sm text-white/75">Prix</label>
                      <input id={`pr-${project.id}`} name="price" inputMode="decimal" required className={field} placeholder="450" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={`c-${project.id}`} className="mb-1 block text-sm text-white/75">Devise</label>
                      <select id={`c-${project.id}`} name="currency" className={field} defaultValue="EUR">
                        <option value="EUR">EUR €</option>
                        <option value="CHF">CHF</option>
                        <option value="USD">USD $</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor={`dl-${project.id}`} className="mb-1 block text-sm text-white/75">Délai (jours)</label>
                      <input id={`dl-${project.id}`} name="delayDays" type="number" min={0} max={3650} required className={field} placeholder="3" />
                    </div>
                    <div className="sm:col-span-6"><button type="submit" className={primary}>Enregistrer en brouillon</button></div>
                  </form>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
