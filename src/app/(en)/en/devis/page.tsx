import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/devis",
  title: "Free quote — Website, app or AI project | KAH-Digital",
  description: "Request a free quote for your digital project. Clear reply with budget, timeline, and recommendations within 24h. No commitment.",
  keywords: ["free website quote", "web agency estimate Switzerland", "custom web app quote", "AI project quote"],
});

export default function DevisPageEn() {
  return <QuotePageContent locale="en" />;
}
