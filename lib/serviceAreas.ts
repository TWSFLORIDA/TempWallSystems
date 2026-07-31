/**
 * Single source of truth for TWS's 37-city / 4-region service area.
 *
 * Replaces the identical SERVICE_AREAS arrays that used to be hardcoded
 * separately in components/Nav.tsx and components/Footer.tsx. Region names,
 * city names, and order are preserved exactly from those two files.
 *
 * Counties are real (verified against known Florida county boundaries) —
 * note Jupiter is genuinely in Palm Beach County despite being marketed
 * under "Treasure Coast," and Coconut Grove/Kendall are Miami-Dade
 * neighborhoods rather than independent municipalities (kept as list items
 * to match the site's existing service-area convention).
 */

export type RegionKey =
  | "treasure-coast"
  | "palm-beach-county"
  | "broward-county"
  | "miami-dade";

export type IndustryKey =
  | "healthcare"
  | "airport"
  | "lab"
  | "office"
  | "retail"
  | "school"
  | "telecom"
  | "events"
  | "government";

export interface CityData {
  slug: string;
  name: string;
  regionKey: RegionKey;
  county: string;
  /**
   * Primary ZIP code — verified via live lookup against government/real-estate
   * sources (city-hall address where the city is incorporated, most-populous
   * serving ZIP as fallback for unincorporated areas). Not derived/guessed.
   */
  zip: string;
}

export interface RegionMeta {
  key: RegionKey;
  name: string;
  /** 2-3 real, checkable industry keys that characterize this region. */
  emphasisIndustries: IndustryKey[];
  /** One factual clause fed into the per-city intro paragraph. */
  regionCharacter: string;
}

export interface ServiceAreaRegion {
  name: string;
  key: RegionKey;
  cities: CityData[];
}

export const REGIONS: Record<RegionKey, RegionMeta> = {
  "treasure-coast": {
    key: "treasure-coast",
    name: "Treasure Coast",
    emphasisIndustries: ["healthcare", "school", "government"],
    regionCharacter:
      "a corridor of hospital campuses, retirement communities, and public-sector buildings running from Vero Beach down to Jupiter",
  },
  "palm-beach-county": {
    key: "palm-beach-county",
    name: "Palm Beach County",
    emphasisIndustries: ["healthcare", "retail", "office"],
    regionCharacter:
      "a mix of hospital systems, retail corridors, and corporate offices anchored by West Palm Beach and Boca Raton",
  },
  "broward-county": {
    key: "broward-county",
    name: "Broward County",
    emphasisIndustries: ["office", "school", "government"],
    regionCharacter:
      "a dense corporate, education, and government footprint built to the state's High-Velocity Hurricane Zone code",
  },
  "miami-dade": {
    key: "miami-dade",
    name: "Miami-Dade County",
    emphasisIndustries: ["airport", "healthcare", "retail"],
    regionCharacter:
      "an airport-adjacent, hospitality- and healthcare-dense market also built to HVHZ code",
  },
};

function city(
  slug: string,
  name: string,
  regionKey: RegionKey,
  county: string,
  zip: string
): CityData {
  return { slug, name, regionKey, county, zip };
}

export const SERVICE_AREAS: ServiceAreaRegion[] = [
  {
    name: "Treasure Coast",
    key: "treasure-coast",
    cities: [
      city("vero-beach", "Vero Beach", "treasure-coast", "Indian River County", "32960"),
      city("sebastian", "Sebastian", "treasure-coast", "Indian River County", "32958"),
      city("fort-pierce", "Fort Pierce", "treasure-coast", "St. Lucie County", "34982"),
      city("port-st-lucie", "Port St. Lucie", "treasure-coast", "St. Lucie County", "34953"),
      city("stuart", "Stuart", "treasure-coast", "Martin County", "34997"),
      city("jensen-beach", "Jensen Beach", "treasure-coast", "Martin County", "34957"),
      city("palm-city", "Palm City", "treasure-coast", "Martin County", "34990"),
      city("hobe-sound", "Hobe Sound", "treasure-coast", "Martin County", "33455"),
      city("jupiter", "Jupiter", "treasure-coast", "Palm Beach County", "33458"),
    ],
  },
  {
    name: "Palm Beach County",
    key: "palm-beach-county",
    cities: [
      city("palm-beach", "Palm Beach", "palm-beach-county", "Palm Beach County", "33480"),
      city("west-palm-beach", "West Palm Beach", "palm-beach-county", "Palm Beach County", "33401"),
      city("wellington", "Wellington", "palm-beach-county", "Palm Beach County", "33414"),
      city("royal-palm-beach", "Royal Palm Beach", "palm-beach-county", "Palm Beach County", "33411"),
      city("lake-worth", "Lake Worth", "palm-beach-county", "Palm Beach County", "33460"),
      city("boynton-beach", "Boynton Beach", "palm-beach-county", "Palm Beach County", "33426"),
      city("delray-beach", "Delray Beach", "palm-beach-county", "Palm Beach County", "33444"),
      city("boca-raton", "Boca Raton", "palm-beach-county", "Palm Beach County", "33432"),
    ],
  },
  {
    name: "Broward County",
    key: "broward-county",
    cities: [
      city("fort-lauderdale", "Fort Lauderdale", "broward-county", "Broward County", "33301"),
      city("hollywood", "Hollywood", "broward-county", "Broward County", "33020"),
      city("pembroke-pines", "Pembroke Pines", "broward-county", "Broward County", "33025"),
      city("coral-springs", "Coral Springs", "broward-county", "Broward County", "33065"),
      city("pompano-beach", "Pompano Beach", "broward-county", "Broward County", "33060"),
      city("davie", "Davie", "broward-county", "Broward County", "33330"),
      city("plantation", "Plantation", "broward-county", "Broward County", "33317"),
      city("sunrise", "Sunrise", "broward-county", "Broward County", "33351"),
      city("weston", "Weston", "broward-county", "Broward County", "33326"),
      city("miramar", "Miramar", "broward-county", "Broward County", "33025"),
    ],
  },
  {
    name: "Miami-Dade County",
    key: "miami-dade",
    cities: [
      city("miami", "Miami", "miami-dade", "Miami-Dade County", "33130"),
      city("miami-beach", "Miami Beach", "miami-dade", "Miami-Dade County", "33139"),
      city("coral-gables", "Coral Gables", "miami-dade", "Miami-Dade County", "33134"),
      city("coconut-grove", "Coconut Grove", "miami-dade", "Miami-Dade County", "33133"),
      city("doral", "Doral", "miami-dade", "Miami-Dade County", "33172"),
      city("hialeah", "Hialeah", "miami-dade", "Miami-Dade County", "33010"),
      city("aventura", "Aventura", "miami-dade", "Miami-Dade County", "33180"),
      city("kendall", "Kendall", "miami-dade", "Miami-Dade County", "33156"),
      city("homestead", "Homestead", "miami-dade", "Miami-Dade County", "33030"),
      city("cutler-bay", "Cutler Bay", "miami-dade", "Miami-Dade County", "33189"),
    ],
  },
];

export const CITIES: CityData[] = SERVICE_AREAS.flatMap((r) => r.cities);
export const TOTAL_CITY_COUNT = CITIES.length;

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/**
 * "Nearby cities" = other cities in the same region. Regions already cap at
 * 8-10 cities, so this is always a sensible, non-empty set — deliberately
 * not geo-distance sorted, since that would require unverified lat/lng data
 * to back a claim the page isn't actually making (same-region grouping is
 * already true and is exactly what the copy asserts).
 */
export function nearbyCities(c: CityData, max = 6): CityData[] {
  const region = SERVICE_AREAS.find((r) => r.key === c.regionKey);
  if (!region) return [];
  return region.cities.filter((other) => other.slug !== c.slug).slice(0, max);
}
