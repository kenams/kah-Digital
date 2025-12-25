import Link from "next/link";

const footerLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">Kah-Digital</p>
          <p className="text-sm text-white/70">
            Création de sites & solutions digitales — réponse sous 24h.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Contact :{" "}
            <Link href="mailto:hello@kah-digital.com" className="underline">
              hello@kah-digital.com
            </Link>{" "}
            · +33 6 00 00 00 00
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
