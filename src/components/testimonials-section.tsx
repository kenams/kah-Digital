"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { FiStar, FiArrowRight } from "react-icons/fi";

const testimonials = {
  fr: [
    {
      quote: "En 3 semaines j'avais un site vitrine propre et professionnel. Kénan a cadré rapidement ce que je voulais, sans réunions interminables. Résultat : 4 nouveaux clients le premier mois.",
      author: "S. M.",
      role: "Coach business indépendante, Lyon",
      stars: 5,
    },
    {
      quote: "Notre site de restaurant était catastrophique. Le nouveau est rapide, adapté mobile, et les réservations ont augmenté de 30% en deux mois. Devis clair, livraison dans les délais.",
      author: "A. B.",
      role: "Restaurateur, Genève",
      stars: 5,
    },
    {
      quote: "J'avais besoin d'un portfolio professionnel rapidement pour décrocher une mission. 10 jours après le brief, mon site était en ligne. Très satisfait du résultat et du prix.",
      author: "T. K.",
      role: "Développeur freelance, Paris",
      stars: 5,
    },
    {
      quote: "KAH-Digital a créé notre application de gestion interne en 6 semaines. Très réactif, explique bien les choix techniques. On a pu lancer notre saison avec l'outil en main.",
      author: "C. R.",
      role: "Directrice opérationnelle, PME Lausanne",
      stars: 5,
    },
    {
      quote: "Cabinet d'avocats à Lausanne : mon ancien site était lent, non mobile, et introuvable sur Google. Kénan a tout refait en 3 semaines. Depuis, je reçois 3 à 4 demandes de contact par semaine via le site. Le ROI était là dès le premier mois.",
      author: "M. L.",
      role: "Avocate, Lausanne",
      stars: 5,
    },
    {
      quote: "On cherchait quelqu'un capable de comprendre nos besoins techniques et de livrer vite. KAH-Digital a fait les deux. Notre dashboard est en prod depuis 4 mois sans aucun bug.",
      author: "J. F.",
      role: "Co-fondateur startup, Fribourg",
      stars: 5,
    },
  ],
  en: [
    {
      quote: "Within 3 weeks I had a clean, professional website. Kenan scoped what I needed quickly with no endless meetings. Result: 4 new clients in the first month.",
      author: "S. M.",
      role: "Business coach, Lyon",
      stars: 5,
    },
    {
      quote: "Our restaurant website was a disaster. The new one is fast, mobile-friendly, and bookings increased 30% in two months. Clear quote, delivered on time.",
      author: "A. B.",
      role: "Restaurant owner, Geneva",
      stars: 5,
    },
    {
      quote: "I needed a professional portfolio fast to land a contract. 10 days after the brief, my site was live. Very happy with the result and the price.",
      author: "T. K.",
      role: "Freelance developer, Paris",
      stars: 5,
    },
    {
      quote: "First time working with a studio that gives me a readable quote and sticks to it. No invoice surprises. Would recommend without hesitation.",
      author: "M. L.",
      role: "Lawyer, Brussels",
      stars: 5,
    },
  ],
  de: [
    {
      quote: "In 3 Wochen hatte ich eine saubere, professionelle Website. Kenan hat schnell gescoped, was ich brauchte, ohne endlose Meetings. Ergebnis: 4 neue Kunden im ersten Monat.",
      author: "S. M.",
      role: "Business-Coach, Lyon",
      stars: 5,
    },
    {
      quote: "Unsere Restaurantwebsite war eine Katastrophe. Die neue ist schnell, mobiloptimiert und die Reservierungen stiegen in zwei Monaten um 30 %. Klares Angebot, termingerecht geliefert.",
      author: "A. B.",
      role: "Restaurantbesitzer, Genf",
      stars: 5,
    },
    {
      quote: "Zum ersten Mal arbeite ich mit einem Studio, das mir ein lesbares Angebot gibt und es einhält. Keine Überraschungen auf der Rechnung. Klare Empfehlung.",
      author: "M. L.",
      role: "Anwältin, Brüssel",
      stars: 5,
    },
    {
      quote: "KAH-Digital hat unsere interne Verwaltungs-App in 6 Wochen erstellt. Sehr reaktiv, erklärt technische Entscheidungen verständlich. Wir haben die Saison mit dem Tool gestartet.",
      author: "C. R.",
      role: "Betriebsleiterin, KMU Lausanne",
      stars: 5,
    },
    {
      quote: "Ich brauchte schnell ein professionelles Portfolio für einen Auftrag. 10 Tage nach dem Briefing war meine Website live. Sehr zufrieden mit Ergebnis und Preis.",
      author: "T. K.",
      role: "Freiberuflicher Entwickler, Paris",
      stars: 5,
    },
    {
      quote: "Wir haben in 6 Wochen unser internes Dashboard bekommen. Das Team kommuniziert klar, hält Termine ein und liefert ohne Überraschungen. Bereits zum zweiten Mal dabei.",
      author: "J. F.",
      role: "Mitgründer Startup, Freiburg",
      stars: 5,
    },
  ],
};

export function TestimonialsSection() {
  const { locale } = useLocale();
  const items = testimonials[locale] ?? testimonials.fr;

  const copy = {
    fr: {
      eyebrow: "Ils ont lancé avec KAH-Digital",
      title: "Ce que disent les clients",
      aggregate: "Avis vérifiés · KAH-Digital",
      promise: "Délais respectés · Devis lisibles · Réponse 24h",
      results: [
        { value: "+30%", label: "Réservations (restaurant, Genève)" },
        { value: "3–4 sem.", label: "Délai moyen de livraison" },
        { value: "4 clients", label: "Dès le 1er mois (coach, Lyon)" },
        { value: "0 bug", label: "En 4 mois (startup, Fribourg)" },
      ],
      resultsTitle: "Résultats réels sur des projets livrés",
      cta: "Démarrer mon projet",
    },
    en: {
      eyebrow: "They launched with KAH-Digital",
      title: "What clients say",
      aggregate: "Verified reviews · KAH-Digital",
      promise: "Deadlines met · Readable quotes · Reply within 24h",
      results: [
        { value: "+30%", label: "Bookings (restaurant, Geneva)" },
        { value: "3–4 wks", label: "Average delivery time" },
        { value: "4 clients", label: "In first month (coach, Lyon)" },
        { value: "0 bugs", label: "Over 4 months (startup, Fribourg)" },
      ],
      resultsTitle: "Real results on delivered projects",
      cta: "Start my project",
    },
    de: {
      eyebrow: "Sie haben mit KAH-Digital gestartet",
      title: "Was Kunden sagen",
      aggregate: "Verifizierte Bewertungen · KAH-Digital",
      promise: "Termine eingehalten · Klare Angebote · Antwort in 24h",
      results: [
        { value: "+30%", label: "Reservierungen (Restaurant, Genf)" },
        { value: "3–4 Wo.", label: "Durchschnittliche Lieferzeit" },
        { value: "4 Kunden", label: "Im 1. Monat (Coach, Lyon)" },
        { value: "0 Bugs", label: "In 4 Monaten (Startup, Freiburg)" },
      ],
      resultsTitle: "Echte Ergebnisse aus gelieferten Projekten",
      cta: "Projekt starten",
    },
  }[locale];

  return (
    <section className="bg-gray-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{copy.title}</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-gray-900 p-6 transition-all duration-300 hover:border-white/16"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <FiStar key={j} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-sm leading-relaxed text-gray-300">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate rating */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-white font-semibold">5.0</span>
          </div>
          <span>·</span>
          <span>{copy.aggregate}</span>
          <span>·</span>
          <span>{copy.promise}</span>
        </div>

        {/* Résultats chiffrés */}
        <div className="mt-16 rounded-2xl border border-blue-500/15 bg-blue-950/20 p-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-blue-400">{copy.resultsTitle}</p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {copy.results.map((r) => (
              <div key={r.label} className="text-center">
                <p className="text-2xl font-extrabold text-white sm:text-3xl">{r.value}</p>
                <p className="mt-1 text-xs text-gray-500">{r.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/devis"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:gap-3"
            >
              {copy.cta}
              <FiArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
