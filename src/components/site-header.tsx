"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Sites web", href: "/#services" },
  { label: "Apps MVP", href: "/#apps" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Configurateur", href: "/configurateur" },
  { label: "FAQ", href: "/#faq" },
  { label: "Lexique", href: "/lexique" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const ctaButton = (
    <Link
      href="/cahier-des-charges.pdf"
      className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
    >
      Télécharger le PDF
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-black/80 text-white backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          Kah-Digital
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">{ctaButton}</div>
        <button
          className="md:hidden"
          type="button"
          aria-label="Ouvrir le menu"
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
          </div>
        </button>
      </div>
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 transition hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {ctaButton}
          </div>
        </div>
      )}
    </header>
  );
}
