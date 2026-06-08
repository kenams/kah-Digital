import type { Metadata } from "next";
import { handleAdminAccessState, requireAdminAccess } from "@/app/(admin)/admin/_shared";
import { AdminSocialDashboard } from "@/components/admin-social-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Social Poster — Admin KAH Digital",
};

export default async function SocialPage() {
  const access = await requireAdminAccess();
  const accessState = handleAdminAccessState(access);
  if (accessState) return accessState;

  return <AdminSocialDashboard />;
}
