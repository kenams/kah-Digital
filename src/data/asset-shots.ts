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
    title: "KAH Prod hero direction",
    description: "Direction visuelle plus nette pour presenter le label avec un niveau premium.",
    image: "/mockups/global-dashboard.svg",
    chips: ["Label", "Direction artistique"],
    cta: { label: "Voir KAH Prod", href: "/projets/kah-prod" },
  },
  {
    title: "KAH Prod premium layout",
    description: "Structure de home et sections clarifiees pour mieux presenter l'univers du projet.",
    image: "/mockups/global-dashboard.png",
    chips: ["Site vitrine", "Production"],
    cta: { label: "Voir l'etude de cas", href: "/projets/kah-prod" },
  },
  {
    title: "KAH Prod production base",
    description: "Base evolutive Next.js / Vercel pour faire vivre le site dans la duree.",
    image: "/mockups/global-dashboard.svg",
    chips: ["Next.js", "Vercel"],
    cta: { label: "Explorer le projet", href: "/projets/kah-prod" },
  },
];

export const assetShotsEn: AssetShot[] = [
  {
    title: "KAH Prod hero direction",
    description: "Sharper visual direction to present the label with a premium level of execution.",
    image: "/mockups/global-dashboard.svg",
    chips: ["Label", "Art direction"],
    cta: { label: "See KAH Prod", href: "/en/projets/kah-prod" },
  },
  {
    title: "KAH Prod premium layout",
    description: "Clearer homepage structure and sections to present the project universe more effectively.",
    image: "/mockups/global-dashboard.png",
    chips: ["Showcase site", "Production"],
    cta: { label: "View the case study", href: "/en/projets/kah-prod" },
  },
  {
    title: "KAH Prod production base",
    description: "Scalable Next.js / Vercel base to keep the site evolving over time.",
    image: "/mockups/global-dashboard.svg",
    chips: ["Next.js", "Vercel"],
    cta: { label: "Explore the project", href: "/en/projets/kah-prod" },
  },
];
