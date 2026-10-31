import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createPilotAuth } from "@/lib/pilot-auth";
import { buildDraft, daysLate, formatAmount, formatDateFr, LEVEL_LABEL, levelFor, todayParis } from "@/lib/relancecash/reminders";
import { findAccount, listEvents, listInvoices, type Invoice, type InvoiceEvent } from "@/lib/relancecash/store";
import { DraftEditor } from "./draft-card";
import { ImportForm } from "./import-form";
import { importCsvAction, markPaidAction, reminderSentAction, reopenAction } from "./actions";

export const metadata: Metadata = { title: "RelanceCash", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const auth = createPilotAuth("relancecash");

const ERRORS: Record<string, string> = {
  taille: "Fichier trop volumineux (600 Ko maximum).",
  import: "L'import a échoué. Réessayez ou vérifiez le fichier.",
};

const fmtDateTime = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Paris" }).format(new Date(iso));

const EVENT_LABEL = (e: InvoiceEvent) =>
  e.type === "imported" ? "Importée"
  : e.type === "paid" ? "Marquée payée"
  : e.type === "reopened" ? "Rouverte"
  : `Relance ${e.level ?? ""} envoyée`.trim();

const primary = "inline-flex rounded-full bg-[#d6b36a] px-4 py-2 text-sm font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]";
const ghost = "inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]";

type SP = { erreur?: string; crees?: string; maj?: string; ko?: string; details?: string };

export default async function RelanceCashAppPage({ searchParams }: { searchParams: Promise<SP> }) {
  const email = await auth.getSessionEmail();
  const account = email ? await findAccount(email) : null;
  if (!account) redirect("/relancecash/connexion");
  const sp = await searchParams;

  const invoices = await listInvoices(account.id);
  const events = await listEvents(invoices.map((i) => i.id));
  const eventsBy = (id: string) => events.filter((e) => e.invoice_id === id);
  const today = todayParis();
  const sender = account.name || account.email;

  const open = invoices.filter((i) => i.status === "open");
  const overdue = open
    .map((i) => ({ inv: i, late: daysLate(i.due_date, today) }))
    .filter((x) => x.late >= 1)
    .sort((a, b) => b.late - a.late);
  const upcoming = open.filter((i) => daysLate(i.due_date, today) < 1);
  const paid = invoices.filter((i) => i.status === "paid");

  const totals = new Map<string, number>();
  for (const { inv } of overdue) totals.set(inv.currency, (totals.get(inv.currency) ?? 0) + inv.amount_cents);

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#f0d99b]">RelanceCash · pilote</p>
              <h1 className="mt-2 text-3xl font-bold">Factures à relancer</h1>
              <p className="mt-2 text-sm text-white/60">Connecté : {account.email} · Situation au {formatDateFr(today)}</p>
            </div>
            <form action="/api/relancecash/logout" method="post">
              <button type="submit" className={ghost}>Se déconnecter</button>
            </form>
          </div>

          {sp.erreur && ERRORS[sp.erreur] && (
            <p role="alert" className="mt-6 rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{ERRORS[sp.erreur]}</p>
          )}
          {sp.crees !== undefined && (
            <div role="status" className="mt-6 rounded-xl border border-[#d6b36a]/40 bg-[#d6b36a]/10 p-4 text-sm text-white/85">
              <p>Import terminé : {sp.crees} nouvelle(s) facture(s), {sp.maj} mise(s) à jour{Number(sp.ko) > 0 ? `, ${sp.ko} ligne(s) ignorée(s)` : ""}.</p>
              {sp.details && <p className="mt-2 text-white/65">{sp.details}</p>}
            </div>
          )}

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <dt className="text-xs uppercase tracking-widest text-white/50">À relancer</dt>
              <dd className="mt-1 text-3xl font-bold text-[#f0d99b]">{overdue.length}</dd>
              <dd className="mt-1 text-sm text-white/60">{[...totals].map(([c, v]) => formatAmount(v, c)).join(" + ") || "Rien en retard"}</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <dt className="text-xs uppercase tracking-widest text-white/50">À venir</dt>
              <dd className="mt-1 text-3xl font-bold">{upcoming.length}</dd>
              <dd className="mt-1 text-sm text-white/60">pas encore échues</dd>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <dt className="text-xs uppercase tracking-widest text-white/50">Payées</dt>
              <dd className="mt-1 text-3xl font-bold">{paid.length}</dd>
              <dd className="mt-1 text-sm text-white/60">dans ce suivi</dd>
            </div>
          </dl>

          <details className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6" open={invoices.length === 0}>
            <summary className="cursor-pointer text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">Importer mes factures (CSV)</summary>
            <ImportForm action={importCsvAction} />
          </details>

          <h2 className="mt-12 text-2xl font-bold">À relancer</h2>
          {overdue.length === 0 && <p className="mt-3 text-white/60">{invoices.length ? "Aucune facture en retard. Bravo." : "Importez vos factures pour voir lesquelles relancer."}</p>}
          <ul className="mt-5 space-y-5">
            {overdue.map(({ inv, late }) => (
              <OverdueCard key={inv.id} inv={inv} late={late} events={eventsBy(inv.id)} sender={sender} />
            ))}
          </ul>

          {upcoming.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-bold">À venir</h2>
              <ul className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
                {upcoming.map((inv) => (
                  <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-semibold">{inv.number} · {inv.client_name}</p>
                      <p className="text-sm text-white/60">{formatAmount(inv.amount_cents, inv.currency)} · échéance {formatDateFr(inv.due_date)}</p>
                    </div>
                    <form action={markPaidAction}>
                      <input type="hidden" name="invoiceId" value={inv.id} />
                      <button type="submit" className={ghost}>Marquer payée</button>
                    </form>
                  </li>
                ))}
              </ul>
            </>
          )}

          {paid.length > 0 && (
            <details className="mt-12">
              <summary className="cursor-pointer text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">Payées ({paid.length})</summary>
              <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
                {paid.map((inv) => (
                  <li key={inv.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-semibold">{inv.number} · {inv.client_name}</p>
                      <p className="text-sm text-white/60">{formatAmount(inv.amount_cents, inv.currency)}{inv.paid_at ? ` · payée le ${fmtDateTime(inv.paid_at)}` : ""}</p>
                    </div>
                    <form action={reopenAction}>
                      <input type="hidden" name="invoiceId" value={inv.id} />
                      <button type="submit" className={ghost}>Rouvrir</button>
                    </form>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <p className="mt-12 text-xs leading-relaxed text-white/45">
            RelanceCash ne fait ni comptabilité, ni paiement, ni recouvrement : il vous aide à ne rien oublier. Vous relisez et envoyez vous-même chaque relance. Aucune facture n&apos;est transmise à une IA.
          </p>
        </div>
      </section>
    </div>
  );
}

function OverdueCard({ inv, late, events, sender }: { inv: Invoice; late: number; events: InvoiceEvent[]; sender: string }) {
  const level = levelFor(late)!;
  const draft = buildDraft(level, {
    number: inv.number, clientName: inv.client_name, amountCents: inv.amount_cents, currency: inv.currency, dueDate: inv.due_date, late, sender,
  });
  const lastSent = [...events].reverse().find((e) => e.type === "reminder_sent");
  return (
    <li className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{inv.number} · {inv.client_name}</h3>
          <p className="mt-1 text-sm text-white/65">
            {formatAmount(inv.amount_cents, inv.currency)} · échue le {formatDateFr(inv.due_date)} ·{" "}
            <strong className="text-[#f0d99b]">{late} jour{late > 1 ? "s" : ""} de retard</strong>
          </p>
        </div>
        <span className="rounded-full border border-[#d6b36a]/60 bg-[#d6b36a]/10 px-3 py-1 text-xs font-semibold text-[#f0d99b]">
          Niveau {level} · {LEVEL_LABEL[level]}
        </span>
      </div>
      {lastSent && (
        <p className="mt-3 text-sm text-white/60">Dernière relance : niveau {lastSent.level} le {fmtDateTime(lastSent.created_at)}.</p>
      )}
      <DraftEditor to={inv.client_email} subject={draft.subject} body={draft.body} />
      <div className="mt-4 flex flex-wrap gap-3">
        <form action={reminderSentAction}>
          <input type="hidden" name="invoiceId" value={inv.id} />
          <input type="hidden" name="level" value={level} />
          <button type="submit" className={primary}>J&apos;ai envoyé cette relance</button>
        </form>
        <form action={markPaidAction}>
          <input type="hidden" name="invoiceId" value={inv.id} />
          <button type="submit" className={ghost}>Marquer payée</button>
        </form>
      </div>
      <ol className="mt-4 space-y-1 border-l border-white/15 pl-4 text-xs text-white/55">
        {events.map((e) => (
          <li key={e.id}>{fmtDateTime(e.created_at)} · {EVENT_LABEL(e)}</li>
        ))}
      </ol>
    </li>
  );
}
