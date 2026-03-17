import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiMapPin, FiSearch, FiTrendingUp, FiZap } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Création de site vitrine en Suisse",
  description:
    "Création de site vitrine et de site web professionnel en Suisse romande. KAH-Digital conçoit des sites rapides, bien référencés et pensés pour générer des demandes.",
  keywords: [
    "site vitrine suisse",
    "création site vitrine lausanne",
    "agence web suisse romande",
    "création site web lausanne",
    "refonte site vitrine",
  ],
};

export default function SiteWebPage() {
  const outcomes = [
    "Site vitrine clair, rapide et crédible",
    "Positionnement plus net sur vos services",
    "Base SEO propre pour les recherches en Suisse",
    "Parcours simple pour convertir les visiteurs en demandes",
  ];

  const deliverables = [
    "Arborescence pensée pour vos offres et votre zone géographique",
    "Design responsive, rapide et facile à maintenir",
    "Pages services rédigées pour capter des recherches utiles",
    "Formulaires de contact et appels à l'action visibles",
  ];

  const packages = [
    {
      name: "Site vitrine essentiel",
      price: "A partir de 3'500 CHF",
      features: [
        "Site vitrine de 5 à 8 pages",
        "Structure SEO de base",
        "Formulaire de contact et conversion",
        "Mise en ligne et prise en main",
      ],
    },
    {
      name: "Site vitrine business",
      price: "A partir de 6'500 CHF",
      features: [
        "Pages services approfondies",
        "Blog ou actualités",
        "Tracking et analytics",
        "Optimisation conversion",
        "Maintenance initiale",
      ],
    },
    {
      name: "Plateforme sur mesure",
      price: "A partir de 12'000 CHF",
      features: [
        "Expérience sur mesure",
        "E-commerce ou espace client",
        "Intégrations métier",
        "Accompagnement stratégique",
        "Support prioritaire",
      ],
    },
  ];

  const process = [
    { step: "01", title: "Cadrage", description: "Objectifs, cible, offres et priorités SEO" },
    { step: "02", title: "Structure", description: "Pages, messages clés et maquette" },
    { step: "03", title: "Production", description: "Développement, responsive et performance" },
    { step: "04", title: "Lancement", description: "Mise en ligne, indexation et suivi" },
  ];

  const areas = ["Lausanne", "Genève", "Vaud", "Fribourg", "Neuchâtel", "Suisse romande"];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm text-blue-100">
            <FiMapPin className="mr-2" />
            Création de site vitrine depuis Lausanne
          </span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Création de site vitrine en Suisse</h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-50">
            Nous concevons des sites vitrines et des sites web professionnels qui rassurent, expliquent clairement
            votre offre et vous rendent plus visible sur les recherches locales et sectorielles.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/devis"
              className="rounded-full bg-white px-8 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
            >
              Demander un devis
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-950"
            >
              Parler du projet <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="mb-6 text-3xl font-bold text-slate-950">Ce que votre site doit réellement faire</h2>
            <ul className="space-y-4">
              {outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start text-slate-700">
                  <FiTrendingUp className="mr-3 mt-1 text-blue-600" size={18} />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-3xl font-bold text-slate-950">Ce que nous livrons</h2>
            <ul className="space-y-4">
              {deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start text-slate-700">
                  <FiCheck className="mr-3 mt-1 text-emerald-600" size={18} />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-950">Formats de projet</h2>
            <p className="mt-4 text-xl text-slate-600">Du site vitrine essentiel à la plateforme plus ambitieuse.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {packages.map((pkg) => (
              <article key={pkg.name} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-2xl font-bold text-slate-950">{pkg.name}</h3>
                <p className="mb-6 mt-2 text-lg font-semibold text-blue-700">{pkg.price}</p>
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start text-slate-700">
                      <FiCheck className="mr-3 mt-1 text-emerald-600" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/devis"
                  className="block rounded-full bg-slate-950 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Demander un chiffrage
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-950">Une méthode simple et visible</h2>
            <p className="mt-4 text-xl text-slate-600">Peu d'intermédiaires, des décisions claires, un site prêt à être indexé.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {process.map((item) => (
              <div key={item.step} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Zones ciblées en priorité</h2>
              <p className="mt-4 mb-6 text-lg text-slate-300">
                Nous pouvons intervenir partout, mais cette page est conçue pour être pertinente sur des recherches
                liées à la Suisse et à la Suisse romande.
              </p>
              <div className="flex flex-wrap gap-3">
                {areas.map((area) => (
                  <span key={area} className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-100">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 text-slate-950">
              <FiSearch className="mb-4 text-blue-600" size={36} />
              <h3 className="text-2xl font-bold">Objectif concret</h3>
              <p className="mt-3 text-slate-600">
                Ressortir sur des recherches du type site vitrine, création site web et refonte de site en Suisse.
              </p>
              <div className="mt-4 flex items-start text-slate-700">
                <FiZap className="mr-3 mt-1 text-blue-600" size={18} />
                <span>Le plus important reste ensuite la Search Console, les pages indexées et les premiers signaux réels.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Prêt à lancer ou refondre votre site ?</h2>
          <p className="mt-4 text-xl">
            Discutons du positionnement, du périmètre et de la meilleure structure pour votre projet.
          </p>
          <Link
            href="/devis"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-semibold text-blue-700 transition-colors hover:bg-slate-100"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
