import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/site-web-entreprise",
  title: "Site web entreprise premium · Livré en 14 jours | KAH Digital",
  description:
    "Site web entreprise Next.js 15 — design niveau SaaS, Core Web Vitals 95+, SEO technique inclus. Livré en 14 jours, propriété 100% à vous. Devis gratuit sous 24h.",
});

export default function SiteWebEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="site-web-entreprise" />;
}

