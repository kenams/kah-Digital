import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "en",
  path: "/offres",
  title: "Clear offers",
  description: "Simple offer details, budgets, and deliverables.",
});

export default function OffresPageEn() {
  return <OffersPageContent locale="en" />;
}
