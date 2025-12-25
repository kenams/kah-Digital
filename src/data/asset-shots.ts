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
    image: "/mockups/global-dashboard.png",
    chips: ["Landing finance", "CTA sticky"],
    cta: { label: "Voir NovaPay", href: "/projets/novapay" },
  },
  {
    title: "Kit investor OKO",
    description: "Timeline impact + map et planche chiffres pret a pitcher.",
    image: "/mockups/fairbuild-mvp.png",
    chips: ["Mapbox", "Storytelling"],
    cta: { label: "Explorer OKO Energy", href: "/projets/oko-energy" },
  },
  {
    title: "Board e-commerce Lumea",
    description: "Cartes produits 3D, quiz routine et check-out Stripe.",
    image: "/mockups/pulselearn.png",
    chips: ["E-commerce", "Stripe"],
    cta: { label: "Voir Lumea Skin", href: "/projets/lumea-skin" },
  },
];
