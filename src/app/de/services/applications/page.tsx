import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiCode, FiDatabase, FiSmartphone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Web- und Mobile-Anwendungen",
  description: "Individuelle Web- und Mobile-Anwendungen fuer Unternehmen in der Schweiz und international.",
};

export default function ApplicationsPageDe() {
  const useCases = [
    "Kundenportale und Extranets",
    "Dashboards und Reporting",
    "Interne Tools fuer Teams im Feld oder im Backoffice",
    "Buchungs-, Planungs- oder Follow-up-Anwendungen",
    "Leichte CRMs, Backoffices und Member Areas",
    "Administrative oder kommerzielle Automationen",
  ];

  const benefits = [
    "Weniger manuelle Eingaben und doppelte Prozesse",
    "Besser zentralisierte und leichter lesbare Daten",
    "Tools, die zu den realen Ablaeufen passen",
    "Zeitgewinn bei repetitiven Aufgaben",
    "Besserer Informationsfluss im Alltag",
    "Eine Basis, die spaeter modular erweitert werden kann",
  ];

  const features = [
    { icon: FiCode, title: "Massgeschneiderte Entwicklung", description: "Eine Anwendung rund um den echten Bedarf, nicht ein fragiler Stapel generischer Bausteine." },
    { icon: FiDatabase, title: "Saubere Datenarchitektur", description: "Speicherung, Rechte und Logik passend zu Nutzung, Rollen und Wachstum." },
    { icon: FiSmartphone, title: "Web, mobil oder hybrid", description: "Das passende Format nach Nutzern, Rahmenbedingungen und Budget." },
    { icon: FiCheck, title: "Scoping und Begleitung", description: "Wir helfen beim richtigen Umfang, bei Prioritaeten und beim sauberen Projektstart." },
  ];

  const projectTypes = [
    { title: "Business-Anwendung", price: "Ab CHF 4'500", description: "Um manuelle Prozesse zu ersetzen, eine Aktivitaet zu strukturieren oder Operationen zu zentralisieren." },
    { title: "Portal oder Kundenbereich", price: "Ab CHF 7'500", description: "Fuer Dokumente, Status, Anfragen oder Follow-up-Funktionen." },
    { title: "Umfassendere Anwendung", price: "Ab CHF 12'000", description: "Fuer ein staerkeres Produkt mit Accounts, Daten, Workflows und mehreren Integrationen." },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-slate-900 to-blue-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">Web-Apps, Business-Tools und mobile Produkte</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Nuetzliche Anwendungen statt ueberladener Systeme</h1>
          <p className="mb-8 max-w-3xl text-xl text-white/90">
            KAH-Digital entwickelt Web- und Mobile-Anwendungen fuer Unternehmen, die einen Teil ihrer Aktivitaet strukturieren,
            automatisieren oder vereinfachen wollen - mit einer Logik, die klar, sauber und nutzbar bleibt.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/de/devis" className="rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition-colors hover:bg-gray-100">
              Projekt anfragen
            </Link>
            <Link href="/de/contact" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-900">
              Bedarf besprechen
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Typische Einsatzfelder</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Typische Projekte fuer KMU, wachsende Teams und Unternehmen, die Informationen sauberer bewegen wollen.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase} className="rounded-2xl bg-gray-50 p-6">
                <p className="font-medium text-gray-800">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Was sich konkret verbessern soll</h2>
            <p className="text-xl text-gray-600">Nicht nur ein schoener Screen, sondern ein besserer Ablauf im Alltag.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-2xl bg-white p-6 shadow-md">
                <FiCheck className="mb-4 text-green-500" size={32} />
                <p className="font-medium text-gray-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Was im Ansatz enthalten ist</h2>
            <p className="text-xl text-gray-600">Von der ersten Struktur bis zum produktiven Launch.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="mx-auto mb-4 text-blue-700" size={48} />
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Budgetrahmen</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Realistische Startpunkte fuer Web- und Anwendungsprojekte in der Schweiz - je nach Scope, Nutzern und Integrationen.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {projectTypes.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-8 shadow-md">
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mb-4 text-lg font-semibold text-blue-700">{item.price}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Du brauchst ein Tool, das zu deiner Arbeitsweise passt?</h2>
          <p className="mb-8 text-xl text-white/90">
            Wir koennen eine klare, evolutive und wirklich nuetzliche Anwendung fuer dein Team oder deine Kunden strukturieren.
          </p>
          <Link href="/de/devis" className="rounded-full bg-white px-8 py-3 font-semibold text-blue-700 transition-colors hover:bg-gray-100">
            Individuelles Angebot anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
