import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurateur de projet",
  description: "Décris ton site ou ton app en quelques étapes pour obtenir un devis clair.",
};

export default function ConfiguratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
