import type { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiClock, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";

export const metadata: Metadata = {
  title: "GLPI-verbundener Support-Workflow",
  description: "Ein klarerer Support-Workflow rund um GLPI: virtuelle Hilfe, gefuehrte Anfragen und Ticket-Erstellung bei Bedarf.",
};

export default function GLPIPageDe() {
  const positioning = [
    "Eine Support- und Hilfsschicht vor GLPI",
    "Ein einfacherer Einstieg fuer Nutzer mit Support-Bedarf",
    "Eine diskrete virtuelle Hilfe fuer einfache Probleme und Orientierung",
    "Ticket-Erstellung, wenn menschlicher Support uebernehmen muss",
    "Angepasst an eure bestehende Support-Organisation",
  ];

  const benefits = [
    { icon: FiClock, title: "Weniger Reibung", description: "Nutzer erhalten eine erste Hilfe, bevor sofort ein Ticket entsteht." },
    { icon: FiUsers, title: "Besser gerahmte Anfragen", description: "Der Support erhaelt mehr Kontext und eine sauberere Uebergabe." },
    { icon: FiShield, title: "Diskrete Positionierung", description: "Die Loesung laesst sich als virtuelle Hilfe und klarerer Support-Weg einfuehren." },
    { icon: FiTrendingUp, title: "Saubere Eskalation", description: "Wenn die Ersthilfe nicht reicht, geht die Anfrage sauber in euer Ticket-Setup ueber." },
  ];

  return (
    <>
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">Support-Journey, virtuelle Hilfe und GLPI-Tickets</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Eine einfachere Support-Schicht rund um GLPI</h1>
          <p className="max-w-3xl text-xl text-white/90">
            KAH-Digital ersetzt weder euer GLPI-Team noch verkauft es eine komplette GLPI-Betreuung. Wir entwickeln einen
            klareren Support-Ablauf rund um euer bestehendes Setup - mit virtueller Ersthilfe und Ticket-Erstellung, wenn
            echter Support uebernehmen muss.
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/70">
            Proprietaere KAH-Digital Loesung, abgestimmt auf eure Support-Organisation
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/de/devis" className="rounded-full bg-white px-8 py-3 font-semibold text-emerald-700 transition-colors hover:bg-gray-100">
              Projekt anfragen
            </Link>
            <Link href="/de/contact" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-emerald-700">
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Wie diese Leistung zu verstehen ist</h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Eine nuetzliche Erweiterung fuer euren Support - ohne euer Tool oder eure Organisation zu ersetzen.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {positioning.map((feature) => (
              <div key={feature} className="flex items-start rounded-2xl bg-gray-50 p-6">
                <FiCheck className="mr-3 mt-1 shrink-0 text-emerald-500" size={20} />
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Was das im Alltag bringt</h2>
            <p className="text-xl text-gray-600">Ein klarerer Ablauf fuer Nutzer und eine saubere Uebergabe fuer den Support.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl bg-white p-6 text-center shadow-md">
                <benefit.icon className="mx-auto mb-4 text-emerald-600" size={48} />
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
