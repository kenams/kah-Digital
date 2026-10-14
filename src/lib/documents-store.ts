import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const DOCUMENTS_BUCKET = "kah-documents";
export const DOCUMENT_KINDS = ["devis", "factures", "autres"] as const;
export type DocumentKind = (typeof DOCUMENT_KINDS)[number];

export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

export type StoredDocument = {
  kind: DocumentKind;
  name: string;
  path: string;
  size: number;
  createdAt: string;
};

const client: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: { headers: { "x-application-name": "kah-digital-documents" } },
      })
    : null;

function requireClient() {
  if (!client) {
    throw new Error("Supabase non configuré (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }
  return client;
}

export function isDocumentKind(value: string): value is DocumentKind {
  return (DOCUMENT_KINDS as readonly string[]).includes(value);
}

export function sanitizeFileName(name: string) {
  const base = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return base.toLowerCase().endsWith(".pdf") ? base : `${base || "document"}.pdf`;
}

export function isValidDocumentPath(path: string) {
  const [kind, ...rest] = path.split("/");
  return isDocumentKind(kind) && rest.length === 1 && rest[0].length > 0 && !rest[0].includes("..");
}

export async function listDocuments(): Promise<StoredDocument[]> {
  const supabase = requireClient();
  const all: StoredDocument[] = [];

  for (const kind of DOCUMENT_KINDS) {
    const { data, error } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .list(kind, { limit: 500, sortBy: { column: "created_at", order: "desc" } });
    if (error) throw error;
    for (const file of data ?? []) {
      if (!file.name || file.name.startsWith(".")) continue;
      all.push({
        kind,
        name: file.name,
        path: `${kind}/${file.name}`,
        size: Number(file.metadata?.size ?? 0),
        createdAt: file.created_at ?? file.updated_at ?? "",
      });
    }
  }

  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function uploadDocument(params: { kind: DocumentKind; fileName: string; bytes: ArrayBuffer }) {
  const supabase = requireClient();
  const path = `${params.kind}/${sanitizeFileName(params.fileName)}`;
  const { error } = await supabase.storage.from(DOCUMENTS_BUCKET).upload(path, params.bytes, {
    contentType: "application/pdf",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export async function createDocumentDownloadUrl(path: string) {
  const supabase = requireClient();
  const { data, error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .createSignedUrl(path, 60, { download: path.split("/").pop() });
  if (error || !data?.signedUrl) throw error ?? new Error("URL signée indisponible");
  return data.signedUrl;
}
