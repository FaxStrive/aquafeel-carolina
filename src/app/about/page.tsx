import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Aquafeel Solutions | 18 Years of Clean Water Excellence",
  description:
    "Learn about Aquafeel Solutions — 18 years helping families and businesses understand and improve their water quality. NSF certified, BBB accredited, nationwide service.",
  openGraph: {
    title: "About Aquafeel Solutions | Your Clean Water Heroes",
    description:
      "Founded in 2008, Aquafeel Solutions provides professional water testing, education, and customized treatment solutions for homes and businesses nationwide.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
