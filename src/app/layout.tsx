import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { FlashInteractions } from "@/components/flash-interactions";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteProviders } from "@/components/site-providers";
import { companyConfig } from "@/config/company";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app").trim().replace(/\/+$/, "");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAH-Digital",
    template: "%s | KAH-Digital",
  },
  description:
    "Agence digitale premium. Sites vitrines, e-commerce et experiences sur mesure avec un process limpide.",
  keywords: ["agence web", "site vitrine", "Next.js", "landing page", "design system", "KAH-Digital"],
  category: "technology",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    title: "KAH-Digital",
    description: "Creation de sites, landing pages et experiences digitales. Devis rapide et reponse sous 24h.",
    url: "/",
    siteName: "KAH-Digital",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "KAH-Digital - agence digitale premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAH-Digital",
    description: "Sites et solutions digitales avec process express.",
    images: ["/og-kah-digital.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      en: "/en",
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

const structuredData = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        ) : null}
        <SiteProviders>
          <ScrollToTop />
          <FlashInteractions />
          <SiteHeader />
          <main className="main-surface min-h-screen">{children}</main>
          <SiteFooter />
        </SiteProviders>
      </body>
    </html>
  );
}
