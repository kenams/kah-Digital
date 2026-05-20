import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/refonte-site-web",
  title: "Website-Refonte · +40% Conversions garantiert | KAH Digital",
  description:
    "Website-Refonte auf Next.js 15: Premium UX, Ladezeit unter 2s, conversion-optimiert. Ihre alte Website kostet Sie Kunden — wir machen daraus eine Lead-Maschine. Kostenloses Audit.",
  keywords: [
    "Website Refonte Schweiz",
    "Website Redesign Lausanne",
    "Website Neugestaltung KMU",
    "Webseite modernisieren Schweiz",
    "Website Überarbeitung Next.js",
  ],
});

export default function RefonteSiteWebPageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="refonte-site-web" />;
}
