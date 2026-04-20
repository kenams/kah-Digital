import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/contact",
  title: "Contact",
  description: "Tell us about your website, app, AI, or support need. Clear reply within 24 hours.",
});

export default function ContactPageEn() {
  return <ContactPageContent locale="en" />;
}
