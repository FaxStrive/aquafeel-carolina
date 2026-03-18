import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'City Water Filtration NC & SC',
  description: 'NSF-certified whole-house city water filtration for NC and SC homes. Remove chlorine, chloramine, heavy metals, and disinfection byproducts from every tap. Free water test.',
  alternates: { canonical: 'https://aquafeelcarolina.com/services/city-water' },
  openGraph: {
    title: 'City Water Filtration | Aquafeel Solutions Carolina',
    description: 'NSF-certified whole-house filtration for NC and SC city water homes. Remove chlorine, heavy metals, and disinfection byproducts. Schedule a free water test.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/services/city-water',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'City Water Filtration NC & SC - Aquafeel Solutions Carolina' }],
  },
};

export default function CityWaterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
