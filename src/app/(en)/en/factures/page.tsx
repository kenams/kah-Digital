import type { Metadata } from "next";
import { InvoicesPageContent } from "@/components/pages/invoices-page-content";

export const metadata: Metadata = {
  title: "Invoices",
  description: "See KAH-Digital invoice structure and billing logic.",
};

export default function InvoicesPageEn() {
  return <InvoicesPageContent locale="en" />;
}
