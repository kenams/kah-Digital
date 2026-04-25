import type { Metadata } from "next";
import { PaymentPageContent } from "@/components/pages/payment-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "en",
  path: "/payer",
  title: "Online payment",
  description: "Pay a KAH-Digital invoice, deposit, or balance by card.",
});

export default function PayPageEn() {
  return <PaymentPageContent locale="en" />;
}
