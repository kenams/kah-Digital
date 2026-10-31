import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "So schätzen Sie die Kosten einer Mobile-App 2026 — KAH Digital Studio",
  description: "Planungskriterien für eine Mobile-App 2026: Visitenkarten-App, MVP, native App oder React Native. Ein Leitfaden zur individuellen Offerte.",
  keywords: ["estimation application mobile", "devis application mobile", "App-Kosten schätzen", "individuelle Mobile-App-Entwicklung", "MVP application mobile"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/mobile-app-kosten-schaetzen" },
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "So schätzen Sie die Kosten einer Mobile-App 2026",
    description: "Die Kriterien, die den Umfang einer Mobile-App strukturieren und Ihnen die Kontrolle erhalten.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "So schätzen Sie die Kosten einer Mobile-App 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/mobile-app-kosten-schaetzen",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Wie wird eine einfache Mobile-App kalkuliert?", "acceptedAnswer": { "@type": "Answer", "text": "Eine einfache Mobile-App (MVP, 3–5 Bildschirme, Authentifizierung, eine Hauptfunktion) wird nach der Planung mit React Native kalkuliert, das iOS und Android mit einer einzigen Codebasis abdeckt." } },
    { "@type": "Question", "name": "Was ist der Unterschied zwischen nativ und Cross-Platform?", "acceptedAnswer": { "@type": "Answer", "text": "Eine native App bedeutet oft zwei getrennte Codebasen. React Native oder Flutter erlauben es, beide Plattformen auf einmal abzudecken, was die Planung eines MVP vereinfacht." } },
    { "@type": "Question", "name": "Brauche ich App-Store- und Google-Play-Konten?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Die Entwicklerkonten gehen zu Ihren Lasten als Herausgeber der App und sind vor der Veröffentlichung einzuplanen." } },
    { "@type": "Question", "name": "Kann man mit einer einfacheren Version beginnen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja, in manchen Fällen: Eine Progressive Web App oder ein No-Code-Prototyp kann genügen, um einen einfachen Ablauf vor der Vollentwicklung zu validieren." } },
  ],
};

const TIERS = [
  { label: "PWA / Web App mobile", price: "je nach Umfang", delay: "5 Werktage", desc: "Eine Webanwendung, die sich wie eine App installieren lässt. Nicht in den Stores, funktioniert aber offline und wird wie eine native App genutzt.", tech: "Next.js · React · Service Workers" },
  { label: "MVP React Native", price: "je nach Umfang", delay: "4–6 Wochen", desc: "Eine iOS- + Android-App mit gemeinsamer Codebasis. Ideal, um eine Idee mit kontrolliertem Budget zu validieren.", tech: "React Native · Expo · Supabase" },
  { label: "Vollständige Anwendung", price: "je nach Umfang", delay: "8–14 Wochen", desc: "Ein komplettes Produkt mit Authentifizierung, Zahlung, Admin-Dashboard, Push-Benachrichtigungen und individueller API.", tech: "React Native · Node.js · PostgreSQL" },
  { label: "Native iOS-/Android-Anwendung", price: "je nach Umfang", delay: "12–24 Wochen", desc: "Zwei getrennte Codebasen, maximale Performance, voller Zugriff auf System-APIs. Für etablierte Produkte.", tech: "Swift + Kotlin oder SwiftUI + Compose" },
];

const COST_DRIVERS = [
  { title: "Authentifizierung und Konten", detail: "Login, Profile, Rollen und Zugriffsrechte müssen von Anfang an geplant werden." },
  { title: "In-App-Zahlungen", detail: "Stripe, In-App-Käufe bei Apple/Google und Abrechnungsabläufe erfordern eine spezifische Analyse." },
  { title: "Notifications push", detail: "Segmentierung, Versandregeln und Nutzerpräferenzen beeinflussen den Umfang." },
  { title: "Geolokalisierung", detail: "Kartendarstellung, Tracking, Routenberechnung und mobile Berechtigungen müssen fachlich validiert werden." },
  { title: "Offline-Modus", detail: "Lokale Synchronisation und Konfliktbehandlung erhöhen die Produktkomplexität." },
  { title: "Dashboard admin web", detail: "Eine eigene Verwaltungsoberfläche ist als vollständiges eigenes Modul zu behandeln." },
];

export default function DeApplicationMobileCoutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Mobile</span>
            <span className="text-xs text-gray-600">4. Mai 2026 · 7 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            So schätzen Sie die Kosten einer Mobile-App 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            PWA, React Native, native App — die Kriterien, die den Umfang strukturieren, und wie Sie die Kontrolle über Ihre Investition behalten.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <p className="text-sm leading-relaxed text-violet-200">
            <strong>TL;DR :</strong> PWA nach Umfang · React-Native-MVP nach Umfang · Vollständige Anwendung nach Umfang · Native iOS+Android nach Umfang. Beginnen Sie immer mit einem MVP.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Warum ist die Planung unverzichtbar?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          „Eine Mobile-App entwickeln“ kann eine To-do-Liste mit 3 Bildschirmen oder eine Lieferplattform mit 50 Funktionen bedeuten. Die Offerte hängt von drei Dingen ab: der Anzahl Funktionen, der technischen Komplexität (Zahlung, Geolokalisierung, Echtzeit) und der gewählten Technologie.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Die goldene Regel: Beginnen Sie mit einem MVP (Minimum Viable Product) mit einer einzigen Hauptfunktion. Prüfen Sie, ob Menschen es wirklich nutzen, und investieren Sie dann mehr.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Formate nach App-Art</h2>
        <div className="mb-12 space-y-4">
          {TIERS.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500">{t.label}</p>
                  <p className="text-2xl font-black text-white">{t.price}</p>
                  <p className="text-xs text-gray-600">{t.delay}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500">{t.tech}</span>
              </div>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Was das Budget in die Höhe treibt</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {COST_DRIVERS.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/8 bg-gray-900/50 p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Wie Sie das Budget senken, ohne Qualität zu opfern</h2>
        <ul className="mb-10 space-y-3 text-sm text-gray-400 leading-relaxed">
          {[
            "Beginnen Sie mit einer einzigen Plattform (iOS ODER Android), um zu validieren, und erweitern Sie dann.",
            "Nutzen Sie React Native oder Expo — eine Codebasis, zwei Plattformen, oft einfacher zu warten als doppelte native Entwicklung.",
            "Legen Sie einen strengen Umfang für das MVP fest. Jede zusätzliche Funktion vervielfacht das Budget.",
            "Wählen Sie Supabase oder Firebase als Backend — spart Wochen an Entwicklung.",
            "Vermeiden Sie komplexe Animationen und 3D-Effekte in V1 — das kann bis V2 warten.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ihre Mobile-App, gut budgetiert</h2>
          <p className="mb-6 text-gray-400">Individuelle Offerte · Antwort in 24h · MVP nach Mass geplant</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/de/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-violet-500/30">
              Offerte anfordern <FiArrowRight size={15} />
            </Link>
            <Link href="/de/offres" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Unsere Angebote ansehen
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


