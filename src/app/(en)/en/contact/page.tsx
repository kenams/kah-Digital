import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your website, app, AI, or support need. Clear reply within 24 hours.",
};

export default function ContactPageEn() {
  return <ContactPageContent locale="en" />;
}
