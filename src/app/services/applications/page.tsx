import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiCode, FiDatabase, FiSmartphone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Applications web et mobiles | KAH-Digital",
  description:
    "Developpement d'applications web et mobiles pour entreprises en Suisse et a l'international. Outils metier, portails, automatisation et interfaces sur mesure.",
};

export default function ApplicationsPage() {
  const useCases = [
    "Portails clients et extranet",
    "Tableaux de bord et reporting",
    "Outils internes pour equipes terrain ou back-office",
    "Applications de suivi, reservation ou planification",
    "Mini-CRM, back-office et espaces membres",
    "Automatisation de taches administratives ou commerciales",
  ];

  const benefits = [
    "Moins de saisies manuelles et de doubles traitements",
    "Donnees mieux centralisees et plus lisibles",
    "Outils adaptes a votre fonctionnement reel",
    "Gain de temps sur les operations repetitives",
    "Meilleure circulation de l'information",
    "Base evolutive pour de futurs modules",
  ];

  const features = [
    {
      icon: FiCode,
      title: "Developpement sur mesure",
      description: "Une application pensee pour votre besoin, pas un assemblage fragile de briques generiques.",
    },
    {
      icon: FiDatabase,
      title: "Architecture de donnees propre",
      description: "Structure, droits et logique de stockage adaptes a vos usages et a votre croissance.",
    },
    {
      icon: FiSmartphone,
      title: "Web, mobile ou hybride",
      description: "Le bon format selon vos utilisateurs, vos contraintes terrain et votre budget.",
    },
    {
      icon: FiCheck,
      title: "Cadrage et accompagnement",
      description: "Nous vous aidons a clarifier le perimetre, prioriser et lancer sans partir dans tous les sens.",
    },
  ];

  const projectTypes = [
    {
      title: "Application metier",
      price: "A partir de 4'500 CHF",
      description: "Pour remplacer un process manuel, structurer une activite ou centraliser l'operationnel.",
    },
    {
      title: "Portail ou espace client",
      price: "A partir de 7'500 CHF",
      description: "Pour donner un acces utile a des documents, etats, demandes ou suivis cote client.",
    },
    {
      title: "Application plus complete",
      price: "A partir de 12'000 CHF",
      description: "Pour un produit plus riche avec comptes, donnees, workflows et integrations multiples.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-slate-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Applications web, outils metier et experiences mobiles
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Des applications utiles, pas des usines a gaz</h1>
          <p className="text-xl max-w-3xl mb-8 text-white/90">
            KAH-Digital concoit des applications web et mobiles pour entreprises qui veulent mieux organiser,
            automatiser ou fluidifier une partie de leur activite. Depuis la Suisse, avec une logique de production
            simple et exploitable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/devis"
              className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Demander un devis
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-colors"
            >
              Discuter du besoin
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cas d'usage frequents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des projets souvent demandes par des PME, des structures en croissance ou des equipes qui veulent mieux
              faire circuler l'information.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase} className="bg-gray-50 rounded-2xl p-6">
                <p className="text-gray-800 font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que cela doit changer concretement</h2>
            <p className="text-xl text-gray-600">Un meilleur fonctionnement interne, pas seulement un bel ecran de plus.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="bg-white rounded-2xl p-6 shadow-md">
                <FiCheck className="text-green-500 mb-4" size={32} />
                <p className="text-gray-800 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce qui est inclus dans l'approche</h2>
            <p className="text-xl text-gray-600">Du cadrage jusqu'au lancement, avec un niveau de complexite adapte.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="text-blue-700 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ordres de grandeur</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des bases de prix realistes pour des projets web et applicatifs en Suisse, a affiner selon le perimetre,
              les utilisateurs et les integrations necessaires.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectTypes.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-8 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-blue-700 font-semibold text-lg mb-4">{item.price}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un outil plus adapte a votre facon de travailler ?</h2>
          <p className="text-xl mb-8 text-white/90">
            Nous pouvons cadrer une application claire, evolutive et utile pour vos equipes ou vos clients.
          </p>
          <Link
            href="/devis"
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Obtenir un devis personnalise
          </Link>
        </div>
      </section>
    </>
  );
}
