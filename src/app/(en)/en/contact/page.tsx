import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KAH-Digital for your digital projects. Reply within 24 hours.",
};

export default function ContactPageEn() {
  return <ContactPageContent locale="en" />;
}
