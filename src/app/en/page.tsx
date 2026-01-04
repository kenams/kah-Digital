import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";
import { homeDataEn } from "@/data/home.en";

export const metadata: Metadata = {
  title: "Kah-Digital | Premium websites & mobile apps",
  description: "Premium digital studio. Websites, e-commerce and custom experiences with a clear process.",
};

export default function HomePageEn() {
  return <HomePageClient data={homeDataEn} />;
}
