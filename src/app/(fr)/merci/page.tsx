import type { Metadata } from "next";
import { ThankYouPageContent } from "@/components/pages/thank-you-page-content";

export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return <ThankYouPageContent locale="fr" />;
}
