import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import SchemaMarkup from "@/components/SchemaMarkup";
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
  title: "Aquafeel Solutions Carolina | Water Quality Testing & Purification",
  description:
    "Professional water quality testing and purification solutions for homes and businesses. Locally owned and veteran operated. 18 years of experience. Free in-home water consultations. NSF certified systems.",
  keywords: [
    "water quality testing",
    "water purification",
    "water filtration",
    "reverse osmosis",
    "water softener",
    "well water treatment",
    "commercial water filtration",
    "North Carolina",
    "water testing near me",
    "veteran owned water company",
  ],
  openGraph: {
    title: "Aquafeel Solutions Carolina | Your Clean Water Heroes",
    description:
      "Just Because It's Clear Doesn't Mean It's Clean. Locally owned and veteran operated. Professional water testing and purification for North Carolina families and businesses.",
    type: "website",
    locale: "en_US",
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
        <SchemaMarkup />
      </head>
      <body
        className={`${montserrat.variable} ${dmSans.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
