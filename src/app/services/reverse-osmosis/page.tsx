import { redirect } from "next/navigation";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reverse Osmosis Systems NC & SC',
  description: 'High-efficiency reverse osmosis drinking water systems for NC and SC homes. 99% contaminant removal. Free in-home water test. Call (984) 212-3558.',
  alternates: { canonical: '/services/alkaline-ro' },
};


export default function ReverseOsmosisPage() {
  redirect("/services/alkaline-ro");
}
