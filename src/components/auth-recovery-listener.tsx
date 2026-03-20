"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function clearHash() {
  if (typeof window === "undefined") return;
  const nextUrl = window.location.pathname;
  window.history.replaceState({}, document.title, nextUrl);
}

export function AuthRecoveryListener() {
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const syncRecoverySession = async () => {
      if (typeof window === "undefined") return;

      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const tokenHash = searchParams.get("token_hash");
      const searchType = searchParams.get("type");

      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const hashType = hashParams.get("type");

      if (!code && !(tokenHash && searchType === "recovery") && !accessToken) {
        return;
      }

      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        clearHash();
        if (active) {
          router.replace("/admin/login?error=session");
        }
        return;
      }

      let error: Error | null = null;

      if (code) {
        const result = await supabase.auth.exchangeCodeForSession(code);
        error = result.error;
      } else if (tokenHash && searchType === "recovery") {
        const result = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        });
        error = result.error;
      } else if (accessToken && refreshToken) {
        const result = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        error = result.error;
      } else if (hashType === "recovery") {
        error = new Error("Session de recuperation incomplete.");
      } else {
        return;
      }

      clearHash();

      if (!active) return;

      if (error) {
        router.replace("/admin/login?error=session");
        return;
      }

      router.replace("/admin/reset-password");
      router.refresh();
    };

    void syncRecoverySession();

    return () => {
      active = false;
    };
  }, [router]);

  return null;
}
