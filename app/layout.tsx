import type { Metadata } from "next";
import { Pinyon_Script, Cormorant_Garamond, Jost } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import CursorTrail from "@/components/CursorTrail";
import MobileBookingPill from "@/components/MobileBookingPill";
import ClickSpark from "@/components/ClickSpark";
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
  metadataBase: new URL("https://s0mped.xyz"),
  title: "Tooth Gem Artist in NYC | sompednyc",
  description:
    "Custom Swarovski crystal tooth gems in NYC, applied safely and painlessly. Mobile service — I come to you. Lead-free crystals, dental-grade bonding. Book with @sompednyc.",
  keywords: [
    "tooth gems NYC",
    "tooth gems near me",
    "tooth gem artist NYC",
    "tooth gem artist Manhattan",
    "tooth jewelry",
    "Swarovski tooth gems",
    "dental gems",
    "sompednyc",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Tooth Gem Artist in NYC | sompednyc",
    description:
      "Custom Swarovski crystal tooth gems in NYC, applied safely and painlessly. Mobile service — I come to you. Book with @sompednyc.",
    url: "https://s0mped.xyz",
    siteName: "sompednyc",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "sompednyc",
  alternateName: "s0mped",
  description:
    "Custom Swarovski crystal tooth gems in NYC, applied safely and painlessly. Mobile, by-appointment service throughout New York City.",
  url: "https://s0mped.xyz",
  image: "https://s0mped.xyz/opengraph-image",
  priceRange: "$55–$140",
  areaServed: {
    "@type": "City",
    name: "New York City",
  },
  sameAs: ["https://www.instagram.com/sompednyc/"],
  makesOffer: [
    { "@type": "Offer", name: "Single Gem", price: "55", priceCurrency: "USD" },
    { "@type": "Offer", name: "Additional Gem (each)", price: "10", priceCurrency: "USD" },
    { "@type": "Offer", name: "Butterfly Set", price: "70", priceCurrency: "USD" },
    { "@type": "Offer", name: "Freestyle (5–6 crystals)", price: "80", priceCurrency: "USD" },
    { "@type": "Offer", name: "18k Gold / White Gold Charm", price: "140", priceCurrency: "USD" },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        <CursorTrail />
        <MobileBookingPill />
        <ClickSpark
          sparkColor="#F2EEFF"
          sparkSize={11}
          sparkRadius={18}
          sparkCount={10}
          duration={500}
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
