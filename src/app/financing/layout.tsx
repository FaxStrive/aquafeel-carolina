import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water System Financing Options',
  description: 'Flexible financing options for water treatment systems in NC and SC. Zero-down payment plans available. Get clean water now and pay over time. Call (984) 212-3558.',
  alternates: { canonical: 'https://aquafeelcarolina.com/financing' },
  openGraph: {
    title: 'Financing | Aquafeel Solutions Carolina',
    description: 'Flexible payment plans for water treatment systems in NC and SC. Zero-down options available. Clean water for every budget.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/financing',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Water System Financing - Aquafeel Solutions Carolina' }],
  },
};

export default function FinancingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
