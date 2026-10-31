import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/audit-gratuit",
  title: "Kostenloses Website-Audit — Score, Probleme & Empfehlungen",
  description: "Erhalten Sie innerhalb von 24h ein kostenloses Audit Ihrer Website: Digital-Score /100, SEO-, Geschwindigkeits- und Mobile-Probleme sowie konkrete Empfehlungen. Unverbindlich. KAH Digital Studio.",
  keywords: ["kostenloses Website-Audit", "kostenlose SEO-Analyse", "Website-Score", "Website verbessern"],
});

export default function AuditGratuitLayoutDe({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
