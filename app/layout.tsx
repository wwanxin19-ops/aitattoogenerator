import type { Metadata } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { Footer, NavBar } from "@/components/SiteChrome";
import { siteUrl } from "@/lib/constants";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { ConditionalAnalytics } from "@/components/ConditionalAnalytics";
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
    default: "AI Tattoo Generator Free — Design Your Tattoo Online in 30 Seconds",
    template: "%s | AI Tattoo Generator"
  },
  description: "Free AI tattoo generator — create your design in 30 seconds, no signup needed. Preview before you ink. 3 free designs daily. Try now.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Tattoo Generator Free — Design Your Tattoo Online in 30 Seconds",
    description: "Free AI tattoo generator — create your design in 30 seconds, no signup needed. Preview before you ink.",
    url: siteUrl,
    siteName: "AI Tattoo Generator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Tattoo Generator preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tattoo Generator Free — Design Your Tattoo Online in 30 Seconds",
    description: "Free AI tattoo generator — create your design in 30 seconds, no signup needed. Preview before you ink.",
    images: ["/og-image.png"]
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${ibmPlexMono.variable}`}>
      <body>
        <ConditionalAnalytics />
        <CookieConsentBanner />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
// Deploy timestamp: Thu May 28 05:44:56 PM CST 2026
// force rebuild 1779962384
// force rebuild 1780146309
