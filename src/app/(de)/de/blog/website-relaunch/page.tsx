import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiAlertCircle, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Website-Relaunch: Wann und wie? — KAH Digital Studio",
  description: "Die 7 Anzeichen, dass es Zeit für einen Relaunch Ihrer Website ist, und die Methode, ihn ohne Budgetverschwendung zu meistern.",
  keywords: ["refonte site web", "Website erneuern", "Website aktualisieren", "refaire son site web", "moderniser site web"],
  alternates: { canonical: "https://kah-digital.ch/de/blog/website-relaunch" },
  openGraph: {
    title: "Website-Relaunch: Wann und wie?",
    description: "7 Anzeichen, dass Ihre Website einen Relaunch braucht, und die Methode, ihn richtig zu machen.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Website-Relaunch: Wann sollten Sie starten und wie gehen Sie vor?",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
};

const SIGNALS = [
  { num: "01", title: "Ihre Website ist nicht für Mobilgeräte optimiert", detail: "Über 60 % des Web-Traffics kommen von Smartphones. Ist Ihre Website nicht responsiv, verlieren Sie schon in der ersten Sekunde mehr als die Hälfte Ihrer potenziellen Besucher." },
  { num: "02", title: "Il charge lentement", detail: "Nach mehr als 3 Sekunden springen 53 % der mobilen Besucher ab. Eine langsame Website kostet Sie täglich Kunden." },
  { num: "03", title: "Das Design ist älter als 4 Jahre", detail: "Das Web entwickelt sich schnell. Eine 4 Jahre alte Website wirkt überholt — noch bevor der Besucher eine Zeile gelesen hat." },
  { num: "04", title: "Sie können sie nicht selbst aktualisieren", detail: "Wenn jede Text- oder Bildänderung den Kontakt zu Ihrem Entwickler erfordert, bremst das Ihre Kommunikation erheblich." },
  { num: "05", title: "Sie erzeugt keine Kontakte", detail: "Eine Visitenkarten-Website sollte 1 bis 3 % ihrer Besucher in Kontakte verwandeln. Darunter liegt ein Struktur- oder Call-to-Action-Problem vor." },
  { num: "06", title: "Sie rankt nicht bei Google", detail: "Erscheinen Ihre Mitbewerber bei lokalen Suchen vor Ihnen, hat Ihre Website ein technisches SEO- oder Inhaltsproblem." },
  { num: "07", title: "Ihr Angebot hat sich geändert, Ihre Website nicht", detail: "Eine Website, die nicht mehr widerspiegelt, was Sie tatsächlich tun, ist kontraproduktiv — sie zieht die falschen Leute an und schreckt die richtigen ab." },
];

export default function DeRefonteWebPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-refonte" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/de/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Strategie</span>
            <span className="text-xs text-gray-600">24. April 2026 · 5 Min. Lesezeit</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Website-Relaunch: Wann sollten Sie starten und wie gehen Sie vor?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Ein Website-Relaunch ist eine wichtige Entscheidung. Zu früh verschwendet er Budget. Zu spät kostet er Kunden. So erkennen Sie, wann Sie handeln sollten — und wie.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        <h2 className="mb-8 text-2xl font-bold text-white">Die 7 Anzeichen, dass es Zeit ist</h2>
        <div className="mb-12 space-y-5">
          {SIGNALS.map((s) => (
            <div key={s.num} className="flex gap-4 rounded-2xl border border-white/8 bg-gray-900/50 p-5">
              <span className="shrink-0 font-mono text-2xl font-black text-white/10">{s.num}</span>
              <div>
                <h3 className="mb-1 font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Kompletter Relaunch oder gezielte Verbesserungen?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Bevor Sie alles wegwerfen, fragen Sie sich: Ist es ein Oberflächenproblem (veraltetes Design) oder ein tieferes Problem (Architektur, ungeeignetes CMS, überholter Stack)?
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="mb-2 flex items-center gap-2"><FiAlertCircle size={15} className="text-amber-400" /><span className="font-semibold text-white text-sm">Gezielte Verbesserungen</span></div>
            <p className="text-xs text-gray-400 leading-relaxed">Der Inhalt ist gut, die Struktur trägt — Sie müssen nur das Design modernisieren, die Geschwindigkeit verbessern oder das SEO korrigieren.</p>
            <p className="mt-2 text-xs font-semibold text-amber-400">Budget: nach einem Audit zu definieren</p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="mb-2 flex items-center gap-2"><FiCheck size={15} className="text-blue-400" /><span className="font-semibold text-white text-sm">Kompletter Relaunch</span></div>
            <p className="text-xs text-gray-400 leading-relaxed">Das CMS ist alt, der Stack überholt oder Ihr Angebot hat sich grundlegend verändert. Auf sauberer Basis neu beginnen.</p>
            <p className="mt-2 text-xs font-semibold text-blue-400">Budget: nach einem Audit zu definieren</p>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Die Methode in 5 Schritten</h2>
        <ol className="mb-12 space-y-6">
          {[
            { step: "Auditez l'existant", detail: "Messen Sie, bevor Sie etwas bauen: Geschwindigkeit (PageSpeed), SEO-Positionen (Google Search Console), Konversionsrate (Analytics), meistbesuchte Seiten. Diese Daten leiten Ihre Entscheidungen." },
            { step: "Umfang genau definieren", detail: "Welche Seiten bleiben, welche entfallen? Welche neuen Funktionen? Ein unklarer Umfang ist die häufigste Ursache für Budgetüberschreitungen." },
            { step: "Den richtigen Stack wählen", detail: "WordPress, wenn Sie Inhalte selbst verwalten möchten. Next.js, wenn Performance und SEO Priorität haben. Meiden Sie visuelle Baukästen wie Wix, wenn Sie echte Performance wollen." },
            { step: "SEO-Migration steuern", detail: "Jede geänderte URL braucht eine 301-Weiterleitung. Ein schlampiger Weiterleitungsplan kann innert Wochen 30 bis 50 % des organischen Traffics kosten." },
            { step: "Starten — dann verbessern", detail: "Eine perfekte Website, die in 6 Monaten erscheint, ist weniger wert als eine solide, die in 3 Wochen online geht. Starten Sie mit der minimal brauchbaren Version und verbessern Sie dann anhand echter Daten." },
          ].map((item, i) => (
            <li key={item.step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">{i + 1}</span>
              <div>
                <h3 className="mb-1 font-bold text-white">{item.step}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mb-6 text-2xl font-bold text-white">Wie lange dauert ein Relaunch?</h2>
        <div className="mb-12 grid gap-3 sm:grid-cols-3">
          {[
            { type: "Site vitrine", delay: "5 Werktage" },
            { type: "Site corporate", delay: "3 – 6 Wochen" },
            { type: "Application web", delay: "6 – 12 Wochen" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900 p-4 text-center">
              <div className="text-sm text-gray-500">{item.type}</div>
              <div className="mt-1 font-bold text-white">{item.delay}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Braucht Ihre Website einen Relaunch?</h2>
          <p className="mb-6 text-gray-400">Wir analysieren Ihre Website kostenlos und sagen Ihnen, was sich ändern muss.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
              Audit gratuit <FiArrowRight size={15} />
            </Link>
            <Link href="/de/refonte-site-web" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Notre offre refonte
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


