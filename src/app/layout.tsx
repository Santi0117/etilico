import type { Metadata } from "next";
import { Bodoni_Moda, Outfit } from "next/font/google";
import Preloader from "@/components/Preloader";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.fullName} — Barra libre para eventos en ${site.region}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Servicio de barra libre y coctelería para bodas, corporativos y fiestas en Costa Rica. Tres barras propias, bartenders, montaje y carta a la medida de tu evento.",
  keywords: [
    "barra libre Costa Rica",
    "coctelería para eventos",
    "bartenders para bodas",
    "barra móvil",
    "open bar Costa Rica",
  ],
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: siteUrl,
    siteName: site.fullName,
    title: `${site.fullName} — Barra libre para eventos`,
    description:
      "Barra libre y coctelería profesional para todo tipo de eventos en Costa Rica.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — Barra libre para eventos`,
    description: "Barra libre y coctelería profesional para eventos en Costa Rica.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${outfit.variable} ${bodoni.variable} h-full`}>
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-clip antialiased">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
