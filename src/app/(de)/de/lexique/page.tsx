import type { Metadata } from "next";
import LexiquePage from "@/app/(fr)/lexique/page";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/lexique",
  title: "Lexikon",
  description: "Klare Begriffe zu Web, Produkt und Mobile in wenigen Minuten.",
});

export default function LexiquePageDe() {
  return <LexiquePage />;
}
