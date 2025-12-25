import { HomePageClient } from "@/components/home-page-client";
import { homeData } from "@/data/home";

export default function Home() {
  return <HomePageClient data={homeData} />;
}
