import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Well Water Treatment NC & SC',
  description: 'Complete well water treatment for NC and SC private well owners. Remove iron, bacteria, sulfur, hardness, and arsenic. NSF-certified systems. Free water test. Call (984) 212-3558.',
  alternates: { canonical: 'https://aquafeelcarolina.com/services/well-water' },
  openGraph: {
    title: 'Well Water Treatment | Aquafeel Solutions Carolina',
    description: 'Complete well water purification for NC and SC homeowners. Remove iron, bacteria, sulfur, and hardness minerals. NSF-certified. Free in-home water test.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/services/well-water',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Well Water Treatment NC & SC - Aquafeel Solutions Carolina' }],
  },
};

export default function WellWaterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
