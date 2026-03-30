import type { Metadata } from "next";
import { Special_Gothic, Azeret_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const specialGothic = Special_Gothic({
  variable: "--font-special-gothic",
  subsets: ["latin"],
  weight: "400",
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
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
  title: "Private Capital Group",
  description: "New Zealand's most experienced private capital lender.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${specialGothic.variable} ${seasonSerif.variable} ${azeretMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
