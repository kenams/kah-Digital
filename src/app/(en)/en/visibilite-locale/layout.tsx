import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/visibilite-locale",
  title: "Local visibility: reviews and Google profile handled for you | KAH Digital Studio",
  description: "Automatic review requests, a Google profile kept up to date and review replies written for you, with a numbers-based report each month. Waitlist open.",
  keywords: ["local visibility", "local SEO", "AI assistant recommendations local business", "google business profile"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
