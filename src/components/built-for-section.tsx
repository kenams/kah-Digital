"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";

const SEGMENTS = {
  fr: [
    {
      emoji: "🍽️",
      type: "Restaurants & Cafés",
      headline: "Plus de réservations. Moins d'appels.",
      desc: "Site rapide, menu en ligne, formulaire de réservation, Google Maps intégré. Vos clients vous trouvent et réservent directement.",
      color: "from-orange-500/15 to-amber-500/5",
      border: "border-orange-500/20",
      tag: "orange",
    },
    {
      emoji: "🚀",
      type: "Startups & Scale-ups",
      headline: "MVP en ligne en quelques jours.",
      desc: "Landing page, SaaS, application web — on construit vite, bien et sans dépendances. Pitch-ready dès le lancement.",
      color: "from-blue-500/15 to-cyan-500/5",
      border: "border-blue-500/20",
      tag: "blue",
    },
    {
      emoji: "🛒",
      type: "E-commerce",
      headline: "Vendez 24h/24 sans la complexité.",
      desc: "Boutique en ligne rapide, paiement Stripe, gestion des commandes, design qui convertit. Pas de friction, pas de Shopify fees.",
      color: "from-green-500/15 to-emerald-500/5",
      border: "border-green-500/20",
      tag: "green",
    },
    {
      emoji: "🎯",
      type: "Coaches & Freelances",
      headline: "Plus de clients. Plus d'autorité.",
      desc: "Portfolio, page de capture, booking intégré, témoignages optimisés. Votre expertise visible et convertissante.",
      color: "from-violet-500/15 to-purple-500/5",
      border: "border-violet-500/20",
      tag: "violet",
    },
    {
      emoji: "🏢",
      type: "Agences & Cabinets",
      headline: "Systèmes white-label pour vos clients.",
      desc: "Infrastructure digitale complète, automatisation, CRM intégré. Vous livrez plus, plus vite, sans recruter.",
      color: "from-cyan-500/15 to-blue-500/5",
      border: "border-cyan-500/20",
      tag: "cyan",
    },
    {
      emoji: "📍",
      type: "Business locaux",
      headline: "Dominez vos résultats Google locaux.",
      desc: "SEO local, pages de villes, Google Business optimisé. Vos clients dans votre zone vous trouvent en premier.",
      color: "from-pink-500/15 to-rose-500/5",
      border: "border-pink-500/20",
      tag: "pink",
    },
  ],
  en: [
    {
      emoji: "🍽️",
      type: "Restaurants & Cafés",
      headline: "More bookings. Fewer phone calls.",
      desc: "Fast site, online menu, booking form, Google Maps integration. Clients find you and book directly.",
      color: "from-orange-500/15 to-amber-500/5",
      border: "border-orange-500/20",
      tag: "orange",
    },
    {
      emoji: "🚀",
      type: "Startups & Scale-ups",
      headline: "MVP live in days, not months.",
      desc: "Landing page, SaaS, web app — we build fast, clean, with no dependencies. Pitch-ready from day one.",
      color: "from-blue-500/15 to-cyan-500/5",
      border: "border-blue-500/20",
      tag: "blue",
    },
    {
      emoji: "🛒",
      type: "E-commerce",
      headline: "Sell 24/7 without the overhead.",
      desc: "Fast online store, Stripe payments, order management, high-converting design. No friction, no platform fees.",
      color: "from-green-500/15 to-emerald-500/5",
      border: "border-green-500/20",
      tag: "green",
    },
    {
      emoji: "🎯",
      type: "Coaches & Freelancers",
      headline: "More clients. More authority.",
      desc: "Portfolio, capture page, integrated booking, optimised testimonials. Your expertise visible and converting.",
      color: "from-violet-500/15 to-purple-500/5",
      border: "border-violet-500/20",
      tag: "violet",
    },
    {
      emoji: "🏢",
      type: "Agencies & Firms",
      headline: "White-label systems for your clients.",
      desc: "Complete digital infrastructure, automation, CRM integration. Deliver more, faster, without hiring.",
      color: "from-cyan-500/15 to-blue-500/5",
      border: "border-cyan-500/20",
      tag: "cyan",
    },
    {
      emoji: "📍",
      type: "Local Businesses",
      headline: "Dominate your local Google results.",
      desc: "Local SEO, city pages, optimised Google Business. Clients in your area find you first, every time.",
      color: "from-pink-500/15 to-rose-500/5",
      border: "border-pink-500/20",
      tag: "pink",
    },
  ],
  de: [
    {
      emoji: "🍽️",
      type: "Restaurants & Cafés",
      headline: "Mehr Reservierungen. Weniger Anrufe.",
      desc: "Schnelle Website, Online-Menü, Reservierungsformular, Google Maps integriert. Kunden finden Sie und buchen direkt.",
      color: "from-orange-500/15 to-amber-500/5",
      border: "border-orange-500/20",
      tag: "orange",
    },
    {
      emoji: "🚀",
      type: "Startups & Scale-ups",
      headline: "MVP online in wenigen Tagen.",
      desc: "Landing Page, SaaS, Web-App — wir bauen schnell, sauber und ohne Abhängigkeiten. Pitch-ready vom ersten Tag.",
      color: "from-blue-500/15 to-cyan-500/5",
      border: "border-blue-500/20",
      tag: "blue",
    },
    {
      emoji: "🛒",
      type: "E-Commerce",
      headline: "Verkaufen Sie 24/7 ohne den Aufwand.",
      desc: "Schneller Onlineshop, Stripe-Zahlung, Bestellverwaltung, konvertierendes Design. Kein Reibungsverlust, keine Plattformgebühren.",
      color: "from-green-500/15 to-emerald-500/5",
      border: "border-green-500/20",
      tag: "green",
    },
    {
      emoji: "🎯",
      type: "Coaches & Freelancer",
      headline: "Mehr Kunden. Mehr Autorität.",
      desc: "Portfolio, Capture-Seite, integrierte Buchung, optimierte Testimonials. Ihre Expertise sichtbar und konvertierend.",
      color: "from-violet-500/15 to-purple-500/5",
      border: "border-violet-500/20",
      tag: "violet",
    },
    {
      emoji: "🏢",
      type: "Agenturen & Kanzleien",
      headline: "White-Label-Systeme für Ihre Kunden.",
      desc: "Vollständige digitale Infrastruktur, Automatisierung, CRM-Integration. Liefern Sie mehr, schneller, ohne einzustellen.",
      color: "from-cyan-500/15 to-blue-500/5",
      border: "border-cyan-500/20",
      tag: "cyan",
    },
    {
      emoji: "📍",
      type: "Lokale Unternehmen",
      headline: "Dominieren Sie Ihre lokalen Google-Ergebnisse.",
      desc: "Lokales SEO, Stadtseiten, optimiertes Google Business. Kunden in Ihrer Region finden Sie als Erste.",
      color: "from-pink-500/15 to-rose-500/5",
      border: "border-pink-500/20",
      tag: "pink",
    },
  ],
};

export function BuiltForSection() {
  const { locale } = useLocale();
  const segments = SEGMENTS[locale === "de" ? "de" : locale === "en" ? "en" : "fr"];

  const copy =
    locale === "en"
      ? { eyebrow: "Built for modern businesses", title: "Whatever your industry,", title2: "we build systems that grow it.", sub: "From a local restaurant to a funded startup — the same premium approach, adapted to your reality." }
      : locale === "de"
      ? { eyebrow: "Für moderne Unternehmen", title: "Egal welche Branche,", title2: "wir bauen Systeme, die sie wachsen lassen.", sub: "Vom lokalen Restaurant bis zum finanzierten Startup — dieselbe Premium-Qualität, angepasst an Ihre Realität." }
      : { eyebrow: "Conçu pour les entreprises modernes", title: "Quelle que soit votre industrie,", title2: "on construit des systèmes qui la font croître.", sub: "Du restaurant local à la startup financée — la même approche premium, adaptée à votre réalité." };

  return (
    <section className="bg-gray-950 py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.type}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl border ${seg.border} bg-gradient-to-br ${seg.color} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{seg.emoji}</span>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{seg.type}</p>
              </div>
              <h3 className="mb-2 text-lg font-extrabold leading-tight text-white">{seg.headline}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{seg.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
