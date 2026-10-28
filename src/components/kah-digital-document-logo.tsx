import { BrandLockup } from "@/components/brand-lockup";

interface KahDigitalDocumentLogoProps {
  className?: string;
}

export function KahDigitalDocumentLogo({ className = "" }: KahDigitalDocumentLogoProps) {
  return <BrandLockup theme="light" className={className} />;
}
