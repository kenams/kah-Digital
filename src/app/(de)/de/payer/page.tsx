import type { Metadata } from "next";
import { PaymentPageContent } from "@/components/pages/payment-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/payer",
  title: "Online-Zahlung",
  description: "Zahlen Sie eine KAH-Digital Rechnung, Anzahlung oder einen Restbetrag per Karte.",
});

export default function PayPageDe() {
  return <PaymentPageContent locale="de" />;
}
