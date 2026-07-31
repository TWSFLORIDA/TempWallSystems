import Link from "next/link";
import type { ServiceMeta } from "@/lib/services";
import { SERVICE_AREAS, TOTAL_CITY_COUNT } from "@/lib/serviceAreas";

/**
 * Standalone-service-page-only — every city grouped by region, linking to
 * that service's combo page for the city. Structurally cloned from
 * app/locations/page.tsx's region/city grid so the visual language matches
 * exactly; this is the direct fulfillment of "internally linked on each
 * service area."
 */
export function ServiceCityDirectory({ service }: { service: ServiceMeta }) {
  return (
    <section id="coverage" className="section" style={{ background: "var(--color-paper-2)" }}>
      <div className="container-wide">
        <p className="label-mono-accent" style={{ marginBottom: "var(--space-3)" }}>
          Coverage
        </p>
        <h2
          className="display-head"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            lineHeight: 1.1,
            marginBottom: "var(--space-10)",
            maxWidth: "28ch",
            color: "var(--color-ink-0)",
          }}
        >
          {service.shortName} in {TOTAL_CITY_COUNT} Southeast Florida cities.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-10)",
          }}
        >
          {SERVICE_AREAS.map((region) => (
            <div key={region.key}>
              <h3
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
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)" }}>
                {region.cities.map((city) => (
                  <li key={city.slug}>
                    <Link
                      href={`/services/${service.slug}/${city.slug}`}
                      className="svc-directory-link"
                      style={{ color: "var(--color-ink-2)", textDecoration: "none", fontSize: "var(--text-sm)" }}
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <style>{`
          .svc-directory-link:hover { color: var(--color-accent); }
        `}</style>
      </div>
    </section>
  );
}
