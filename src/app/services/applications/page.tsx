import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiCode, FiDatabase, FiSmartphone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Developpement d'applications",
  description: "Applications web sur mesure pour PME suisses. Automatisation, tableaux de bord et outils métier personnalisés.",
};

export default function ApplicationsPage() {
  const useCases = [
    "Tableaux de bord de suivi des performances",
    "Outils de gestion des stocks et inventaires",
    "Systèmes de réservation et planification",
    "Applications de suivi client (CRM léger)",
    "Outils de collaboration interne",
    "Automatisation de processus administratifs",
  ];

  const benefits = [
    "Gain de temps significatif",
    "Réduction des erreurs humaines",
    "Centralisation des données",
    "Accès aux informations en temps réel",
    "Amélioration de la productivité",
    "Évolutivité selon vos besoins",
  ];

  const features = [
    {
      icon: FiCode,
      title: "Développement sur mesure",
      description: "Applications conçues spécifiquement pour vos processus métier.",
    },
    {
      icon: FiDatabase,
      title: "Base de données optimisée",
      description: "Architecture de données adaptée à votre volume et vos besoins.",
    },
    {
      icon: FiSmartphone,
      title: "Interface responsive",
      description: "Utilisable sur ordinateur, tablette et smartphone.",
    },
    {
      icon: FiCheck,
      title: "Formation et support",
      description: "Accompagnement complet pour l'adoption par vos équipes.",
    },
  ];

  return (
    <>
        {/* Hero */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Applications web sur mesure
            </h1>
            <p className="text-xl max-w-2xl mb-8">
              Automatisez vos processus, centralisez vos données et boostez la productivité de votre équipe.
            </p>
            <Link
              href="/devis"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cas d'usage courants</h2>
              <p className="text-xl text-gray-600">Des solutions concrètes pour des problèmes réels</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-800 font-medium">{useCase}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Bénéfices concrets</h2>
              <p className="text-xl text-gray-600">Des résultats mesurables pour votre entreprise</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <FiCheck className="text-green-500 mb-4" size={32} />
                  <p className="text-gray-800 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce qui est inclus</h2>
              <p className="text-xl text-gray-600">Une approche complète et professionnelle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="text-purple-600 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'une application sur mesure ?
            </h2>
            <p className="text-xl mb-8">
              Analysons vos processus et concevons l'outil qui transformera votre productivité.
            </p>
            <Link
              href="/devis"
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Obtenir un devis personnalisé
            </Link>
          </div>
        </section>
    </>
    );
  }
