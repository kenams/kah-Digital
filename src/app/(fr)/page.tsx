import { buildPageMetadata } from "@/lib/shared-metadata";
import { HeroSection } from "@/components/hero-section";
import { StatsBar } from "@/components/stats-bar";
import { FreeCallSection } from "@/components/free-call-section";
import { TrustBar } from "@/components/trust-bar";
import { ProblemSection } from "@/components/problem-section";
import { ServicesGrid } from "@/components/services-grid";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CaseStudySection } from "@/components/case-study-section";
import { ProcessSection } from "@/components/process-section";
import { GlobalTrustSection } from "@/components/global-trust-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/",
  title: "Agence web Lausanne — Sites, apps & automatisation IA | KAH-Digital",
  description:
    "KAH-Digital crée des sites web, applications sur mesure et automatisations IA qui convertissent. Studio digital à Lausanne, disponible à distance. Devis gratuit sous 24h.",
  keywords: ["agence web Lausanne", "création site web Suisse", "automatisation IA entreprise", "application web sur mesure", "refonte site web", "site web PME"],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment est défini le devis d'un site web ou d'une application ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque projet est différent. Le devis dépend du besoin réel, de la complexité, du niveau d'accompagnement, des délais, des fonctionnalités, du budget disponible et des priorités business. Un premier échange permet de définir un périmètre clair et une proposition sans engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps faut-il pour livrer ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un site vitrine bien cadré : 3 à 4 semaines. Un site corporate ou une app simple : 4 à 8 semaines. Un projet plus complexe avec intégrations : 2 à 4 mois."
      }
    },
    {
      "@type": "Question",
      "name": "Travaillez-vous avec des clients en dehors de la Suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. KAH-Digital travaille à distance avec des clients francophones, anglophones et internationaux. La langue, le pays et le fuseau horaire ne sont pas un obstacle."
      }
    },
    {
      "@type": "Question",
      "name": "Pouvez-vous refaire ou améliorer un site existant ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. La refonte est l'un des services les plus demandés. On peut reprendre un site existant — WordPress, Wix, Squarespace ou autre — et le reconstruire proprement avec les bonnes performances, le bon SEO et une meilleure conversion."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles garanties avez-vous sur les projets livrés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chaque projet est livré avec un périmètre défini, testé sur desktop et mobile, et accompagné d'une période de corrections incluses après mise en ligne. Le devis est ferme, pas évolutif sans accord préalable."
      }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il un engagement minimal ou un abonnement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Chaque projet est traité sur devis accepté, sans abonnement obligatoire. Des formules de support et maintenance mensuelle sont disponibles après livraison, mais jamais imposées."
      }
    }
  ]
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "name": "KAH-Digital",
  "url": "https://kah-digital.ch",
  "logo": "https://kah-digital.ch/favicon.svg",
  "email": "kahdigital42@gmail.com",
  "telephone": "+33759558414",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue du Simplon 4",
    "postalCode": "1006",
    "addressLocality": "Lausanne",
    "addressCountry": "CH"
  },
  "areaServed": ["CH", "FR", "BE", "LU", "MA", "SN", "CI"],
  "availableLanguage": ["French", "English", "German"],
  "description": "KAH-Digital crée des sites web, applications sur mesure et automatisations IA pour PME, indépendants et entreprises en croissance.",
  "serviceType": ["Création de site web", "Application web sur mesure", "Automatisation IA", "Support GLPI", "Refonte site web"]
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <HeroSection />
      <StatsBar />
      <FreeCallSection />
      <TrustBar />
      <ProblemSection />
      <ServicesGrid />
      <WhyChooseSection />
      <TestimonialsSection />
      <CaseStudySection />
      <ProcessSection />
      <GlobalTrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
