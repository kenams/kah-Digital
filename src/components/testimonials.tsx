import { Reveal } from "@/components/reveal";

const testimonials = [
  {
    name: "Laura F.",
    role: "CEO, Atelier Nomade",
    quote:
      "Brief clair, planning simple, résultat fidèle à l’agence. On peut envoyer un dossier en 3 minutes.",
  },
  {
    name: "Nassim C.",
    role: "CMO, Lumea Skin",
    quote:
      "Ils ont expliqué chaque choix technique (Next.js, Stripe) sans jargon et le taux de conversion a doublé.",
  },
  {
    name: "Gaelle B.",
    role: "Partner, Valoris Conseil",
    quote:
      "Le CMS + export PDF nous fait gagner des heures. L’équipe nous a guidés pas à pas.",
  },
];

const logos = ["NovaPay", "Pulse Studio", "OKO Energy", "Valoris Conseil"];

export function Testimonials() {
  return (
    <section className="section-shell space-y-8">
      <Reveal>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Confiance
          </p>
          <h2 className="text-3xl font-semibold text-white">
            50+ marques accompagnées
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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
              <p className="text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-4 text-sm text-white/60">
                {testimonial.name} · {testimonial.role}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
