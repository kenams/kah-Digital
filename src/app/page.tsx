import type { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";
import { homeData } from "@/data/home";

export const metadata: Metadata = {
  title: "Solutions digitales pour la Suisse et l'international",
  description:
    "Sites web, applications web et mobiles, portails clients et solutions PME basees en Suisse. KAH-Digital accompagne la Suisse romande et l'international.",
};

export default function Home() {
  return <HomePageClient data={homeData} />;
}
