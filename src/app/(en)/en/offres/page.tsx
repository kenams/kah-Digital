import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/offres",
  title: "Pricing & offers — Websites, apps & AI | KAH-Digital",
  description: "Clear pricing for websites, custom web apps, and AI automation. Custom quote within 24h. From € 300.",
  keywords: ["web agency pricing", "website cost Switzerland", "custom web app quote", "AI automation pricing"],
});

export default function OffresPageEn() {
  return <OffersPageContent locale="en" />;
}
