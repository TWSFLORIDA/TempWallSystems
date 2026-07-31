import Link from "next/link";
import type { ServiceMeta } from "@/lib/services";
import { HEALTHCARE_PILLAR, getUseCasesLinkedFromService } from "@/lib/useCases";

/**
 * Standalone service page's "down" link into the use-case tier — completes
 * the hub-and-spoke mesh alongside UseCaseCrossLinks' "up" links. Every
 * menu service links to the Healthcare Facility Containment pillar (all 3
 * services are among its relatedServiceSlugs) plus any programmatic
 * use-case pages parented directly to this service.
 */
export function ServiceRelatedUseCases({ service }: { service: ServiceMeta }) {
  const linked = getUseCasesLinkedFromService(service.slug);
  const items = [
    { href: `/use-cases/${HEALTHCARE_PILLAR.slug}`, label: HEALTHCARE_PILLAR.name },
    ...linked.map((u) => ({ href: `/use-cases/${u.slug}`, label: u.name })),
  ];

  return (
    <section className="section" style={{ background: "var(--color-paper-2)" }}>
      <div className="container-wide">
        <p className="label-mono" style={{ marginBottom: "var(--space-4)", color: "var(--color-ink-4)" }}>
          Use cases for {service.shortName.toLowerCase()}
        </p>
        <div className="svc-uc-grid">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="svc-uc-link">
              {item.label} →
            </Link>
          ))}
        </div>
        <style>{`
          .svc-uc-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--space-3);
          }
          .svc-uc-link {
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
          .svc-uc-link:hover {
            border-color: var(--color-accent);
            color: var(--color-accent);
          }
        `}</style>
      </div>
    </section>
  );
}
