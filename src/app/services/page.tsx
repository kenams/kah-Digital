import { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Services digitaux | KAH-Digital",
  description:
    "Sites web, applications sur mesure et parcours support connecte a GLPI pour entreprises en Suisse et a l'international.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: FiGlobe,
      title: "Sites web pour entreprises",
      description:
        "Sites vitrines, sites corporate et plateformes de presentation pour mieux positionner votre entreprise en ligne.",
      href: "/services/site-web",
      features: ["Design responsive", "Structure claire", "SEO de base propre", "Mise en ligne accompagnee"],
    },
    {
      icon: FiSmartphone,
      title: "Applications web et mobiles",
      description:
        "Outils metier, portails, tableaux de bord et applications sur mesure pour fluidifier votre fonctionnement.",
      href: "/services/applications",
      features: ["Architecture evolutive", "Interface utile", "Integrations possibles", "Accompagnement projet"],
    },
    {
      icon: FiTool,
      title: "Parcours support connecte a GLPI",
      description:
        "Aide virtuelle, qualification des demandes et passage vers ticket GLPI quand l'assistance de premier niveau ne suffit plus.",
      href: "/services/glpi",
      features: ["Parcours plus clair", "Escalade propre", "Base de reponse", "Adaptation a votre support"],
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Suisse, international, PME et structures en croissance
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Des solutions digitales utiles pour les entreprises</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            KAH-Digital concoit des sites web, des applications et des parcours support plus lisibles.
            Depuis Lausanne, avec une logique de production claire, rapide et exploitable.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl shadow-lg p-8">
                <service.icon className="text-blue-600 mb-6" size={64} />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  En savoir plus <FiArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Un positionnement simple</h2>
          <p className="text-xl text-gray-600">
            Nous ne cherchons pas a tout promettre. Nous construisons des bases utiles, propres et credibles pour aider
            une entreprise a mieux se presenter, mieux s'organiser ou mieux accompagner ses utilisateurs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Besoin d'une solution sur mesure ?</h2>
          <p className="text-xl mb-8 text-white/90">
            Parlons du bon niveau de site, d'application ou de parcours support pour votre entreprise.
          </p>
          <Link
            href="/devis"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
