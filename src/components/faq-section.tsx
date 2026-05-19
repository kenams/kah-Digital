"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

const FAQS = {
  fr: [
    {
      q: "Combien de temps faut-il pour livrer mon site ?",
      a: "Starter (1 page) : 5 jours ouvrés. Business (5 pages) : 14 jours. Premium AI (système complet) : 28 jours. Une fois le devis validé et vos assets envoyés (photos, couleurs, police), on démarre immédiatement.",
    },
    {
      q: "Puis-je upgrader vers un plan supérieur après la livraison ?",
      a: "Oui, à tout moment. Vous démarrez avec le Starter pour tester, et on peut faire évoluer vers Business ou Premium AI quand vous êtes prêt. Chaque étape s'appuie sur la précédente — rien n'est à refaire.",
    },
    {
      q: "Le site m'appartient-il intégralement ?",
      a: "100%. Le code source, le domaine et l'hébergement vous appartiennent entièrement. Pas de plateforme propriétaire, pas de verrouillage. Vous avez les accès complets dès la livraison.",
    },
    {
      q: "Le SEO est-il inclus dans les plans ?",
      a: "Le SEO technique de base (balises meta, sitemap, structure URL, vitesse) est inclus dans tous les plans. Le SEO avancé (pages locales, contenu optimisé, link building, suivi de positions) est disponible en option à 149 €.",
    },
    {
      q: "Le site sera-t-il optimisé pour mobile ?",
      a: "Absolument — c'est non-négociable. Chaque projet est développé mobile-first. Score Lighthouse 90+ sur mobile, interface fluide sur tous les écrans, temps de chargement < 2 secondes.",
    },
    {
      q: "Puis-je payer en plusieurs fois ?",
      a: "Oui. Le paiement standard est 50 % au démarrage, 50 % à la livraison. Pour les projets Business et Premium AI, un échelonnement en 3 fois est possible. On en discute avant tout engagement.",
    },
    {
      q: "Y a-t-il un support après la livraison ?",
      a: "Business : 1 mois de support inclus (corrections, ajustements mineurs). Premium AI : 3 mois de support prioritaire. Des formules de maintenance mensuelle sont disponibles à partir de 49 €/mois pour la suite.",
    },
    {
      q: "L'IA est-elle disponible dans tous les plans ?",
      a: "Le chatbot IA et les automatisations sont inclus dans le plan Premium AI. Pour les autres plans, le chatbot IA est disponible en option à 199 € et l'automatisation à partir de 299 €. On peut ajouter l'IA à n'importe quel plan existant.",
    },
  ],
  en: [
    {
      q: "How long does it take to deliver my site?",
      a: "Starter (1 page): 5 business days. Business (5 pages): 14 days. Premium AI (full system): 28 days. Once your quote is approved and assets sent (photos, colours, font), we start immediately.",
    },
    {
      q: "Can I upgrade to a higher plan after delivery?",
      a: "Yes, at any time. Start with Starter to test the waters, then move to Business or Premium AI when you're ready. Each step builds on the previous — nothing needs to be redone.",
    },
    {
      q: "Do I fully own my website?",
      a: "100%. The source code, domain, and hosting are entirely yours. No proprietary platform, no lock-in. You get full access from day one of delivery.",
    },
    {
      q: "Is SEO included in the plans?",
      a: "Basic technical SEO (meta tags, sitemap, URL structure, speed) is included in all plans. Advanced SEO (local pages, optimised content, link building, rank tracking) is available as an add-on for $149.",
    },
    {
      q: "Will my site be mobile-optimised?",
      a: "Absolutely — non-negotiable. Every project is built mobile-first. 90+ Lighthouse on mobile, fluid on all screens, load time under 2 seconds.",
    },
    {
      q: "Can I pay in instalments?",
      a: "Yes. Standard payment is 50% upfront, 50% on delivery. For Business and Premium AI projects, a 3-instalment split is possible. We discuss this before any commitment.",
    },
    {
      q: "Is there support after delivery?",
      a: "Business: 1 month support included (fixes, minor adjustments). Premium AI: 3 months priority support. Monthly maintenance plans are available from $49/month for ongoing care.",
    },
    {
      q: "Is AI available in all plans?",
      a: "AI chatbot and automations are included in Premium AI. For other plans, the AI chatbot is available as an add-on at $199, and automation from $299. AI can be added to any existing plan.",
    },
  ],
  de: [
    {
      q: "Wie lange dauert die Lieferung meiner Website?",
      a: "Starter (1 Seite): 5 Werktage. Business (5 Seiten): 14 Tage. Premium AI (vollständiges System): 28 Tage. Sobald Ihr Angebot bestätigt und Assets gesendet sind (Fotos, Farben, Schrift), starten wir sofort.",
    },
    {
      q: "Kann ich nach der Lieferung auf einen höheren Plan upgraden?",
      a: "Ja, jederzeit. Starten Sie mit dem Starter zum Testen und wechseln Sie zu Business oder Premium AI, wenn Sie bereit sind. Jeder Schritt baut auf dem vorherigen auf — nichts muss neu gemacht werden.",
    },
    {
      q: "Gehört mir die Website vollständig?",
      a: "100 %. Der Quellcode, die Domain und das Hosting gehören Ihnen vollständig. Kein proprietäres System, kein Lock-in. Ab dem ersten Liefertag haben Sie vollen Zugriff.",
    },
    {
      q: "Ist SEO in den Plänen enthalten?",
      a: "Technisches Basis-SEO (Meta-Tags, Sitemap, URL-Struktur, Geschwindigkeit) ist in allen Plänen enthalten. Erweitertes SEO (lokale Seiten, optimierter Content, Link-Building, Ranking-Tracking) ist als Option für CHF 149 verfügbar.",
    },
    {
      q: "Wird meine Website für Mobilgeräte optimiert?",
      a: "Absolut — nicht verhandelbar. Jedes Projekt wird Mobile-first entwickelt. 90+ Lighthouse auf Mobilgeräten, flüssig auf allen Bildschirmen, Ladezeit unter 2 Sekunden.",
    },
    {
      q: "Kann ich in Raten zahlen?",
      a: "Ja. Die Standardzahlung ist 50 % bei Start, 50 % bei Lieferung. Für Business- und Premium AI-Projekte ist eine 3-Raten-Zahlung möglich. Das besprechen wir vor jeder Verpflichtung.",
    },
    {
      q: "Gibt es Support nach der Lieferung?",
      a: "Business: 1 Monat Support inklusive (Korrekturen, kleinere Anpassungen). Premium AI: 3 Monate Prioritäts-Support. Monatliche Wartungspläne sind ab CHF 49/Monat verfügbar.",
    },
    {
      q: "Ist KI in allen Plänen verfügbar?",
      a: "KI-Chatbot und Automatisierungen sind im Premium AI-Plan enthalten. Für andere Pläne ist der KI-Chatbot als Option für CHF 199 verfügbar, Automatisierung ab CHF 299. KI kann jedem bestehenden Plan hinzugefügt werden.",
    },
  ],
};

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const { locale } = useLocale();
  const faqs = FAQS[locale === "de" ? "de" : locale === "en" ? "en" : "fr"];

  const copy =
    locale === "en"
      ? { eyebrow: "FAQ", title: "Straight answers.", title2: "No vague replies.", sub: "Everything you need to know before getting started." }
      : locale === "de"
      ? { eyebrow: "FAQ", title: "Klare Antworten.", title2: "Keine vagen Aussagen.", sub: "Alles, was Sie vor dem Start wissen müssen." }
      : { eyebrow: "FAQ", title: "Des réponses claires.", title2: "Pas de vague.", sub: "Tout ce que vous devez savoir avant de commencer." };

  return (
    <section className="bg-gray-900 py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

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
          <p className="mt-4 text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="overflow-hidden rounded-2xl border border-white/8 bg-gray-950 transition-all hover:border-white/14"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-semibold transition-colors ${open === i ? "text-white" : "text-gray-200"}`}>
                  {faq.q}
                </span>
                <span className={`shrink-0 transition-colors ${open === i ? "text-blue-400" : "text-gray-600"}`}>
                  {open === i ? <FiMinus size={18} /> : <FiPlus size={18} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="border-t border-white/6 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-gray-400">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
