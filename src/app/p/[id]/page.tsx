import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import QuickContactForm from "./QuickContactForm";
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle, FiArrowRight, FiPhone, FiMail, FiStar } from "react-icons/fi";
import { ProspectCountdown } from "@/components/prospect-countdown";

type Props = { params: Promise<{ id: string }> };

type ProspectRow = {
  id: string;
  businessName: string | null;
  website: string;
  email: string | null;
  sector: string | null;
  language: string | null;
  sentAt: string | null;
  audit: {
    score: number;
    problems: Array<{ title: string; detail: string; severity: string; category: string }>;
    recommendations: Array<{ title: string; detail: string; impact: string }>;
    estimatedPrice: number;
    priceRange: string;
  } | null;
  emailSubject: string | null;
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function getProspect(id: string): Promise<ProspectRow | null> {
  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("prospects")
      .select("id, businessName, website, email, sector, language, sentAt, audit, emailSubject")
      .eq("id", id)
      .single();
    return data as ProspectRow | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await getProspect(id);
  const name = p?.businessName ?? "Votre projet";
  return {
    title: `Analyse de ${name} — KAH-Digital`,
    robots: { index: false, follow: false },
  };
}

const COPY: Record<string, {
  greeting: (n: string) => string;
  subtitle: string;
  scoreLabel: string;
  problemsTitle: string;
  recoTitle: string;
  priceLabel: string;
  ctaWhatsApp: string;
  ctaCall: string;
  ctaEmail: string;
  ctaQuote: string;
  footer: string;
  sevLabel: Record<string, string>;
  socialTitle: string;
}> = {
  fr: {
    greeting: (n) => `Bonjour ${n},`,
    subtitle: "Voici l'analyse personnalisée de votre site web par KAH-Digital.",
    scoreLabel: "Score digital actuel",
    problemsTitle: "Ce qu'on a détecté",
    recoTitle: "Notre proposition",
    priceLabel: "Proposition personnalisée",
    ctaWhatsApp: "Discuter sur WhatsApp",
    ctaCall: "Appeler maintenant",
    ctaEmail: "Répondre par email",
    ctaQuote: "Demander un devis personnalisé",
    footer: "Cette analyse a été réalisée gratuitement par KAH-Digital. Aucun engagement de votre part.",
    sevLabel: { critical: "Critique", medium: "Moyen", low: "Mineur" },
    socialTitle: "Ils nous ont fait confiance",
  },
  en: {
    greeting: (n) => `Hello ${n},`,
    subtitle: "Here is your personalised website analysis by KAH-Digital.",
    scoreLabel: "Current digital score",
    problemsTitle: "What we found",
    recoTitle: "Our proposal",
    priceLabel: "Custom proposal",
    ctaWhatsApp: "Chat on WhatsApp",
    ctaCall: "Call now",
    ctaEmail: "Reply by email",
    ctaQuote: "Request a custom quote",
    footer: "This analysis was performed for free by KAH-Digital. No commitment required.",
    sevLabel: { critical: "Critical", medium: "Medium", low: "Minor" },
    socialTitle: "They trusted us",
  },
};

function getCopy(lang: string | null) {
  return COPY[lang ?? "fr"] ?? COPY.fr;
}

function ScoreRing({ score }: { score: number }) {
  const color = score < 40 ? "#ef4444" : score < 60 ? "#f59e0b" : "#22c55e";
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        <span className="relative text-3xl font-black text-white">{score}</span>
      </div>
      <span className="text-xs text-gray-500">/100</span>
    </div>
  );
}

const SEV_ICON: Record<string, React.ReactNode> = {
  critical: <FiAlertCircle size={15} className="shrink-0 text-red-400" />,
  medium:   <FiAlertTriangle size={15} className="shrink-0 text-amber-400" />,
  low:      <FiCheckCircle size={15} className="shrink-0 text-blue-400" />,
};

const SEV_CLASS: Record<string, string> = {
  critical: "border-red-500/20 bg-red-500/5",
  medium:   "border-amber-500/20 bg-amber-500/5",
  low:      "border-blue-500/20 bg-blue-500/5",
};

const SEV_TEXT: Record<string, string> = {
  critical: "text-red-400",
  medium:   "text-amber-400",
  low:      "text-blue-400",
};

const SOCIAL_PROOF = [
  { initials: "S.M.", quote: { fr: "Site livré en 3 semaines. 4 nouveaux clients le premier mois.", en: "Site delivered in 3 weeks. 4 new clients in the first month." } },
  { initials: "A.B.", quote: { fr: "Réservations +30% en deux mois. Devis clair, livraison dans les délais.", en: "+30% bookings in two months. Clear quote, on time." } },
];

export default async function ProspectLandingPage({ params }: Props) {
  const { id } = await params;
  const prospect = await getProspect(id);

  if (!prospect || !prospect.audit) notFound();

  const c = getCopy(prospect.language);
  const { audit } = prospect;
  const name = prospect.businessName ?? prospect.website;
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+33 7 59 55 84 14";
  const phoneRaw = phone.replace(/\s/g, "");
  const email = "kahdigital42@gmail.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch";
  const devisUrl = `${siteUrl}/devis?company=${encodeURIComponent(name)}&site=${encodeURIComponent(prospect.website)}&ref=email`;
  const waMsg = encodeURIComponent(`Bonjour Kénan, j'ai vu l'analyse de mon site ${prospect.website}. Je suis intéressé(e) par vos services.`);
  const waUrl = `https://wa.me/33759558414?text=${waMsg}`;
  const lang = prospect.language ?? "fr";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-white/8 bg-gray-900/80 px-4 py-4 text-center">
        <div className="text-lg font-bold tracking-tight">KAH-Digital</div>
        <div className="text-xs text-gray-500">Studio digital — sites, apps &amp; IA</div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Countdown urgence */}
        <ProspectCountdown sentAt={prospect.sentAt} lang={lang} />

        {/* Greeting */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight">{c.greeting(name)}</h1>
          <p className="text-gray-400">{c.subtitle}</p>
          <p className="mt-1 text-sm text-gray-600">{prospect.website}</p>
        </div>

        {/* Score */}
        <div className="mb-8 flex items-center justify-center gap-8 rounded-2xl border border-white/8 bg-gray-900 p-8">
          <ScoreRing score={audit.score} />
          <div>
            <div className="text-sm text-gray-500">{c.scoreLabel}</div>
            <div className="mt-1 text-2xl font-black text-white">{audit.score}/100</div>
            <div className="mt-2 text-sm text-gray-400">
              {audit.score < 40 ? "Site en difficulté — refonte recommandée" :
               audit.score < 60 ? "Site perfectible — améliorations ciblées" :
               "Site correct — optimisations possibles"}
            </div>
          </div>
        </div>

        {/* Problems */}
        {audit.problems.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">{c.problemsTitle}</h2>
            <div className="space-y-3">
              {audit.problems.map((p, i) => (
                <div key={i} className={`flex items-start gap-3 rounded-xl border p-4 ${SEV_CLASS[p.severity] ?? SEV_CLASS.low}`}>
                  {SEV_ICON[p.severity] ?? SEV_ICON.low}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{p.title}</span>
                      <span className={`text-xs font-medium ${SEV_TEXT[p.severity] ?? ""}`}>
                        {c.sevLabel[p.severity] ?? p.severity}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-400">{p.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {audit.recommendations.length > 0 && (
          <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">{c.recoTitle}</h2>
            <div className="space-y-3">
              {audit.recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <FiCheckCircle size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <span className="text-sm font-semibold text-white">{r.title}</span>
                    <p className="text-sm text-gray-400">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom proposal */}
        <div className="mb-8 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-6 text-center">
          <div className="text-sm text-gray-400">{c.priceLabel}</div>
          <div className="mt-1 text-2xl font-black text-white">
            {lang === "en"
              ? "Adjusted after a short scoping call"
              : "Ajustée après un court échange de cadrage"}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {lang === "en"
              ? "Clear custom quote · No obligation"
              : "Devis personnalisé clair · Sans engagement"}
          </div>
        </div>

        {/* CTAs */}
        <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-center">
          <p className="text-sm text-amber-300 font-medium">
            {lang === "en"
              ? "⚡ This analysis is reserved for you — free quote in 24h"
              : "⚡ Cette analyse vous est réservée — devis gratuit sous 24h"}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg transition hover:bg-[#22c55e]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {lang === "en" ? "Chat on WhatsApp — quick answer" : "Répondre sur WhatsApp — réponse rapide"}
          </a>
          <QuickContactForm
            prospectId={prospect.id}
            siteUrl={prospect.website}
            businessName={prospect.businessName ?? ""}
            lang={lang as "en" | "fr" | "de"}
          />
          <a
            href={`mailto:${email}?subject=Suite — ${encodeURIComponent(name)}&body=Bonjour%2C%0A%0AJ'ai vu votre analyse de mon site ${encodeURIComponent(prospect.website)}.%0A%0A`}
            className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            <FiMail size={15} /> {c.ctaEmail}
          </a>
          <a
            href={`tel:${phoneRaw}`}
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-4 font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/5"
          >
            <FiPhone size={15} /> {c.ctaCall} — {phone}
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-10">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-600">{c.socialTitle}</p>
          <div className="space-y-3">
            {SOCIAL_PROOF.map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/6 bg-gray-900/50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">
                  {s.initials}
                </div>
                <div>
                  <div className="mb-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <FiStar key={j} size={11} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">
                    "{(s.quote as Record<string, string>)[lang] ?? s.quote.fr}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-600">{c.footer}</p>
      </div>
    </div>
  );
}
