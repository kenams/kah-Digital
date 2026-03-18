import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiClock, FiShield, FiUsers, FiTool, FiTrendingUp } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Support connecte a GLPI pour entreprises",
  description:
    "Parcours support connecte a GLPI : aide virtuelle, qualification des demandes et creation de tickets quand l'assistance ne suffit plus.",
};

export default function GLPIPage() {
  const positioning = [
    "Une couche de support en amont de GLPI",
    "Un parcours utilisateur plus simple pour poser une demande",
    "Une aide virtuelle pour orienter les utilisateurs",
    "Une escalation vers ticket quand il faut passer au support",
    "Une integration adaptee a votre environnement existant",
  ];

  const benefits = [
    {
      icon: FiClock,
      title: "Moins de friction au premier contact",
      description: "Les utilisateurs trouvent plus vite une aide utile avant de passer par un ticket.",
    },
    {
      icon: FiUsers,
      title: "Support mieux cadre",
      description: "Les demandes arrivent avec plus de contexte et une meilleure orientation vers le bon interlocuteur.",
    },
    {
      icon: FiShield,
      title: "Approche discrete",
      description: "Le dispositif peut rester presente comme une aide virtuelle et un parcours support renforce.",
    },
    {
      icon: FiTrendingUp,
      title: "Escalade plus propre",
      description: "Quand l'aide ne suffit pas, la creation de ticket prend naturellement le relais.",
    },
  ];

  const services = [
    {
      title: "Cadrage du parcours support",
      description: "Analyse des demandes recurrentes, des points de blocage et du bon niveau d'escalade.",
      price: "A partir de 900 CHF",
    },
    {
      title: "Aide virtuelle et base de reponse",
      description: "Mise en place d'un assistant de premier niveau relie a vos contenus, procedures ou questions frequentes.",
      price: "A partir de 1'500 CHF",
    },
    {
      title: "Escalade vers ticket",
      description: "Connexion du parcours vers GLPI lorsque la demande doit etre reprise par le support humain.",
      price: "A partir de 1'200 CHF",
    },
    {
      title: "Ajustements et suivi",
      description: "Evolution des reponses, du parcours et des points de passage selon le retour terrain.",
      price: "A partir de 180 CHF/mois",
    },
  ];

  const useCases = [
    "Aide utilisateur avant creation de ticket",
    "Qualification plus propre des demandes internes",
    "Reduction des tickets repetitifs ou mal formules",
    "Point d'entree unique pour le support",
    "Passage propre vers GLPI quand le support humain doit reprendre",
    "Parcours plus clair pour les PME avec peu de temps a perdre",
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Support connecte a GLPI</h1>
          <p className="text-xl max-w-3xl mb-8">
            Nous ne gerons pas GLPI a la place de votre equipe. Nous concevons un parcours plus fluide autour de votre
            support, avec une aide virtuelle en premier niveau et une escalation vers ticket quand c'est necessaire.
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment nous nous positionnons</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une surcouche de support utile pour l'utilisateur, sans remplacer votre organisation ni votre outil de tickets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positioning.map((feature, index) => (
              <div key={index} className="flex items-start bg-gray-50 rounded-lg p-6">
                <FiCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que cela apporte concretement</h2>
            <p className="text-xl text-gray-600">Un support plus lisible pour les utilisateurs et plus propre pour votre equipe.</p>
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cas d'usage courants</h2>
            <p className="text-xl text-gray-600">Des situations ou un parcours support plus intelligent change vraiment l'experience.</p>
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

      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos services autour de GLPI</h2>
            <p className="text-xl text-gray-600">Du cadrage jusqu'au parcours d'escalade, sans surpromesse inutile.</p>
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que nous faisons, et ce que nous ne faisons pas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FiUsers className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous structurons le parcours</h3>
              <p className="text-gray-600">
                Nous travaillons l'entree, l'aide utilisateur, l'orientation et le passage vers ticket.
              </p>
            </div>
            <div className="text-center">
              <FiClock className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous integrons proprement</h3>
              <p className="text-gray-600">
                Nous adaptons la logique au fonctionnement de votre support existant et a votre rythme de travail.
              </p>
            </div>
            <div className="text-center">
              <FiShield className="text-green-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous ne remplacons pas votre equipe GLPI</h3>
              <p className="text-gray-600">
                Votre exploitation GLPI reste chez vous ou chez votre prestataire. Nous intervenons en complement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un support plus fluide autour de GLPI ?</h2>
          <p className="text-xl mb-8">
            Nous pouvons cadrer un parcours utile, discret et propre pour vos utilisateurs comme pour votre equipe support.
          </p>
          <Link
            href="/devis"
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
