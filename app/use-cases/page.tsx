import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HEALTHCARE_PILLAR, getChildrenOfPillar, getUseCasesLinkedFromService } from "@/lib/useCases";
import { SERVICE_LIST } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Use Cases | TWS Southeast Florida",
  description: "ICRA, dust containment, and negative air solutions by facility type and project use case across Southeast Florida.",
  alternates: { canonical: `${SITE_URL}/use-cases` },
};

export default function UseCasesIndexPage() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Use Cases" }];
  const healthcareChildren = getChildrenOfPillar(HEALTHCARE_PILLAR.key);

  return (
    <main>
      <Nav />
      <Breadcrumbs items={crumbs} />
      <section className="section">
        <div className="container-wide">
          <p className="label-mono-accent" style={{ marginBottom: "var(--space-3)" }}>
            Use cases
          </p>
          <h1
            className="display-head"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
              lineHeight: 1.05,
              marginBottom: "var(--space-4)",
              maxWidth: "24ch",
              color: "var(--color-ink-0)",
            }}
          >
            Containment, by facility type.
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
            The same ICRA barriers, dust containment, and negative air machines TWS
            runs across Southeast Florida — organized by the project types we build
            them for most.
          </p>

          <div style={{ marginBottom: "var(--space-14)" }}>
            <Link href={`/use-cases/${HEALTHCARE_PILLAR.slug}`} className="uci-pillar-card">
              <span className="label-mono-accent">Pillar</span>
              <span className="uci-pillar-title">{HEALTHCARE_PILLAR.name} →</span>
            </Link>
            <div className="uci-grid" style={{ marginTop: "var(--space-6)" }}>
              {healthcareChildren.map((u) => (
                <Link key={u.slug} href={`/use-cases/${u.slug}`} className="uci-link">
                  {u.name}
                </Link>
              ))}
            </div>
          </div>

          {SERVICE_LIST.map((service) => {
            const linked = getUseCasesLinkedFromService(service.slug);
            if (linked.length === 0) return null;
            return (
              <div key={service.slug} style={{ marginBottom: "var(--space-10)" }}>
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
                  {service.name}
                </h2>
                <div className="uci-grid">
                  {linked.map((u) => (
                    <Link key={u.slug} href={`/use-cases/${u.slug}`} className="uci-link">
                      {u.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          .uci-pillar-card {
            display: inline-flex;
            flex-direction: column;
            gap: var(--space-2);
            padding: var(--space-6) var(--space-8);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-sm);
            text-decoration: none;
            transition: border-color var(--dur-fast) var(--ease-out);
          }
          .uci-pillar-card:hover { border-color: var(--color-accent); }
          .uci-pillar-title {
            font-family: var(--font-display);
            font-size: var(--text-lg);
            font-weight: 700;
            color: var(--color-ink-0);
          }
          .uci-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: var(--space-2);
          }
          .uci-link {
            color: var(--color-ink-2);
            text-decoration: none;
            font-size: var(--text-sm);
            padding: var(--space-2) 0;
          }
          .uci-link:hover { color: var(--color-accent); }
        `}</style>
      </section>
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
