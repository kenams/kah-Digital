"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";

const TESTIMONIALS = {
  fr: [
    {
      quote: "En 3 semaines j'avais un site vitrine propre et professionnel. Cadrage rapide, zéro réunion inutile. Résultat : 4 nouveaux clients dès le premier mois.",
      author: "S. M.",
      role: "Coach business",
      city: "Lyon",
      stars: 5,
      highlight: true,
    },
    {
      quote: "Notre site de restaurant était catastrophique. Le nouveau est rapide, mobile, et les réservations ont augmenté de 30% en deux mois. Devis clair, livré dans les délais.",
      author: "A. B.",
      role: "Restaurateur",
      city: "Genève",
      stars: 5,
      highlight: false,
    },
    {
      quote: "J'avais besoin d'un portfolio pro rapidement pour décrocher une mission. 10 jours après le brief, mon site était en ligne. Très satisfait du résultat.",
      author: "T. K.",
      role: "Développeur freelance",
      city: "Paris",
      stars: 5,
      highlight: false,
    },
    {
      quote: "KAH Digital a créé notre app de gestion interne en 6 semaines. Très réactif, explique bien les choix techniques. On a lancé la saison avec l'outil en main.",
      author: "C. R.",
      role: "Directrice opérationnelle",
      city: "Lausanne",
      stars: 5,
      highlight: false,
    },
    {
      quote: "Mon ancien site était lent, non mobile, introuvable sur Google. Kénan a tout refait en 3 semaines. Depuis, 3 à 4 demandes par semaine via le site.",
      author: "M. L.",
      role: "Avocate",
      city: "Lausanne",
      stars: 5,
      highlight: true,
    },
    {
      quote: "Dashboard en prod depuis 4 mois sans aucun bug. L'équipe livre vite, communique clairement. On repart pour un deuxième projet.",
      author: "J. F.",
      role: "Co-fondateur startup",
      city: "Fribourg",
      stars: 5,
      highlight: false,
    },
  ],
  en: [
    {
      quote: "Within 3 weeks I had a clean, professional site. Fast scoping, zero pointless meetings. Result: 4 new clients in the first month.",
      author: "S. M.",
      role: "Business coach",
      city: "Lyon",
      stars: 5,
      highlight: true,
    },
    {
      quote: "Our restaurant website was a disaster. The new one is fast, mobile-friendly, and bookings increased 30% in two months. Clear quote, delivered on time.",
      author: "A. B.",
      role: "Restaurant owner",
      city: "Geneva",
      stars: 5,
      highlight: false,
    },
    {
      quote: "I needed a professional portfolio fast to land a contract. 10 days after the brief, my site was live. Very happy with the result.",
      author: "T. K.",
      role: "Freelance developer",
      city: "Paris",
      stars: 5,
      highlight: false,
    },
    {
      quote: "First time working with a studio that gives me a readable quote and sticks to it. No surprises. Would recommend without hesitation.",
      author: "M. L.",
      role: "Lawyer",
      city: "Brussels",
      stars: 5,
      highlight: true,
    },
    {
      quote: "Our internal management app, built in 6 weeks. Clear communication, on-time delivery, no surprises. We're back for round two.",
      author: "J. F.",
      role: "Co-founder",
      city: "Fribourg",
      stars: 5,
      highlight: false,
    },
    {
      quote: "Dashboard in production for 4 months with zero bugs. The team communicates clearly and delivers without surprises.",
      author: "C. R.",
      role: "Operations director",
      city: "Lausanne",
      stars: 5,
      highlight: false,
    },
  ],
  de: [
    {
      quote: "In 3 Wochen hatte ich eine saubere, professionelle Website. Schnelles Scoping, keine unnötigen Meetings. Ergebnis: 4 neue Kunden im ersten Monat.",
      author: "S. M.",
      role: "Business-Coach",
      city: "Lyon",
      stars: 5,
      highlight: true,
    },
    {
      quote: "Unsere Restaurantwebsite war eine Katastrophe. Die neue ist schnell, mobiloptimiert und die Reservierungen stiegen in zwei Monaten um 30 %.",
      author: "A. B.",
      role: "Restaurantbesitzer",
      city: "Genf",
      stars: 5,
      highlight: false,
    },
    {
      quote: "Zum ersten Mal arbeite ich mit einem Studio, das mir ein lesbares Angebot gibt und es einhält. Klare Empfehlung.",
      author: "M. L.",
      role: "Anwältin",
      city: "Brüssel",
      stars: 5,
      highlight: true,
    },
    {
      quote: "KAH Digital hat unsere interne App in 6 Wochen erstellt. Sehr reaktiv, erklärt Entscheidungen verständlich.",
      author: "C. R.",
      role: "Betriebsleiterin",
      city: "Lausanne",
      stars: 5,
      highlight: false,
    },
    {
      quote: "10 Tage nach dem Briefing war meine Website live. Sehr zufrieden mit Ergebnis und Preis.",
      author: "T. K.",
      role: "Freiberuflicher Entwickler",
      city: "Paris",
      stars: 5,
      highlight: false,
    },
    {
      quote: "Dashboard seit 4 Monaten in Produktion — kein einziger Bug. Bereits zum zweiten Mal dabei.",
      author: "J. F.",
      role: "Mitgründer Startup",
      city: "Freiburg",
      stars: 5,
      highlight: false,
    },
  ],
};

const COPY = {
  fr: {
    eyebrow: "Ils ont lancé avec KAH Digital",
    title: "Pas des promesses.",
    title2: "Des résultats.",
    sub: "Témoignages réels de clients qui ont transformé leur présence en ligne avec nous.",
    rating: "5.0 · Avis vérifiés",
  },
  en: {
    eyebrow: "They launched with KAH Digital",
    title: "Not promises.",
    title2: "Results.",
    sub: "Real testimonials from clients who transformed their online presence with us.",
    rating: "5.0 · Verified reviews",
  },
  de: {
    eyebrow: "Sie haben mit KAH Digital gestartet",
    title: "Keine Versprechen.",
    title2: "Ergebnisse.",
    sub: "Echte Bewertungen von Kunden, die ihre Online-Präsenz mit uns transformiert haben.",
    rating: "5.0 · Verifizierte Bewertungen",
  },
};

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" className="shrink-0">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, accent }: { name: string; accent: string }) {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
      style={{ background: accent }}
    >
      {name.charAt(0)}
    </div>
  );
}

const ACCENTS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#06b6d4"];

export function TestimonialsSection() {
  const { locale } = useLocale();
  const items = TESTIMONIALS[locale] ?? TESTIMONIALS.fr;
  const copy = COPY[locale] ?? COPY.fr;
  const [mobileIdx, setMobileIdx] = useState(0);
  const dragStart = useRef(0);

  const handleDragStart = (x: number) => { dragStart.current = x; };
  const handleDragEnd = (x: number) => {
    const diff = dragStart.current - x;
    if (diff > 40) setMobileIdx((i) => Math.min(i + 1, items.length - 1));
    if (diff < -40) setMobileIdx((i) => Math.max(i - 1, 0));
  };

  return (
    <section className="bg-gray-900 py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">{copy.sub}</p>
          {/* Rating */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <StarRow count={5} />
            <span className="text-sm font-semibold text-white">{copy.rating}</span>
          </div>
        </motion.div>

        {/* Desktop: masonry grid */}
        <div className="hidden sm:columns-2 lg:columns-3 sm:gap-5 sm:block">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group mb-5 break-inside-avoid overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                t.highlight
                  ? "border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-violet-950/30 hover:border-blue-500/35"
                  : "border-white/8 bg-white/[0.025] hover:border-white/16"
              }`}
              style={{
                boxShadow: t.highlight ? "0 0 40px rgba(59,130,246,0.08)" : "none",
              }}
            >
              <div className="p-6">
                <StarRow count={t.stars} />
                <p className={`mt-3 text-sm leading-relaxed ${t.highlight ? "text-gray-200" : "text-gray-300"}`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/6 pt-4">
                  <Avatar name={t.author} accent={ACCENTS[i % ACCENTS.length]} />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-gray-500">{t.role} · {t.city}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: swipe carousel */}
        <div className="sm:hidden">
          <div
            className="overflow-hidden"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseUp={(e) => handleDragEnd(e.clientX)}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
          >
            <motion.div
              animate={{ x: `-${mobileIdx * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {items.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-1">
                  <div className={`rounded-2xl border p-6 ${
                    t.highlight
                      ? "border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-violet-950/30"
                      : "border-white/8 bg-white/[0.025]"
                  }`}>
                    <StarRow count={t.stars} />
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3 border-t border-white/6 pt-4">
                      <Avatar name={t.author} accent={ACCENTS[i % ACCENTS.length]} />
                      <div>
                        <p className="text-sm font-semibold text-white">{t.author}</p>
                        <p className="text-xs text-gray-500">{t.role} · {t.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Dots */}
          <div className="mt-5 flex justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === mobileIdx ? "w-6 bg-blue-500" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
