import type { Metadata } from "next";
import { InvoicesPageContent } from "@/components/pages/invoices-page-content";

export const metadata: Metadata = {
  title: "Rechnungen",
  description: "Rechnungsstruktur und Abrechnungslogik von KAH-Digital.",
};

export default function InvoicesPageDe() {
  return <InvoicesPageContent locale="de" />;
}
