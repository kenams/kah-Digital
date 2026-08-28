import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminPortfolioBoard } from "@/components/admin-portfolio-board";
import { isPortfolioStoreConfigured, listPortfolioProjects } from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  if (!isPortfolioStoreConfigured()) {
    return (
      <AdminStateCard
        tone="amber"
        eyebrow="Configuration requise"
        title="Supabase non configuré"
        body="Ajoute SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY pour activer le portfolio clients."
      />
    );
  }

  let items;
  try {
    items = await listPortfolioProjects();
  } catch (error) {
    console.error("[admin] Failed to load portfolio", error);
    return (
      <AdminStateCard
        tone="rose"
        eyebrow="Erreur de chargement"
        title="Impossible de charger le portfolio"
        body="Vérifie la connexion Supabase et recharge la page."
      />
    );
  }

  return <AdminPortfolioBoard initialItems={items} />;
}
