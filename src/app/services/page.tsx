import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Water Treatment Services NC & SC',
  description: 'Aquafeel Solutions Carolina offers whole-house filtration, water softeners, alkaline RO, well water treatment, free water testing, and commercial solutions across NC and SC.',
  alternates: { canonical: 'https://aquafeelcarolina.com/services' },
  openGraph: {
    title: 'Water Treatment Services | Aquafeel Solutions Carolina',
    description: 'NSF-certified water treatment services for NC and SC homes and businesses. Free in-home water testing. 25-year warranty. BBB A+ rated.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/services',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Water Treatment Services - Aquafeel Solutions Carolina' }],
  },
};

const services = [
  {
    title: 'City Water Filtration',
    description: 'NSF-certified whole-house filtration for municipal water. Remove chlorine, heavy metals, and disinfection byproducts from every tap in your home.',
    href: '/services/city-water',
  },
  {
    title: 'Well Water Treatment',
    description: 'Complete well water purification removing iron, bacteria, sulfur, hardness, and arsenic for private well owners across NC and SC.',
    href: '/services/well-water',
  },
  {
    title: 'Alkaline Reverse Osmosis',
    description: 'Premium alkaline RO systems producing ultra-pure, pH-balanced drinking water with 99% contaminant removal and added minerals.',
    href: '/services/alkaline-ro',
  },
  {
    title: 'Free Water Testing',
    description: 'Professional in-home water quality test at no charge. We test for 30+ contaminants including hardness, chlorine, iron, bacteria, and pH.',
    href: '/services/water-testing',
  },
  {
    title: 'Commercial Water Treatment',
    description: 'Industrial-grade water purification for restaurants, hotels, healthcare facilities, and manufacturing operations in NC and SC.',
    href: '/services/commercial',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #171751 0%, #1e3a5f 50%, #0e7490 100%)' }}>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="flex items-center justify-center gap-2 mb-6 font-body text-sm text-white/60">
              <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
              <span className="text-white/40">›</span>
              <span className="text-white/80">Services</span>
            </nav>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Water Treatment <span className="text-[#2dd4bf]">Services</span>
            </h1>
            <p className="font-body text-white/75 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              NSF-certified solutions for every water challenge in North and South Carolina. Free in-home water testing included with every consultation.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-24 bg-[var(--color-surface)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group bg-white rounded-2xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm hover:shadow-lg hover:shadow-brand-navy/8 transition-all duration-300 hover:-translate-y-1"
                >
                  <h2 className="font-heading font-bold text-xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {service.title}
                  </h2>
                  <p className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="font-heading font-semibold text-sm text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center p-10 rounded-2xl bg-[var(--color-primary-dark)] text-white">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl mb-3">
                Not Sure Which System You Need?
              </h2>
              <p className="font-body text-white/75 mb-6 max-w-xl mx-auto">
                Our free in-home water test identifies exactly what is in your water and recommends the right solution. No obligation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-heading font-bold text-base hover:bg-[var(--color-accent)] transition-colors"
              >
                Schedule Free Water Test
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
