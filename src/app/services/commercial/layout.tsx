import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Water Treatment NC & SC',
  description: 'Industrial water treatment for NC and SC businesses. Restaurants, hotels, healthcare, and manufacturing. NSF-certified systems, service contracts, 24-hour support. Call (984) 212-3558.',
  alternates: { canonical: 'https://aquafeelcarolina.com/services/commercial' },
  openGraph: {
    title: 'Commercial Water Treatment | Aquafeel Solutions Carolina',
    description: 'Industrial-grade water purification for NC and SC businesses. Restaurants, hotels, healthcare, manufacturing. NSF-certified. Service contracts available.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/services/commercial',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Commercial Water Treatment NC & SC - Aquafeel Solutions Carolina' }],
  },
};

export default function CommercialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
