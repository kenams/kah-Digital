export type AssetShot = {
  title: string;
  description: string;
  image: string;
  chips: string[];
  cta: {
    label: string;
    href: string;
  };
};

export const assetShots: AssetShot[] = [
  {
    title: "Auréa premium scene",
    description: "Landing luxe, palettes or/teal et parcours grand compte.",
    image: "/mockups/aurea-site.png",
    chips: ["Nettoyage", "Premium"],
    cta: { label: "Voir Auréa", href: "/projets/aurea" },
  },
  {
    title: "Brief configurateur live",
    description: "Timeline sticky, modules MVP, export PDF direct.",
    image: "/mockups/global-dashboard.svg",
    chips: ["Site + MVP", "4 etapes"],
    cta: { label: "Tester le configurateur", href: "/configurateur" },
  },
  {
    title: "Dashboard MVP FairBuild",
    description: "Double onboarding, scoring automatique et badges status.",
    image: "/mockups/fairbuild-mvp.svg",
    chips: ["Webhooks Make", "Supabase"],
    cta: { label: "Voir l'etude de cas", href: "/projets/fairbuild-mvp" },
  },
  {
    title: "Player PulseLearn",
    description: "Lecteur audio, quiz et timeline de progression mobile.",
    image: "/mockups/pulselearn.svg",
    chips: ["React Native", "Stripe Checkout"],
    cta: { label: "Decouvrir PulseLearn", href: "/projets/pulselearn" },
  },
  {
    title: "Scene mobile NovaPay",
    description: "Hero finance, timeline sticky et CTA meeting integre.",
    image: "/mockups/novapay.svg",
    chips: ["Landing finance", "CTA sticky"],
    cta: { label: "Voir NovaPay", href: "/projets/novapay" },
  },
  {
    title: "Kit investor OKO",
    description: "Timeline impact + map et planche chiffres pret a pitcher.",
    image: "/mockups/oko-energy.svg",
    chips: ["Mapbox", "Storytelling"],
    cta: { label: "Explorer OKO Energy", href: "/projets/oko-energy" },
  },
  {
    title: "Board e-commerce Lumea",
    description: "Cartes produits 3D, quiz routine et check-out Stripe.",
    image: "/mockups/lumea-skin.svg",
    chips: ["E-commerce", "Stripe"],
    cta: { label: "Voir Lumea Skin", href: "/projets/lumea-skin" },
  },
];

export const assetShotsEn: AssetShot[] = [
  {
    title: "Auréa premium scene",
    description: "Luxury landing, gold/teal palette, enterprise journey.",
    image: "/mockups/aurea-site.png",
    chips: ["Cleaning", "Premium"],
    cta: { label: "See Auréa", href: "/en/projets/aurea" },
  },
  {
    title: "Configurator brief live",
    description: "Sticky timeline, MVP modules, direct PDF export.",
    image: "/mockups/global-dashboard.svg",
    chips: ["Site + MVP", "4 steps"],
    cta: { label: "Try the configurator", href: "/en/configurateur" },
  },
  {
    title: "FairBuild MVP dashboard",
    description: "Double onboarding, auto scoring, and status badges.",
    image: "/mockups/fairbuild-mvp.svg",
    chips: ["Make webhooks", "Supabase"],
    cta: { label: "View the case study", href: "/en/projets/fairbuild-mvp" },
  },
  {
    title: "PulseLearn player",
    description: "Audio player, quizzes, and mobile progress timeline.",
    image: "/mockups/pulselearn.svg",
    chips: ["React Native", "Stripe Checkout"],
    cta: { label: "Discover PulseLearn", href: "/en/projets/pulselearn" },
  },
  {
    title: "NovaPay mobile scene",
    description: "Finance hero, sticky timeline, and embedded meeting CTA.",
    image: "/mockups/novapay.svg",
    chips: ["Finance landing", "Sticky CTA"],
    cta: { label: "See NovaPay", href: "/en/projets/novapay" },
  },
  {
    title: "OKO investor kit",
    description: "Impact timeline, map, and pitch-ready number board.",
    image: "/mockups/oko-energy.svg",
    chips: ["Mapbox", "Storytelling"],
    cta: { label: "Explore OKO Energy", href: "/en/projets/oko-energy" },
  },
  {
    title: "Lumea e-commerce board",
    description: "3D product cards, routine quiz, and Stripe checkout.",
    image: "/mockups/lumea-skin.svg",
    chips: ["E-commerce", "Stripe"],
    cta: { label: "See Lumea Skin", href: "/en/projets/lumea-skin" },
  },
];
