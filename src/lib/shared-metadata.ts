import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app")
  .trim()
  .replace(/\/+$/, "");

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const localeMetadata = {
  fr: {
    description:
      "Agence digitale premium. Sites vitrines, e-commerce et expériences sur mesure avec un process limpide.",
    keywords: ["agence web", "site vitrine", "Next.js", "landing page", "design system", "KAH-Digital"],
    openGraphLocale: "fr_FR",
    alternateLocales: ["en_US", "de_CH"],
    openGraphDescription: "Création de sites, landing pages et expériences digitales. Devis rapide et réponse sous 24h.",
    openGraphAlt: "KAH-Digital - agence digitale premium",
    twitterDescription: "Sites et solutions digitales avec process express.",
  },
  en: {
    description:
      "Premium digital studio. Websites, landing pages, and custom solutions with a clear and fast process.",
    keywords: ["web agency", "business website", "Next.js", "landing page", "digital studio", "KAH-Digital"],
    openGraphLocale: "en_US",
    alternateLocales: ["fr_FR", "de_CH"],
    openGraphDescription: "Websites, landing pages, and digital solutions with a clear process and fast turnaround.",
    openGraphAlt: "KAH-Digital - premium digital studio",
    twitterDescription: "Websites and digital solutions with a clear process.",
  },
  de: {
    description:
      "Digitalstudio mit Premium-Anspruch. Websites, Landingpages und individuelle digitale Loesungen mit klarem Prozess.",
    keywords: ["Webagentur", "Unternehmenswebsite", "Next.js", "Landingpage", "Digitalstudio", "KAH-Digital"],
    openGraphLocale: "de_CH",
    alternateLocales: ["fr_FR", "en_US"],
    openGraphDescription: "Websites, Landingpages und digitale Loesungen mit klarem Ablauf und schneller Umsetzung.",
    openGraphAlt: "KAH-Digital - digitales Premium-Studio",
    twitterDescription: "Websites und digitale Loesungen mit klarem Prozess.",
  },
} satisfies Record<
  Locale,
  {
    description: string;
    keywords: string[];
    openGraphLocale: string;
    alternateLocales: string[];
    openGraphDescription: string;
    openGraphAlt: string;
    twitterDescription: string;
  }
>;

const baseMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAH-Digital",
    template: "%s | KAH-Digital",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
} satisfies Metadata;

export function getSiteMetadata(locale: Locale): Metadata {
  const content = localeMetadata[locale];

  return {
    ...baseMetadata,
    description: content.description,
    keywords: content.keywords,
    openGraph: {
      type: "website",
      locale: content.openGraphLocale,
      alternateLocale: content.alternateLocales,
      title: "KAH-Digital",
      description: content.openGraphDescription,
      siteName: "KAH-Digital",
      images: [
        {
          url: "/og-kah-digital.png",
          width: 1200,
          height: 630,
          alt: content.openGraphAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "KAH-Digital",
      description: content.twitterDescription,
      images: ["/og-kah-digital.png"],
    },
  };
}

export const sharedMetadata = getSiteMetadata("fr");

export const adminMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAH-Digital Admin",
    template: "%s | KAH-Digital Admin",
  },
  description: "Administration et suivi interne KAH-Digital.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    nocache: true,
  },
};

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "KAH-Digital",
  image: `${SITE_URL}/og-kah-digital.png`,
  url: SITE_URL,
  telephone: companyConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyConfig.address,
    addressLocality: companyConfig.city,
    postalCode: companyConfig.postalCode,
    addressCountry: companyConfig.country,
  },
  sameAs: ["https://www.linkedin.com", "https://www.instagram.com"],
  areaServed: "Global",
  serviceType: ["Site vitrine", "Landing page", "E-commerce"],
};
