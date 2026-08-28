import Link from "next/link";
import type { AssistantRecord } from "@/lib/assistant/schema";
import type { QuotePipelineStatus, QuoteRecord } from "@/lib/quote";
import { formatChfFromCents } from "@/lib/quote-payments";
import { formatEur } from "@/lib/portfolio";

export type PortfolioSummary = {
  count: number;
  clients: number;
  billed: number;
  collected: number;
};

type Props = {
  quotes: QuoteRecord[];
  assistantItems: AssistantRecord[];
  portfolio: PortfolioSummary;
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

const pipelineBadge: Record<QuotePipelineStatus, string> = {
  new: "border-white/12 text-white/55",
  qualified: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  quote: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  negotiation: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  won: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  lost: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const scoreBadge: Record<string, string> = {
  hot: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  low: "border-white/12 text-white/50",
  support_urgent: "border-rose-500/30 bg-rose-500/15 text-rose-300",
  out_of_scope: "border-white/8 text-white/35",
};

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
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
  const t = new Date(value).getTime();
  return Number.isFinite(t) && t >= Date.now() - days * 86400_000;
}

function getActivePipelineValue(item: QuoteRecord) {
  const p = item.pipeline ?? "new";
  if (p === "won" || p === "lost") return 0;
  return Math.max(0, item.paymentTotalAmount ?? 0);
}

function getRecentDemandes(quotes: QuoteRecord[]) {
  return [...quotes].sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)).slice(0, 6);
}

function getRecentAssistant(assistantItems: AssistantRecord[]) {
  return [...assistantItems].sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt)).slice(0, 6);
}

type KpiProps = {
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "emerald" | "amber" | "rose" | "sky";
  href?: string;
};

function KpiCard({ label, value, hint, tone = "default", href }: KpiProps) {
  const border =
    tone === "emerald" ? "border-emerald-500/20" :
    tone === "amber" ? "border-amber-500/20" :
    tone === "rose" ? "border-rose-500/20" :
    tone === "sky" ? "border-sky-500/20" :
    "border-white/8";

  const valueCls =
    tone === "emerald" ? "text-emerald-300" :
    tone === "amber" ? "text-amber-300" :
    tone === "rose" ? "text-rose-300" :
    tone === "sky" ? "text-sky-300" :
    "text-white";

  const inner = (
    <div className={`rounded-2xl border bg-white/[0.03] p-4 transition-all hover:bg-white/[0.055] ${border}`}>
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/40">{label}</p>
      <p className={`mt-3 text-3xl font-semibold tabular-nums ${valueCls}`}>{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-white/50">{hint}</p>
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

type AlertItem = { label: string; count: number; href: string; tone: "rose" | "amber" | "sky" };

export function AdminBusinessDashboard({ quotes, assistantItems, portfolio }: Props) {
  const quotes30d = quotes.filter((q) => isWithinDays(q.submittedAt, 30));
  const assistant30d = assistantItems.filter((a) => isWithinDays(a.submittedAt, 30));
  const wonQuotes = quotes.filter((q) => (q.pipeline ?? "new") === "won");
  const qualifiedQuotes = quotes.filter((q) =>
    ["qualified", "quote", "negotiation", "won"].includes(q.pipeline ?? "new")
  );
  const activePipelineValue = quotes.reduce((s, q) => s + getActivePipelineValue(q), 0);
  const collectedTotal = quotes.reduce((s, q) => s + Math.max(0, q.paymentPaidAmount ?? 0), 0);
  const remainingTotal = quotes.reduce(
    (s, q) => s + Math.max(0, (q.paymentTotalAmount ?? 0) - (q.paymentPaidAmount ?? 0)),
    0
  );
  const configuredPayments = quotes.filter((q) => (q.paymentTotalAmount ?? 0) > 0).length;
  const activePaymentLinks = quotes.filter((q) => q.paymentStatus === "pending").length;
  const hotLeads = assistantItems.filter((a) => a.score === "hot").length;
  const urgentLeads = assistantItems.filter((a) => a.score === "support_urgent").length;
  const newAssistant = assistantItems.filter((a) => a.status === "new").length;
  const conversionRate = quotes.length ? Math.round((qualifiedQuotes.length / quotes.length) * 100) : 0;

  const pipelineStats = pipelineOrder.map((status) => {
    const items = quotes.filter((q) => (q.pipeline ?? "new") === status);
    const totalValue = items.reduce((s, q) => s + Math.max(0, q.paymentTotalAmount ?? 0), 0);
    return { status, count: items.length, value: totalValue };
  });
  const maxPipelineCount = Math.max(1, ...pipelineStats.map((s) => s.count));

  // Build alerts
  const alerts: AlertItem[] = [];
  if (urgentLeads > 0)
    alerts.push({ label: `${urgentLeads} support urgent${urgentLeads > 1 ? "s" : ""} à traiter`, count: urgentLeads, href: "/admin/demandes?section=assistant", tone: "rose" });
  if (hotLeads > 0)
    alerts.push({ label: `${hotLeads} lead${hotLeads > 1 ? "s" : ""} chaud${hotLeads > 1 ? "s" : ""} en attente`, count: hotLeads, href: "/admin/demandes?section=assistant", tone: "amber" });
  if (activePaymentLinks > 0)
    alerts.push({ label: `${activePaymentLinks} lien${activePaymentLinks > 1 ? "s" : ""} paiement en attente`, count: activePaymentLinks, href: "/admin/demandes?section=demandes&view=payments", tone: "sky" });

  const alertBand: Record<AlertItem["tone"], string> = {
    rose: "border-rose-500/25 bg-rose-500/8 text-rose-300",
    amber: "border-amber-500/25 bg-amber-500/8 text-amber-300",
    sky: "border-sky-500/25 bg-sky-500/8 text-sky-300",
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.35em] text-white/40">Pilotage commercial</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Tableau de bord</h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/55">
            {portfolio.count} prestation{portfolio.count > 1 ? "s" : ""} · {portfolio.clients} client{portfolio.clients > 1 ? "s" : ""} · {quotes.length} demande{quotes.length > 1 ? "s" : ""} · {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long" })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/demandes?section=demandes&view=kanban"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-neutral-200"
          >
            Ouvrir le CRM
          </Link>
          <Link
            href="/admin/demandes?section=demandes&view=payments"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Paiements
          </Link>
          <Link
            href="/admin/demandes?section=assistant"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Assistant IA
          </Link>
          <Link
            href="/admin/prospection"
            className="rounded-full border border-violet-500/40 bg-violet-500/8 px-4 py-2 text-xs font-medium text-violet-300 transition hover:border-violet-400 hover:bg-violet-500/15"
          >
            Prospection IA
          </Link>
          <Link
            href="/admin/devis-generateur"
            className="rounded-full border border-sky-500/40 bg-sky-500/8 px-4 py-2 text-xs font-medium text-sky-300 transition hover:border-sky-400 hover:bg-sky-500/15"
          >
            Générateur PDF
          </Link>
        </div>
      </div>

      {/* Alert banners */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert) => (
            <Link
              key={alert.label}
              href={alert.href}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition hover:brightness-110 ${alertBand[alert.tone]}`}
            >
              <span>{alert.label}</span>
              <span className="text-xs opacity-70">Voir →</span>
            </Link>
          ))}
        </div>
      )}

      {/* KPIs row 1 — activité réelle KAH Digital */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Chiffre d'affaires"
          value={formatEur(portfolio.billed)}
          hint={`${portfolio.count} prestation${portfolio.count > 1 ? "s" : ""} livrée${portfolio.count > 1 ? "s" : ""} · ${portfolio.clients} client${portfolio.clients > 1 ? "s" : ""}`}
          tone={portfolio.billed > 0 ? "emerald" : "default"}
          href="/admin/portfolio"
        />
        <KpiCard
          label="Encaissé"
          value={formatEur(portfolio.collected)}
          hint="Prestations marquées payées"
          tone={portfolio.collected > 0 ? "emerald" : "default"}
          href="/admin/portfolio"
        />
        <KpiCard
          label="Demandes — 30 jours"
          value={String(quotes30d.length)}
          hint={`${qualifiedQuotes.length} dossiers qualifiés · ${quotes.length} au total`}
          tone={quotes30d.length > 0 ? "sky" : "default"}
          href="/admin/demandes?section=demandes&view=pipeline"
        />
        <KpiCard
          label="Assistant — à traiter"
          value={String(newAssistant)}
          hint={`${hotLeads} chauds · ${urgentLeads} urgents · ${assistant30d.length} sur 30 j`}
          tone={urgentLeads > 0 ? "rose" : hotLeads > 0 ? "amber" : newAssistant > 0 ? "sky" : "default"}
          href="/admin/demandes?section=assistant"
        />
      </div>

      {/* KPIs row 2 — pipeline & paiements devis (Stripe) */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Pipeline actif"
          value={formatChfFromCents(activePipelineValue)}
          hint="Valeur cumulée hors dossiers gagnés/perdus"
          tone={activePipelineValue > 0 ? "emerald" : "default"}
          href="/admin/demandes?section=demandes&view=kanban"
        />
        <KpiCard
          label="Encaissé devis (Stripe)"
          value={formatChfFromCents(collectedTotal)}
          hint={`${configuredPayments} dossiers configurés · ${activePaymentLinks} liens actifs`}
          tone={collectedTotal > 0 ? "emerald" : "default"}
          href="/admin/demandes?section=demandes&view=payments"
        />
        <KpiCard
          label="Reste à encaisser"
          value={formatChfFromCents(remainingTotal)}
          hint="Montant configuré non encore perçu"
          tone={remainingTotal > 0 ? "amber" : "default"}
          href="/admin/demandes?section=demandes&view=payments"
        />
        <KpiCard
          label="Taux de conversion"
          value={`${conversionRate}%`}
          hint={`${wonQuotes.length} gagné${wonQuotes.length > 1 ? "s" : ""} · part des demandes qualifiées`}
          tone={conversionRate >= 50 ? "emerald" : conversionRate >= 25 ? "amber" : "default"}
        />
      </div>

      {/* Pipeline + Payments */}
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr,0.6fr]">
        {/* Pipeline */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/38">Pipeline</p>
              <h2 className="mt-1.5 text-lg font-semibold">Répartition des dossiers</h2>
            </div>
            <Link
              href="/admin/demandes?section=demandes&view=kanban"
              className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
            >
              Ouvrir le CRM →
            </Link>
          </div>
          <div className="space-y-2.5">
            {pipelineStats.map((stat) => (
              <div key={stat.status} className="flex items-center gap-4">
                <div className="w-28 shrink-0">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.65rem] font-medium ${pipelineBadge[stat.status]}`}>
                    {pipelineLabels[stat.status]}
                  </span>
                </div>
                <div className="flex flex-1 items-center gap-3">
                  <div className="h-1.5 flex-1 rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full bg-white/25 transition-all"
                      style={{ width: `${(stat.count / maxPipelineCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-5 shrink-0 text-right text-sm font-semibold text-white/80">
                    {stat.count}
                  </span>
                </div>
                <span className="w-24 shrink-0 text-right text-xs text-white/45 tabular-nums">
                  {stat.value > 0 ? formatChfFromCents(stat.value) : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payments summary */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/38">Paiements</p>
              <h2 className="mt-1.5 text-lg font-semibold">Encaissements</h2>
            </div>
            <Link
              href="/admin/demandes?section=demandes&view=payments"
              className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
            >
              Détails →
            </Link>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Configurés", value: String(configuredPayments), tone: "default" },
              { label: "Liens actifs", value: String(activePaymentLinks), tone: activePaymentLinks > 0 ? "sky" : "default" },
              { label: "Encaissé", value: formatChfFromCents(collectedTotal), tone: collectedTotal > 0 ? "emerald" : "default" },
              { label: "Reste à percevoir", value: formatChfFromCents(remainingTotal), tone: remainingTotal > 0 ? "amber" : "emerald" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-xl border border-white/6 bg-black/15 px-4 py-2.5">
                <p className="text-xs text-white/55">{row.label}</p>
                <p className={`text-sm font-semibold tabular-nums ${
                  row.tone === "emerald" ? "text-emerald-300" :
                  row.tone === "amber" ? "text-amber-300" :
                  row.tone === "sky" ? "text-sky-300" :
                  "text-white/85"
                }`}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent items */}
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        {/* Recent demandes */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/38">Demandes récentes</p>
              <h2 className="mt-1.5 text-lg font-semibold">6 derniers dossiers</h2>
            </div>
            <Link
              href="/admin/demandes?section=demandes&view=pipeline"
              className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
            >
              Tous →
            </Link>
          </div>
          <div className="space-y-2">
            {getRecentDemandes(quotes).map((item) => {
              const pipeline = (item.pipeline ?? "new") as QuotePipelineStatus;
              return (
                <Link
                  key={item.id ?? item.submittedAt}
                  href={`/admin/demandes/${item.id ?? encodeURIComponent(item.submittedAt)}`}
                  className="block rounded-xl border border-white/6 bg-black/10 px-4 py-3 transition hover:border-white/14 hover:bg-black/20"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{item.name}</p>
                      <p className="mt-0.5 truncate text-xs text-white/45">
                        {item.companyName || "—"} · {item.projectType}
                      </p>
                    </div>
                    <p className="shrink-0 text-[0.65rem] text-white/30 tabular-nums">{formatShortDate(item.submittedAt)}</p>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.63rem] font-medium ${pipelineBadge[pipeline]}`}>
                      {pipelineLabels[pipeline]}
                    </span>
                    {item.budget && (
                      <span className="inline-block rounded-full border border-white/8 px-2.5 py-0.5 text-[0.63rem] text-white/45">
                        {item.budget}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent assistant */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/38">Assistant IA</p>
              <h2 className="mt-1.5 text-lg font-semibold">File de reprise</h2>
            </div>
            <Link
              href="/admin/demandes?section=assistant"
              className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
            >
              Tous →
            </Link>
          </div>
          <div className="space-y-2">
            {getRecentAssistant(assistantItems).map((item) => (
              <Link
                key={item.id ?? item.submittedAt}
                href={`/admin/assistant/${item.id ?? encodeURIComponent(item.submittedAt)}`}
                className="block rounded-xl border border-white/6 bg-black/10 px-4 py-3 transition hover:border-white/14 hover:bg-black/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{item.name || "Lead anonyme"}</p>
                    <p className="mt-0.5 truncate text-xs text-white/45">
                      {item.company || "—"} · {item.projectType.replaceAll("_", " ")}
                    </p>
                  </div>
                  <p className="shrink-0 text-[0.65rem] text-white/30 tabular-nums">{formatDateTime(item.submittedAt)}</p>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.63rem] font-medium ${scoreBadge[item.score] ?? scoreBadge.low}`}>
                    {item.scoreLabel}
                  </span>
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[0.63rem] ${item.status === "new" ? "border-white/12 text-white/55" : "border-white/6 text-white/30"}`}>
                    {item.status === "new" ? "À traiter" : "Traité"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
