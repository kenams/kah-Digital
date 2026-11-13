import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiLock, FiShield, FiTarget } from "react-icons/fi";
import { IA_OFFERS, formatIaAmount, type IaOffer } from "@/data/ia-offers";
import { SITE_URL, buildPageMetadata } from "@/lib/shared-metadata";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/ia-entreprise",
  title: "Formation et mise en place de l'IA en entreprise | KAH Digital Studio",
  description:
    "Ateliers IA sur vos tâches réelles, installation d'outils et accompagnement mensuel. Pour les entreprises et les particuliers. Prix affichés, paiement en ligne.",
  keywords: ["formation IA entreprise", "atelier IA PME", "former ses salariés à l'IA", "mise en place IA entreprise", "accompagnement IA", "cours IA particulier"],
});

const PRINCIPLES = [
  { icon: FiTarget, title: "Vos tâches, pas des exemples", text: "Chaque atelier part de ce que votre équipe fait vraiment chaque semaine." },
  { icon: FiLock, title: "Confidentialité d'abord", text: "On définit ce qui peut être confié à un outil IA et ce qui doit rester en interne." },
  { icon: FiShield, title: "Toujours vérifié par un humain", text: "L'IA prépare, une personne relit et valide. Rien ne part sans contrôle." },
];

const STEPS = [
  { n: "1", title: "Atelier", text: "On identifie les tâches qui prennent du temps et on apprend à les traiter avec l'IA." },
  { n: "2", title: "Mise en place", text: "On installe et on branche les outils sur le processus qui rapporte le plus." },
  { n: "3", title: "Accompagnement", text: "On ajuste chaque mois et on forme les nouveaux arrivants." },
];

const FAQ = [
  {
    q: "Faut-il des connaissances techniques ?",
    a: "Non. Les ateliers sont pensés pour des personnes qui utilisent un ordinateur au quotidien, sans compétence technique particulière.",
  },
  {
    q: "Quels outils utilisez-vous ?",
    a: "Les outils sont choisis selon votre besoin et vos règles de confidentialité (ChatGPT, Claude, Copilot, outils intégrés à vos logiciels…). Nous ne vous imposons pas d'abonnement.",
  },
  {
    q: "La formation est-elle finançable par un OPCO ou le CPF ?",
    a: "Non, pas à ce jour : ces ateliers ne sont pas certifiés Qualiopi. Le prix affiché est le prix payé, TVA non applicable (art. 293 B du CGI).",
  },
  {
    q: "Comment se passe la suite après le paiement ?",
    a: "Vous recevez une confirmation, puis nous vous contactons sous 48 h ouvrées pour fixer la date et préparer la séance avec vous.",
  },
  {
    q: "Et si la date ne convient plus ?",
    a: "La séance peut être déplacée sans frais en prévenant au moins 48 h avant. L'accompagnement mensuel se résilie à tout moment, effet à la fin du mois en cours.",
  },
];

function OfferCard({ offer }: { offer: IaOffer }) {
  const cta = offer.paymentUrl ? (offer.period ? "S'abonner" : "Réserver et payer") : "Demander un devis";
  const href = offer.paymentUrl ?? "/devis";
  const external = Boolean(offer.paymentUrl);
  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
        offer.featured ? "border-[#d6b36a]/60 bg-[#d6b36a]/[0.07]" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      {offer.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-[#d6b36a] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0a0908]">
          Le plus choisi
        </span>
      )}
      <h3 className="text-xl font-bold text-white">{offer.name}</h3>
      <p className="mt-1 text-sm text-white/60">{offer.format}</p>
      <p className="mt-5 text-[#f0d99b]">
        {offer.from && <span className="block text-xs font-semibold uppercase tracking-wider text-white/55">À partir de</span>}
        <span className="text-3xl font-extrabold tracking-tight">{formatIaAmount(offer.price)} €</span>
        {offer.period && <span className="ml-1 text-sm font-medium text-white/60">/ {offer.period}</span>}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-white/80">{offer.pitch}</p>
      <ul className="mt-5 flex-1 space-y-2.5 text-sm text-white/75">
        {offer.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <FiCheck size={16} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        {...(external ? { rel: "noopener" } : {})}
        className={`mt-7 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0908] ${
          offer.featured
            ? "bg-[#d6b36a] text-[#0a0908] hover:bg-[#f0d99b]"
            : "border border-white/20 text-white hover:border-[#d6b36a]/70 hover:bg-white/[0.06]"
        }`}
      >
        {cta} <FiArrowRight size={15} aria-hidden="true" />
      </a>
      {external && <p className="mt-3 text-center text-xs text-white/45">Paiement sécurisé par Stripe</p>}
    </article>
  );
}

export default function IaEntreprisePage() {
  const business = IA_OFFERS.filter((o) => o.audience === "entreprise");
  const personal = IA_OFFERS.filter((o) => o.audience === "particulier");
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/ia-entreprise#service`,
        name: "Formation et mise en place de l'IA",
        provider: { "@type": "Organization", name: "KAH Digital Studio", url: SITE_URL },
        areaServed: ["FR", "CH", "BE"],
        offers: IA_OFFERS.map((o) => ({
          "@type": "Offer",
          name: o.name,
          price: o.price,
          priceCurrency: "EUR",
          url: `${SITE_URL}/ia-entreprise`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "IA en entreprise", item: `${SITE_URL}/ia-entreprise` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <JsonLd data={graph} />

      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">
            Formation · Mise en place · Accompagnement
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">L&apos;IA utile à votre entreprise, de la formation à la mise en place</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
            Tout le monde a accès aux mêmes outils. La différence, c&apos;est de savoir s&apos;en servir sur son propre métier, sans prendre de risque avec ses données.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#entreprises" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#d6b36a] px-6 font-semibold text-[#0a0908] transition hover:bg-[#f0d99b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0908]">
              Offres entreprises <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#particuliers" className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 px-6 font-semibold text-white transition hover:border-[#d6b36a]/70 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b]">
              Offres particuliers
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8" aria-label="Notre approche">
        <ul className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <Icon size={20} className="text-[#d6b36a]" aria-hidden="true" />
              <h2 className="mt-3 text-base font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="entreprises" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="ent-title">
        <h2 id="ent-title" className="text-3xl font-bold sm:text-4xl">Pour les entreprises</h2>
        <p className="mt-3 max-w-2xl text-white/65">Indépendants, TPE et PME. Commencez par un atelier : il montre vite où l&apos;IA fait gagner du temps chez vous.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {business.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8" aria-labelledby="steps-title">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <h2 id="steps-title" className="text-2xl font-bold">Comment on avance</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6b36a]/50 font-bold text-[#f0d99b]" aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="particuliers" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="perso-title">
        <h2 id="perso-title" className="text-3xl font-bold sm:text-4xl">Pour les particuliers</h2>
        <p className="mt-3 max-w-2xl text-white/65">Des sessions individuelles à distance pour utiliser l&apos;IA sur un objectif précis.</p>
        <div className="mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {personal.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-bold">Questions fréquentes</h2>
        <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d99b]">
                {f.q}
                <span className="text-[#d6b36a] transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/60">
          Une question avant de réserver ?{" "}
          <Link href="/contact" className="font-semibold text-[#f0d99b] underline-offset-4 hover:underline">
            Écrivez-nous
          </Link>
        </p>
      </section>
    </div>
  );
}
