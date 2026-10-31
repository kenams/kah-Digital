import Link from "next/link";
import { FiArrowRight, FiCheck, FiClock, FiMinus, FiTarget, FiUsers, FiZap } from "react-icons/fi";
import { PilotForm } from "@/components/pilot-form";
import { PILOT_DELIVERY, pilots, type Pilot } from "@/data/pilotes";

const cta = "inline-flex items-center gap-2 rounded-full bg-[#d6b36a] px-7 py-3.5 font-bold text-[#11131b] transition hover:bg-[#f0d99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]";

export function PilotPageContent({ pilot }: { pilot: Pilot }) {
  const others = pilots.filter((p) => p.slug !== pilot.slug);

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      <section className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6b36a]/35 bg-[#d6b36a]/10 px-4 py-2 text-sm text-[#f0d99b]">
            <FiUsers size={14} aria-hidden="true" /> {pilot.eyebrow}
          </p>
          <h1 className="text-4xl font-bold sm:text-6xl">
            <span className="block text-[#d6b36a]">{pilot.name}</span>
            {pilot.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">{pilot.promise}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#rejoindre" className={cta}>
              Rejoindre le pilote <FiArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#v1" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d99b]">
              Voir le périmètre de la V1
            </a>
          </div>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-sm text-white/75 sm:flex-row sm:justify-center">
            <li className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
              <FiClock size={14} className="text-[#d6b36a]" aria-hidden="true" /> Cadrage sous {PILOT_DELIVERY.scoping}
            </li>
            <li className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
              <FiZap size={14} className="text-[#d6b36a]" aria-hidden="true" /> V1 pilote en {PILOT_DELIVERY.v1}
            </li>
          </ul>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <FiTarget size={20} className="text-[#d6b36a]" aria-hidden="true" /> Le problème
            </h2>
            <p className="mt-4 leading-relaxed text-white/70">{pilot.problem}</p>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-white/60">Pour qui ?</h3>
            <ul className="mt-3 space-y-2">
              {pilot.audience.map((a) => (
                <li key={a} className="flex items-start gap-3 text-white/80">
                  <FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[#d6b36a]/30 bg-[#d6b36a]/[0.06] p-7">
            <h2 className="text-2xl font-bold">La transformation attendue</h2>
            <h3 className="mt-5 text-sm font-semibold uppercase tracking-widest text-white/60">Aujourd&apos;hui</h3>
            <ul className="mt-3 space-y-2 text-white/70">
              {pilot.before.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <FiMinus size={18} className="mt-0.5 shrink-0 text-white/40" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#f0d99b]">Avec {pilot.name}</h3>
            <ul className="mt-3 space-y-2 text-white/85">
              {pilot.after.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="v1" className="section-shell pt-0 scroll-mt-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Le périmètre de la V1 pilote</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-white/65">
            Une première version volontairement limitée, utile dès le premier jour et construite avec vous.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <h3 className="text-lg font-bold">Ce que la V1 comprend</h3>
              <ul className="mt-4 space-y-3">
                {pilot.v1.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/80">
                    <FiCheck size={18} className="mt-0.5 shrink-0 text-[#d6b36a]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <h3 className="text-lg font-bold">Ce qu&apos;elle ne comprend pas</h3>
              <ul className="mt-4 space-y-3">
                {pilot.notV1.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70">
                    <FiMinus size={18} className="mt-0.5 shrink-0 text-white/40" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-white/60">{pilot.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#d6b36a]/30 bg-gradient-to-br from-[#d6b36a]/[0.09] to-transparent p-7 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#f0d99b]">Groupe des partenaires fondateurs</p>
          <h2 className="mt-3 text-3xl font-bold">Un pilote construit avec vous, rapidement</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-white/75">
            {pilot.name} est en phase pilote. Les premiers pilotes sont construits avec leurs partenaires : vous cadrez avec nous ce dont vous avez besoin, nous réalisons la V1, vous l&apos;utilisez et elle évolue avec vos retours. C&apos;est une offre payante de partenaire fondateur, à prix fixe annoncé clairement avant tout engagement, avec un éventuel abonnement ensuite. Aucun montant n&apos;est engagé sans votre accord écrit.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { n: "1", t: `Cadrage sous ${PILOT_DELIVERY.scoping}`, d: "Un échange pour fixer le périmètre de la V1, le prix fixe et les éléments dont nous avons besoin." },
              { n: "2", t: "Validation écrite", d: "Vous validez le périmètre par écrit et nous transmettez les accès et contenus nécessaires." },
              { n: "3", t: `V1 pilote en ${PILOT_DELIVERY.v1}`, d: `Livrée ${PILOT_DELIVERY.condition}. ${PILOT_DELIVERY.wider}` },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#d6b36a] text-sm font-bold text-[#11131b]">{s.n}</span>
                <h3 className="mt-3 font-bold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="rejoindre" className="section-shell pt-0 scroll-mt-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">Cadrer mon pilote {pilot.name}</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/65">
            Quelques informations professionnelles suffisent. Nous revenons vers vous sous {PILOT_DELIVERY.scoping} ouvrées.
          </p>
          <div className="mt-8">
            <PilotForm pilot={pilot} />
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold">Questions fréquentes</h2>
          <div className="mt-8 space-y-3">
            {pilot.faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <summary className="cursor-pointer list-none font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d99b]">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-white/60">
            Autres pilotes en cours de constitution :{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                {i > 0 ? " · " : ""}
                <Link href={`/pilotes/${o.slug}`} className="underline underline-offset-4 hover:text-white">{o.name}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
