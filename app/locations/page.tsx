import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SERVICE_AREAS, TOTAL_CITY_COUNT } from "@/lib/serviceAreas";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | TWS Southeast Florida",
  description: `TWS installs ICRA-rated modular containment walls across ${TOTAL_CITY_COUNT} cities from the Treasure Coast to Miami. Find your city.`,
  alternates: { canonical: `${SITE_URL}/locations` },
};

export default function LocationsIndexPage() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Service Areas" }];

  return (
    <main>
      <Nav />
      <Breadcrumbs items={crumbs} />
      <section className="section">
        <div className="container-wide">
          <p className="label-mono-accent" style={{ marginBottom: "var(--space-3)" }}>
            Service areas
          </p>
          <h1
            className="display-head"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
              lineHeight: 1.05,
              marginBottom: "var(--space-4)",
              maxWidth: "22ch",
              color: "var(--color-ink-0)",
            }}
          >
            {TOTAL_CITY_COUNT}+ cities, Treasure Coast to Miami.
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
            Pick your city for local coverage details, or call{" "}
            <a href="tel:+15617774958" style={{ color: "var(--color-accent)", fontWeight: 600 }}>
              (561) 777-4958
            </a>{" "}
            to talk through your project anywhere in the service area.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--space-10)",
            }}
          >
            {SERVICE_AREAS.map((region) => (
              <div key={region.key}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-lg)",
                    fontWeight: 600,
                    color: "var(--color-ink-0)",
                    marginBottom: "var(--space-4)",
                    paddingBottom: "var(--space-3)",
                    borderBottom: "1px solid var(--color-rule-strong)",
                  }}
                >
                  {region.name}
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)" }}>
                  {region.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/locations/${city.slug}`}
                        style={{ color: "var(--color-ink-2)", textDecoration: "none", fontSize: "var(--text-sm)" }}
                        className="locations-index-link"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .locations-index-link:hover {
            color: var(--color-accent);
          }
        `}</style>
      </section>
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
