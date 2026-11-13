import type { Metadata } from "next";
import Link from "next/link";
import { FiCheckCircle, FiMail, FiPhone } from "react-icons/fi";
import { iaOfferById } from "@/data/ia-offers";
import { ORDER_CONTACT } from "@/lib/pack-orders";

export const metadata: Metadata = {
  title: "Merci pour votre réservation | KAH Digital Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function IaThanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = Array.isArray(params.offre) ? params.offre[0] : params.offre;
  const offer = iaOfferById(raw);
  const subscription = offer?.period === "mois";

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <FiCheckCircle size={48} className="mx-auto text-[#d6b36a]" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-bold sm:text-5xl">Merci, c&apos;est réservé</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            {offer ? (
              <>
                Votre paiement pour <strong className="text-white">{offer.name}</strong> a bien été transmis.
              </>
            ) : (
              "Votre paiement a bien été transmis."
            )}{" "}
            Stripe vous envoie un reçu par e-mail.
          </p>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
            <h2 className="font-semibold text-white">La suite</h2>
            <ol className="mt-4 space-y-3 text-sm text-white/75">
              <li>1. Nous vous contactons sous 48 h ouvrées pour fixer {subscription ? "votre première séance" : "la date"}.</li>
              <li>2. Vous répondez à quelques questions sur vos tâches et vos outils pour préparer la séance.</li>
              <li>3. La séance a lieu à distance, le lien de visio vous est envoyé par e-mail.</li>
            </ol>
          </div>
          <p className="mt-8 text-sm text-white/60">Une question en attendant ?</p>
          <div className="mt-3 flex flex-col justify-center gap-3 text-sm sm:flex-row">
            <a href={`mailto:${ORDER_CONTACT.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 hover:border-[#d6b36a]/60">
              <FiMail aria-hidden="true" /> {ORDER_CONTACT.email}
            </a>
            <a href={`tel:+33${ORDER_CONTACT.phone.replace(/\s/g, "").slice(1)}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 hover:border-[#d6b36a]/60">
              <FiPhone aria-hidden="true" /> {ORDER_CONTACT.phone}
            </a>
          </div>
          <p className="mt-10">
            <Link href="/ia-entreprise" className="text-sm font-semibold text-[#f0d99b] underline-offset-4 hover:underline">
              Retour aux offres IA
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
