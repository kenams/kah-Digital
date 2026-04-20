import type { Metadata } from "next";
import { ProspectionDashboard } from "@/components/admin-prospection-dashboard";

export const metadata: Metadata = {
  title: "Prospection IA — Admin KAH-Digital",
};

export default function ProspectionPage() {
  return <ProspectionDashboard />;
}
