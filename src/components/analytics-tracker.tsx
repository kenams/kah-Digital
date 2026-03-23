"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const trackedPaths = new Set([
  "/devis",
  "/devis/mvp",
  "/configurateur",
  "/offres",
  "/en/devis",
  "/en/devis/mvp",
  "/en/configurateur",
  "/en/offres",
  "/de/devis",
  "/de/devis/mvp",
  "/de/configurateur",
  "/de/offres",
]);

function getLocaleFromPath(pathname: string) {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/de")) return "de";
  return "fr";
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    trackEvent("page_view", {
      page_path: pathname,
      page_locale: getLocaleFromPath(pathname),
    });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (!trackedPaths.has(url.pathname)) return;

      const label = (link.textContent ?? "").trim().slice(0, 80);
      trackEvent("cta_click", {
        cta_destination: url.pathname,
        cta_text: label || undefined,
        cta_locale: getLocaleFromPath(url.pathname),
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
