import type { Metadata } from "next";
import { Special_Gothic, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const specialGothic = Special_Gothic({
  variable: "--font-special-gothic",
  subsets: ["latin"],
  weight: "400",
  adjustFontFallback: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const seasonSerif = localFont({
  src: [
    {
      path: "../../public/fonts/SeasonSerif-TRIAL-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/SeasonSerif-TRIAL-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-season-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | PCG | Private Capital Group',
    default: "PCG | Private Capital Group | New Zealand's most experienced private capital lender.",
  },
  description: "New Zealand's most experienced private capital lender.",
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "New Zealand's most experienced private capital lender.",
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: "New Zealand's most experienced private capital lender.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${specialGothic.variable} ${seasonSerif.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">{children}</body>
    </html>
  );
}
