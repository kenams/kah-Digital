import Image from "next/image";
import Link from "next/link";
import {
  MdAutoAwesome,
  MdCalendarMonth,
  MdCheck,
  MdEmail,
  MdLocationOn,
  MdNorthEast,
  MdPhone,
  MdSchedule,
  MdSecurity,
  MdVerified,
} from "react-icons/md";
import { BrandLockup } from "@/components/brand-lockup";
import { brandContact } from "@/config/brand";
import { companyConfig } from "@/config/company";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

const proposalId = "KAH-ASHANTI-2026-04-23";
const mailtoHref =
  "mailto:contact@ashanti-beauty.fr?subject=Proposition%20site%20web%20Ashanti%20Beauty&body=Bonjour%2C%0A%0AVotre%20proposition%20KAH-Digital%20m%27interesse.%20Pouvons-nous%20en%20discuter%20?%0A%0AMerci.";
const phoneHref = `tel:${brandContact.phoneHref}`;

export const metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/proposition/ashanti-beauty-balma",
  title: "Proposition Ashanti Beauty Balma",
  description: "Proposition commerciale privee KAH-Digital pour Ashanti Beauty.",
});

export default function AshantiBeautyProposalPage() {
  return (
    <div className="section-shell">
      <section className="mx-auto max-w-7xl">
        <div className="hero-grid rounded-[36px] p-4 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="orbit-badge">
                  <span className="orbit-dot" />
                  Proposition commerciale privee
                </span>
                <span className="orbit-badge">Balma • Institut de beaute</span>
              </div>

              <BrandLockup subtitle="proposition sur mesure signee KAH" />

              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Pour Ashanti Beauty
                </p>
                <h1 className="max-w-4xl text-4xl font-black text-white sm:text-5xl lg:text-6xl">
                  Une vitrine premium, feminine et vendeuse prete a etre mise en ligne rapidement.
                </h1>
                <p className="max-w-3xl text-lg text-white/72">
                  J&apos;ai prepare une maquette haut de gamme pour presenter Ashanti Beauty avec un rendu
                  chic, mobile-first et oriente prise de rendez-vous. Le but est simple : donner une image
                  professionnelle, rassurer et convertir des clientes locales a Balma.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="card-gradient rounded-[28px] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Prix propose</p>
                  <p className="mt-3 text-3xl font-black text-[#f3d9a2]">390 EUR</p>
                  <p className="mt-2 text-sm text-white/65">Site vitrine one-page premium pret a deployer.</p>
                </div>
                <div className="card-gradient rounded-[28px] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Delai</p>
                  <p className="mt-3 text-3xl font-black text-white">48h</p>
                  <p className="mt-2 text-sm text-white/65">Ajustements finaux, vraies photos, mise en ligne.</p>
                </div>
                <div className="card-gradient rounded-[28px] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Inclus</p>
                  <p className="mt-3 text-3xl font-black text-white">SEO local</p>
                  <p className="mt-2 text-sm text-white/65">CTA, mobile, carte Google Maps et contact rapide.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={mailtoHref}
                  className="flash-trigger inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0f1229]"
                >
                  <MdEmail className="h-4 w-4" />
                  Je suis interessee
                </a>
                <a
                  href={phoneHref}
                  className="flash-trigger inline-flex items-center gap-2 rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white"
                >
                  <MdPhone className="h-4 w-4" />
                  Appeler KAH
                </a>
                <Link
                  href="/contact"
                  className="flash-trigger inline-flex items-center gap-2 rounded-full border border-[#d6b36a]/40 bg-[#d6b36a]/10 px-6 py-3.5 text-sm font-semibold text-[#f6deb1]"
                >
                  Prendre contact
                  <MdNorthEast className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="hero-panel rounded-[30px]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/45">Preuve d&apos;origine</p>
                    <p className="mt-2 text-lg font-semibold text-white">Concept realise par KAH-Digital</p>
                  </div>
                  <Image
                    src="/proposals/kah-proof-seal.svg"
                    alt="Sceau KAH Digital"
                    width={92}
                    height={92}
                    className="h-20 w-20"
                  />
                </div>
                <div className="mt-5 grid gap-3 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <MdVerified className="mt-0.5 h-4 w-4 text-[#d6b36a]" />
                    <span>Identifiant unique de proposition : {proposalId}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdSecurity className="mt-0.5 h-4 w-4 text-[#d6b36a]" />
                    <span>Page hebergee sur le domaine KAH avec signature visuelle et filigrane.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdSchedule className="mt-0.5 h-4 w-4 text-[#d6b36a]" />
                    <span>Date de creation : 23 avril 2026.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdCalendarMonth className="mt-0.5 h-4 w-4 text-[#d6b36a]" />
                    <span>Maquette fonctionnelle disponible et livrable apres validation.</span>
                  </div>
                </div>
              </div>

              <div className="card-gradient rounded-[30px] p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">Coordonnees KAH</p>
                <div className="mt-4 space-y-3 text-sm text-white/78">
                  <a href={mailtoHref} className="flex items-center gap-3 hover:text-white">
                    <MdEmail className="h-4 w-4 text-[#d6b36a]" />
                    {companyConfig.email}
                  </a>
                  <a href={phoneHref} className="flex items-center gap-3 hover:text-white">
                    <MdPhone className="h-4 w-4 text-[#d6b36a]" />
                    {companyConfig.phone}
                  </a>
                  <div className="flex items-center gap-3">
                    <MdLocationOn className="h-4 w-4 text-[#d6b36a]" />
                    {companyConfig.address}, {companyConfig.postalCode} {companyConfig.city}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card-gradient rounded-[30px] p-6 sm:p-8">
          <p className="divider-label">Ce qui est prevu</p>
          <h2 className="mt-5 text-3xl text-white sm:text-4xl">Une presentation premium pensee pour convertir.</h2>
          <div className="mt-6 space-y-4 text-white/74">
            <p>
              Le concept met en avant l&apos;offre de bienvenue, les prestations, les avis clientes, les horaires,
              l&apos;adresse et les points de contact rapides. L&apos;esthetique reste feminine, epuree et haut de gamme.
            </p>
            <p>
              L&apos;approche retenue convient bien a un institut de beaute a Balma : visuel rassurant, informations
              immediates, CTA visibles et base propre pour brancher plus tard un vrai outil de reservation.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            {[
              "Design mobile-first premium, adaptee smartphone, tablette et desktop",
              "Sections : accueil, prestations, avis, a propos, contact et footer complet",
              "SEO local de base pour institut de beaute a Balma",
              "Boutons visibles : reserver, appeler, contacter",
              "Carte Google Maps integree et formulaire front pret a connecter",
              "Code propre Next.js + Tailwind, facile a faire evoluer",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/4 px-4 py-4"
              >
                <MdCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#d6b36a]" />
                <p className="text-sm text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="accent-section">
          <div className="content rounded-[30px] p-6 sm:p-8">
            <p className="divider-label">Proposition tarifaire</p>
            <div className="mt-5 grid gap-4">
              <div className="light-surface p-6">
                <p className="text-xs uppercase tracking-[0.26em] text-[#7f6240]">Pack lancement</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-4xl font-black">390 EUR</p>
                    <p className="mt-2 text-sm text-[#46331a]/72">Prix abordable pour lancer une vraie presence premium.</p>
                  </div>
                  <span className="rounded-full bg-[#0f1229] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    offre directe
                  </span>
                </div>
                <div className="mt-5 grid gap-3 text-sm text-[#2b2214]">
                  <div className="flex items-start gap-3">
                    <MdAutoAwesome className="mt-0.5 h-4 w-4" />
                    <span>Creation du site vitrine premium tel que presente</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdAutoAwesome className="mt-0.5 h-4 w-4" />
                    <span>Integration des vrais contenus, photos et liens finaux</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MdAutoAwesome className="mt-0.5 h-4 w-4" />
                    <span>Mise en ligne sur domaine et ajustements de finition</span>
                  </div>
                </div>
              </div>

              <div className="card-gradient rounded-[28px] p-5">
                <p className="text-sm text-white/75">
                  Si la proposition vous interesse, il suffit de nous ecrire ou de nous appeler. Nous pouvons finaliser
                  rapidement les derniers details et publier le site.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={mailtoHref}
                    className="flash-trigger inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f1229]"
                  >
                    <MdEmail className="h-4 w-4" />
                    Envoyer un email
                  </a>
                  <a
                    href={phoneHref}
                    className="flash-trigger inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white"
                  >
                    <MdPhone className="h-4 w-4" />
                    {companyConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="divider-label">Apercus signes KAH</p>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">Extraits de la maquette preparee pour Ashanti Beauty.</h2>
          </div>
          <span className="hidden rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/55 sm:inline-flex">
            partage prive
          </span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[
            {
              src: "/proposals/ashanti-hero-preview.svg",
              title: "Hero premium + offre de bienvenue",
              text: "Positionnement haut de gamme, CTA visibles et offre -20% mise en avant des l'ouverture.",
            },
            {
              src: "/proposals/ashanti-about-preview.svg",
              title: "Ambiance, sections et experience locale",
              text: "Base visuelle claire pour valoriser prestations, contact, horaires et image de l'institut.",
            },
          ].map((shot, index) => (
            <article key={shot.src} className="card-gradient overflow-hidden rounded-[30px]">
              <div className="relative">
                <Image
                  src={shot.src}
                  alt={shot.title}
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#0f1229]/88 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                    Prototype KAH
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82">
                    {proposalId}
                  </span>
                </div>
                <div className="pointer-events-none absolute bottom-3 right-4 rotate-[-10deg] rounded-full border border-[#d6b36a]/35 bg-[#0f1229]/72 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f3d9a2]">
                  KAH-Digital
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl text-white">{shot.title}</h3>
                  <span className="text-xs uppercase tracking-[0.24em] text-white/45">
                    vue {index + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm text-white/70">{shot.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
