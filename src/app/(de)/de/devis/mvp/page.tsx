import type { Metadata } from "next";
import { MvpQuotePageContent } from "@/components/pages/mvp-quote-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/devis/mvp",
  title: "MVP-Anfrage",
  description: "Kurze Anfrage fuer ein mobiles MVP mit KAH-Digital.",
});

export default function DevisMvpPageDe() {
  return <MvpQuotePageContent locale="de" />;
}
