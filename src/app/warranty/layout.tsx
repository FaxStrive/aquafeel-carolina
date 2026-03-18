import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '25-Year Warranty on Water Systems',
  description: 'Aquafeel Solutions Carolina backs every water treatment system with a 25-year limited warranty. Lifetime guarantee on media beds. 30-day satisfaction guarantee. Learn what is covered.',
  alternates: { canonical: 'https://aquafeelcarolina.com/warranty' },
  openGraph: {
    title: 'Water System Warranty | Aquafeel Solutions Carolina',
    description: '25-year limited warranty on all water treatment systems. Lifetime guarantee on media beds. 30-day satisfaction guarantee. Peace of mind included.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/warranty',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '25-Year Water System Warranty - Aquafeel Solutions Carolina' }],
  },
};

export default function WarrantyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
