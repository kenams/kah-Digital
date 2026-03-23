import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminBusinessDashboard } from "@/components/admin-business-dashboard";
import { getRecentAssistantRecords } from "@/lib/assistant-store";
import { getRecentQuotes, isSupabaseConfigured } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

async function loadDashboardData() {
  try {
    const [quotes, assistantItems] = await Promise.all([getRecentQuotes(), getRecentAssistantRecords()]);
    return { kind: "ok" as const, quotes, assistantItems };
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

  return <AdminBusinessDashboard quotes={data.quotes} assistantItems={data.assistantItems} />;
}
