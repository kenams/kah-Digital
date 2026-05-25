import Link from "next/link";
import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminAssistantBoard } from "@/components/admin-assistant-board";
import { AdminDemandesBoard } from "@/components/admin-demandes-board";
import { AdminKahSupportBoard } from "@/components/admin-kah-support-board";
import { AdminPaymentsTable } from "@/components/admin-payments-table";
import { AdminPipelineKanban } from "@/components/admin-pipeline-kanban";
import { getRecentAssistantRecords } from "@/lib/assistant-store";
import { getRecentQuotes, isSupabaseConfigured } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

type AdminSection = "demandes" | "assistant" | "kah-support";
type DemandesView = "pipeline" | "kanban" | "payments";

async function loadAdminDemandesData() {
  try {
    const items = await getRecentQuotes();
    const assistantItems = await getRecentAssistantRecords();
    return { kind: "ok" as const, items, assistantItems };
  } catch (error) {
    console.error("[admin] Failed to load admin data", error);
    return { kind: "error" as const };
  }
}

function resolveSection(value?: string): AdminSection {
  if (value === "assistant") return "assistant";
  if (value === "kah-support") return "kah-support";
  return "demandes";
}

function resolveDemandesView(value?: string): DemandesView {
  if (value === "payments") return "payments";
  if (value === "kanban") return "kanban";
  return "pipeline";
}

function getTabClass(active: boolean) {
  return active
    ? "rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200"
    : "rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white";
}

function AdminWorkspaceTabs(props: { section: AdminSection; demandesView: DemandesView }) {
  return (
    <section className="section-shell pt-10">
      <div className="premium-card rounded-[32px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Admin workspace</p>
        <h1 className="mt-3 text-3xl font-semibold">Zone de travail claire pour demandes, paiements et assistant</h1>
        <p className="mt-3 max-w-3xl text-sm text-white/70">
          On sépare maintenant les flux : qualification commerciale, suivi paiement et résumés assistant.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/admin" className={getTabClass(false)}>
            Dashboard
          </Link>
          <Link
            href={`/admin/demandes?section=demandes&view=${props.demandesView}`}
            className={getTabClass(props.section === "demandes")}
          >
            Demandes
          </Link>
          <Link href="/admin/demandes?section=assistant" className={getTabClass(props.section === "assistant")}>
            Assistant
          </Link>
          <Link href="/admin/demandes?section=kah-support" className={getTabClass(props.section === "kah-support")}>
            🎯 KAH-Support GLPI
          </Link>
        </div>
        {props.section === "demandes" ? (
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link
              href="/admin/demandes?section=demandes&view=pipeline"
              className={getTabClass(props.demandesView === "pipeline")}
            >
              Liste
            </Link>
            <Link
              href="/admin/demandes?section=demandes&view=kanban"
              className={getTabClass(props.demandesView === "kanban")}
            >
              CRM
            </Link>
            <Link
              href="/admin/demandes?section=demandes&view=payments"
              className={getTabClass(props.demandesView === "payments")}
            >
              Paiements
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default async function AdminDemandesPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = (await props.searchParams) ?? {};
  const section = resolveSection(Array.isArray(searchParams.section) ? searchParams.section[0] : searchParams.section);
  const demandesView = resolveDemandesView(Array.isArray(searchParams.view) ? searchParams.view[0] : searchParams.view);
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  if (!isSupabaseConfigured()) {
    return (
      <AdminStateCard
        tone="amber"
        eyebrow="Configuration requise"
        title="Supabase non configuré"
        body="Ajoute SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY pour activer la persistance des demandes."
      />
    );
  }

  const data = await loadAdminDemandesData();
  if (data.kind === "error") {
    return (
      <AdminStateCard
        tone="rose"
        eyebrow="Erreur de chargement"
        title="Impossible de charger les demandes"
        body="Vérifie la connexion Supabase et les droits du service role."
      />
    );
  }

  return (
    <>
      <AdminWorkspaceTabs section={section} demandesView={demandesView} />
      {section === "kah-support" ? (
        <AdminKahSupportBoard />
      ) : section === "assistant" ? (
        <AdminAssistantBoard initialItems={data.assistantItems} />
      ) : demandesView === "payments" ? (
        <AdminPaymentsTable initialItems={data.items} />
      ) : demandesView === "kanban" ? (
        <AdminPipelineKanban initialItems={data.items} />
      ) : (
        <AdminDemandesBoard initialItems={data.items} view={demandesView} />
      )}
    </>
  );
}
