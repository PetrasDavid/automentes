import {
  SERVICE_CITIES,
  SITE_EMAIL,
  SITE_GEO,
  SITE_NAME,
  SITE_PHONE_SMS,
  SITE_URL,
  siteLegalEntity,
} from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: SITE_NAME,
    legalName: siteLegalEntity(),
    url: SITE_URL,
    telephone: SITE_PHONE_SMS,
    email: SITE_EMAIL,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_GEO.lat,
      longitude: SITE_GEO.lng,
    },
    areaServed: SERVICE_CITIES.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kármentő utca 14.",
      addressLocality: "Érd",
      postalCode: "2030",
      addressCountry: "HU",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    description:
      "Autómentés Érden, Budapesten és Pest megyében 0–24. Személygépkocsi mentés, bikázás, kerékcsere — gyors kiérkezés az agglomerációban.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
