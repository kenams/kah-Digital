"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { locale } = useLocale();

  const copy = {
    fr: {
      title: "Questions fréquentes",
      body: "Les points les plus utiles avant de lancer un site, une application ou un parcours support.",
      faqs: [
        {
          question: "Travaillez-vous uniquement en Suisse ?",
          answer:
            "Non. La Suisse est un marché naturel pour KAH-Digital, mais nous restons ouverts à des projets internationaux quand le cadre est bon et que le besoin est clair.",
        },
        {
          question: "Proposez-vous des devis personnalisés ?",
          answer:
            "Oui. Chaque projet est cadré selon vos priorités, votre niveau d'urgence et le périmètre réel à produire, avec une proposition lisible.",
        },
        {
          question: "Quel type de site web pouvez-vous produire ?",
          answer:
            "Sites vitrines, sites corporate, pages de lancement, plateformes de présentation ou bases plus évolutives connectées à d'autres outils.",
        },
        {
          question: "Pouvez-vous développer une application métier ?",
          answer:
            "Oui. Nous pouvons cadrer un outil interne, un portail, un tableau de bord ou une application web/mobile sur mesure selon le besoin.",
        },
        {
          question: "Le parcours support connecté à GLPI convient-il à une PME ?",
          answer:
            "Oui. Le but est justement de simplifier l'entrée dans le support, d'aider l'utilisateur au bon moment et de garder un passage propre vers ticket quand c'est nécessaire.",
        },
        {
          question: "Combien de temps faut-il pour démarrer ?",
          answer:
            "Si le besoin est clair, le démarrage peut être rapide. Le plus efficace reste de valider un brief simple, puis un cadrage et un devis.",
        },
      ],
    },
    en: {
      title: "Frequently asked questions",
      body: "The most useful points to know before launching a website, an app, or a support workflow.",
      faqs: [
        {
          question: "Do you work only in Switzerland?",
          answer:
            "No. Switzerland is a natural market for KAH-Digital, but we stay open to international projects when the setup is right and the need is clear.",
        },
        {
          question: "Do you provide tailored quotes?",
          answer:
            "Yes. Each project is scoped around your priorities, urgency level, and the real perimeter to produce, with a readable proposal.",
        },
        {
          question: "What kind of website can you build?",
          answer:
            "Showcase sites, corporate websites, launch pages, presentation platforms, or more scalable foundations connected to other tools.",
        },
        {
          question: "Can you build a business application?",
          answer:
            "Yes. We can scope an internal tool, a portal, a dashboard, or a custom web/mobile app depending on the need.",
        },
        {
          question: "Is the GLPI-connected support flow suitable for an SMB?",
          answer:
            "Yes. The goal is precisely to simplify support entry, help the user at the right moment, and keep a clean handoff to tickets when needed.",
        },
        {
          question: "How long does it take to get started?",
          answer:
            "If the need is clear, kickoff can be fast. The most effective path is still to validate a simple brief, then scoping and a quote.",
        },
      ],
    },
    de: {
      title: "Haeufige Fragen",
      body: "Die nuetzlichsten Punkte vor dem Start einer Website, einer App oder eines Support-Workflows.",
      faqs: [
        {
          question: "Arbeitet ihr nur in der Schweiz?",
          answer:
            "Nein. Die Schweiz ist ein natuerlicher Markt fuer KAH-Digital, aber wir bleiben offen fuer internationale Projekte, wenn Rahmen und Bedarf klar sind.",
        },
        {
          question: "Erstellt ihr individuelle Angebote?",
          answer:
            "Ja. Jedes Projekt wird nach Prioritaeten, Dringlichkeit und echtem Produktionsumfang sauber gebrieft und als lesbare Offerte dargestellt.",
        },
        {
          question: "Welche Art von Website koennt ihr bauen?",
          answer:
            "Praesentationsseiten, Corporate Sites, Launch Pages, Plattformen oder weiter skalierbare Grundlagen mit Anbindung an andere Tools.",
        },
        {
          question: "Koennt ihr eine Business-Anwendung entwickeln?",
          answer:
            "Ja. Wir koennen ein internes Tool, ein Portal, ein Dashboard oder eine massgeschneiderte Web-/Mobile-App passend zum Bedarf aufsetzen.",
        },
        {
          question: "Ist der GLPI-verbundene Support-Flow fuer ein KMU sinnvoll?",
          answer:
            "Ja. Das Ziel ist genau, den Einstieg in den Support zu vereinfachen, den Nutzer im richtigen Moment zu begleiten und Tickets sauber zu uebergeben.",
        },
        {
          question: "Wie schnell kann es losgehen?",
          answer:
            "Wenn der Bedarf klar ist, kann der Start schnell erfolgen. Am effizientesten bleibt ein einfaches Briefing, dann Scoping und Offerte.",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{copy.title}</h2>
          <p className="text-xl text-gray-600">{copy.body}</p>
        </div>
        <div className="space-y-4">
          {copy.faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-lg bg-white shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? <FiChevronUp className="text-gray-500" size={24} /> : <FiChevronDown className="text-gray-500" size={24} />}
              </button>
              {openIndex === index ? (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
