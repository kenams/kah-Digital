"use client";

import Link from "next/link";
import { FiArrowRight, FiGlobe, FiSmartphone, FiTool } from "react-icons/fi";

export function ServicesGrid() {
  const services = [
    {
      icon: FiGlobe,
      title: "Création de sites vitrines",
      description: "Sites web rapides et crédibles pour présenter votre activité et capter plus de demandes en Suisse.",
      href: "/services/site-web",
    },
    {
      icon: FiSmartphone,
      title: "Applications web et mobiles",
      description: "Applications metier, portails clients et MVP mobiles pour digitaliser une partie concrete de votre activite.",
      href: "/services/applications",
    },
    {
      icon: FiTool,
      title: "Support IT / GLPI",
      description: "Assistant IA, base de connaissances et tickets GLPI pour mieux gerer le support des PME.",
      href: "/services/glpi",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Nos services</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Des services conçus pour améliorer votre visibilité, votre crédibilité et votre efficacité opérationnelle.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.href} className="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
              <service.icon className="mb-4 text-blue-600" size={48} />
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{service.title}</h3>
              <p className="mb-4 text-gray-600">{service.description}</p>
              <Link href={service.href} className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800">
                En savoir plus <FiArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
