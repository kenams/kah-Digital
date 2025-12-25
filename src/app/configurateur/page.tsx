"use client";

import Link from "next/link";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { Reveal } from "@/components/reveal";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";
import { ConfiguratorPreview } from "@/components/configurator-preview";
import type { QuoteRequest } from "@/lib/quote";
import type { ConfigSummary } from "@/types/configurator";

type SiteType = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
};

type StrategyOption = {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
};

type MoodOption = {
  id: string;
  title: string;
  palette: string;
  description: string;
};

type ToggleOption = {
  id: string;
  title: string;
  description: string;
};

type FinalFormProps = {
  summary: ConfigSummary;
  features: string[];
  integrations: string[];
  ready: boolean;
};
const siteTypes: SiteType[] = [
  {
    id: "vitrine",
    title: "Site vitrine",
    summary: "Pitch clair, preuves sociales et CTA visibles.",
    bullets: ["Hero + services", "Devis connecte", "FAQ + cahier des charges"],
  },
  {
    id: "blog",
    title: "Magazine / blog",
    summary: "Plateforme editoriale pour publier et nourrir le SEO.",
    bullets: ["Templates SEO", "Newsletter integree", "Analytics lecture"],
  },
  {
    id: "shop",
    title: "Boutique",
    summary: "Catalogue produit + panier + paiement.",
    bullets: ["Stripe / Shopify", "Emails auto", "Dashboard ventes"],
  },
  {
    id: "saas",
    title: "Produit / SaaS",
    summary: "Landing produit et use cases.",
    bullets: ["Pricing dynamique", "Hub onboarding", "Demo / Calendly"],
  },
  {
    id: "event",
    title: "Evenement",
    summary: "Landing campagne ou lancement.",
    bullets: ["Agenda + speakers", "Billetterie", "Pack media"],
  },
  {
    id: "portal",
    title: "Portail client",
    summary: "Espace securise pour suivre les projets.",
    bullets: ["SSO + roles", "Docs et support", "Notif Slack"],
  },
];
const strategyMap: Record<string, StrategyOption[]> = {
  vitrine: [
    {
      id: "pitch",
      title: "Pitch express",
      summary: "One-page rapide avec promesse claire.",
      deliverables: ["1 page + ancres", "CTA devis", "Tracking basique"],
    },
    {
      id: "story",
      title: "Storytelling",
      summary: "Multi sections avec equipe et preuves sociales.",
      deliverables: ["4-6 pages", "Portfolio filtrable", "Mentions RGPD"],
    },
    {
      id: "premium",
      title: "Premium",
      summary: "Animations, photos et copywriting pousses.",
      deliverables: ["Moodboard", "Animations FR Motion", "QA multi devices"],
    },
  ],
  blog: [
    {
      id: "editorial",
      title: "Edito",
      summary: "Rubriques, auteurs, ressources." ,
      deliverables: ["Template article", "Newsletter", "CTA contextuel"],
    },
    {
      id: "playbook",
      title: "Playbook",
      summary: "Guides longues formes pour nourrir le funnel.",
      deliverables: ["Table des matieres", "Bloc CTA", "Tracking scroll"],
    },
    {
      id: "media",
      title: "Media brand",
      summary: "Interviews, podcasts et sponsors.",
      deliverables: ["Page interview", "Flux audio", "Module sponsoring"],
    },
  ],
  shop: [
    {
      id: "starter",
      title: "Shop starter",
      summary: "Catalogue court pour valider l&apos;offre.",
      deliverables: ["15 produits", "Paiement Stripe", "Emails confirmation"],
    },
    {
      id: "scale",
      title: "Scale",
      summary: "Filtres, ventes croisees, promos.",
      deliverables: ["100+ produits", "Logistique", "Dashboard"],
    },
    {
      id: "subscription",
      title: "Abonnement",
      summary: "Box ou service recurrent.",
      deliverables: ["Paiement recurrent", "Portail client", "Automations"],
    },
  ],
  saas: [
    {
      id: "product-led",
      title: "Product-led",
      summary: "Screens interactifs et use cases.",
      deliverables: ["Sections use case", "Pricing dynamique", "Calendly"],
    },
    {
      id: "enterprise",
      title: "Enterprise",
      summary: "Focus securite et support.",
      deliverables: ["Page securite", "Livre blanc", "Logos clients"],
    },
    {
      id: "community",
      title: "Community",
      summary: "Ressources, feedback, roadmap.",
      deliverables: ["Hub ressources", "Templates", "Form feedback"],
    },
  ],
  event: [
    {
      id: "launch",
      title: "Lancement",
      summary: "Reveal + precommandes.",
      deliverables: ["Hero video", "Compteur", "CTA WhatsApp"],
    },
    {
      id: "conference",
      title: "Conference",
      summary: "Agenda + intervenants.",
      deliverables: ["Fiches speakers", "Billetterie", "FAQ"],
    },
    {
      id: "workshop",
      title: "Workshop",
      summary: "Cohortes limitees.",
      deliverables: ["Tarifs", "RDV", "Kit media"],
    },
  ],
  portal: [
    {
      id: "support",
      title: "Support",
      summary: "Centre d'aide et tickets.",
      deliverables: ["Portail securise", "Historique", "Emails auto"],
    },
    {
      id: "project",
      title: "Suivi projet",
      summary: "Timeline et validations.",
      deliverables: ["Vue timeline", "Upload docs", "Notif Slack"],
    },
    {
      id: "academy",
      title: "Academy",
      summary: "Courses, quiz, certification.",
      deliverables: ["Catalogue", "Progression", "Export PDF"],
    },
  ],
};
const moodOptions: MoodOption[] = [
  { id: "minimal", title: "Minimal & premium", palette: "Noir, sable, dore", description: "Peu d&apos;element, beaucoup d&apos;espace blanc." },
  { id: "vibrant", title: "Vibrant & colore", palette: "Bleu electrique, corail", description: "Illustrations, gradients, micro interactions." },
  { id: "editorial", title: "Editorial", palette: "Ivoire, vert foret", description: "Mise en page magazine." },
  { id: "dark", title: "Dark futuriste", palette: "Graphite, neon", description: "Ambiance data / produit." },
];

const featureOptions: ToggleOption[] = [
  { id: "questionnaire", title: "Questionnaire", description: "Form multi etapes relie a Notion/Airtable." },
  { id: "booking", title: "Prise de rendez-vous", description: "Calendly, Cal.com, HubSpot." },
  { id: "download", title: "Telechargement guide", description: "Cahier des charges suivi." },
  { id: "chat", title: "Chat & support", description: "Intercom, Crisp, WhatsApp." },
  { id: "seo", title: "Pack SEO", description: "Audit keywords + contenus." },
  { id: "motion", title: "Animations avancees", description: "Framer Motion, Lottie." },
];

const integrationOptions: ToggleOption[] = [
  { id: "crm", title: "CRM", description: "HubSpot, Pipedrive, Notion CRM." },
  { id: "marketing", title: "Marketing", description: "Brevo, Klaviyo, Customer.io." },
  { id: "analytics", title: "Analytics", description: "Plausible, GA4, PostHog, Sentry." },
  { id: "payment", title: "Paiement", description: "Stripe, Paddle, PayPlug." },
  { id: "cms", title: "CMS", description: "Sanity, Storyblok, Contentful." },
  { id: "automation", title: "Automations", description: "Make, Zapier, n8n." },
];

const mvpHighlights = [
  {
    title: "Compose ton MVP",
    description: "Scope fonctionnel priorise avec ateliers express.",
    bullets: ["Audit idee", "Wireflows", "Roadmap 6-8 semaines"],
  },
  {
    title: "Pack Site + MVP",
    description: "Un brief unique pour la landing et le produit.",
    bullets: ["Landing + onboarding", "Kit UI commun", "Devis synchronises"],
  },
  {
    title: "Coaching produit",
    description: "Stand-up hebdo pour arbitrer rapidement.",
    bullets: ["Board Notion", "Checklist investisseurs", "Suivi KPI"],
  },
];

const configuratorSections = [
  { id: "brief-final", label: "Brief express" },
  { id: "mvp", label: "Pack MVP" },
  { id: "etape-1", label: "Etape 1", description: "Type de site" },
  { id: "etape-2", label: "Etape 2", description: "Vision" },
  { id: "etape-3", label: "Etape 3", description: "Style" },
  { id: "etape-4", label: "Etape 4", description: "Options" },
  { id: "etape-5", label: "Etape 5", description: "Recap" },
] as const;
function ConfiguratorFinalForm({ summary, features, integrations, ready }: FinalFormProps) {
  const [clientType, setClientType] = useState<"entreprise" | "particulier">("entreprise");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const summaryText = [
    `Type: ${summary.type}`,
    `Vision: ${summary.strategy}`,
    `Style: ${summary.mood}`,
    `Options: ${features.length ? features.join(", ") : "Aucune"}`,
    `Integrations: ${integrations.length ? integrations.join(", ") : "Aucune"}`,
  ].join("\n");

  const isSubmitting = status === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (clientType === "entreprise" && !companyName.trim()) {
      setStatus("error");
      setServerMessage("Ajoute le nom de la societe pour continuer.");
      return;
    }

    const payload: QuoteRequest = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      clientType,
      companyName: clientType === "entreprise" ? companyName.trim() || undefined : undefined,
      projectType: summary.type !== "-" ? summary.type : "Configurateur",
      goal: `Vision: ${summary.strategy} / Style: ${summary.mood}`,
      pages: features.length ? features : [summary.type !== "-" ? summary.type : "Configurateur"],
      mobilePlatforms: [],
      mobileFeatures: [],
      inspirations: undefined,
      budget: "A definir via configurateur",
      timeline: "A definir",
      message: notes ? `${notes.trim()}\n\n${summaryText}` : summaryText,
      storeSupport: undefined,
      techPreferences: undefined,
      projectFocus: "web",
      configurator: {
        siteType: summary.type,
        strategy: summary.strategy,
        mood: summary.mood,
        features,
        integrations,
      },
    };

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error();
      setStatus("success");
      setServerMessage("Demande envoyee. On revient vers toi sous 24h.");
      setCompanyName("");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage("Impossible d&apos;envoyer la demande. Ecris-nous sur hello@kah-digital.com.");
    }
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Validation</p>
        <h3 className="text-2xl font-semibold text-white">Finaliser ta demande</h3>
        <p className="text-white/70">Laisse tes coordonnees pour verrouiller le devis selon tes options.</p>
        {!ready && <p className="text-sm text-amber-300">Termine les etapes ci-dessus pour activer l&apos;envoi.</p>}
      </div>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">Statut *</label>
          <div className="flex gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="radio"
                name="clientType"
                value="entreprise"
                checked={clientType === "entreprise"}
                onChange={() => setClientType("entreprise")}
                className="h-4 w-4 rounded border-white/30 text-black focus:ring-white/70"
              />
              Entreprise
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-white/80">
              <input
                type="radio"
                name="clientType"
                value="particulier"
                checked={clientType === "particulier"}
                onChange={() => setClientType("particulier")}
                className="h-4 w-4 rounded border-white/30 text-black focus:ring-white/70"
              />
              Particulier
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">
            Nom de societe {clientType === "entreprise" ? "*" : "(optionnel)"}
          </label>
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder="Ex : Atelier Nova"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">Nom complet *</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder="Nom Prenom"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">Email *</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder="contact@entreprise.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-white/70">Telephone</label>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder="+33 6 00 00 00 00"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-sm text-white/70">Notes complementaires</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60"
            placeholder="Budget interne, contraintes, disponibilites..."
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting || !ready || !name || !email}
          >
            {isSubmitting ? "Envoi..." : "Envoyer la demande"}
          </button>
          {serverMessage && (
            <p className={`text-sm ${status === "error" ? "text-rose-200" : "text-emerald-200"}`}>{serverMessage}</p>
          )}
          {!ready && (
            <p className="text-xs text-white/60">Il manque des elements (type, vision ou style).</p>
          )}
        </div>
      </form>
    </div>
  );
}
type ToggleSetter = Dispatch<SetStateAction<string[]>>;

export default function ConfigurateurPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

  const toggleValue = (value: string, setter: ToggleSetter) => {
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const availableStrategies = useMemo(
    () => (selectedType ? strategyMap[selectedType] ?? [] : []),
    [selectedType],
  );

  const summary = useMemo<ConfigSummary>(() => {
    const typeLabel = selectedType ? siteTypes.find((item) => item.id === selectedType)?.title ?? selectedType : "-";
    const strategyLabel = selectedStrategy
      ? availableStrategies.find((item) => item.id === selectedStrategy)?.title ?? selectedStrategy
      : "-";
    const moodLabel = selectedMood ? moodOptions.find((item) => item.id === selectedMood)?.title ?? selectedMood : "-";
    return { type: typeLabel, strategy: strategyLabel, mood: moodLabel };
  }, [selectedType, selectedStrategy, selectedMood, availableStrategies]);

  const selectedFeatureLabels = useMemo(
    () => selectedFeatures.map((featureId) => featureOptions.find((item) => item.id === featureId)?.title ?? featureId),
    [selectedFeatures],
  );

  const selectedIntegrationLabels = useMemo(
    () =>
      selectedIntegrations.map(
        (integrationId) => integrationOptions.find((item) => item.id === integrationId)?.title ?? integrationId,
      ),
    [selectedIntegrations],
  );

  const stepStatus = [
    Boolean(selectedType),
    Boolean(selectedStrategy),
    Boolean(selectedMood),
    selectedFeatures.length > 0 || selectedIntegrations.length > 0,
  ];
  const completedSteps = stepStatus.filter(Boolean).length;
  const configuratorProgress = stepStatus.length ? completedSteps / stepStatus.length : 0;
  const timelineMessage =
    completedSteps === 0
      ? "Commence par choisir un format (site ou MVP)."
      : completedSteps === stepStatus.length
      ? "Brief complet pret pour le devis."
      : "Continue ta selection pour affiner ton brief hybride.";

  const isConfiguratorReady = summary.type !== "-" && summary.strategy !== "-" && summary.mood !== "-";

  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="flex-1 space-y-16">
        <section id="brief-final" className="section-shell space-y-6">
          <Reveal>
            <div className="accent-section">
              <div className="content px-6 py-10">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Configurateur</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Compose ton site ou ton MVP ideal</h1>
                <p className="mt-3 max-w-3xl text-white/70">
                  Choisis un type de site, affine les options marketing et produit, puis exporte un recap pour lancer un devis
                  site + MVP.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <Link
                    href="/"
                    className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    Retour a l&apos;accueil
                  </Link>
                  <Link
                    href="#etape-1"
                    className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    Aller aux etapes
                  </Link>
                  <Link
                    href="/devis"
                    className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-white/90"
                  >
                    Passer au devis classique
                  </Link>
                </div>
                <div className="mt-6 flex flex-col gap-4 text-sm text-white/70">
                  <div className="flex flex-wrap gap-2">
                    {['Etape 1 -> Type', 'Etape 2 -> Vision', 'Etape 3 -> Style', 'Etape 4 -> Options'].map((label, index) => (
                      <span
                        key={label}
                        className={`rounded-full border px-4 py-1 transition ${
                          stepStatus[index] ? 'border-white bg-white/20 text-white' : 'border-white/20'
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">{timelineMessage}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="mvp" className="section-shell space-y-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-white">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Pack MVP</p>
                <h2 className="mt-2 text-3xl font-semibold">Compose ton MVP ideal en parallele</h2>
                <p className="mt-4 text-white/70">
                  Tu veux tester une idee ou embarquer des investisseurs ? On transforme le configurateur en atelier express pour definir modules,
                  techno probable et roadmap sur 6 a 8 semaines.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-white/80">
                  {mvpHighlights[0].bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="text-white/40">-</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <Link href="#etape-1" className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-white/90">
                    Lancer mon brief MVP
                  </Link>
                  <Link
                    href="/devis"
                    className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    Planifier un call produit
                  </Link>
                </div>
              </div>
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/0 px-6 py-8 text-white/80">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Site + MVP</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Un fil conducteur unique</h3>
                <p className="mt-3">
                  On garde ce configurateur pour cadrer identite, pages marketing et options produit. Resultat: un brief coherant pour marketing,
                  produit et tech.
                </p>
                <div className="mt-5 grid gap-4 text-sm text-white">
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-4">
                    <p className="text-white/60">Livraison estimee</p>
                    <p className="text-2xl font-semibold text-white">6 a 8 semaines</p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-4">
                    <p className="text-white/60">Format</p>
                    <p className="text-2xl font-semibold text-white">Landing + MVP interactif</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {mvpHighlights.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-white/70">{item.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-white/40">-</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
        <section id="etape-1" className="section-shell space-y-6">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Etape 1</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Quel type de site veux-tu lancer ?</h2>
              </div>
              {selectedType && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType(null);
                    setSelectedStrategy(null);
                  }}
                  className="text-sm text-white/60 hover:text-white"
                >
                  Reinitialiser
                </button>
              )}
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {siteTypes.map((type) => {
              const isActive = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setSelectedType(type.id);
                    setSelectedStrategy(null);
                  }}
                  className={`rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                    isActive ? 'border-white bg-white/10 shadow-lg glow-card' : 'opacity-80 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <p className="text-xl font-semibold text-white">{type.title}</p>
                  <p className="mt-2 text-white/70">{type.summary}</p>
                  <ul className="mt-4 space-y-1 text-sm text-white/60">
                    {type.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </section>

        <section id="etape-2" className="section-shell space-y-6">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Etape 2</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Affinons la vision et le livrable</h2>
              <p className="mt-2 max-w-3xl text-white/70">Chaque bloc decrit le ton, les pages et les livrables inclus.</p>
            </div>
          </Reveal>
          {!selectedType && (
            <div className="rounded-3xl border border-dashed border-white/20 bg-black/30 p-6 text-white/60">
              Selectionne d&apos;abord un type de site.
            </div>
          )}
          {selectedType && (
            <div className="grid gap-5 md:grid-cols-3">
              {availableStrategies.map((strategy) => {
                const isActive = selectedStrategy === strategy.id;
                return (
                  <button
                    key={strategy.id}
                    type="button"
                    onClick={() => setSelectedStrategy(strategy.id)}
                    className={`rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                      isActive ? 'border-white bg-white/10 shadow-lg glow-card' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">{strategy.title}</p>
                    <p className="mt-2 text-white/70">{strategy.summary}</p>
                    <ul className="mt-3 space-y-1 text-sm text-white/60">
                      {strategy.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          )}
        </section>
        <section id="etape-3" className="section-shell space-y-6">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Etape 3</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Quel style visuel t&apos;inspire ?</h2>
              <p className="mt-2 max-w-3xl text-white/70">Chaque mood indique les palettes dominantes et le ressenti global.</p>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {moodOptions.map((mood) => {
              const isActive = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                    isActive ? 'border-white bg-white/10 shadow-lg glow-card' : 'opacity-80 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <p className="text-xl font-semibold text-white">{mood.title}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/50">{mood.palette}</p>
                  <p className="mt-3 text-white/70">{mood.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section id="etape-4" className="section-shell space-y-6">
          <Reveal>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Etape 4</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Fonctionnalites & integrations</h2>
                <p className="mt-2 max-w-2xl text-white/70">Selectionne ce dont tu as besoin pour eviter les surprises au devis.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedFeatures([]);
                  setSelectedIntegrations([]);
                }}
                className="text-sm text-white/60 hover:text-white"
              >
                Vider les options
              </button>
            </div>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">Fonctionnalites cles</p>
              {featureOptions.map((feature) => {
                const isActive = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggleValue(feature.id, setSelectedFeatures)}
                    className={`rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                      isActive ? 'border-white bg-white/10 shadow-lg glow-card' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">{feature.title}</p>
                    <p className="mt-2 text-white/70">{feature.description}</p>
                  </button>
                );
              })}
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">Integrations</p>
              {integrationOptions.map((integration) => {
                const isActive = selectedIntegrations.includes(integration.id);
                return (
                  <button
                    key={integration.id}
                    type="button"
                    onClick={() => toggleValue(integration.id, setSelectedIntegrations)}
                    className={`rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition ${
                      isActive ? 'border-white bg-white/10 shadow-lg glow-card' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">{integration.title}</p>
                    <p className="mt-2 text-white/70">{integration.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section id="etape-5" className="section-shell space-y-6">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Etape 5</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Recapitulatif</h2>
              <p className="mt-2 max-w-3xl text-white/70">Ce resume peut etre copie dans le formulaire de devis ou partage a ton equipe.</p>
            </div>
          </Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Type</p>
                <p className="mt-2 text-xl font-semibold">{summary.type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Vision</p>
                <p className="mt-2 text-xl font-semibold">{summary.strategy}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Style</p>
                <p className="mt-2 text-xl font-semibold">{summary.mood}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Fonctionnalites</p>
                <ul className="mt-3 space-y-2 text-white/80">
                  {selectedFeatures.length === 0 && <li>Aucune option pour l&apos;instant.</li>}
                  {selectedFeatures.map((featureId) => {
                    const option = featureOptions.find((item) => item.id === featureId);
                    return option ? <li key={featureId}>- {option.title}</li> : null;
                  })}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Integrations</p>
                <ul className="mt-3 space-y-2 text-white/80">
                  {selectedIntegrations.length === 0 && <li>Aucune integration definie.</li>}
                  {selectedIntegrations.map((integrationId) => {
                    const option = integrationOptions.find((item) => item.id === integrationId);
                    return option ? <li key={integrationId}>- {option.title}</li> : null;
                  })}
                </ul>
              </div>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-4">
                <ConfiguratorFinalForm
                  summary={summary}
                  features={selectedFeatureLabels}
                  integrations={selectedIntegrationLabels}
                  ready={isConfiguratorReady}
                />
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link
                    href="/cahier-des-charges.pdf"
                    className="rounded-full border border-white/40 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    Telecharger le cahier des charges
                  </Link>
                  <Link
                    href="/devis"
                    className="rounded-full border border-white/20 px-5 py-2 text-white/70 transition hover:border-white hover:text-white"
                  >
                    Acceder au devis classique
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <ConfiguratorPreview
                  summary={summary}
                  features={selectedFeatureLabels}
                  integrations={selectedIntegrationLabels}
                  ready={isConfiguratorReady}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-32 hidden lg:block lg:w-72">
        <StickyTimelineIndicator sections={configuratorSections} progressOverride={configuratorProgress} />
      </div>
    </div>
  );
}




