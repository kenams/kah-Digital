import { NextRequest, NextResponse } from "next/server";
import { requireAdminAccess } from "@/app/(admin)/admin/_shared";
import {
  MAX_DOCUMENT_BYTES,
  createDocumentDownloadUrl,
  isDocumentKind,
  isValidDocumentPath,
  uploadDocument,
} from "@/lib/documents-store";

export const dynamic = "force-dynamic";

async function guard() {
  const access = await requireAdminAccess();
  if (access === "ok") return null;
  const status = access === "unauthorized" || access === "missing-auth" ? 401 : 403;
  return NextResponse.json({ error: access === "mfa" ? "MFA requise" : "Acces interdit" }, { status });
}

export async function GET(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  const path = request.nextUrl.searchParams.get("path") ?? "";
  if (!isValidDocumentPath(path)) {
    return NextResponse.json({ error: "Chemin invalide" }, { status: 400 });
  }

  try {
    const url = await createDocumentDownloadUrl(path);
    return NextResponse.redirect(url, { status: 302 });
  } catch (error) {
    console.error("[api/admin/documents] download failed", error);
    return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const form = await request.formData();
    const file = form.get("file");
    const kind = String(form.get("kind") ?? "");

    if (!(file instanceof File) || !isDocumentKind(kind)) {
      return NextResponse.json({ error: "Parametres invalides" }, { status: 400 });
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Seuls les PDF sont acceptes" }, { status: 400 });
    }
    if (file.size === 0 || file.size > MAX_DOCUMENT_BYTES) {
      return NextResponse.json({ error: "Fichier vide ou superieur a 10 Mo" }, { status: 400 });
    }

    const path = await uploadDocument({ kind, fileName: file.name, bytes: await file.arrayBuffer() });
    return NextResponse.json({ ok: true, path });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur";
    const duplicate = /already exists|Duplicate/i.test(message);
    console.error("[api/admin/documents] upload failed", error);
    return NextResponse.json(
      { error: duplicate ? "Un document du meme nom existe deja" : "Erreur d'envoi" },
      { status: duplicate ? 409 : 500 }
    );
  }
}
