"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Travaillez-vous a distance ?",
      answer:
        "Oui, nous travaillons principalement a distance, ce qui nous permet de collaborer efficacement avec des clients en Suisse et a l'international.",
    },
    {
      question: "Proposez-vous des devis personnalises ?",
      answer:
        "Oui. Chaque projet est cadre selon vos besoins, vos priorites et vos delais, avec une proposition claire et des livrables lisibles.",
    },
    {
      question: "Intervenez-vous pour les entreprises suisses ?",
      answer:
        "Oui, la Suisse fait partie de notre marche naturel, mais notre positionnement reste ouvert a des projets internationaux quand le cadre est bon.",
    },
    {
      question: "Le parcours support connecte a GLPI convient-il a une PME ?",
      answer:
        "Oui. Le but est justement de simplifier l'entree dans le support, d'aider l'utilisateur au bon moment et de garder un passage propre vers ticket quand c'est necessaire.",
    },
    {
      question: "Combien de temps pour creer un site ?",
      answer:
        "Selon la complexite, un site vitrine peut etre realise en 2 a 4 semaines, et une application en plusieurs sprints selon le perimetre.",
    },
    {
      question: "Peut-on demarrer rapidement ?",
      answer:
        "Oui, si le besoin est clair. Le plus rapide est de partir sur un brief simple, puis de valider un cadrage et un devis.",
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
          <p className="text-xl text-gray-600">Tout ce que vous devez savoir sur notre approche.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
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
