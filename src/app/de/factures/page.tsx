import type { Metadata } from "next";
import { InvoicePreview } from "@/components/invoice-preview";

export const metadata: Metadata = {
  title: "Rechnungen",
  description: "Rechnungsstruktur und Abrechnungslogik von KAH-Digital.",
};

export default function InvoicesPageDe() {
  return (
    <>
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Professionelle Rechnungsstellung</h1>
          <p className="text-xl">Klare, serioese Dokumente, die einfach zu pruefen bleiben.</p>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Vorschau</p>
            <h2 className="mb-4 mt-3 text-3xl font-bold text-slate-900">Beispiel einer KAH-Digital Rechnung</h2>
            <p className="text-lg text-slate-600">Ein klareres Dokument, gut lesbar auf Desktop und Mobil.</p>
          </div>
          <InvoicePreview locale="de" />
        </div>
      </section>
    </>
  );
}
