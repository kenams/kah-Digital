"use client";

import { useState, type FormEvent } from "react";
import { FiAlertCircle, FiCheck, FiClock, FiLock, FiShield } from "react-icons/fi";
import {
  ORDER_CONTACT,
  PACKS,
  SUBSCRIPTIONS,
  SUBSCRIPTION_TRIAL_DAYS,
  formatEuro,
  type PackId,
  type SubscriptionId,
} from "@/lib/pack-orders";

const PLAN_ORDER: SubscriptionId[] = ["essentiel", "confort", "pro", "none"];
const field =
  "h-12 w-full rounded-2xl border border-white/12 bg-black/30 px-4 text-base text-white outline-none transition-all duration-150 placeholder:text-white/30 hover:border-white/20 focus:border-[#d6b36a]/70 focus:ring-2 focus:ring-[#d6b36a]/20";

type Props = {
  initialPack: PackId;
  cancelled?: boolean;
};

export function OrderPageContent({ initialPack, cancelled = false }: Props) {
  const [pack, setPack] = useState<PackId>(initialPack);
  const [plan, setPlan] = useState<SubscriptionId>("essentiel");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accept, setAccept] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedPack = PACKS[pack];
  const selectedPlan = SUBSCRIPTIONS[plan];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/commander/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack, plan, name, company, email, phone, accept }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Paiement indisponible.");
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Paiement indisponible.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">
            <FiLock size={14} aria-hidden="true" /> Commande en ligne · paiement sécurisé Stripe
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">Commandez votre site, il est livré en 5 jours</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/65">
            Choisissez votre pack, payez en ligne, puis envoyez vos contenus. Je m&apos;occupe du reste.
          </p>
        </div>

        {cancelled ? (
          <p className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-amber-300/25 bg-amber-400/10 p-3 text-sm text-amber-100">
            <FiAlertCircle aria-hidden="true" /> Le paiement a été annulé. Aucun montant n&apos;a été prélevé.
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div className="space-y-8">
            {/* 1. Pack */}
            <fieldset>
              <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#d6b36a]">1 · Votre pack</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {(Object.keys(PACKS) as PackId[]).map((id) => {
                  const item = PACKS[id];
                  const active = pack === id;
                  return (
                    <label
                      key={id}
                      className={`relative flex cursor-pointer flex-col rounded-3xl border p-5 transition ${
                        active
                          ? "border-[#d6b36a]/80 bg-[#d6b36a]/10 shadow-[0_0_0_1px_rgba(214,179,106,0.4)]"
                          : "border-white/10 bg-white/[0.04] hover:border-white/25"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pack"
                        value={id}
                        checked={active}
                        onChange={() => setPack(id)}
                        className="peer sr-only"
                      />
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-lg font-bold">{item.name}</span>
                        <span className="text-3xl font-black text-white">{formatEuro(item.price)}</span>
                      </span>
                      <span className="mt-2 text-sm text-white/60">{item.summary}</span>
                      <ul className="mt-4 space-y-2">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-sm text-white/78">
                            <FiCheck size={14} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#f0d99b]">
                        <FiClock size={12} aria-hidden="true" /> Livré en {item.delivery}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-[#d6b36a] text-[#11131b] shadow-md ${
                          active ? "!flex" : ""
                        }`}
                      >
                        <FiCheck size={12} />
                      </span>
                      <span className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-[#d6b36a] ring-offset-2 ring-offset-[#0a0908] opacity-0 peer-focus-visible:opacity-100" />
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* 2. Abonnement */}
            <fieldset>
              <legend className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#d6b36a]">2 · Votre abonnement</legend>
              <p className="mb-3 text-sm text-white/55">
                Hébergement, nom de domaine, sécurité et modifications : pour que votre site reste en ligne et à jour. Sans engagement, premier prélèvement {SUBSCRIPTION_TRIAL_DAYS} jours après la commande.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {PLAN_ORDER.map((id) => {
                  const item = SUBSCRIPTIONS[id];
                  const active = plan === id;
                  return (
                    <label
                      key={id}
                      className={`relative flex cursor-pointer flex-col rounded-2xl border p-4 transition ${
                        active
                          ? "border-[#d6b36a]/80 bg-[#d6b36a]/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={id}
                        checked={active}
                        onChange={() => setPlan(id)}
                        className="peer sr-only"
                      />
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="font-bold">
                          {item.name}
                          {id === "essentiel" ? (
                            <span className="ml-2 rounded-full bg-[#d6b36a]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f0d99b]">
                              Inclus
                            </span>
                          ) : null}
                        </span>
                        <span className="text-lg font-black">{item.price > 0 ? `${item.price} €/mois` : "0 €"}</span>
                      </span>
                      <span className="mt-1 text-xs text-white/55">{item.tagline}</span>
                      <ul className="mt-3 space-y-1">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs text-white/72">
                            <FiCheck size={12} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-[#d6b36a] opacity-0 peer-focus-visible:opacity-100" />
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* 3. Coordonnées */}
            <fieldset>
              <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#d6b36a]">3 · Vos coordonnées</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/78">Nom et prénom *</span>
                  <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont" className={field} />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/78">Entreprise</span>
                  <input autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Boulangerie Dupont" className={field} />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/78">E-mail *</span>
                  <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jean@exemple.fr" className={field} />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/78">Téléphone</span>
                  <input type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 12 34 56 78" className={field} />
                </label>
              </div>
            </fieldset>
          </div>

          {/* Récapitulatif */}
          <aside className="rounded-[28px] border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Récapitulatif</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-white/65">Pack {selectedPack.name}</dt>
                <dd className="font-semibold">{formatEuro(selectedPack.price)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-white/65">Abonnement {selectedPlan.id === "none" ? "" : selectedPlan.name}</dt>
                <dd className="text-right font-semibold">
                  {selectedPlan.price > 0 ? `${selectedPlan.price} €/mois` : "Aucun"}
                </dd>
              </div>
            </dl>
            <div className="my-5 h-px bg-white/10" />
            <p className="text-xs uppercase tracking-widest text-white/45">À payer aujourd&apos;hui</p>
            <p className="mt-1 text-4xl font-black">{formatEuro(selectedPack.price)}</p>
            {selectedPlan.price > 0 ? (
              <p className="mt-2 text-sm text-[#f0d99b]">
                puis {selectedPlan.price} €/mois à partir du {SUBSCRIPTION_TRIAL_DAYS}
                <sup>e</sup> jour, sans engagement
              </p>
            ) : null}
            <p className="mt-2 text-xs text-white/45">TVA non applicable — art. 293 B du CGI</p>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-white/72">
              <input
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                required
                className="mt-1 h-4 w-4 shrink-0 accent-[#d6b36a]"
              />
              <span>
                J&apos;accepte les conditions de vente et d&apos;abonnement ci-dessous. *
              </span>
            </label>

            <details className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-3 text-xs leading-5 text-white/60">
              <summary className="cursor-pointer font-semibold text-white/78">Lire les conditions</summary>
              <ul className="mt-2 list-disc space-y-1.5 pl-4">
                <li>Le pack est payé à la commande ; la livraison a lieu sous 5 jours ouvrés après réception de vos contenus.</li>
                <li>Les retouches incluses sont celles décrites dans le pack ; toute fonctionnalité supplémentaire fait l&apos;objet d&apos;un devis.</li>
                <li>L&apos;abonnement est prélevé chaque mois par carte, sans engagement, résiliable avec un mois de préavis par simple message.</li>
                <li>Les modifications comprises dans l&apos;abonnement ne sont pas reportables d&apos;un mois sur l&apos;autre.</li>
                <li>Vos données et contenus restent votre propriété ; vous recevez les accès sur demande.</li>
                <li>Contact : {ORDER_CONTACT.email} · {ORDER_CONTACT.phone}.</li>
              </ul>
            </details>

            {error ? (
              <p role="alert" className="mt-4 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-3 text-sm text-rose-100">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="group mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d6b36a] px-5 text-base font-bold text-[#11131b] shadow-lg shadow-[#d6b36a]/20 transition-all hover:gap-3 hover:bg-[#f0d99b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#11131b]/30 border-t-[#11131b]" />
              ) : (
                <FiLock size={17} aria-hidden="true" />
              )}
              {loading ? "Ouverture du paiement…" : `Payer ${formatEuro(selectedPack.price)} et lancer mon site`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/45">
              <FiShield size={12} aria-hidden="true" /> Paiement sécurisé par Stripe. Je ne vois jamais vos données de carte.
            </p>
          </aside>
        </form>
      </section>
    </main>
  );
}
