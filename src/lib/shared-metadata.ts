import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";
import { getLocalizedPath } from "@/lib/locales";

const DEFAULT_SITE_URL = "https://kah-digital.ch";
const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).trim().replace(/\/+$/, "");

export const SITE_URL = /^https:\/\/kah-digital-site(?:-[^./]+)?\.vercel\.app$/i.test(rawSiteUrl)
  ? DEFAULT_SITE_URL
  : rawSiteUrl;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const localeMetadata = {
  fr: {
    description:
      "Agence digitale premium. Sites vitrines, e-commerce et expériences sur mesure avec un process limpide.",
    keywords: ["agence web", "site vitrine", "Next.js", "landing page", "design system", "KAH Digital"],
    openGraphLocale: "fr_FR",
    alternateLocales: ["en_US", "de_CH"],
    openGraphDescription: "Création de sites, landing pages et expériences digitales. Devis rapide et réponse sous 24h.",
    openGraphAlt: "KAH Digital - agence digitale premium",
    twitterDescription: "Sites et solutions digitales avec process express.",
  },
  en: {
    description:
      "Premium digital studio. Websites, landing pages, and custom solutions with a clear and fast process.",
    keywords: ["web agency", "business website", "Next.js", "landing page", "digital studio", "KAH Digital"],
    openGraphLocale: "en_US",
    alternateLocales: ["fr_FR", "de_CH"],
    openGraphDescription: "Websites, landing pages, and digital solutions with a clear process and fast turnaround.",
    openGraphAlt: "KAH Digital - premium digital studio",
    twitterDescription: "Websites and digital solutions with a clear process.",
  },
  de: {
    description:
      "Premium Digital-Studio in der Schweiz. Webseiten, Landing Pages und massgeschneiderte Lösungen mit einem klaren und schnellen Prozess.",
    keywords: ["Webentwicklung Schweiz", "Webseite erstellen", "Next.js", "Landing Page", "Digital Studio", "KAH Digital"],
    openGraphLocale: "de_CH",
    alternateLocales: ["fr_FR", "en_US"],
    openGraphDescription: "Webseiten, Landing Pages und digitale Lösungen. Klarer Prozess, Angebot innerhalb von 24h.",
    openGraphAlt: "KAH Digital - Premium Digital Studio Schweiz",
    twitterDescription: "Webseiten und digitale Lösungen mit klarem Prozess.",
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
    default: "KAH Digital",
    template: "%s | KAH Digital",
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

function sanitizePageTitle(title: string) {
  return title.replace(/\s*\|\s*KAH Digital\s*$/i, "").trim();
}

function mergeKeywords(locale: Locale, keywords: string[] = []) {
  return Array.from(new Set([...localeMetadata[locale].keywords, ...keywords].map((value) => value.trim())));
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords = [],
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const content = localeMetadata[locale];
  const canonical = getLocalizedPath(path, locale);

  return {
    title: sanitizePageTitle(title),
    description,
    keywords: mergeKeywords(locale, keywords),
    alternates: {
      canonical,
      languages: {
        fr: getLocalizedPath(path, "fr"),
        en: getLocalizedPath(path, "en"),
        de: getLocalizedPath(path, "de"),
        "x-default": getLocalizedPath(path, "fr"),
      },
    },
    openGraph: {
      type: "website",
      locale: content.openGraphLocale,
      alternateLocale: content.alternateLocales,
      title: sanitizePageTitle(title),
      description,
      url: canonical,
      siteName: "KAH Digital",
      images: [
        {
          url: "/og-KAH Digital.png",
          width: 1200,
          height: 630,
          alt: content.openGraphAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: sanitizePageTitle(title),
      description,
      images: ["/og-KAH Digital.png"],
    },
  };
}

export function buildNoIndexMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description?: string;
}): Metadata {
  return {
    title: sanitizePageTitle(title),
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: getLocalizedPath(path, locale),
    },
  };
}

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
      title: "KAH Digital",
      description: content.openGraphDescription,
      siteName: "KAH Digital",
      images: [
        {
          url: "/og-KAH Digital.png",
          width: 1200,
          height: 630,
          alt: content.openGraphAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "KAH Digital",
      description: content.twitterDescription,
      images: ["/og-KAH Digital.png"],
    },
  };
}

export const sharedMetadata = getSiteMetadata("fr");

export const adminMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAH Digital Admin",
    template: "%s | KAH Digital Admin",
  },
  description: "Administration et suivi interne KAH Digital.",
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
  name: "KAH Digital",
  image: `${SITE_URL}/og-KAH Digital.png`,
  url: SITE_URL,
  telephone: companyConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyConfig.address,
    addressLocality: companyConfig.city,
    postalCode: companyConfig.postalCode,
    addressCountry: companyConfig.country,
  },
  sameAs: ["https://www.linkedin.com/company/kah-digital", "https://x.com/DigitalKah42"],
  areaServed: "Global",
  serviceType: ["Site vitrine", "Landing page", "E-commerce"],
};
