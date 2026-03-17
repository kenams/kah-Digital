import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiClock, FiCpu, FiLifeBuoy, FiShield, FiTool, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Support IT, GLPI et assistant IA en Suisse",
  description:
    "Mise en place de GLPI, base de connaissances et assistant IA pour reduire les tickets repetitifs dans les PME suisses.",
};

export default function GLPIPage() {
  const pillars = [
    "Base de connaissances et procedures support",
    "Assistant IA de premier niveau pour guider l'utilisateur",
    "Creation de ticket GLPI si le probleme persiste",
    "Suivi des demandes, priorites et historique",
    "Vision plus claire du support et des points de friction",
  ];

  const benefits = [
    {
      icon: FiClock,
      title: "Moins de tickets repetitifs",
      description: "Les demandes simples sont absorbees par les procedures et l'assistant avant d'arriver a l'equipe IT.",
    },
    {
      icon: FiUsers,
      title: "Utilisateurs mieux guides",
      description: "Le support est plus simple a utiliser, plus lisible et moins frustrant pour les equipes.",
    },
    {
      icon: FiShield,
      title: "Tickets mieux qualifies",
      description: "Quand un ticket GLPI est cree, les informations utiles sont deja structurees pour accelerer le traitement.",
    },
    {
      icon: FiLifeBuoy,
      title: "Support PME plus mature",
      description: "Tu gardes une logique d'escalade simple, comprensible et adaptee a une PME, pas un systeme trop lourd.",
    },
  ];

  const offers = [
    {
      title: "Audit support + cadrage",
      description: "Analyse des demandes frequentes, parcours utilisateur, et plan de mise en place.",
      price: "A partir de 1'500 CHF",
    },
    {
      title: "GLPI + base de connaissances",
      description: "Structuration des tickets, procedures, categories, priorites et documentation support.",
      price: "A partir de 4'500 CHF",
    },
    {
      title: "Assistant IA + escalation GLPI",
      description: "Assistant support, reponses guidees, puis creation de ticket GLPI si l'utilisateur n'est pas depanne.",
      price: "A partir de 8'500 CHF",
    },
    {
      title: "Maintenance et optimisation",
      description: "Suivi, ajustements, nouvelles procedures et supervision des cas repetitifs.",
      price: "A partir de 290 CHF / mois",
    },
  ];

  const useCases = [
    "Support utilisateurs internes dans une PME",
    "Premiere ligne IT avec assistant IA + knowledge base",
    "Creation de tickets GLPI apres echec du self-service",
    "Reduction du temps passe sur les demandes recurrentes",
    "Qualification plus propre des incidents et demandes",
    "Visibilite sur les themes qui reviennent le plus souvent",
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">Support IT pour PME suisses</p>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">GLPI, knowledge base et assistant IA de support</h1>
            <p className="mt-6 max-w-3xl text-xl text-emerald-50">
              L'objectif n'est pas seulement d'installer GLPI. L'objectif est de faire gagner du temps aux utilisateurs et a l'equipe IT, avec un premier niveau guide par IA puis une creation de ticket propre si le probleme reste ouvert.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/devis"
                className="rounded-full bg-white px-8 py-3 font-semibold text-slate-950 transition-colors hover:bg-slate-100"
              >
                Demander un devis GLPI
              </Link>
              <Link
                href="/projets/assistant-pme"
                className="inline-flex items-center rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-950"
              >
                Voir le cas support IT <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-950">Ce que nous mettons en place</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
              Une solution de support plus utile pour les PME: moins de friction pour les utilisateurs, plus de structure pour l'IT.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((item) => (
              <div key={item} className="flex items-start rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <FiCheck className="mt-1 mr-3 flex-shrink-0 text-emerald-600" size={20} />
                <span className="text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-950">Benefices concrets</h2>
            <p className="mt-4 text-lg text-slate-600">Une logique support plus claire, plus rapide, plus exploitable.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
                <benefit.icon className="mx-auto mb-4 text-emerald-600" size={46} />
                <h3 className="text-xl font-semibold text-slate-950">{benefit.title}</h3>
                <p className="mt-3 text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-950">Cas d'usage les plus frequents</h2>
            <p className="mt-4 text-lg text-slate-600">Le bon point de depart: un vrai probleme support a simplifier.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <FiTool className="mb-3 text-emerald-600" size={24} />
                <p className="font-medium text-slate-800">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cadres d'intervention</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Offres support IT et GLPI</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {offers.map((offer) => (
              <div key={offer.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-emerald-700">
                  <FiCpu className="mr-2" />
                  Support
                </div>
                <h3 className="text-xl font-semibold text-slate-950">{offer.title}</h3>
                <p className="mt-3 text-slate-600">{offer.description}</p>
                <p className="mt-5 text-lg font-semibold text-emerald-700">{offer.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-600 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Pret a structurer le support de votre PME ?</h2>
          <p className="mt-4 text-xl">
            On peut partir d'un GLPI simple, d'une base de connaissances utile, ou d'un assistant IA connecte a votre workflow.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/devis"
              className="rounded-full bg-white px-8 py-3 font-semibold text-emerald-700 transition-colors hover:bg-slate-100"
            >
              Demander un devis
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-emerald-700"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
