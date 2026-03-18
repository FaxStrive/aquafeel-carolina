import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Join Our Water Treatment Team',
  description: 'Join the Aquafeel Solutions Carolina team. We are hiring water treatment specialists, technicians, and sales professionals in NC and SC. Competitive pay, benefits, and training.',
  alternates: { canonical: 'https://aquafeelcarolina.com/careers' },
  openGraph: {
    title: 'Careers | Aquafeel Solutions Carolina',
    description: 'Join our growing water treatment team in NC and SC. Open positions for technicians, specialists, and sales professionals.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/careers',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Careers at Aquafeel Solutions Carolina' }],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
