import Link from "next/link";
import type { AssistantRecord } from "@/lib/assistant/schema";
import type { QuotePipelineStatus, QuoteRecord } from "@/lib/quote";
import { formatChfFromCents } from "@/lib/quote-payments";

type Props = {
  quotes: QuoteRecord[];
  assistantItems: AssistantRecord[];
};

type KpiCardProps = {
  label: string;
  value: string;
  hint: string;
};

const pipelineLabels: Record<QuotePipelineStatus, string> = {
  new: "Nouveau",
  qualified: "Qualifié",
  quote: "Devis envoyé",
  negotiation: "Négociation",
  won: "Gagné",
  lost: "Perdu",
};

const pipelineOrder: QuotePipelineStatus[] = ["new", "qualified", "quote", "negotiation", "won", "lost"];

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isWithinDays(value: string, days: number) {
  const submittedAt = new Date(value).getTime();
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  return Number.isFinite(submittedAt) && submittedAt >= threshold;
}

function getActivePipelineValue(item: QuoteRecord) {
  const pipeline = item.pipeline ?? "new";
  if (pipeline === "won" || pipeline === "lost") {
    return 0;
  }
  return Math.max(0, item.paymentTotalAmount ?? 0);
}

function getRecentDemandes(quotes: QuoteRecord[]) {
  return [...quotes].sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)).slice(0, 5);
}

function getRecentAssistant(assistantItems: AssistantRecord[]) {
  return [...assistantItems].sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)).slice(0, 5);
}

function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <div className="rounded-[26px] border border-white/12 bg-white/[0.04] p-5">
      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-white/45">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/60">{hint}</p>
    </div>
  );
}

export function AdminBusinessDashboard({ quotes, assistantItems }: Props) {
  const quotes30d = quotes.filter((item) => isWithinDays(item.submittedAt, 30));
  const assistant30d = assistantItems.filter((item) => isWithinDays(item.submittedAt, 30));
  const wonQuotes = quotes.filter((item) => (item.pipeline ?? "new") === "won");
  const qualifiedQuotes = quotes.filter((item) => ["qualified", "quote", "negotiation", "won"].includes(item.pipeline ?? "new"));
  const activePipelineValue = quotes.reduce((sum, item) => sum + getActivePipelineValue(item), 0);
  const collectedTotal = quotes.reduce((sum, item) => sum + Math.max(0, item.paymentPaidAmount ?? 0), 0);
  const remainingTotal = quotes.reduce(
    (sum, item) => sum + Math.max(0, (item.paymentTotalAmount ?? 0) - (item.paymentPaidAmount ?? 0)),
    0
  );
  const configuredPayments = quotes.filter((item) => (item.paymentTotalAmount ?? 0) > 0).length;
  const activePaymentLinks = quotes.filter((item) => item.paymentStatus === "pending").length;
  const hotLeads = assistantItems.filter((item) => item.score === "hot").length;
  const urgentLeads = assistantItems.filter((item) => item.score === "support_urgent").length;
  const newAssistant = assistantItems.filter((item) => item.status === "new").length;
  const avgWonTicket = wonQuotes.length
    ? Math.round(wonQuotes.reduce((sum, item) => sum + Math.max(0, item.paymentTotalAmount ?? 0), 0) / wonQuotes.length)
    : 0;

  const pipelineStats = pipelineOrder.map((status) => {
    const items = quotes.filter((quote) => (quote.pipeline ?? "new") === status);
    const totalValue = items.reduce((sum, item) => sum + Math.max(0, item.paymentTotalAmount ?? 0), 0);
    return {
      status,
      count: items.length,
      value: totalValue,
    };
  });

  const focusStats = [
    {
      label: "Web",
      count: quotes.filter((item) => (item.projectFocus ?? "web") === "web").length,
    },
    {
      label: "Mobile",
      count: quotes.filter((item) => item.projectFocus === "mobile").length,
    },
    {
      label: "Assistant projet",
      count: assistantItems.filter((item) => item.intent === "project_quote").length,
    },
  ];

  return (
    <section className="section-shell pt-10">
      <div className="premium-card rounded-[32px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Pilotage business</p>
            <h1 className="mt-3 text-3xl font-semibold">Vue claire sur demandes, pipeline, paiements et assistant</h1>
            <p className="mt-3 max-w-3xl text-sm text-white/70">
              On regroupe ici les chiffres utiles pour suivre le flux commercial réel, sans ouvrir trois vues différentes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/demandes?section=demandes&view=kanban" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200">
              Ouvrir le CRM
            </Link>
            <Link href="/admin/demandes?section=demandes&view=payments" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white">
              Suivre les paiements
            </Link>
            <Link href="/admin/demandes?section=assistant" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white">
              Traiter l'assistant
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Demandes 30 jours"
            value={String(quotes30d.length)}
            hint={`${qualifiedQuotes.length} dossiers déjà qualifiés sur ${quotes.length} au total.`}
          />
          <KpiCard
            label="Pipeline actif"
            value={formatChfFromCents(activePipelineValue)}
            hint="Valeur cumulée des dossiers non gagnés et non perdus avec montant configuré."
          />
          <KpiCard
            label="Encaissé"
            value={formatChfFromCents(collectedTotal)}
            hint={`${configuredPayments} dossiers paiement configurés, ${activePaymentLinks} liens actifs.`}
          />
          <KpiCard
            label="Assistant à traiter"
            value={String(newAssistant)}
            hint={`${hotLeads} leads chauds, ${urgentLeads} urgents support, ${assistant30d.length} entrées sur 30 jours.`}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Reste à encaisser"
            value={formatChfFromCents(remainingTotal)}
            hint="Montant configuré non encore reçu."
          />
          <KpiCard
            label="Dossiers gagnés"
            value={String(wonQuotes.length)}
            hint={`Panier moyen gagné : ${formatChfFromCents(avgWonTicket)}.`}
          />
          <KpiCard
            label="Conversion qualifiée"
            value={quotes.length ? `${Math.round((qualifiedQuotes.length / quotes.length) * 100)}%` : "0%"}
            hint="Part des dossiers passés au moins au stade qualifié."
          />
          <KpiCard
            label="Focus commercial"
            value={focusStats.map((item) => `${item.label} ${item.count}`).join(" / ")}
            hint="Répartition rapide des demandes par type dominant."
          />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Pipeline</p>
                <h2 className="mt-2 text-xl font-semibold">Répartition des dossiers</h2>
              </div>
              <Link href="/admin/demandes?section=demandes&view=kanban" className="text-xs uppercase tracking-[0.24em] text-white/60 transition hover:text-white">
                Voir le CRM
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {pipelineStats.map((stat) => (
                <div key={stat.status} className="grid gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 md:grid-cols-[1fr,auto,auto]">
                  <div>
                    <p className="font-medium text-white">{pipelineLabels[stat.status]}</p>
                    <p className="text-sm text-white/55">{stat.count} dossier(s)</p>
                  </div>
                  <p className="text-sm text-white/65">{formatChfFromCents(stat.value)}</p>
                  <div className="text-right text-xs uppercase tracking-[0.24em] text-white/35">{stat.status}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Paiements</p>
                <h2 className="mt-2 text-xl font-semibold">État d'encaissement</h2>
              </div>
              <Link href="/admin/demandes?section=demandes&view=payments" className="text-xs uppercase tracking-[0.24em] text-white/60 transition hover:text-white">
                Voir la vue paiements
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-sm text-white/60">Dossiers configurés</p>
                <p className="mt-1 text-2xl font-semibold text-white">{configuredPayments}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-sm text-white/60">Liens en attente</p>
                <p className="mt-1 text-2xl font-semibold text-white">{activePaymentLinks}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-sm text-white/60">Encaissement total</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatChfFromCents(collectedTotal)}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-sm text-white/60">Reste à facturer / encaisser</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatChfFromCents(remainingTotal)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Demandes récentes</p>
                <h2 className="mt-2 text-xl font-semibold">5 derniers dossiers</h2>
              </div>
              <Link href="/admin/demandes?section=demandes&view=pipeline" className="text-xs uppercase tracking-[0.24em] text-white/60 transition hover:text-white">
                Ouvrir la liste
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {getRecentDemandes(quotes).map((item) => (
                <div key={item.id ?? item.submittedAt} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-white/55">{item.companyName || "Sans société"} · {item.projectType}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">{formatShortDate(item.submittedAt)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                    <span className="rounded-full border border-white/10 px-3 py-1">{pipelineLabels[item.pipeline ?? "new"]}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">{item.budget}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">{item.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/20 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Assistant récent</p>
                <h2 className="mt-2 text-xl font-semibold">File de reprise humaine</h2>
              </div>
              <Link href="/admin/demandes?section=assistant" className="text-xs uppercase tracking-[0.24em] text-white/60 transition hover:text-white">
                Ouvrir l'assistant
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {getRecentAssistant(assistantItems).map((item) => (
                <div key={item.id ?? item.submittedAt} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{item.name || "Lead anonyme"}</p>
                      <p className="mt-1 text-sm text-white/55">{item.company || "Sans société"} · {item.projectType.replaceAll("_", " ")}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/35">{formatDateTime(item.submittedAt)}</p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                    <span className="rounded-full border border-white/10 px-3 py-1">{item.status === "new" ? "Nouveau" : "Traité"}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">{item.scoreLabel}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">{item.action.replaceAll("_", " ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
