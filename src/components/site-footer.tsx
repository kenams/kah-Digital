"use client";

import Link from "next/link";
import { brandContact } from "@/config/brand";
import { getAlternateLocalePath, useLocale } from "@/lib/locale";

export function SiteFooter() {
  const { isEnglish, prefix, pathname } = useLocale();
  const alternateLocale = getAlternateLocalePath(pathname ?? "/");
  const footerLinks = isEnglish
    ? [
        { label: "Legal notice", href: `${prefix}/mentions-legales` },
        { label: "Privacy policy", href: `${prefix}/politique-de-confidentialite` },
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "Instagram", href: "https://www.instagram.com" },
      ]
    : [
        { label: "Mentions legales", href: `${prefix}/mentions-legales` },
        { label: "Politique de confidentialite", href: `${prefix}/politique-de-confidentialite` },
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "Instagram", href: "https://www.instagram.com" },
      ];

  return (
    <footer className="site-footer border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-12">
        <div>
          <p className="text-lg font-semibold">Kah-Digital</p>
          <p className="text-sm text-white/70">
            {isEnglish
              ? "Websites and digital solutions - reply within 24h."
              : "Creation de sites & solutions digitales - reponse sous 24h."}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {isEnglish ? "Contact:" : "Contact:"}{" "}
            <Link href={`mailto:${brandContact.email}`} className="underline hover:text-white">
              {brandContact.email}
            </Link>{" "}
            - {brandContact.phone}{" "}
            <span className="text-white/50">
              {isEnglish ? "(temporary number)" : "(numero temporaire)"}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link
            href={alternateLocale.path}
            className="rounded-full border border-white/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white hover:text-white"
          >
            {alternateLocale.locale === "en" ? "EN" : "FR"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
