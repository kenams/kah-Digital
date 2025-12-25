import Image from "next/image";
import Link from "next/link";
import { MvpQuoteForm } from "@/components/mvp-quote-form";

export default function DevisMvpPage() {
  return (
    <div className="section-shell space-y-12">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Configurateur web
        </Link>
      </div>
      <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#090b21] via-[#141036] to-[#2a1a55] px-8 py-12 text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Apps mobiles MVP</p>
        <h1 className="mt-4 text-4xl font-semibold">Parle-nous de ton application iOS / Android.</h1>
        <p className="mt-4 max-w-3xl text-lg text-white/80">
          Ce formulaire est pensé pour cadrer un MVP mobile : plateformes, fonctionnalités incontournables, mood graphique et
          éventuelles intégrations. Nous revenons vers toi sous 24 h avec budget estimatif, planning, architecture proposée et
          plan de publication TestFlight / Play Store.
        </p>
        <div className="mt-4 grid gap-4 text-sm text-white/70 md:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-2xl font-semibold text-white">iOS + Android</p>
            <p>Builds Expo, push et analytics inclus.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-2xl font-semibold text-white">4 à 6 semaines</p>
            <p>Pour sortir un premier jet TestFlight.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-2xl font-semibold text-white">Stack moderne</p>
            <p>React Native, Expo, Supabase, Stripe...</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <MvpQuoteForm />
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <Image
            src="/mockups/pulselearn.svg"
            alt="Aperçu MVP mobile"
            width={760}
            height={520}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
