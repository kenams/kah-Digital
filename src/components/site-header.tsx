"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BrandLockup } from "@/components/brand-lockup";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/lib/locale";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, prefix } = useLocale();
  const homeHref = prefix || "/";
  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  const localeCopy = locale === "en"
    ? {
        nav: [
          { label: "Home", href: "/en" },
          { label: "Offers", href: "/en/offres" },
          { label: "Portfolio", href: "/en/projets" },
          { label: "Quote", href: "/en/devis" },
          { label: "Contact", href: "/en/contact" },
        ],
        cta: "Free audit",
        ctaHref: "/en/audit-gratuit",
        subtitle: "AI Growth Systems",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        homeLabel: "KAH Digital - Home",
      }
    : locale === "de"
    ? {
        nav: [
          { label: "Startseite", href: "/de" },
          { label: "Angebote", href: "/de/offres" },
          { label: "Referenzen", href: "/de/projets" },
          { label: "Offerte", href: "/de/devis" },
          { label: "Kontakt", href: "/de/contact" },
        ],
        cta: "Kostenlos anfragen",
        ctaHref: "/de/devis",
        subtitle: "AI Growth Systems",
        openMenu: "Menü öffnen",
        closeMenu: "Menü schließen",
        homeLabel: "KAH Digital - Startseite",
      }
    : {
        nav: [
          { label: "Accueil", href: "/" },
          { label: "Offres", href: "/offres" },
          { label: "Réalisations", href: "/projets" },
          { label: "Références", href: "/references" },
          { label: "Blog", href: "/blog" },
          { label: "Devis", href: "/devis" },
          { label: "Contact", href: "/contact" },
        ],
        cta: "Audit gratuit",
        ctaHref: "/audit-gratuit",
        subtitle: "AI Growth Systems",
        openMenu: "Ouvrir le menu",
        closeMenu: "Fermer le menu",
        homeLabel: "KAH Digital - Accueil",
      };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={homeHref} className="shrink-0" aria-label={localeCopy.homeLabel}>
            <BrandLockup compact subtitle={localeCopy.subtitle} />
          </Link>

          <nav className="hidden items-center gap-4 text-sm lg:flex xl:gap-5 xl:text-base">
            {localeCopy.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Link
              href={localeCopy.ctaHref}
              className="whitespace-nowrap rounded-full border border-[#e0c48e]/50 bg-[linear-gradient(135deg,#f0ddb5,#c99747)] px-4 py-2 font-semibold text-[#18120b] shadow-[0_12px_34px_rgba(199,151,71,0.24)] transition hover:brightness-105"
            >
              {localeCopy.cta}
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white md:hidden"
            aria-label={isMenuOpen ? localeCopy.closeMenu : localeCopy.openMenu}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-white/10 py-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <Link href={homeHref} className="pb-2" onClick={() => setIsMenuOpen(false)} aria-label={localeCopy.homeLabel}>
                <BrandLockup compact subtitle={localeCopy.subtitle} />
              </Link>
              <div className="pb-2">
                <LanguageSwitcher />
              </div>
              {localeCopy.nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 transition-colors hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={withPrefix("/audit-gratuit")}
                className="rounded-full border border-[#e0c48e]/50 bg-[linear-gradient(135deg,#f0ddb5,#c99747)] px-4 py-2 text-center font-semibold text-[#18120b] shadow-[0_12px_34px_rgba(199,151,71,0.24)] transition hover:brightness-105"
                onClick={() => setIsMenuOpen(false)}
              >
                {localeCopy.cta}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
