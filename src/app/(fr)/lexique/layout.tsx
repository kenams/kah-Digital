import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/lexique",
  title: "Lexique",
  description: "Definitions claires pour les termes web, produit et mobile en quelques minutes.",
});

export default function LexiqueLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
