"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { BrandLockup } from "@/components/brand-lockup";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/lib/locale";
import { orderHref } from "@/lib/order-links";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const { locale, prefix } = useLocale();
  const pathname = usePathname();
  const homeHref = prefix || "/";
  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  const localeCopy = locale === "en"
    ? {
        nav: [
          { label: "Home", href: "/en" },
          { label: "Offers", href: "/en/offres" },
          { label: "AI Agents", href: "/en/agents-ia", highlight: true },
          { label: "Cybersecurity", href: "/en/cybersecurite" },
          { label: "Portfolio", href: "/en/projets" },
          { label: "Order", href: "/en/commander", accent: true },
          { label: "Quote", href: "/en/devis" },
          { label: "Contact", href: "/en/contact" },
        ],
        cta: "Free audit",
        ctaHref: "/en/audit-gratuit",
        subtitle: "AI Growth Systems",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        homeLabel: "KAH Digital Studio - Home",
      }
    : locale === "de"
    ? {
        nav: [
          { label: "Startseite", href: "/de" },
          { label: "Angebote", href: "/de/offres" },
          { label: "KI-Agenten", href: "/de/agents-ia", highlight: true },
          { label: "Cybersicherheit", href: "/de/cybersecurite" },
          { label: "Referenzen", href: "/de/projets" },
          { label: "Bestellen", href: "/de/commander", accent: true },
          { label: "Offerte", href: "/de/devis" },
          { label: "Kontakt", href: "/de/contact" },
        ],
        cta: "Kostenlos anfragen",
        ctaHref: "/de/devis",
        subtitle: "AI Growth Systems",
        openMenu: "Menü öffnen",
        closeMenu: "Menü schließen",
        homeLabel: "KAH Digital Studio - Startseite",
      }
    : {
        nav: [
          { label: "Accueil", href: "/" },
          { label: "Offres", href: "/offres" },
          { label: "Créer mon entreprise", href: "/creation-entreprise" },
          { label: "Agents IA", href: "/agents-ia", highlight: true },
          { label: "Cybersécurité", href: "/cybersecurite" },
          { label: "Réalisations", href: "/projets" },
          { label: "Références", href: "/references" },
          { label: "Blog", href: "/blog" },
          { label: "Commander", href: "/commander", accent: true },
          { label: "Devis", href: "/devis" },
          { label: "Contact", href: "/contact" },
        ],
        cta: "Audit gratuit",
        ctaHref: "/audit-gratuit",
        subtitle: "AI Growth Systems",
        openMenu: "Ouvrir le menu",
        closeMenu: "Fermer le menu",
        homeLabel: "KAH Digital Studio - Accueil",
      };

  const isActive = (href: string) => {
    const path = pathname.replace(/\/$/, "") || "/";
    return href === homeHref ? path === (homeHref.replace(/\/$/, "") || "/") : path === href || path.startsWith(`${href}/`);
  };

  // Hystérésis : la capsule se forme après 48px de scroll et ne se rouvre qu'en revenant tout en haut (pas de scintillement).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 8 : y > 48));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // L'indicateur doré glisse vers le lien survolé, ou revient sur la page active.
  const placePill = useCallback(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const target =
      (hovered && nav.querySelector<HTMLElement>(`[data-nav-href="${hovered}"]`)) ||
      nav.querySelector<HTMLElement>('[aria-current="page"]');
    if (!target || target.offsetWidth === 0) {
      pill.dataset.ready = "false";
      return;
    }
    pill.style.width = `${target.offsetWidth + 12}px`;
    pill.style.height = `${target.offsetHeight + 6}px`;
    pill.style.transform = `translate(${target.offsetLeft - 6}px, ${target.offsetTop - 3}px)`;
    pill.dataset.ready = "true";
    pill.dataset.hover = hovered && target.getAttribute("aria-current") !== "page" ? "true" : "false";
  }, [hovered]);

  useLayoutEffect(() => {
    placePill();
  }, [placePill, pathname, locale, scrolled]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(placePill);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [placePill]);

  const onShellPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.setProperty("--mx", `${event.clientX - shell.getBoundingClientRect().left}px`);
  };

  return (
    <header className="pointer-events-none sticky top-0 z-50 h-[68px] md:h-[88px]">
      <div
        ref={shellRef}
        data-scrolled={scrolled}
        onPointerMove={onShellPointerMove}
        className="kah-navshell pointer-events-auto"
      >
      <div className={`mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 min-[1680px]:max-w-[1600px] ${isMenuOpen ? "overflow-visible" : ""}`}>
        <div className="flex h-full items-center justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          <Link href={homeHref} className="shrink-0 !overflow-visible xl:justify-self-start" aria-label={localeCopy.homeLabel}>
            <span className="kah-navlogo block">
              <BrandLockup compact subtitle={localeCopy.subtitle} />
            </span>
          </Link>

          <nav
            ref={navRef}
            onPointerLeave={() => setHovered(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(null);
            }}
            className="relative hidden items-center gap-4 text-sm xl:flex xl:justify-self-center xl:gap-2.5 xl:text-[13px] min-[1536px]:gap-3 min-[1536px]:text-sm min-[1680px]:gap-3.5">
            <span ref={pillRef} className="kah-navpill" aria-hidden="true" />
            {localeCopy.nav.map((link) => {
              // Sous 1536px la barre déborde (9 liens + langues + CTA) : on masque les
              // liens secondaires (accueil = logo, références, blog, création d'entreprise) jusqu'à 1680px.
              const active = isActive(link.href);
              const secondary = link.href === homeHref || /\/(references|blog|creation-entreprise)$/.test(link.href) || (locale === "de" && /\/devis$/.test(link.href)); // DE : « Offerte » = doublon du bouton « Kostenlos anfragen » (/de/devis)
              return (
              <Link
                key={link.href}
                data-nav-href={link.href}
                href={(link as { accent?: boolean }).accent ? orderHref(locale, { pathname }) : link.href}
                aria-current={active ? "page" : undefined}
                onPointerEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                className={`relative ${(link as { highlight?: boolean }).highlight
                  ? "whitespace-nowrap rounded-full bg-violet-600/20 px-3 py-1 text-violet-300 ring-1 ring-violet-500/40 transition-colors hover:bg-violet-600/30 hover:text-violet-200"
                  : (link as { accent?: boolean }).accent
                  ? "whitespace-nowrap font-semibold text-[#e0c48e] transition-colors hover:text-[#f3d089]"
                  : `whitespace-nowrap text-white/80 transition-colors hover:text-white ${secondary ? "hidden min-[1680px]:inline" : ""}`}`}
              >
                {(link as { highlight?: boolean }).highlight && <span className="mr-1">⚡</span>}{link.label}
              </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:ml-auto md:flex xl:ml-0 xl:justify-self-end">
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
            className="text-white xl:hidden"
            aria-label={isMenuOpen ? localeCopy.closeMenu : localeCopy.openMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="absolute inset-x-0 top-full max-h-[calc(100vh-90px)] overflow-y-auto border-y border-white/10 bg-black/95 px-4 py-4 backdrop-blur-xl sm:px-6 xl:hidden">
            <nav className="flex flex-col space-y-4">
              <Link href={homeHref} className="pb-2 !overflow-visible" onClick={() => setIsMenuOpen(false)} aria-label={localeCopy.homeLabel}>
                <BrandLockup compact subtitle={localeCopy.subtitle} />
              </Link>
              <div className="pb-2">
                <LanguageSwitcher />
              </div>
              {localeCopy.nav.map((link) => (
                <Link
                  key={link.href}
                  href={(link as { accent?: boolean }).accent ? orderHref(locale, { pathname }) : link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={isActive(link.href) ? "border-l-2 border-[#e0c48e] pl-3 font-semibold text-white" : "text-white/80 transition-colors hover:text-white"}
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
      </div>
    </header>
  );
}
