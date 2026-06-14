import { NextResponse } from "next/server";

const INDEXNOW_KEY = "kahdigital42indexnow";
const SITE_URL = "https://kah-digital.ch";

const URLS = [
  "/",
  "/services", "/services/site-web", "/services/applications", "/services/glpi",
  "/offres", "/contact", "/devis", "/projets",
  "/site-web-entreprise", "/refonte-site-web", "/application-web-sur-mesure",
  "/automatisation-ia-entreprise", "/automatisation-ia-suisse", "/application-web-suisse",
  "/audit-gratuit",
  "/projets/dropigo", "/projets/immortal-arena", "/projets/ruby-gallery",
  "/en/projets/dropigo", "/en/projets/immortal-arena", "/en/projets/ruby-gallery",
  "/de/projets/dropigo", "/de/projets/immortal-arena", "/de/projets/ruby-gallery",
  "/site-web-lausanne", "/site-web-geneve", "/site-web-fribourg",
  "/agence-web-paris", "/agence-web-lyon", "/agence-web-marseille", "/agence-web-bordeaux",
  "/agence-web-nantes", "/agence-web-strasbourg", "/agence-web-berne",
  "/agence-web-toulouse", "/agence-web-nice", "/agence-web-lille",
  "/agence-web-montpellier", "/agence-web-rennes",
  "/agence-web-zurich", "/agence-web-basel", "/agence-web-lugano",
  "/agence-web-grenoble", "/agence-web-rouen", "/agence-web-aix-en-provence",
  "/agence-web-angers", "/agence-web-dijon", "/agence-web-caen",
  "/agence-web-clermont-ferrand", "/agence-web-metz", "/agence-web-lausanne",
  "/agence-web-suisse",
  "/agence-ia", "/agents-ia",
  "/en/agence-ia", "/en/agents-ia",
  "/de/agence-ia", "/de/agents-ia",
  "/automatisation-ia-entreprise", "/automatisation-ia-suisse",
  "/blog/automatisation-ia-pme", "/blog/seo-local-pme",
  "/projets/clutch", "/projets/minealert", "/projets/techcash-academy",
];

export async function GET() {
  const urlList = URLS.map((p) => `${SITE_URL}${p}`);

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "kah-digital.ch",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    // Also ping Bing directly
    const bingRes = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "kah-digital.ch",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    return NextResponse.json({
      ok: true,
      urls: urlList.length,
      indexnow: res.status,
      bing: bingRes.status,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
