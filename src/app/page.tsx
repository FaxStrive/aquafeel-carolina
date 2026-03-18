import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import WaterQuality from "@/components/WaterQuality";
import EWGChecker from "@/components/EWGChecker";
import SavingsCalculator from "@/components/SavingsCalculator";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import FloatingCTA from "@/components/FloatingCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SocialProofToasts from "@/components/SocialProofToasts";
import ScrollCTA from "@/components/ScrollCTA";
import Footer from "@/components/Footer";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Aquafeel Solutions Carolina | Free Water Testing NC & SC',
  },
  description: 'Free in-home water testing for NC and SC families. NSF-certified whole-house filtration, water softeners, and alkaline RO systems. 18+ years experience. BBB A+ rated. Schedule your free water test today.',
  alternates: { canonical: 'https://aquafeelcarolina.com/' },
};


export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <EWGChecker />
        <Services />
        <About />
        <Process />
        <Stats />
        <Testimonials />
        <Certifications />
        <WaterQuality />
        <SavingsCalculator />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingCTA />
      <ExitIntentPopup />
      <SocialProofToasts />
      <ScrollCTA />
    </>
  );
}
