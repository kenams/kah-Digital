"use client";

import { useState } from "react";
import { FiChevronDown, FiPlus, FiMinus } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { locale } = useLocale();

  const copy = {
    fr: {
      eyebrow: "FAQ",
      title: "Questions fréquentes",
      body: "Les points les plus utiles avant de lancer un site, une app ou un projet IA.",
      faqs: [
        {
          question: "Combien coûte un site web ou une application ?",
          answer:
            "Un site vitrine : € 800 à 2 500. Un site corporate ou e-commerce : € 2 000 à 6 000. Une application web sur mesure : € 4 000 à 15 000. Une app mobile : € 6 000 à 20 000. Ces fourchettes dépendent des fonctionnalités, du design et du contenu. Chaque projet est cadré avant tout devis.",
        },
        {
          question: "Combien de temps faut-il pour livrer ?",
          answer:
            "Un site vitrine bien cadré : 3 à 4 semaines. Un site corporate ou une app simple : 4 à 8 semaines. Un projet plus complexe avec intégrations : 2 à 4 mois. Les délais sont fermes dès que le brief est validé.",
        },
        {
          question: "Travaillez-vous avec des clients en dehors de la Suisse ?",
          answer:
            "Oui. KAH-Digital travaille à distance avec des clients francophones, anglophones et internationaux. La langue, le pays et le fuseau horaire ne sont pas un obstacle.",
        },
        {
          question: "Quel type de projets prenez-vous en charge ?",
          answer:
            "Sites vitrines, sites corporate, e-commerce, applications web et mobiles, dashboards, portails membres, automatisations IA et parcours support connectés à GLPI. Chaque besoin est qualifié avant engagement.",
        },
        {
          question: "Y a-t-il un engagement minimal ou un abonnement ?",
          answer:
            "Non. Chaque projet est traité sur devis accepté, sans abonnement obligatoire. Des formules de support et maintenance mensuelle sont disponibles après livraison, mais jamais imposées.",
        },
        {
          question: "Comment se passe le premier échange ?",
          answer:
            "Tu remplis le formulaire de devis ou tu utilises l'assistant projet. Je reviens sous 24h ouvrables avec un premier cadrage ou des questions de clarification. Pas de formulaire en 40 champs — juste les éléments utiles.",
        },
        {
          question: "Pouvez-vous refaire ou améliorer un site existant ?",
          answer:
            "Oui. La refonte est l'un des services les plus demandés. On peut reprendre un site existant — WordPress, Wix, Squarespace ou autre — et le reconstruire proprement avec les bonnes performances, le bon SEO et une meilleure conversion. On garde ce qui fonctionne, on corrige ce qui coûte des clients.",
        },
        {
          question: "Quelles garanties avez-vous sur les projets livrés ?",
          answer:
            "Chaque projet est livré avec un périmètre défini, testé sur desktop et mobile, et accompagné d'une période de corrections incluses après mise en ligne. Pas d'engagement caché : si quelque chose ne correspond pas au brief validé, on le corrige. Le devis est ferme, pas évolutif sans accord préalable.",
        },
      ],
    },
    en: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      body: "The most useful points before launching a website, an app, or an AI project.",
      faqs: [
        {
          question: "How much does a website or app cost?",
          answer:
            "A showcase site: € 800 to 2,500. A corporate site or e-commerce: € 2,000 to 6,000. A custom web app: € 4,000 to 15,000. A mobile app: € 6,000 to 20,000. These ranges depend on features, design, and content. Every project is scoped before any quote.",
        },
        {
          question: "How long does delivery take?",
          answer:
            "A well-scoped showcase site: 3 to 4 weeks. A corporate site or simple app: 4 to 8 weeks. A more complex project with integrations: 2 to 4 months. Timelines are firm once the brief is validated.",
        },
        {
          question: "Do you work with clients outside Switzerland?",
          answer:
            "Yes. KAH-Digital works remotely with French-speaking, English-speaking, and international clients. Language, country, and timezone are not a barrier.",
        },
        {
          question: "What types of projects do you handle?",
          answer:
            "Showcase sites, corporate websites, e-commerce, web and mobile apps, dashboards, member portals, AI automation, and GLPI-connected support workflows. Each need is qualified before any commitment.",
        },
        {
          question: "Is there a minimum commitment or subscription?",
          answer:
            "No. Each project is handled on accepted quote, with no required subscription. Monthly support and maintenance plans are available after delivery, but never imposed.",
        },
        {
          question: "What does the first exchange look like?",
          answer:
            "You fill in the quote form or use the project assistant. I reply within 24 business hours with a first framing or clarifying questions. No 40-field form — just the useful elements.",
        },
        {
          question: "Can you rebuild or improve an existing site?",
          answer:
            "Yes. Website redesign is one of the most requested services. We can take an existing site — WordPress, Wix, Squarespace or other — and rebuild it cleanly with proper performance, SEO, and better conversion. We keep what works and fix what's costing you clients.",
        },
        {
          question: "What guarantees do you offer on delivered projects?",
          answer:
            "Every project is delivered with a defined scope, tested on desktop and mobile, and comes with an included correction period after launch. No hidden commitments: if something doesn't match the validated brief, we fix it. The quote is firm — it won't grow without prior agreement.",
        },
      ],
    },
    de: {
      eyebrow: "FAQ",
      title: "Haeufige Fragen",
      body: "Die nuetzlichsten Punkte vor dem Start einer Website, App oder eines KI-Projekts.",
      faqs: [
        {
          question: "Was kostet eine Website oder eine App?",
          answer:
            "Unternehmenswebsite: € 800 bis 2.500. Corporate Site oder E-Commerce: € 2.000 bis 6.000. Massgeschneiderte Web-App: € 4.000 bis 15.000. Mobile App: € 6.000 bis 20.000. Diese Spannen haengen von Funktionen, Design und Inhalt ab. Jedes Projekt wird vor der Offerte gescoped.",
        },
        {
          question: "Wie lange dauert die Lieferung?",
          answer:
            "Eine gut gescropte Unternehmenswebsite: 3 bis 4 Wochen. Eine Corporate Site oder einfache App: 4 bis 8 Wochen. Komplexere Projekte mit Integrationen: 2 bis 4 Monate. Zeitrahmen sind verbindlich, sobald das Briefing validiert ist.",
        },
        {
          question: "Arbeitet ihr auch mit Kunden ausserhalb der Schweiz?",
          answer:
            "Ja. KAH-Digital arbeitet remote mit frankophonen, englischsprachigen und internationalen Kunden. Sprache, Land und Zeitzone sind kein Hindernis.",
        },
        {
          question: "Welche Projektarten uebernehmt ihr?",
          answer:
            "Praesantationsseiten, Corporate Sites, E-Commerce, Web- und Mobile-Apps, Dashboards, Mitgliederportale, KI-Automatisierungen und GLPI-verbundene Support-Workflows. Jeder Bedarf wird vor jeder Zusage qualifiziert.",
        },
        {
          question: "Gibt es eine Mindestbindung oder ein Abonnement?",
          answer:
            "Nein. Jedes Projekt wird auf akzeptierter Offerte abgewickelt, ohne Pflichtabonnement. Monatliche Support- und Wartungsplaene sind nach der Lieferung verfuegbar, aber nie verpflichtend.",
        },
        {
          question: "Wie laeuft der erste Kontakt ab?",
          answer:
            "Du fuellst das Angebotsformular aus oder nutzt den Projektassistenten. Ich melde mich in 24 Arbeitsstunden mit einem ersten Briefing oder Klärungsfragen. Kein 40-Felder-Formular — nur das Wesentliche.",
        },
      ],
    },
  }[locale];

  return (
    <section className="bg-gray-900 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white">{copy.title}</h2>
          <p className="text-lg text-gray-400">{copy.body}</p>
        </div>

        <div className="space-y-3">
          {copy.faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-white/8 bg-gray-950 transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <span className="shrink-0 text-gray-500">
                  {openIndex === index ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>
              {openIndex === index && (
                <div className="border-t border-white/6 px-6 pb-5 pt-4">
                  <p className="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
