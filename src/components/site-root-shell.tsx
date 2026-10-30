import { DM_Sans, Geist_Mono, Syne } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import { FlashInteractions } from "@/components/flash-interactions";
import { PageViewTracker } from "@/components/page-view-tracker";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteProviders } from "@/components/site-providers";
import { UrgencyBanner } from "@/components/urgency-banner";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { FloatingCTA } from "@/components/floating-cta";
import { GA_MEASUREMENT_ID, structuredData } from "@/lib/shared-metadata";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

type SiteRootShellProps = {
  children: React.ReactNode;
  htmlLang: "fr" | "en" | "de";
};

export function SiteRootShell({ children, htmlLang }: SiteRootShellProps) {
  return (
    <html lang={htmlLang}>
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <CookieConsent gaId={GA_MEASUREMENT_ID} />
        <PageViewTracker />
        <SiteProviders>
          <CursorGlow />
          <ScrollProgress />
          <UrgencyBanner />
          <ScrollToTop />
          <FlashInteractions />
          <SiteHeader />
          <main className="main-surface min-h-screen">{children}</main>
          <SiteFooter />
          <FloatingCTA />
        </SiteProviders>
      </body>
    </html>
  );
}
