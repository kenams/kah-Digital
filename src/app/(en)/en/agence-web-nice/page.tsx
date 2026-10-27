import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-nice"]!;

export const metadata: Metadata = {
  title: "Web Development Nice — KAH Digital | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Nice", "website Nice", "web agency Nice"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-nice" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
