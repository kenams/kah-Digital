import type { Metadata } from "next";
import { brandContact } from "@/config/brand";
import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";
import { getLocalizedPath } from "@/lib/locales";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch")
  .trim()
  .replace(/\/+$/, "");

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION ?? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

const socialLinks = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_X_URL,
]
  .map((value) => value?.trim())
  .filter((value): value is string => Boolean(value && value.startsWith("https://")));

const localeMetadata = {
  fr: {
    description:
      "Agence web et automatisation IA pour PME, cabinets et equipes qui veulent un site plus lisible, plus de demandes qualifiees et moins de support manuel.",
    keywords: [
      "agence web suisse",
      "site web entreprise",
      "refonte site web",
      "application web sur mesure",
      "automatisation IA entreprise",
      "assistant IA",
      "KAH-Digital",
    ],
    openGraphLocale: "fr_FR",
    alternateLocales: ["en_US", "de_CH"],
    openGraphAlt: "KAH-Digital - studio web, IA et automatisation",
  },
  en: {
    description:
      "Web, AI, and automation studio for teams that need sharper positioning, better qualified leads, and less repetitive support work.",
    keywords: [
      "web agency switzerland",
      "business website development",
      "website redesign",
      "custom web application",
      "ai automation for business",
      "ai assistant",
      "KAH-Digital",
    ],
    openGraphLocale: "en_US",
    alternateLocales: ["fr_FR", "de_CH"],
    openGraphAlt: "KAH-Digital - web, AI, and automation studio",
  },
  de: {
    description:
      "Studio fuer Web, KI und Automatisierung fuer Teams, die klarere Positionierung, bessere Leads und weniger manuellen Support brauchen.",
    keywords: [
      "webagentur schweiz",
      "business website",
      "website relaunch",
      "web anwendung nach mass",
      "ki automatisierung unternehmen",
      "ki assistent",
      "KAH-Digital",
    ],
    openGraphLocale: "de_CH",
    alternateLocales: ["fr_FR", "en_US"],
    openGraphAlt: "KAH-Digital - Studio fuer Web, KI und Automatisierung",
  },
} satisfies Record<
  Locale,
  {
    description: string;
    keywords: string[];
    openGraphLocale: string;
    alternateLocales: string[];
    openGraphAlt: string;
  }
>;

const baseMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAH-Digital",
    template: "%s | KAH-Digital",
  },
  applicationName: "KAH-Digital",
  category: "technology",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
  },
  verification: GOOGLE_SITE_VERIFICATION
    ? {
        google: GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
} satisfies Metadata;

function dedupeKeywords(keywords: string[]) {
  return Array.from(new Set(keywords.map((value) => value.trim()).filter(Boolean)));
}

export function getAbsoluteUrl(path: string, locale: Locale) {
  return `${SITE_URL}${getLocalizedPath(path, locale)}`;
}

export function getLanguageAlternates(path: string) {
  return {
    fr: getLocalizedPath(path, "fr"),
    en: getLocalizedPath(path, "en"),
    de: getLocalizedPath(path, "de"),
    "x-default": getLocalizedPath(path, "fr"),
  };
}

type BuildPageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords = [],
}: BuildPageMetadataInput): Metadata {
  const content = localeMetadata[locale];
  const canonical = getLocalizedPath(path, locale);
  const mergedKeywords = dedupeKeywords([...content.keywords, ...keywords]);

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: content.openGraphLocale,
      alternateLocale: content.alternateLocales,
      title,
      description,
      url: canonical,
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
      title,
      description,
      images: ["/og-kah-digital.png"],
    },
  };
}

type BuildNoIndexMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description?: string;
};

export function buildNoIndexMetadata({
  locale,
  path,
  title,
  description,
}: BuildNoIndexMetadataInput): Metadata {
  return {
    title,
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
  const homePath = getLocalizedPath("/", locale);

  return {
    ...baseMetadata,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: homePath,
      languages: getLanguageAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: content.openGraphLocale,
      alternateLocale: content.alternateLocales,
      title: "KAH-Digital",
      description: content.description,
      url: homePath,
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
      description: content.description,
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

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyConfig.brandName,
  url: SITE_URL,
  logo: `${SITE_URL}/og-kah-digital.png`,
  email: brandContact.email,
  telephone: brandContact.phoneHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyConfig.address,
    postalCode: companyConfig.postalCode,
    addressLocality: companyConfig.city,
    addressCountry: companyConfig.country,
  },
  sameAs: socialLinks.length > 0 ? socialLinks : undefined,
};

const professionalServiceStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: companyConfig.brandName,
  image: `${SITE_URL}/og-kah-digital.png`,
  url: SITE_URL,
  email: brandContact.email,
  telephone: brandContact.phoneHref,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyConfig.address,
    postalCode: companyConfig.postalCode,
    addressLocality: companyConfig.city,
    addressCountry: companyConfig.country,
  },
  areaServed: ["Switzerland", "France", "Europe"],
  availableLanguage: ["fr", "en", "de"],
  serviceType: [
    "Business website development",
    "Website redesign",
    "Custom web application development",
    "AI automation for business",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "KAH-Digital services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Business website development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website redesign",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom web applications",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI assistants and automations",
        },
      },
    ],
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: companyConfig.brandName,
  url: SITE_URL,
  inLanguage: ["fr", "en", "de"],
};

export const siteStructuredData = [
  organizationStructuredData,
  professionalServiceStructuredData,
  websiteStructuredData,
];

type BuildServiceStructuredDataInput = {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  serviceType: string;
};

export function buildServiceStructuredData({
  locale,
  path,
  name,
  description,
  serviceType,
}: BuildServiceStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: getAbsoluteUrl(path, locale),
    availableLanguage: ["fr", "en", "de"],
    areaServed: ["Switzerland", "France", "Europe"],
    provider: {
      "@type": "ProfessionalService",
      name: companyConfig.brandName,
      url: SITE_URL,
    },
  };
}
