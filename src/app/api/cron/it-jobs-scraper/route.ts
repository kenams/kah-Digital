/**
 * Scraper offres d'emploi "technicien support IT"
 * Logique : une boîte qui recrute du support N1 = elle a du volume de tickets = prospect parfait
 * On scrape les offres Indeed/France Travail → on extrait l'email/site de l'employeur → on l'ajoute en prospect
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) return true;
  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

// Requêtes de recherche — entreprises qui recrutent du support N1
const JOB_QUERIES = [
  "technicien support informatique N1 helpdesk",
  "technicien helpdesk support utilisateur PME",
  "administrateur systèmes réseaux support IT",
  "chargé support informatique ticketing GLPI",
  "technicien support N1 N2 CDI",
  "ingénieur support IT onsite",
];

// Extrait les données pertinentes d'une offre d'emploi via SerpAPI ou scraping basique
async function searchJobPostings(query: string): Promise<{ company: string; email?: string; site?: string; location?: string }[]> {
  const serpKey = process.env.SERP_API_KEY;
  if (!serpKey) return [];

  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query + " site:francetravail.fr OR site:indeed.fr recrutement")}&location=France&hl=fr&gl=fr&api_key=${serpKey}&num=10`;

  try {
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) return [];
    const data = await res.json() as { organic_results?: { title?: string; snippet?: string; displayed_link?: string; link?: string }[] };

    return (data.organic_results ?? []).slice(0, 8).map(r => {
      // Extraire le nom d'entreprise depuis le titre/snippet
      const companyMatch = r.title?.match(/chez (.+?) [–\-|]/) || r.snippet?.match(/(?:chez|pour|at) ([A-Z][a-zA-Z\s]+?)(?:\s[-–|]|\.|,)/);
      const company = companyMatch?.[1]?.trim() ?? r.displayed_link?.split(".")?.[0]?.toUpperCase() ?? "PME";
      const site = r.displayed_link?.replace(/^www\./, "");
      return { company, site, location: "France" };
    }).filter(r => r.company.length > 2);
  } catch { return []; }
}

// Recherche l'email de contact d'une entreprise via son site
async function findCompanyEmail(site: string, company: string): Promise<string | null> {
  if (!site) return null;
  const guesses = [
    `contact@${site}`,
    `info@${site}`,
    `it@${site}`,
    `support@${site}`,
    `direction@${site}`,
  ];
  // On retourne le premier guess — en prod on pourrait vérifier MX
  return guesses[0] ?? null;
}

export async function GET(req: Request) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  let added = 0;
  const prospects: { company: string; email: string; source: string }[] = [];

  for (const query of JOB_QUERIES.slice(0, 3)) { // 3 queries max par run
    const jobs = await searchJobPostings(query);

    for (const job of jobs) {
      if (!job.site && !job.company) continue;

      const email = job.email ?? await findCompanyEmail(job.site ?? "", job.company);
      if (!email) continue;

      const prospect = {
        name: `Responsable IT`,
        email,
        company: job.company,
        sector: "IT / Support informatique",
        contact_role: "DSI / Responsable IT",
        personal_note: `Votre annonce de recrutement pour un poste de support IT suggère un volume de tickets important. Notre assistant peut prendre en charge 70% de ces tickets automatiquement.`,
        status: "pending",
        sequence_status: "pending",
        source: `job_scraper:${query.slice(0, 30)}`,
      };

      const { error } = await supabase
        .from("kah_support_prospects")
        .upsert(prospect, { onConflict: "email", ignoreDuplicates: true });

      if (!error) {
        prospects.push({ company: job.company, email, source: query.slice(0, 30) });
        added++;
      }
    }
  }

  return NextResponse.json({ added, prospects });
}

export async function POST(req: Request) { return GET(req); }
