"use client";

import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";

export function ServicesGrid() {
  const services = [
    {
      icon: FiGlobe,
      title: "Création de sites web",
      description: "Sites vitrines professionnels, e-commerce et plateformes sur mesure pour votre PME.",
      href: "/services/site-web",
    },
    {
      icon: FiSmartphone,
      title: "Développement d'applications",
      description: "Applications web métier, tableaux de bord et outils internes adaptés à vos besoins.",
      href: "/services/applications",
    },
    {
      icon: FiTool,
      title: "GLPI / Portail de tickets IT",
      description: "Système de support informatique structuré pour gérer vos demandes et interventions.",
      href: "/services/glpi",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions digitales complètes pour accompagner la croissance de votre entreprise.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <service.icon className="text-blue-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                href={service.href}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
              >
                En savoir plus <FiArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}