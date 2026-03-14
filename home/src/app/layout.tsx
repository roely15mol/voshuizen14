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
  title: "Voshuizen 14",
  description: "Welkom bij Voshuizen 14",
  robots: "noindex, nofollow",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${cormorant.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
