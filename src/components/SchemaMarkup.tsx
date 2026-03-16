export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Aquafeel Solutions",
    description:
      "Professional water quality testing and purification solutions for homes and businesses. 18 years of experience. Free in-home water consultations.",
    telephone: "+1-984-212-3558",
    email: "info@aquafeelcarolina.com",
    url: "https://aquafeelsolutionsnc.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wake Forest",
      addressRegion: "NC",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "State", name: "North Carolina" },
      { "@type": "Country", name: "United States" },
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
    },
    sameAs: [],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
