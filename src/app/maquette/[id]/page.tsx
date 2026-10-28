import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Booking, { type BookingDay } from "./Booking";

// Les créneaux proposés dépendent de la date du jour : jamais de page figée en cache.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Row = { id: string; businessName: string | null; website: string | null };

async function getProspect(id: string): Promise<Row | null> {
  if (!UUID.test(id)) return null;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.from("prospects").select("id, businessName, website").eq("id", id).single();
    return data as Row | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await getProspect(id);
  return { title: `Maquette — ${p?.businessName ?? "votre site"} | KAH Digital Studio`, robots: { index: false, follow: false } };
}

type Profile = { accent: string; tagline: string; services: [string, string][]; cta: string };

// Contenu d'illustration par métier : volontairement générique, jamais présenté comme des faits sur l'entreprise.
const PROFILES: { match: RegExp; profile: Profile }[] = [
  { match: /plomb|chauff|sanitaire|depann/, profile: { accent: "#0f5f8a", tagline: "Dépannage, installation et entretien, chez vous, dans les meilleurs délais.", services: [["Dépannage", "Fuite, panne, urgence : une demande en ligne et on vous rappelle."], ["Installation", "Pose et remplacement d'équipements, devis clair avant intervention."], ["Entretien", "Contrats et visites régulières pour éviter les mauvaises surprises."]], cta: "Demander une intervention" } },
  { match: /electri/, profile: { accent: "#b45309", tagline: "Installations électriques sûres, mises aux normes et dépannages.", services: [["Dépannage", "Une panne ? Décrivez-la en ligne, un créneau vous est proposé."], ["Mise aux normes", "Tableaux, prises, éclairage : conformité et sécurité."], ["Installation neuve", "Rénovation ou construction, du devis à la mise en service."]], cta: "Prendre rendez-vous" } },
  { match: /nettoy|proprete|menage/, profile: { accent: "#0f766e", tagline: "Un nettoyage soigné, à des horaires qui vous conviennent.", services: [["Bureaux et commerces", "Passages réguliers, planning fixe et interlocuteur unique."], ["Particuliers", "Ménage ponctuel ou récurrent, à votre rythme."], ["Remise en état", "Fin de chantier, vitres, prestations spécifiques sur devis."]], cta: "Réserver un passage" } },
  { match: /coiff|barber|hair|salon/, profile: { accent: "#9f1239", tagline: "Coupes, soins et conseils : réservez votre créneau en quelques secondes.", services: [["Coupe", "Femme, homme, enfant : un moment pour vous."], ["Couleur et soins", "Diagnostic et conseils personnalisés."], ["Barbe et finitions", "Un rendu net, pensé pour durer."]], cta: "Réserver ma place" } },
  { match: /esthe|beaute|institut|epil|ongle|spa/, profile: { accent: "#a21caf", tagline: "Soins du visage et du corps, dans un cadre apaisant.", services: [["Soins du visage", "Selon votre peau et vos envies."], ["Corps et bien-être", "Massages et soins pour relâcher la pression."], ["Beauté des mains et pieds", "Pose, soin et entretien."]], cta: "Réserver un soin" } },
  { match: /kine|osteo|physio|sante|dent|medic|ortho|podo/, profile: { accent: "#1d4ed8", tagline: "Prenez rendez-vous en ligne, simplement, à toute heure.", services: [["Première consultation", "Bilan et plan de soins adaptés."], ["Suivi", "Séances régulières et conseils entre deux rendez-vous."], ["Urgences et douleurs aiguës", "Créneaux dédiés quand c'est possible."]], cta: "Prendre rendez-vous" } },
  { match: /assur|courtier|mutuelle|prevoyance/, profile: { accent: "#1e3a8a", tagline: "Des conseils clairs pour protéger ce qui compte, avec un interlocuteur identifié.", services: [["Particuliers", "Auto, habitation, santé : comparer et choisir sereinement."], ["Professionnels", "Responsabilité, locaux, flotte, prévoyance."], ["Bilan de contrats", "Un point rapide pour vérifier vos garanties."]], cta: "Prendre rendez-vous" } },
  { match: /immobil|agence immo|transaction|syndic/, profile: { accent: "#7c2d12", tagline: "Estimation, vente, location : un échange simple pour démarrer.", services: [["Estimation", "Une première estimation à partir de votre bien."], ["Vente", "Mise en valeur, visites, accompagnement jusqu'à la signature."], ["Location et gestion", "Recherche de locataires et suivi du bien."]], cta: "Demander une estimation" } },
  { match: /avocat|notaire|juridi|huissier|conseil/, profile: { accent: "#1f2937", tagline: "Un premier rendez-vous pour comprendre votre situation et vos options.", services: [["Premier rendez-vous", "Écoute, cadrage et pistes d'action."], ["Accompagnement", "Suivi du dossier avec des points réguliers."], ["Urgences", "Créneaux prioritaires selon disponibilité."]], cta: "Prendre rendez-vous" } },
  { match: /couvr|ardoise|zinc|toit|charpent|macon|peintr|renov|batiment|menuis|isolation|carrel/, profile: { accent: "#44403c", tagline: "Un chantier propre, des délais tenus et un devis détaillé avant de commencer.", services: [["Neuf et rénovation", "Du projet à la réception, un seul interlocuteur."], ["Réparations", "Intervention rapide après un premier échange."], ["Devis gratuit", "Décrivez votre projet en ligne, on vous rappelle."]], cta: "Demander un devis" } },
];

const DEFAULT_PROFILE: Profile = { accent: "#1d4ed8", tagline: "Prenez rendez-vous en ligne, à toute heure, en quelques secondes.", services: [["Nos prestations", "Présentez clairement ce que vous faites et pour qui."], ["Tarifs et délais", "Des repères simples pour rassurer avant le premier contact."], ["Zone d'intervention", "Où vous intervenez, et comment vous joindre."]], cta: "Prendre rendez-vous" };

// Six prochains jours ouvrés (hors dimanche), heure de Paris.
function nextDays(): BookingDay[] {
  const fmt = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/Paris" });
  const out: BookingDay[] = [];
  const d = new Date();
  while (out.length < 6) {
    d.setUTCDate(d.getUTCDate() + 1);
    if (d.getUTCDay() === 0) continue;
    out.push({ key: d.toISOString().slice(0, 10), label: fmt.format(d) });
  }
  return out;
}

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function pickProfile(name: string, website: string): Profile {
  const hay = norm(`${name} ${website}`);
  return PROFILES.find((p) => p.match.test(hay))?.profile ?? DEFAULT_PROFILE;
}

export default async function MaquettePage({ params }: Props) {
  const { id } = await params;
  const prospect = await getProspect(id);
  if (!prospect) notFound();

  const name = (prospect.businessName ?? "").trim() || (prospect.website ?? "").replace(/^https?:\/\/(www\.)?/, "").split("/")[0] || "Votre entreprise";
  const profile = pickProfile(name, prospect.website ?? "");
  const style = { "--accent": profile.accent } as React.CSSProperties;

  return (
    <div style={style} className="min-h-screen bg-stone-50 text-stone-900 antialiased [font-family:ui-sans-serif,system-ui,-apple-system,'Segoe_UI',sans-serif]">
      {/* Bandeau KAH Digital Studio */}
      <div className="sticky top-0 z-30 border-b border-stone-800 bg-stone-950 text-stone-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 text-sm sm:px-6">
          <p className="flex min-w-0 items-center gap-2.5">
            <Image src="/kah-logo.jpg" alt="KAH Digital Studio" width={28} height={28} className="h-7 w-7 shrink-0 rounded-full object-cover" />
            <span className="font-semibold">Maquette gratuite</span>
            <span className="text-stone-400"> préparée par KAH Digital Studio pour {name}</span>
          </p>
          <div className="flex items-center gap-3">
            <a href="tel:+33759558414" className="text-stone-300 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">07 59 55 84 14</a>
            <Link href="/devis" className="rounded-lg bg-white px-3 py-1.5 font-semibold text-stone-950 hover:bg-stone-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Demander un devis</Link>
          </div>
        </div>
      </div>

      {/* Site d'exemple */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <span className="text-lg font-bold tracking-tight">{name}</span>
        <nav aria-label="Navigation de la maquette" className="hidden gap-6 text-sm text-stone-600 sm:flex">
          <a href="#prestations" className="hover:text-stone-900">Prestations</a>
          <a href="#rdv" className="hover:text-stone-900">Rendez-vous</a>
          <a href="#contact" className="hover:text-stone-900">Contact</a>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-5xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16">
          <p className="mb-4 inline-block rounded-full border border-[var(--accent)]/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">Réservation en ligne 24h/24</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">{name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#rdv" className="inline-flex items-center rounded-xl bg-[var(--accent)] px-6 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">{profile.cta}</a>
            <a href="#prestations" className="px-2 py-3 text-base font-medium text-stone-700 underline-offset-4 hover:underline">Voir les prestations</a>
          </div>
        </section>

        <section id="prestations" className="border-y border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Prestations</h2>
            <ol className="mt-8 grid gap-8 sm:grid-cols-3">
              {profile.services.map(([title, text], i) => (
                <li key={title}>
                  <span className="text-sm font-semibold tabular-nums text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-stone-600">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="rdv" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Prenez rendez-vous en ligne</h2>
          <p className="mb-8 mt-3 text-stone-600">Vos clients choisissent leur créneau seuls, sans appel ni va-et-vient de messages. Essayez, c&apos;est une démonstration.</p>
          <Booking businessName={name} ctaLabel={profile.cta} days={nextDays()} />
        </section>

        <section id="contact" className="border-t border-stone-200 bg-white">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
            <div><h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Contact</h3><p className="mt-2 text-stone-700">Téléphone, e-mail et adresse à compléter avec vous.</p></div>
            <div><h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Horaires</h3><p className="mt-2 text-stone-700">À compléter avec vous.</p></div>
            <div><h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500">Zone d&apos;intervention</h3><p className="mt-2 text-stone-700">À compléter avec vous.</p></div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-950 px-4 py-8 text-center text-sm text-stone-400">
        <p>Maquette d&apos;illustration : textes, photos, tarifs et horaires sont à personnaliser avec vous.</p>
        <p className="mt-2">Livrable en 5 jours ouvrés après réception de votre contenu · <Link href="/offres" className="underline underline-offset-4 hover:text-white">voir les offres</Link></p>
      </footer>
    </div>
  );
}
