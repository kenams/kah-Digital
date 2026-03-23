import type { Metadata } from "next";
import { MvpQuotePageContent } from "@/components/pages/mvp-quote-page-content";

export const metadata: Metadata = {
  title: "MVP-Anfrage",
  description: "Kurze Anfrage fuer ein mobiles MVP mit KAH-Digital.",
  alternates: {
    canonical: "/de/devis/mvp",
    languages: {
      fr: "/devis/mvp",
      en: "/en/devis/mvp",
      de: "/de/devis/mvp",
    },
  },
};

export default function DevisMvpPageDe() {
  return <MvpQuotePageContent locale="de" />;
}
