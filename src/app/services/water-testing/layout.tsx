import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Water Testing NC & SC',
  description: 'Professional free in-home water quality testing for NC and SC homes. We test for 30+ contaminants: hardness, chlorine, iron, bacteria, and pH. No obligation. Call (984) 212-3558.',
  alternates: { canonical: 'https://aquafeelcarolina.com/services/water-testing' },
  openGraph: {
    title: 'Free Water Testing | Aquafeel Solutions Carolina',
    description: 'Free professional in-home water testing for NC and SC families. Test for 30+ contaminants. No obligation. NSF-certified specialists. Schedule today.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/services/water-testing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Free Water Testing NC & SC - Aquafeel Solutions Carolina' }],
  },
};

export default function WaterTestingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
