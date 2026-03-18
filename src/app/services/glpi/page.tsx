import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiClock, FiShield, FiTool, FiTrendingUp, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Parcours support connecte a GLPI | KAH-Digital",
  description:
    "KAH-Digital concoit des parcours support connectes a GLPI pour entreprises en Suisse et a l'international : aide virtuelle, orientation des demandes et creation de ticket quand c'est necessaire.",
};

export default function GLPIPage() {
  const positioning = [
    "Une couche de parcours et d'assistance en amont de GLPI",
    "Une entree plus simple pour les utilisateurs qui ont besoin d'aide",
    "Une aide virtuelle discrete pour orienter et debloquer les demandes simples",
    "Une creation de ticket quand la reprise par le support devient necessaire",
    "Une adaptation au fonctionnement de votre support existant",
  ];

  const benefits = [
    {
      icon: FiClock,
      title: "Moins de friction",
      description: "Les utilisateurs trouvent plus vite un premier niveau d'aide avant de passer par un ticket.",
    },
    {
      icon: FiUsers,
      title: "Demandes mieux cadrees",
      description: "Le support recupere plus de contexte et des demandes mieux orientees vers le bon canal.",
    },
    {
      icon: FiShield,
      title: "Positionnement discret",
      description: "La solution peut etre presentee comme une aide virtuelle et un parcours support renforce, sans surpromesse.",
    },
    {
      icon: FiTrendingUp,
      title: "Escalade plus propre",
      description: "Quand l'aide ne suffit pas, le passage vers ticket se fait de facon plus fluide et plus exploitable.",
    },
  ];

  const services = [
    {
      title: "Cadrage du parcours support",
      description: "Analyse des demandes frequentes, des points de blocage et des moments ou il faut passer au support humain.",
      price: "A partir de 900 CHF",
    },
    {
      title: "Aide virtuelle de premier niveau",
      description: "Mise en place d'un point d'aide qui guide l'utilisateur sur vos contenus, procedures ou cas courants.",
      price: "A partir de 1'500 CHF",
    },
    {
      title: "Connexion vers ticket GLPI",
      description: "Passage propre de l'assistance vers la creation de ticket lorsque le besoin doit etre repris par l'equipe support.",
      price: "A partir de 1'200 CHF",
    },
    {
      title: "Suivi et ajustements",
      description: "Evolution du parcours, des reponses et des points de passage selon le retour terrain.",
      price: "A partir de 180 CHF/mois",
    },
  ];

  const useCases = [
    "Aide utilisateur avant creation de ticket",
    "Qualification plus propre des demandes internes",
    "Reduction des tickets repetitifs ou incomplets",
    "Point d'entree plus simple pour les PME",
    "Passage fluide vers GLPI quand le support doit reprendre",
    "Support plus lisible pour des equipes qui veulent gagner du temps",
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Parcours support, aide virtuelle et tickets GLPI
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Un support plus simple autour de GLPI</h1>
          <p className="text-xl max-w-3xl mb-8">
            KAH-Digital ne remplace pas votre equipe GLPI et ne vend pas une infogerance deguisee. Nous construisons
            un parcours plus fluide autour de votre support, avec une aide virtuelle de premier niveau et une creation
            de ticket quand le besoin doit etre repris proprement.
          </p>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Solution proprietaire KAH-Digital, adaptee a votre organisation support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/devis"
              className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Obtenir un devis
            </Link>
            <Link
              href="#services"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-700 transition-colors"
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
              Un complement utile pour le support, sans remplacer votre outil ni votre organisation existante.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positioning.map((feature) => (
              <div key={feature} className="flex items-start bg-gray-50 rounded-2xl p-6">
                <FiCheck className="text-emerald-500 mt-1 mr-3 flex-shrink-0" size={20} />
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
            <p className="text-xl text-gray-600">Un support plus lisible pour les utilisateurs et plus propre pour l'equipe.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center bg-white rounded-2xl p-6 shadow-md">
                <benefit.icon className="text-emerald-600 mx-auto mb-4" size={48} />
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
            <p className="text-xl text-gray-600">
              Des situations ou une aide en amont change vraiment l'experience support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div key={useCase} className="bg-gray-50 rounded-2xl p-6">
                <FiTool className="text-emerald-600 mb-3" size={24} />
                <p className="text-gray-800 font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services autour de GLPI</h2>
            <p className="text-xl text-gray-600">Du cadrage jusqu'au passage vers ticket, sans sur-vendre la promesse.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-emerald-600 font-semibold text-lg">{service.price}</p>
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
              <FiUsers className="text-emerald-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous structurons le parcours</h3>
              <p className="text-gray-600">
                Nous travaillons l'entree, l'aide utilisateur, l'orientation et le passage vers ticket.
              </p>
            </div>
            <div className="text-center">
              <FiClock className="text-emerald-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous integrons proprement</h3>
              <p className="text-gray-600">
                Nous adaptons la logique au fonctionnement de votre support existant, sans casser vos habitudes.
              </p>
            </div>
            <div className="text-center">
              <FiShield className="text-emerald-600 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Nous ne remplacons pas votre equipe GLPI</h3>
              <p className="text-gray-600">
                L'exploitation GLPI reste chez vous ou chez votre prestataire. Nous intervenons en complement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Besoin d'un support plus fluide autour de GLPI ?</h2>
          <p className="text-xl mb-8">
            Nous pouvons cadrer un parcours utile, discret et plus propre pour vos utilisateurs comme pour votre support.
          </p>
          <Link
            href="/devis"
            className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
