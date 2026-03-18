import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alkaline Reverse Osmosis Drinking Water',
  description: 'Premium alkaline RO systems for NC and SC homes. Ultra-pure, pH-balanced drinking water with 99% contaminant removal and remineralization. Free in-home water test. Call (984) 212-3558.',
  alternates: { canonical: 'https://aquafeelcarolina.com/services/alkaline-ro' },
  openGraph: {
    title: 'Alkaline Reverse Osmosis | Aquafeel Solutions Carolina',
    description: 'Premium alkaline RO drinking water systems for NC and SC homes. 99% contaminant removal, pH-balanced water, remineralization stage. Free water test.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/services/alkaline-ro',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Alkaline Reverse Osmosis Systems - Aquafeel Solutions Carolina' }],
  },
};

export default function AlkalineRoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
