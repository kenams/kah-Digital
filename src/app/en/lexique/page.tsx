import type { Metadata } from "next";
import LexiquePage from "@/app/lexique/page";

export const metadata: Metadata = {
  title: "Glossary | Kah-Digital",
  description: "Clear definitions for web, product, and mobile terms in 5 minutes.",
};

export default function LexiquePageEn() {
  return <LexiquePage />;
}
