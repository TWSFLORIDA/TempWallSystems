import Link from "next/link";
import type { CityPageData } from "@/lib/locationContent";
import { FaqAccordion } from "./FaqAccordion";
import { SERVICE_LIST } from "@/lib/services";

/**
 * The genuinely-unique section on each /locations/[slug] page — a map-led
 * layout (map + compact "Serving {city}" card with real fact pills, nearby
 * cities directly below), then one supporting paragraph and an FAQ.
 * Rendered only on location pages, never on the homepage. Server component
 * (no client JS). Heading levels: h2 → h3 → h4, always preceded on the page
 * by Industries' h2, so this never skips a level.
 */
export function LocationContent({ data }: { data: CityPageData }) {
  const { city, region, content, nearby } = data;
  const pills = [city.county, "Florida", "ICRA Class I–IV", city.zip];

  return (
    <section id="local" className="section">
      <div className="container-wide">
        {/* ── Eyebrow row ────────────────────────────────────────────── */}
        <div className="local-top-row">
          <p className="label-mono-accent">Local to {city.name}</p>
          <Link href="/locations" className="local-all-link">
            All service areas →
          </Link>
        </div>

        {/* ── Map + compact card ─────────────────────────────────────── */}
        <div className="local-map-grid">
          <div className="local-map-wrap">
            <iframe
              src={content.mapEmbedSrc}
              title={`Map of ${city.name}, FL`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>

          <div className="local-card">
            <div className="local-card-icon">
              <PinIcon />
            </div>
            <h2 className="local-card-heading">Serving {city.name}</h2>
            <p className="local-card-summary">{content.cardSummary}</p>
            <div className="local-pills">
              {pills.map((p) => (
                <span key={p} className="local-pill">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Nearby cities, directly under the map ─────────────────── */}
        {nearby.length > 0 && (
          <div className="local-nearby">
            {nearby.map((c) => (
              <Link key={c.slug} href={`/locations/${c.slug}`} className="local-nearby-chip">
                <PinIconSmall />
                {c.name}
              </Link>
            ))}
          </div>
        )}

        {/* ── Services in {city} ─────────────────────────────────────── */}
        <div className="local-services">
          <p className="label-mono" style={{ marginBottom: "var(--space-3)", color: "var(--color-ink-4)" }}>
            Services in {city.name}
          </p>
          <div className="local-services-grid">
            {SERVICE_LIST.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/${city.slug}`}
                className="local-service-card"
              >
                <span className="local-service-title">{service.name}</span>
                <span className="local-service-tagline">{service.tagline}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Supporting paragraph ───────────────────────────────────── */}
        <p className="local-supporting">{content.paragraph}</p>
        <p className="local-map-caption">{content.mapCaption}</p>

        {/* ── FAQ — centered card-boxed accordion ─────────────────────── */}
        <FaqAccordion
          heading={
            <>
              Common <span className="local-faq-heading-accent">{city.name}</span> questions
            </>
          }
          items={content.faq}
        />

        <style>{`
          .local-top-row {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: var(--space-3);
            margin-bottom: var(--space-6);
          }
          .local-all-link {
            font-family: var(--font-mono);
            font-size: var(--text-xs);
            letter-spacing: 0.06em;
            text-transform: uppercase;
            font-weight: 600;
            color: var(--color-accent);
            text-decoration: none;
          }
          .local-all-link:hover { color: var(--color-accent-hover); }

          .local-map-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
            gap: var(--space-8);
            align-items: start;
          }
          .local-map-wrap {
            height: 20rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--color-rule-strong);
            overflow: hidden;
          }
          .local-card {
            display: flex;
            flex-direction: column;
            height: 20rem;
            padding: var(--space-8);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
          }
          .local-card-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.75rem;
            height: 2.75rem;
            border-radius: var(--radius-xs);
            background: var(--color-accent-soft);
            color: var(--color-accent);
            margin-bottom: var(--space-5);
          }
          .local-card-heading {
            font-family: var(--font-display);
            font-size: var(--text-lg);
            font-weight: 700;
            letter-spacing: -0.01em;
            color: var(--color-ink-0);
            margin: 0 0 var(--space-4);
          }
          .local-card-summary {
            font-size: var(--text-sm);
            line-height: 1.65;
            color: var(--color-ink-3);
            margin: 0;
          }
          .local-pills {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
            margin-top: auto;
          }
          .local-pill {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            padding: var(--space-1) var(--space-2);
            border-radius: var(--radius-xs);
            background: var(--color-accent-soft);
            color: var(--color-accent);
          }

          .local-nearby {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
            margin-top: var(--space-6);
          }
          .local-nearby-chip {
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
          .local-nearby-chip:hover {
            border-color: var(--color-accent);
            color: var(--color-accent);
          }
          .local-nearby-chip svg { color: var(--color-ink-4); flex-shrink: 0; }
          .local-nearby-chip:hover svg { color: var(--color-accent); }

          .local-services {
            margin-top: var(--space-8);
          }
          .local-services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--space-3);
          }
          .local-service-card {
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
            padding: var(--space-5);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
            text-decoration: none;
            transition: border-color var(--dur-fast) var(--ease-out);
          }
          .local-service-card:hover { border-color: var(--color-accent); }
          .local-service-title {
            font-family: var(--font-display);
            font-size: var(--text-sm);
            font-weight: 700;
            color: var(--color-ink-0);
          }
          .local-service-tagline {
            font-size: var(--text-xs);
            color: var(--color-ink-3);
          }

          .local-supporting {
            font-size: var(--text-sm);
            line-height: 1.65;
            color: var(--color-ink-3);
            max-width: 72ch;
            margin-top: var(--space-8);
            margin-bottom: var(--space-1);
          }
          .local-map-caption {
            font-size: var(--text-xs);
            color: var(--color-ink-4);
            margin: 0;
          }

          @media (max-width: 900px) {
            .local-map-grid {
              grid-template-columns: 1fr !important;
            }
            .local-map-wrap {
              height: auto;
              aspect-ratio: 16 / 9;
            }
            .local-card {
              height: auto;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 18s6-5.5 6-10.4A6 6 0 0 0 4 7.6C4 12.5 10 18 10 18z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="7.6" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
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

