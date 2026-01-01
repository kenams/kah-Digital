import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FlashInteractions } from "@/components/flash-interactions";
import { SiteProviders } from "@/components/site-providers";
import { ScrollToTop } from "@/components/scroll-to-top";
import { GlobalScrollProgress } from "@/components/global-scroll-progress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kah-Digital — sites & solutions premium",
    template: "%s | Kah-Digital",
  },
  description:
    "Agence digitale premium. Sites vitrines, e-commerce et expériences sur mesure avec un process limpide.",
  keywords: [
    "agence web",
    "site vitrine",
    "Next.js",
    "landing page",
    "design system",
    "Kah-Digital",
  ],
  category: "technology",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Kah-Digital — sites & solutions digitales premium",
    description:
      "Création de sites, landing pages et expériences digitales. Devis rapide et réponse sous 24h.",
    url: SITE_URL,
    siteName: "Kah-Digital",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "Kah-Digital — agence digitale premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kah-Digital — agence web premium",
    description: "Sites & solutions digitales avec process express.",
    images: ["/og-kah-digital.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kah-Digital",
  image: `${SITE_URL}/og-kah-digital.png`,
  url: SITE_URL,
  telephone: "+33 7 59 55 84 14",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10 rue de la Création",
    addressLocality: "Paris",
    postalCode: "75000",
    addressCountry: "FR",
  },
  sameAs: [
    "https://www.linkedin.com",
    "https://www.instagram.com",
  ],
  areaServed: "Global",
  serviceType: [
    "Site vitrine",
    "Landing page",
    "E-commerce",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteProviders>
          <ScrollToTop />
          <FlashInteractions />
          <SiteHeader />
          <main className="main-surface min-h-screen">
            {children}
          </main>
          <SiteFooter />
          <GlobalScrollProgress />
        </SiteProviders>
      </body>
    </html>
  );
}
