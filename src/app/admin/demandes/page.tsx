import { redirect } from "next/navigation";
import { AdminAssistantBoard } from "@/components/admin-assistant-board";
import { AdminDemandesBoard } from "@/components/admin-demandes-board";
import { getRecentAssistantRecords } from "@/lib/assistant-store";
import { isAdminUser } from "@/lib/auth";
import { getRecentQuotes, isSupabaseConfigured } from "@/lib/quote-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function AdminStateCard(props: { tone: "rose" | "amber"; eyebrow: string; title: string; body: string }) {
  const toneClass =
    props.tone === "rose"
      ? "border-rose-200/40 bg-rose-100/10 text-rose-200"
      : "border-amber-200/40 bg-amber-100/10 text-amber-200";

  return (
    <div className="section-shell">
      <div className={`premium-card rounded-3xl border p-6 text-white ${toneClass}`}>
        <p className="text-xs uppercase tracking-[0.3em]">{props.eyebrow}</p>
        <p className="mt-2 text-lg font-semibold text-white">{props.title}</p>
        <p className="mt-2 text-sm text-white/70">{props.body}</p>
      </div>
    </div>
  );
}

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

export default async function AdminDemandesPage() {
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
      <AdminStateCard
        tone="rose"
        eyebrow="Erreur d&apos;authentification"
        title="Impossible de verifier la session admin"
        body="Reconnecte-toi puis recharge la page. Si le probleme continue, verifie les cookies ou l&apos;etat Supabase."
      />
    );
  }
  if (access === "missing-auth") {
    return (
      <AdminStateCard
        tone="amber"
        eyebrow="Configuration requise"
        title="Supabase Auth non configure"
        body="Ajoute NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY pour activer l&apos;auth admin."
      />
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <AdminStateCard
        tone="amber"
        eyebrow="Configuration requise"
        title="Supabase non configure"
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
        body="Verifie la connexion Supabase et les droits du service role."
      />
    );
  }

  return (
    <>
      <AdminAssistantBoard initialItems={data.assistantItems} />
      <AdminDemandesBoard initialItems={data.items} />
    </>
  );
}
