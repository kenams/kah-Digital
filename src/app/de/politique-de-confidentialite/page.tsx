import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Wie KAH-Digital personenbezogene Daten erhebt, nutzt und schuetzt.",
};

export default function PrivacyPolicyPageDe() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/de"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Zur Startseite
        </Link>
        <Link
          href="/de/mentions-legales"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Impressum
        </Link>
      </div>

      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Datenschutz</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Datenschutzerklaerung</h1>
        <p className="mt-4 text-slate-700">
          Diese Seite erklaert, wie KAH-Digital Daten verarbeitet, die ueber Formulare, Kontaktaufnahmen oder Projektanfragen
          uebermittelt werden.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="light-outline p-6 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">Zweck der Verarbeitung</h2>
          <p className="mt-4">
            Personenbezogene Daten werden genutzt, um Projektanfragen zu bearbeiten, Rueckfragen zu beantworten und ein
            Angebot oder einen geeigneten Projektvorschlag vorzubereiten.
          </p>
        </article>
        <article className="light-outline p-6 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">Speicherdauer</h2>
          <p className="mt-4">
            Nicht weiterverfolgte Anfragen werden nur so lange gespeichert, wie es fuer die Bearbeitung sinnvoll ist. Laufende
            Projekte und buchhalterisch relevante Daten werden laenger aufbewahrt.
          </p>
        </article>
        <article className="light-outline p-6 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">Hosting und Sicherheit</h2>
          <p className="mt-4">
            Die Website wird ueber Vercel betrieben. Kommunikations- und Formulardaten koennen ueber sichere Drittanbieter wie
            Resend, Google Workspace oder interne Projekttools verarbeitet werden.
          </p>
        </article>
        <article className="light-outline p-6 text-slate-700">
          <h2 className="text-xl font-semibold text-slate-900">Deine Rechte</h2>
          <p className="mt-4">
            Du kannst jederzeit Auskunft, Berichtigung oder Loeschung deiner Daten verlangen. Anfragen bitte an
            kahdigital42@gmail.com.
          </p>
        </article>
      </div>
    </div>
  );
}
