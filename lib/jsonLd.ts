import { SITE_URL, SITE_NAME, HQ_ADDRESS, PHONE_TEL, EMAIL } from "./site";
import { REGIONS, type CityData } from "./serviceAreas";
import type { ServiceMeta } from "./services";
import type { Crumb } from "@/components/Breadcrumbs";

/**
 * Structured data for location pages. Deliberately conservative: a single
 * real address (Boynton Beach, the only office), no per-city address/geo,
 * no aggregateRating/review. Fabricating per-city offices or ratings is the
 * single biggest "doorway page" red flag for a service-area business — never
 * add either without it being literally true.
 */

export function buildLocalBusinessSchema(city: CityData) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE_NAME,
    url: `${SITE_URL}/locations/${city.slug}`,
    telephone: PHONE_TEL,
    email: EMAIL,
    address: { "@type": "PostalAddress", ...HQ_ADDRESS },
    areaServed: { "@type": "City", name: `${city.name}, FL` },
  };
}

export function buildBreadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

/**
 * FAQPage schema — consumes the exact same faq array that feeds the visible
 * FAQ list in components/LocationContent.tsx, so schema and UI can't drift.
 */
export function buildFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Site-wide business identity — real facts only. No `sameAs` (no confirmed
 * live social profile URLs); add only if the user supplies real ones.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/tws-logo.webp`,
    telephone: PHONE_TEL,
    email: EMAIL,
    address: { "@type": "PostalAddress", ...HQ_ADDRESS },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * Standalone service pages get the honest whole-coverage-area claim (all 4
 * real regions); combo pages get the one real city — mirroring how
 * buildLocalBusinessSchema already scopes areaServed per-city.
 */
export function buildServiceSchema(service: ServiceMeta, city?: CityData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name}${city ? ` — ${city.name}, FL` : ""}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: city
      ? { "@type": "City", name: `${city.name}, FL` }
      : {
          "@type": "ItemList",
          itemListElement: Object.values(REGIONS).map((r) => ({
            "@type": "AdministrativeArea",
            name: r.name,
          })),
        },
    url: city
      ? `${SITE_URL}/services/${service.slug}/${city.slug}`
      : `${SITE_URL}/services/${service.slug}`,
  };
}

/**
 * The real, self-hosted install video (public/tws-install.mp4). Duration
 * verified via `afinfo` against the actual file (163.8s → PT2M44S) — not
 * guessed. uploadDate is the file's on-disk date, a reasonable proxy.
 */
export function buildVideoObjectSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "TWS ICRA Containment Wall Installation",
    description:
      "TWS installs a modular ICRA-rated containment wall in an occupied facility — sealed, quiet, and removed without a trace.",
    thumbnailUrl: [`${SITE_URL}/temporary-wall-installation-video-poster.jpg`],
    contentUrl: `${SITE_URL}/tws-install.mp4`,
    uploadDate: "2026-05-21",
    duration: "PT2M44S",
  };
}
