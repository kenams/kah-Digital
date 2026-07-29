import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/devis",
  title: "Custom quote — Vertical AI agent, website or app | KAH Digital",
  description: "Describe your need even without a full specification document. KAH Digital prepares a clear, adjustable, no-commitment proposal within 24h — from a vertical AI agent to a website.",
  keywords: ["vertical AI agent quote", "free website quote", "web agency estimate Switzerland", "custom web app quote", "AI project quote"],
});

export default function DevisPageEn() {
  return <QuotePageContent locale="en" />;
}
