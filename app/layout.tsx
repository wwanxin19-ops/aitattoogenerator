import type { Metadata } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { Footer, NavBar } from "@/components/SiteChrome";
import { siteUrl } from "@/lib/constants";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-ibm-plex-mono", display: "swap" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#15120e",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Tattoo Generator — See Your Tattoo Before You Ink It",
    template: "%s | AI Tattoo Generator"
  },
  description: "Preview tattoo ideas with an AI tattoo generator designed for references you can discuss with a licensed tattoo artist.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Tattoo Generator — See Your Tattoo Before You Ink It",
    description: "Preview tattoo ideas before getting inked.",
    url: siteUrl,
    siteName: "AI Tattoo Generator",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
// Deploy timestamp: Thu May 28 05:44:56 PM CST 2026
// force rebuild 1779962384
