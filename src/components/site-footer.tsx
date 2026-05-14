"use client";

import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { companyConfig } from "@/config/company";
import { useLocale } from "@/lib/locale";

const WHATSAPP_NUMBER = "33759558414";
const WHATSAPP_MSG = encodeURIComponent("Bonjour, je souhaite un devis pour mon projet web.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kah-digital",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/kenams",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${companyConfig.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const { locale, prefix } = useLocale();
  const homeHref = prefix || "/";

  const copy = {
    fr: {
      tagline: "Studio digital · sites, apps & SaaS",
      description: "Je crée des sites web, landing pages, applications mobiles et SaaS sur mesure pour entrepreneurs, indépendants et PME.",
      cta: "Vous avez un projet ?",
      ctaBtn: "Demander un devis personnalisé",
      nav: {
        title: "Navigation",
        links: [
          { label: "Accueil", href: "/" },
          { label: "Offres", href: "/offres" },
          { label: "Réalisations", href: "/projets" },
          { label: "Devis", href: "/devis" },
          { label: "Contact", href: "/contact" },
        ],
      },
      services: {
        title: "Mes offres",
        links: [
          { label: "Landing page sur mesure", href: "/devis" },
          { label: "Site web professionnel", href: "/site-web-entreprise" },
          { label: "Application mobile", href: "/application-web-sur-mesure" },
          { label: "SaaS sur mesure", href: "/devis" },
          { label: "Outil web métier", href: "/devis" },
        ],
      },
      zones: {
        title: "Zones",
        links: [
          { label: "Site web Lausanne", href: "/site-web-lausanne" },
          { label: "Site web Genève", href: "/site-web-geneve" },
          { label: "Agence web Paris", href: "/agence-web-paris" },
          { label: "Agence web Lyon", href: "/agence-web-lyon" },
          { label: "Agence web Toulouse", href: "/agence-web-toulouse" },
          { label: "Agence web Marseille", href: "/agence-web-marseille" },
          { label: "Agence web Bordeaux", href: "/agence-web-bordeaux" },
          { label: "Audit gratuit", href: "/audit-gratuit" },
        ],
      },
      legal: {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Confidentialité", href: "/confidentialite" },
          { label: "Audit gratuit", href: "/audit-gratuit" },
        ],
      },
      location: "Lausanne, Suisse",
      rights: "Tous droits réservés.",
      madeWith: "Conçu avec IA · Déployé sur Vercel",
    },
    en: {
      tagline: "Digital studio · websites, apps & SaaS",
      description: "I build websites, landing pages, mobile apps and custom SaaS for entrepreneurs, freelancers and SMEs.",
      cta: "Have a project?",
      ctaBtn: "Get a custom quote",
      nav: {
        title: "Navigation",
        links: [
          { label: "Home", href: "/en" },
          { label: "Offers", href: "/en/offres" },
          { label: "Portfolio", href: "/en/projets" },
          { label: "Pricing", href: "/en/devis" },
          { label: "Contact", href: "/en/contact" },
        ],
      },
      services: {
        title: "My offers",
        links: [
          { label: "Custom landing page", href: "/en/devis" },
          { label: "Professional website", href: "/en/site-web-entreprise" },
          { label: "Mobile application", href: "/en/application-web-sur-mesure" },
          { label: "Custom SaaS", href: "/en/devis" },
          { label: "Business web tool", href: "/en/devis" },
        ],
      },
      zones: {
        title: "Cities",
        links: [
          { label: "Website Lausanne", href: "/site-web-lausanne" },
          { label: "Website Geneva", href: "/site-web-geneve" },
          { label: "Website Fribourg", href: "/site-web-fribourg" },
          { label: "Web agency Paris", href: "/agence-web-paris" },
          { label: "Web agency Lyon", href: "/agence-web-lyon" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Legal notice", href: "/en/mentions-legales" },
          { label: "Privacy", href: "/en/politique-de-confidentialite" },
          { label: "Free audit", href: "/audit-gratuit" },
        ],
      },
      location: "Lausanne, Switzerland",
      rights: "All rights reserved.",
      madeWith: "Built with AI · Deployed on Vercel",
    },
    de: {
      tagline: "Digital-Studio · Websites, Apps & SaaS",
      description: "Ich erstelle Websites, Landing Pages, mobile Apps und massgeschneidertes SaaS für Unternehmer, Selbstständige und KMU.",
      cta: "Sie haben ein Projekt?",
      ctaBtn: "Individuelle Offerte anfragen",
      nav: {
        title: "Navigation",
        links: [
          { label: "Start", href: "/de" },
          { label: "Angebote", href: "/de/offres" },
          { label: "Projekte", href: "/de/projets" },
          { label: "Preise", href: "/de/devis" },
          { label: "Kontakt", href: "/de/contact" },
        ],
      },
      services: {
        title: "Meine Angebote",
        links: [
          { label: "Individuelle Landing Page", href: "/de/devis" },
          { label: "Professionelle Website", href: "/de/site-web-entreprise" },
          { label: "Mobile App", href: "/de/application-web-sur-mesure" },
          { label: "Massgeschneidertes SaaS", href: "/de/devis" },
          { label: "Business-Web-Tool", href: "/de/devis" },
        ],
      },
      zones: {
        title: "Städte",
        links: [
          { label: "Website Lausanne", href: "/site-web-lausanne" },
          { label: "Website Genf", href: "/site-web-geneve" },
          { label: "Website Freiburg", href: "/site-web-fribourg" },
          { label: "Webagentur Paris", href: "/agence-web-paris" },
          { label: "Webagentur Lyon", href: "/agence-web-lyon" },
        ],
      },
      legal: {
        title: "Rechtliches",
        links: [
          { label: "Impressum", href: "/de/mentions-legales" },
          { label: "Datenschutz", href: "/de/politique-de-confidentialite" },
          { label: "Gratis-Audit", href: "/audit-gratuit" },
        ],
      },
      location: "Lausanne, Schweiz",
      rights: "Alle Rechte vorbehalten.",
      madeWith: "Mit KI gebaut · Auf Vercel bereitgestellt",
    },
  }[locale];

  const devisHref = locale === "fr" ? "/devis" : `${prefix}/devis`;

  return (
    <footer className="border-t border-white/10 bg-gray-950 text-white">

      {/* CTA Banner */}
      <div className="border-b border-white/10 bg-gradient-to-r from-blue-950/60 to-violet-950/60">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold text-white">{copy.cta}</p>
            <p className="text-sm text-white/60 mt-0.5">{companyConfig.email}</p>
          </div>
          <Link
            href={devisHref}
            className="shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:opacity-90 transition-opacity"
          >
            {copy.ctaBtn} →
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">

          {/* Brand col — full width on mobile, 1 col on desktop */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={homeHref}>
              <BrandLockup subtitle={copy.tagline} className="mb-4" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">{copy.description}</p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mb-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            {/* Contact inline sous les réseaux */}
            <div className="space-y-1.5">
              <a href={`mailto:${companyConfig.email}`} className="text-sm text-white/60 hover:text-white transition-colors block">
                {companyConfig.email}
              </a>
              <a href={`tel:${companyConfig.phone.replace(/\s/g, "")}`} className="text-sm text-white/60 hover:text-white transition-colors block">
                {companyConfig.phone}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-green-400/80 hover:text-green-400 transition-colors block">
                WhatsApp →
              </a>
              <p className="text-xs text-white/40 pt-1">{copy.location}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">{copy.nav.title}</h4>
            <ul className="space-y-2.5">
              {copy.nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">{copy.services.title}</h4>
            <ul className="space-y-2.5">
              {copy.services.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">{copy.zones.title}</h4>
            <ul className="space-y-2.5">
              {copy.zones.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — légal + copyright */}
        <div className="mt-10 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} KAH-Digital. {copy.rights}
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {copy.legal.links.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {link.label}
              </Link>
            ))}
            <span className="text-xs text-white/20">·</span>
            <p className="text-xs text-white/30">{copy.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
