import type { Metadata } from "next";
import { InvoicesPageContent } from "@/components/pages/invoices-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "en",
  path: "/factures",
  title: "Invoices",
  description: "See KAH Digital invoice structure and billing logic.",
});

export default function InvoicesPageEn() {
  return <InvoicesPageContent locale="en" />;
}
