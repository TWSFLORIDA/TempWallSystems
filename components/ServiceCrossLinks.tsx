import Link from "next/link";
import type { ServiceCityPageData } from "@/lib/serviceContent";

/**
 * Combo-page-only — the cross-linking mesh: back to the full standalone
 * service page, back to the city's own general coverage page, nearby cities
 * for the same service, and the other service for the same city. This is
 * the concrete internal-linking ask: every combo page ties back into both
 * the service tree and the location tree, not a dead-end leaf.
 */
export function ServiceCrossLinks({ data }: { data: ServiceCityPageData }) {
  const { service, city, nearbySameService, otherServices } = data;

  return (
    <section id="more-coverage" className="section" style={{ background: "var(--color-paper-2)" }}>
      <div className="container-wide">
        <div className="svc-links-grid">
          <Link href={`/services/${service.slug}`} className="svc-link-card">
            <span className="label-mono-accent">More on this service</span>
            <span className="svc-link-title">{service.name} →</span>
          </Link>
          <Link href={`/locations/${city.slug}`} className="svc-link-card">
            <span className="label-mono-accent">Full city coverage</span>
            <span className="svc-link-title">All {city.name} coverage →</span>
          </Link>
          {otherServices.map((other) => (
            <Link key={other.slug} href={`/services/${other.slug}/${city.slug}`} className="svc-link-card">
              <span className="label-mono-accent">Also serving {city.name}</span>
              <span className="svc-link-title">{other.shortName} →</span>
            </Link>
          ))}
        </div>

        {nearbySameService.length > 0 && (
          <div style={{ marginTop: "var(--space-10)" }}>
            <p className="label-mono" style={{ marginBottom: "var(--space-3)", color: "var(--color-ink-4)" }}>
              {service.shortName} nearby
            </p>
            <div className="svc-nearby">
              {nearbySameService.map((c) => (
                <Link key={c.slug} href={`/services/${service.slug}/${c.slug}`} className="svc-nearby-chip">
                  <PinIconSmall />
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <style>{`
          .svc-links-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--space-4);
          }
          .svc-link-card {
            display: flex;
            flex-direction: column;
            gap: var(--space-2);
            padding: var(--space-6);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
            text-decoration: none;
            transition: border-color var(--dur-fast) var(--ease-out);
          }
          .svc-link-card:hover { border-color: var(--color-accent); }
          .svc-link-title {
            font-family: var(--font-display);
            font-size: var(--text-base);
            font-weight: 600;
            color: var(--color-ink-0);
          }
          .svc-nearby {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
          }
          .svc-nearby-chip {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-2) var(--space-3);
            border-radius: var(--radius-xs);
            border: 1px solid var(--color-rule-strong);
            font-size: var(--text-sm);
            color: var(--color-ink-2);
            text-decoration: none;
            transition: border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
          }
          .svc-nearby-chip:hover {
            border-color: var(--color-accent);
            color: var(--color-accent);
          }
          .svc-nearby-chip svg { color: var(--color-ink-4); flex-shrink: 0; }
          .svc-nearby-chip:hover svg { color: var(--color-accent); }
        `}</style>
      </div>
    </section>
  );
}

function PinIconSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 18s6-5.5 6-10.4A6 6 0 0 0 4 7.6C4 12.5 10 18 10 18z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="7.6" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
