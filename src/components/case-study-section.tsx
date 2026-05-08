"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiTrendingUp, FiClock, FiStar } from "react-icons/fi";

export function CaseStudySection() {
  const { locale, prefix } = useLocale();

  const copy = {
    fr: {
      eyebrow: "Cas clients",
      title: "Des résultats concrets, pas des promesses",
      cases: [
        {
          tag: "Avocat · Lausanne",
          title: "Refonte site cabinet d'avocats",
          context: "Site WordPress lent, non mobile, introuvable sur Google. 0 contact entrant par mois via le site.",
          solution: "Refonte complète en 3 semaines : Next.js, SEO local, formulaire de contact optimisé, page par domaine de pratique.",
          results: [
            { icon: FiTrendingUp, value: "3–4", label: "Contacts/semaine via le site" },
            { icon: FiStar, value: "ROI", label: "Atteint dès le 1er mois" },
            { icon: FiClock, value: "3 sem.", label: "Délai de livraison" },
          ],
          quote: "Depuis la refonte, je reçois 3 à 4 demandes de contact par semaine. Le ROI était là dès le premier mois.",
          author: "M. L. — Avocate, Lausanne",
          accent: "from-blue-600/20 to-violet-600/10",
          border: "border-blue-500/20",
        },
        {
          tag: "Restaurant · Genève",
          title: "Site avec réservation en ligne",
          context: "Site Wix lent, pas optimisé mobile. Les clients abandonnaient avant de réserver.",
          solution: "Nouveau site vitrine avec système de réservation intégré, photos optimisées et SEO local Genève.",
          results: [
            { icon: FiTrendingUp, value: "+30%", label: "Réservations en 2 mois" },
            { icon: FiClock, value: "2 sem.", label: "Délai de livraison" },
            { icon: FiStar, value: "100%", label: "Devis respecté" },
          ],
          quote: "Les réservations ont augmenté de 30% en deux mois. Devis clair, livraison dans les délais.",
          author: "A. B. — Restaurateur, Genève",
          accent: "from-emerald-600/20 to-teal-600/10",
          border: "border-emerald-500/20",
        },
        {
          tag: "Startup · Fribourg",
          title: "Dashboard de gestion interne",
          context: "Gestion sur Excel et email. Besoin d'un outil métier pour coordonner les équipes et suivre les commandes.",
          solution: "Application web React sur mesure avec auth, dashboard temps réel, export PDF et gestion des rôles.",
          results: [
            { icon: FiClock, value: "6 sem.", label: "Délai de livraison" },
            { icon: FiStar, value: "0 bug", label: "En 4 mois de production" },
            { icon: FiTrendingUp, value: "2e projet", label: "Déjà commandé" },
          ],
          quote: "Dashboard en prod depuis 4 mois sans aucun bug. Déjà en train de planifier le 2e projet.",
          author: "J. F. — Co-fondateur startup, Fribourg",
          accent: "from-violet-600/20 to-purple-600/10",
          border: "border-violet-500/20",
        },
      ],
      cta: "Démarrer mon projet",
      ctaSub: "Devis gratuit · Réponse sous 24h",
    },
    en: {
      eyebrow: "Case studies",
      title: "Real results, not promises",
      cases: [
        {
          tag: "Lawyer · Lausanne",
          title: "Law firm website redesign",
          context: "Slow WordPress site, not mobile-friendly, invisible on Google. 0 incoming contacts per month via website.",
          solution: "Full redesign in 3 weeks: Next.js, local SEO, optimized contact form, dedicated page per practice area.",
          results: [
            { icon: FiTrendingUp, value: "3–4", label: "Contacts/week via website" },
            { icon: FiStar, value: "ROI", label: "Achieved from month 1" },
            { icon: FiClock, value: "3 wks", label: "Delivery time" },
          ],
          quote: "Since the redesign, I receive 3 to 4 contact requests per week. The ROI was there from the first month.",
          author: "M. L. — Lawyer, Lausanne",
          accent: "from-blue-600/20 to-violet-600/10",
          border: "border-blue-500/20",
        },
        {
          tag: "Restaurant · Geneva",
          title: "Website with online booking",
          context: "Slow Wix site, not mobile-optimized. Customers were abandoning before booking.",
          solution: "New showcase site with integrated booking system, optimized photos, and local Geneva SEO.",
          results: [
            { icon: FiTrendingUp, value: "+30%", label: "Bookings in 2 months" },
            { icon: FiClock, value: "2 wks", label: "Delivery time" },
            { icon: FiStar, value: "100%", label: "Quote honored" },
          ],
          quote: "Bookings increased 30% in two months. Clear quote, delivered on time.",
          author: "A. B. — Restaurant owner, Geneva",
          accent: "from-emerald-600/20 to-teal-600/10",
          border: "border-emerald-500/20",
        },
      ],
      cta: "Start my project",
      ctaSub: "Free quote · Reply within 24h",
    },
    de: {
      eyebrow: "Fallstudien",
      title: "Echte Ergebnisse, keine Versprechen",
      cases: [
        {
          tag: "Anwalt · Lausanne",
          title: "Neugestaltung Kanzleiwebsite",
          context: "Langsame WordPress-Website, nicht mobiloptimiert, bei Google nicht auffindbar. 0 Kontaktanfragen pro Monat.",
          solution: "Vollständige Neugestaltung in 3 Wochen: Next.js, lokales SEO, optimiertes Kontaktformular.",
          results: [
            { icon: FiTrendingUp, value: "3–4", label: "Anfragen/Woche über die Website" },
            { icon: FiStar, value: "ROI", label: "Ab dem 1. Monat erreicht" },
            { icon: FiClock, value: "3 Wo.", label: "Lieferzeit" },
          ],
          quote: "Seit der Neugestaltung erhalte ich 3 bis 4 Kontaktanfragen pro Woche. Der ROI war ab dem ersten Monat da.",
          author: "M. L. — Anwältin, Lausanne",
          accent: "from-blue-600/20 to-violet-600/10",
          border: "border-blue-500/20",
        },
      ],
      cta: "Projekt starten",
      ctaSub: "Kostenloses Angebot · Antwort in 24h",
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{copy.title}</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {copy.cases.map((c) => (
            <div
              key={c.title}
              className={`flex flex-col rounded-2xl border ${c.border} bg-gradient-to-br ${c.accent} p-6`}
            >
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400">{c.tag}</span>
              <h3 className="mb-3 text-lg font-bold text-white">{c.title}</h3>

              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Situation</p>
                <p className="text-sm text-gray-400">{c.context}</p>
              </div>

              <div className="mb-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Solution</p>
                <p className="text-sm text-gray-400">{c.solution}</p>
              </div>

              <div className="mb-5 grid grid-cols-3 gap-3 rounded-xl border border-white/8 bg-black/20 p-3">
                {c.results.map((r) => (
                  <div key={r.label} className="flex flex-col items-center gap-1 text-center">
                    <r.icon size={13} className="text-gray-500" />
                    <span className="text-base font-extrabold text-white">{r.value}</span>
                    <span className="text-[10px] leading-tight text-gray-500">{r.label}</span>
                  </div>
                ))}
              </div>

              <blockquote className="mt-auto rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-sm italic text-gray-300">"{c.quote}"</p>
                <p className="mt-2 text-xs text-gray-600">{c.author}</p>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={withPrefix("/devis")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 hover:gap-3"
          >
            {copy.cta}
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="mt-3 text-sm text-gray-500">{copy.ctaSub}</p>
        </div>
      </div>
    </section>
  );
}
