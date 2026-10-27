import "../globals.css";

// Routes hors des groupes (fr)/(en)/(de) : sans ce layout racine, le CSS global n'est pas chargé
// et la page s'affiche en texte brut.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
