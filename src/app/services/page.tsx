import { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Services",
  description: "Découvrez nos services : création de sites web, développement d'applications et système GLPI pour PME suisses.",
};

export default function ServicesPage() {
  const services = [
    {
      icon: FiGlobe,
      title: "Création de sites web",
      description: "Sites vitrines professionnels, e-commerce et plateformes sur mesure pour valoriser votre entreprise en ligne.",
      href: "/services/site-web",
      features: ["Design responsive", "SEO optimisé", "Maintenance incluse", "Formation utilisateur"],
    },
    {
      icon: FiSmartphone,
      title: "Développement d'applications",
      description: "Applications web métier, tableaux de bord et outils internes pour automatiser vos processus.",
      href: "/services/applications",
      features: ["Architecture scalable", "Interface intuitive", "Intégration API", "Support technique"],
    },
    {
      icon: FiTool,
      title: "GLPI / Portail de tickets IT",
      description: "Système de support informatique structuré pour gérer efficacement vos demandes et interventions.",
      href: "/services/glpi",
      features: ["Installation complète", "Configuration personnalisée", "Formation équipe", "Maintenance préventive"],
    },
  ];

  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Nos services digitaux
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Des solutions complètes et sur mesure pour accompagner la transformation digitale de votre PME.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <service.icon className="text-blue-600 mb-6" size={64} />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
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

        {/* CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'une solution sur mesure ?
            </h2>
            <p className="text-xl mb-8">
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
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
