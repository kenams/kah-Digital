import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Lokales SEO für KMU: 2026 auf der ersten Google-Seite erscheinen — KAH Digital Studio",
  description:
    "Kompletter Leitfaden zu lokalem SEO für KMU: Google Business Profile, Kundenbewertungen, lokale Seiten, Schema-Markup. Die konkreten Massnahmen, damit Ihre lokalen Kunden Sie finden.",
  keywords: [
    "seo local pme",
    "lokale Suchmaschinenoptimierung Unternehmen",
    "google my business optimisation",
    "seo local 2026",
    "wie erscheine ich bei Google lokal",
    "lokales SEO für Handwerker",
  ],
  alternates: { canonical: "https://kah-digital.ch/de/blog/lokales-seo-kmu" },
  openGraph: {
    title: "Lokales SEO für KMU: 2026 auf der ersten Google-Seite erscheinen",
    description:
      "Die konkreten Massnahmen, damit Ihre lokalen Kunden Sie bei Google finden — ohne teure SEO-Agentur.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lokales SEO für KMU: 2026 auf der ersten Google-Seite erscheinen",
  datePublished: "2026-05-04",
  dateModified: "2026-05-04",
  author: { "@type": "Organization", name: "KAH Digital Studio" },
  publisher: { "@type": "Organization", name: "KAH Digital Studio", url: "https://kah-digital.ch" },
  mainEntityOfPage: "https://kah-digital.ch/de/blog/lokales-seo-kmu",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist lokales SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lokales SEO umfasst alle Techniken, mit denen ein Unternehmen in Google-Ergebnissen für ortsbezogene Suchen erscheint — zum Beispiel ‚Sanitär Bern‘ oder ‚Restaurant Zürich Altstadt‘.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert es, lokal bei Google zu erscheinen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mit einem gut ausgefüllten Google Business Profile und einer optimierten Seite erscheinen erste Ergebnisse nach 4 bis 8 Wochen. Eine stabile Position im Local Pack dauert je nach Konkurrenz 3 bis 6 Monate.",
      },
    },
    {
      "@type": "Question",
      name: "Genügt Google Business Profile für lokales SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Google Business Profile ist unverzichtbar, aber allein nicht ausreichend. Kombinieren Sie es mit einer optimierten Website (Title-/H1-Tags mit Ort + Beruf, LocalBusiness-Schema, Seiten pro Ort) und regelmässigen Kundenbewertungen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie wird lokales SEO für ein KMU kalkuliert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eine solide lokale SEO-Basis (optimierte Seite, Schema, Google Business Profile) wird nach der Planung kalkuliert, je nach lokaler Konkurrenz, angesprochenen Städten und gewünschter Betreuung. KAH Digital Studio integriert lokales SEO direkt in die Erstellung der Website.",
      },
    },
  ],
};

const ACTIONS = [
  {
    step: "01",
    title: "Google Business Profile — die zwingende Basis",
    content: `Das ist Ihr Schaufenster auf Google Maps und im Local Pack (die 3 Ergebnisse mit Karte ganz oben). Haben Sie noch keinen Eintrag, ist das die erste Massnahme.

**Was zu tun ist:**
- Eintrag auf business.google.com erstellen oder beanspruchen
- 100 % der Angaben ausfüllen: Öffnungszeiten, Telefon, Website, Haupt- und Nebenkategorien
- 10+ aktuelle Fotos hinzufügen (Fassade, Innenraum, Team, Ihre Arbeiten)
- Auf ALLE Bewertungen antworten (positive wie negative) — Google misst das
- Alle 2 Wochen einen Google-Beitrag veröffentlichen (Neuigkeit, Angebot, Anlass)

**Warum das entscheidend ist:** 46 % der Google-Suchen haben lokale Absicht. Nicht auf Google Maps zu sein heisst, für die Hälfte Ihrer potenziellen Kunden unsichtbar zu sein.`,
  },
  {
    step: "02",
    title: "Ihre Website — die optimierte lokale Seite",
    content: `Google Business Profile allein genügt nicht. Es braucht eine Website, die Ihre lokale Glaubwürdigkeit stärkt. Die Signale, die Google liest:

**Title-Tag:** \`[Beruf] [Ort] — [Firmenname]\`
Beispiel: „Sanitär Bern — Muster Sanitär AG“

**H1:** gleiche Logik wie der Title, mit dem Hauptbegriff

**Seiteninhalt:**
- Erwähnen Sie Ihre Stadt und Ihr Quartier natürlich im Text
- Geben Sie Ihre vollständige Adresse an (schema.org LocalBusiness)
- Binden Sie Google Maps auf Ihrer Kontaktseite ein
- Nennen Sie bekannte Orte in der Nähe („2 Minuten vom Bahnhof Bern“)

**URL:** \`/sanitaer-bern\` oder \`/sanitaer-bern-bumpliz\`, wenn Sie einen Stadtteil ansprechen.`,
  },
  {
    step: "03",
    title: "Schema.org LocalBusiness — der Code, den Google liest",
    content: `Das LocalBusiness-Schema ist ein JSON-LD-Markup, das Sie im \`<head>\` Ihrer Seiten hinzufügen. Google liest es direkt und nutzt es für das Knowledge Panel und das Local Pack.

**Minimalbeispiel:**
\`\`\`json
{
  "@type": "LocalBusiness",
  "name": "Muster Sanitär AG",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Musterstrasse 12",
    "addressLocality": "Bern",
    "postalCode": "3011",
    "addressCountry": "CH"
  },
  "telephone": "+41310000000",
  "openingHours": "Mo-Fr 08:00-18:00",
  "url": "https://muster-sanitaer.ch"
}
\`\`\`

Ergänzen Sie auch \`"geo"\` mit Breiten- und Längengrad, um das geografische Signal zu stärken.`,
  },
  {
    step: "04",
    title: "Kundenbewertungen — der Motor des Local Pack",
    content: `Google reiht Unternehmen im Local Pack nach 3 Kriterien: Relevanz, Entfernung und Bekanntheit. Bewertungen sind das wichtigste Bekanntheitssignal.

**Eine einfache Strategie:**
- Senden Sie nach jedem erfolgreichen Auftrag eine SMS/E-Mail mit dem direkten Link zu Ihrem Google-Eintrag
- Ziel: 1 neue Bewertung pro Woche
- Antworten Sie auf alle Bewertungen innert 24h (auch auf negative, ruhig)
- Kaufen Sie nie falsche Bewertungen — Google erkennt sie und kann Ihren Eintrag entfernen

**Typische Wirkung:** Der Anstieg von 10 auf 30 Fünf-Sterne-Bewertungen verbessert die Sichtbarkeit im Local Pack je nach Branche in der Regel spürbar.`,
  },
  {
    step: "05",
    title: "Lokale Einträge — NAP-Konsistenz überall",
    content: `NAP = Name, Adresse, Telefon. Google prüft, ob diese Angaben überall im Web identisch sind. Eine Abweichung schadet Ihrem lokalen Ranking.

**Wo prüfen:**
- local.ch / search.ch
- Yelp / TripAdvisor
- Kompass, Foursquare
- Branchenverzeichnisse (Doctolib, TheFork, Houzz ...)
- Ihre Profile auf LinkedIn, Facebook, Instagram

**Massnahme:** Prüfen Sie Ihre Einträge mit BrightLocal (kostenpflichtig) oder indem Sie bei Google nach Ihrer Telefonnummer suchen.`,
  },
  {
    step: "06",
    title: "Lokale Inhalte — Artikel und Leistungsseiten pro Ort",
    content: `Wenn Sie mehrere Städte oder Quartiere abdecken, erstellen Sie pro Gebiet eine eigene Seite. Kein Copy-Paste — jede Seite braucht einzigartigen Inhalt.

**Eine erfolgreiche Struktur pro Seite:**
- H1: [Leistung] [Ort]
- Einleitung mit Erwähnung des geografischen Gebiets
- Liste Ihrer Einsätze in diesem Gebiet
- Eine Referenz eines lokalen Kunden (Name, Ort)
- Lokale FAQ („Wie schnell sind Sie in [Ort] vor Ort?“)
- LocalBusiness-Schema mit der lokalen Adresse

**Lokaler Blog:** „Unsere letzten 3 Einsätze in Bern-Länggasse“ oder „Warum unsere Kunden in Zürich uns weiterempfehlen“ — frischer Inhalt, frisches Signal für Google.`,
  },
];

export default function DeSeoLocalPmePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6 pt-16 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link href="/de/blog" className="text-xs text-gray-500 transition hover:text-gray-400">
              ? Blog
            </Link>
            <span className="text-xs text-gray-600">·</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">SEO Local</span>
            <span className="text-xs text-gray-600">4 mai 2026</span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Lokales SEO für KMU: 2026 auf der ersten Google-Seite erscheinen
          </h1>
          <p className="mb-6 text-lg text-gray-400 leading-relaxed">
            46 % der Google-Suchen haben lokale Absicht. Erscheint Ihr Unternehmen nicht im Local Pack (die 3 Ergebnisse mit Karte), verlieren Sie die Hälfte Ihrer potenziellen Kunden. Hier die 6 konkreten Massnahmen dagegen.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>KAH Digital Studio</span>
            <span>·</span>
            <span>8 Min. Lesezeit</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-16 space-y-14">
        {/* Intro */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <p className="text-sm font-semibold text-blue-400 mb-2">Was Sie in diesem Artikel lernen</p>
          <ul className="space-y-1.5">
            {[
              "So optimieren Sie Ihr Google Business Profile für das Local Pack",
              "Die unverzichtbaren SEO-Tags auf Ihrer Website",
              "Das LocalBusiness-Schema — das Markup, das Google zuerst liest",
              "Die Bewertungsstrategie, die Ihre Sichtbarkeit steigen lässt",
              "Lokale Einträge: die NAP-Konsistenz, die den Unterschied macht",
              "Lokale Seiten und Inhalte, um mehrere Gebiete zu dominieren",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <FiCheck size={14} className="mt-0.5 shrink-0 text-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        {ACTIONS.map((action) => (
          <section key={action.step} className="scroll-mt-20">
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-black text-white">
                {action.step}
              </span>
              <h2 className="text-xl font-bold text-white">{action.title}</h2>
            </div>
            <div className="prose prose-invert prose-sm max-w-none pl-14 text-gray-300 leading-relaxed [&_strong]:text-white [&_code]:rounded [&_code]:bg-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-blue-300 [&_pre]:rounded-xl [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-xs [&_pre]:leading-loose">
              {action.content.split("\n").map((line, i) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <p key={i} className="font-semibold text-white mt-4 mb-1">{line.slice(2, -2)}</p>;
                }
                if (line.startsWith("- ")) {
                  return <li key={i} className="ml-4 list-disc text-gray-400">{line.slice(2)}</li>;
                }
                if (line.startsWith("```")) {
                  return null;
                }
                if (line.trim() === "") return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">Häufige Fragen</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq) => (
              <details key={faq.name} className="group rounded-xl border border-white/8 bg-gray-900/50 p-5">
                <summary className="cursor-pointer list-none font-semibold text-white group-open:text-blue-400">
                  {faq.name}
                </summary>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA inline */}
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-violet-600/10 p-8 text-center">
          <h3 className="mb-3 text-xl font-bold text-white">
            Ist Ihre Website gut für lokales SEO optimiert?
          </h3>
          <p className="mb-6 text-sm text-gray-400">
            Wir analysieren Ihre Website kostenlos: lokaler SEO-Score, erkannte Probleme, vorrangige Massnahmen.
            Ergebnisse per E-Mail innert 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/audit-gratuit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Obtenir mon audit gratuit <FiArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20lu%20l'article%20SEO%20local%20et%20j'aimerais%20analyser%20mon%20site."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FiMessageCircle size={15} /> Auf WhatsApp besprechen
            </a>
          </div>
        </div>

        {/* Conclusion */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Das Wichtigste in Kürze</h2>
          <p className="mb-4 text-gray-400 leading-relaxed">
            Lokales SEO ist keine Hexerei, verlangt aber Konsequenz. Unternehmen, die das Local Pack in ihrer Branche dominieren, tun alle dasselbe: ein vollständiger Google-Eintrag, regelmässige Bewertungen, eine technisch saubere Website und einzigartige lokale Inhalte.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Die gute Nachricht: Die Mehrheit Ihrer Mitbewerber tut nichts davon. Beginnen Sie mit Google Business Profile und einer optimierten Webseite — das sind 80 % des Ergebnisses bei 20 % des Aufwands.
          </p>
        </section>

        {/* Related articles */}
        <section className="border-t border-white/6 pt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">Verwandte Artikel</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: "/blog/creation-site-web-pme", label: "Eine Website für ein KMU erstellen 2026" },
              { href: "/blog/prix-site-web-professionnel", label: "Wie schätzt man die Kosten einer Website?" },
              { href: "/blog/refonte-site-web", label: "Website-Relaunch: Wann und wie?" },
              { href: "/blog/site-web-artisan", label: "Website für Handwerker: der Leitfaden 2026" },
            ].map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="flex items-center gap-2 rounded-xl border border-white/8 bg-gray-900/50 px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:text-white"
              >
                <FiArrowRight size={13} className="shrink-0 text-gray-500" />
                {article.label}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}


