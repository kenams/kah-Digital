"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Compte les pages vues de façon anonyme (aucun cookie, aucune adresse IP conservée) pour le tableau de bord admin.
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || /^(\/(en|de))?\/(admin|api)/.test(pathname)) return;
    try {
      const service = new URLSearchParams(window.location.search).get("service");
      void fetch("/api/track/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, service, referrer: document.referrer }),
        keepalive: true,
      }).catch(() => undefined);
    } catch {
      /* mesure indisponible : sans effet pour le visiteur */
    }
  }, [pathname]);

  return null;
}
