"use client";

import Link from "next/link";
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
      subtitle: "Suisse et international",
      body: "Solutions digitales rapides pour la Suisse et l'international. Sites web, applications et support IT.",
      navTitle: "Navigation",
      legalTitle: "Légal",
      nav: [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projets", href: "/projets" },
        { label: "GLPI", href: "/services/glpi" },
        { label: "Devis", href: "/devis" },
        { label: "Contact", href: "/contact" },
      ],
      legal: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Factures", href: "/factures" },
      ],
      phone: "Téléphone",
      rights: "Tous droits réservés.",
      homeLabel: "KAH-Digital - Accueil",
    },
    en: {
      subtitle: "Switzerland and international",
      body: "Digital solutions for Switzerland and international markets. Websites, applications, and support workflows.",
      navTitle: "Navigation",
      legalTitle: "Legal",
      nav: [
        { label: "Home", href: "/en" },
        { label: "Services", href: "/en/services" },
        { label: "Projects", href: "/en/projets" },
        { label: "GLPI", href: "/en/services/glpi" },
        { label: "Quote", href: "/en/devis" },
        { label: "Contact", href: "/en/contact" },
      ],
      legal: [
        { label: "Legal notice", href: "/en/mentions-legales" },
        { label: "Privacy", href: "/en/politique-de-confidentialite" },
        { label: "Invoices", href: "/en/factures" },
      ],
      phone: "Phone",
      rights: "All rights reserved.",
      homeLabel: "KAH-Digital - Home",
    },
    de: {
      subtitle: "Schweiz und international",
      body: "Digitale Loesungen fuer die Schweiz und internationale Maerkte. Websites, Anwendungen und Support-Workflows.",
      navTitle: "Navigation",
      legalTitle: "Rechtliches",
      nav: [
        { label: "Start", href: "/de" },
        { label: "Leistungen", href: "/de/services" },
        { label: "Projekte", href: "/de/projets" },
        { label: "GLPI", href: "/de/services/glpi" },
        { label: "Anfrage", href: "/de/devis" },
        { label: "Kontakt", href: "/de/contact" },
      ],
      legal: [
        { label: "Impressum", href: "/de/mentions-legales" },
        { label: "Datenschutz", href: "/de/politique-de-confidentialite" },
        { label: "Rechnungen", href: "/de/factures" },
      ],
      phone: "Telefon",
      rights: "Alle Rechte vorbehalten.",
      homeLabel: "KAH-Digital - Start",
    },
  }[locale];

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href={homeHref} aria-label={copy.homeLabel}>
              <BrandLockup subtitle={copy.subtitle} className="mb-4" />
            </Link>
            <p className="mb-4 text-white/70">{copy.body}</p>
            <p className="text-sm text-white/50">{registrationStatus}</p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">{copy.navTitle}</h4>
            <ul className="space-y-2">
              {copy.nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">{copy.legalTitle}</h4>
            <ul className="space-y-2">
              {copy.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 text-sm text-white/70 md:mb-0">
              <Link href={homeHref} aria-label={copy.homeLabel}>
                <BrandLockup compact className="mb-3" />
              </Link>
              {companyConfig.address !== "[A_REMPLACER_ADRESSE_OFFICIELLE]" ? (
                <p>
                  {companyConfig.address}, {companyConfig.city}, {companyConfig.country}
                </p>
              ) : null}
              {companyConfig.email !== "[A_REMPLACER_EMAIL]" ? (
                <p>
                  Email:{" "}
                  <Link href={`mailto:${companyConfig.email}`} className="underline hover:text-white">
                    {companyConfig.email}
                  </Link>
                </p>
              ) : null}
              {companyConfig.phone !== "[A_REMPLACER_TELEPHONE]" ? <p>{copy.phone}: {companyConfig.phone}</p> : null}
            </div>
            <div className="text-sm text-white/50">Copyright 2026 {brandName}. {copy.rights}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
