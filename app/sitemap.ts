import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/serviceAreas";
import { SERVICE_LIST } from "@/lib/services";
import { getAllServiceCityParams } from "@/lib/serviceContent";
import { USE_CASE_LIST } from "@/lib/useCases";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/locations`, changeFrequency: "monthly", priority: 0.6 },
    ...CITIES.map((c) => ({
      url: `${SITE_URL}/locations/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.6 },
    ...SERVICE_LIST.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllServiceCityParams().map(({ serviceSlug, citySlug }) => ({
      url: `${SITE_URL}/services/${serviceSlug}/${citySlug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: `${SITE_URL}/use-cases`, changeFrequency: "monthly", priority: 0.6 },
    ...USE_CASE_LIST.map((u) => ({
      url: `${SITE_URL}/use-cases/${u.slug}`,
      changeFrequency: "monthly" as const,
      priority: u.isPillar ? 0.7 : 0.6,
    })),
  ];
}
