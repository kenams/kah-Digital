import type { Metadata } from "next";
import { MvpQuotePageContent } from "@/components/pages/mvp-quote-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/devis/mvp",
  title: "Offerte mobiles MVP",
  description: "Kurzes Formular, um ein iOS- oder Android-MVP zu skizzieren.",
});

export default function DevisMvpPageDe() {
  return <MvpQuotePageContent locale="de" />;
}
