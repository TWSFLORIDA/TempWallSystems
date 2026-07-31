import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { VideoBand } from "@/components/VideoBand";
import { Gallery } from "@/components/Gallery";
import { ServiceCityCombinedPanel } from "@/components/ServiceCityCombinedPanel";
import { ServiceCrossLinks } from "@/components/ServiceCrossLinks";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { getServiceCityPageData, getAllServiceCityParams } from "@/lib/serviceContent";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";
import type { IndustryKey } from "@/lib/serviceAreas";

export function generateStaticParams() {
  return getAllServiceCityParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string; citySlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug, citySlug } = await params;
  const data = getServiceCityPageData(serviceSlug, citySlug);
  if (!data) return {};

  const url = `${SITE_URL}/services/${data.service.slug}/${data.city.slug}`;
  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: data.content.metaTitle,
      description: data.content.metaDescription,
      url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.content.metaTitle,
      description: data.content.metaDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ serviceSlug: string; citySlug: string }>;
}) {
  const { serviceSlug, citySlug } = await params;
  const data = getServiceCityPageData(serviceSlug, citySlug);
  if (!data) notFound();

  // JSON-LD only — no visible breadcrumb bar (same fix as location and
  // standalone service pages).
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: data.service.shortName, href: `/services/${data.service.slug}` },
    { name: data.city.name },
  ];

  // Merge real facts from both dimensions — service relevance + this
  // region's real emphasis — deduplicated, for Gallery's honest reordering.
  const mergedIndustries = Array.from(
    new Set<IndustryKey>([...data.service.relevantIndustries, ...data.region.emphasisIndustries])
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(data.service, data.city)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(crumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(data.content.faq)) }}
      />
      <Nav />
      <Hero
        serviceOverride={{
          eyebrow: data.content.heroEyebrow,
          body: data.content.heroBody,
          headline: data.content.heroHeadline,
          coverageValue: `${data.city.name}, FL`,
        }}
      />
      <LogoTicker />
      <VideoBand />
      <ServiceCityCombinedPanel data={data} />
      <Gallery emphasisIndustries={mergedIndustries} />
      <section className="section">
        <div className="container-wide">
          <FaqAccordion
            heading={
              <>
                Common <span className="local-faq-heading-accent">{data.city.name}</span> questions
              </>
            }
            items={data.content.faq}
          />
        </div>
      </section>
      <ServiceCrossLinks data={data} />
      <CTABand serviceAreaValue={`${data.city.name} · ${data.service.shortName}`} />
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
