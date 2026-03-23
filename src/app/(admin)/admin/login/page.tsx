import { AdminLoginForm } from "@/components/admin-login-form";

type AdminLoginPageProps = {
  searchParams?: { error?: string; info?: string };
};

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const errorParam = typeof searchParams?.error === "string" ? searchParams.error : null;

  const infoParam = typeof searchParams?.info === "string" ? searchParams.info : null;

  return <AdminLoginForm errorParam={errorParam} infoParam={infoParam} />;
}
