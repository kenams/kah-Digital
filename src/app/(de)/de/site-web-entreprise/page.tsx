import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/site-web-entreprise",
  title: "Premium Business-Website · In 5 Werktagen geliefert | KAH Digital Studio",
  description:
    "Enterprise-Grade Business-Website auf Next.js 15 — SaaS-Level Design, Lighthouse 95+, technisches SEO inklusive. In 5 Werktagen geliefert, 100% Ihr Eigentum. Kostenlose Offerte in 24h.",
  keywords: [
    "Business Website Schweiz",
    "Unternehmenswebsite Next.js",
    "Premium Webentwicklung Schweiz",
    "Website KMU Schweiz",
    "professionelle Website Schweiz",
  ],
});

export default function SiteWebEntreprisePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="site-web-entreprise" />;
}
