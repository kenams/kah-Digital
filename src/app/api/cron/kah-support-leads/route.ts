/**
 * Cron — Découverte de leads ESN / entreprises pour assistant-pme
 * Tourne à 8h lun-ven, alimente kah_support_prospects
 * Cibles : DSI, responsables IT, DG de PME 10-200 salariés, ESN
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const LEADS_PER_RUN = 20;

const TARGETS = [
  // ESN / prestataires IT
  { q: "ESN société informatique PME france site web contact", sector: "esn", role: "Directeur" },
  { q: "infogérance PME ile-de-france site web contact email", sector: "esn", role: "Directeur" },
  { q: "prestataire informatique TPE PME site web contact", sector: "esn", role: "Directeur" },
  { q: "managed service provider MSP france site web", sector: "esn", role: "Directeur" },
  { q: "société support IT helpdesk entreprise france site web", sector: "esn", role: "DSI" },
  // PME avec équipes IT
  { q: "PME industrielle france 50 salariés site web contact", sector: "pme", role: "DG" },
  { q: "cabinet expertise comptable equipe france site web", sector: "comptabilite", role: "Directeur" },
  { q: "agence immobiliere reseau agences france site web", sector: "immobilier", role: "Directeur" },
  { q: "clinique centre médical equipe soignante site web contact", sector: "sante", role: "Directeur" },
  { q: "bureau etudes ingenierie france equipe site web contact", sector: "ingenierie", role: "DG" },
  { q: "groupement artisans bâtiment france site web", sector: "btp", role: "Gérant" },
  { q: "laboratoire analyses medicales france site web contact", sector: "sante", role: "Directeur" },
  { q: "syndic copropriete gestionnaire france site web", sector: "immobilier", role: "Directeur" },
  { q: "transporteur logistique PME france site web contact", sector: "logistique", role: "DG" },
  // Suisse romande
  { q: "infogérance PME suisse romande lausanne genève site web", sector: "esn", role: "Directeur" },
  { q: "société IT support entreprise suisse site web contact", sector: "esn", role: "Directeur" },
  { q: "PME vaud genève site web professionnel contact", sector: "pme", role: "DG" },
  // Belgique
  { q: "IT support managed services belgique bruxelles site web", sector: "esn", role: "Directeur" },
  { q: "PME entreprise bruxelles 50 salariés site web contact", sector: "pme", role: "DG" },
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36";

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

async function searchDDG(query: string): Promise<string[]> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(
      `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`,
      { signal: ctrl.signal, headers: { "User-Agent": UA, Accept: "text/html" } }
    );
    clearTimeout(t);
    if (!res.ok) return [];
    const html = await res.text();
    const urls: string[] = [];
    for (const m of html.matchAll(/uddg=([^"&\s]+)/g)) {
      try {
        const u = decodeURIComponent(m[1]);
        if (u.startsWith("http") && !isJunk(u)) urls.push(u);
      } catch { /* skip */ }
    }
    return [...new Set(urls)].slice(0, 8);
  } catch { clearTimeout(t); return []; }
}

function isJunk(url: string) {
  const blocked = ["facebook","linkedin","twitter","instagram","youtube","wikipedia","google","bing",
    "leboncoin","societe.com","pappers","infogreffe","kompass","europages","malt.fr","upwork",
    "indeed","welcome","monster","pagesjaunes","yelp","tripadvisor"];
  return blocked.some(b => url.toLowerCase().includes(b));
}

async function fetchPage(url: string): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "User-Agent": UA } });
    clearTimeout(t);
    return res.ok ? await res.text() : "";
  } catch { clearTimeout(t); return ""; }
}

function extractEmail(html: string): string | null {
  // mailto: en priorité
  const m = html.match(/mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/i);
  if (m) {
    const e = m[1].split("?")[0].toLowerCase().trim();
    if (!e.startsWith("no-reply") && !e.startsWith("noreply") && isValidEmail(e)) return e;
  }
  // Email en clair
  const all = html.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) ?? [];
  const junk = ["sentry","w3.org","schema","google","apple","wordpress","jquery","sendgrid","amazonaws","cloudflare"];
  for (const e of all) {
    const l = e.toLowerCase();
    if (isValidEmail(l) && !junk.some(j => l.includes(j))) return l;
  }
  return null;
}

function isValidEmail(e: string) {
  if (!e || !e.includes("@") || e.length > 80) return false;
  const ext = e.split(".").pop() ?? "";
  if (["png","jpg","svg","css","js","php","html"].includes(ext)) return false;
  return true;
}

function extractCompany(html: string, url: string): string {
  const title = html.match(/<title[^>]*>([^<]{2,80})<\/title>/i)?.[1];
  if (title) return title.trim().replace(/\s*[-|–—]\s*.*/g, "").trim().slice(0, 60);
  return new URL(url).hostname.replace("www.", "").split(".")[0];
}

export async function GET(req: Request) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  let inserted = 0, skipped = 0;

  // Domaines déjà en base
  const { data: existing } = await supabase.from("kah_support_prospects").select("domain");
  const knownDomains = new Set((existing ?? []).map((r: { domain: string }) => r.domain).filter(Boolean));

  const target = TARGETS[Math.floor(Math.random() * TARGETS.length)];
  const urls = await searchDDG(target.q);

  for (const url of urls) {
    if (inserted >= LEADS_PER_RUN) break;
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      if (knownDomains.has(domain)) { skipped++; continue; }

      const html = await fetchPage(url);
      if (!html) continue;

      const email = extractEmail(html);
      if (!email) continue;

      // Vérifier page contact si email non trouvé sur homepage
      const company = extractCompany(html, url);

      await supabase.from("kah_support_prospects").insert({
        name: company,
        email,
        company,
        domain,
        sector: target.sector,
        contact_role: target.role,
        personal_note: null,
        status: "pending",
        sequence_status: "pending",
      });

      knownDomains.add(domain);
      inserted++;
      await new Promise(r => setTimeout(r, 500));
    } catch { /* skip */ }
  }

  console.log(`[kah-support-leads] inserted=${inserted} skipped=${skipped} query="${target.q}"`);
  return NextResponse.json({ inserted, skipped, query: target.q });
}

export async function POST(req: Request) { return GET(req); }
