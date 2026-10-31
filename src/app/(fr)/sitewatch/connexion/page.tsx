import type { Metadata } from "next";
import { PilotLoginForm } from "@/components/pilot-login-form";

export const metadata: Metadata = { title: "Connexion SiteWatch", robots: { index: false, follow: false } };

export default async function SiteWatchLoginPage({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f0d99b]">SiteWatch · pilote</p>
          <h1 className="mt-2 text-3xl font-bold">Connexion partenaire</h1>
          <p className="mt-3 text-white/65">
            Accès réservé aux partenaires fondateurs. Entrez votre adresse : vous recevrez un lien de connexion, sans mot de passe.
          </p>
          {erreur === "lien" && (
            <p role="alert" className="mt-4 rounded-xl border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">
              Ce lien est invalide ou expiré. Demandez-en un nouveau.
            </p>
          )}
          <div className="mt-8">
            <PilotLoginForm endpoint="/api/sitewatch/login" label="SiteWatch" />
          </div>
        </div>
      </section>
    </div>
  );
}
