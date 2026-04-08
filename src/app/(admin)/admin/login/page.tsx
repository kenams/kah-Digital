import { AdminLoginForm } from "@/components/admin-login-form";

type AdminLoginPageProps = {
  searchParams?: Promise<{ error?: string; info?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const errorParam =
    typeof resolvedSearchParams?.error === "string" ? resolvedSearchParams.error : null;

  const infoParam =
    typeof resolvedSearchParams?.info === "string" ? resolvedSearchParams.info : null;

  return <AdminLoginForm errorParam={errorParam} infoParam={infoParam} />;
}
