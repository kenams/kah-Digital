"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale";
import { orderHref, pageCurrency } from "@/lib/order-links";
import { formatMoney } from "@/lib/pack-orders";

const STORAGE_KEY = "kah_urgency_v4";

export function UrgencyBanner() {
  const { locale, prefix } = useLocale();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(localStorage.getItem(STORAGE_KEY) !== "1");
  }, []);

  if (!show) return null;

  const msg =
    locale === "en"
      ? "Free scoping call · Custom proposal within 24h · Available CH / FR / BE"
      : locale === "de"
      ? "Kostenloses Erstgespräch · Individuelle Offerte innert 24h · Verfügbar CH / FR / BE"
      : "Échange de cadrage offert · Proposition personnalisée sous 24h · Disponible CH / FR / BE";

  const short =
    locale === "en" ? "Custom proposal · 24h" : locale === "de" ? "Individuelle Offerte · 24h" : "Proposition personnalisée · 24h";
  const cta = locale === "en" ? "Discuss my project →" : locale === "de" ? "Projekt besprechen →" : "Parler de mon projet →";
  const from = formatMoney(290, pageCurrency(locale, pathname));
  const orderCta = locale === "en" ? `Order from ${from}` : locale === "de" ? `Ab ${from} bestellen` : `Commander dès ${from}`;
  const closeLabel = locale === "en" ? "Close" : locale === "de" ? "Schliessen" : "Fermer";
  const href = `${prefix ?? ""}/devis`;

  return (
    <div className="relative z-50 flex items-center justify-center gap-3 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-white/10 px-10 py-2.5 text-center text-xs font-medium text-white/80 sm:text-sm">
      <span className="hidden sm:inline">{msg}</span>
      <span className="sm:hidden">{short}</span>
      <Link
        href={href}
        className="rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-semibold text-white transition hover:bg-white/20"
      >
        {cta}
      </Link>
      <Link
        href={orderHref(locale, { pathname })}
        className="hidden rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-3 py-0.5 text-xs font-semibold text-[#f3d089] transition hover:bg-[#e0c48e]/20 md:inline-block"
      >
        {orderCta}
      </Link>
      <button
        onClick={() => { localStorage.setItem(STORAGE_KEY, "1"); setShow(false); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white/80"
        aria-label={closeLabel}
      >
        ✕
      </button>
    </div>
  );
}
