import { notFound } from "next/navigation";
import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminQuoteDetailPage } from "@/components/admin-quote-detail-page";
import { getQuoteActivity } from "@/lib/admin-activity-store";
import type { QuoteActivityRecord, QuoteRecord } from "@/lib/quote";
import { getQuoteRecord, isSupabaseConfigured } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

export default async function AdminQuoteDetailRoute(props: {
  params: Promise<{ quoteId: string }>;
}) {
  const { quoteId } = await props.params;
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

  let item: QuoteRecord | null | undefined;
  let activities: QuoteActivityRecord[] = [];
  try {
    item = await getQuoteRecord({ id: quoteId, submittedAt: "" });
    if (item) {
      activities = await getQuoteActivity({ id: item.id ?? quoteId, submittedAt: item.submittedAt });
    }
  } catch (error) {
    console.error("[admin] Failed to load quote detail", error);
    return (
      <AdminStateCard
        tone="rose"
        eyebrow="Erreur de chargement"
        title="Impossible de charger cette demande"
        body="Recharge la page ou reviens à la liste des demandes. Si le problème continue, vérifie la connexion Supabase."
      />
    );
  }

  if (!item) {
    notFound();
  }

  return <AdminQuoteDetailPage initialItem={item} initialActivities={activities} />;
}
