"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { locale } = useLocale();

  const copy = {
    fr: {
      eyebrow: "FAQ",
      title: "Questions fréquentes",
      body: "Tout ce que vous voulez savoir avant de lancer votre projet.",
      faqs: [
        {
          question: "Comment est défini le budget d'une landing page ?",
          answer: "Le budget dépend du besoin réel : objectif de conversion, nombre de sections, contenus, design, animations et intégrations utiles. Un premier échange permet de cadrer simplement le périmètre et de proposer un devis personnalisé, clair et sans engagement.",
        },
        {
          question: "Comment est estimé un site web professionnel ?",
          answer: "Chaque projet est différent. Un site vitrine, un site corporate ou une plateforme plus complète n'ont pas le même niveau de contenu, de design, de SEO ni de fonctionnalités. Le devis est construit après compréhension de votre contexte, de votre budget disponible et de vos priorités business.",
        },
        {
          question: "Comment cadrer une application mobile ou web ?",
          answer: "On part des utilisateurs, des processus métier, des fonctionnalités indispensables, des délais et du niveau d'accompagnement souhaité. L'objectif est de définir un périmètre utile, évolutif et adapté à votre budget, puis de fournir une estimation claire après cadrage.",
        },
        {
          question: "Puis-je commencer avec un budget limité ?",
          answer: "Oui. Pas de formule rigide : les prestations peuvent être ajustées selon la demande. On peut commencer par un périmètre simple, valider l'essentiel, puis faire évoluer le site ou l'application progressivement selon vos priorités.",
        },
        {
          question: "Est-ce que vous pouvez créer un MVP ?",
          answer: "Oui, c'est l'une de mes spécialités. Un MVP (Minimum Viable Product) est une version simplifiée de votre produit qui permet de le tester avec de vrais utilisateurs sans investir dans une version complète. Je vous aide à définir ce qui est vraiment nécessaire pour démarrer.",
        },
        {
          question: "Est-ce que vous gérez aussi le design ?",
          answer: "Oui. Je m'occupe du design et du développement. Vous n'avez pas besoin de fournir de maquette. Si vous avez une charte graphique (logo, couleurs), je l'utilise. Sinon, je propose un design adapté à votre activité et à votre positionnement.",
        },
        {
          question: "Est-ce que vous pouvez refaire mon site actuel ?",
          answer: "Oui. La refonte est l'un des services les plus demandés. Que vous ayez un site WordPress, Wix, Squarespace ou autre, je peux le reprendre et le reconstruire proprement : design plus moderne, meilleures performances, meilleur SEO et meilleure conversion.",
        },
        {
          question: "Le site sera-t-il adapté mobile ?",
          answer: "Oui, systématiquement. Tous les sites et applications que je crée sont responsive et optimisés pour mobile, tablette et desktop. C'est une base non négociable.",
        },
        {
          question: "Est-ce que vous pouvez intégrer un système de paiement ?",
          answer: "Oui. J'intègre Stripe pour les paiements en ligne, abonnements ou réservations. Cela peut s'appliquer aussi bien à un site vitrine qu'à une application mobile ou un SaaS.",
        },
        {
          question: "Comment demander un devis ?",
          answer: "Remplissez le formulaire de devis en précisant votre besoin, le type de projet, votre budget estimé et votre délai. Je vous réponds sous 24h ouvrables avec une première estimation claire. Aucun engagement, aucun formulaire en 40 champs.",
        },
      ],
    },
    en: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      body: "Everything you want to know before launching your project.",
      faqs: [
        {
          question: "How is a landing page budget defined?",
          answer: "The budget depends on the real need: conversion goal, number of sections, content, design, animations and useful integrations. A first exchange helps define the right scope and produce a clear custom quote with no commitment.",
        },
        {
          question: "How is a professional website estimated?",
          answer: "Every project is different. A showcase site, a corporate website and a richer platform do not require the same content, design, SEO or features. The quote is built after understanding your context, available budget and business priorities.",
        },
        {
          question: "How do you scope a mobile or web app?",
          answer: "We start with users, workflows, must-have features, timeline and the level of support you need. The goal is to define a useful, scalable scope adapted to your budget, then provide a clear estimate after scoping.",
        },
        {
          question: "Can I start with a small budget?",
          answer: "Yes. There is no rigid package: the work can be adjusted to the request. We can start with a simple scope, validate the essentials, then improve the site or app progressively according to your priorities.",
        },
        {
          question: "Can you build an MVP?",
          answer: "Yes, that's one of my specialties. An MVP (Minimum Viable Product) is a simplified version of your product that lets you test it with real users without investing in a full version. I help you define what's truly necessary to get started.",
        },
        {
          question: "Do you handle design as well?",
          answer: "Yes. I handle both design and development. You don't need to provide mockups. If you have a brand identity (logo, colours), I'll use it. Otherwise, I propose a design suited to your activity and positioning.",
        },
        {
          question: "Can you redo my existing website?",
          answer: "Yes. Redesign is one of the most requested services. Whether you have a WordPress, Wix, Squarespace or other site, I can take it over and rebuild it cleanly: more modern design, better performance, better SEO and better conversion.",
        },
        {
          question: "Will the site be mobile-friendly?",
          answer: "Yes, always. Every site and app I build is responsive and optimised for mobile, tablet and desktop. That's a non-negotiable baseline.",
        },
        {
          question: "Can you integrate a payment system?",
          answer: "Yes. I integrate Stripe for online payments, subscriptions or bookings. This applies to showcase sites, mobile apps and SaaS platforms alike.",
        },
        {
          question: "How do I request a quote?",
          answer: "Fill in the quote form with your need, project type, estimated budget and timeline. I reply within 24 business hours with a clear first estimate. No commitment, no 40-field form.",
        },
      ],
    },
    de: {
      eyebrow: "FAQ",
      title: "Häufige Fragen",
      body: "Alles, was Sie vor dem Start Ihres Projekts wissen möchten.",
      faqs: [
        {
          question: "Wie wird das Budget einer Landing Page definiert?",
          answer: "Das Budget hängt vom echten Bedarf ab: Conversion-Ziel, Anzahl der Sektionen, Inhalte, Design, Animationen und sinnvolle Integrationen. Ein erstes Gespräch hilft, den passenden Umfang zu definieren und eine klare unverbindliche Offerte zu erstellen.",
        },
        {
          question: "Wie wird eine professionelle Website eingeschätzt?",
          answer: "Jedes Projekt ist anders. Eine Unternehmenswebsite, eine Corporate-Website oder eine größere Plattform brauchen nicht denselben Inhalt, dasselbe Design, SEO-Niveau oder dieselben Funktionen. Die Offerte entsteht nach Verständnis von Kontext, Budgetrahmen und Prioritäten.",
        },
        {
          question: "Wie wird eine mobile oder Web-App eingegrenzt?",
          answer: "Wir starten mit Nutzern, Abläufen, unverzichtbaren Funktionen, Zeitplan und gewünschter Begleitung. Ziel ist ein sinnvoller, erweiterbarer Umfang passend zum verfügbaren Budget, danach folgt eine klare Schätzung.",
        },
        {
          question: "Kann ich mit kleinem Budget starten?",
          answer: "Ja. Es gibt keine starre Formel: Die Leistung kann an die Anfrage angepasst werden. Man kann mit einem einfachen Umfang starten, das Wichtigste validieren und danach Website oder App schrittweise weiterentwickeln.",
        },
        {
          question: "Können Sie ein MVP erstellen?",
          answer: "Ja, das ist eine meiner Spezialitäten. Ein MVP (Minimum Viable Product) ist eine vereinfachte Version Ihres Produkts, mit der Sie es mit echten Nutzern testen können, ohne in eine vollständige Version zu investieren. Ich helfe Ihnen zu definieren, was wirklich notwendig ist, um anzufangen.",
        },
        {
          question: "Übernehmen Sie auch das Design?",
          answer: "Ja. Ich kümmere mich um Design und Entwicklung. Sie müssen keine Mockups liefern. Wenn Sie eine Corporate Identity haben (Logo, Farben), nutze ich diese. Sonst schlage ich ein zur Ihrer Tätigkeit passendes Design vor.",
        },
        {
          question: "Können Sie meine bestehende Website überarbeiten?",
          answer: "Ja. Die Website-Überarbeitung ist einer der am häufigsten nachgefragten Services. Egal ob WordPress, Wix, Squarespace oder andere, ich kann sie sauber neu aufbauen: moderneres Design, bessere Performance, besseres SEO und bessere Conversion.",
        },
        {
          question: "Wird die Website mobilfreundlich sein?",
          answer: "Ja, immer. Alle Websites und Apps, die ich erstelle, sind responsive und für Mobilgerät, Tablet und Desktop optimiert. Das ist eine nicht verhandelbare Grundlage.",
        },
        {
          question: "Können Sie ein Zahlungssystem integrieren?",
          answer: "Ja. Ich integriere Stripe für Online-Zahlungen, Abonnements oder Buchungen. Das gilt für Unternehmenswebsites, mobile Apps und SaaS-Plattformen gleichermaßen.",
        },
        {
          question: "Wie fordere ich ein Angebot an?",
          answer: "Füllen Sie das Angebotsformular mit Ihrem Bedarf, Projekttyp, geschätztem Budget und Zeitrahmen aus. Ich antworte innerhalb von 24 Arbeitsstunden mit einer klaren ersten Schätzung. Keine Verpflichtung, kein 40-Felder-Formular.",
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
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <span className="shrink-0 text-gray-500" aria-hidden="true">
                  {openIndex === index ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="border-t border-white/6 px-6 pb-5 pt-4">
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
