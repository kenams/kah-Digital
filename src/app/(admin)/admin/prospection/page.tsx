import type { Metadata } from "next";
import { handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { ProspectionDashboard } from "@/components/admin-prospection-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prospection IA — Admin KAH-Digital",
};

export default async function ProspectionPage() {
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  return <ProspectionDashboard />;
}
