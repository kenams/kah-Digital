import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiClock, FiShield, FiUsers, FiTool, FiTrendingUp } from "react-icons/fi";

export const metadata: Metadata = {
  title: "GLPI - Systeme de tickets IT pour PME",
  description: "Installation et configuration de GLPI pour structurer votre support informatique. Solution idéale pour PME suisses.",
};

export default function GLPIPage() {
  const whatIsGLPI = [
    "Logiciel open source de gestion des services informatiques",
    "Système de tickets pour suivre les demandes et incidents",
    "Base de connaissances intégrée",
    "Gestion des équipements et contrats",
    "Rapports et statistiques détaillés",
  ];

  const benefits = [
    {
      icon: FiClock,
      title: "Traitement rapide des demandes",
      description: "Suivi structuré et priorisation des interventions IT.",
    },
    {
      icon: FiUsers,
      title: "Collaboration équipe",
      description: "Visibilité pour tous les intervenants sur l'état des tickets.",
    },
    {
      icon: FiShield,
      title: "Traçabilité complète",
      description: "Historique détaillé de toutes les interventions.",
    },
    {
      icon: FiTrendingUp,
      title: "Amélioration continue",
      description: "Statistiques pour optimiser vos processus IT.",
    },
  ];

  const services = [
    {
      title: "Installation complète",
      description: "Mise en place de GLPI sur votre serveur ou dans le cloud.",
      price: "À partir de 1'200 CHF",
    },
    {
      title: "Configuration personnalisée",
      description: "Adaptation aux processus spécifiques de votre entreprise.",
      price: "À partir de 800 CHF",
    },
    {
      title: "Formation équipe",
      description: "Sessions de formation pour vos techniciens et utilisateurs.",
      price: "À partir de 600 CHF",
    },
    {
      title: "Maintenance & support",
      description: "Mises à jour, sauvegardes et support technique continu.",
      price: "À partir de 150 CHF/mois",
    },
  ];

  const useCases = [
    "Support technique pour employés",
    "Gestion des incidents informatiques",
    "Suivi des demandes d'évolution",
    "Inventaire des équipements",
    "Gestion des contrats de maintenance",
    "Rapports d'activité IT",
  ];

  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              GLPI : Système de tickets IT pour PME
            </h1>
            <p className="text-xl max-w-2xl mb-8">
              Structurez votre support informatique avec une solution professionnelle, simple et efficace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/devis"
                className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Obtenir un devis
              </Link>
              <Link
                href="#services"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Voir les services
              </Link>
            </div>
          </div>
        </section>

        {/* What is GLPI */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Qu'est-ce que GLPI ?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Un outil complet de gestion des services informatiques adapté aux PME
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatIsGLPI.map((feature, index) => (
                <div key={index} className="flex items-start bg-gray-50 rounded-lg p-6">
                  <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bénéfices pour votre PME</h2>
              <p className="text-xl text-gray-600">Une organisation IT professionnelle sans complexité</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
                  <benefit.icon className="text-green-600 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cas d'usage courants</h2>
              <p className="text-xl text-gray-600">Comment GLPI améliore votre quotidien</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <FiTool className="text-green-600 mb-3" size={24} />
                  <p className="text-gray-800 font-medium">{useCase}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos services GLPI</h2>
              <p className="text-xl text-gray-600">Accompagnement complet de A à Z</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-green-600 font-semibold text-lg">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi nous choisir ?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <FiUsers className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise PME</h3>
                <p className="text-gray-600">Nous connaissons les contraintes des petites structures et proposons des solutions adaptées.</p>
              </div>
              <div className="text-center">
                <FiClock className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Rapidité d'intervention</h3>
                <p className="text-gray-600">Installation et configuration rapides pour une mise en service dans les meilleurs délais.</p>
              </div>
              <div className="text-center">
                <FiShield className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Support continu</h3>
                <p className="text-gray-600">Accompagnement post-déploiement et maintenance pour assurer le bon fonctionnement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à structurer votre support IT ?
            </h2>
            <p className="text-xl mb-8">
              Découvrez comment GLPI peut transformer l'organisation informatique de votre PME.
            </p>
            <Link
              href="/devis"
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Demander un devis GLPI
            </Link>
          </div>
        </section>
    </>
    );
  }
