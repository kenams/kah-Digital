"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizePath, type Locale } from "@/lib/locale";

const labels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale: Locale = pathname === "/en" || pathname?.startsWith("/en/") ? "en" : "fr";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
      {(["fr", "en"] as const).map((locale) => {
        const active = currentLocale === locale;
        return (
          <Link
            key={locale}
            href={localizePath(pathname, locale)}
            className={`rounded-full px-3 py-1 transition ${
              active ? "bg-white text-black" : "text-white/70 hover:text-white"
            }`}
            aria-label={locale === "fr" ? "Afficher le site en francais" : "View the site in English"}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
