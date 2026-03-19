import { Metadata } from "next";
import { InvoicePreview } from "@/components/invoice-preview";

export const metadata: Metadata = {
  title: "Factures",
  description: "Decouvrez nos factures professionnelles et notre processus de facturation transparent.",
};

export default function FacturesPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Facturation professionnelle</h1>
          <p className="text-xl">Des documents clairs, serieux et faciles a relire.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre processus de facturation</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparence et professionnalisme dans tous nos echanges financiers.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">1</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Devis et echeancier</h3>
              <p className="text-gray-600">
                Envoi d'un devis complet en CHF avec planning, conditions et modalites de paiement avant le lancement.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Virement bancaire en CHF</h3>
              <p className="text-gray-600">
                Le reglement se fait par virement bancaire, en une fois ou selon l'echeancier precise sur le devis.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Coordonnees et reference</h3>
              <p className="text-gray-600">
                Les coordonnees bancaires et la reference de paiement sont communiquees sur le devis valide ou la facture finale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Apercu</p>
            <h2 className="mb-4 mt-3 text-3xl font-bold text-slate-900">Exemple de facture KAH-Digital</h2>
            <p className="text-lg text-slate-600">
              Un document plus clair, plus lisible et adapte au mobile comme au desktop.
            </p>
          </div>
          <InvoicePreview />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Caracteristiques de nos factures</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl text-green-600">1</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Format professionnel</h3>
              <p className="text-sm text-gray-600">Design soigne et informations completes.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl text-green-600">2</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Structure claire</h3>
              <p className="text-sm text-gray-600">Lecture rapide des postes, totaux et conditions.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl text-green-600">3</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">TVA geree</h3>
              <p className="text-sm text-gray-600">Logique TVA activable selon vos besoins.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl text-green-600">4</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Envoi numerique</h3>
              <p className="text-sm text-gray-600">Factures envoyees par email et archivees.</p>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-green-100 bg-white p-6 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-green-700">Paiement</p>
            <p className="mt-3 text-lg text-gray-700">
              KAH-Digital ne propose pas encore de paiement en ligne public sur le site. Le client regle donc par
              virement bancaire, avec les coordonnees transmises au moment de la validation du devis ou sur la facture.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-green-600 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Questions sur la facturation ?</h2>
          <p className="mb-8 text-xl">Notre processus est transparent et adapte a des missions simples comme plus avancees.</p>
          <a
            href="/contact"
            className="rounded-full bg-white px-8 py-3 font-semibold text-green-600 transition-colors hover:bg-gray-100"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </>
  );
}
