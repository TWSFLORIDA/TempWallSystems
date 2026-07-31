import {
  CITIES,
  REGIONS,
  SERVICE_AREAS,
  TOTAL_CITY_COUNT,
  getCityBySlug,
  nearbyCities,
  type CityData,
  type RegionMeta,
} from "./serviceAreas";
import { SERVICE_LIST, getServiceBySlug, type ServiceMeta } from "./services";
import { INDUSTRIES } from "./industries";

/**
 * Template functions for the 3 standalone service pages and the 111
 * service × city combo pages. Mirrors lib/locationContent.ts's pattern:
 * pure functions computing real-data-driven copy, nothing hand-authored
 * per page.
 *
 * The anti-thin-content mechanism for combo pages (see getServiceCityPageData):
 * an overlap-industry branch (real: does this service's relevantIndustries
 * intersect this region's emphasisIndustries?) and a rotated nearby-city
 * pair (real neighbors, varied by the city's own position in its region so
 * consecutive cities don't all show the same pair) — every sentence
 * references both a service fact and a city/region fact together, never a
 * bare concatenation of the standalone service copy with the city copy.
 */

export interface ServicePageContent {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroBody: string;
  /** Primary, keyword-focused <h1> text, e.g. "ICRA Barriers & Panels in Southeast Florida". */
  heroHeadline: string;
  overview: string;
  capabilityFacts: string[];
  proofStat?: { value: string; label: string };
  proseFact: string;
  faq: { question: string; answer: string }[];
}
export interface ServicePageData {
  service: ServiceMeta;
  content: ServicePageContent;
}

export interface ServiceCityContent {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroBody: string;
  /** Primary, keyword-focused <h1> text, e.g. "ICRA Barriers & Panels in Miami, FL". */
  heroHeadline: string;
  paragraphPrimary: string;
  paragraphSecondary: string;
  capabilityFacts: string[];
  proofStat?: { value: string; label: string };
  faq: { question: string; answer: string }[];
}
export interface ServiceCityPageData {
  service: ServiceMeta;
  city: CityData;
  region: RegionMeta;
  content: ServiceCityContent;
  nearbySameService: CityData[];
  otherServices: ServiceMeta[];
}

export function getServicePageData(serviceSlug: string): ServicePageData | undefined {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return undefined;

  const content: ServicePageContent = {
    metaTitle: `${service.name} in Southeast Florida | TWS Southeast Florida`,
    metaDescription: `TWS installs ${service.name.toLowerCase()} across ${TOTAL_CITY_COUNT} Southeast Florida cities — ${service.tagline.toLowerCase()} Treasure Coast to Miami.`,
    heroEyebrow: "Service · Southeast Florida",
    heroBody: service.overview,
    heroHeadline: `${service.name} in Southeast Florida`,
    overview: service.overview,
    capabilityFacts: service.capabilityFacts,
    proofStat: service.proofStat,
    proseFact: service.proseFact,
    faq: [
      ...service.faqSeed,
      {
        question: `Where do you install ${service.name.toLowerCase()}?`,
        answer: `Across ${TOTAL_CITY_COUNT} cities from the Treasure Coast down to Miami — see coverage by city below.`,
      },
    ],
  };
  return { service, content };
}

function lowercaseFirst(s: string): string {
  return s.length > 0 ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

/**
 * "Nearby" pair for combo-page copy, rotated by the city's own index within
 * its region's city list so consecutive cities in the same region surface
 * different real neighbors instead of everyone showing the same first two.
 */
function pickNearbyPair(city: CityData, region: RegionMeta): CityData[] {
  const pool = nearbyCities(city, 6);
  if (pool.length === 0) return [];
  const i = cityIndexInRegion(city, region);
  if (pool.length === 1) return [pool[0]];
  return [pool[i % pool.length], pool[(i + 1) % pool.length]];
}

/**
 * The city's own position within its region's city list — real, stable,
 * reproducible (no randomness). Used both for the nearby-pair rotation and
 * for rotating between differently-worded sentence templates below, so
 * same-region combo pages don't all read with an identical skeleton.
 */
function cityIndexInRegion(city: CityData, region: RegionMeta): number {
  const regionEntry = SERVICE_AREAS.find((r) => r.key === region.key);
  const idx = regionEntry ? regionEntry.cities.findIndex((c) => c.slug === city.slug) : 0;
  return idx === -1 ? 0 : idx;
}

function buildComboFaq(
  service: ServiceMeta,
  city: CityData,
  region: RegionMeta,
  nearbyPair: CityData[]
): { question: string; answer: string }[] {
  const items: { question: string; answer: string }[] = [
    {
      question: `Do you install ${service.shortName.toLowerCase()} in ${city.name}?`,
      answer: `Yes — ${city.name} is part of our regular ${region.name} coverage for ${service.shortName.toLowerCase()}, one of ${TOTAL_CITY_COUNT} cities we serve.`,
    },
    {
      question: `What does ${service.shortName.toLowerCase()} involve for ${city.county} projects?`,
      answer: service.faqSeed[1].answer,
    },
  ];

  if (nearbyPair.length > 0) {
    const nearbyPhrase =
      nearbyPair.length === 2 ? `${nearbyPair[0].name} and ${nearbyPair[1].name}` : nearbyPair[0].name;
    items.push({
      question: `What about ${nearbyPhrase}?`,
      answer: `Yes — ${nearbyPhrase} ${nearbyPair.length === 2 ? "are both" : "is also"} inside our regular ${region.name} coverage for ${service.shortName.toLowerCase()}.`,
    });
  }

  items.push(service.faqSeed[2]);

  return items;
}

export function getServiceCityPageData(
  serviceSlug: string,
  citySlug: string
): ServiceCityPageData | undefined {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return undefined;

  const region = REGIONS[city.regionKey];
  const overlapIndustry = region.emphasisIndustries.find((k) => service.relevantIndustries.includes(k));
  const nearbyPair = pickNearbyPair(city, region);
  const nearbyPhrase =
    nearbyPair.length === 2
      ? `${nearbyPair[0].name} and ${nearbyPair[1].name}`
      : nearbyPair.length === 1
        ? nearbyPair[0].name
        : null;
  const otherServices = SERVICE_LIST.filter((s) => s.key !== service.key);

  // A region groups several real counties (e.g. Treasure Coast spans Indian
  // River, St. Lucie, Martin, and Palm Beach counties). Without this, every
  // city sharing a region's fixed regionCharacter string would produce an
  // identical sentence skeleton, varying only the city name. Rotating the
  // sentence construction itself — using two real, independent signals
  // (the city's index within its region, and its actual county) — means
  // consecutive same-region cities read as genuinely differently worded,
  // not just token-substituted.
  const idx = cityIndexInRegion(city, region);
  const openerVariant = idx % 2;
  const opener =
    openerVariant === 0
      ? `${city.name} sits in ${region.regionCharacter}.`
      : `${city.name} is part of ${region.regionCharacter}.`;

  const serviceClauseVariant = (idx + 1) % 2;
  const overlapClause = overlapIndustry
    ? serviceClauseVariant === 0
      ? `${INDUSTRIES[overlapIndustry].label} are some of the most common work we run here, so ${service.shortName.toLowerCase()} comes up often — ${INDUSTRIES[overlapIndustry].useCase}`
      : `We do a lot of ${service.shortName.toLowerCase()} work for ${INDUSTRIES[overlapIndustry].label.toLowerCase()} in ${city.county} — ${INDUSTRIES[overlapIndustry].useCase}`
    : serviceClauseVariant === 0
      ? service.proseFact
      : `It's the same story in ${city.county} as everywhere else we work: ${lowercaseFirst(service.proseFact)}`;
  const nearbyClause = nearbyPhrase
    ? overlapIndustry
      ? `, the same coverage that extends into ${nearbyPhrase}`
      : ` The same coverage extends into ${nearbyPhrase} nearby.`
    : "";

  const paragraphPrimary = overlapIndustry
    ? `${opener} ${overlapClause}${nearbyClause}.`
    : `${opener} ${overlapClause}${nearbyClause}`;

  const secondaryVariant = idx % 2;
  const paragraphSecondary = service.proofStat
    ? secondaryVariant === 0
      ? `In ${city.county} (ZIP ${city.zip}), that's the same sealed, gasketed construction we run everywhere — verified at ${service.proofStat.value} ${service.proofStat.label.toLowerCase()} across our installs.`
      : `Projects in ${city.county} (ZIP ${city.zip}) get the same sealed, gasketed construction as every other county we work in — verified at ${service.proofStat.value} ${service.proofStat.label.toLowerCase()} across our installs.`
    : secondaryVariant === 0
      ? `In ${city.county} (ZIP ${city.zip}), every barrier we build gets documented for Joint Commission survey as part of the install, not as an afterthought.`
      : `Every barrier we build in ${city.county} (ZIP ${city.zip}) gets documented for Joint Commission survey as part of the install, not as an afterthought.`;

  const content: ServiceCityContent = {
    metaTitle: `${service.name} in ${city.name}, FL | TWS Southeast Florida`,
    metaDescription: `TWS installs ${service.name.toLowerCase()} in ${city.name}, ${city.county} (${city.zip}) — ${service.tagline.toLowerCase()}`,
    heroEyebrow: `${service.shortName} · ${city.name}, FL`,
    heroBody: service.overview,
    heroHeadline: `${service.name} in ${city.name}, FL`,
    paragraphPrimary,
    paragraphSecondary,
    capabilityFacts: service.capabilityFacts,
    proofStat: service.proofStat,
    faq: buildComboFaq(service, city, region, nearbyPair),
  };

  return {
    service,
    city,
    region,
    content,
    nearbySameService: nearbyCities(city),
    otherServices,
  };
}

export function getAllServiceCityParams(): { serviceSlug: string; citySlug: string }[] {
  return SERVICE_LIST.flatMap((s) => CITIES.map((c) => ({ serviceSlug: s.slug, citySlug: c.slug })));
}
