import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Quality Blog & Resources',
  description: 'Expert water quality tips, guides, and advice for NC and SC homeowners. Learn about hard water, contamination, filtration options, and how to get clean water for your family.',
  alternates: { canonical: 'https://aquafeelcarolina.com/blog' },
  openGraph: {
    title: 'Water Quality Blog | Aquafeel Solutions Carolina',
    description: 'Expert advice on water quality, filtration, and purification for NC and SC homeowners. Tips, guides, and educational resources.',
    type: 'website',
    url: 'https://aquafeelcarolina.com/blog',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Water Quality Blog - Aquafeel Solutions Carolina' }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
