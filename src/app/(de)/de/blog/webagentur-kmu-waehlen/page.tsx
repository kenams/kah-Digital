import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "So wählen Sie eine Webagentur für Ihr KMU — Leitfaden 2026 — KAH Digital",
  description: "Offerte, Warnsignale, Fragen, Schlüsselkriterien: alles, was ein KMU vor der Wahl einer Webagentur oder eines freiberuflichen Entwicklers wissen sollte.",
  keywords: ["choisir agence web PME", "agence web PME", "Digitalagentur wählen", "freelance vs agence web", "agence web petite entreprise"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/webagentur-kmu-waehlen" },
  openGraph: {
    title: "So wählen Sie eine Webagentur für Ihr KMU",
    description: "Die Kriterien, die wirklich zählen, die Warnsignale und die richtigen Fragen.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "So wählen Sie eine Webagentur für Ihr KMU — Leitfaden 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/webagentur-kmu-waehlen",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Ist für ein KMU eine Webagentur oder ein Freelancer besser?", "acceptedAnswer": { "@type": "Answer", "text": "Für ein KMU bietet ein erfahrener Freelancer oder ein unabhängiges Studio oft mehr Reaktionsfähigkeit und weniger Overhead als eine grosse Agentur. Für komplexe Projekte kann eine strukturierte Agentur vorzuziehen sein." } },
    { "@type": "Question", "name": "Welche Fragen sollten Sie vor der Unterschrift bei einer Webagentur stellen?", "acceptedAnswer": { "@type": "Answer", "text": "Fragen Sie: Wer arbeitet wirklich an meinem Projekt? Habe ich Zugriff auf Code und Hosting? Was ist nach dem Launch inbegriffen? Haben Sie Referenzen in meiner Branche?" } },
    { "@type": "Question", "name": "Wie definiert man den Umfang für ein KMU?", "acceptedAnswer": { "@type": "Answer", "text": "Eine saubere, leistungsstarke KMU-Visitenkarten-Website wird nach der Planung kalkuliert. Seien Sie vorsichtig bei Angeboten, die zu vage, zu standardisiert oder ohne klare Erklärung der Lieferumfänge sind." } },
  ],
};

const GOOD_SIGNS = [
  "Portfolio mit echten gelieferten Projekten (keine Mockups)",
  "Process clair : brief ? maquette ? dev ? recette ? livraison",
  "Individuelle Offerte, nach einer einfachen ersten Planung erklärt",
  "Sie erhalten die Zugänge: Hosting, Domain, Quellcode",
  "Schnelle Antwort (innert 24–48h) ab dem ersten Kontakt",
  "Ein einziger Ansprechpartner, der Ihr Handwerk versteht",
];

const RED_FLAGS = [
  "Kein sichtbares Portfolio oder nicht anklickbare Projekte",
  "Offerte unterschrieben, bevor Ihr Bedarf verstanden wurde",
  "„Unsere Offerten gibt es auf Anfrage“ ohne jede Erklärung von Methode oder Umfang",
  "Proprietäres Hosting, das Sie nicht verlassen können",
  "Obligatorischer monatlicher Wartungsvertrag ohne klare Begründung",
  "Ein Verkaufskontakt, der das Projekt danach an ein Offshore-Team weitergibt",
];

export default function DeAgenceWebPmePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">PME</span>
            <span className="text-xs text-gray-600">4. Mai 2026 · 6 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            So wählen Sie eine Webagentur für Ihr KMU
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Die Kriterien, die wirklich zählen, die Warnsignale, bei denen Sie gehen sollten, und die richtigen Fragen vor der Unterschrift.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-sm leading-relaxed text-blue-200">
            <strong>TL;DR :</strong> Prüfen Sie das Portfolio, fragen Sie, wer an Ihrem Projekt arbeitet, und stellen Sie sicher, dass Sie alle Zugänge erhalten. Meiden Sie Verträge ohne Ausstieg und Offerten ohne klaren Umfang.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Webagentur oder Freelancer — was wählen für ein KMU?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Die eigentliche Frage ist nicht „Agentur oder Freelancer“, sondern „wer arbeitet wirklich an meinem Projekt“. Eine grosse Agentur kann einen Junior oder einen Offshore-Subunternehmer auf Ihr Projekt setzen. Ein gutes unabhängiges Studio kann dieselbe Qualität wie eine grosse Struktur bieten, mit mehr Reaktionsfähigkeit und weniger Zwischenstufen.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Für ein KMU-Projekt ist ein erfahrener Freelancer oder ein kleines Studio oft ein gutes Gleichgewicht aus Qualität, Planung und Reaktionsfähigkeit.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Die guten Zeichen</h2>
        <div className="mb-10 space-y-3">
          {GOOD_SIGNS.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-8 text-2xl font-bold text-white">Die Warnsignale — gehen Sie</h2>
        <div className="mb-10 space-y-3">
          {RED_FLAGS.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-red-500/15 bg-red-500/5 p-4">
              <FiX size={16} className="mt-0.5 shrink-0 text-red-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Die Fragen, die Sie unbedingt stellen müssen</h2>
        <div className="mb-10 space-y-4">
          {[
            { q: "Wer arbeitet an meinem Projekt?", a: "Sie müssen die Person(en) kennen, die Ihre Website programmieren und gestalten. Keinen Projektleiter, der delegiert." },
            { q: "Habe ich Zugriff auf meinen Code und mein Hosting?", a: "Alles muss Ihnen gehören. Ist die Antwort vage, gehen Sie." },
            { q: "Was passiert nach dem Launch?", a: "Fehlerbehebungen, Updates, Support: Fragen Sie, was inbegriffen ist, was optional und wie die Reaktionszeit ist." },
            { q: "Haben Sie Referenzen in meiner Branche?", a: "Nicht zwingend, aber ein Plus. Lassen Sie sich gelieferte Projekte zeigen und bitten Sie um Kontakt zu früheren Kunden." },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <p className="font-semibold text-white">? {item.q}</p>
              <p className="mt-2 text-sm text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Arbeiten Sie mit einem transparenten, reaktiven Studio</h2>
          <p className="mb-6 text-gray-400">Klarer Prozess · Volle Zugänge · Antwort in 24h · Individuelle Offerte</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
              Offerte anfordern <FiArrowRight size={15} />
            </Link>
            <Link href="/de/projets" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Voir notre portfolio
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



