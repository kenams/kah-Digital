import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { PortfolioProject } from "@/lib/portfolio";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const TABLE = "portfolio_projects";

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: { headers: { "x-application-name": "kah-digital-admin" } },
      })
    : null;

export function isPortfolioStoreConfigured() {
  return supabaseConfigured;
}

function requireClient() {
  if (!supabase) {
    throw new Error("Supabase non configure (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }
  return supabase;
}

export async function listPortfolioProjects(): Promise<PortfolioProject[]> {
  const client = requireClient();
  const { data, error } = await client
    .from(TABLE)
    .select("*")
    .order("createdAt", { ascending: false });

  if (error || !data) {
    console.error("[portfolio-store] Failed to read projects", error);
    throw new Error("Impossible de charger le portfolio.");
  }

  return data as PortfolioProject[];
}

export async function createPortfolioProject(
  project: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt">
): Promise<PortfolioProject> {
  const client = requireClient();
  const { data, error } = await client.from(TABLE).insert(project).select("*").single();

  if (error || !data) {
    console.error("[portfolio-store] Failed to create project", error);
    throw new Error("Impossible d'enregistrer la prestation.");
  }

  return data as PortfolioProject;
}

export async function updatePortfolioProject(
  id: string,
  patch: Partial<Omit<PortfolioProject, "id" | "createdAt">>
): Promise<PortfolioProject> {
  const client = requireClient();
  const payload = Object.fromEntries(
    Object.entries({ ...patch, updatedAt: new Date().toISOString() }).filter(
      ([, value]) => value !== undefined
    )
  );

  const { data, error } = await client.from(TABLE).update(payload).eq("id", id).select("*").single();

  if (error || !data) {
    console.error("[portfolio-store] Failed to update project", error);
    throw new Error("Impossible de mettre a jour la prestation.");
  }

  return data as PortfolioProject;
}

export async function deletePortfolioProject(id: string): Promise<void> {
  const client = requireClient();
  const { error } = await client.from(TABLE).delete().eq("id", id);

  if (error) {
    console.error("[portfolio-store] Failed to delete project", error);
    throw new Error("Impossible de supprimer la prestation.");
  }
}
