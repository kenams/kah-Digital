"use client";

import Link from "next/link";
import { brandContact } from "@/config/brand";

const footerLinks = [
  { label: "Mentions legales", href: "/mentions-legales" },
  { label: "Politique de confidentialite", href: "/politique-de-confidentialite" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-12">
        <div>
          <p className="text-lg font-semibold">Kah-Digital</p>
          <p className="text-sm text-white/70">
            Creation de sites & solutions digitales - reponse sous 24h.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Contact:{" "}
            <Link href={`mailto:${brandContact.email}`} className="underline hover:text-white">
              {brandContact.email}
            </Link>{" "}
            - {brandContact.phone} <span className="text-white/50">(numero temporaire)</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
