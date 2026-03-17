import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Offres web, mobile et solutions PME",
  description: "Offres Kah-Digital basees sur le marche suisse pour les sites web, applications et solutions PME.",
  alternates: {
    canonical: "/offres",
    languages: {
      en: "/en/offres",
    },
  },
  openGraph: {
    type: "website",
    title: "Offres web, mobile et solutions PME",
    description: "Offres Kah-Digital basees sur le marche suisse pour les sites web, applications et solutions PME.",
    url: "/offres",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "Offres Kah-Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offres web, mobile et solutions PME",
    description: "Offres Kah-Digital basees sur le marche suisse pour les sites web, applications et solutions PME.",
    images: ["/og-kah-digital.png"],
  },
};

const offers = [
  {
    id: "site-vitrine-suisse",
    title: "Site vitrine PME",
    price: "Des 3'500 CHF",
    timeline: "3 a 5 semaines",
    summary: "Un site clair pour presenter l'activite, rassurer les prospects et capter des demandes qualifiees.",
    why: "Calibre pour le marche suisse: cadrage, direction visuelle, pages services, SEO local de base et mise en ligne propre.",
    includes: [
      "Arborescence + message principal",
      "Design responsive et pages services",
      "Formulaire de contact ou devis",
      "SEO de base + mise en ligne",
    ],
    ideal: ["PME suisses", "Cabinets", "Artisans", "Services B2B"],
    ctaHref: "/devis",
  },
  {
    id: "application-metier",
    title: "Application web metier",
    price: "Des 9'000 CHF",
    timeline: "6 a 10 semaines",
    summary: "Un portail client, dashboard ou outil interne pour structurer un process concret dans l'entreprise.",
    why: "Le budget couvre l'authentification, les roles, la base de donnees, les ecrans metier et la logique back-end.",
    includes: [
      "Cadrage fonctionnel",
      "Auth + roles + permissions",
      "Dashboard / espace client",
      "Base de donnees et automatisations",
    ],
    ideal: ["PME en croissance", "Operations internes", "Portails clients", "Outils equipe"],
    ctaHref: "/devis",
  },
  {
    id: "mvp-mobile",
    title: "MVP mobile",
    price: "Des 14'000 CHF",
    timeline: "6 a 10 semaines",
    summary: "Une application iOS / Android pour tester un service, un produit ou une experience mobile avec un scope propre.",
    why: "Le budget couvre le design mobile, le build React Native, la logique serveur et la preparation beta / stores.",
    includes: [
      "Cadrage MVP et ecrans critiques",
      "Build React Native / Expo",
      "API / base de donnees",
      "Beta TestFlight / Android",
    ],
    ideal: ["Produit mobile", "MVP investisseur", "App client", "Service terrain"],
    ctaHref: "/devis/mvp",
  },
  {
    id: "support-it-glpi",
    title: "Support IT, IA et GLPI",
    price: "Des 4'500 CHF",
    timeline: "3 a 6 semaines",
    summary: "Assistant support de premier niveau, base de connaissances et escalation vers tickets GLPI si l'IA ne suffit pas.",
    why: "Le budget couvre le cadrage support, la base de reponses, l'integration GLPI et les garde-fous de workflow.",
    includes: [
      "Audit du support existant",
      "Base de connaissances / procedures",
      "Assistant IA de premier niveau",
      "Creation de tickets GLPI et suivi",
    ],
    ideal: ["PME avec support interne", "IT d'agence", "Support utilisateur", "Equipes helpdesk"],
    ctaHref: "/devis",
  },
];

export default function OffresPage() {
  return (
    <div className="section-shell space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link href="/" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Retour a l'accueil
        </Link>
        <Link href="/devis" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Demander un devis
        </Link>
      </div>

      <header className="premium-card rounded-[36px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Offres Kah-Digital</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Des offres coherentes avec le marche suisse.</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Ces fourchettes sont pensees pour la Suisse romande et les projets internationaux cadres depuis la Suisse. Le scope final reste affine selon le projet, les integrations et le niveau de finition.
        </p>
      </header>

      <div className="space-y-6">
        {offers.map((offer) => (
          <section
            key={offer.id}
            id={offer.id}
            className="premium-card rounded-[32px] border border-white/10 bg-black/40 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Offre</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{offer.title}</h2>
                <p className="mt-2 max-w-2xl text-white/70">{offer.summary}</p>
              </div>
              <div className="premium-card rounded-3xl border border-white/15 bg-white/5 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Budget indicatif</p>
                <p className="mt-1 text-2xl font-semibold">{offer.price}</p>
                <p className="mt-1 text-white/60">Delai moyen: {offer.timeline}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Pourquoi ce prix</p>
                <p className="mt-3 text-white/70">{offer.why}</p>
              </div>
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Inclus</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.includes.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Ideal pour</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.ideal.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link href={offer.ctaHref} className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200">
                {offer.ctaHref === "/devis/mvp" ? "Demander un devis mobile" : "Demander un devis"}
              </Link>
              <Link
                href="/configurateur"
                className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
              >
                Ouvrir le configurateur
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
