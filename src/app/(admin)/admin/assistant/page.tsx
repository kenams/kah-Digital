import { redirect } from "next/navigation";

export default function AdminAssistantRootPage() {
  redirect("/admin/demandes?section=assistant");
}
