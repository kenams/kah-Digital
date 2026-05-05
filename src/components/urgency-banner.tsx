"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale";

const STORAGE_KEY = "kah_urgency_v2";

const copy = {
  fr: {
    msg: "⚡ 2 créneaux disponibles en mai · Prix fixe · Devis sous 24h",
    cta: "Démarrer →",
  },
  en: {
    msg: "⚡ 2 project slots left in May · Fixed price · Quote in 24h",
    cta: "Start →",
  },
  de: {
    msg: "⚡ 2 freie Plätze im Mai · Festpreis · Angebot in 24h",
    cta: "Starten →",
  },
} as const;

export function UrgencyBanner() {
  const { locale, prefix } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setShow(!dismissed);
  }, []);

  if (!show) return null;

  const c = copy[locale];
  const href = `${prefix ?? ""}/devis`;

  return (
    <div className="relative z-50 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-700 via-violet-700 to-purple-700 px-10 py-2 text-center text-xs font-medium text-white sm:text-sm">
      <span className="hidden sm:inline">{c.msg}</span>
      <span className="sm:hidden">⚡ 2 créneaux mai · Prix fixe</span>
      <Link
        href={href}
        className="rounded-full border border-white/30 bg-white/15 px-3 py-0.5 text-xs font-semibold transition hover:bg-white/25"
      >
        {c.cta}
      </Link>
      <button
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, "1");
          setShow(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
        aria-label="Fermer"
      >
        ✕
      </button>
    </div>
  );
}
