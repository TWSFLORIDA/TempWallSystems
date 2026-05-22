import { LeadForm } from "./LeadForm";

export function CTABand() {
  return (
    <section
      id="contact"
      className="section"
      style={{
        background: "var(--color-paper-dark)",
        color: "var(--color-ink-on-dark)",
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
            gap: "var(--space-16)",
            alignItems: "start",
          }}
          className="cta-grid"
        >
          <div>
            <p
              className="label-mono-accent"
              style={{ marginBottom: "var(--space-6)" }}
            >
              05 / Start the project
            </p>
            <h2
              className="display-head"
              style={{
                fontSize: "clamp(2.25rem, 4.4vw, 4rem)",
                lineHeight: 1.04,
                marginBottom: "var(--space-6)",
                color: "var(--color-ink-on-dark)",
                maxWidth: "16ch",
              }}
            >
              Tell us about your&nbsp;project.
            </h2>
            <p
              style={{
                fontSize: "var(--text-md)",
                lineHeight: 1.6,
                color: "var(--color-ink-on-dark-soft)",
                marginBottom: "var(--space-10)",
                maxWidth: "44ch",
              }}
            >
              A short conversation gets you a clear proposal &mdash; scope,
              timeline, and pricing. Same-day responses.
            </p>

            <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: "28rem" }}>
              <ContactRow
                label="Direct line"
                value="(561) 777-4958"
                href="tel:+15617774958"
              />
              <ContactRow
                label="Email"
                value="nick.thomson@tempwallsystems.com"
                href="mailto:nick.thomson@tempwallsystems.com"
              />
              <ContactRow
                label="Office"
                value="2240 W Woolbright Rd, Suite #416 · Boynton Beach, FL"
              />
              <ContactRow
                label="Service area"
                value="Treasure Coast → Florida Keys"
              />
              <ContactRow
                label="Response window"
                value="Same-day, often within the hour"
              />
            </div>
          </div>

          <div>
            <LeadForm variant="section" />
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cta-grid {
              grid-template-columns: 1fr !important;
              gap: var(--space-10) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(7rem, auto) 1fr",
        gap: "var(--space-4)",
        alignItems: "baseline",
        paddingBottom: "var(--space-4)",
        borderBottom: "1px solid var(--color-rule-on-dark)",
      }}
    >
      <span
        className="label-mono"
        style={{ color: "var(--color-ink-on-dark-soft)" }}
      >
        {label}
      </span>
      {href ? (
        <a
          href={href}
          style={{
            color: "var(--color-ink-on-dark)",
            textDecoration: "none",
            fontWeight: 500,
            fontFamily: "var(--font-display)",
          }}
        >
          {value}
        </a>
      ) : (
        <span
          style={{
            color: "var(--color-ink-on-dark)",
            fontWeight: 500,
            fontFamily: "var(--font-display)",
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}
