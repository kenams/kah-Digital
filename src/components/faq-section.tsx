"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Travaillez-vous uniquement en Suisse ?",
      answer:
        "Non. La Suisse est un marche naturel pour KAH-Digital, mais nous restons ouverts a des projets internationaux quand le cadre est bon et que le besoin est clair.",
    },
    {
      question: "Proposez-vous des devis personnalises ?",
      answer:
        "Oui. Chaque projet est cadre selon vos priorites, votre niveau d'urgence et le perimetre reel a produire, avec une proposition lisible.",
    },
    {
      question: "Quel type de site web pouvez-vous produire ?",
      answer:
        "Sites vitrines, sites corporate, pages de lancement, plateformes de presentation ou bases plus evolutives connectees a d'autres outils.",
    },
    {
      question: "Pouvez-vous developper une application metier ?",
      answer:
        "Oui. Nous pouvons cadrer un outil interne, un portail, un tableau de bord ou une application web/mobile sur mesure selon le besoin.",
    },
    {
      question: "Le parcours support connecte a GLPI convient-il a une PME ?",
      answer:
        "Oui. Le but est justement de simplifier l'entree dans le support, d'aider l'utilisateur au bon moment et de garder un passage propre vers ticket quand c'est necessaire.",
    },
    {
      question: "Combien de temps faut-il pour demarrer ?",
      answer:
        "Si le besoin est clair, le demarrage peut etre rapide. Le plus efficace reste de valider un brief simple, puis un cadrage et un devis.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions frequentes</h2>
          <p className="text-xl text-gray-600">Les points les plus utiles avant de lancer un site, une application ou un parcours support.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="text-gray-500" size={24} />
                ) : (
                  <FiChevronDown className="text-gray-500" size={24} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
