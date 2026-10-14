import { AdminStateCard, handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminDocumentUpload } from "@/components/admin-document-upload";
import { listDocuments, type DocumentKind, type StoredDocument } from "@/lib/documents-store";

export const dynamic = "force-dynamic";

const sections: { kind: DocumentKind; title: string; empty: string }[] = [
  { kind: "devis", title: "Devis", empty: "Aucun devis archivé." },
  { kind: "factures", title: "Factures", empty: "Aucune facture archivée." },
  { kind: "autres", title: "Autres documents", empty: "Aucun autre document." },
];

function formatSize(bytes: number) {
  if (!bytes) return "—";
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} Ko` : `${(bytes / 1024 / 1024).toFixed(1)} Mo`;
}

function formatDate(value: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeZone: "Europe/Paris" }).format(new Date(value));
}

export default async function AdminDocumentsPage() {
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  let documents: StoredDocument[] = [];
  let failed = false;
  try {
    documents = await listDocuments();
  } catch (error) {
    console.error("[admin] documents list failed", error);
    failed = true;
  }

  if (failed) {
    return (
      <AdminStateCard
        tone="rose"
        eyebrow="Documents"
        title="Impossible de charger les documents"
        body="Le stockage est indisponible. Recharge la page ou vérifie la configuration Supabase."
      />
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-400">Admin · Archive</p>
        <h1 className="mt-2 text-2xl font-black text-white">Devis et factures (PDF)</h1>
        <p className="mt-1 text-sm text-white/50">
          Tous tes documents commerciaux au même endroit, conservés dans un stockage privé. Utile pour la comptabilité
          et en cas de contrôle.
        </p>
      </div>

      <AdminDocumentUpload />

      <div className="mt-8 grid gap-6">
        {sections.map((section) => {
          const items = documents.filter((doc) => doc.kind === section.kind);
          return (
            <section key={section.kind} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
                <span className="text-xs text-white/40">
                  {items.length} document{items.length > 1 ? "s" : ""}
                </span>
              </div>
              {items.length === 0 ? (
                <p className="mt-3 text-sm text-white/45">{section.empty}</p>
              ) : (
                <ul className="mt-3 divide-y divide-white/10">
                  {items.map((doc) => (
                    <li key={doc.path} className="flex flex-wrap items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{doc.name}</p>
                        <p className="text-xs text-white/45">
                          Archivé le {formatDate(doc.createdAt)} · {formatSize(doc.size)}
                        </p>
                      </div>
                      <a
                        href={`/api/admin/documents?path=${encodeURIComponent(doc.path)}`}
                        className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white hover:bg-white/10"
                      >
                        Télécharger
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
