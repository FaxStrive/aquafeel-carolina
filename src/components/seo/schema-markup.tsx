'use client'

import { usePathname } from 'next/navigation'

const SITE_URL = 'https://aquafeelcarolina.com'
const BUSINESS_NAME = 'Aquafeel Solutions Carolina'
const DATE_MODIFIED = '2025-01-15'

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  "name": BUSINESS_NAME,
  "description": "NSF-certified whole-house water purification, water softeners, reverse osmosis, and free in-home water testing for North Carolina and South Carolina families. 18+ years experience. BBB A+ rated. Made in USA.",
  "url": SITE_URL,
  "telephone": "+1-984-212-3558",
  "email": "info@aquafeelcarolina.com",
  "priceRange": "$$",
  "image": `${SITE_URL}/images/og-image.png`,
  "logo": `${SITE_URL}/images/client/logo-light.jpeg`,
  "foundingDate": "2006",
  "dateModified": DATE_MODIFIED,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Wake Forest",
    "addressRegion": "NC",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.9799,
    "longitude": -78.5097
  },
  "areaServed": [
    { "@type": "State", "name": "North Carolina" },
    { "@type": "State", "name": "South Carolina" },
    { "@type": "City", "name": "Raleigh" },
    { "@type": "City", "name": "Charlotte" },
    { "@type": "City", "name": "Wake Forest" },
    { "@type": "City", "name": "Durham" },
    { "@type": "City", "name": "Cary" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200",
    "bestRating": "5"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Water Treatment Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Whole-House Water Filtration",
          "description": "NSF-certified whole-house filtration systems using Vortech technology that remove chlorine, sediment, heavy metals, and contaminants from every tap in your home.",
          "url": `${SITE_URL}/services/city-water`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Well Water Treatment",
          "description": "Complete well water treatment systems that remove iron, bacteria, sulfur, and hardness minerals for clean, safe drinking water from private wells.",
          "url": `${SITE_URL}/services/well-water`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Alkaline Reverse Osmosis System",
          "description": "Premium alkaline RO drinking water systems that produce ultra-pure, pH-balanced water at your kitchen sink with 99% contaminant removal.",
          "url": `${SITE_URL}/services/alkaline-ro`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free In-Home Water Testing",
          "description": "Professional in-home water quality testing at no charge. We test for hardness, chlorine, iron, pH, TDS, and over 30 contaminants.",
          "url": `${SITE_URL}/services/water-testing`
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Water Treatment",
          "description": "Industrial and commercial water purification systems for restaurants, offices, healthcare facilities, and manufacturing operations.",
          "url": `${SITE_URL}/services/commercial`
        }
      }
    ]
  }
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "name": BUSINESS_NAME,
  "url": SITE_URL,
  "dateModified": DATE_MODIFIED,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/?s={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
}

const homepageFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": DATE_MODIFIED,
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does hard water do to my home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hard water causes scale buildup in pipes and appliances, reduces soap lathering, leaves spots on dishes and fixtures, and can cost homeowners up to $800 per year in extra energy and appliance repair costs (U.S. DOE). 85% of U.S. homes have hard water, including most of North and South Carolina."
      }
    },
    {
      "@type": "Question",
      "name": "Is the water testing really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our in-home water test is completely free with no obligation. A certified water specialist visits your home, tests your water for hardness, chlorine, iron, pH, TDS, and other key parameters, then explains the results and recommends solutions only if needed."
      }
    },
    {
      "@type": "Question",
      "name": "How long does water system installation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most whole-house water treatment systems are installed in 2–4 hours. Our technicians handle everything — no plumber needed separately. We clean up after installation and walk you through system operation before we leave."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Vortech technology used in your systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vortech is a patented tank distributor technology that uses an upward-flow regeneration pattern, which requires 30–50% less salt and water than conventional systems. It also eliminates the need for gravel underbed, making the system more efficient and environmentally friendly."
      }
    },
    {
      "@type": "Question",
      "name": "Do you service both city water and well water homes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer specialized solutions for both municipal city water (which often contains chlorine, chloramine, and disinfection byproducts) and private well water (which can contain iron, bacteria, sulfur, and arsenic). We test first to recommend the right system."
      }
    },
    {
      "@type": "Question",
      "name": "What warranty comes with Aquafeel water systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our systems come with a 25-year limited warranty on tanks and a lifetime guarantee on the media bed. We also offer a satisfaction guarantee — if your water quality doesn't improve to your expectations within 30 days, we will service or replace the system at no charge."
      }
    }
  ]
}

function getBreadcrumbs(pathname: string) {
  if (pathname === '/') return null
  const segments = pathname.split('/').filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'dateModified': DATE_MODIFIED,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...segments.map((seg: string, i: number) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: seg.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        item: `${SITE_URL}/${segments.slice(0, i + 1).join('/')}`,
      })),
    ],
  }
}

const SERVICE_FAQS: Record<string, Array<{ name: string; text: string }>> = {
  'city-water': [
    {
      name: "What contaminants does city water treatment remove?",
      text: "Our city water systems remove chlorine, chloramine, trihalomethanes (THMs), haloacetic acids (HAAs), VOCs, sediment, and heavy metals like lead and mercury. These byproducts form when municipal utilities disinfect water and have been linked to increased cancer risk by the EPA."
    },
    {
      name: "Is Charlotte or Raleigh city water safe to drink straight from the tap?",
      text: "Municipal water meets EPA legal limits, but 'legal' doesn't always mean 'healthy'. Charlotte and Raleigh water regularly contain detectable levels of chlorine byproducts, lead (from older pipes), and agricultural runoff. Our free water test shows exactly what's in your specific home's water."
    },
    {
      name: "How often does a whole-house city water filter need maintenance?",
      text: "Our Vortech whole-house systems require a salt refill approximately every 6–8 weeks for the softener portion and a filter media replacement every 3–5 years. We offer annual service plans that include a professional check, salt delivery, and any needed adjustments."
    },
    {
      name: "Will a water softener affect my water pressure?",
      text: "No. Our systems are designed for zero pressure loss. In fact, removing hardness scale buildup from pipes often improves pressure in older homes over time."
    }
  ],
  'well-water': [
    {
      name: "What is typically wrong with well water in North Carolina?",
      text: "NC well water commonly tests positive for iron (causing rust stains), hydrogen sulfide (rotten egg smell), hardness minerals, coliform bacteria, and elevated manganese. Many western NC wells also show elevated arsenic levels from natural geology. A free test reveals exactly what's present."
    },
    {
      name: "How do I know if my well water has bacteria?",
      text: "Bacteria contamination is invisible and odorless. The only way to know is testing. Our free in-home test includes a basic bacteria screen. If coliform bacteria are detected, we recommend a UV disinfection system which kills 99.99% of bacteria and viruses without chemicals."
    },
    {
      name: "Can you treat iron and sulfur smell in well water?",
      text: "Yes. Moderate iron levels (under 10 ppm) are effectively treated by our iron reduction filter media. Hydrogen sulfide (sulfur smell) is eliminated with an aeration or oxidation system. For high iron or combined iron/manganese/sulfur problems, we use a multi-stage treatment approach."
    },
    {
      name: "Does a well water system require electricity?",
      text: "The filtration media works without electricity, but the UV disinfection component and automatic regeneration controls do require a standard 120V outlet. Our systems are designed for minimal power consumption — typically under 50 watts total."
    }
  ],
  'alkaline-ro': [
    {
      name: "What is the difference between reverse osmosis and alkaline RO?",
      text: "Standard reverse osmosis removes 95–99% of contaminants but produces slightly acidic water (pH 6–6.5) because it also removes beneficial minerals. Our alkaline RO adds a remineralization stage that restores calcium, magnesium, and potassium, producing clean water with a healthy pH of 8–9.5."
    },
    {
      name: "How much water does an RO system waste?",
      text: "Traditional RO systems waste 3–4 gallons for every gallon of clean water produced. Our modern systems use a permeate pump that reduces waste to a 1:1 ratio — 1 gallon waste per 1 gallon clean water — making them 75% more efficient than older designs."
    },
    {
      name: "How long do RO filters last?",
      text: "Our alkaline RO systems have three stages: sediment and carbon pre-filters (replaced every 6–12 months), the RO membrane (every 2–3 years), and the alkaline remineralization cartridge (every 12 months). Total annual maintenance cost is typically $50–$100."
    },
    {
      name: "Does reverse osmosis remove fluoride?",
      text: "Yes. Reverse osmosis removes 85–95% of fluoride along with lead, arsenic, chromium, nitrates, pharmaceuticals, and virtually all dissolved solids. It is one of the most thorough purification methods available for drinking water."
    }
  ],
  'water-testing': [
    {
      name: "What does the free water test check for?",
      text: "Our in-home test checks water hardness (grains per gallon), chlorine and chloramine levels, iron content, pH, total dissolved solids (TDS), hydrogen sulfide presence, and turbidity. For well water we also screen for coliform bacteria. Results are explained on the spot."
    },
    {
      name: "How accurate is an in-home water test versus a lab test?",
      text: "Our certified field tests are accurate within 5–10% for most parameters and are equivalent to EPA-approved field test methods. For well water concerns involving heavy metals or specific contaminants, we can arrange a certified laboratory analysis at no additional charge."
    },
    {
      name: "Do I need to do anything to prepare for the water test?",
      text: "No preparation needed. We bring all equipment. However, if you have a well, it helps to run a faucet for 1–2 minutes before we arrive to flush standing water from the pressure tank. Let us know your main water concerns in advance so we can tailor the test."
    },
    {
      name: "What happens after the water test?",
      text: "We explain every result in plain language, show you how your water compares to EPA health guidelines, and recommend solutions only if they are genuinely needed. There is never any pressure to purchase anything. Many customers simply use the results to confirm their water is fine."
    }
  ],
  'commercial': [
    {
      name: "What types of businesses do you serve?",
      text: "We serve restaurants, cafes, hotels, healthcare facilities, dental offices, car washes, manufacturing plants, and office buildings throughout North and South Carolina. Any business that relies on consistent water quality benefits from a commercial treatment system."
    },
    {
      name: "How is commercial water treatment different from residential?",
      text: "Commercial systems are sized for higher flow rates (typically 20–200+ gallons per minute), use industrial-grade components rated for continuous operation, and include monitoring capabilities. We conduct a commercial water audit first to right-size the system for your actual usage patterns."
    },
    {
      name: "Can hard water damage commercial equipment?",
      text: "Yes. Hard water scale buildup in commercial dishwashers, steamers, ice machines, boilers, and HVAC cooling towers significantly reduces efficiency and lifespan. The American Water Works Association estimates scale reduces boiler efficiency by up to 12% per quarter-inch of scale buildup."
    },
    {
      name: "Do you offer service contracts for commercial systems?",
      text: "Yes. We offer monthly, quarterly, and annual service contracts for all commercial installations. Contracts include scheduled preventive maintenance, 24-hour emergency response, water quality monitoring reports, and priority parts replacement."
    }
  ]
}

function getServiceSchema(pathname: string) {
  if (!pathname.startsWith('/services/')) return null
  const slug = pathname.replace('/services/', '').replace(/\/$/, '')

  const serviceDetails: Record<string, { name: string; description: string; url: string }> = {
    'city-water': {
      name: 'Whole-House City Water Filtration',
      description: 'NSF-certified whole-house filtration for municipal water. Removes chlorine, chloramine, heavy metals, and disinfection byproducts from every faucet in your home.',
      url: `${SITE_URL}/services/city-water`
    },
    'well-water': {
      name: 'Well Water Treatment Systems',
      description: 'Complete well water purification removing iron, bacteria, sulfur, hardness, and arsenic for NC and SC homeowners with private wells.',
      url: `${SITE_URL}/services/well-water`
    },
    'alkaline-ro': {
      name: 'Alkaline Reverse Osmosis Drinking Water',
      description: 'Premium alkaline RO systems that produce ultra-pure, pH-balanced drinking water with 99% contaminant removal and added minerals.',
      url: `${SITE_URL}/services/alkaline-ro`
    },
    'water-testing': {
      name: 'Free In-Home Water Testing',
      description: 'Professional water quality testing at no charge. Tests for 30+ parameters including hardness, chlorine, iron, pH, TDS, and bacteria.',
      url: `${SITE_URL}/services/water-testing`
    },
    'commercial': {
      name: 'Commercial Water Treatment',
      description: 'Industrial-grade water purification systems for NC and SC businesses. Restaurants, hotels, healthcare, manufacturing, and more.',
      url: `${SITE_URL}/services/commercial`
    },
    'reverse-osmosis': {
      name: 'Reverse Osmosis Systems',
      description: 'High-efficiency reverse osmosis drinking water systems with 99% contaminant removal for North and South Carolina homes.',
      url: `${SITE_URL}/services/reverse-osmosis`
    }
  }

  const details = serviceDetails[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
    description: `Professional ${slug.replace(/-/g, ' ')} services in North Carolina and South Carolina. Contact ${BUSINESS_NAME} for a free estimate.`,
    url: `${SITE_URL}${pathname}`
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'dateModified': DATE_MODIFIED,
    'name': details.name,
    'description': details.description,
    'url': details.url,
    'provider': {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      'name': BUSINESS_NAME,
      'url': SITE_URL,
      'telephone': '+1-984-212-3558'
    },
    'areaServed': [
      { '@type': 'State', 'name': 'North Carolina' },
      { '@type': 'State', 'name': 'South Carolina' }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': details.name
    }
  }

  const faqs = SERVICE_FAQS[slug]
  if (!faqs) return serviceSchema

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'dateModified': DATE_MODIFIED,
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.name,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.text
      }
    }))
  }

  return [serviceSchema, faqSchema]
}

export default function SchemaMarkup() {
  const pathname = usePathname()
  const schemas: object[] = []

  if (pathname === '/') {
    schemas.push(localBusinessSchema, websiteSchema, homepageFAQSchema)
  }

  const breadcrumbs = getBreadcrumbs(pathname)
  if (breadcrumbs) schemas.push(breadcrumbs)

  const serviceResult = getServiceSchema(pathname)
  if (Array.isArray(serviceResult)) {
    schemas.push(...serviceResult)
  } else if (serviceResult) {
    schemas.push(serviceResult)
  }

  if (schemas.length === 0) return null

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
