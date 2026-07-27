import type { Metadata } from "next";
import { handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { ProspectionTabs } from "@/components/admin-prospection-tabs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prospection — Admin KAH Digital",
};

export default async function ProspectionPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  const searchParams = (await props.searchParams) ?? {};
  const tab =
    searchParams.tab === "kah-support" ? "kah-support" :
    searchParams.tab === "kah-workforce" ? "kah-workforce" :
    "web";

  return <ProspectionTabs defaultTab={tab} />;
}
