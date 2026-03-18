import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import SchemaMarkup from "@/components/seo/schema-markup";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Aquafeel Solutions Carolina | Free Water Testing & Purification",
    template: "%s | Aquafeel Solutions Carolina",
  },
  description:
    "Free in-home water testing for North Carolina and South Carolina families. NSF-certified whole-house water purification with Vortech technology. 25-year guarantee. Made in USA. BBB A+ rated. Schedule your free water test today.",
  keywords: [
    "free water test North Carolina",
    "water purification NC",
    "water filtration Raleigh",
    "water softener Charlotte",
    "well water treatment NC",
    "reverse osmosis system",
    "alkaline water system",
    "Aquafeel Solutions",
    "whole house water filter",
    "water testing near me",
    "NSF certified water system",
    "Vortech water technology",
  ],
  metadataBase: new URL("https://aquafeelcarolina.com"),
  openGraph: {
    title: "Aquafeel Solutions Carolina | Your Clean Water Heroes",
    description:
      "Just Because It's Clear Doesn't Mean It's Clean. Free professional water testing for Carolina families. NSF-certified systems with 25-year guarantee. Made in USA.",
    type: "website",
    locale: "en_US",
    siteName: "Aquafeel Solutions Carolina",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aquafeel Solutions Carolina - Clean Water Heroes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquafeel Solutions Carolina | Free Water Testing",
    description:
      "Free professional water testing for NC & SC families. NSF-certified systems with 25-year guarantee. Made in USA.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/hero-bg.jpg" />
      </head>
      <body
        className={`${montserrat.variable} ${dmSans.variable} antialiased`}
      >
        <SchemaMarkup />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
