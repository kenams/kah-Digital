import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiClock, FiStar, FiTrendingUp } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Creation de sites web",
  description: "Sites web professionnels pour PME suisses. Vitrines, e-commerce et plateformes sur mesure avec accompagnement complet.",
};

export default function SiteWebPage() {
  const problems = [
    "Site actuel dépassé ou inexistant",
    "Difficulté à attirer de nouveaux clients",
    "Image professionnelle à renforcer",
    "Processus manuels à digitaliser",
  ];

  const benefits = [
    "Présence en ligne crédible et moderne",
    "Acquisition de nouveaux clients",
    "Amélioration de l'image de marque",
    "Automatisation des processus métier",
  ];

  const offers = [
    {
      name: "Starter",
      price: "À partir de 2'500 CHF",
      features: [
        "Site vitrine 5-8 pages",
        "Design responsive",
        "Formulaire de contact",
        "Optimisation SEO de base",
        "Formation à l'administration",
      ],
    },
    {
      name: "Business",
      price: "À partir de 5'000 CHF",
      features: [
        "Site vitrine complet",
        "Blog intégré",
        "Système de réservation",
        "Analytics et suivi",
        "Maintenance 6 mois",
      ],
    },
    {
      name: "Premium",
      price: "À partir de 8'000 CHF",
      features: [
        "Site sur mesure",
        "E-commerce intégré",
        "Applications web connectées",
        "Support prioritaire",
        "Accompagnement stratégique",
      ],
    },
  ];

  const process = [
    { step: "1", title: "Analyse", description: "Étude de vos besoins et de votre marché" },
    { step: "2", title: "Conception", description: "Maquettes et architecture technique" },
    { step: "3", title: "Développement", description: "Codage et intégration des fonctionnalités" },
    { step: "4", title: "Tests & Lancement", description: "Validation et mise en ligne" },
    { step: "5", title: "Formation & Support", description: "Accompagnement post-lancement" },
  ];

  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Sites web professionnels pour PME
            </h1>
            <p className="text-xl max-w-2xl mb-8">
              Valorisez votre entreprise avec un site web moderne, performant et adapté à vos objectifs business.
            </p>
            <Link
              href="/devis"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Obtenir un devis
            </Link>
          </div>
        </section>

        {/* Problems & Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Problèmes courants</h2>
                <ul className="space-y-4">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start">
                      <FiTrendingUp className="text-red-500 mt-1 mr-3" size={20} />
                      <span className="text-gray-700">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Bénéfices obtenus</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-green-500 mt-1 mr-3" size={20} />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Offers */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos offres</h2>
              <p className="text-xl text-gray-600">Des solutions adaptées à votre budget et vos ambitions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offers.map((offer, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg mb-6">{offer.price}</p>
                  <ul className="space-y-3 mb-8">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <FiCheck className="text-green-500 mr-3" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/devis"
                    className="block text-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Choisir cette offre
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre méthode</h2>
              <p className="text-xl text-gray-600">Un processus transparent et efficace</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à avoir un site web professionnel ?
            </h2>
            <p className="text-xl mb-8">
              Discutons de votre projet et créons ensemble votre présence digitale.
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
