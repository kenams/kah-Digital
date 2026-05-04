"use client";

import { Reveal } from "@/components/reveal";
import { useLocale } from "@/lib/locale";
import Link from "next/link";

const testimonialsFr = [
  {
    name: "Ashanti Beauty",
    role: "Marque beauté · e-commerce",
    quote:
      "Mise en ligne rapide, design soigné, on a eu des retours positifs de nos clientes dès le lancement. L'équipe était réactive et claire sur chaque étape.",
    real: true,
  },
  {
    name: "TechCash Academy",
    role: "Formation en ligne · plateforme SaaS",
    quote:
      "On cherchait quelqu'un de fiable sans payer une grande agence. KAH Digital a livré une plateforme propre, rapide et fonctionnelle dans les délais.",
    real: true,
  },
];

const testimonialsEn = [
  {
    name: "Ashanti Beauty",
    role: "Beauty brand · e-commerce",
    quote:
      "Fast launch, clean design — our customers loved it from day one. The team was responsive and clear at every step.",
    real: true,
  },
  {
    name: "TechCash Academy",
    role: "Online training · SaaS platform",
    quote:
      "We needed a reliable partner without agency prices. KAH Digital delivered a clean, fast platform on time.",
    real: true,
  },
];

const logos = ["Ashanti Beauty", "TechCash Academy"];

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
      <Reveal>
        <div className="flex flex-wrap items-center gap-6 text-sm uppercase tracking-[0.3em] text-white/40">
          {logos.map((logo) => (
            <span key={logo} className="text-white/60">
              {logo}
            </span>
          ))}
          <span className="text-white/30">
            {isEnglish ? "+ artisans · restaurants · local shops" : "+ artisans · restaurants · commerces"}
          </span>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.1}>
            <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
              <p className="text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-4 text-sm text-white/60">
                {testimonial.name} | {testimonial.role}
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <div className="premium-card flex flex-col items-start justify-between rounded-3xl border border-dashed border-white/20 bg-white/3 p-6 text-white">
            <div>
              <p className="text-lg font-semibold text-white/80">
                {isEnglish ? "Your project here?" : "Votre projet ici ?"}
              </p>
              <p className="mt-2 text-sm text-white/50">
                {isEnglish
                  ? "We have slots open. Get a free quote in 24h."
                  : "On a des créneaux disponibles. Devis gratuit sous 24h."}
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
