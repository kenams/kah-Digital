"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BrandLockup } from "@/components/brand-lockup";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/lib/locale";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isEnglish, prefix } = useLocale();
  const homeHref = prefix || "/";

  const navLinks = isEnglish
    ? [
        { label: "Home", href: `${prefix}` || "/en" },
        { label: "Services", href: `${prefix}/services` },
        { label: "Projects", href: `${prefix}/projets` },
        { label: "GLPI", href: `${prefix}/services/glpi` },
        { label: "Quote", href: `${prefix}/devis` },
        { label: "Invoices", href: `${prefix}/factures` },
        { label: "Contact", href: `${prefix}/contact` },
      ]
    : [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projets", href: "/projets" },
        { label: "GLPI", href: "/services/glpi" },
        { label: "Devis", href: "/devis" },
        { label: "Factures", href: "/factures" },
        { label: "Contact", href: "/contact" },
      ];

  const ctaLabel = isEnglish ? "Request a quote" : "Demander un devis";
  const subtitle = isEnglish ? "Digital studio" : "Digital studio";

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link href={homeHref} className="shrink-0" aria-label="KAH-Digital - Home">
            <BrandLockup compact subtitle={subtitle} />
          </Link>

          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`${prefix}/devis`}
              className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link href={homeHref} className="pb-2" onClick={() => setIsMenuOpen(false)} aria-label="KAH-Digital - Home">
                <BrandLockup compact subtitle={subtitle} />
              </Link>
              <div className="pb-2">
                <LanguageSwitcher />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`${prefix}/devis`}
                className="bg-white text-black px-4 py-2 rounded-full font-semibold text-center hover:bg-gray-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {ctaLabel}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
