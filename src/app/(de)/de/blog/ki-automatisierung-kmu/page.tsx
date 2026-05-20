import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "KI-Automatisierung für KMU 2025: Was wirklich funktioniert (und was nicht) — KAH Digital",
  description: "Nicht jede KI-Lösung lohnt sich für KMU. Hier sind die 5 Anwendungsfälle mit nachgewiesenem ROI — und warum die meisten KI-Projekte scheitern.",
  keywords: ["KI Automatisierung KMU", "KI für kleine Unternehmen", "Chatbot KMU", "KI ROI Unternehmen"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/ki-automatisierung-kmu" },
  openGraph: {
    title: "KI-Automatisierung für KMU 2025: Was wirklich funktioniert (und was nicht)",
    description: "Nicht jede KI-Lösung lohnt sich für KMU. Hier sind die 5 Anwendungsfälle mit nachgewiesenem ROI — und warum die meisten KI-Projekte scheitern.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "KI-Automatisierung für KMU 2025: Was wirklich funktioniert (und was nicht)",
  "datePublished": "2026-05-20",
  "dateModified": "2026-05-20",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/de/blog/ki-automatisierung-kmu",
  "inLanguage": "de",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Welche KI-Anwendungen haben den schnellsten ROI für KMU?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Lead-Qualifizierung und Kundensupport-Chatbots liefern typischerweise den schnellsten ROI — innerhalb von 30 Tagen nach Deployment messbar. E-Mail-Automatisierung folgt auf Platz drei. Diese Anwendungen haben klar definierte Erfolgskennzahlen und erfordern keine komplexe Dateninfrastruktur."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet KI-Automatisierung für ein KMU?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein einfacher KI-Chatbot ist ab CHF/€ 349 erhältlich. Ein vollständiges Automatisierungssystem (Lead-Qualifizierung + Support + E-Mail) beginnt ab CHF/€ 890. Die laufenden Kosten (API-Nutzung) betragen typischerweise CHF/€ 30–80 pro Monat für KMU-Volumen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert die Implementierung eines KI-Systems für ein KMU?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein gut eingegrenztes KI-System wird in 7–14 Werktagen deployed. Chatbots sind oft in 5 Tagen live. Komplexe Multi-System-Integrationen dauern 3–5 Wochen. Vorsicht vor Agenturen, die 3–6 Monate für grundlegende Automatisierungen versprechen."
      }
    },
  ],
};

const useCases = [
  {
    num: "01",
    title: "Lead-Qualifizierung",
    roi: "2–5× mehr qualifizierte Leads",
    desc: "Ein KI-Agent qualifiziert eingehende Anfragen automatisch: Budget, Zeitrahmen, Entscheidungsträger, spezifischer Bedarf. Der Vertrieb erhält nur vorqualifizierte Leads mit komplettem Kontext. Typisches Ergebnis: 60–80% weniger Zeit pro Lead-Aufnahme, 2× höhere Abschlussrate bei bearbeitetem Volumen.",
    stack: "Webhook-Trigger → GPT-4o → CRM-Integration",
  },
  {
    num: "02",
    title: "Kundensupport 24/7",
    roi: "40–70% Ticket-Deflection",
    desc: "Ein KI-Chatbot beantwortet häufige Anfragen (Öffnungszeiten, Preise, Lieferstatus, FAQ) rund um die Uhr. Komplexe Anfragen werden automatisch eskaliert mit Kontext übergeben. KMU sparen typischerweise 15–25 Stunden pro Woche an Support-Aufwand — ohne Qualitätseinbußen.",
    stack: "Website-Widget → RAG-System → Eskalations-Logik",
  },
  {
    num: "03",
    title: "E-Mail-Automatisierung",
    roi: "+35% Antwortrate, −80% manuelle Arbeit",
    desc: "KI analysiert eingehende E-Mails, kategorisiert sie, schlägt Antworten vor oder antwortet automatisch bei definierten Typen. Follow-up-Sequenzen werden automatisch ausgelöst. Besonders wirkungsvoll bei Angebots-Follow-ups, die ohne Automatisierung regelmäßig vergessen werden.",
    stack: "Gmail/Outlook-Integration → Klassifizierung → Auto-Antwort",
  },
  {
    num: "04",
    title: "Dokumentenverarbeitung",
    roi: "−90% manuelle Verarbeitungszeit",
    desc: "KI extrahiert strukturierte Daten aus Rechnungen, Bestellformularen, Verträgen und Bewerbungen. Daten werden direkt in ERP/CRM/Buchhaltungssysteme übertragen. Ein KMU, das 50 Rechnungen pro Woche manuell verarbeitet, spart 8–12 Stunden — ohne Fehlerquote.",
    stack: "OCR + GPT-4 Vision → Extraktion → System-Sync",
  },
  {
    num: "05",
    title: "Termin- und Angebotsprozesse",
    roi: "−60% Admin-Aufwand, +25% Buchungsrate",
    desc: "KI-Agent nimmt Terminanfragen entgegen, prüft Verfügbarkeit, sendet Bestätigungen und Erinnerungen. Angebotserstellung wird auf Basis von Kundenanfragen automatisch vorausgefüllt und zur Prüfung vorgelegt. Besonders wirkungsvoll für Dienstleister, Handwerker und Berater.",
    stack: "Kalender-API → NLP-Verarbeitung → Automatisierter Workflow",
  },
];

const failReasons = [
  { title: "Zu breiter Scope, zu wenig Fokus", detail: "KMU versuchen, alles auf einmal zu automatisieren. Ergebnis: endlose Anforderungsworkshops, kein Deployment. Erfolgreich sind Projekte, die mit einem einzigen Use Case starten." },
  { title: "Kein ROI-Ziel definiert", detail: "Ohne messbare Erfolgskennzahl vor dem Start weiß niemand, ob das Projekt funktioniert. Definieren Sie vorher: X Stunden gespart/Woche, Y% mehr Leads, Z% weniger Support-Tickets." },
  { title: "Überschätzte Komplexität", detail: "Die meisten KMU-Automatisierungen benötigen kein Fine-Tuning, kein eigenes Modell, keine GPU-Infrastruktur. GPT-4o + strukturierte Prompts + ein Workflow-Tool lösen 80% der Aufgaben." },
  { title: "Falsche Anbieter", detail: "Viele Agenturen verkaufen KI-Strategie-Beratung statt Deployments. Wenn nach 3 Monaten noch kein System live ist, zahlen Sie für Folien — nicht für Ergebnisse." },
  { title: "Keine Ownership des Systems", detail: "Eigentümerschaft des Codes, der Prompts und der API-Konfigurationen muss vertraglich beim KMU liegen. Proprietäre Plattformen schaffen Abhängigkeit ohne Wertschöpfung." },
];

export default function KiAutomatisierungKMUPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">
            ← Blog
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">KI-Strategie</span>
            <span className="text-xs text-gray-600">20. Mai 2026 · 8 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            KI-Automatisierung für KMU 2025: Was wirklich funktioniert (und was nicht)
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            KI-Versprechen sind billig. ROI ist selten. Dieser Leitfaden zeigt Ihnen die 5 Automatisierungsanwendungen, die für KMU nachweislich funktionieren — mit realistischen Zahlen, Deployment-Zeiten und warum die meisten KI-Projekte trotzdem scheitern.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* Kurzfassung */}
        <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-sm leading-relaxed text-blue-200">
            <strong>Kurzfassung:</strong> Starten Sie mit einem Anwendungsfall, definieren Sie den ROI vorher, deployen Sie in 10 Tagen, messen Sie in 30 Tagen. Lead-Qualifizierung und 24/7-Support liefern den schnellsten Return für die meisten KMU.
          </p>
        </div>

        {/* Section 1 — Warum scheitern */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Warum die meisten KI-Projekte in KMU scheitern</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Laut einer McKinsey-Studie scheitern über 70% aller KI-Initiativen, bevor sie messbare Ergebnisse liefern. Für KMU ist die Quote noch höher — aus strukturellen Gründen, die nichts mit der Technologie zu tun haben.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Das Hauptproblem ist Komplexität-Fetischismus. Agenturen verkaufen komplexe, maßgeschneiderte KI-Systeme, weil Komplexität höhere Margen rechtfertigt. Dabei lösen 80% der KMU-Aufgaben mit fertigen API-Calls, strukturierten Prompts und einer einfachen Workflow-Logik. Kein eigenes Modell, kein Datenzentrum, keine 6-monatige Implementierung.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            Das zweite Problem sind falsche Erwartungen. KI ist kein Schalter, den man umlegt. Es ist ein System, das auf Ihre Prozesse und Daten kalibriert werden muss. Ein Chatbot, der schlecht eingerichtet ist, erzeugt mehr Support-Aufwand als er spart. Ein Lead-Agent ohne saubere Qualifizierungskriterien liefert Rauschen statt Signal.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Die Lösung: beginnen Sie klein, messen Sie sofort, iterieren Sie schnell. Die 5 Anwendungsfälle unten sind alle in unter 15 Tagen deploybar und in unter 30 Tagen messbar.
          </p>
          <div className="mt-6 space-y-4">
            {failReasons.map((r) => (
              <div key={r.title} className="rounded-xl border border-red-500/15 bg-red-500/5 p-4">
                <p className="font-bold text-white text-sm mb-1">{r.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 — 5 Use Cases */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">5 KI-Anwendungsfälle mit nachgewiesenem ROI für KMU</h2>
          <div className="space-y-6">
            {useCases.map((uc) => (
              <div key={uc.num} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
                <div className="flex items-start gap-4 mb-3">
                  <span className="shrink-0 rounded-lg bg-blue-500/10 px-2.5 py-1 text-sm font-black text-blue-400">{uc.num}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">{uc.title}</h3>
                    <span className="text-xs text-emerald-400 font-semibold">{uc.roi}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-3 pl-12">{uc.desc}</p>
                <div className="pl-12">
                  <span className="text-xs text-gray-600 font-mono bg-gray-800 px-3 py-1 rounded-full">{uc.stack}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Realistische Erwartungen */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Was realistische KI-Erwartungen bedeuten</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            KI ist kein Ersatz für Strategie oder Vertrieb. Es ist ein Multiplikator für bestehende Prozesse. Das bedeutet konkret:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Ein KI-Chatbot auf einer Website mit 100 Besuchern/Monat erzeugt wenig ROI. Bei 500+ Besuchern beginnt der Impact.",
              "Automatisierung schlechter Prozesse macht schlechte Prozesse schneller — nicht besser. Optimieren Sie den Prozess zuerst.",
              "ROI-Messung erfordert eine saubere Baseline vor Deployment. Ohne Vorher-Daten ist jede Erfolgsmessung spekulativ.",
              "KI-Systeme verbessern sich mit der Zeit — aber nur wenn jemand die Performance überwacht und Prompts/Logik anpasst.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Deployment", value: "10 Tage", sub: "für eingegrenzten Use Case" },
              { label: "Erster ROI", value: "30 Tage", sub: "nach Go-Live messbar" },
              { label: "Full ROI", value: "3 Monate", sub: "bei korrektem Scope" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/8 bg-gray-900/60 p-5 text-center">
                <p className="text-3xl font-black text-blue-400 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.sub}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Kosten */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Wie viel kostet KI-Automatisierung für ein KMU?</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Die Preisgestaltung für KI-Projekte ist wenig transparent. Hier eine ehrliche Übersicht, was realistische Implementierungen kosten:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { type: "Einfacher KI-Chatbot", price: "ab CHF/€ 349", timeline: "5–7 Tage", note: "FAQ, Produkt-Info, Kontaktweiterleitung" },
              { type: "Lead-Qualifizierungsagent", price: "ab CHF/€ 590", timeline: "7–10 Tage", note: "CRM-Integration, Scoring, Auto-Antwort" },
              { type: "Vollständiges Automatisierungssystem", price: "ab CHF/€ 890", timeline: "10–15 Tage", note: "Support + Lead + E-Mail kombiniert" },
              { type: "Dokumentenverarbeitung + ERP-Sync", price: "ab CHF/€ 1.200", timeline: "15–20 Tage", note: "OCR, Extraktion, Systemintegration" },
            ].map((item) => (
              <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900/60 p-5">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <p className="font-bold text-white text-sm">{item.type}</p>
                  <span className="shrink-0 text-blue-400 font-black text-sm">{item.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">{item.note}</p>
                  <span className="text-xs text-gray-600 shrink-0 ml-4">{item.timeline}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm text-amber-200 leading-relaxed">
              <strong>Laufende Kosten:</strong> API-Nutzung (OpenAI, Anthropic) kostet für typisches KMU-Volumen CHF/€ 30–80/Monat. Bei sehr hohem Volumen (10.000+ Anfragen/Monat) steigen die Kosten proportional — kalkulierbar und transparent.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">Häufig gestellte Fragen</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((f) => (
              <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
                <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Kostenloses KI-Audit anfragen</h2>
          <p className="mb-6 text-gray-400">Wir analysieren Ihre Prozesse und zeigen Ihnen, welche Automatisierung den schnellsten ROI liefert — in 48h, kostenlos und unverbindlich.</p>
          <Link
            href="/de/devis"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30"
          >
            Kostenloses KI-Audit anfragen <FiArrowRight size={15} />
          </Link>
        </div>
      </article>
    </div>
  );
}
