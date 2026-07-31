import type { ServiceKey } from "./services";

/**
 * The "use-case" tier — 1 pillar (Healthcare Facility Containment) plus 21
 * scaled vertical/use-case pages, sitting between the 3 real services and
 * nothing (no dedicated nav entry — reachable only via internal links from
 * services and the pillar). This is the consolidated result of mapping 84
 * target SEO keywords: most keywords fold into existing service-page copy
 * rather than becoming their own URL (see the approved plan for the full
 * per-keyword disposition), and only the genuinely distinct sub-verticals
 * below get a page of their own.
 *
 * Every page's copy is generated from real facts already published on its
 * `relatedServiceSlugs` (see lib/services.ts) via getUseCasePageData in
 * lib/useCaseContent.ts — nothing here is a standalone fact source.
 */

export type UseCaseKey =
  | "healthcare-facility-containment"
  | "hospital-construction-containment"
  | "icu-construction-containment"
  | "operating-room-construction"
  | "emergency-room-renovation"
  | "ambulatory-surgery-center-containment"
  | "imaging-center-renovation"
  | "sterile-processing-department-containment"
  | "dental-office-buildouts"
  | "medical-office-renovation"
  | "clinic-renovation"
  | "pharmacy-remodel-containment"
  | "senior-living-facility-containment"
  | "icra-dust-containment-medical-facilities"
  | "negative-air-hospital-construction"
  | "icra-containment-healthcare-general-contractors"
  | "joint-commission-compliance-containment"
  | "lab-construction-containment"
  | "school-construction-containment"
  | "temporary-walls-commercial-construction"
  | "dust-containment-commercial-renovation"
  | "negative-air-machines-construction";

export interface UseCaseMeta {
  key: UseCaseKey;
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  isPillar: boolean;
  /** Href of the single "up" link — a pillar or a menu service. Null only for the pillar itself. */
  parentHref: string | null;
  parentLabel: string | null;
  /** Real services this page draws facts from and cross-links to. */
  relatedServiceSlugs: ServiceKey[];
  /** Original target keyword(s) this page was built to capture — reference only. */
  targetKeywords: string[];
}

const HEALTHCARE_PILLAR_HREF = "/use-cases/healthcare-facility-containment";
const HEALTHCARE_PILLAR_LABEL = "Healthcare Facility Containment";

export const USE_CASES: Record<UseCaseKey, UseCaseMeta> = {
  "healthcare-facility-containment": {
    key: "healthcare-facility-containment",
    slug: "healthcare-facility-containment",
    name: "Healthcare Facility Containment",
    h1: "Healthcare Facility Containment",
    metaTitle: "Healthcare Facility Containment Solutions | TWS",
    metaDescription:
      "ICRA-rated barriers, dust containment, and HEPA filtration for occupied healthcare facilities. Get a quote.",
    isPillar: true,
    parentHref: null,
    parentLabel: null,
    relatedServiceSlugs: ["icra-barriers-panels", "dust-mitigation", "negative-air-hepa-filtration"],
    targetKeywords: [
      "Healthcare Construction Barriers",
      "Medical Facility Containment",
      "ICRA Barriers for Healthcare Construction",
      "Healthcare Infection Control Containment Systems",
      "Construction Barriers for Active Healthcare Facilities",
      "Healthcare Construction Containment South Florida",
    ],
  },
  "hospital-construction-containment": {
    key: "hospital-construction-containment",
    slug: "hospital-construction-containment",
    name: "Hospital Construction & Renovation Containment",
    h1: "Hospital Construction & Renovation Containment",
    metaTitle: "Hospital Construction Containment Walls | TWS",
    metaDescription:
      "ICRA-rated temporary walls for hospital construction and renovation projects. Class I–IV construction. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels", "dust-mitigation"],
    targetKeywords: [
      "Hospital Construction Walls",
      "ICRA Wall Systems for Hospitals",
      "Temporary Walls for Hospital Renovations",
      "Temporary Partitions for Hospital Construction",
      "ICRA Walls for Hospital Wing Renovations",
      "Dust Containment for Active Hospital Floors",
      "Hospital Renovation Containment Walls Florida",
      "Temporary Containment for Occupied Hospital Floors",
      "Modular Walls for Phased Hospital Construction",
    ],
  },
  "icu-construction-containment": {
    key: "icu-construction-containment",
    slug: "icu-construction-containment",
    name: "ICU Construction Containment",
    h1: "ICU Construction Containment",
    metaTitle: "ICU Construction Containment Walls | TWS",
    metaDescription:
      "ICRA-rated Class I–IV containment for ICU construction and renovation in active hospitals. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["ICRA Barriers for ICU Construction"],
  },
  "operating-room-construction": {
    key: "operating-room-construction",
    slug: "operating-room-construction",
    name: "Operating Room Construction Containment",
    h1: "Operating Room Construction Containment",
    metaTitle: "OR Construction Containment Walls | TWS",
    metaDescription:
      "ICRA-rated containment for operating room construction and renovation. Class I–IV barriers, phased installs.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Temporary Walls for Operating Room Construction"],
  },
  "emergency-room-renovation": {
    key: "emergency-room-renovation",
    slug: "emergency-room-renovation",
    name: "Emergency Room Renovation Containment",
    h1: "Emergency Room Renovation Containment",
    metaTitle: "ER Renovation Containment Walls | TWS",
    metaDescription:
      "ICRA-rated containment for emergency room renovation in active hospitals. Phased, after-hours installs available.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Temporary Walls for Emergency Room Renovation"],
  },
  "ambulatory-surgery-center-containment": {
    key: "ambulatory-surgery-center-containment",
    slug: "ambulatory-surgery-center-containment",
    name: "Ambulatory Surgery Center Containment",
    h1: "Ambulatory Surgery Center Containment",
    metaTitle: "ASC Containment Walls | TWS",
    metaDescription: "ICRA-rated containment for ambulatory surgery center construction and renovation. Class I–IV barriers.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["ICRA Walls for Ambulatory Surgery Centers"],
  },
  "imaging-center-renovation": {
    key: "imaging-center-renovation",
    slug: "imaging-center-renovation",
    name: "Imaging Center Renovation Containment",
    h1: "Imaging Center Renovation Containment",
    metaTitle: "Imaging Center Renovation Containment | TWS",
    metaDescription:
      "ICRA-rated temporary walls for imaging center renovations in occupied healthcare facilities. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Temporary Walls for Imaging Center Renovation"],
  },
  "sterile-processing-department-containment": {
    key: "sterile-processing-department-containment",
    slug: "sterile-processing-department-containment",
    name: "Sterile Processing Department Containment",
    h1: "Sterile Processing Department Containment",
    metaTitle: "Sterile Processing Dept. Containment | TWS",
    metaDescription:
      "ICRA-rated containment walls for sterile processing department construction and renovation. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Containment Walls for Sterile Processing Departments"],
  },
  "dental-office-buildouts": {
    key: "dental-office-buildouts",
    slug: "dental-office-buildouts",
    name: "Dental Office Build-Out Containment",
    h1: "Dental Office Build-Out Containment",
    metaTitle: "Dental Office Build-Out Containment | TWS",
    metaDescription: "Modular containment walls for dental office build-outs and renovations. Occupied-practice installs. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Modular Walls for Dental Office Build-Outs"],
  },
  "medical-office-renovation": {
    key: "medical-office-renovation",
    slug: "medical-office-renovation",
    name: "Medical Office Renovation Containment",
    h1: "Medical Office Renovation Containment",
    metaTitle: "Medical Office Renovation Containment | TWS",
    metaDescription: "ICRA-rated temporary walls for medical office renovations in occupied healthcare facilities. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Temporary Walls for Medical Office Renovation"],
  },
  "clinic-renovation": {
    key: "clinic-renovation",
    slug: "clinic-renovation",
    name: "Clinic Renovation Containment",
    h1: "Clinic Renovation Containment",
    metaTitle: "Clinic Renovation Containment Walls | TWS",
    metaDescription: "ICRA-rated modular walls for outpatient clinic renovations. Occupied-facility installs, minimal disruption.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Modular Containment Walls for Clinic Renovation", "ICRA Barriers for Outpatient Clinic Renovations"],
  },
  "pharmacy-remodel-containment": {
    key: "pharmacy-remodel-containment",
    slug: "pharmacy-remodel-containment",
    name: "Pharmacy Remodel Containment",
    h1: "Pharmacy Remodel Containment",
    metaTitle: "Pharmacy Remodel Containment Walls | TWS",
    metaDescription: "ICRA-rated temporary walls for pharmacy remodels in occupied healthcare facilities. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Containment Systems for Pharmacy Remodels"],
  },
  "senior-living-facility-containment": {
    key: "senior-living-facility-containment",
    slug: "senior-living-facility-containment",
    name: "Senior Living Facility Containment",
    h1: "Senior Living Facility Containment",
    metaTitle: "Senior Living Facility Containment Walls | TWS",
    metaDescription: "Dust containment and ICRA barriers for senior living and retirement community construction. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels", "dust-mitigation"],
    targetKeywords: ["Dust Barriers for Senior Living Facility Construction"],
  },
  "icra-dust-containment-medical-facilities": {
    key: "icra-dust-containment-medical-facilities",
    slug: "icra-dust-containment-medical-facilities",
    name: "ICRA & Dust Containment for Medical Facilities",
    h1: "ICRA & Dust Containment for Medical Facilities",
    metaTitle: "ICRA & Dust Containment for Medical Facilities | TWS",
    metaDescription:
      "Combined ICRA-rated and dust containment barriers for healthcare renovations. Class I–IV, 100% dust containment. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels", "dust-mitigation"],
    targetKeywords: [
      "ICRA Dust Containment for Medical Facilities",
      "Dust Control Barriers for Hospitals",
      "Temporary Dust Walls for Healthcare",
      "Dust Control for Healthcare Renovation",
    ],
  },
  "negative-air-hospital-construction": {
    key: "negative-air-hospital-construction",
    slug: "negative-air-hospital-construction",
    name: "Negative Air & HEPA Filtration for Hospital Construction",
    h1: "Negative Air & HEPA Filtration for Hospital Construction",
    metaTitle: "Negative Air Filtration for Hospital Construction | TWS",
    metaDescription: "HEPA-AIRE negative air machines for hospital construction projects, 99.97% HEPA efficiency. Request equipment.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["negative-air-hepa-filtration", "icra-barriers-panels"],
    targetKeywords: ["Negative Air Filtration Hospital Construction", "HEPA Filtration Units Hospital Construction"],
  },
  "icra-containment-healthcare-general-contractors": {
    key: "icra-containment-healthcare-general-contractors",
    slug: "icra-containment-healthcare-general-contractors",
    name: "ICRA Containment for Healthcare General Contractors",
    h1: "ICRA Containment for Healthcare General Contractors",
    metaTitle: "ICRA Containment for Healthcare GCs | TWS",
    metaDescription: "ICRA-rated containment partners for general contractors on active healthcare projects. Get a quote.",
    isPillar: false,
    parentHref: HEALTHCARE_PILLAR_HREF,
    parentLabel: HEALTHCARE_PILLAR_LABEL,
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["ICRA Wall Rental for Healthcare GC"],
  },
  "joint-commission-compliance-containment": {
    key: "joint-commission-compliance-containment",
    slug: "joint-commission-compliance-containment",
    name: "Joint Commission Compliance Containment",
    h1: "Joint Commission Compliance Containment",
    metaTitle: "Joint Commission Compliance Containment | TWS",
    metaDescription: "ICRA-rated barriers documented for Joint Commission survey. Class I–IV construction, ready for inspection.",
    isPillar: false,
    parentHref: "/services/icra-barriers-panels",
    parentLabel: "ICRA Barriers & Panels",
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Temporary Wall Systems for Joint Commission Compliance"],
  },
  "lab-construction-containment": {
    key: "lab-construction-containment",
    slug: "lab-construction-containment",
    name: "Lab & Cleanroom Construction Containment",
    h1: "Lab & Cleanroom Construction Containment",
    metaTitle: "Lab Construction Containment Walls | TWS",
    metaDescription: "Cleanroom-grade modular barriers for lab construction and renovation. Class I–IV, HEPA compatible. Get a quote.",
    isPillar: false,
    parentHref: "/services/icra-barriers-panels",
    parentLabel: "ICRA Barriers & Panels",
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Temporary Walls for Lab Construction"],
  },
  "school-construction-containment": {
    key: "school-construction-containment",
    slug: "school-construction-containment",
    name: "School Construction Containment",
    h1: "School Construction Containment",
    metaTitle: "School Construction Containment Walls | TWS",
    metaDescription: "Quiet-zone containment walls for school and university construction during class hours. Get a quote.",
    isPillar: false,
    parentHref: "/services/icra-barriers-panels",
    parentLabel: "ICRA Barriers & Panels",
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Infection Control Walls for School Construction"],
  },
  "temporary-walls-commercial-construction": {
    key: "temporary-walls-commercial-construction",
    slug: "temporary-walls-commercial-construction",
    name: "Temporary Walls for Commercial Construction",
    h1: "Temporary Walls for Commercial Construction",
    metaTitle: "Temporary Walls for Commercial Construction | TWS",
    metaDescription: "Modular containment walls for occupied commercial and office construction. Request a proposal.",
    isPillar: false,
    parentHref: "/services/icra-barriers-panels",
    parentLabel: "ICRA Barriers & Panels",
    relatedServiceSlugs: ["icra-barriers-panels"],
    targetKeywords: ["Temporary Walls for Commercial Construction", "Rent Temporary Walls for Construction"],
  },
  "dust-containment-commercial-renovation": {
    key: "dust-containment-commercial-renovation",
    slug: "dust-containment-commercial-renovation",
    name: "Dust Containment for Commercial Renovation",
    h1: "Dust Containment for Commercial Renovation",
    metaTitle: "Dust Containment for Commercial Renovation | TWS",
    metaDescription: "Sealed dust containment walls for occupied commercial and office renovations. 100% dust containment. Get a quote.",
    isPillar: false,
    parentHref: "/services/dust-mitigation",
    parentLabel: "Dust Containment & Mitigation",
    relatedServiceSlugs: ["dust-mitigation"],
    targetKeywords: ["Dust Walls for Commercial Renovation"],
  },
  "negative-air-machines-construction": {
    key: "negative-air-machines-construction",
    slug: "negative-air-machines-construction",
    name: "Negative Air Machines for Construction Projects",
    h1: "Negative Air Machines for Construction Projects",
    metaTitle: "Negative Air Machines for Construction | TWS",
    metaDescription: "HEPA-AIRE negative air machines for active construction sites. 2,000 CFM, 99.97% HEPA efficiency. Request equipment.",
    isPillar: false,
    parentHref: "/services/negative-air-hepa-filtration",
    parentLabel: "Negative Air & HEPA Filtration",
    relatedServiceSlugs: ["negative-air-hepa-filtration"],
    targetKeywords: ["Negative Air Units for Construction"],
  },
};

export const USE_CASE_LIST: UseCaseMeta[] = Object.values(USE_CASES);

export function getUseCaseBySlug(slug: string): UseCaseMeta | undefined {
  return USE_CASES[slug as UseCaseKey];
}

export const HEALTHCARE_PILLAR = USE_CASES["healthcare-facility-containment"];

/** Every non-pillar page whose primary parent is this pillar. */
export function getChildrenOfPillar(pillarSlug: UseCaseKey): UseCaseMeta[] {
  const href = `/use-cases/${pillarSlug}`;
  return USE_CASE_LIST.filter((u) => !u.isPillar && u.parentHref === href);
}

/** Every use-case page whose primary parent is a given menu service (for that service page to link down to). */
export function getUseCasesLinkedFromService(serviceSlug: string): UseCaseMeta[] {
  const href = `/services/${serviceSlug}`;
  return USE_CASE_LIST.filter((u) => u.parentHref === href);
}

/**
 * The use-case's own position among its siblings (same parentHref) — real,
 * stable, reproducible. Used to rotate between differently-worded sentence
 * templates in lib/useCaseContent.ts so sibling pages under the same
 * pillar/service (e.g. the 15 healthcare sub-verticals) don't all render an
 * identical trailing sentence, only varying the H1 — the same
 * anti-thin-content discipline used for the service × city combo pages.
 */
export function getSiblingIndex(useCase: UseCaseMeta): number {
  const siblings = USE_CASE_LIST.filter((u) => u.parentHref === useCase.parentHref);
  const idx = siblings.findIndex((u) => u.key === useCase.key);
  return idx === -1 ? 0 : idx;
}
