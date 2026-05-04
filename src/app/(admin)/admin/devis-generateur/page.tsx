import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { DownloadableQuoteGenerator } from "@/components/downloadable-quote-generator";

export const dynamic = "force-dynamic";

export default async function AdminDevisGenerateurPage() {
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-400">Admin · Outil interne</p>
        <h1 className="mt-2 text-2xl font-black text-white">Générateur de devis PDF</h1>
        <p className="mt-1 text-sm text-white/50">
          Remplis les informations client, sélectionne les prestations et télécharge un PDF prêt à envoyer.
        </p>
      </div>
      <DownloadableQuoteGenerator />
    </div>
  );
}
