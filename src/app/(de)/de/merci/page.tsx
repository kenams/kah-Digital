import type { Metadata } from "next";
import { ThankYouPageContent } from "@/components/pages/thank-you-page-content";

export const metadata: Metadata = {
  title: "Danke",
  robots: { index: false, follow: false },
};

export default function MerciPageDe() {
  return <ThankYouPageContent locale="de" />;
}
