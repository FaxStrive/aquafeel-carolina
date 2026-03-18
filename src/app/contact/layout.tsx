import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Free Water Test Estimate',
  description: 'Schedule your free in-home water test or contact Aquafeel Solutions Carolina for a consultation. We serve NC and SC. Call (984) 212-3558 or submit the form online.',
  alternates: { canonical: 'https://aquafeelcarolina.com/contact' },
  openGraph: {
    title: 'Contact Aquafeel Solutions Carolina',
    description: 'Schedule a free water test for your NC or SC home. Call (984) 212-3558. Fast response, no obligation.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact Aquafeel Solutions Carolina' }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
