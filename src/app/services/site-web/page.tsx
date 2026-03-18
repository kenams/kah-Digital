import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiCompass, FiMonitor, FiTrendingUp } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Sites web pour entreprises | KAH-Digital",
  description:
    "Creation de sites web vitrines, sites corporate et plateformes sur mesure pour entreprises en Suisse et a l'international. KAH-Digital, base a Lausanne.",
};

export default function SiteWebPage() {
  const painPoints = [
    "Site absent, ancien ou peu convaincant",
    "Image de marque qui ne reflete pas le niveau reel de l'entreprise",
    "Peu de demandes entrantes depuis le web",
    "Contenu difficile a faire evoluer en interne",
  ];

  const outcomes = [
    "Presentation plus claire de l'offre et du positionnement",
    "Site plus propre, rapide et plus facile a faire vivre",
    "Parcours de contact et de devis plus direct",
    "Base solide pour mieux travailler votre visibilite en ligne",
  ];

  const offers = [
    {
      name: "Essentiel",
      price: "A partir de 2'900 CHF",
      features: [
        "Site vitrine 4 a 6 pages",
        "Design responsive",
        "Formulaire de contact",
        "Base SEO propre",
        "Mise en ligne et prise en main",
      ],
    },
    {
      name: "Business",
      price: "A partir de 5'500 CHF",
      features: [
        "Site corporate plus complet",
        "Pages services structurees",
        "CMS ou zone d'edition",
        "Suivi analytics",
        "Accompagnement au lancement",
      ],
    },
    {
      name: "Sur mesure",
      price: "A partir de 9'500 CHF",
      features: [
        "Direction plus premium",
        "Parcours conversion travaille",
        "Connexions a vos outils",
        "Fonctionnalites metier specifiques",
        "Support de lancement prioritaire",
      ],
    },
  ];

  const process = [
    { step: "01", title: "Cadrage", description: "Objectifs, structure du site, pages utiles et priorites business." },
    { step: "02", title: "Direction", description: "Univers visuel, rythme, contenus et experience attendue." },
    { step: "03", title: "Production", description: "Integration, developpement, optimisation et connecteurs utiles." },
    { step: "04", title: "Mise en ligne", description: "Validation, domaine, SEO de base et derniers ajustements." },
    { step: "05", title: "Suivi", description: "Corrections, evolutions et support selon le besoin." },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Sites vitrines, sites corporate et plateformes de presentation
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Des sites web clairs, credibles et utiles pour votre entreprise</h1>
          <p className="text-xl max-w-3xl mb-8 text-white/90">
            Depuis Lausanne, KAH-Digital concoit des sites web pour entreprises en Suisse et a l'international.
            L'objectif n'est pas juste d'etre en ligne, mais de mieux presenter votre activite, rassurer vos clients
            et faciliter la prise de contact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/devis"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Demander un devis
            </Link>
            <Link
              href="/projets/kah-prod"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Voir une realisation
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quand un nouveau site devient utile</h2>
              <ul className="space-y-4">
                {painPoints.map((item) => (
                  <li key={item} className="flex items-start">
                    <FiTrendingUp className="text-red-500 mt-1 mr-3" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ce que le projet doit vraiment apporter</h2>
              <ul className="space-y-4">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-3" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Formats de projet</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des bases claires pour les budgets habituels en Suisse, avec une adaptation possible selon le niveau de
              contenu, de design et de fonctionnalites.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.name} className="border border-gray-200 rounded-2xl p-8 bg-white hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.name}</h3>
                <p className="text-blue-600 font-semibold text-lg mb-6">{offer.price}</p>
                <ul className="space-y-3 mb-8">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <FiCheck className="text-green-500 mr-3" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/devis"
                  className="block text-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Echanger sur ce format
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiMonitor className="text-blue-600 mb-4" size={36} />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Presentation et confiance</h2>
              <p className="text-gray-600">
                Une structure propre, des contenus lisibles et une image plus serieuse pour vos clients, partenaires ou futurs recrutements.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiCompass className="text-blue-600 mb-4" size={36} />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Parcours plus direct</h2>
              <p className="text-gray-600">
                L'utilisateur comprend mieux ce que vous faites, pour qui, et comment vous contacter sans perdre de temps.
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiCheck className="text-blue-600 mb-4" size={36} />
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Base durable</h2>
              <p className="text-gray-600">
                Le site reste evolutif et peut servir de base a d'autres outils, contenus, campagnes ou automatisations plus tard.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Methode de travail</h2>
            <p className="text-xl text-gray-600">Un cadre simple, lisible et sans surproduction inutile.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un site plus propre pour votre entreprise ?</h2>
          <p className="text-xl mb-8 text-white/90">
            Nous pouvons cadrer un site vitrine ou corporate solide, avec un niveau de finition adapte a votre marche,
            a votre rythme et a votre budget.
          </p>
          <Link
            href="/devis"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
