import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water System Installation Gallery',
  description: 'See real water treatment installations by Aquafeel Solutions Carolina across NC and SC. Whole-house filters, softeners, RO systems, and more. Before and after photos.',
  alternates: { canonical: 'https://aquafeelcarolina.com/gallery' },
  openGraph: {
    title: 'Installation Gallery | Aquafeel Solutions Carolina',
    description: 'Real water treatment installations across NC and SC. Whole-house filters, softeners, RO systems. See what we have installed for local families.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/gallery',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Water System Installation Gallery - Aquafeel Solutions Carolina' }],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
