import type { Metadata } from "next";
import LexiquePage from "@/app/(fr)/lexique/page";

export const metadata: Metadata = {
  title: "Lexikon",
  description: "Klare Begriffe zu Web, Produkt und Mobile in wenigen Minuten.",
  alternates: {
    canonical: "/de/lexique",
    languages: {
      fr: "/lexique",
      en: "/en/lexique",
    },
  },
};

export default function LexiquePageDe() {
  return <LexiquePage />;
}
