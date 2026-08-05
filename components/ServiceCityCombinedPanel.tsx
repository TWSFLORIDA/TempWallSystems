import Image from "next/image";
import type { ServiceCityPageData } from "@/lib/serviceContent";

/**
 * Combo-page ("{service} in {city}") lead content block — same visual shell
 * as ServiceCapabilityPanel, but the pill row merges BOTH city facts
 * (county, ZIP) and service facts (capability + proof stat) in one row —
 * the component-level enforcement that this page is genuinely a combination,
 * not a service page and a city page concatenated.
 */
export function ServiceCityCombinedPanel({ data }: { data: ServiceCityPageData }) {
  const { service, city, content } = data;
  const pills = [
    city.county,
    city.zip,
    ...(content.proofStat ? [`${content.proofStat.value} ${content.proofStat.label}`] : []),
    content.capabilityFacts[0],
  ];

  return (
    <section id="capability" className="section">
      <div className="container-wide">
        <div className="svc-panel-grid">
          <div className="svc-panel-photo">
            <Image
              src="/icra-containment-wall-hospital-corridor.png"
              alt={`TWS ${service.name} — modular containment wall installed in ${city.name}, FL`}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="svc-panel-card">
            <p className="label-mono" style={{ marginBottom: "var(--space-3)", color: "var(--color-ink-4)" }}>
              {service.shortName} · {city.name}
            </p>
            <h2 className="svc-panel-heading">
              {service.shortName} in {city.name}
            </h2>
            <p className="svc-panel-summary">{content.paragraphPrimary}</p>
            <p className="svc-panel-summary">{content.paragraphSecondary}</p>

            <div className="svc-pills">
              {pills.map((p) => (
                <span key={p} className="svc-pill">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .svc-panel-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
            gap: var(--space-8);
            align-items: start;
          }
          .svc-panel-photo {
            position: relative;
            height: 26rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--color-rule-strong);
            overflow: hidden;
          }
          .svc-panel-card {
            padding: var(--space-8);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
          }
          .svc-panel-heading {
            font-family: var(--font-display);
            font-size: var(--text-xl);
            font-weight: 700;
            letter-spacing: -0.01em;
            color: var(--color-ink-0);
            margin: 0 0 var(--space-4);
          }
          .svc-panel-summary {
            font-size: var(--text-sm);
            line-height: 1.65;
            color: var(--color-ink-3);
            margin: 0 0 var(--space-4);
          }
          .svc-pills {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-2);
            margin-top: var(--space-2);
          }
          .svc-pill {
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

          @media (max-width: 900px) {
            .svc-panel-grid {
              grid-template-columns: 1fr !important;
            }
            .svc-panel-photo {
              height: 16rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
