/**
 * Real equipment TWS runs on negative-air/HEPA jobs, rendered as dedicated
 * spec sections on the "Negative Air Machines & HEPA Filtration" service
 * page. One entry = one EquipmentSpec section. Specs are verbatim from each
 * manufacturer — don't pad or invent numbers.
 */

export interface EquipmentImage {
  src: string;
  alt: string;
  detailSrc?: string;
  detailAlt?: string;
}

export interface EquipmentItem {
  key: string;
  brand: string;
  name: string;
  tagline: string;
  manufacturer: string;
  specs: string[];
  image: EquipmentImage;
}

export const EQUIPMENT: Record<string, EquipmentItem> = {
  h2km: {
    key: "h2km",
    brand: "HEPA-AIRE®",
    name: "H2KM Negative Air Machine",
    tagline: "2,000 CFM negative air machine, true HEPA filtration.",
    manufacturer: "Abatement Technologies",
    specs: [
      "Powerful airflow, rated at 1,300 CFM (L) & 2,000 CFM (H)",
      "Two pre-filter stages and a True 99.97% HEPA filter",
      "Equipped with a visual “change filter” indicator lamp",
      "Superior mobility and durable 20-gauge galvanized steel cabinet",
      "NRTL-certified to conform to stringent UL and CSA safety standards",
    ],
    image: {
      src: "/hepa-aire-h2km-negative-air-machine.jpg",
      alt: "HEPA-AIRE H2KM negative air machine — 2,000 CFM portable HEPA filtration unit on locking casters",
      detailSrc: "/hepa-aire-h2km-hepa-filter-detail.png",
      detailAlt: "HEPA-AIRE H2KM True HEPA filter face, manufactured by Abatement Technologies",
    },
  },
  predator750: {
    key: "predator750",
    brand: "Predator™",
    name: "750 Portable Air Scrubber",
    tagline: "The best & most mobile HEPA filtration device in its class.",
    manufacturer: "Abatement Technologies",
    specs: [
      "200–750 CFM, variable speed airflow",
      "Powerful — max 7,500 ft³ @ 6 ACH",
      "Portable and incredibly lightweight (35 lbs. with filters)",
      "User-friendly controls and secure stacking",
      "Durable polyethylene cabinet made from UL94HB flame-retardant resin",
    ],
    image: {
      src: "/negative-air-scrubber-rental-in-south-florida.png",
      alt: "Predator 750 portable air scrubber by Abatement Technologies — available for negative air scrubber rental in South Florida",
    },
  },
  ag8000pas: {
    key: "ag8000pas",
    brand: "Aire Guardian®",
    name: "AG8000PAS Mobile Dust Containment Cart",
    tagline:
      "OSHA-compliant mobile dust containment with above-ceiling access and a built-in PAS750 air scrubber.",
    manufacturer: "Aire Guardian®",
    specs: [
      "Unique upper header design gives workers unmatched height access above ceiling tiles while keeping them safe and OSHA compliant",
      "Height adjustment mechanism affords single-handed header extension and retraction to any ceiling height up to 10' 2\"",
      "Height adjusts easily using either the included hand-crank or a power drill (drill not included)",
      "900 lb. load rating and secure locking casters",
      "Includes 16 ft., 3-section fiberglass extension ladder",
      "Includes PAS750 portable air scrubber",
    ],
    image: {
      src: "/dust-containment-cart-rental.png",
      alt: "Aire Guardian AG8000PAS mobile dust containment cart with extension ladder and built-in PAS750 air scrubber",
    },
  },
};
