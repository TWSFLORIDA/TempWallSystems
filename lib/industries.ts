import type { IndustryKey } from "./serviceAreas";

/**
 * Single source of truth for industry labels/use-cases — real copy already
 * published in components/Industries.tsx and components/Gallery.tsx,
 * relocated here so location-page content can reference it without
 * duplicating or inventing new claims.
 */

export interface IndustryMeta {
  key: IndustryKey;
  label: string;
  useCase: string;
}

export const INDUSTRIES: Record<IndustryKey, IndustryMeta> = {
  healthcare: { key: "healthcare", label: "Healthcare Facilities", useCase: "ICRA-rated infection control containment" },
  airport: { key: "airport", label: "Airports & Transit", useCase: "concourse crowd-control containment" },
  lab: { key: "lab", label: "Labs & Cleanrooms", useCase: "cleanroom-grade barrier construction" },
  office: { key: "office", label: "Offices", useCase: "operational tenant build-outs" },
  retail: { key: "retail", label: "Retail & Hospitality", useCase: "storefront renovation, business-as-usual" },
  school: { key: "school", label: "Schools & Universities", useCase: "quiet-zone separation during class hours" },
  telecom: { key: "telecom", label: "Telecom & Datacenters", useCase: "critical-infrastructure perimeter" },
  events: { key: "events", label: "Events & Venues", useCase: "back-of-house and crowd partitioning" },
  government: { key: "government", label: "Government Buildings", useCase: "secure-perimeter renovations" },
};
