"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AmbientAudioToggleButton } from "./global-audio-provider";
import { AdminSignOutButton } from "@/components/admin-signout-button";
import { getAlternateLocalePath, useLocale } from "@/lib/locale";

export function SiteHeader() {
  const { isEnglish, prefix, pathname } = useLocale();
  const alternateLocale = getAlternateLocalePath(pathname ?? "/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pdfHref = isEnglish ? "/cahier-des-charges.en.pdf" : "/cahier-des-charges.pdf";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinks = useMemo(
    () =>
      isEnglish
        ? [
            { label: "Websites", href: `${prefix}/#services` },
            { label: "Mobile apps", href: `${prefix}/#apps` },
            { label: "Portfolio", href: `${prefix}/#portfolio` },
            { label: "Offers", href: `${prefix}/offres` },
            { label: "Quote", href: `${prefix}/devis` },
            { label: "FAQ", href: `${prefix}/#faq` },
            { label: "Glossary", href: `${prefix}/lexique` },
          ]
        : [
            { label: "Sites web", href: `${prefix}/#services` },
            { label: "Apps MVP", href: `${prefix}/#apps` },
            { label: "Portfolio", href: `${prefix}/#portfolio` },
            { label: "Offres", href: `${prefix}/offres` },
            { label: "Devis", href: `${prefix}/devis` },
            { label: "FAQ", href: `${prefix}/#faq` },
            { label: "Lexique", href: `${prefix}/lexique` },
          ],
    [isEnglish, prefix],
  );

  const ctaButton = useMemo(
    () => (
      <a
        href={pdfHref}
        target="_blank"
        rel="noreferrer"
        download
        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
      >
        {isEnglish ? "Download the PDF" : "Telecharger le PDF"}
      </a>
    ),
    [isEnglish, pdfHref],
  );

  useEffect(() => {
    let active = true;

    const loadStatus = async () => {
      try {
        const response = await fetch("/api/admin/auth/status", { credentials: "include" });
        if (!response.ok) {
          if (active) setIsAdmin(false);
          return;
        }
        const data = await response.json().catch(() => ({}));
        if (active) {
          setIsAdmin(Boolean(data?.isAdmin && data?.mfaActive));
        }
      } catch {
        if (active) setIsAdmin(false);
      }
    };

    void loadStatus();
    const handleFocus = () => {
      void loadStatus();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      active = false;
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 bg-black/80 text-white backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href={prefix || "/"}
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
          <Link
            href={`${prefix}/configurateur`}
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 transition hover:border-white hover:text-white"
          >
            {isEnglish ? "Quick quote" : "Devis express"}
          </Link>
          <AmbientAudioToggleButton compact />
          {isAdmin && (
            <>
              <Link
                href="/admin/demandes"
                prefetch={false}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
              >
                Admin
              </Link>
              <AdminSignOutButton
                redirectTo={prefix || "/"}
                label={isEnglish ? "Sign out" : "Deconnexion"}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/60 transition hover:border-white hover:text-white"
              />
            </>
          )}
          <Link
            href={alternateLocale.path}
            className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white hover:text-white"
          >
            {alternateLocale.locale === "en" ? "EN" : "FR"}
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
              href={`${prefix}/configurateur`}
              className="rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {isEnglish ? "Quick quote" : "Devis express"}
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/admin/demandes"
                  prefetch={false}
                  className="rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white/80 transition hover:border-white hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <AdminSignOutButton
                  redirectTo={prefix || "/"}
                  label={isEnglish ? "Sign out" : "Deconnexion"}
                  className="rounded-full border border-white/20 px-4 py-2 text-center text-sm font-semibold text-white/60 transition hover:border-white hover:text-white"
                />
              </>
            )}
            <AmbientAudioToggleButton />
            <Link
              href={alternateLocale.path}
              className="rounded-full border border-white/20 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {alternateLocale.locale === "en" ? "EN" : "FR"}
            </Link>
            {ctaButton}
          </div>
        </div>
      )}
    </header>
  );
}
