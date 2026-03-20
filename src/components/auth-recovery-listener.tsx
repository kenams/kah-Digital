"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function clearHash() {
  if (typeof window === "undefined") return;
  const nextUrl = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState({}, document.title, nextUrl);
}

export function AuthRecoveryListener() {
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const syncRecoverySession = async () => {
      if (typeof window === "undefined" || !window.location.hash) return;

      const params = new URLSearchParams(window.location.hash.slice(1));
      const type = params.get("type");
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (type !== "recovery") {
        return;
      }

      const supabase = createSupabaseBrowserClient();
      if (!supabase || !accessToken || !refreshToken) {
        clearHash();
        if (active) {
          router.replace("/admin/login?error=session");
        }
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

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
