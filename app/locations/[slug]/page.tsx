import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { VideoBand } from "@/components/VideoBand";
import { Industries } from "@/components/Industries";
import { LocationContent } from "@/components/LocationContent";
import { Gallery } from "@/components/Gallery";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { CITIES } from "@/lib/serviceAreas";
import { getCityPageData } from "@/lib/locationContent";
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildVideoObjectSchema,
} from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getCityPageData(slug);
  if (!data) return {};

  const url = `${SITE_URL}/locations/${data.city.slug}`;
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

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCityPageData(slug);
  if (!data) notFound();

  // Used only for BreadcrumbList structured data — no visible breadcrumb bar
  // is rendered. A visible bar between Nav and Hero pushed the whole page
  // down, cutting the LogoTicker off the fold that the homepage's Hero
  // padding is specifically tuned to keep visible. Zero visual cost this way,
  // same SEO value.
  const crumbs = [
    { name: "Home", href: "/" },
    { name: data.region.name },
    { name: data.city.name },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema(data.city)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(crumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(data.content.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildVideoObjectSchema()) }}
      />
      <Nav />
      <Hero location={data} />
      <LogoTicker />
      <VideoBand />
      <Industries />
      <Gallery emphasisIndustries={data.region.emphasisIndustries} />
      <LocationContent data={data} />
      <CTABand location={data} />
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
