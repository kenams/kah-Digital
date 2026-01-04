"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

type AdminLoginFormProps = {
  errorParam?: string | null;
  infoParam?: string | null;
};

const ATTEMPT_KEY = "kah_admin_login_attempts";
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const LOCK_MS = 10 * 60 * 1000;

type AttemptState = {
  attempts: number;
  windowStart: number;
  lockUntil?: number;
};

function loadAttemptState(): AttemptState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ATTEMPT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttemptState;
    if (!parsed || typeof parsed.windowStart !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveAttemptState(state: AttemptState | null) {
  if (typeof window === "undefined") return;
  if (!state) {
    window.localStorage.removeItem(ATTEMPT_KEY);
    return;
  }
  window.localStorage.setItem(ATTEMPT_KEY, JSON.stringify(state));
}

function normalizeAttemptState(state: AttemptState | null, now: number): AttemptState {
  if (!state) {
    return { attempts: 0, windowStart: now };
  }
  if (state.lockUntil && state.lockUntil <= now) {
    return { attempts: 0, windowStart: now };
  }
  if (now - state.windowStart > WINDOW_MS) {
    return { attempts: 0, windowStart: now };
  }
  return state;
}

function registerFailedAttempt(state: AttemptState, now: number) {
  const attempts = state.attempts + 1;
  if (attempts >= MAX_ATTEMPTS) {
    return { ...state, attempts, lockUntil: now + LOCK_MS };
  }
  return { ...state, attempts };
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function AdminLoginForm({ errorParam, infoParam }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mfaMode, setMfaMode] = useState<"none" | "setup" | "verify">("none");
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaQrCode, setMfaQrCode] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState("");
  const [mfaLoading, setMfaLoading] = useState(false);
  const [requestTimedOut, setRequestTimedOut] = useState(false);
  const [lockUntil, setLockUntil] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const state = loadAttemptState();
    if (!state?.lockUntil) return null;
    if (state.lockUntil <= Date.now()) return null;
    return state.lockUntil;
  });
  const [lockRemaining, setLockRemaining] = useState("");

  const missingConfig =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    const state = loadAttemptState();
    if (!state?.lockUntil) return;
    if (state.lockUntil <= Date.now()) {
      saveAttemptState(null);
    }
  }, []);

  useEffect(() => {
    if (!lockUntil) return;
    const tick = () => {
      const remaining = lockUntil - Date.now();
      if (remaining <= 0) {
        setLockUntil(null);
        setLockRemaining("");
        saveAttemptState(null);
        return;
      }
      setLockRemaining(formatRemaining(remaining));
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [lockUntil]);

  const beginMfaFlow = async () => {
    const response = await fetch("/api/admin/auth/mfa", { credentials: "include" });
    if (response.status === 401) {
      return "none";
    }

    if (response.status === 403) {
      const data = await response.json().catch(() => ({}));
      setErrorMessage(data?.error || "Compte non autorise.");
      return "error";
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setErrorMessage(data?.error || "Erreur MFA.");
      return "error";
    }

    const data = await response.json().catch(() => ({}));
    if (data?.status === "active") {
      return "done";
    }

    if (data?.status === "verify") {
      setMfaMode("verify");
      setMfaFactorId(data.factorId ?? null);
      setMfaQrCode(null);
      return "pending";
    }

    if (data?.status === "setup") {
      setMfaMode("setup");
      setMfaFactorId(data.factorId ?? null);
      setMfaQrCode(data.qrCode ?? null);
      return "pending";
    }

    setErrorMessage("Erreur MFA.");
    return "error";
  };

  useEffect(() => {
    let active = true;

    const init = async () => {
      setErrorMessage("");
      setLoading(true);
      const result = await beginMfaFlow();
      if (!active) return;
      if (result === "none") {
        setLoading(false);
        return;
      }
      setLoading(false);
      if (result === "done") {
        saveAttemptState(null);
        router.replace("/admin/demandes");
        router.refresh();
      }
    };

    void init();

    return () => {
      active = false;
    };
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setRequestTimedOut(false);
    setMfaMode("none");
    setMfaFactorId(null);
    setMfaQrCode(null);

    if (missingConfig) {
      setErrorMessage("Supabase Auth n'est pas configure.");
      return;
    }

    const now = Date.now();
    const attemptState = normalizeAttemptState(loadAttemptState(), now);
    if (attemptState.lockUntil && attemptState.lockUntil > now) {
      setLockUntil(attemptState.lockUntil);
      setErrorMessage(
        `Trop de tentatives. Reessaie dans ${formatRemaining(attemptState.lockUntil - now)}.`,
      );
      return;
    }

    setLoading(true);
    let didTimeout = false;
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      setRequestTimedOut(true);
      setLoading(false);
      setErrorMessage("Connexion trop lente. Reessaie dans quelques secondes.");
    }, 12000);

    const loginResponse = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email.trim(), password }),
    });

    window.clearTimeout(timeoutId);
    if (didTimeout) {
      return;
    }

    if (!loginResponse.ok) {
      const data = await loginResponse.json().catch(() => ({}));
      const nextState = registerFailedAttempt(attemptState, now);
      saveAttemptState(nextState);
      if (nextState.lockUntil && nextState.lockUntil > now) {
        setLockUntil(nextState.lockUntil);
        setErrorMessage(
          `Trop de tentatives. Reessaie dans ${formatRemaining(nextState.lockUntil - now)}.`,
        );
      } else {
        setErrorMessage(data?.error || "Identifiants invalides.");
      }
      setLoading(false);
      return;
    }

    const result = await beginMfaFlow();
    if (didTimeout) {
      return;
    }
    setLoading(false);
    if (result === "done") {
      saveAttemptState(null);
      router.replace("/admin/demandes");
      router.refresh();
    }
  };

  const bannerMessage =
    errorParam === "forbidden"
      ? "Compte non autorise. Verifie le role admin."
      : errorParam === "mfa"
        ? "MFA requis pour acceder a l'admin."
        : errorParam === "session"
          ? "Session expiree ou non connectee."
        : "";

  const infoMessage =
    infoParam === "mfa-reset" ? "MFA reinitialise. Reconnecte-toi pour le reconfigurer." : "";

  const handleMfaVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!mfaFactorId) {
      setErrorMessage("Facteur MFA introuvable.");
      return;
    }

    setMfaLoading(true);
    const verifyResponse = await fetch("/api/admin/auth/mfa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ factorId: mfaFactorId, code: mfaCode.trim() }),
    });

    if (!verifyResponse.ok) {
      const data = await verifyResponse.json().catch(() => ({}));
      setErrorMessage(data?.error || "Code MFA invalide.");
      setMfaLoading(false);
      return;
    }

    saveAttemptState(null);
    router.replace("/admin/demandes");
    router.refresh();
  };

  return (
    <div className="section-shell">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col justify-center gap-6 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-6 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0f2c]/60 via-black/10 to-[#1f1244]/70" />
            <Image
              src="/mockups/global-dashboard.svg"
              alt="Apercu dashboard Kah-Digital"
              width={640}
              height={320}
              className="relative h-32 w-full object-cover opacity-80"
              priority
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40">
              <Image src="/favicon.svg" alt="Kah-Digital" width={20} height={20} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Admin</p>
              <h1 className="mt-1 text-2xl font-semibold">Connexion</h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/70">
            Connecte-toi avec un compte Supabase ayant le role <span className="font-semibold">admin</span>.
          </p>
        </div>

        {bannerMessage && (
          <div className="rounded-2xl border border-amber-200/40 bg-amber-100/10 p-4 text-sm text-amber-100">
            {bannerMessage}
          </div>
        )}

        {infoMessage && (
          <div className="rounded-2xl border border-emerald-200/40 bg-emerald-100/10 p-4 text-sm text-emerald-100">
            {infoMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-2xl border border-rose-200/40 bg-rose-100/10 p-4 text-sm text-rose-200">
            {errorMessage}
          </div>
        )}

        {missingConfig && !errorMessage && (
          <div className="rounded-2xl border border-amber-200/40 bg-amber-100/10 p-4 text-sm text-amber-100">
            Renseigne NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY pour activer l&apos;auth.
          </div>
        )}

        {mfaMode === "none" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm text-white/70">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                placeholder="ton@email.com"
                required
              />
            </label>
            <label className="block text-sm text-white/70">
              Mot de passe
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                placeholder="********"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading || missingConfig || Boolean(lockUntil)}
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
            {requestTimedOut && (
              <p className="text-xs uppercase tracking-[0.3em] text-amber-100">
                Connexion en attente. Recharge la page si besoin.
              </p>
            )}
            {lockRemaining && (
              <p className="text-xs uppercase tracking-[0.3em] text-amber-100">
                Verrouillage temporaire {lockRemaining}
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleMfaVerify} className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
              {mfaMode === "setup" ? (
                <>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">MFA requis</p>
                  <p className="mt-2">
                    Scanne le QR code avec Google Authenticator / Authy puis entre le code.
                  </p>
                  {mfaQrCode && (
                    <Image
                      src={mfaQrCode}
                      alt="QR code MFA"
                      width={160}
                      height={160}
                      unoptimized
                      className="mt-4 h-40 w-40 rounded-xl border border-white/10 bg-white p-2"
                    />
                  )}
                </>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Verification MFA</p>
                  <p className="mt-2">Entre le code de ton application d&apos;authentification.</p>
                </>
              )}
            </div>
            <label className="block text-sm text-white/70">
              Code MFA
              <input
                type="text"
                inputMode="numeric"
                value={mfaCode}
                onChange={(event) => setMfaCode(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                placeholder="123456"
                required
              />
            </label>
            <button
              type="submit"
              disabled={mfaLoading || !mfaFactorId}
              className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mfaLoading ? "Verification..." : "Valider le code"}
            </button>
          </form>
        )}


        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
          <Link href="/" className="transition hover:text-white">
            Retour accueil
          </Link>
          <Link href="/devis" className="transition hover:text-white">
            Devis
          </Link>
        </div>
      </div>
    </div>
  );
}
