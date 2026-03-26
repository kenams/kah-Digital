import type { Metadata } from "next";
import { BriefPageContent } from "@/components/pages/brief-page-content";

export const metadata: Metadata = {
  title: "Project brief",
  description: "Interactive brief and PDF export to scope a digital project.",
  alternates: {
    canonical: "/en/cahier-des-charges",
    languages: {
      fr: "/cahier-des-charges",
      de: "/de/cahier-des-charges",
    },
  },
};

export default function CahierDesChargesPageEn() {
  return <BriefPageContent locale="en" />;
}
