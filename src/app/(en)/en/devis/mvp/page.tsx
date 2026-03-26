import type { Metadata } from "next";
import { MvpQuotePageContent } from "@/components/pages/mvp-quote-page-content";

export const metadata: Metadata = {
  title: "Mobile MVP quote",
  description: "Short form to scope an iOS or Android MVP.",
};

export default function DevisMvpPageEn() {
  return <MvpQuotePageContent locale="en" />;
}
