import Image from "next/image";
import type { ServicePageData } from "@/lib/serviceContent";

/**
 * Standalone service page's lead content block — same two-column visual
 * language as LocationContent's map+card grid (own scoped classes, matching
 * spacing/radius/color tokens), but the map slot is replaced by the real
 * ICRA corridor photo (already used in components/Industries.tsx) since
 * there's no map to show for a service page.
 */
export function ServiceCapabilityPanel({ data }: { data: ServicePageData }) {
  const { service, content } = data;

  return (
    <section id="capability" className="section">
      <div className="container-wide">
        <div className="svc-panel-grid">
          <div className="svc-panel-photo">
            <Image
              src="/icra-corridor.png"
              alt="TWS modular containment barrier installed in an occupied corridor"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="svc-panel-card">
            <p className="label-mono" style={{ marginBottom: "var(--space-3)", color: "var(--color-ink-4)" }}>
              What's included
            </p>
            <h2 className="svc-panel-heading">{service.name}</h2>
            <p className="svc-panel-summary">{content.overview}</p>

            {content.proofStat && (
              <div className="svc-stat">
                <div className="svc-stat-value">{content.proofStat.value}</div>
                <div className="svc-stat-label">{content.proofStat.label}</div>
              </div>
            )}

            <ul className="svc-facts">
              {content.capabilityFacts.map((fact) => (
                <li key={fact} className="svc-fact">
                  {fact}
                </li>
              ))}
            </ul>
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
            margin: 0 0 var(--space-6);
          }
          .svc-stat {
            padding: var(--space-5) 0;
            margin-bottom: var(--space-6);
            border-top: 1px solid var(--color-rule-strong);
            border-bottom: 1px solid var(--color-rule-strong);
          }
          .svc-stat-value {
            font-family: var(--font-display);
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--color-ink-0);
            line-height: 1;
            letter-spacing: -0.02em;
            margin-bottom: 6px;
          }
          .svc-stat-label {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--color-ink-3);
          }
          .svc-facts {
            display: grid;
            gap: var(--space-2);
            padding: 0;
            margin: 0;
            list-style: none;
          }
          .svc-fact {
            position: relative;
            padding-left: var(--space-5);
            font-size: var(--text-sm);
            color: var(--color-ink-2);
            line-height: 1.5;
          }
          .svc-fact::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0.5em;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-accent);
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
