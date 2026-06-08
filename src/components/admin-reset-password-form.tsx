"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

export function AdminResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let active = true;

    const checkRecoverySession = async () => {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        if (!active) return;
        setErrorMessage("Supabase Auth n'est pas configuré.");
        setCheckingSession(false);
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (!active) return;

      if (error || !data.session) {
        setErrorMessage("Lien de récupération invalide ou expiré.");
        setCheckingSession(false);
        return;
      }

      setSessionReady(true);
      setCheckingSession(false);
    };

    void checkRecoverySession();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!sessionReady) {
      setErrorMessage("Session de récupération introuvable.");
      return;
    }

    if (password.length < 10) {
      setErrorMessage("Choisis un mot de passe d'au moins 10 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setErrorMessage("Supabase Auth n'est pas configuré.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMessage(error.message || "Impossible de mettre à jour le mot de passe.");
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setSuccessMessage("Mot de passe mis à jour. Reconnecte-toi pour accéder à l'admin.");
    setLoading(false);
    window.setTimeout(() => {
      router.replace("/admin/login?info=password-reset");
      router.refresh();
    }, 1200);
  };

  return (
    <div className="section-shell">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col justify-center gap-6 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold">Nouveau mot de passe</h1>
          <p className="mt-3 text-sm text-white/70">
            Définis un nouveau mot de passe pour ton accès admin KAH Digital.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-2xl border border-rose-200/40 bg-rose-100/10 p-4 text-sm text-rose-200">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="rounded-2xl border border-emerald-200/40 bg-emerald-100/10 p-4 text-sm text-emerald-100">
            {successMessage}
          </div>
        )}

        {checkingSession ? (
          <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
            Vérification du lien de récupération...
          </div>
        ) : sessionReady ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-white/70">
              Nouveau mot de passe
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                placeholder="Au moins 10 caractères"
                required
              />
            </label>
            <label className="block text-sm text-white/70">
              Confirmation
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                placeholder="Retape le mot de passe"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Mise à jour..." : "Mettre à jour le mot de passe"}
            </button>
          </form>
        ) : null}

        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
          <Link href="/admin/login" className="transition hover:text-white">
            Retour à l'admin
          </Link>
          <Link href="/" className="transition hover:text-white">
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
