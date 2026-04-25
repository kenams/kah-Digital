import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminAccessState = "ok" | "missing-auth" | "unauthorized" | "forbidden" | "mfa" | "error";

export function AdminStateCard(props: {
  tone: "rose" | "amber";
  eyebrow: string;
  title: string;
  body: string;
}) {
  const toneClass =
    props.tone === "rose"
      ? "border-rose-200/40 bg-rose-100/10 text-rose-200"
      : "border-amber-200/40 bg-amber-100/10 text-amber-200";

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6">
      <div className={`rounded-2xl border p-6 text-white ${toneClass}`}>
        <p className="text-xs uppercase tracking-[0.3em]">{props.eyebrow}</p>
        <p className="mt-2 text-lg font-semibold text-white">{props.title}</p>
        <p className="mt-2 text-sm text-white/70">{props.body}</p>
      </div>
    </div>
  );
}

export async function requireAdminAccess(): Promise<AdminAccessState> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) {
      return "missing-auth";
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return "unauthorized";
    }

    if (!isAdminUser(user)) {
      return "forbidden";
    }

    const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (mfaError || mfaData?.currentLevel !== "aal2") {
      return "mfa";
    }

    return "ok";
  } catch (error) {
    console.error("[admin] Access check failed", error);
    return "error";
  }
}

export function handleAdminAccessState(access: AdminAccessState) {
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
        eyebrow="Erreur d'authentification"
        title="Impossible de vérifier la session admin"
        body="Reconnecte-toi puis recharge la page. Si le problème continue, vérifie les cookies ou l'état Supabase."
      />
    );
  }

  if (access === "missing-auth") {
    return (
      <AdminStateCard
        tone="amber"
        eyebrow="Configuration requise"
        title="Supabase Auth non configuré"
        body="Ajoute NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY pour activer l'auth admin."
      />
    );
  }

  return null;
}
