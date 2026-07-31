import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { Gallery } from "@/components/Gallery";
import { UseCaseCapabilityPanel } from "@/components/UseCaseCapabilityPanel";
import { UseCaseCrossLinks } from "@/components/UseCaseCrossLinks";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { USE_CASE_LIST } from "@/lib/useCases";
import { getUseCasePageData } from "@/lib/useCaseContent";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/jsonLd";

export function generateStaticParams() {
  return USE_CASE_LIST.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getUseCasePageData(slug);
  if (!data) return {};

  return {
    title: data.content.metaTitle,
    description: data.content.metaDescription,
    alternates: { canonical: data.canonicalUrl },
    openGraph: {
      title: data.content.metaTitle,
      description: data.content.metaDescription,
      url: data.canonicalUrl,
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

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getUseCasePageData(slug);
  if (!data) notFound();

  const { useCase } = data;

  // JSON-LD only — no visible breadcrumb bar (same fix as location and
  // service pages, keeps the Hero/LogoTicker above-the-fold spacing intact).
  const crumbs = useCase.isPillar
    ? [{ name: "Home", href: "/" }, { name: "Use Cases", href: "/use-cases" }, { name: useCase.name }]
    : useCase.parentHref?.startsWith("/services")
      ? [
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: useCase.parentLabel!, href: useCase.parentHref! },
          { name: useCase.name },
        ]
      : [
          { name: "Home", href: "/" },
          { name: "Use Cases", href: "/use-cases" },
          { name: useCase.parentLabel!, href: useCase.parentHref! },
          { name: useCase.name },
        ];

  return (
    <main>
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
      <UseCaseCapabilityPanel data={data} />
      <Gallery emphasisIndustries={data.relevantIndustries} />
      <section className="section">
        <div className="container-wide">
          <FaqAccordion
            heading={
              <>
                Common <span className="local-faq-heading-accent">{useCase.name}</span> questions
              </>
            }
            items={data.content.faq}
          />
        </div>
      </section>
      <UseCaseCrossLinks data={data} />
      <CTABand serviceAreaValue={`Treasure Coast → Miami · ${useCase.name}`} />
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
