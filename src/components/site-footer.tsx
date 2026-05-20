"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrandLockup } from "@/components/brand-lockup";
import { companyConfig } from "@/config/company";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiMail, FiPhone } from "react-icons/fi";

const WA_NUMBER = "33759558414";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kah-digital",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/DigitalKah42",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/kenams",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const { locale, prefix } = useLocale();
  const homeHref = prefix || "/";
  const waMsg = locale === "en"
    ? "Hi KAH Digital, I have a project to discuss."
    : locale === "de"
    ? "Hallo KAH Digital, ich habe ein Projekt zu besprechen."
    : "Bonjour KAH Digital, j'ai un projet à discuter.";
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;

  const copy = {
    fr: {
      tagline: "Studio digital · sites, apps & IA",
      description: "On construit des sites web, landing pages, applications et SaaS sur mesure pour entrepreneurs, indépendants et PME. Rapide, propre, sans friction.",
      cta: "Vous avez un projet ?",
      ctaBtn: "Devis gratuit",
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
        title: "Services",
        links: [
          { label: "Site web professionnel", href: "/site-web-entreprise" },
          { label: "Refonte site web", href: "/refonte-site-web" },
          { label: "Application web", href: "/application-web-sur-mesure" },
          { label: "Automatisation IA", href: "/automatisation-ia-entreprise" },
          { label: "Agence IA", href: "/agence-ia" },
        ],
      },
      zones: {
        title: "Zones",
        links: [
          { label: "Lausanne", href: "/site-web-lausanne" },
          { label: "Genève", href: "/site-web-geneve" },
          { label: "Paris", href: "/agence-web-paris" },
          { label: "Lyon", href: "/agence-web-lyon" },
          { label: "Zurich", href: "/agence-web-zurich" },
          { label: "Marseille", href: "/agence-web-marseille" },
        ],
      },
      legal: {
        title: "Légal",
        links: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Confidentialité", href: "/confidentialite" },
        ],
      },
      location: "Lausanne, Suisse",
      rights: "Tous droits réservés.",
      madeWith: "Conçu avec IA · Déployé sur Vercel",
    },
    en: {
      tagline: "Digital studio · websites, apps & AI",
      description: "We build websites, landing pages, web apps and custom SaaS for founders, freelancers and SMEs. Fast, clean, no friction.",
      cta: "Have a project?",
      ctaBtn: "Free quote",
      nav: {
        title: "Navigation",
        links: [
          { label: "Home", href: "/en" },
          { label: "Offers", href: "/en/offres" },
          { label: "Portfolio", href: "/en/projets" },
          { label: "Quote", href: "/en/devis" },
          { label: "Contact", href: "/en/contact" },
        ],
      },
      services: {
        title: "Services",
        links: [
          { label: "Business website", href: "/en/site-web-entreprise" },
          { label: "Website redesign", href: "/en/refonte-site-web" },
          { label: "Web application", href: "/en/application-web-sur-mesure" },
          { label: "AI automation", href: "/en/automatisation-ia-entreprise" },
          { label: "AI Agency", href: "/en/agence-ia" },
        ],
      },
      zones: {
        title: "Cities",
        links: [
          { label: "Lausanne", href: "/site-web-lausanne" },
          { label: "Geneva", href: "/site-web-geneve" },
          { label: "Paris", href: "/agence-web-paris" },
          { label: "Lyon", href: "/agence-web-lyon" },
          { label: "Zurich", href: "/agence-web-zurich" },
        ],
      },
      legal: {
        title: "Legal",
        links: [
          { label: "Legal notice", href: "/en/mentions-legales" },
          { label: "Privacy", href: "/en/politique-de-confidentialite" },
        ],
      },
      location: "Lausanne, Switzerland",
      rights: "All rights reserved.",
      madeWith: "Built with AI · Deployed on Vercel",
    },
    de: {
      tagline: "Digitales Studio · Websites, Apps & KI",
      description: "Wir entwickeln Websites, Landing Pages, Web-Apps und individuelle SaaS für Unternehmer, Freelancer und KMUs. Schnell, sauber, ohne Reibung.",
      cta: "Haben Sie ein Projekt?",
      ctaBtn: "Kostenlose Offerte",
      nav: {
        title: "Navigation",
        links: [
          { label: "Startseite", href: "/de" },
          { label: "Angebote", href: "/de/offres" },
          { label: "Referenzen", href: "/de/projets" },
          { label: "Offerte", href: "/de/devis" },
          { label: "Kontakt", href: "/de/contact" },
        ],
      },
      services: {
        title: "Leistungen",
        links: [
          { label: "Business-Website", href: "/de/site-web-entreprise" },
          { label: "Website-Refonte", href: "/de/refonte-site-web" },
          { label: "Web-App", href: "/de/application-web-sur-mesure" },
          { label: "KI-Automatisierung", href: "/de/automatisation-ia-entreprise" },
          { label: "KI-Agentur", href: "/de/agence-ia" },
        ],
      },
      zones: {
        title: "Regionen",
        links: [
          { label: "Lausanne", href: "/site-web-lausanne" },
          { label: "Genf", href: "/site-web-geneve" },
          { label: "Freiburg", href: "/site-web-fribourg" },
          { label: "Bern", href: "/de/devis" },
          { label: "Zürich", href: "/agence-web-zurich" },
        ],
      },
      legal: {
        title: "Rechtliches",
        links: [
          { label: "Impressum", href: "/de/devis" },
          { label: "Datenschutz", href: "/de/devis" },
        ],
      },
      location: "Lausanne, Schweiz",
      rights: "Alle Rechte vorbehalten.",
      madeWith: "Mit KI gebaut · Deployed on Vercel",
    },
  }[locale];

  const devisHref = locale === "fr" ? "/devis" : `${prefix}/devis`;

  const langLinks = [
    { label: "FR", href: "/" },
    { label: "EN", href: "/en" },
    { label: "DE", href: "/de" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-gray-950 text-white">

      {/* Top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* CTA Banner */}
      <div className="relative border-b border-white/8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/30 via-violet-950/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-bold text-white">{copy.cta}</p>
              <p className="mt-1 text-sm text-white/50">{companyConfig.email}</p>
            </div>
            <Link
              href={devisHref}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:gap-3 hover:shadow-blue-500/35"
            >
              {copy.ctaBtn}
              <FiArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={homeHref} className="mb-5 inline-block">
              <BrandLockup subtitle={copy.tagline} className="mb-0" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">{copy.description}</p>

            {/* Social + contact */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:border-white/25 hover:text-white/80"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            <div className="mt-5 space-y-2">
              <a href={`mailto:${companyConfig.email}`} className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80">
                <FiMail size={13} className="shrink-0" />
                {companyConfig.email}
              </a>
              <a href={`tel:${companyConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80">
                <FiPhone size={13} className="shrink-0" />
                {companyConfig.phone}
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#25D366]/70 transition-colors hover:text-[#25D366]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <p className="text-xs text-white/25">{copy.location}</p>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white/30">{copy.nav.title}</h4>
            <ul className="space-y-3">
              {copy.nav.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white/30">{copy.services.title}</h4>
            <ul className="space-y-3">
              {copy.services.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h4 className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white/30">{copy.zones.title}</h4>
            <ul className="space-y-3">
              {copy.zones.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} KAH Digital. {copy.rights}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {copy.legal.links.map((link) => (
              <Link key={link.label} href={link.href} className="text-xs text-white/30 transition-colors hover:text-white/60">
                {link.label}
              </Link>
            ))}
            <span className="text-white/15">·</span>
            {/* Language switcher */}
            <div className="flex items-center gap-1.5">
              {langLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase transition-colors ${
                    (locale === "fr" && l.label === "FR") ||
                    (locale === "en" && l.label === "EN") ||
                    (locale === "de" && l.label === "DE")
                      ? "bg-white/10 text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <span className="text-white/15">·</span>
            <p className="text-xs text-white/20">{copy.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
