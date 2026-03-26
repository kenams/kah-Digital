"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { BrandLockup } from "@/components/brand-lockup";
import { LanguageSwitcher } from "@/components/language-switcher";
import { stripLocalePrefix, useLocale } from "@/lib/locale";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, prefix } = useLocale();
  const homeHref = prefix || "/";
  const basePath = stripLocalePrefix(pathname);

  const localeCopy = {
    fr: {
      nav: [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projets", href: "/projets" },
        { label: "IA", href: "/automatisation-ia-entreprise" },
        { label: "Devis", href: "/devis" },
        { label: "Contact", href: "/contact" },
      ],
      cta: "Demander un devis",
      subtitle: "Studio web, IA et automatisation",
      badge: "Capture / Automatisation / Ops",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      homeLabel: "KAH-Digital - Accueil",
    },
    en: {
      nav: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projets" },
        { label: "AI", href: "/automatisation-ia-entreprise" },
        { label: "Quote", href: "/devis" },
        { label: "Contact", href: "/contact" },
      ],
      cta: "Request a quote",
      subtitle: "Web, AI, and automation studio",
      badge: "Capture / Automation / Ops",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      homeLabel: "KAH-Digital - Home",
    },
    de: {
      nav: [
        { label: "Start", href: "/" },
        { label: "Leistungen", href: "/services" },
        { label: "Projekte", href: "/projets" },
        { label: "KI", href: "/automatisation-ia-entreprise" },
        { label: "Anfrage", href: "/devis" },
        { label: "Kontakt", href: "/contact" },
      ],
      cta: "Projekt anfragen",
      subtitle: "Studio fuer Web, KI und Automatisierung",
      badge: "Capture / Automation / Ops",
      openMenu: "Menue oeffnen",
      closeMenu: "Menue schliessen",
      homeLabel: "KAH-Digital - Start",
    },
  }[locale];

  const withPrefix = (path: string) => (path === "/" ? homeHref : `${prefix}${path}`);
  const isActiveLink = (href: string) => {
    if (href === "/") return basePath === "/";
    return basePath === href || basePath.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(8,7,6,0.82)] backdrop-blur-xl">
      <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(214,179,106,0.55),rgba(127,184,199,0.45),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between gap-4">
          <Link href={homeHref} className="shrink-0" aria-label={localeCopy.homeLabel}>
            <BrandLockup compact subtitle={localeCopy.subtitle} />
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-2 lg:flex">
            {localeCopy.nav.map((link) => (
              <Link
                key={link.href}
                href={withPrefix(link.href)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActiveLink(link.href)
                    ? "border border-white/10 bg-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
                    : "text-white/72 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/50">
              {localeCopy.badge}
            </span>
            <LanguageSwitcher />
            <Link
              href={withPrefix("/devis")}
              className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[linear-gradient(135deg,#f0ddb5,#c99747)] px-4 py-2 font-semibold text-[#18120b] shadow-[0_12px_34px_rgba(199,151,71,0.24)] transition hover:brightness-105"
            >
              {localeCopy.cta}
              <FiArrowUpRight className="text-[0.95rem]" />
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 text-white md:hidden"
            aria-label={isMenuOpen ? localeCopy.closeMenu : localeCopy.openMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-white/10 py-4 md:hidden">
            <nav className="space-y-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-4">
              <Link href={homeHref} className="pb-2" onClick={() => setIsMenuOpen(false)} aria-label={localeCopy.homeLabel}>
                <BrandLockup compact subtitle={localeCopy.subtitle} />
              </Link>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{localeCopy.badge}</p>
              <div className="pb-2">
                <LanguageSwitcher />
              </div>
              {localeCopy.nav.map((link) => (
                <Link
                  key={link.href}
                  href={withPrefix(link.href)}
                  className={`block rounded-2xl px-4 py-3 transition ${
                    isActiveLink(link.href) ? "border border-white/10 bg-white/10 text-white" : "text-white/75 hover:bg-white/[0.05] hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={withPrefix("/devis")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[linear-gradient(135deg,#f0ddb5,#c99747)] px-4 py-3 text-center font-semibold text-[#18120b] shadow-[0_12px_34px_rgba(199,151,71,0.24)] transition hover:brightness-105"
                onClick={() => setIsMenuOpen(false)}
              >
                {localeCopy.cta}
                <FiArrowUpRight className="text-[0.95rem]" />
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
