"use client";

import Link from "next/link";
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { BrandLockup } from "@/components/brand-lockup";
import { companyConfig } from "@/config/company";
import { useLocale } from "@/lib/locale";

export function SiteFooter() {
  const { locale, prefix } = useLocale();
  const brandName =
    companyConfig.brandName !== "[A_REMPLACER_NOM_COMMERCIAL]" ? companyConfig.brandName : "KAH-Digital";
  const registrationStatus =
    companyConfig.registrationStatus !== "[A_REMPLACER_STATUT_JURIDIQUE]"
      ? companyConfig.registrationStatus
      : "Entreprise en cours d'inscription au registre du commerce suisse";
  const homeHref = prefix || "/";

  const copy = {
    fr: {
      subtitle: "Studio web, IA et automatisation",
      body: "KAH-Digital concoit des sites premium, assistants IA et systemes plus utiles pour des equipes qui veulent mieux vendre et mieux operer.",
      navTitle: "Explorer",
      legalTitle: "Cadre",
      contactTitle: "Contact direct",
      primary: "Demander un devis",
      secondary: "Voir l'offre IA",
      anchorTitle: "Acces rapide",
      nav: [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projets", href: "/projets" },
        { label: "Automatisation IA", href: "/automatisation-ia-entreprise" },
        { label: "Devis", href: "/devis" },
        { label: "Contact", href: "/contact" },
      ],
      anchors: [
        { label: "Difference", href: "#difference" },
        { label: "Process", href: "#process" },
        { label: "FAQ", href: "#faq" },
      ],
      legal: [
        { label: "Mentions legales", href: "/mentions-legales" },
        { label: "Confidentialite", href: "/confidentialite" },
        { label: "Factures", href: "/factures" },
      ],
      phone: "Telephone",
      rights: "Tous droits reserves.",
      homeLabel: "KAH-Digital - Accueil",
    },
    en: {
      subtitle: "Web, AI, and automation studio",
      body: "KAH-Digital builds premium websites, AI assistants, and cleaner systems for teams that want to sell better and operate with less friction.",
      navTitle: "Explore",
      legalTitle: "Legal",
      contactTitle: "Direct contact",
      primary: "Request a quote",
      secondary: "See the AI offer",
      anchorTitle: "Quick access",
      nav: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projets" },
        { label: "AI automation", href: "/automatisation-ia-entreprise" },
        { label: "Quote", href: "/devis" },
        { label: "Contact", href: "/contact" },
      ],
      anchors: [
        { label: "Difference", href: "#difference" },
        { label: "Process", href: "#process" },
        { label: "FAQ", href: "#faq" },
      ],
      legal: [
        { label: "Legal notice", href: "/mentions-legales" },
        { label: "Privacy", href: "/politique-de-confidentialite" },
        { label: "Invoices", href: "/factures" },
      ],
      phone: "Phone",
      rights: "All rights reserved.",
      homeLabel: "KAH-Digital - Home",
    },
    de: {
      subtitle: "Studio fuer Web, KI und Automatisierung",
      body: "KAH-Digital entwickelt Premium-Websites, KI-Assistenten und klarere Systeme fuer Teams, die besser verkaufen und sauberer operieren wollen.",
      navTitle: "Explore",
      legalTitle: "Rechtliches",
      contactTitle: "Direkter Kontakt",
      primary: "Projekt anfragen",
      secondary: "KI-Angebot ansehen",
      anchorTitle: "Schnellzugriff",
      nav: [
        { label: "Start", href: "/" },
        { label: "Leistungen", href: "/services" },
        { label: "Projekte", href: "/projets" },
        { label: "KI-Automatisierung", href: "/automatisation-ia-entreprise" },
        { label: "Anfrage", href: "/devis" },
        { label: "Kontakt", href: "/contact" },
      ],
      anchors: [
        { label: "Difference", href: "#difference" },
        { label: "Process", href: "#process" },
        { label: "FAQ", href: "#faq" },
      ],
      legal: [
        { label: "Impressum", href: "/mentions-legales" },
        { label: "Datenschutz", href: "/politique-de-confidentialite" },
        { label: "Rechnungen", href: "/factures" },
      ],
      phone: "Telefon",
      rights: "Alle Rechte vorbehalten.",
      homeLabel: "KAH-Digital - Start",
    },
  }[locale];

  const withPrefix = (path: string) => (path === "/" ? homeHref : `${prefix}${path}`);
  const withHomeAnchor = (hash: string) => `${homeHref}${hash}`;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(5,5,5,0.82),rgba(8,7,6,0.98))] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(214,179,106,0.12),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(127,184,199,0.1),transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.3)]">
            <Link href={homeHref} aria-label={copy.homeLabel}>
              <BrandLockup subtitle={copy.subtitle} className="mb-4" />
            </Link>
            <p className="max-w-2xl text-white/72">{copy.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={withPrefix("/devis")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-neutral-200"
              >
                {copy.primary}
                <FiArrowUpRight />
              </Link>
              <Link
                href={withPrefix("/automatisation-ia-entreprise")}
                className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white/85 transition hover:border-white hover:text-white"
              >
                {copy.secondary}
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/45">{registrationStatus}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <h4 className="text-lg font-semibold">{copy.navTitle}</h4>
              <ul className="mt-4 space-y-3">
                {copy.nav.map((link) => (
                  <li key={link.href}>
                    <Link href={withPrefix(link.href)} className="text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <h4 className="text-lg font-semibold">{copy.anchorTitle}</h4>
              <ul className="mt-4 space-y-3">
                {copy.anchors.map((link) => (
                  <li key={link.href}>
                    <Link href={withHomeAnchor(link.href)} className="text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h4 className="mt-8 text-lg font-semibold">{copy.legalTitle}</h4>
              <ul className="mt-4 space-y-3">
                {copy.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={withPrefix(link.href)} className="text-white/70 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 md:grid-cols-[1fr,auto] md:items-end">
          <div className="space-y-3 text-sm text-white/70">
            <p className="text-lg font-semibold text-white">{copy.contactTitle}</p>
            {companyConfig.address !== "[A_REMPLACER_ADRESSE_OFFICIELLE]" ? (
              <p className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-[#d6b36a]" />
                <span>
                  {companyConfig.address}, {companyConfig.city}, {companyConfig.country}
                </span>
              </p>
            ) : null}
            {companyConfig.email !== "[A_REMPLACER_EMAIL]" ? (
              <p className="flex items-start gap-3">
                <FiMail className="mt-0.5 shrink-0 text-[#d6b36a]" />
                <Link href={`mailto:${companyConfig.email}`} className="hover:text-white">
                  {companyConfig.email}
                </Link>
              </p>
            ) : null}
            {companyConfig.phone !== "[A_REMPLACER_TELEPHONE]" ? (
              <p className="flex items-start gap-3">
                <FiPhone className="mt-0.5 shrink-0 text-[#d6b36a]" />
                <span>
                  {copy.phone}: {companyConfig.phone}
                </span>
              </p>
            ) : null}
          </div>
          <div className="text-sm text-white/45 md:text-right">
            <p>Copyright 2026 {brandName}. {copy.rights}</p>
            <p className="mt-2">{companyConfig.legalName}</p>
            <p>{companyConfig.city}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
