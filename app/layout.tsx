import type { Metadata } from "next";
import { Pinyon_Script, Cormorant_Garamond, Jost } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import CursorTrail from "@/components/CursorTrail";
import MobileBookingPill from "@/components/MobileBookingPill";
import "./globals.css";

const pinyonScript = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const jost = Jost({
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "sompednyc | Tooth Gem Artist",
  description:
    "Luxury tooth gems applied with care. Custom Swarovski crystal and gold tooth jewelry by @sompednyc.",
  keywords: ["tooth gems", "tooth jewelry", "Swarovski", "dental gems", "sompednyc"],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "sompednyc | Tooth Gem Artist",
    description: "Luxury tooth gems applied with care. Book your appointment.",
    type: "website",
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
      className={`${pinyonScript.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="font-body min-h-screen">
        <LoadingScreen />
        <CursorTrail />
        <MobileBookingPill />
        {children}
      </body>
    </html>
  );
}
