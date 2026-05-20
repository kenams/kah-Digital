"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale";
import { FiArrowRight } from "react-icons/fi";

const WA_NUMBER = "33759558414";

export function FloatingCTA() {
  const { locale, prefix } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waText = encodeURIComponent(
    locale === "en"
      ? "Hi KAH Digital, I'd like to discuss my project."
      : locale === "de"
      ? "Hallo KAH Digital, ich möchte mein Projekt besprechen."
      : "Bonjour KAH Digital, je voudrais discuter de mon projet."
  );

  const ctaLabel =
    locale === "en" ? "Get a free quote" : locale === "de" ? "Kostenlose Offerte" : "Devis gratuit";

  const priceLine =
    locale === "en" ? "From $142 · 5-day delivery" : locale === "de" ? "Ab CHF 149 · 5 Tage" : "Dès 142 € · 5 jours";

  return (
    <div
      className={`fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-gray-950/95 px-2 py-2 shadow-2xl shadow-black/60 backdrop-blur-md">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] transition hover:bg-[#25D366]/25"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* Divider */}
        <div className="h-6 w-px bg-white/10" />

        {/* CTA button */}
        <Link
          href={`${prefix ?? ""}/devis`}
          className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:gap-4 hover:shadow-blue-500/35"
        >
          <span className="flex flex-col items-start leading-none">
            <span>{ctaLabel}</span>
            <span className="mt-0.5 text-[10px] font-medium text-white/60">{priceLine}</span>
          </span>
          <FiArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
