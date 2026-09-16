import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toufiltex — Fils Textiles Industriels | Tlemcen, Algérie",
  description: "Toufiltex : L'excellence du fil importé pour les textiles d'exception professionnels. Basée à Tlemcen, votre partenaire direct en Algérie pour l'approvisionnement en fils de coton, polyester, acrylique et laine.",
  keywords: "Toufiltex, fils textiles, Algérie, Tlemcen, filature, coton peigné, polyester, fils industriels, confection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
