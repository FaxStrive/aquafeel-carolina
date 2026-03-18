import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | 18 Years Clean Water",
  description:
    "18 years of clean water excellence in NC and SC. NSF-certified, BBB A+ accredited water treatment specialists committed to educating families. Free in-home consultations available.",
  alternates: { canonical: 'https://aquafeelcarolina.com/about' },
  openGraph: {
    title: "About Aquafeel Solutions Carolina",
    description:
      "Founded in 2006, Aquafeel Solutions Carolina has helped thousands of NC and SC families achieve healthier water through testing, education, and NSF-certified purification systems.",
    type: "website",
    url: "https://aquafeelcarolina.com/about",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Aquafeel Solutions Carolina - 18 Years of Clean Water' }],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
