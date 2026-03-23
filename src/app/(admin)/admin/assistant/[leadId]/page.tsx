import { notFound } from "next/navigation";
import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminAssistantDetailPage } from "@/components/admin-assistant-detail-page";
import { getAssistantRecord } from "@/lib/assistant-store";
import { isSupabaseConfigured } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

export default async function AdminAssistantDetailRoute(props: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await props.params;
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  if (!isSupabaseConfigured()) {
    return (
      <AdminStateCard
        tone="amber"
        eyebrow="Configuration requise"
        title="Supabase non configuré"
        body="Ajoute SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY pour activer la persistance des leads assistant."
      />
    );
  }

  let item;
  try {
    item = await getAssistantRecord({ id: leadId, submittedAt: "" });
  } catch (error) {
    console.error("[admin] Failed to load assistant lead detail", error);
    return (
      <AdminStateCard
        tone="rose"
        eyebrow="Erreur de chargement"
        title="Impossible de charger ce lead assistant"
        body="Recharge la page ou reviens à la liste assistant. Si le problème continue, vérifie la connexion Supabase."
      />
    );
  }

  if (!item) {
    notFound();
  }

  return <AdminAssistantDetailPage initialItem={item} />;
}
