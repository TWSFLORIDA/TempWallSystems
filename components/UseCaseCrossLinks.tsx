import Link from "next/link";
import type { UseCasePageData } from "@/lib/useCaseContent";

/**
 * Use-case page's cross-linking mesh — mirrors ServiceCrossLinks: every
 * non-pillar page links up to its single parent (pillar or menu service)
 * and out to each related service, so nothing here is an orphan leaf. The
 * pillar itself links out to all 3 related menu services (it has no single
 * parent — see lib/useCases.ts).
 */
export function UseCaseCrossLinks({ data }: { data: UseCasePageData }) {
  const { useCase, relatedServices } = data;

  return (
    <section id="more-coverage" className="section" style={{ background: "var(--color-paper-2)" }}>
      <div className="container-wide">
        <div className="uc-links-grid">
          {useCase.parentHref && useCase.parentLabel && (
            <Link href={useCase.parentHref} className="uc-link-card">
              <span className="label-mono-accent">Part of</span>
              <span className="uc-link-title">{useCase.parentLabel} →</span>
            </Link>
          )}
          {relatedServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="uc-link-card">
              <span className="label-mono-accent">Built with</span>
              <span className="uc-link-title">{service.name} →</span>
            </Link>
          ))}
        </div>

        <style>{`
          .uc-links-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--space-4);
          }
          .uc-link-card {
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
          .uc-link-card:hover { border-color: var(--color-accent); }
          .uc-link-title {
            font-family: var(--font-display);
            font-size: var(--text-base);
            font-weight: 600;
            color: var(--color-ink-0);
          }
        `}</style>
      </div>
    </section>
  );
}
