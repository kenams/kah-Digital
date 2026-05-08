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
          question: "Combien coûte une landing page ?",
          answer: "Une landing page démarre à partir de 300 €. Le prix final dépend du nombre de sections, du design, des animations et des intégrations souhaitées (formulaire, paiement, etc.). Je vous donne une estimation claire dès le premier échange.",
        },
        {
          question: "Combien coûte un site web professionnel ?",
          answer: "Un site vitrine démarre à partir de 900 €. Un site corporate plus complet se situe généralement entre 2 200 et 4 500 €. Chaque projet est différent. Je vous propose un devis précis après avoir compris votre besoin.",
        },
        {
          question: "Combien coûte une application mobile ?",
          answer: "Une application mobile MVP démarre généralement à partir de 6 000 €. Le prix final dépend du nombre d'écrans, des fonctionnalités, des intégrations (paiement, géolocalisation, notifications) et de la plateforme (iOS, Android ou les deux). Je vous aide à définir le périmètre minimal pour lancer proprement.",
        },
        {
          question: "Puis-je commencer avec un petit budget ?",
          answer: "Oui. La landing page à 300 € est faite pour ça. L'idée est de commencer simple, valider votre offre, puis évoluer. Même pour une application, il est possible de définir un MVP minimal et d'ajouter des fonctionnalités ensuite. Je vous guide selon votre budget réel.",
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
          question: "How much does a landing page cost?",
          answer: "A landing page starts from €300. The final price depends on the number of sections, design, animations and integrations (contact form, payment, etc.). I give you a clear estimate from the first exchange.",
        },
        {
          question: "How much does a professional website cost?",
          answer: "A showcase site starts from €900. A more complete corporate site is typically between €2,200 and €4,500. Every project is different. I'll give you a precise quote after understanding your needs.",
        },
        {
          question: "How much does a mobile app cost?",
          answer: "A mobile app MVP usually starts from €6,000. The final price depends on the number of screens, features, integrations (payment, geolocation, notifications) and platform (iOS, Android or both). I help you define the minimal scope to launch cleanly.",
        },
        {
          question: "Can I start with a small budget?",
          answer: "Yes. The €300 landing page is made for that. The idea is to start simple, validate your offer, then grow. Even for an app, it's possible to define a minimal MVP and add features later. I guide you based on your real budget.",
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
          question: "Was kostet eine Landing Page?",
          answer: "Eine Landing Page beginnt ab 300 €. Der Endpreis hängt von der Anzahl der Abschnitte, dem Design, Animationen und gewünschten Integrationen (Kontaktformular, Zahlung usw.) ab. Ich gebe Ihnen beim ersten Austausch eine klare Schätzung.",
        },
        {
          question: "Was kostet eine professionelle Website?",
          answer: "Eine Unternehmenswebsite beginnt ab 900 €. Eine umfangreichere Corporate-Website liegt in der Regel zwischen 2.200 und 4.500 €. Jedes Projekt ist anders. Ich erstelle Ihnen ein genaues Angebot, nachdem ich Ihren Bedarf verstanden habe.",
        },
        {
          question: "Was kostet eine mobile App?",
          answer: "Eine mobile MVP-App beginnt in der Regel ab 6.000 €. Der Endpreis hängt von Anzahl der Screens, Funktionen, Integrationen (Zahlung, Geolokalisierung, Push-Nachrichten) und Plattform (iOS, Android oder beides) ab. Ich helfe Ihnen, den minimalen Umfang für einen sauberen Launch zu definieren.",
        },
        {
          question: "Kann ich mit kleinem Budget starten?",
          answer: "Ja. Die Landing Page für 300 € ist genau dafür gedacht. Die Idee ist, einfach zu starten, Ihr Angebot zu validieren und dann zu wachsen. Selbst für eine App kann ein minimales MVP definiert und Funktionen später hinzugefügt werden. Ich begleite Sie basierend auf Ihrem tatsächlichen Budget.",
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
