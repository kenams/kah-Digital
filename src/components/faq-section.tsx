"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Travaillez-vous à distance ?",
      answer: "Oui, nous travaillons principalement à distance depuis la France, ce qui nous permet de collaborer efficacement avec des clients en Suisse romande. Nous utilisons des outils de communication modernes pour maintenir une relation de proximité.",
    },
    {
      question: "Proposez-vous des devis personnalisés ?",
      answer: "Absolument. Chaque projet est unique et mérite une proposition sur mesure. Nous analysons vos besoins spécifiques pour établir un devis détaillé avec planning et livrables clairs.",
    },
    {
      question: "Intervenez-vous pour les PME suisses ?",
      answer: "Oui, les PME constituent notre cœur de cible. Nous comprenons les contraintes budgétaires et temporelles des petites structures et proposons des solutions adaptées à leur réalité.",
    },
    {
      question: "GLPI convient-il à une petite entreprise ?",
      answer: "Parfaitement ! GLPI est particulièrement adapté aux PME car il permet de structurer le support IT sans complexité excessive. C'est une solution professionnelle accessible.",
    },
    {
      question: "Combien de temps pour créer un site ?",
      answer: "Selon la complexité, un site vitrine peut être réalisé en 2-4 semaines, un site e-commerce en 4-8 semaines. Nous vous donnons toujours un planning précis dans notre devis.",
    },
    {
      question: "Peut-on démarrer rapidement ?",
      answer: "Oui, nous pouvons lancer un projet sous 48h après validation du devis. Notre processus est optimisé pour une mise en route rapide tout en maintenant la qualité.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur notre approche.
          </p>
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