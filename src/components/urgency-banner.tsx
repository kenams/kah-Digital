"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/lib/locale";

const STORAGE_KEY = "kah_urgency_v4";

const copy = {
  fr: {
    msg: "Échange de cadrage offert · Proposition personnalisée sous 24h · Disponible CH / FR / BE",
    cta: "Parler de mon projet →",
  },
  en: {
    msg: "Free scoping call · Custom proposal within 24h · Available CH / FR / BE",
    cta: "Discuss my project →",
  },
  de: {
    msg: "Kostenloses Erstgespräch · Individuelle Offerte in 24h · Verfügbar CH / DE",
    cta: "Projekt besprechen →",
  },
} as const;

export function UrgencyBanner() {
  const { locale, prefix } = useLocale();
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) !== "1";
  });

  if (!show) return null;

  const c = copy[locale];
  const href = `${prefix ?? ""}/devis`;

  return (
    <div className="relative z-50 flex items-center justify-center gap-3 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-white/10 px-10 py-2.5 text-center text-xs font-medium text-white/80 sm:text-sm">
      <span className="hidden sm:inline">{c.msg}</span>
      <span className="sm:hidden">Proposition personnalisée · 24h</span>
      <Link
        href={href}
        className="rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-semibold text-white transition hover:bg-white/20"
      >
        {c.cta}
      </Link>
      <button
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, "1");
          setShow(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white/80"
        aria-label="Fermer"
      >
        ✕
      </button>
    </div>
  );
}
