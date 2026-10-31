import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatMoney, getByToken } from "@/lib/scopelock/store";
import { decideAction } from "./actions";

export const metadata: Metadata = { title: "Demande de changement", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(iso));

export default async function ValidationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) notFound();
  const request = await getByToken(token);
  if (!request || request.status === "draft") notFound();
  const project = request.scopelock_projects;
  const decided = request.status === "accepted" || request.status === "refused";

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f0d99b]">Demande de changement</p>
          <h1 className="mt-2 text-3xl font-bold">{request.title}</h1>
          <p className="mt-2 text-white/60">Projet : {project.name} · pour {project.client_name}</p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            {request.description && <p className="whitespace-pre-line leading-relaxed text-white/80">{request.description}</p>}
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs uppercase tracking-widest text-white/50">Estimation</dt>
                <dd className="mt-1 text-2xl font-bold text-[#f0d99b]">{formatMoney(request.price_cents, request.currency)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-white/50">Délai</dt>
                <dd className="mt-1 text-2xl font-bold text-[#f0d99b]">{request.delay_days ? `${request.delay_days} j` : "À convenir"}</dd>
              </div>
            </dl>
          </div>

          {decided ? (
            <div role="status" className={`mt-6 rounded-2xl border p-5 ${request.status === "accepted" ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-100" : "border-red-400/50 bg-red-400/10 text-red-100"}`}>
              <p className="font-semibold">{request.status === "accepted" ? "Vous avez accepté cette demande." : "Vous avez refusé cette demande."}</p>
              {request.decided_at && <p className="mt-1 text-sm opacity-80">Enregistré le {fmtDate(request.decided_at)}.</p>}
              {request.decision_note && <p className="mt-2 text-sm opacity-90">Votre message : {request.decision_note}</p>}
            </div>
          ) : (
            <form action={decideAction} className="mt-6 space-y-4">
              <input type="hidden" name="token" value={token} />
              <div>
                <label htmlFor="note" className="mb-1 block text-sm text-white/75">Un message pour votre prestataire (facultatif)</label>
                <textarea id="note" name="note" rows={3} maxLength={1000} className="w-full rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" name="decision" value="accepted" className="inline-flex justify-center rounded-full bg-[#d6b36a] px-7 py-3 font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]">Accepter la demande</button>
                <button type="submit" name="decision" value="refused" className="inline-flex justify-center rounded-full border border-white/25 px-7 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]">Refuser</button>
              </div>
            </form>
          )}

          <p className="mt-8 text-xs leading-relaxed text-white/45">
            Votre réponse est enregistrée avec la date et l&apos;heure. Ce n&apos;est pas une signature électronique certifiée : c&apos;est un historique qui clarifie ce qui a été accepté ou refusé. Propulsé par ScopeLock, pilote KAH Digital Studio.
          </p>
        </div>
      </section>
    </div>
  );
}
