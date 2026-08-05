import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { Industries } from "@/components/Industries";
import { Gallery } from "@/components/Gallery";
import { ServiceCapabilityPanel } from "@/components/ServiceCapabilityPanel";
import { EquipmentSpec } from "@/components/EquipmentSpec";
import { EQUIPMENT } from "@/lib/equipment";
import { ServiceRelatedUseCases } from "@/components/ServiceRelatedUseCases";
import { ServiceCityDirectory } from "@/components/ServiceCityDirectory";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { SERVICE_LIST } from "@/lib/services";
import { getServicePageData } from "@/lib/serviceContent";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return SERVICE_LIST.map((s) => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const data = getServicePageData(serviceSlug);
  if (!data) return {};

  const url = `${SITE_URL}/services/${data.service.slug}`;
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const data = getServicePageData(serviceSlug);
  if (!data) notFound();

  // JSON-LD only — no visible breadcrumb bar (same fix as location pages,
  // keeps the tuned Hero/LogoTicker above-the-fold spacing intact).
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: data.service.shortName },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(data.service)) }}
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
          coverageValue: "Treasure Coast → Miami",
        }}
      />
      <LogoTicker />
      <ServiceCapabilityPanel
        data={data}
        photoOverride={
          data.service.key === "negative-air-hepa-filtration"
            ? {
                src: "/negative-air-machine-rental-in-south-florida.png",
                alt: "HEPA-AIRE H2KM negative air machine by Abatement Technologies — available for negative air machine rental in South Florida",
                fit: "contain",
              }
            : undefined
        }
        contentOverride={
          data.service.key === "negative-air-hepa-filtration"
            ? {
                eyebrow: "Equipment we run",
                heading: `${EQUIPMENT.h2km.brand} ${EQUIPMENT.h2km.name}`,
                summary: EQUIPMENT.h2km.tagline,
                facts: EQUIPMENT.h2km.specs,
              }
            : undefined
        }
        compactBottom={data.service.key === "negative-air-hepa-filtration"}
      />
      {data.service.key === "negative-air-hepa-filtration" && (
        <>
          <EquipmentSpec equipment={EQUIPMENT.predator750} compactTop compactBottom />
          <EquipmentSpec equipment={EQUIPMENT.ag8000pas} compactTop />
        </>
      )}
      <ServiceRelatedUseCases service={data.service} />
      <Industries />
      <Gallery emphasisIndustries={data.service.relevantIndustries} />
      <ServiceCityDirectory service={data.service} />
      <section className="section">
        <div className="container-wide">
          <FaqAccordion
            heading={
              <>
                Common <span className="local-faq-heading-accent">{data.service.shortName}</span> questions
              </>
            }
            items={data.content.faq}
          />
        </div>
      </section>
      <CTABand serviceAreaValue={`Treasure Coast → Miami · ${data.service.shortName}`} />
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
