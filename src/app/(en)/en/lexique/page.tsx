import type { Metadata } from "next";
import LexiquePage from "@/app/(fr)/lexique/page";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/lexique",
  title: "Glossary",
  description: "Clear definitions for web, product, and mobile terms in 5 minutes.",
});

export default function LexiquePageEn() {
  return <LexiquePage />;
}
