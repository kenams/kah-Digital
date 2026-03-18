import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiCompass, FiMonitor, FiTrendingUp } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Unternehmenswebsites",
  description: "Klare Business-Websites, Corporate Sites und Praesentationsplattformen fuer Unternehmen in der Schweiz und international.",
};

export default function SiteWebPageDe() {
  const painPoints = [
    "Keine Website, veraltete Website oder schwacher erster Eindruck",
    "Markenbild passt nicht zum echten Niveau des Unternehmens",
    "Kaum qualifizierte Anfragen ueber die Website",
    "Inhalte sind intern schwer pflegbar",
  ];

  const outcomes = [
    "Klarere Positionierung und Angebotsdarstellung",
    "Saubere, schnelle und leichter wartbare Website",
    "Direkterer Kontakt- und Angebotsweg",
    "Solide Basis fuer bessere Online-Sichtbarkeit",
  ];

  const offers = [
    { name: "Essential", price: "Ab CHF 2'900", features: ["4 bis 6 Seiten", "Responsives Design", "Kontaktformular", "Saubere SEO-Basis", "Launch und Uebergabe"] },
    { name: "Business", price: "Ab CHF 5'500", features: ["Corporate Website", "Strukturierte Leistungsseiten", "CMS oder Bearbeitungsbereich", "Analytics", "Launch-Begleitung"] },
    { name: "Custom", price: "Ab CHF 9'500", features: ["Staerkere Premium-Richtung", "Schaerferer Conversion-Flow", "Anbindung an eure Tools", "Individuelle Funktionen", "Priorisierter Launch"] },
  ];

  const process = [
    { step: "01", title: "Scoping", description: "Ziele, Struktur, sinnvolle Seiten und Prioritaeten." },
    { step: "02", title: "Direction", description: "Visuelle Richtung, Rhythmus, Inhalte und Erlebnis." },
    { step: "03", title: "Build", description: "Integration, Entwicklung, Optimierung und nuetzliche Schnittstellen." },
    { step: "04", title: "Launch", description: "Freigabe, Domain, SEO-Basis und letzte Anpassungen." },
    { step: "05", title: "Follow-up", description: "Korrekturen, Weiterentwicklungen und Support." },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">Corporate Websites und Praesentationsplattformen</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Klare, glaubwuerdige und nuetzliche Websites fuer Unternehmen</h1>
          <p className="mb-8 max-w-3xl text-xl text-white/90">
            Aus Lausanne entwickelt KAH-Digital Websites fuer Unternehmen in der Schweiz und international. Ziel ist nicht nur online zu sein, sondern das Unternehmen klarer zu praesentieren und den Kontakt zu vereinfachen.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/de/devis" className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100">
              Projekt anfragen
            </Link>
            <Link href="/de/projets/kah-prod" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-600">
              Referenz ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Wann eine neue Website wirklich nuetzlich wird</h2>
              <ul className="space-y-4">
                {painPoints.map((item) => (
                  <li key={item} className="flex items-start">
                    <FiTrendingUp className="mr-3 mt-1 text-red-500" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Was das Projekt liefern soll</h2>
              <ul className="space-y-4">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start">
                    <FiCheck className="mr-3 mt-1 text-green-500" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Projektformate</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">Klare Startpunkte fuer typische Schweizer Budgets, je nach Inhalt, Design-Tiefe und Funktionsumfang anpassbar.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {offers.map((offer) => (
              <div key={offer.name} className="rounded-2xl border border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">{offer.name}</h3>
                <p className="mb-6 text-lg font-semibold text-blue-600">{offer.price}</p>
                <ul className="mb-8 space-y-3">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <FiCheck className="mr-3 text-green-500" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/de/devis" className="block rounded-full bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700">
                  Dieses Format anfragen
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiMonitor className="mb-4 text-blue-600" size={36} />
              <h2 className="mb-3 text-xl font-semibold text-gray-900">Praesentation und Vertrauen</h2>
              <p className="text-gray-600">Klarere Struktur, bessere Inhalte und ein solideres Bild fuer Kunden, Partner oder Recruiting.</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiCompass className="mb-4 text-blue-600" size={36} />
              <h2 className="mb-3 text-xl font-semibold text-gray-900">Direkterer Weg</h2>
              <p className="text-gray-600">Nutzer verstehen schneller, was ihr macht, fuer wen es ist und wie sie euch erreichen.</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-8">
              <FiCheck className="mb-4 text-blue-600" size={36} />
              <h2 className="mb-3 text-xl font-semibold text-gray-900">Dauerhafte Basis</h2>
              <p className="text-gray-600">Die Website bleibt erweiterbar und kann spaeter Tools, Kampagnen oder Automationen aufnehmen.</p>
            </div>
          </div>
          <div className="mb-12 mt-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Arbeitsweise</h2>
            <p className="text-xl text-gray-600">Kurzer, klarer Rahmen ohne unnoetige Ueberproduktion.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{item.step}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
