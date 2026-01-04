"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminSignOutButtonProps = {
  redirectTo?: string;
  className?: string;
  label?: string;
};

export function AdminSignOutButton({
  redirectTo = "/admin/login",
  className,
  label = "Se deconnecter",
}: AdminSignOutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await fetch("/api/admin/auth/logout", { method: "POST", credentials: "include" });
    router.replace(redirectTo);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className={
        className ??
        "rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      }
    >
      {loading ? "Deconnexion..." : label}
    </button>
  );
}
