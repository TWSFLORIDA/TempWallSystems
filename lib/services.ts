import type { IndustryKey } from "./serviceAreas";

/**
 * The 3 real services TWS is known for, built as their own programmatic
 * templates. "ICRA barriers" and "ICRA panels" are the same product
 * described two ways in this business's own existing copy (see
 * components/Industries.tsx) — combined into one page rather than split
 * across two near-duplicate pages competing for the same search intent.
 * "Dust mitigation" is the same sealed containment product, marketed from
 * a different angle (the real "100% Dust containment" stat already
 * published in components/VideoBand.tsx). "Negative air machines & HEPA
 * filtration" is TWS's real equipment line — Abatement Technologies
 * HEPA-AIRE units, specs verified directly from the manufacturer's own
 * product pages (abatement.com), not invented. No dedicated "Temporary
 * Wall Systems" page — that's the company's own brand name, already
 * broadly targeted by the homepage.
 */

export type ServiceKey = "icra-barriers-panels" | "dust-mitigation" | "negative-air-hepa-filtration";

export interface ServiceMeta {
  key: ServiceKey;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  overview: string;
  /** Real, verbatim-sourced from components/Industries.tsx — don't pad. */
  capabilityFacts: string[];
  proofStat?: { value: string; label: string };
  proseFact: string;
  /** Only industries with a directly published real fact tying them to this
   *  service — deliberately short, not padded to look broad. */
  relevantIndustries: IndustryKey[];
  faqSeed: { question: string; answer: string }[];
}

export const SERVICES: Record<ServiceKey, ServiceMeta> = {
  "icra-barriers-panels": {
    key: "icra-barriers-panels",
    slug: "icra-barriers-panels",
    name: "ICRA Barriers & Panels",
    shortName: "ICRA Barriers & Panels",
    tagline: "Containment that infection-control teams sign off on.",
    overview:
      "ICRA-rated modular barriers and panels for healthcare and other occupied facilities — negative-pressure compatible, HEPA-ready, with anti-microbial panels, gasketed seals, and ICRA-rated penetration management on every installation. We install while the space stays open and document every barrier for infection-control survey.",
    capabilityFacts: [
      "Class I–IV barrier construction",
      "Negative-pressure ready",
      "HEPA & airlock compatible",
      "Joint Commission survey documentation",
      "After-hours installation",
      "Phased reconfiguration",
    ],
    proseFact:
      "Anti-microbial panels, gasketed seals, and ICRA-rated penetration management go into every barrier — the same construction whether the job spec calls it a \"barrier\" or a \"panel system.\"",
    relevantIndustries: ["healthcare", "lab"],
    faqSeed: [
      {
        question: "What's the difference between an ICRA barrier and an ICRA panel?",
        answer: "None in practice — it's the same modular, gasketed containment system. \"Barrier\" and \"panel\" are just the two names contractors and infection-control teams commonly use for the same ICRA-rated construction.",
      },
      {
        question: "What ICRA classes can you build to?",
        answer: "Class I through IV barrier construction — negative-pressure ready, HEPA and airlock compatible, with documentation prepared for infection-control survey.",
      },
      {
        question: "Do you provide documentation for Joint Commission survey?",
        answer: "Yes — every barrier we install is documented for Joint Commission survey as part of the installation, not a separate add-on step.",
      },
      {
        question: "What does ICRA stand for?",
        answer: "Infection Control Risk Assessment — the framework healthcare facilities use to classify construction risk. Our barriers are built to satisfy whichever ICRA class your risk assessment calls for.",
      },
      {
        question: "Is ICRA containment organized by \"category\" or \"class\"?",
        answer: "Class — ICRA Class I through IV. We build to whichever class your risk assessment calls for, from minor Class I work up to Class IV negative-pressure containment.",
      },
      {
        question: "Can I rent a temporary wall without a full installation crew?",
        answer: "Temporary wall rental at TWS always includes installation and removal — we handle setup and teardown as part of the project, not a self-service rental.",
      },
    ],
  },
  "dust-mitigation": {
    key: "dust-mitigation",
    slug: "dust-mitigation",
    name: "Dust Containment & Mitigation",
    shortName: "Dust Mitigation",
    tagline: "100% dust containment, sealed at the source.",
    overview:
      "The same sealed, gasketed modular barrier system we build for ICRA containment stops dust at the source — fully enclosed construction with managed wall penetrations, run at 100% dust containment across our installs. It goes up after hours, reconfigures between phases, and comes down without leaving residue on the occupied side.",
    capabilityFacts: [
      "Sealed, gasketed panel construction",
      "Managed wall penetrations",
      "HEPA & airlock compatible",
      "After-hours installation",
      "Phased reconfiguration",
    ],
    proofStat: { value: "100%", label: "Dust containment" },
    proseFact:
      "The same gasketed seals and penetration management built into every ICRA barrier are what keep dust on the construction side of the wall.",
    relevantIndustries: ["office"],
    faqSeed: [
      {
        question: "Does a temporary wall actually stop dust completely?",
        answer: "Yes — 100% dust containment is the verified result we track across our sealed-barrier installs.",
      },
      {
        question: "Is dust containment a different product from your ICRA barriers?",
        answer: "No — it's the same sealed, gasketed modular wall system, described from a different angle. The construction that satisfies ICRA infection-control requirements is also what keeps dust out of the occupied space.",
      },
      {
        question: "Does the containment cut down on noise too?",
        answer: "Yes, as a byproduct of the same sealed construction — our installs also measure up to 50% noise reduction alongside 100% dust containment.",
      },
      {
        question: "Do you rent temporary dust barrier walls?",
        answer: "Yes — dust barrier wall rental at TWS includes full installation and removal, the same sealed, gasketed construction as our ICRA barriers.",
      },
    ],
  },
  "negative-air-hepa-filtration": {
    key: "negative-air-hepa-filtration",
    slug: "negative-air-hepa-filtration",
    name: "Negative Air Machines & HEPA Filtration",
    shortName: "Negative Air & HEPA Filtration",
    tagline: "2,000 CFM negative air machines and HEPA scrubbers.",
    overview:
      "TWS supplies HEPA-AIRE negative air machines and portable air scrubbers manufactured by Abatement Technologies — 2,000 CFM negative air units for full containment zones and 750 CFM portable scrubbers for tighter spaces, both rated at 99.97% HEPA efficiency at 0.3 microns. Available standalone or paired with our sealed barrier construction.",
    capabilityFacts: [
      "HEPA-AIRE H2KM: 2,000 CFM high / 1,300 CFM low",
      "99.97% HEPA efficiency @ 0.3 microns",
      "PAS750 portable: up to 750 CFM",
      "6 ACH @ 5,000–6,000 sq. ft. (PAS750)",
      "Daisy-chainable on a single 15-amp circuit",
      "Available standalone or paired with a wall install",
    ],
    proofStat: { value: "99.97%", label: "HEPA filtration efficiency" },
    proseFact:
      "Every unit we run is Abatement Technologies HEPA-AIRE equipment — the same 2,000 CFM negative air machines and 750 CFM portable scrubbers used on hospital and lab containment jobs.",
    relevantIndustries: ["healthcare", "lab"],
    faqSeed: [
      {
        question: "What negative air machines does TWS use?",
        answer: "HEPA-AIRE H2KM units from Abatement Technologies — 2,000 CFM on high, 1,300 CFM on low, with a 99.97% efficient HEPA filter rated at 0.3 microns.",
      },
      {
        question: "Do you offer portable HEPA scrubbers for smaller spaces?",
        answer: "Yes — the Abatement Technologies PAS750 delivers up to 750 CFM at the same 99.97% HEPA efficiency, at 33.5 lbs and a low enough draw to daisy-chain multiple units on one circuit.",
      },
      {
        question: "Can I rent negative air machines without a wall installation?",
        answer: "Yes — negative air machines and HEPA scrubbers are available standalone or paired with a containment wall install, whichever your project needs.",
      },
    ],
  },
};

export const SERVICE_LIST: ServiceMeta[] = Object.values(SERVICES);

export function getServiceBySlug(slug: string): ServiceMeta | undefined {
  return SERVICES[slug as ServiceKey];
}
