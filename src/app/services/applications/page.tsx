import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiCode, FiDatabase, FiLayers, FiMapPin, FiSmartphone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Développement d'application web en Suisse",
  description:
    "Développement d'application web sur mesure en Suisse romande : outils métier, tableaux de bord, espaces clients et automatisations connectées à vos processus.",
  keywords: [
    "développement application web suisse",
    "application web lausanne",
    "outil métier sur mesure",
    "dashboard sur mesure suisse",
    "développeur application web suisse romande",
  ],
};

export default function ApplicationsPage() {
  const useCases = [
    "Tableaux de bord pour piloter l'activité en temps réel",
    "Espaces clients et portails sécurisés",
    "Outils de réservation, planning ou affectation",
    "Applications internes pour équipes commerciales ou opérationnelles",
    "Automatisation de tâches administratives répétitives",
    "Connexions entre vos outils métiers existants",
  ];

  const benefits = [
    "Moins d'opérations manuelles",
    "Moins d'erreurs de saisie",
    "Données centralisées",
    "Accès temps réel aux informations utiles",
    "Meilleure fluidité interne",
    "Base évolutive pour la suite",
  ];

  const features = [
    {
      icon: FiCode,
      title: "Développement sur mesure",
      description: "Application conçue autour de vos flux réels, pas d'un modèle générique.",
    },
    {
      icon: FiDatabase,
      title: "Données bien structurées",
      description: "Architecture claire, prête à durer et à grossir avec votre activité.",
    },
    {
      icon: FiSmartphone,
      title: "Interface responsive",
      description: "Utilisable au bureau, sur tablette ou sur mobile quand c'est nécessaire.",
    },
    {
      icon: FiLayers,
      title: "Formation et support",
      description: "Accompagnement à l'adoption, évolutions et support après livraison.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm text-indigo-100">
            <FiMapPin className="mr-2" />
            Applications web conçues depuis Lausanne
          </span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Développement d'application web en Suisse</h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-50">
            Nous développons des applications web sur mesure pour simplifier vos opérations, centraliser les
            informations utiles et éliminer les tâches manuelles qui coûtent du temps.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/devis"
              className="rounded-full bg-white px-8 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
            >
              Demander un devis
            </Link>
            <Link
              href="/services/site-web"
              className="inline-flex items-center rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-950"
            >
              Voir aussi les sites vitrines <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-950">Cas d'usage fréquents</h2>
            <p className="mt-4 text-xl text-slate-600">Des applications utiles quand un simple site web ne suffit plus.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="font-medium text-slate-800">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-950">Bénéfices concrets</h2>
            <p className="mt-4 text-xl text-slate-600">Le bon indicateur : ce que l'équipe gagne au quotidien.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <FiCheck className="mb-4 text-emerald-600" size={32} />
                <p className="font-medium text-slate-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-950">Ce qui est inclus</h2>
            <p className="mt-4 text-xl text-slate-600">Une base technique propre et un produit qui reste exploitable.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <feature.icon className="mx-auto mb-4 text-indigo-600" size={48} />
                <h3 className="mb-3 text-xl font-semibold text-slate-950">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Besoin d'une application web sur mesure ?</h2>
          <p className="mt-4 text-xl text-slate-300">
            On part de votre process réel, on simplifie le parcours, puis on construit ce qui apporte un gain concret.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/devis"
              className="rounded-full bg-white px-8 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
            >
              Obtenir un devis personnalisé
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-950"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
