import type { Metadata } from "next";
import { InvoicesPageContent } from "@/components/pages/invoices-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/factures",
  title: "Rechnungen",
  description: "Rechnungsstruktur und Abrechnungslogik von KAH-Digital.",
});

export default function InvoicesPageDe() {
  return <InvoicesPageContent locale="de" />;
}
