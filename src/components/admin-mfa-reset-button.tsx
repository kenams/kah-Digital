"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminMfaResetButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (typeof window !== "undefined" && !window.confirm("Reinitialiser le MFA ?")) {
      return;
    }

    setLoading(true);
    setMessage("");
    const response = await fetch("/api/admin/auth/mfa/reset", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setMessage(data?.error || "Erreur pendant la reinitialisation MFA.");
      setLoading(false);
      return;
    }

    router.replace("/admin/login?info=mfa-reset");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2 text-xs text-white/60">
      <button
        type="button"
        onClick={handleReset}
        disabled={loading}
        className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "MFA..." : "Reset MFA"}
      </button>
      {message && <span className="text-white/60">{message}</span>}
    </div>
  );
}
