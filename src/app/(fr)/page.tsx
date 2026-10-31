import { buildPageMetadata } from "@/lib/shared-metadata";
import { HeroSection } from "@/components/hero-section";
import { AiSystemsSection } from "@/components/ai-systems-section";
import { TrustBar } from "@/components/trust-bar";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { CyberBandSection } from "@/components/cyber-band-section";

// Nettoyage homepage 2026-08-02 (demande explicite de Kenams : "c'est
// brouillon [...] on ne sait pas ce que je fais, site web ? appli ? IA ?
// refactoring ?"). Page ramenée à un seul fil narratif — Hero → Offre IA →
// Preuve → Prix → FAQ → CTA — plutôt que 18 sections qui racontaient
// plusieurs métiers différents à la fois (agence web générique, SaaS,
// portfolio, process...). Composants retirés toujours présents dans
// src/components/ si besoin de les réutiliser ailleurs (ex: page /offres),
// juste plus sur la home.

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/",
  title: "KAH Digital Studio — Sites web, agents IA et cybersécurité",
  description:
    "KAH Digital Studio crée des sites vitrines avec prise de rendez-vous en ligne et des agents IA sur mesure pour indépendants et PME. Prix fixe, livré en quelques jours. Clients en France et en Suisse.",
  keywords: [
    "agent IA vertical",
    "agence IA Suisse", "agence IA France",
    "chef de cabinet IA artiste",
    "automatisation métier IA",
    "AI agent for musicians",
    "KAH Workforce",
    "agence automatisation IA Suisse",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce qu'un agent IA vertical ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un agent IA vertical est branché sur un seul métier, du début à la fin — contrairement à ChatGPT ou Claude génériques. Il connaît vos process, vos outils, votre vocabulaire, et agit à votre place (admin, suivi, relances, décisions courantes). Exemple en production : KAH Workforce, chef de cabinet IA pour artistes indépendants.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi pas juste utiliser ChatGPT ou Claude directement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un chatbot générique ne connaît ni votre historique, ni vos outils, ni les spécificités de votre métier — vous reformulez tout à chaque fois. Un agent KAH Digital Studio est intégré à vos outils réels, se souvient de tout, et agit de façon autonome sans que vous ayez à le piloter au prompt.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour livrer ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter (site vitrine) : 2–3 semaines. Professional (système complet) : 4–6 semaines. Elite (infrastructure IA) : selon le scope, de 6 semaines à 4 mois.",
      },
    },
    {
      "@type": "Question",
      name: "Travaillez-vous avec des clients en dehors de la Suisse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. KAH Digital Studio opère à l'international — Suisse, France, Belgique, Canada, Afrique francophone, UK, US. Tout se fait à distance sans friction.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se passe l'audit gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous soumettez votre site web et votre email. En moins de 24h, vous recevez un rapport personnalisé : performance, SEO, conversion, recommandations prioritaires — sans engagement.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il un engagement ou abonnement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Chaque projet est sur devis accepté, sans abonnement obligatoire. Des formules de support mensuel sont disponibles après livraison, mais jamais imposées.",
      },
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "KAH Digital Studio",
  alternateName: "KAH Digital Studio",
  url: "https://kah-digital.ch",
  logo: "https://kah-digital.ch/favicon.svg",
  email: "kahdigital42@gmail.com",
  telephone: "+33759558414",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  areaServed: ["CH", "FR", "BE", "LU", "MA", "SN", "CI", "US", "GB", "DE"],
  availableLanguage: ["French", "English", "German"],
  description:
    "KAH Digital Studio crée des sites vitrines avec prise de rendez-vous en ligne et des agents IA sur mesure pour indépendants et PME. Prix fixe, livré en quelques jours. Clients en France et en Suisse.",
  serviceType: [
    "Vertical AI Agents",
    "AI Chief of Staff for Artists",
    "Business Process Automation",
    "Custom AI Agents",
    "Premium Web Platforms",
    "SaaS Development",
  ],
  sameAs: [
    "https://www.linkedin.com/in/kah-digital-95128b408/",
    "https://x.com/DigitalKah42",
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <HeroSection />
      <AiSystemsSection />
      <TrustBar />
      <PricingSection />
      <CyberBandSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
