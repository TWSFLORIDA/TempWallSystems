import { getServiceBySlug, type ServiceMeta } from "./services";
import {
  getUseCaseBySlug,
  getChildrenOfPillar,
  getSiblingIndex,
  type UseCaseMeta,
} from "./useCases";
import { SITE_URL } from "./site";
import type { IndustryKey } from "./serviceAreas";

/**
 * Template function for the use-case tier (1 pillar + 21 programmatic
 * pages), mirroring lib/serviceContent.ts's getServicePageData pattern: a
 * pure function computing real-data-driven copy from each page's
 * `relatedServiceSlugs`, nothing hand-authored per page. Facts (capability
 * bullets, proof stats, FAQ seed) always trace back to lib/services.ts —
 * this file only recombines and reframes them for the vertical, never
 * invents a new claim specific to the sub-vertical itself.
 */

export interface UseCasePageContent {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroBody: string;
  heroHeadline: string;
  intro: string;
  capabilityFacts: string[];
  proofStats: { value: string; label: string }[];
  faq: { question: string; answer: string }[];
}

export interface UseCasePageData {
  useCase: UseCaseMeta;
  content: UseCasePageContent;
  relatedServices: ServiceMeta[];
  relevantIndustries: IndustryKey[];
  children: UseCaseMeta[];
  canonicalUrl: string;
}

/**
 * Rotated by the use-case's own position among its siblings (real, stable —
 * see getSiblingIndex) so pages sharing the same relatedServiceSlugs (e.g.
 * the 15 healthcare sub-verticals, all built from ICRA Barriers & Panels)
 * don't render an identical trailing sentence, only varying the H1. Every
 * fact cited still traces to lib/services.ts — only the sentence
 * construction and which real fact gets cited rotates.
 */
function buildIntro(useCase: UseCaseMeta, services: ServiceMeta[]): string {
  const idx = getSiblingIndex(useCase);
  const primary = services[0];
  const fact = idx % 2 === 0 ? primary.proseFact : primary.capabilityFacts[idx % primary.capabilityFacts.length];

  if (services.length === 1) {
    const opener =
      idx % 2 === 0
        ? `${useCase.h1} is built with the same ${primary.shortName} construction TWS runs across Southeast Florida.`
        : `${useCase.h1} uses the same ${primary.shortName} construction TWS installs on every Southeast Florida project.`;
    return `${opener} ${fact}`;
  }

  const names = services.map((s) => s.shortName).join(" and ");
  const opener =
    idx % 2 === 0
      ? `${useCase.h1} draws on ${names}, the same real capabilities TWS runs across every Southeast Florida project, combined for this use case.`
      : `${useCase.h1} combines ${names} — the same construction TWS installs across Southeast Florida, applied together here.`;
  return `${opener} ${fact}`;
}

function mergeCapabilityFacts(services: ServiceMeta[]): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const s of services) {
    for (const fact of s.capabilityFacts) {
      if (!seen.has(fact)) {
        seen.add(fact);
        merged.push(fact);
      }
    }
  }
  return merged;
}

function buildFaq(useCase: UseCaseMeta, services: ServiceMeta[]): { question: string; answer: string }[] {
  const faq: { question: string; answer: string }[] = [
    {
      question: `Do you handle ${useCase.name} projects in Southeast Florida?`,
      answer: `Yes — ${useCase.name} uses the same ${services
        .map((s) => s.name)
        .join(" and ")} construction TWS runs across Southeast Florida, from the Treasure Coast to Miami.`,
    },
  ];
  const seenQuestions = new Set(faq.map((f) => f.question));
  for (const s of services) {
    for (const item of s.faqSeed) {
      if (!seenQuestions.has(item.question) && faq.length < 5) {
        seenQuestions.add(item.question);
        faq.push(item);
      }
    }
  }
  return faq;
}

export function getUseCasePageData(slug: string): UseCasePageData | undefined {
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) return undefined;

  const relatedServices = useCase.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is ServiceMeta => Boolean(s));

  const children = useCase.isPillar ? getChildrenOfPillar(useCase.key) : [];
  const relevantIndustries = Array.from(new Set(relatedServices.flatMap((s) => s.relevantIndustries)));

  const content: UseCasePageContent = {
    metaTitle: useCase.metaTitle,
    metaDescription: useCase.metaDescription,
    heroEyebrow: useCase.isPillar ? `${useCase.name} · Southeast Florida` : "Use Case · Southeast Florida",
    heroBody: useCase.metaDescription,
    heroHeadline: useCase.h1,
    intro: buildIntro(useCase, relatedServices),
    capabilityFacts: mergeCapabilityFacts(relatedServices),
    proofStats: relatedServices
      .map((s) => s.proofStat)
      .filter((p): p is { value: string; label: string } => Boolean(p)),
    faq: buildFaq(useCase, relatedServices),
  };

  return {
    useCase,
    content,
    relatedServices,
    relevantIndustries,
    children,
    canonicalUrl: `${SITE_URL}/use-cases/${useCase.slug}`,
  };
}
