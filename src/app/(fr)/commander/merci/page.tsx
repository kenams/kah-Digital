import type { Metadata } from "next";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { OrderBriefForm } from "@/components/pages/order-brief-form";
import { ORDER_CONTACT, SUBSCRIPTION_TRIAL_DAYS, formatEuro } from "@/lib/pack-orders";
import { parsePackOrder, type ParsedOrder } from "@/lib/pack-order-notify";
import { getStripeClient, isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Commande confirmée — KAH Digital Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadOrder(sessionId: string | undefined): Promise<ParsedOrder | null> {
  if (!sessionId || !sessionId.startsWith("cs_") || !isStripeConfigured()) return null;
  try {
    const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
    return session.status === "complete" ? parsePackOrder(session) : null;
  } catch {
    return null;
  }
}

export default async function OrderThanksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;
  const order = await loadOrder(sessionId);

  return (
    <main className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-2xl">
          {order && sessionId ? (
            <>
              <div className="text-center">
                <FiCheckCircle size={44} className="mx-auto text-emerald-300" aria-hidden="true" />
                <h1 className="mt-4 text-4xl font-bold">Commande confirmée</h1>
                <p className="mt-3 text-lg text-white/70">
                  Merci {order.name.split(" ")[0]} ! Votre pack <strong className="text-white">{order.packName}</strong> ({formatEuro(order.packPrice)}) est payé.
                  {order.hasSubscription
                    ? ` Votre abonnement ${order.planName} (${order.planPrice} €/mois) démarre ${SUBSCRIPTION_TRIAL_DAYS} jours après la commande.`
                    : ""}
                </p>
                <p className="mt-2 text-sm text-white/50">Un e-mail de confirmation vient de vous être envoyé à {order.email}.</p>
              </div>

              <div className="mt-10 mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d6b36a]">Dernière étape</p>
                <h2 className="mt-1 text-2xl font-bold">Envoyez-moi vos contenus (5 minutes)</h2>
                <p className="mt-2 text-white/65">Le délai de 5 jours ouvrés démarre dès réception de ce formulaire.</p>
              </div>
              <OrderBriefForm sessionId={sessionId} />
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold">Merci pour votre commande</h1>
              <p className="mt-4 text-lg text-white/70">
                Si votre paiement est bien passé, vous recevez un e-mail de confirmation avec le lien vers votre formulaire de démarrage.
              </p>
              <p className="mt-3 text-sm text-white/50">
                Une question ? {ORDER_CONTACT.email} · {ORDER_CONTACT.phone}
              </p>
              <Link href="/" className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                Retour à l&apos;accueil
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
