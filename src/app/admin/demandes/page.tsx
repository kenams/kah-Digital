import { redirect } from "next/navigation";
import { AdminDemandesBoard } from "@/components/admin-demandes-board";
import { isAdminUser } from "@/lib/auth";
import { getRecentQuotes, isSupabaseConfigured } from "@/lib/quote-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function requireAdminAccess() {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return "missing-auth" as const;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return "unauthorized" as const;
    }

    if (!isAdminUser(user)) {
      return "forbidden" as const;
    }

    const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (mfaError || mfaData?.currentLevel !== "aal2") {
      return "mfa" as const;
    }

    return "ok" as const;
  } catch (error) {
    console.error("[admin] Access check failed", error);
    return "error" as const;
  }
}

export default async function AdminDemandesPage() {
  try {
    const access = await requireAdminAccess();
    if (access === "unauthorized") {
      redirect("/admin/login");
    }
    if (access === "forbidden") {
      redirect("/admin/login?error=forbidden");
    }
    if (access === "mfa") {
      redirect("/admin/login?error=mfa");
    }
    if (access === "error") {
      return (
        <div className="section-shell">
          <div className="premium-card rounded-3xl border border-rose-200/40 bg-rose-100/10 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Erreur d&apos;authentification</p>
            <p className="mt-2 text-lg font-semibold">Impossible de verifier la session admin</p>
            <p className="mt-2 text-sm text-white/70">
              Reconnecte-toi puis recharge la page. Si le probleme continue, verifie les cookies ou l&apos;etat Supabase.
            </p>
          </div>
        </div>
      );
    }

    if (access === "missing-auth") {
      return (
        <div className="section-shell">
          <div className="premium-card rounded-3xl border border-amber-200/40 bg-amber-100/10 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Configuration requise</p>
            <p className="mt-2 text-lg font-semibold">Supabase Auth non configure</p>
            <p className="mt-2 text-sm text-white/70">
              Ajoute NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY pour activer l&apos;auth admin.
            </p>
          </div>
        </div>
      );
    }

    if (!isSupabaseConfigured()) {
      return (
        <div className="section-shell">
          <div className="premium-card rounded-3xl border border-amber-200/40 bg-amber-100/10 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Configuration requise</p>
            <p className="mt-2 text-lg font-semibold">Supabase non configure</p>
            <p className="mt-2 text-sm text-white/70">
              Ajoute SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY pour activer la persistance des demandes.
            </p>
          </div>
        </div>
      );
    }

    let items: Awaited<ReturnType<typeof getRecentQuotes>> | null = null;
    let hasError = false;

    try {
      items = await getRecentQuotes();
    } catch (error) {
      console.error("[admin] Failed to load quotes", error);
      hasError = true;
    }

    if (hasError) {
      return (
        <div className="section-shell">
          <div className="premium-card rounded-3xl border border-rose-200/40 bg-rose-100/10 p-6 text-white">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Erreur de chargement</p>
            <p className="mt-2 text-lg font-semibold">Impossible de charger les demandes</p>
            <p className="mt-2 text-sm text-white/70">
              Verifie la connexion Supabase et les droits du service role.
            </p>
          </div>
        </div>
      );
    }

    return <AdminDemandesBoard initialItems={items ?? []} />;
  } catch (error) {
    console.error("[admin] Unexpected error on /admin/demandes", error);
    return (
      <div className="section-shell">
        <div className="premium-card rounded-3xl border border-rose-200/40 bg-rose-100/10 p-6 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Erreur serveur</p>
          <p className="mt-2 text-lg font-semibold">Une erreur technique est survenue</p>
          <p className="mt-2 text-sm text-white/70">
            Recharge la page. Si le probleme continue, je regarde les logs Vercel.
          </p>
        </div>
      </div>
    );
  }
}
