import type { Metadata } from "next";
import LexiquePage from "@/app/(fr)/lexique/page";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Clear definitions for web, product, and mobile terms in 5 minutes.",
  alternates: {
    canonical: "/en/lexique",
    languages: {
      fr: "/lexique",
      de: "/de/lexique",
    },
  },
};

export default function LexiquePageEn() {
  return <LexiquePage />;
}
