"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AmbientAudioToggleButton } from "./global-audio-provider";

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

  const ctaButton = useMemo(
    () => (
      <Link
        href="/cahier-des-charges.pdf"
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
      >
        Télécharger le PDF
      </Link>
    ),
    [],
  );

  return (
    <header className="site-header sticky top-0 z-50 bg-black/80 text-white backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
          onClick={() => setIsMenuOpen(false)}
        >
          Kah-Digital
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/80 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <AmbientAudioToggleButton />
          <Link
            href="/admin/demandes"
            prefetch={false}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
          >
            Admin
          </Link>
          {ctaButton}
        </div>
        <button
          className="md:hidden"
          type="button"
          aria-label="Ouvrir le menu"
          onClick={toggleMenu}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
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
            <Link
              href="/admin/demandes"
              prefetch={false}
              className="rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            <AmbientAudioToggleButton />
            {ctaButton}
          </div>
        </div>
      )}
    </header>
  );
}
