"use server";

import { revalidatePath } from "next/cache";
import { clip } from "@/lib/html-escape";
import { sendDecisionToOwner } from "@/lib/scopelock/mail";
import { decide, findAccountById, getByToken } from "@/lib/scopelock/store";

export async function decideAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const decision = formData.get("decision") === "accepted" ? "accepted" : "refused";
  const note = clip(formData.get("note"), 1000, true);
  const request = await getByToken(token);
  if (!request) return;
  const changed = await decide(token, decision, note);
  if (changed) {
    const owner = await findAccountById(request.scopelock_projects.account_id);
    if (owner) {
      await sendDecisionToOwner({
        to: owner.email,
        title: request.title,
        clientName: request.scopelock_projects.client_name,
        decision,
        note,
      }).catch((e) => console.error("scopelock notify", e instanceof Error ? e.message : e));
    }
  }
  revalidatePath(`/scopelock/v/${token}`);
}
