import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/offres",
  title: "Custom offers — Vertical AI agent, websites & SaaS | KAH Digital",
  description: "Adjustable services: custom vertical AI agent, websites, custom web apps, AI automation and SaaS. Clear custom quote within 24h.",
  keywords: ["vertical AI agent quote", "custom web agency quote", "custom digital solution", "custom web app quote", "AI automation quote"],
});

export default function OffresPageEn() {
  return <OffersPageContent locale="en" />;
}
