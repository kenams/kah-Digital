import type { Metadata } from "next";
import { ThankYouPageContent } from "@/components/pages/thank-you-page-content";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function MerciPageEn() {
  return <ThankYouPageContent locale="en" />;
}
