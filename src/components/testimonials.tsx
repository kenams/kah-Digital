"use client";

import { Reveal } from "@/components/reveal";
import { useLocale } from "@/lib/locale";

const testimonialsFr = [
  {
    name: "Clara M.",
    role: "Directrice Marketing, Lumea Skin",
    quote:
      "Execution rapide, finitions irreprochables. Le site est plus rapide et plus premium des la mise en ligne.",
  },
  {
    name: "Jonathan P.",
    role: "Founder, NovaPay",
    quote:
      "Process court et clair. Ils ont compris l'image premium et ont livre en avance.",
  },
  {
    name: "Marion L.",
    role: "Head of Brand, Atelier Nomade",
    quote:
      "Direction artistique solide, storytelling net et resultats concrets sur les leads.",
  },
];

const testimonialsEn = [
  {
    name: "Clara M.",
    role: "Marketing Director, Lumea Skin",
    quote:
      "Fast execution, flawless finishes. The site is faster and more premium right after launch.",
  },
  {
    name: "Jonathan P.",
    role: "Founder, NovaPay",
    quote:
      "Short and clear process. They understood the premium positioning and delivered early.",
  },
  {
    name: "Marion L.",
    role: "Head of Brand, Atelier Nomade",
    quote:
      "Strong art direction, clear storytelling, and tangible results on leads.",
  },
];

const logos = ["NovaPay", "Pulse Studio", "OKO Energy", "Atelier Nomade"];

export function Testimonials() {
  const { isEnglish } = useLocale();
  const testimonials = isEnglish ? testimonialsEn : testimonialsFr;

  return (
    <section className="section-shell space-y-8">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            {isEnglish ? "Trust" : "Confiance"}
          </p>
          <h2 className="text-3xl font-semibold text-white">
            {isEnglish ? "Trusted by demanding brands" : "Marques exigeantes accompagnees"}
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
      </div>
    </section>
  );
}
