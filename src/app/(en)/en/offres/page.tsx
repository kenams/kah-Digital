import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/offres",
  title: "Custom offers — Websites, apps & AI | KAH-Digital",
  description: "Adjustable digital services for websites, custom web apps and AI automation. Clear custom quote within 24h.",
  keywords: ["custom web agency quote", "custom digital solution", "custom web app quote", "AI automation quote"],
});

export default function OffresPageEn() {
  return <OffersPageContent locale="en" />;
}
