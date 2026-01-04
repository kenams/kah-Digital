import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MvpQuoteForm } from "@/components/mvp-quote-form";

export const metadata: Metadata = {
  title: "Mobile MVP quote",
  description: "Short form to scope an iOS or Android MVP.",
};

export default function DevisMvpPageEn() {
  return (
    <div className="section-shell space-y-12">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Back to home
        </Link>
        <Link
          href="/en/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Quick web quote
        </Link>
      </div>
      <div className="premium-card rounded-[36px] border border-white/10 bg-gradient-to-br from-[#090b21] via-[#141036] to-[#2a1a55] px-6 py-8 text-white sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Mobile MVP apps</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Tell us about your iOS / Android app.</h1>
        <p className="mt-4 max-w-3xl text-base text-white/80 sm:text-lg">
          This form is designed to scope a mobile MVP: platforms, must-have features, visual mood, and integrations. We reply
          within 24h with an estimated budget, timeline, proposed architecture, and a TestFlight / Play Store plan.
        </p>
        <div className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-xl font-semibold text-white sm:text-2xl">iOS + Android</p>
            <p>Expo builds, push and analytics included.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-xl font-semibold text-white sm:text-2xl">4 to 6 weeks</p>
            <p>For a first TestFlight build.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-xl font-semibold text-white sm:text-2xl">Modern stack</p>
            <p>React Native, Expo, Supabase, Stripe...</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <MvpQuoteForm />
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-4">
          <Image
            src="/mockups/pulselearn.png"
            alt="Mobile MVP preview"
            width={760}
            height={520}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
