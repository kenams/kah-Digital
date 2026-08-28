import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminBusinessDashboard } from "@/components/admin-business-dashboard";
import { getRecentAssistantRecords } from "@/lib/assistant-store";
import { getRecentQuotes, isSupabaseConfigured } from "@/lib/quote-store";
import { listPortfolioProjects } from "@/lib/portfolio-store";
import type { PortfolioSummary } from "@/components/admin-business-dashboard";

async function loadPortfolioSummary(): Promise<PortfolioSummary> {
  try {
    const projects = await listPortfolioProjects();
    const clients = new Set(projects.map((p) => p.client.trim().toLowerCase()));
    let billed = 0;
    let collected = 0;
    for (const project of projects) {
      const price = typeof project.priceEur === "number" ? project.priceEur : 0;
      if (project.status === "livre" || project.status === "paye") billed += price;
      if (project.status === "paye") collected += price;
    }
    return { count: projects.length, clients: clients.size, billed, collected };
  } catch (error) {
    console.error("[admin] Failed to load portfolio summary", error);
    return { count: 0, clients: 0, billed: 0, collected: 0 };
  }
}

export const dynamic = "force-dynamic";

async function loadDashboardData() {
  try {
    const [quotes, assistantItems, portfolio] = await Promise.all([
      getRecentQuotes(),
      getRecentAssistantRecords(),
      loadPortfolioSummary(),
    ]);
    return { kind: "ok" as const, quotes, assistantItems, portfolio };
  } catch (error) {
    console.error("[admin] Failed to load overview dashboard", error);
    return { kind: "error" as const };
  }
}

export default async function AdminRootPage() {
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  if (!isSupabaseConfigured()) {
    return (
      <AdminStateCard
        tone="amber"
        eyebrow="Configuration requise"
        title="Supabase non configuré"
        body="Ajoute SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY pour activer le dashboard admin."
      />
    );
  }

  const data = await loadDashboardData();
  if (data.kind === "error") {
    return (
      <AdminStateCard
        tone="rose"
        eyebrow="Erreur de chargement"
        title="Impossible de charger le dashboard admin"
        body="Vérifie la connexion Supabase et recharge la page."
      />
    );
  }

  return (
    <AdminBusinessDashboard
      quotes={data.quotes}
      assistantItems={data.assistantItems}
      portfolio={data.portfolio}
    />
  );
}
