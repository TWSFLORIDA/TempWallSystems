import Image from "next/image";
import Link from "next/link";
import type { UseCasePageData } from "@/lib/useCaseContent";

/**
 * Use-case page's lead content block — same two-column photo+card layout as
 * ServiceCapabilityPanel (reusing the same real ICRA corridor photo, since
 * there's no dedicated photo per vertical), so use-case pages carry the same
 * visual weight as the standalone service pages instead of a lone card
 * floating in a mostly-empty container. For the pillar, also renders a grid
 * linking down to its 21 children — the hub half of the hub-and-spoke
 * internal-linking mesh.
 */
export function UseCaseCapabilityPanel({ data }: { data: UseCasePageData }) {
  const { content, children } = data;

  return (
    <section id="capability" className="section">
      <div className="container-wide">
        <div className="uc-panel-grid">
          <div className="uc-panel-photo">
            <Image
              src="/icra-corridor.png"
              alt="TWS modular containment barrier installed in an occupied corridor"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="uc-panel-card">
            <p className="label-mono" style={{ marginBottom: "var(--space-3)", color: "var(--color-ink-4)" }}>
              What's included
            </p>
            <p className="uc-panel-summary">{content.intro}</p>

            {content.proofStats.length > 0 && (
              <div className="uc-stats-row">
                {content.proofStats.map((stat) => (
                  <div key={stat.label} className="uc-stat">
                    <div className="uc-stat-value">{stat.value}</div>
                    <div className="uc-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <ul className="uc-facts">
              {content.capabilityFacts.map((fact) => (
                <li key={fact} className="uc-fact">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {children.length > 0 && (
          <div style={{ marginTop: "var(--space-14)" }}>
            <p className="label-mono" style={{ marginBottom: "var(--space-4)", color: "var(--color-ink-4)" }}>
              By facility type
            </p>
            <div className="uc-children-grid">
              {children.map((child) => (
                <Link key={child.slug} href={`/use-cases/${child.slug}`} className="uc-child-card">
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <style>{`
          .uc-panel-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
            gap: var(--space-8);
            align-items: start;
          }
          .uc-panel-photo {
            position: relative;
            height: 26rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--color-rule-strong);
            overflow: hidden;
          }
          .uc-panel-card {
            padding: var(--space-8);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
          }
          .uc-panel-summary {
            font-size: var(--text-sm);
            line-height: 1.65;
            color: var(--color-ink-3);
            margin: 0 0 var(--space-6);
          }
          .uc-stats-row {
            display: flex;
            flex-wrap: wrap;
            gap: var(--space-8);
            padding: var(--space-5) 0;
            margin-bottom: var(--space-6);
            border-top: 1px solid var(--color-rule-strong);
            border-bottom: 1px solid var(--color-rule-strong);
          }
          .uc-stat-value {
            font-family: var(--font-display);
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--color-ink-0);
            line-height: 1;
            letter-spacing: -0.02em;
            margin-bottom: 6px;
          }
          .uc-stat-label {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--color-ink-3);
          }
          .uc-facts {
            display: grid;
            gap: var(--space-2);
            padding: 0;
            margin: 0;
            list-style: none;
          }
          .uc-fact {
            position: relative;
            padding-left: var(--space-5);
            font-size: var(--text-sm);
            color: var(--color-ink-2);
            line-height: 1.5;
          }
          .uc-fact::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0.5em;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-accent);
          }
          .uc-children-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--space-3);
          }
          .uc-child-card {
            padding: var(--space-4) var(--space-5);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-xs);
            font-size: var(--text-sm);
            font-weight: 600;
            color: var(--color-ink-1);
            text-decoration: none;
            transition: border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
          }
          .uc-child-card:hover {
            border-color: var(--color-accent);
            color: var(--color-accent);
          }

          @media (max-width: 900px) {
            .uc-panel-grid {
              grid-template-columns: 1fr !important;
            }
            .uc-panel-photo {
              height: 16rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
