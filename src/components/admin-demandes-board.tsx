"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { QuoteRecord } from "@/lib/quote";
import { AdminMfaResetButton } from "@/components/admin-mfa-reset-button";
import { AdminSignOutButton } from "@/components/admin-signout-button";
import { brandContact } from "@/config/brand";

type AdminDemandesBoardProps = {
  initialItems: QuoteRecord[];
};

const feasibilityOptions = [
  { value: "pending", label: "À qualifier" },
  { value: "feasible", label: "Faisable" },
  { value: "blocked", label: "Non faisable" },
] as const;

const depositOptions = [
  { value: "none", label: "Non défini" },
  { value: "deposit", label: "Acompte validé" },
  { value: "servers", label: "Serveurs / outils réglés" },
] as const;

const pipelineOptions = [
  { value: "new", label: "Nouveau" },
  { value: "qualified", label: "Qualifie" },
  { value: "quote", label: "Devis envoye" },
  { value: "negotiation", label: "Negociation" },
  { value: "won", label: "Gagne" },
  { value: "lost", label: "Perdu" },
] as const;

type ItemStatus = {
  feasibility: (typeof feasibilityOptions)[number]["value"];
  deposit: (typeof depositOptions)[number]["value"];
};

type PipelineStatus = (typeof pipelineOptions)[number]["value"];

type AdminNote = {
  id: string;
  body: string;
  createdAt: string;
};

type AdminMeta = {
  pipeline: PipelineStatus;
  notes: AdminNote[];
};

const ADMIN_META_STORAGE_KEY = "kah-admin-meta-v1";

const createDefaultMeta = (): AdminMeta => ({
  pipeline: "new",
  notes: [],
});

const feasibilityBadges: Record<ItemStatus["feasibility"], string> = {
  pending: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  feasible: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  blocked: "bg-rose-100/15 text-rose-200 border border-rose-200/30",
};

const depositBadges: Record<ItemStatus["deposit"], string> = {
  none: "bg-white/10 text-white/70 border border-white/15",
  deposit: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  servers: "bg-purple-100/20 text-purple-100 border border-purple-200/40",
};

const pipelineBadges: Record<PipelineStatus, string> = {
  new: "bg-white/10 text-white/70 border border-white/15",
  qualified: "bg-amber-100/15 text-amber-200 border border-amber-200/30",
  quote: "bg-sky-100/15 text-sky-200 border border-sky-200/30",
  negotiation: "bg-purple-100/20 text-purple-100 border border-purple-200/40",
  won: "bg-emerald-100/15 text-emerald-200 border border-emerald-200/30",
  lost: "bg-rose-100/15 text-rose-200 border border-rose-200/30",
};

const feasibilityLabels: Record<ItemStatus["feasibility"], string> = {
  pending: "À qualifier",
  feasible: "Faisable",
  blocked: "Non faisable",
};

const depositLabels: Record<ItemStatus["deposit"], string> = {
  none: "Statut paiement",
  deposit: "Acompte validé",
  servers: "Infra en place",
};

const pipelineLabels: Record<PipelineStatus, string> = {
  new: "Nouveau",
  qualified: "Qualifie",
  quote: "Devis envoye",
  negotiation: "Negociation",
  won: "Gagne",
  lost: "Perdu",
};

type ReplyTemplateId = "feasible" | "need-info" | "budget-low" | "not-feasible" | "changes";
type ReplyVariant = "short" | "full";
type ProjectReplyKey =
  | "auto"
  | "none"
  | "general"
  | "landing"
  | "vitrine"
  | "ecommerce"
  | "marketplace"
  | "mvp"
  | "saas"
  | "mobile"
  | "portal"
  | "brand"
  | "ai"
  | "automation"
  | "integration"
  | "data"
  | "seo"
  | "fintech"
  | "health"
  | "real-estate"
  | "education"
  | "tourism"
  | "luxury"
  | "ngo";

type ReplyContext = {
  price?: string;
  timeline?: string;
  notes?: string;
  variant: ReplyVariant;
  projectSnippet?: string;
};

type ReplyTemplate = {
  id: ReplyTemplateId;
  label: string;
  subject: (item: QuoteRecord) => string;
  body: (item: QuoteRecord, ctx: ReplyContext) => string;
};

type ProjectReplyProfile = {
  key: Exclude<ProjectReplyKey, "auto" | "none">;
  label: string;
  match: string[];
  short: string;
  full: string;
};

const signatureLines = ["--", "Kah-Digital", brandContact.email, brandContact.phone].filter(Boolean);
const signatureBlock = `\n\n${signatureLines.join("\n")}`;

const getGreeting = (name?: string) => {
  const trimmed = name?.trim();
  if (!trimmed) return "Bonjour,";
  const first = trimmed.split(" ")[0];
  return first ? `Bonjour ${first},` : "Bonjour,";
};

const cleanValue = (value?: string) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "";
};

const pickValue = (primary?: string, fallback?: string, defaultValue = "à définir") => {
  const first = cleanValue(primary);
  if (first) return first;
  const second = cleanValue(fallback);
  if (second) return second;
  return defaultValue;
};

const normalizeText = (value?: string) =>
  (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const matchesAny = (haystack: string, needles: string[]) => needles.some((needle) => haystack.includes(needle));

const formatList = (value?: unknown) => {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "-";
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : "-";
  }
  return "-";
};

const formatCsvList = (value?: unknown) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
};

const projectReplyProfiles: ProjectReplyProfile[] = [
  {
    key: "landing",
    label: "Landing / conversion",
    match: ["landing", "conversion", "page de vente", "acquisition", "ads"],
    short: "- Copywriting, sections cle et CTA\n- Tracking de base (pixel + analytics)",
    full:
      "- Positionnement + promesse\n- Structure de page, copywriting, visuels\n- Preuves sociales + CTA\n- Tracking, suivi des conversions et variantes",
  },
  {
    key: "vitrine",
    label: "Site vitrine",
    match: ["vitrine", "site web", "site internet", "presentation", "corporate"],
    short: "- Sections essentielles (offre, preuves, contact)\n- SEO de base + analytics",
    full:
      "- Architecture simple et lisible\n- Design premium + contenu clair\n- SEO de base, analytics et formulaire",
  },
  {
    key: "ecommerce",
    label: "E-commerce / boutique",
    match: ["e-commerce", "ecommerce", "boutique", "shop", "store"],
    short: "- Catalogue, fiches produits, paiement\n- Tunnel optimise + emails transactionnels",
    full:
      "- Catalogue, fiches, filtres, paiement\n- Tunnel optimise, emails, tracking\n- Connexion logistique si besoin",
  },
  {
    key: "marketplace",
    label: "Marketplace",
    match: ["marketplace", "place de marche", "multi-vendeurs", "multi vendeurs"],
    short: "- Catalogue multi-offres + recherche\n- Paiement + commission",
    full:
      "- Onboarding vendeurs + catalogue\n- Recherche, filtres, paiement\n- Commission, back-office et moderation",
  },
  {
    key: "mvp",
    label: "MVP / prototype",
    match: ["mvp", "prototype", "poc", "preuve de concept"],
    short: "- Priorisation des must-have\n- Build v1 rapide + tests",
    full:
      "- Atelier de cadrage\n- Parcours cles + UI kit\n- Build v1, tests et iteration",
  },
  {
    key: "saas",
    label: "SaaS / plateforme",
    match: ["saas", "plateforme", "dashboard", "back office", "back-office"],
    short: "- Auth, roles, dashboard\n- Onboarding + analytics",
    full:
      "- Auth + roles + permissions\n- Dashboard, data views, exports\n- Onboarding, notifications et analytics",
  },
  {
    key: "mobile",
    label: "App mobile",
    match: ["mobile", "ios", "android", "application mobile"],
    short: "- Parcours mobile + onboarding\n- Publication stores",
    full:
      "- iOS/Android, parcours et UI\n- Auth, onboarding, analytics\n- Assets store + process de publication",
  },
  {
    key: "portal",
    label: "Portail membres",
    match: ["portail", "membre", "espace client", "extranet"],
    short: "- Connexion securisee + espace client\n- Permissions par role",
    full:
      "- Authentification, roles, permissions\n- Espace client, documents, dashboard\n- Suivi et notifications",
  },
  {
    key: "brand",
    label: "Identite / branding",
    match: ["branding", "identite", "logo", "charte"],
    short: "- Logo + palette + typographies\n- Declinaisons digitales",
    full:
      "- Logo, palette, typographies\n- Guidelines et declinaisons\n- Livraison des sources et exports",
  },
  {
    key: "ai",
    label: "IA / assistants",
    match: ["ia", "ai", "intelligence artificielle", "assistant", "chatbot", "agent", "llm"],
    short: "- Cas d'usage IA + prompt\n- Integration API + garde-fous",
    full:
      "- Cadrage des cas d'usage IA\n- Integration API (OpenAI/Claude)\n- Securite, garde-fous et suivi",
  },
  {
    key: "automation",
    label: "Automatisation",
    match: ["automation", "automatisation", "workflow", "zapier", "make", "n8n", "no-code", "nocode"],
    short: "- Cartographie process + automatisations\n- Outils Zapier/Make/n8n",
    full:
      "- Audit process + quick wins\n- Workflows automatises\n- Documentation et monitoring",
  },
  {
    key: "integration",
    label: "Integration / API",
    match: ["integration", "integrations", "api", "webhook", "sync", "synchronisation", "connecteur", "crm", "erp"],
    short: "- Connexions API + sync\n- Webhooks + monitoring",
    full:
      "- Cartographie des systemes\n- API, webhooks, sync bidirectionnelle\n- Journalisation et alerting",
  },
  {
    key: "data",
    label: "Data / BI",
    match: ["data", "bi", "kpi", "reporting", "analytics", "tableau de bord"],
    short: "- Tableaux de bord + KPIs\n- Sources unifiees",
    full:
      "- Modele de donnees + sources\n- Dashboards & reporting\n- Alertes et exports",
  },
  {
    key: "seo",
    label: "SEO / contenu",
    match: ["seo", "referencement", "contenu", "content", "blog", "copywriting"],
    short: "- SEO technique + contenu\n- Pages optimisees",
    full:
      "- Audit SEO + plan contenu\n- Optimisations techniques\n- Mesure et iterations",
  },
  {
    key: "fintech",
    label: "Fintech",
    match: ["fintech", "finance", "banque", "paiement", "payment", "kpi financiers"],
    short: "- Parcours securise + KYC/AML\n- Tableaux de bord financiers",
    full:
      "- Parcours securise, KYC/AML si besoin\n- Tableaux de bord, reporting, alertes\n- Conformite, audit et securite",
  },
  {
    key: "health",
    label: "Santé",
    match: ["sante", "medecin", "clinique", "medical", "paramedical", "telemedecine"],
    short: "- Parcours patient rassurant\n- RDV / formulaires securises",
    full:
      "- Parcours patient, prise de RDV, formulaires\n- Contenus conformes, securite et accessibilite\n- Suivi, consentement et analytics",
  },
  {
    key: "real-estate",
    label: "Immobilier",
    match: ["immobilier", "agence", "annonces", "location", "vente", "programme neuf"],
    short: "- Catalogue biens + filtres\n- Mise en relation rapide",
    full:
      "- Catalogue biens, filtres, cartes\n- Formulaires qualifiants + alertes\n- SEO local et conversion",
  },
  {
    key: "education",
    label: "Éducation",
    match: ["education", "formation", "cours", "elearning", "e-learning", "ecole", "academy"],
    short: "- Parcours inscription + contenus\n- Espace apprenant clair",
    full:
      "- Parcours inscription, contenus et quizz\n- Espace apprenant + suivi\n- Certification, analytics et emailing",
  },
  {
    key: "tourism",
    label: "Tourisme",
    match: ["tourisme", "hotel", "voyage", "reservation", "booking", "experience"],
    short: "- Parcours reservation simple\n- Mise en valeur des offres",
    full:
      "- Mise en valeur des offres + visuels\n- Reservation, paiements et avis\n- SEO local et conversion",
  },
  {
    key: "luxury",
    label: "Luxe",
    match: ["luxe", "premium", "haut de gamme", "haute couture", "joaillerie"],
    short: "- Experience haut de gamme\n- Visuels et narration premium",
    full:
      "- Direction artistique premium\n- Storytelling, visuels, contenus\n- Parcours conversion sans friction",
  },
  {
    key: "ngo",
    label: "ONG / associations",
    match: ["ong", "association", "caritatif", "don", "donation", "fondation", "humanitaire"],
    short: "- Parcours don fluide\n- Transparence et impact",
    full:
      "- Parcours don simple + recurrent\n- Pages impact, transparence\n- CRM/collecte et analytics",
  },
  {
    key: "general",
    label: "General",
    match: [],
    short: "- Cadrage du scope et des livrables\n- Planning et prochaines etapes",
    full:
      "- Cadrage du scope, livrables et priorites\n- Planning, jalons et prochaines etapes",
  },
];

const getProjectProfileKey = (item: QuoteRecord): Exclude<ProjectReplyKey, "auto" | "none"> => {
  if (item.projectFocus === "mobile") return "mobile";
  const source = normalizeText(
    [
      item.projectType,
      item.goal,
      item.message,
      item.configurator?.siteType,
      item.configurator?.strategy,
    ]
      .filter(Boolean)
      .join(" ")
  );

  for (const profile of projectReplyProfiles) {
    if (profile.key === "general") continue;
    const matches = profile.match.map((term) => normalizeText(term));
    if (matchesAny(source, matches)) {
      return profile.key;
    }
  }

  return "general";
};

const replyTemplates: ReplyTemplate[] = [
  {
    id: "feasible",
    label: "Faisable",
    subject: (item) => `Votre demande Kah-Digital - ${item.projectType ?? "projet"}`,
    body: (item, ctx) => {
      const greeting = getGreeting(item.name);
      const projectLabel = item.projectType ?? "votre projet";
      const budget = pickValue(ctx.price, item.budget, "à définir");
      const timeline = pickValue(ctx.timeline, item.timeline, "à confirmer");
      const notes = cleanValue(ctx.notes);
      const notesBlock = notes ? `\n\nNotes:\n${notes}` : "";
      const projectBlock = ctx.projectSnippet ? `\n\nPoints projet:\n${ctx.projectSnippet}` : "";
      const isShort = ctx.variant === "short";
      const intro = isShort
        ? `Merci pour votre demande concernant ${projectLabel}.\nLe projet est faisable.`
        : `Merci pour votre demande concernant ${projectLabel}.\nNous avons bien pris connaissance de votre besoin et le projet est faisable.`;
      const projection = `\n\nPremière projection:\n- Budget: ${budget}\n- Délai: ${timeline}`;
      const next = isShort
        ? "\n\nSi cela vous convient, répondez à ce mail avec vos disponibilités."
        : "\n\nSi cela vous convient, je propose un court call pour verrouiller le périmètre.";
      return `${greeting}\n\n${intro}${projectBlock}${projection}${notesBlock}${next}${signatureBlock}`;
    },
  },
  {
    id: "need-info",
    label: "Infos manquantes",
    subject: () => "Votre demande Kah-Digital - infos manquantes",
    body: (item, ctx) => {
      const greeting = getGreeting(item.name);
      const projectLabel = item.projectType ?? "votre projet";
      const projectBlock = ctx.projectSnippet ? `\n\nPoints projet:\n${ctx.projectSnippet}` : "";
      const isShort = ctx.variant === "short";
      const intro = isShort
        ? "Pour avancer, il me manque quelques informations."
        : "Pour pouvoir vous répondre précisément, il me manque quelques informations.";
      const next = isShort
        ? "\n\nRépondez directement à ce mail, je reviens vers vous rapidement."
        : "\n\nDès réception, je reviens vers vous avec une estimation claire.";
      return `${greeting}\n\nMerci pour votre demande concernant ${projectLabel}.\n${intro}${projectBlock}\n\nMerci de préciser:\n- Objectif principal et priorités\n- Pages ou écrans attendus\n- Budget cible et délai\n- Exemples ou inspirations${next}${signatureBlock}`;
    },
  },
  {
    id: "budget-low",
    label: "Budget trop bas",
    subject: () => "Votre demande Kah-Digital - budget à ajuster",
    body: (item, ctx) => {
      const greeting = getGreeting(item.name);
      const projectLabel = item.projectType ?? "votre projet";
      const budget = pickValue(ctx.price, "", "budget à définir");
      const notes = cleanValue(ctx.notes);
      const notesBlock = notes ? `\n\nAjustements possibles:\n${notes}` : "";
      const projectBlock = ctx.projectSnippet ? `\n\nPoints projet:\n${ctx.projectSnippet}` : "";
      const isShort = ctx.variant === "short";
      const intro = isShort
        ? "Le budget actuel semble trop bas pour couvrir l'ensemble du scope."
        : "Le budget actuel semble trop bas pour couvrir l'ensemble du scope au niveau de finition attendu.";
      const options = isShort
        ? `\n\nOn peut:\n- Réduire le périmètre\n- Partir sur un budget cible à partir de ${budget}`
        : `\n\nOn peut:\n- Réduire le périmètre\n- Prioriser un lot 1 rapide\n- Partir sur un budget cible à partir de ${budget}`;
      const next = isShort ? "\n\nDites-moi ce qui vous convient." : "\n\nDites-moi ce qui vous convient, je vous propose une version ajustée.";
      return `${greeting}\n\nMerci pour votre demande concernant ${projectLabel}.\n${intro}${projectBlock}${options}${notesBlock}${next}${signatureBlock}`;
    },
  },
  {
    id: "changes",
    label: "Ajustements proposés",
    subject: () => "Votre demande Kah-Digital - proposition d'ajustement",
    body: (item, ctx) => {
      const greeting = getGreeting(item.name);
      const projectLabel = item.projectType ?? "votre projet";
      const timeline = pickValue(ctx.timeline, item.timeline, "à confirmer");
      const notes = cleanValue(ctx.notes);
      const projectBlock = ctx.projectSnippet ? `\n\nPoints projet:\n${ctx.projectSnippet}` : "";
      const isShort = ctx.variant === "short";
      const notesBlock = notes
        ? `\n\nAjustements proposés:\n${notes}`
        : "\n\nAjustements proposés:\n- Simplifier le périmètre\n- Livrer par lots\n- Prioriser les fonctionnalités clés";
      const intro = isShort
        ? `Pour respecter le budget et le délai (${timeline}), voici une proposition:`
        : `Pour respecter le budget et le délai (${timeline}), voici une proposition d'ajustement:`;
      const next = isShort
        ? "\n\nSi cela vous convient, je formalise un devis ajusté."
        : "\n\nSi cela vous convient, je formalise un devis ajusté et un planning détaillé.";
      return `${greeting}\n\nMerci pour votre demande concernant ${projectLabel}.${projectBlock}\n\n${intro}${notesBlock}${next}${signatureBlock}`;
    },
  },
  {
    id: "not-feasible",
    label: "Non faisable",
    subject: () => "Votre demande Kah-Digital - retour",
    body: (item, ctx) => {
      const greeting = getGreeting(item.name);
      const notes = cleanValue(ctx.notes);
      const notesBlock = notes ? `\n\nNote:\n${notes}` : "";
      const isShort = ctx.variant === "short";
      const response = isShort
        ? "Après analyse, je ne peux pas prendre ce projet pour le moment."
        : "Après analyse, je ne peux pas prendre ce projet pour le moment. Le contexte ne correspond pas à mon planning actuel.";
      const next = isShort
        ? "\n\nSi vous le souhaitez, je peux recommander des pistes."
        : "\n\nSi vous le souhaitez, je peux recommander des pistes ou partenaires adaptés.";
      return `${greeting}\n\nMerci pour votre demande. ${response}${notesBlock}${next}${signatureBlock}`;
    },
  },
];

export function AdminDemandesBoard({ initialItems }: AdminDemandesBoardProps) {
  const [items, setItems] = useState<QuoteRecord[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [mfaStatus, setMfaStatus] = useState<"checking" | "active" | "inactive">("checking");
  const [searchTerm, setSearchTerm] = useState("");
  const [feasibilityFilter, setFeasibilityFilter] = useState<ItemStatus["feasibility"] | "all">("all");
  const [depositFilter, setDepositFilter] = useState<ItemStatus["deposit"] | "all">("all");
  const [pipelineFilter, setPipelineFilter] = useState<PipelineStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "configurator" | "classic">("all");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [replyTargetKey, setReplyTargetKey] = useState<string | null>(null);
  const [replyTemplateId, setReplyTemplateId] = useState<ReplyTemplateId>("feasible");
  const [replyVariant, setReplyVariant] = useState<ReplyVariant>("full");
  const [replyProjectKey, setReplyProjectKey] = useState<ProjectReplyKey>("auto");
  const [replyPrice, setReplyPrice] = useState("");
  const [replyTimeline, setReplyTimeline] = useState("");
  const [replyNotes, setReplyNotes] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [replySuccess, setReplySuccess] = useState("");
  const [adminMeta, setAdminMeta] = useState<Record<string, AdminMeta>>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(ADMIN_META_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, AdminMeta>;
      setAdminMeta(parsed ?? {});
    } catch (error) {
      console.warn("[admin] Failed to read local admin meta", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(ADMIN_META_STORAGE_KEY, JSON.stringify(adminMeta));
    } catch (error) {
      console.warn("[admin] Failed to persist local admin meta", error);
    }
  }, [adminMeta]);

  useEffect(() => {
    let active = true;

    const loadMfa = async () => {
      try {
        const response = await fetch("/api/admin/auth/status", { credentials: "include" });
        if (!response.ok) {
          if (active) setMfaStatus("inactive");
          return;
        }
        const data = await response.json().catch(() => ({}));
        if (!active) return;
        setMfaStatus(data?.isAdmin && data?.mfaActive ? "active" : "inactive");
      } catch {
        if (active) setMfaStatus("inactive");
      }
    };

    void loadMfa();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/quotes", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (!ignore && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const interval = setInterval(load, 60000);
    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  const getItemKey = (item: QuoteRecord) => {
    if (item.id) return item.id;
    const email = item.email?.trim() || item.name?.trim() || "unknown";
    return `${item.submittedAt}-${email}`;
  };

  const resolvedStatus = useMemo(() => {
    const record: Record<string, ItemStatus> = {};
    items.forEach((item) => {
      const key = getItemKey(item);
      record[key] = {
        feasibility: item.feasibility ?? "pending",
        deposit: item.deposit ?? "none",
      };
    });
    return record;
  }, [items]);

  const insights = useMemo(() => {
    const feasibility = { pending: 0, feasible: 0, blocked: 0 };
    const deposit = { none: 0, deposit: 0, servers: 0 };
    items.forEach((item) => {
      const status = resolvedStatus[getItemKey(item)];
      if (!status) return;
      feasibility[status.feasibility] += 1;
      deposit[status.deposit] += 1;
    });

    return {
      total: items.length,
      feasibility,
      deposit,
    };
  }, [items, resolvedStatus]);

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const status = resolvedStatus[getItemKey(item)];
      const pipeline = getMetaForKey(getItemKey(item)).pipeline;
      if (feasibilityFilter !== "all" && status?.feasibility !== feasibilityFilter) {
        return false;
      }
      if (depositFilter !== "all" && status?.deposit !== depositFilter) {
        return false;
      }
      if (pipelineFilter !== "all" && pipeline !== pipelineFilter) {
        return false;
      }
      if (sourceFilter === "configurator" && !item.configurator) {
        return false;
      }
      if (sourceFilter === "classic" && item.configurator) {
        return false;
      }

      if (!query) return true;

      const haystack = [
        item.name,
        item.email,
        item.phone,
        item.companyName,
        item.projectType,
        item.goal,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [items, resolvedStatus, adminMeta, searchTerm, feasibilityFilter, depositFilter, pipelineFilter, sourceFilter]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    sorted.sort((a, b) => {
      const aTime = Date.parse(a.submittedAt) || 0;
      const bTime = Date.parse(b.submittedAt) || 0;
      return sortOrder === "recent" ? bTime - aTime : aTime - bTime;
    });
    return sorted;
  }, [filteredItems, sortOrder]);

  const kpis = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = dayMs * 7;
    const monthMs = dayMs * 30;
    let last24h = 0;
    let last7d = 0;
    let last30d = 0;
    let webCount = 0;
    let mobileCount = 0;
    let configuratorCount = 0;

    filteredItems.forEach((item) => {
      const submittedAtMs = Date.parse(item.submittedAt);
      if (!Number.isNaN(submittedAtMs)) {
        const delta = now - submittedAtMs;
        if (delta <= dayMs) last24h += 1;
        if (delta <= weekMs) last7d += 1;
        if (delta <= monthMs) last30d += 1;
      }

      const focus = item.projectFocus ?? "web";
      if (focus === "mobile") {
        mobileCount += 1;
      } else {
        webCount += 1;
      }

      if (item.configurator) {
        configuratorCount += 1;
      }
    });

    return {
      last24h,
      last7d,
      last30d,
      webCount,
      mobileCount,
      configuratorCount,
      classicCount: Math.max(0, filteredItems.length - configuratorCount),
    };
  }, [filteredItems]);

  const updateStatus = async (item: QuoteRecord, patch: Partial<ItemStatus>) => {
    const key = getItemKey(item);
    const current = resolvedStatus[key] ?? { feasibility: "pending", deposit: "none" };
    const nextStatus = { ...current, ...patch };

    setItems((prev) =>
      prev.map((entry) => (getItemKey(entry) === key ? { ...entry, ...nextStatus } : entry))
    );
    setSaveError("");

    try {
      const response = await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id ?? null,
          submittedAt: item.submittedAt,
          ...nextStatus,
        }),
      });
      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      setSaveError("Impossible d'enregistrer le statut.");
      setItems((prev) =>
        prev.map((entry) => (getItemKey(entry) === key ? { ...entry, ...current } : entry))
      );
    }
  };

  function getMetaForKey(key: string) {
    return adminMeta[key] ?? createDefaultMeta();
  }

  const addHistoryEntry = (key: string, body: string) => {
    const trimmed = body.trim();
    if (!trimmed) return;
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      body: trimmed,
      createdAt: new Date().toISOString(),
    };

    setAdminMeta((prev) => {
      const current = prev[key] ?? createDefaultMeta();
      return {
        ...prev,
        [key]: {
          ...current,
          notes: [entry, ...(current.notes ?? [])],
        },
      };
    });
  };

  const updatePipeline = (key: string, nextPipeline: PipelineStatus) => {
    setAdminMeta((prev) => {
      const current = prev[key] ?? createDefaultMeta();
      if (current.pipeline === nextPipeline) return prev;
      const historyEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        body: `Pipeline -> ${pipelineLabels[nextPipeline]}`,
        createdAt: new Date().toISOString(),
      };
      return {
        ...prev,
        [key]: {
          ...current,
          pipeline: nextPipeline,
          notes: [historyEntry, ...(current.notes ?? [])],
        },
      };
    });
  };

  const addNote = (key: string) => {
    const draft = noteDrafts[key]?.trim();
    if (!draft) return;
    addHistoryEntry(key, draft);
    setNoteDrafts((prev) => ({ ...prev, [key]: "" }));
  };

  const exportCsv = (records: QuoteRecord[], label: string) => {
    if (typeof window === "undefined") return;
    if (records.length === 0) return;

    const escapeValue = (value: string) => `"${value.replace(/"/g, "\"\"")}"`;
    const header = [
      "submittedAt",
      "name",
      "email",
      "phone",
      "clientType",
      "companyName",
      "projectType",
      "budget",
      "timeline",
      "projectFocus",
      "goal",
      "pages",
      "aiModules",
      "mobilePlatforms",
      "mobileFeatures",
      "storeSupport",
      "techPreferences",
      "inspirations",
      "message",
      "feasibility",
      "deposit",
      "pipeline",
    ];

    const rows = records.map((item) => {
      const status = resolvedStatus[getItemKey(item)];
      const pipeline = getMetaForKey(getItemKey(item)).pipeline;
      const values = [
        item.submittedAt,
        item.name ?? "",
        item.email ?? "",
        item.phone ?? "",
        item.clientType ?? "",
        item.companyName ?? "",
        item.projectType ?? "",
        item.budget ?? "",
        item.timeline ?? "",
        item.projectFocus ?? "",
        item.goal ?? "",
        formatCsvList(item.pages),
        formatCsvList(item.aiModules),
        formatCsvList(item.mobilePlatforms),
        formatCsvList(item.mobileFeatures),
        item.storeSupport ?? "",
        item.techPreferences ?? "",
        item.inspirations ?? "",
        item.message ?? "",
        status?.feasibility ?? "pending",
        status?.deposit ?? "none",
        pipeline,
      ];

      return values.map((value) => escapeValue(String(value))).join(",");
    });

    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kah-digital-demandes-${label}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const openReply = (item: QuoteRecord) => {
    const key = getItemKey(item);
    if (replyTargetKey === key) {
      setReplyTargetKey(null);
      return;
    }
    setReplyTargetKey(key);
    setReplyTemplateId("feasible");
    setReplyVariant("full");
    setReplyProjectKey("auto");
    setReplyPrice(item.budget ?? "");
    setReplyTimeline(item.timeline ?? "");
    setReplyNotes("");
    setReplyError("");
    setReplySuccess("");
  };

  const sendReply = async (item: QuoteRecord) => {
    const email = item.email?.trim();
    if (!email) {
      setReplyError("Email manquant pour cette demande.");
      setReplySuccess("");
      return;
    }

    const template = replyTemplates.find((entry) => entry.id === replyTemplateId) ?? replyTemplates[0];
    const subject = template.subject(item);
    const autoProjectKey = getProjectProfileKey(item);
    const resolvedProjectKey =
      replyProjectKey === "auto" ? autoProjectKey : (replyProjectKey as Exclude<ProjectReplyKey, "auto" | "none">);
    const projectProfile =
      replyProjectKey === "none"
        ? null
        : projectReplyProfiles.find((profile) => profile.key === resolvedProjectKey) ??
          projectReplyProfiles[projectReplyProfiles.length - 1];
    const projectSnippet =
      replyProjectKey === "none" ? undefined : replyVariant === "short" ? projectProfile?.short : projectProfile?.full;
    const body = template.body(item, {
      price: replyPrice,
      timeline: replyTimeline,
      notes: replyNotes,
      variant: replyVariant,
      projectSnippet,
    });

    setReplySending(true);
    setReplyError("");
    setReplySuccess("");

    try {
      const response = await fetch("/api/admin/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ to: email, subject, body }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "Erreur d'envoi");
      }

      setReplySuccess("Réponse envoyée.");
    } catch (error) {
      console.error(error);
      setReplyError("Erreur d'envoi.");
    } finally {
      setReplySending(false);
    }
  };

  const focusTotal = kpis.webCount + kpis.mobileCount;
  const focusWebPct = focusTotal ? Math.round((kpis.webCount / focusTotal) * 100) : 0;
  const focusMobilePct = focusTotal ? 100 - focusWebPct : 0;
  const sourceTotal = kpis.configuratorCount + kpis.classicCount;
  const configuratorPct = sourceTotal ? Math.round((kpis.configuratorCount / sourceTotal) * 100) : 0;
  const classicPct = sourceTotal ? 100 - configuratorPct : 0;
  const activityMax = Math.max(kpis.last24h, kpis.last7d, kpis.last30d, 1);
  const activityBars = [
    { label: "24h", value: kpis.last24h },
    { label: "7j", value: kpis.last7d },
    { label: "30j", value: kpis.last30d },
  ];

  const focusBars = [
    { label: "Web", value: kpis.webCount },
    { label: "Mobile", value: kpis.mobileCount },
    { label: "Config", value: kpis.configuratorCount },
    { label: "Devis", value: kpis.classicCount },
  ];
  const focusMax = Math.max(...focusBars.map((bar) => bar.value), 1);

  const dailySeries = useMemo(() => {
    const days = 30;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const buckets = Array.from({ length: days }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (days - 1 - index));
      return {
        date,
        key: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
        count: 0,
      };
    });

    const indexByKey = new Map(buckets.map((bucket, index) => [bucket.key, index]));

    filteredItems.forEach((item) => {
      const submittedAt = new Date(item.submittedAt);
      if (Number.isNaN(submittedAt.getTime())) return;
      submittedAt.setHours(0, 0, 0, 0);
      const key = submittedAt.toISOString().slice(0, 10);
      const bucketIndex = indexByKey.get(key);
      if (bucketIndex === undefined) return;
      buckets[bucketIndex].count += 1;
    });

    return buckets;
  }, [filteredItems]);

  const seriesMax = Math.max(1, ...dailySeries.map((entry) => entry.count));
  const sparklinePoints = dailySeries
    .map((entry, index) => {
      const x = dailySeries.length === 1 ? 0 : (index / (dailySeries.length - 1)) * 100;
      const y = 100 - (entry.count / seriesMax) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  const hasData = filteredItems.length > 0;
  const sparklineStartLabel = dailySeries[0]?.label ?? "";
  const sparklineEndLabel = dailySeries.at(-1)?.label ?? "";

  return (
    <div className="section-shell space-y-10">
      <motion.div
        className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="premium-card rounded-[32px] border border-white/15 bg-gradient-to-br from-white/5 to-white/0 p-8 text-white shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Admin</p>
            {mfaStatus !== "checking" && (
              <span
                className={`rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] ${
                  mfaStatus === "active"
                    ? "border-emerald-200/40 bg-emerald-100/10 text-emerald-100"
                    : "border-amber-200/40 bg-amber-100/10 text-amber-100"
                }`}
              >
                {mfaStatus === "active" ? "MFA actif" : "MFA à activer"}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-4xl font-semibold">Demandes reçues</h1>
          <p className="mt-3 text-white/70 max-w-2xl">
            Vue pipeline des demandes issues du configurateur + devis classique. Les badges ci-dessous sont locaux pour qualifier
            rapidement avant de pousser l&apos;info vers Notion, Airtable ou ton CRM.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
            >
              ← Accueil
            </Link>
            <Link
              href="/configurateur"
              className="rounded-full border border-white/20 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
            >
              Configurateur
            </Link>
            <Link
              href="/devis"
              className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200"
            >
              Devis classique
            </Link>
            <AdminSignOutButton />
            <AdminMfaResetButton />
          </div>
          <div className="mt-6 grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-[1.2fr,1fr,1fr,1fr,1fr,1fr]">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Recherche (nom, email, société)"
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            />
            <select
              value={feasibilityFilter}
              onChange={(event) =>
                setFeasibilityFilter(event.target.value as ItemStatus["feasibility"] | "all")
              }
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="all">Toutes faisabilites</option>
              {feasibilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={depositFilter}
              onChange={(event) => setDepositFilter(event.target.value as ItemStatus["deposit"] | "all")}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="all">Tous paiements</option>
              {depositOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={pipelineFilter}
              onChange={(event) => setPipelineFilter(event.target.value as PipelineStatus | "all")}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="all">Tous pipelines</option>
              {pipelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value as "all" | "configurator" | "classic")}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="all">Toutes sources</option>
              <option value="configurator">Configurateur</option>
              <option value="classic">Devis</option>
            </select>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as "recent" | "oldest")}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="recent">Tri : recents</option>
              <option value="oldest">Tri : anciens</option>
            </select>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setFeasibilityFilter("all");
                setDepositFilter("all");
                setPipelineFilter("all");
                setSourceFilter("all");
                setSortOrder("recent");
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-[0.65rem] font-semibold text-white/70 transition hover:border-white hover:text-white"
            >
              Reset filtres
            </button>
            <button
              type="button"
              onClick={() => exportCsv(filteredItems, "filtre")}
              className="rounded-full border border-white/20 px-4 py-2 text-[0.65rem] font-semibold text-white/70 transition hover:border-white hover:text-white"
            >
              Export CSV (filtre)
            </button>
            <button
              type="button"
              onClick={() => exportCsv(items, "toutes")}
              className="rounded-full border border-white/20 px-4 py-2 text-[0.65rem] font-semibold text-white/70 transition hover:border-white hover:text-white"
            >
              Export CSV (tout)
            </button>
            <span>
              Affiche {filteredItems.length} / {items.length}
            </span>
            <span>Rechargement auto toutes les 60s</span>
          </div>
          {loading && <p className="mt-2 text-sm text-white/50">Mise à jour en cours...</p>}
          {saveError && <p className="mt-2 text-sm text-rose-200">{saveError}</p>}
        </div>
        <div className="premium-card rounded-[32px] border border-white/10 bg-white/5 p-1">
          <div className="rounded-[28px] bg-black/70 p-4">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0c0f2c]/70 via-black/10 to-[#1f1244]/70" />
              <Image
                src="/og-kah-digital.png"
                alt="Aperçu visuel admin"
                width={640}
                height={360}
                className="relative h-44 w-full object-cover opacity-85 sm:h-52"
                priority={false}
              />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/70 backdrop-blur">
                <Image src="/favicon.svg" alt="Kah-Digital" width={16} height={16} />
                Dashboard
              </div>
            </div>
            <div className="mt-5 grid gap-4 text-xs text-white/70 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/50">Faisables</p>
                <p className="mt-1 text-2xl font-semibold text-white">{insights.feasibility.feasible}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-white/50">À qualifier</p>
                <p className="mt-1 text-2xl font-semibold text-white">{insights.feasibility.pending}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Demandes</p>
          <p className="mt-2 text-3xl font-semibold">{insights.total}</p>
          <p className="text-sm text-white/60">total reçues</p>
        </div>
        <div className="premium-card rounded-3xl border border-amber-200/30 bg-amber-100/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">À qualifier</p>
          <p className="mt-2 text-3xl font-semibold text-amber-100">{insights.feasibility.pending}</p>
          <p className="text-sm text-white/60">en attente de tri</p>
        </div>
        <div className="premium-card rounded-3xl border border-emerald-200/30 bg-emerald-100/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Faisables</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-100">{insights.feasibility.feasible}</p>
          <p className="text-sm text-white/60">validées</p>
        </div>
        <div className="premium-card rounded-3xl border border-sky-200/30 bg-sky-100/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Acompte</p>
          <p className="mt-2 text-3xl font-semibold text-sky-100">
            {insights.deposit.deposit + insights.deposit.servers}
          </p>
          <p className="text-sm text-white/60">clients engagés</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Nouveaux</p>
          <p className="mt-2 text-3xl font-semibold">{kpis.last24h}</p>
          <p className="text-sm text-white/60">dernière 24h</p>
        </div>
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">7 jours</p>
          <p className="mt-2 text-3xl font-semibold">{kpis.last7d}</p>
          <p className="text-sm text-white/60">dernière semaine</p>
        </div>
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">30 jours</p>
          <p className="mt-2 text-3xl font-semibold">{kpis.last30d}</p>
          <p className="text-sm text-white/60">dernier mois</p>
        </div>
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Focus</p>
          <p className="mt-2 text-3xl font-semibold">
            {kpis.webCount} web / {kpis.mobileCount} mobile
          </p>
          <p className="text-sm text-white/60">
            {kpis.configuratorCount} configurateur / {kpis.classicCount} devis
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Activite recente</p>
          {hasData ? (
            <>
              <div className="mt-6 flex items-end gap-6 text-xs text-white/60">
                {activityBars.map((bar) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="flex h-24 w-10 items-end overflow-hidden rounded-full bg-white/10"
                      title={`${bar.label}: ${bar.value}`}
                    >
                      <div
                        className="w-full bg-emerald-200/80"
                        style={{
                          height: `${Math.max(6, (bar.value / activityMax) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="uppercase tracking-[0.2em]">{bar.label}</span>
                    <span className="text-sm text-white">{bar.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Sparkline 30 jours</p>
                <div className="mt-3 h-20 w-full rounded-2xl border border-white/10 bg-black/30 p-3">
                  <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
                    <polyline
                      points={sparklinePoints}
                      fill="none"
                      stroke="rgba(148, 163, 255, 0.9)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="mt-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
                  <span>{sparklineStartLabel}</span>
                  <span>{sparklineEndLabel}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-sm text-white/60">
              Aucune donnée pour les graphiques.
            </div>
          )}
        </div>
        <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Focus & source</p>
          {hasData ? (
            <div className="mt-6 grid gap-4">
              {focusBars.map((bar) => (
                <div key={bar.label} className="space-y-2">
                  <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
                    <span>{bar.label}</span>
                    <span className="text-white">{bar.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10" title={`${bar.label}: ${bar.value}`}>
                    <div
                      className="h-full rounded-full bg-sky-200/80"
                      style={{ width: `${(bar.value / focusMax) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-sm text-white/60">
              Aucune donnée pour les graphiques.
            </div>
          )}
        </div>
      </div>

      <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Répartition</p>
        {hasData ? (
          <div className="mt-4 space-y-4 text-sm text-white/70">
            <div>
              <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
                <span>Focus</span>
                <span>{kpis.webCount} web / {kpis.mobileCount} mobile</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="flex h-full">
                  <span
                    className="h-full bg-emerald-300/80"
                    style={{ width: `${focusWebPct}%` }}
                  />
                  <span
                    className="h-full bg-sky-200/80"
                    style={{ width: `${focusMobilePct}%` }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
                <span>Source</span>
                <span>{kpis.configuratorCount} configurateur / {kpis.classicCount} devis</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="flex h-full">
                  <span
                    className="h-full bg-purple-200/80"
                    style={{ width: `${configuratorPct}%` }}
                  />
                  <span
                    className="h-full bg-amber-200/80"
                    style={{ width: `${classicPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-white/20 bg-black/30 p-6 text-sm text-white/60">
            Aucune donnée pour les graphiques.
          </div>
        )}
      </div>

      {!loading && items.length === 0 && (
        <div className="premium-card rounded-3xl border border-dashed border-white/20 bg-black/20 p-8 text-white/70">
          Aucune demande pour le moment.
        </div>
      )}

      {!loading && items.length > 0 && filteredItems.length === 0 && (
        <div className="premium-card rounded-3xl border border-dashed border-white/20 bg-black/20 p-8 text-white/70">
          Aucun resultat avec ces filtres.
        </div>
      )}

      <div className="space-y-6">
        {sortedItems.map((item, index) => {
          const itemKey = getItemKey(item);
          const status = resolvedStatus[itemKey];
          const meta = getMetaForKey(itemKey);
          const pipeline = meta.pipeline;
          const feasibilityClass = feasibilityBadges[status?.feasibility ?? "pending"];
          const depositClass = depositBadges[status?.deposit ?? "none"];
          const pipelineClass = pipelineBadges[pipeline];
          const isReplyOpen = replyTargetKey === itemKey;
          const replyTemplate = replyTemplates.find((entry) => entry.id === replyTemplateId) ?? replyTemplates[0];
          const replySubject = replyTemplate.subject(item);
          const autoProjectKey = getProjectProfileKey(item);
          const resolvedProjectKey =
            replyProjectKey === "auto" ? autoProjectKey : (replyProjectKey as Exclude<ProjectReplyKey, "auto" | "none">);
          const projectProfile =
            replyProjectKey === "none"
              ? null
              : projectReplyProfiles.find((profile) => profile.key === resolvedProjectKey) ??
                projectReplyProfiles[projectReplyProfiles.length - 1];
          const projectSnippet =
            replyProjectKey === "none"
              ? undefined
              : replyVariant === "short"
                ? projectProfile?.short
                : projectProfile?.full;
          const replyBody = replyTemplate.body(item, {
            price: replyPrice,
            timeline: replyTimeline,
            notes: replyNotes,
            variant: replyVariant,
            projectSnippet,
          });
          return (
            <motion.article
              key={itemKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="premium-card rounded-[32px] border border-white/10 bg-gradient-to-br from-white/8 to-white/0 p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {new Date(item.submittedAt).toLocaleString("fr-FR")}
                  </p>
                  <h2 className="text-2xl font-semibold">{item.name || "Sans nom"}</h2>
                  <p className="text-sm text-white/70">
                    {item.projectType} · {item.clientType ?? "Client"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`rounded-full px-3 py-1 font-medium ${feasibilityClass}`}>
                    {feasibilityLabels[status?.feasibility ?? "pending"]}
                  </span>
                  <span className={`rounded-full px-3 py-1 font-medium ${depositClass}`}>
                    {depositLabels[status?.deposit ?? "none"]}
                  </span>
                  <span className={`rounded-full px-3 py-1 font-medium ${pipelineClass}`}>
                    {pipelineLabels[pipeline]}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr,0.7fr]">
                <div className="grid gap-3 text-sm text-white/80 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Budget</p>
                    <p className="mt-1 text-white">{item.budget}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Délai</p>
                    <p className="mt-1 text-white">{item.timeline}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Entreprise</p>
                    <p className="mt-1 text-white">{item.companyName ?? "N/A"}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Contact</p>
                  <p className="mt-1">{item.email}</p>
                  {item.phone && <p>{item.phone}</p>}
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-white/70">
                  Faisabilité
                  <select
                    value={status?.feasibility}
                    onChange={(event) =>
                      updateStatus(item, { feasibility: event.target.value as ItemStatus["feasibility"] })
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                  >
                    {feasibilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-white/70">
                  Avance / serveurs
                  <select
                    value={status?.deposit}
                    onChange={(event) =>
                      updateStatus(item, { deposit: event.target.value as ItemStatus["deposit"] })
                    }
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                  >
                    {depositOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Suivi interne</p>
                    <select
                      value={pipeline}
                      onChange={(event) => updatePipeline(itemKey, event.target.value as PipelineStatus)}
                      className="rounded-full border border-white/20 bg-black/50 px-3 py-2 text-xs text-white focus:border-white/40 focus:outline-none"
                    >
                      {pipelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="mt-3 block text-xs uppercase tracking-[0.3em] text-white/60">
                    Note rapide
                  </label>
                  <textarea
                    rows={3}
                    value={noteDrafts[itemKey] ?? ""}
                    onChange={(event) =>
                      setNoteDrafts((prev) => ({ ...prev, [itemKey]: event.target.value }))
                    }
                    placeholder="Ajoute un commentaire interne..."
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  />
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => addNote(itemKey)}
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-neutral-200"
                    >
                      Ajouter note
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoteDrafts((prev) => ({ ...prev, [itemKey]: "" }))}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white hover:text-white"
                    >
                      Effacer
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Historique</p>
                  {meta.notes.length === 0 ? (
                    <p className="mt-2 text-sm text-white/50">Aucune note pour le moment.</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {meta.notes.map((note) => (
                        <li key={note.id} className="rounded-2xl border border-white/10 bg-black/40 p-3">
                          <p className="text-xs text-white/50">
                            {new Date(note.createdAt).toLocaleString("fr-FR")}
                          </p>
                          <p className="mt-2 text-sm text-white/80">{note.body}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Réponse rapide</p>
                    <p className="text-sm text-white/60">Modèles d'email et envoi 1 clic.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openReply(item)}
                    className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:border-white hover:text-white"
                  >
                    {isReplyOpen ? "Fermer" : "Répondre"}
                  </button>
                </div>
                {isReplyOpen && (
                  <div className="mt-4 grid gap-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <label className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Template
                        <select
                          value={replyTemplateId}
                          onChange={(event) => {
                            setReplyTemplateId(event.target.value as ReplyTemplateId);
                            setReplyError("");
                            setReplySuccess("");
                          }}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
                        >
                          {replyTemplates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Version
                        <select
                          value={replyVariant}
                          onChange={(event) => {
                            setReplyVariant(event.target.value as ReplyVariant);
                            setReplyError("");
                            setReplySuccess("");
                          }}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
                        >
                          <option value="short">Court</option>
                          <option value="full">Détaillée</option>
                        </select>
                      </label>
                      <label className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Type de projet
                        <select
                          value={replyProjectKey}
                          onChange={(event) => {
                            setReplyProjectKey(event.target.value as ProjectReplyKey);
                            setReplyError("");
                            setReplySuccess("");
                          }}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-none"
                        >
                          <option value="auto">Auto (détecté)</option>
                          <option value="none">Aucun snippet</option>
                          {projectReplyProfiles.map((profile) => (
                            <option key={profile.key} value={profile.key}>
                              {profile.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    {replyProjectKey === "auto" && (
                      <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                        Détecté: {projectProfile?.label ?? "General"}
                      </p>
                    )}
                    <div className="grid gap-3 md:grid-cols-2">
                      <label className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Budget
                        <input
                          value={replyPrice}
                          onChange={(event) => {
                            setReplyPrice(event.target.value);
                            setReplyError("");
                            setReplySuccess("");
                          }}
                          placeholder="Ex: 4800 EUR"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        />
                      </label>
                      <label className="text-xs uppercase tracking-[0.25em] text-white/60">
                        Délai
                        <input
                          value={replyTimeline}
                          onChange={(event) => {
                            setReplyTimeline(event.target.value);
                            setReplyError("");
                            setReplySuccess("");
                          }}
                          placeholder="Ex: 6 à 8 semaines"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                        />
                      </label>
                    </div>
                    <label className="text-xs uppercase tracking-[0.25em] text-white/60">
                      Notes
                      <textarea
                        value={replyNotes}
                        onChange={(event) => {
                          setReplyNotes(event.target.value);
                          setReplyError("");
                          setReplySuccess("");
                        }}
                        placeholder="Ajoutez des précisions ou ajustements."
                        rows={4}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                      />
                    </label>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Aperçu sujet</p>
                      <p className="mt-2 text-sm text-white">{replySubject}</p>
                      <p className="mt-4 text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Aperçu message</p>
                      <p className="mt-2 whitespace-pre-line text-sm text-white/80">{replyBody}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-white/60">Destinataire: {item.email ?? "email manquant"}</p>
                      <button
                        type="button"
                        onClick={() => sendReply(item)}
                        disabled={replySending || !item.email}
                        className="rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-white/60"
                      >
                        {replySending ? "Envoi..." : "Envoyer"}
                      </button>
                    </div>
                    {replyError && <p className="text-sm text-rose-200">{replyError}</p>}
                    {replySuccess && <p className="text-sm text-emerald-200">{replySuccess}</p>}
                  </div>
                )}
              </div>

              {item.configurator && (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Configurateur</p>
                    <p>Type : {item.configurator.siteType ?? "-"}</p>
                    <p>Vision : {item.configurator.strategy ?? "-"}</p>
                    <p>Style : {item.configurator.mood ?? "-"}</p>
                    <p>Options : {formatList(item.configurator.features)}</p>
                    <p>Intégrations : {formatList(item.configurator.integrations)}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0f2c] to-[#1f1244] p-4 text-sm text-white/80">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Focus</p>
                    <p>Projet : {item.projectFocus === "mobile" ? "MVP Mobile" : "Web / site"}</p>
                    <p>Modules IA : {formatList(item.aiModules)}</p>
                    {item.projectFocus === "mobile" && (
                      <>
                        <p>Plateformes : {formatList(item.mobilePlatforms)}</p>
                        <p>Fonctionnalités : {formatList(item.mobileFeatures)}</p>
                        <p>Stores : {item.storeSupport ?? "-"}</p>
                      </>
                    )}
                    {item.projectFocus !== "mobile" && <p>Intention : {item.goal ?? "Brief classique"}</p>}
                  </div>
                </div>
              )}

              {item.message && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Message</p>
                  <p className="mt-2 whitespace-pre-line">{item.message}</p>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
