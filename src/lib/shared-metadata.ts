import { cleanUrl } from "@/lib/clean-url";
import type { Metadata } from "next";
import { companyConfig } from "@/config/company";
import type { Locale } from "@/lib/locales";
import { getLocalizedPath } from "@/lib/locales";
import { LOCALE_ROUTES } from "@/lib/locale-routes";

const DEFAULT_SITE_URL = "https://kah-digital.ch";
const rawSiteUrl = (cleanUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? DEFAULT_SITE_URL).trim().replace(/\/+$/, "");

export const SITE_URL = /^https:\/\/kah-digital-site(?:-[^./]+)?\.vercel\.app$/i.test(rawSiteUrl)
  ? DEFAULT_SITE_URL
  : rawSiteUrl;

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const localeMetadata = {
  fr: {
    description:
      "Agence digitale premium. Sites vitrines, e-commerce et expériences sur mesure avec un process limpide.",
    keywords: ["agence web", "site vitrine", "Next.js", "landing page", "design system", "KAH Digital Studio"],
    openGraphLocale: "fr_FR",
    alternateLocales: ["en_US", "de_CH"],
    openGraphDescription: "Création de sites, landing pages et expériences digitales. Devis rapide et réponse sous 24h.",
    openGraphAlt: "KAH Digital Studio - agence digitale premium",
    twitterDescription: "Sites et solutions digitales avec process express.",
  },
  en: {
    description:
      "Premium digital studio. Websites, landing pages, and custom solutions with a clear and fast process.",
    keywords: ["web agency", "business website", "Next.js", "landing page", "digital studio", "KAH Digital Studio"],
    openGraphLocale: "en_US",
    alternateLocales: ["fr_FR", "de_CH"],
    openGraphDescription: "Websites, landing pages, and digital solutions with a clear process and fast turnaround.",
    openGraphAlt: "KAH Digital Studio - premium digital studio",
    twitterDescription: "Websites and digital solutions with a clear process.",
  },
  de: {
    description:
      "Premium Digital-Studio in der Schweiz. Webseiten, Landing Pages und massgeschneiderte Lösungen mit einem klaren und schnellen Prozess.",
    keywords: ["Webentwicklung Schweiz", "Webseite erstellen", "Next.js", "Landing Page", "Digital Studio", "KAH Digital Studio"],
    openGraphLocale: "de_CH",
    alternateLocales: ["fr_FR", "en_US"],
    openGraphDescription: "Webseiten, Landing Pages und digitale Lösungen. Klarer Prozess, Angebot innerhalb von 24h.",
    openGraphAlt: "KAH Digital Studio - Premium Digital Studio Schweiz",
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
    default: "KAH Digital Studio",
    // Les titres de page contiennent déjà la marque : un suffixe doublonnait « | KAH Digital Studio | KAH Digital Studio ».
    template: "%s",
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

/** Titre sans la marque en suffixe ; au-delà de 70 caractères, coupé au dernier séparateur (Google tronque vers 60). */
export function sanitizePageTitle(title: string) {
  const base = title.replace(/\s*\|\s*KAH Digital Studio\s*$/i, "").trim();
  if (base.length <= 70) return base;
  const head = base.slice(0, 66);
  const cut = Math.max(head.lastIndexOf(" — "), head.lastIndexOf(" | "), head.lastIndexOf(" · "), head.lastIndexOf(": "), head.lastIndexOf(" - "));
  return (cut > 25 ? head.slice(0, cut) : head.replace(/\s+\S*$/, "")).trim();
}

/** Description sans dépasser ~160 caractères (Google tronque au-delà) : coupée à la fin d'une phrase, sinon au dernier mot. */
export function sanitizeDescription(description: string) {
  const text = description.trim();
  if (text.length <= 170) return text;
  const head = text.slice(0, 160);
  const sentence = Math.max(head.lastIndexOf(". "), head.lastIndexOf(" · "), head.lastIndexOf(" — "));
  if (sentence >= 90) return head.slice(0, sentence).replace(/[.\s·—-]+$/, "") + ".";
  return head.replace(/\s+\S*$/, "").replace(/[,;:\s]+$/, "") + "…";
}

/** hreflang uniquement vers les versions qui existent : une alternate en 404 est pire que pas d'alternate. */
function existingLanguages(path: string) {
  const exists = (locale: Locale) => path === "/" || LOCALE_ROUTES[locale].includes(path);
  return (["fr", "en", "de"] as const).filter(exists);
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
    description: sanitizeDescription(description),
    keywords: mergeKeywords(locale, keywords),
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(existingLanguages(path).map((l) => [l, getLocalizedPath(path, l)])),
        "x-default": getLocalizedPath(path, existingLanguages(path)[0] ?? locale),
      },
    },
    openGraph: {
      type: "website",
      locale: content.openGraphLocale,
      alternateLocale: content.alternateLocales,
      title: sanitizePageTitle(title),
      description: sanitizeDescription(description),
      url: canonical,
      siteName: "KAH Digital Studio",
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
      title: sanitizePageTitle(title),
      description: sanitizeDescription(description),
      images: ["/og-kah-digital.png"],
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
      title: "KAH Digital Studio",
      description: content.openGraphDescription,
      siteName: "KAH Digital Studio",
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
      title: "KAH Digital Studio",
      description: content.twitterDescription,
      images: ["/og-kah-digital.png"],
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
  description: "Administration et suivi interne KAH Digital Studio.",
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
  name: "KAH Digital Studio",
  image: `${SITE_URL}/og-kah-digital.png`,
  url: SITE_URL,
  telephone: companyConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: companyConfig.city,
    addressCountry: companyConfig.country,
  },
  sameAs: ["https://www.linkedin.com/company/kah-digital", "https://x.com/DigitalKah42"],
  areaServed: "Global",
  serviceType: ["Site vitrine", "Landing page", "E-commerce"],
};
