import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/visibilite-locale",
  title: "Local visibility: do Google, Maps and AI assistants recommend you? | KAH Digital Studio",
  description: "A monthly check of your local visibility across Google, Maps and AI assistants: score, competitors and a concrete action plan. Waitlist open.",
  keywords: ["local visibility", "local SEO", "AI assistant recommendations local business", "google business profile"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
