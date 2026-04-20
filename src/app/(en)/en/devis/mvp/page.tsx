import type { Metadata } from "next";
import { MvpQuotePageContent } from "@/components/pages/mvp-quote-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "en",
  path: "/devis/mvp",
  title: "Mobile MVP quote",
  description: "Short form to scope an iOS or Android MVP.",
});

export default function DevisMvpPageEn() {
  return <MvpQuotePageContent locale="en" />;
}
