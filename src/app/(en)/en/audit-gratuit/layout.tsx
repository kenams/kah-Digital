import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/audit-gratuit",
  title: "Free website audit — score, issues & recommendations",
  description: "Get a free audit of your website within 24h: digital score /100, SEO, speed and mobile issues, and concrete recommendations. No commitment. KAH Digital Studio.",
  keywords: ["free website audit", "free SEO analysis", "website score", "improve website"],
});

export default function AuditGratuitLayoutEn({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
