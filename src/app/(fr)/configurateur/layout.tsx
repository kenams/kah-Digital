import type { Metadata } from "next";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/configurateur",
  title: "Configurateur de projet",
  description: "Décris ton site ou ton app en quelques étapes pour obtenir un devis clair.",
});

export default function ConfiguratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
