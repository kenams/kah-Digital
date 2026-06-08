import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/audit-gratuit",
  title: "Audit gratuit de votre site web — Score, problèmes & recommandations | KAH Digital",
  description: "Obtenez un audit gratuit de votre site web en 24h : score digital /100, problèmes SEO, vitesse, mobile et recommandations concrètes. Sans engagement. KAH Digital Lausanne.",
  keywords: ["audit site web gratuit", "analyse SEO gratuite", "audit digital PME", "score site web", "améliorer site web"],
});

export default function AuditGratuitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
