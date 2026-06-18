"use client";

import { Reveal } from "@/components/reveal";
import { useLocale } from "@/lib/locale";
import Link from "next/link";

const testimonialsFr = [
  {
    name: "Sophia L.",
    role: "Fondatrice · Ashanti Beauty, Balma",
    quote:
      "Site livré en 1 semaine, vidéo hero qui fonctionne parfaitement sur mobile, design qui reflète exactement notre univers premium. On a eu 12 réservations via le site la première semaine — contre zéro avant.",
  },
  {
    name: "Marcus D.",
    role: "Fondateur · TechCash Academy",
    quote:
      "La plateforme est propre, le checkout Stripe marche du premier coup et l'espace membre est clair. On a pu lancer une promo le lendemain de la mise en ligne sans accroc. Exactement ce qu'on cherchait.",
  },
  {
    name: "Ruby M.",
    role: "Artiste peintre · Ruby Gallery",
    quote:
      "KAH Digital a compris l'ambiance dès le premier appel. Mon site met en valeur mes œuvres sans les écraser, je gère le catalogue seule sans toucher au code. 3 ventes Stripe les 2 premières semaines.",
  },
  {
    name: "Amadou K.",
    role: "Fondateur · TontineApp",
    quote:
      "MVP livré en 5 semaines avec les cycles de tontine automatisés, les notifications push et le dashboard communautaire. On a onboardé 150 beta-testeurs sans bug critique. Communication réactive tout au long.",
  },
  {
    name: "Thomas F.",
    role: "Porteur de projet · DroPiPêche",
    quote:
      "App complète en 8 semaines — double parcours pêcheur/acheteur, géolocalisation, chat temps réel, QR code de livraison. KAH Digital a cadré le projet rapidement et livré quelque chose de vraiment structuré.",
  },
  {
    name: "Jordan T.",
    role: "Co-fondateur · FEATNESS",
    quote:
      "On avait besoin d'une app mobile ET d'un dashboard web en même temps. Livré en 6 semaines, déployé dans 2 salles de sport partenaires. 200 utilisateurs actifs le premier mois. Sérieux et propre.",
  },
];

const testimonialsEn = [
  {
    name: "Sophia L.",
    role: "Founder · Ashanti Beauty, Balma",
    quote:
      "Site delivered in 1 week, HD video working perfectly on mobile, design that reflects our premium universe exactly. We got 12 online bookings the first week — compared to zero before.",
  },
  {
    name: "Marcus D.",
    role: "Founder · TechCash Academy",
    quote:
      "The platform is clean, Stripe checkout works first try, member area is clear. We launched a promo the day after going live with zero issues. Exactly what we needed.",
  },
  {
    name: "Ruby M.",
    role: "Painter · Ruby Gallery",
    quote:
      "KAH Digital understood the vibe from the first call. My site showcases my work without overwhelming it. I manage the catalogue myself without touching code. 3 Stripe sales in the first 2 weeks.",
  },
  {
    name: "Amadou K.",
    role: "Founder · TontineApp",
    quote:
      "MVP delivered in 5 weeks with automated tontine cycles, push notifications and community dashboard. We onboarded 150 beta testers with zero critical bugs. Responsive throughout.",
  },
  {
    name: "Thomas F.",
    role: "Project lead · DroPiPêche",
    quote:
      "Full app in 8 weeks — dual fisherman/buyer flow, geolocation, real-time chat, delivery QR code. KAH Digital scoped the project fast and delivered something genuinely structured.",
  },
  {
    name: "Jordan T.",
    role: "Co-founder · FEATNESS",
    quote:
      "We needed a mobile app AND a web dashboard simultaneously. Delivered in 6 weeks, deployed in 2 partner gyms. 200 active users the first month. Serious, clean work.",
  },
];

const clientLogos = [
  "Ashanti Beauty",
  "TechCash Academy",
  "Ruby Gallery",
  "TontineApp",
  "DroPiPêche",
  "Immortal Arena",
  "FEATNESS",
  "SpotFinder",
];

export function Testimonials() {
  const { isEnglish, prefix } = useLocale();
  const testimonials = isEnglish ? testimonialsEn : testimonialsFr;
  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="section-shell space-y-8">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            {isEnglish ? "They trusted us" : "Ils nous ont fait confiance"}
          </p>
          <h2 className="text-3xl font-semibold text-white">
            {isEnglish ? "Real clients, real results" : "De vrais clients, de vrais résultats"}
          </h2>
        </div>
      </Reveal>

      {/* Barre de logos clients */}
      <Reveal>
        <div className="hide-scrollbar flex gap-6 overflow-x-auto py-1 text-xs uppercase tracking-[0.3em] text-white/40">
          {clientLogos.map((logo) => (
            <span key={logo} className="shrink-0 text-white/50">
              {logo}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Grille témoignages */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.08}>
            <div className="premium-card flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
              <div>
                <div className="mb-4 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4 text-sm">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-white/50">{testimonial.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <div className="premium-card flex h-full flex-col items-start justify-between rounded-3xl border border-dashed border-white/20 bg-white/3 p-6 text-white">
            <div>
              <p className="text-lg font-semibold text-white/80">
                {isEnglish ? "Your project here?" : "Votre projet ici ?"}
              </p>
              <p className="mt-2 text-sm text-white/50">
                {isEnglish
                  ? "We have slots open. Proposal within 24h, no commitment."
                  : "Créneaux disponibles. Proposition sous 24h, sans engagement."}
              </p>
            </div>
            <Link
              href={withPrefix("/devis")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              {isEnglish ? "Start now" : "Démarrer maintenant"}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
