import Image from "next/image";
import type { CSSProperties } from "react";
import type { EquipmentItem } from "@/lib/equipment";

/**
 * One equipment spec section — same two-column visual language as
 * ServiceCapabilityPanel (own scoped classes), but the photo slot is a
 * light card holding a real product shot (contain, not cover, since these
 * are manufacturer catalog photos on white/transparent backgrounds) plus a
 * smaller detail inset. One component call = one piece of equipment, so
 * the next unit (e.g. the PAS750/"Predator") is just another call with its
 * own EQUIPMENT entry.
 */
export function EquipmentSpec({
  equipment,
  compactTop,
  compactBottom,
}: {
  equipment: EquipmentItem;
  /** Tighter top/bottom padding when another equipment row is adjacent, so a stack of rows reads as one showcase instead of separate page sections. */
  compactTop?: boolean;
  compactBottom?: boolean;
}) {
  const sectionStyle: CSSProperties = {
    ...(compactTop ? { paddingTop: "var(--space-8)" } : undefined),
    ...(compactBottom ? { paddingBottom: "var(--space-8)" } : undefined),
  };
  return (
    <section id={equipment.key} className="section" style={sectionStyle}>
      <div className="container-wide">
        <div className="eq-panel-grid">
          <div className="eq-panel-photos">
            <div className="eq-photo-main">
              <Image
                src={equipment.image.src}
                alt={equipment.image.alt}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            {equipment.image.detailSrc && (
              <div className="eq-photo-detail">
                <Image
                  src={equipment.image.detailSrc}
                  alt={equipment.image.detailAlt ?? ""}
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>

          <div className="eq-panel-card">
            <p className="label-mono" style={{ marginBottom: "var(--space-3)", color: "var(--color-ink-4)" }}>
              Equipment we run
            </p>
            <h2 className="eq-panel-heading">
              {equipment.brand} {equipment.name}
            </h2>
            <p className="eq-panel-tagline">{equipment.tagline}</p>

            <ul className="eq-facts">
              {equipment.specs.map((spec) => (
                <li key={spec} className="eq-fact">
                  {spec}
                </li>
              ))}
            </ul>

            <p className="eq-mfr">Manufactured by {equipment.manufacturer}</p>
          </div>
        </div>

        <style>{`
          .eq-panel-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
            gap: var(--space-8);
            align-items: stretch;
          }
          .eq-panel-card {
            padding: var(--space-8);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
          }
          .eq-panel-heading {
            font-family: var(--font-display);
            font-size: var(--text-xl);
            font-weight: 700;
            letter-spacing: -0.01em;
            color: var(--color-ink-0);
            margin: 0 0 var(--space-2);
          }
          .eq-panel-tagline {
            font-size: var(--text-sm);
            line-height: 1.5;
            color: var(--color-ink-3);
            margin: 0 0 var(--space-6);
          }
          .eq-facts {
            display: grid;
            gap: var(--space-2);
            padding: 0;
            margin: 0 0 var(--space-6);
            list-style: none;
          }
          .eq-fact {
            position: relative;
            padding-left: var(--space-5);
            font-size: var(--text-sm);
            color: var(--color-ink-2);
            line-height: 1.5;
          }
          .eq-fact::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0.5em;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-accent);
          }
          .eq-mfr {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--color-ink-4);
            margin: 0;
            padding-top: var(--space-5);
            border-top: 1px solid var(--color-rule);
          }

          .eq-panel-photos {
            display: flex;
            flex-direction: column;
            gap: var(--space-4);
          }
          .eq-photo-main {
            position: relative;
            flex: 1;
            min-height: 12rem;
            background: var(--color-paper-2);
            border: 1px solid var(--color-rule-strong);
            border-radius: var(--radius-md);
            overflow: hidden;
            padding: var(--space-4);
          }
          .eq-photo-detail {
            position: relative;
            flex: none;
            height: 9rem;
            background: var(--color-paper-dark);
            border: 1px solid var(--color-rule-strong);
            border-radius: var(--radius-md);
            overflow: hidden;
            padding: var(--space-4);
          }

          @media (max-width: 900px) {
            .eq-panel-grid {
              grid-template-columns: 1fr !important;
            }
            .eq-panel-photos {
              height: 20rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
