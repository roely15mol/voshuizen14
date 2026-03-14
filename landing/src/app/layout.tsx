import type { Metadata } from "next";
import { Cormorant, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voshuizen14.nl"),
  title: "Voshuizen 14 — Lieren, Veluwe",
  description:
    "Voshuizen 14 ligt aan de rand van de Veluwe, in het dorpje Lieren bij Apeldoorn. Omringd door bossen, heidevelden en stilte.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Voshuizen 14 — Lieren, Veluwe",
    description:
      "Voshuizen 14 ligt aan de rand van de Veluwe, in het dorpje Lieren bij Apeldoorn.",
    type: "website",
    locale: "nl_NL",
    url: "https://voshuizen14.nl",
    images: ["/photos/seasons/lente.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      name: "Voshuizen 14",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Voshuizen 14",
        postalCode: "7364 BP",
        addressLocality: "Lieren",
        addressRegion: "Gelderland",
        addressCountry: "NL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 52.1619,
        longitude: 5.9877,
      },
    },
    {
      "@type": "WebSite",
      name: "Voshuizen 14",
      url: "https://voshuizen14.nl",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
