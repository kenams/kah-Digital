import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/site-web-entreprise",
  title: "Premium business website · Delivered in 14 days | KAH Digital",
  description:
    "Enterprise-grade business website on Next.js 15 — SaaS-level design, Core Web Vitals 95+, technical SEO included. Delivered in 14 days, 100% yours. Free quote within 24h.",
});

export default function SiteWebEntreprisePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="site-web-entreprise" />;
}
