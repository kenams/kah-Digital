import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { FlashInteractions } from "@/components/flash-interactions";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteProviders } from "@/components/site-providers";
import { StructuredData } from "@/components/structured-data";
import { GA_MEASUREMENT_ID, siteStructuredData } from "@/lib/shared-metadata";

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

type SiteRootShellProps = {
  children: React.ReactNode;
  htmlLang: "fr" | "en" | "de";
};

export function SiteRootShell({ children, htmlLang }: SiteRootShellProps) {
  return (
    <html lang={htmlLang}>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <StructuredData data={siteStructuredData} />
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
