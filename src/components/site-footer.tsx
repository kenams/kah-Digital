"use client";

import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { companyConfig } from "@/config/company";
import { useLocale } from "@/lib/locale";

export function SiteFooter() {
  const { isEnglish, prefix } = useLocale();
  const brandName =
    companyConfig.brandName !== "[A_REMPLACER_NOM_COMMERCIAL]" ? companyConfig.brandName : "KAH-Digital";
  const registrationStatus =
    companyConfig.registrationStatus !== "[A_REMPLACER_STATUT_JURIDIQUE]"
      ? companyConfig.registrationStatus
      : "Entreprise en cours d'inscription au registre du commerce suisse";
  const homeHref = prefix || "/";

  const navLinks = isEnglish
    ? [
        { label: "Home", href: homeHref },
        { label: "Services", href: `${prefix}/services` },
        { label: "Projects", href: `${prefix}/projets` },
        { label: "GLPI", href: `${prefix}/services/glpi` },
        { label: "Quote", href: `${prefix}/devis` },
        { label: "Contact", href: `${prefix}/contact` },
      ]
    : [
        { label: "Accueil", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projets", href: "/projets" },
        { label: "GLPI", href: "/services/glpi" },
        { label: "Devis", href: "/devis" },
        { label: "Contact", href: "/contact" },
      ];

  const legalLinks = isEnglish
    ? [
        { label: "Legal notice", href: "/en/mentions-legales" },
        { label: "Privacy", href: "/en/politique-de-confidentialite" },
        { label: "Invoices", href: "/en/factures" },
      ]
    : [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Confidentialité", href: "/confidentialite" },
        { label: "Factures", href: "/factures" },
      ];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href={homeHref} aria-label="KAH-Digital - Home">
              <BrandLockup subtitle={isEnglish ? "Switzerland and international" : "Suisse et international"} className="mb-4" />
            </Link>
            <p className="text-white/70 mb-4">
              {isEnglish
                ? "Digital solutions for Switzerland and international markets. Websites, applications, and support workflows."
                : "Solutions digitales rapides pour la Suisse et l'international. Sites web, applications et support IT."}
            </p>
            <p className="text-sm text-white/50">{registrationStatus}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{isEnglish ? "Navigation" : "Navigation"}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{isEnglish ? "Legal" : "Légal"}</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/70 mb-4 md:mb-0">
              <Link href={homeHref} aria-label="KAH-Digital - Home">
                <BrandLockup compact className="mb-3" />
              </Link>
              {companyConfig.address !== "[A_REMPLACER_ADRESSE_OFFICIELLE]" && (
                <p>
                  {companyConfig.address}, {companyConfig.city}, {companyConfig.country}
                </p>
              )}
              {companyConfig.email !== "[A_REMPLACER_EMAIL]" && (
                <p>
                  Email:{" "}
                  <Link href={`mailto:${companyConfig.email}`} className="underline hover:text-white">
                    {companyConfig.email}
                  </Link>
                </p>
              )}
              {companyConfig.phone !== "[A_REMPLACER_TELEPHONE]" && <p>{isEnglish ? "Phone" : "Téléphone"}: {companyConfig.phone}</p>}
            </div>
            <div className="text-sm text-white/50">© 2026 {brandName}. {isEnglish ? "All rights reserved." : "Tous droits réservés."}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
