import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SERVICE_LIST } from "@/lib/services";
import { TOTAL_CITY_COUNT } from "@/lib/serviceAreas";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | TWS Southeast Florida",
  description: `ICRA barriers & panels, dust containment & mitigation, and negative air machines & HEPA filtration — installed across ${TOTAL_CITY_COUNT} Southeast Florida cities.`,
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesIndexPage() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Services" }];

  return (
    <main>
      <Nav />
      <Breadcrumbs items={crumbs} />
      <section className="section">
        <div className="container-wide">
          <p className="label-mono-accent" style={{ marginBottom: "var(--space-3)" }}>
            Services
          </p>
          <h1
            className="display-head"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
              lineHeight: 1.05,
              marginBottom: "var(--space-4)",
              maxWidth: "24ch",
              color: "var(--color-ink-0)",
            }}
          >
            What we build, Treasure Coast to Miami.
          </h1>
          <p
            style={{
              fontSize: "var(--text-md)",
              lineHeight: 1.6,
              color: "var(--color-ink-3)",
              marginBottom: "var(--space-12)",
              maxWidth: "52ch",
            }}
          >
            One sealed, gasketed modular wall system — installed for infection
            control, dust containment, or both — plus the negative air
            machines and HEPA scrubbers to pair with it, across{" "}
            {TOTAL_CITY_COUNT} Southeast Florida cities.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {SERVICE_LIST.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="services-index-card">
                <span className="label-mono-accent">{service.shortName}</span>
                <span className="services-index-title">{service.name}</span>
                <span className="services-index-tagline">{service.tagline}</span>
              </Link>
            ))}
          </div>
        </div>

        <style>{`
          .services-index-card {
            display: flex;
            flex-direction: column;
            gap: var(--space-3);
            padding: var(--space-8);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
            text-decoration: none;
            transition: border-color var(--dur-fast) var(--ease-out);
          }
          .services-index-card:hover { border-color: var(--color-accent); }
          .services-index-title {
            font-family: var(--font-display);
            font-size: var(--text-xl);
            font-weight: 700;
            letter-spacing: -0.01em;
            color: var(--color-ink-0);
          }
          .services-index-tagline {
            font-size: var(--text-sm);
            color: var(--color-ink-3);
          }
        `}</style>
      </section>
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
