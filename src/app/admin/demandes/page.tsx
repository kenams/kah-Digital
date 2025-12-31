import { AdminDemandesBoard } from "@/components/admin-demandes-board";
import { getRecentQuotes, isSupabaseConfigured } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

export default async function AdminDemandesPage() {
  if (!isSupabaseConfigured()) {
    return (
      <div className="section-shell">
        <div className="rounded-3xl border border-amber-200/40 bg-amber-100/10 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Configuration requise</p>
          <p className="mt-2 text-lg font-semibold">Supabase non configuré</p>
          <p className="mt-2 text-sm text-white/70">
            Ajoute SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY pour activer la persistance des demandes.
          </p>
        </div>
      </div>
    );
  }

  try {
    const items = await getRecentQuotes();
    return <AdminDemandesBoard initialItems={items} />;
  } catch (error) {
    console.error("[admin] Failed to load quotes", error);
    return (
      <div className="section-shell">
        <div className="rounded-3xl border border-rose-200/40 bg-rose-100/10 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Erreur de chargement</p>
          <p className="mt-2 text-lg font-semibold">Impossible de charger les demandes</p>
          <p className="mt-2 text-sm text-white/70">
            Vérifie la connexion Supabase et les droits du service role.
          </p>
        </div>
      </div>
    );
  }
}
