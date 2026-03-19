import { Metadata } from "next";
import { QuoteForm } from "@/components/quote-form";
import { QuotePreview } from "@/components/quote-preview";

export const metadata: Metadata = {
  title: "Demande de devis",
  description: "Demandez un devis gratuit pour votre projet digital. Reponse detaillee sous 24h.",
};

export default function DevisPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Demande de devis gratuit</h1>
          <p className="text-xl">Remplissez ce formulaire et recevez un retour clair avec budget, delai et recommandations.</p>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_40%),linear-gradient(180deg,#08111f_0%,#04070d_100%)] py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Devis express</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Decris ton projet clairement, on te repond vite.</h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Budget, delai, recommandations et cadrage initial dans un format simple a relire.
            </p>
          </div>
          <QuoteForm />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Devise</p>
              <p className="mt-3 text-lg font-semibold text-white">Tous les montants sont emis en CHF.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Paiement</p>
              <p className="mt-3 text-lg font-semibold text-white">Reglement par virement bancaire.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Coordonnees</p>
              <p className="mt-3 text-lg font-semibold text-white">Transmises sur devis valide ou facture finale.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Apercu</p>
            <h2 className="mb-4 mt-3 text-3xl font-bold text-slate-900">Exemple de devis KAH-Digital</h2>
            <p className="text-lg text-slate-600">
              Un format plus clair, plus professionnel et plus facile a lire sur desktop comme sur mobile.
            </p>
          </div>
          <QuotePreview />
        </div>
      </section>
    </>
  );
}
