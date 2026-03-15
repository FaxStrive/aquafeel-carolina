import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WaterQuality from "@/components/WaterQuality";
import EWGChecker from "@/components/EWGChecker";
import SavingsCalculator from "@/components/SavingsCalculator";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

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
        <WaterQuality />
        <SavingsCalculator />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
