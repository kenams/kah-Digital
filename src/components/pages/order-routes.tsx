import type { Metadata } from "next";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { OrderBriefForm } from "@/components/pages/order-brief-form";
import { OrderPageContent } from "@/components/pages/order-page-content";
import { withLocalePrefix, type Locale } from "@/lib/locales";
import { ORDER_COPY } from "@/lib/order-copy";
import { ORDER_CONTACT, SUBSCRIPTION_TRIAL_DAYS, formatMoney, isPackId, resolveCurrency } from "@/lib/pack-orders";
import { parsePackOrder, type ParsedOrder } from "@/lib/pack-order-notify";
import { buildPageMetadata } from "@/lib/shared-metadata";
import { getStripeClient, isStripeConfigured } from "@/lib/stripe";

export type OrderSearchParams = Promise<Record<string, string | string[] | undefined>>;

export function orderMetadata(locale: Locale): Metadata {
  const c = ORDER_COPY[locale];
  return buildPageMetadata({ locale, path: "/commander", title: c.meta.title, description: c.meta.description });
}

export const orderThanksMetadata = (locale: Locale): Metadata => ({
  title: ORDER_COPY[locale].thanks.title + " — KAH Digital Studio",
  robots: { index: false, follow: false },
});

export async function OrderRoute({ locale, searchParams }: { locale: Locale; searchParams: OrderSearchParams }) {
  const params = await searchParams;
  const pack = typeof params.pack === "string" && isPackId(params.pack) ? params.pack : "business";
  const currency = resolveCurrency(locale, typeof params.devise === "string" ? params.devise : undefined);
  return <OrderPageContent locale={locale} currency={currency} initialPack={pack} cancelled={params.annule === "1"} />;
}

async function loadOrder(sessionId: string | undefined): Promise<ParsedOrder | null> {
  if (!sessionId || !sessionId.startsWith("cs_") || !isStripeConfigured()) return null;
  try {
    const session = await getStripeClient().checkout.sessions.retrieve(sessionId);
    return session.status === "complete" ? parsePackOrder(session) : null;
  } catch {
    return null;
  }
}

export async function OrderThanksRoute({ locale, searchParams }: { locale: Locale; searchParams: OrderSearchParams }) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;
  const order = await loadOrder(sessionId);
  const c = ORDER_COPY[locale];

  return (
    <main className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-2xl">
          {order && sessionId ? (
            <>
              <div className="text-center">
                <FiCheckCircle size={44} className="mx-auto text-emerald-300" aria-hidden="true" />
                <h1 className="mt-4 text-4xl font-bold">{c.thanks.title}</h1>
                <p className="mt-3 text-lg text-white/70">
                  {c.thanks.body(
                    order.name.split(" ")[0] ?? "",
                    ORDER_COPY[locale].packs[order.pack].name,
                    formatMoney(order.packPrice, order.currency),
                    ORDER_COPY[locale].plans[order.plan].name,
                    formatMoney(order.planPrice, order.currency),
                    order.hasSubscription,
                    SUBSCRIPTION_TRIAL_DAYS,
                  )}
                </p>
                <p className="mt-2 text-sm text-white/50">{c.thanks.mailed(order.email)}</p>
              </div>

              <div className="mb-6 mt-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d6b36a]">{c.thanks.lastStep}</p>
                <h2 className="mt-1 text-2xl font-bold">{c.thanks.formTitle}</h2>
                <p className="mt-2 text-white/65">{c.thanks.formIntro}</p>
              </div>
              <OrderBriefForm sessionId={sessionId} locale={locale} />
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold">{c.thanks.genericTitle}</h1>
              <p className="mt-4 text-lg text-white/70">{c.thanks.genericBody}</p>
              <p className="mt-3 text-sm text-white/50">
                {ORDER_CONTACT.email} · {ORDER_CONTACT.phone}
              </p>
              <Link href={withLocalePrefix("/", locale) || "/"} className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                {c.thanks.home}
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
