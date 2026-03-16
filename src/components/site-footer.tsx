"use client";

import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { companyConfig } from "@/config/company";

export function SiteFooter() {
  const brandName = companyConfig.brandName !== "[A_REMPLACER_NOM_COMMERCIAL]"
    ? companyConfig.brandName
    : "KAH-Digital";
  const registrationStatus = companyConfig.registrationStatus !== "[A_REMPLACER_STATUT_JURIDIQUE]"
    ? companyConfig.registrationStatus
    : "Entreprise en cours d'inscription au registre du commerce suisse";

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <BrandLockup subtitle="Suisse et international" className="mb-4" />
            <p className="text-white/70 mb-4">
              Solutions digitales rapides pour la Suisse et l'international. Sites web, applications et support IT.
            </p>
            <p className="text-sm text-white/50">
              {registrationStatus}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/70 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/services/glpi" className="text-white/70 hover:text-white transition-colors">GLPI</Link></li>
              <li><Link href="/devis" className="text-white/70 hover:text-white transition-colors">Devis</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link href="/mentions-legales" className="text-white/70 hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="text-white/70 hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link href="/factures" className="text-white/70 hover:text-white transition-colors">Factures</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/70 mb-4 md:mb-0">
              <BrandLockup compact className="mb-3" />
              {companyConfig.address !== "[A_REMPLACER_ADRESSE_OFFICIELLE]" && (
                <p>{companyConfig.address}, {companyConfig.city}, {companyConfig.country}</p>
              )}
              {companyConfig.email !== "[A_REMPLACER_EMAIL]" && (
                <p>Email: <Link href={`mailto:${companyConfig.email}`} className="underline hover:text-white">{companyConfig.email}</Link></p>
              )}
              {companyConfig.phone !== "[A_REMPLACER_TELEPHONE]" && (
                <p>Téléphone: {companyConfig.phone}</p>
              )}
            </div>
            <div className="text-sm text-white/50">
              © 2026 {brandName}. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
