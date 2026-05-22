/**
 * Partner logos. Currently rendered as text wordmarks in monospace —
 * swap each <span> for an <img src="/partners/foo.svg" alt="..." /> when
 * the real assets are available. Aim for consistent visual weight
 * (height ≈ 24–32px, monochrome treatment).
 */

const PARTNERS: { name: string; placeholder: string }[] = [
  { name: "Whiting-Turner", placeholder: "WHITING-TURNER" },
  { name: "Gilbane", placeholder: "GILBANE" },
  { name: "Suffolk", placeholder: "SUFFOLK" },
  { name: "Skanska", placeholder: "SKANSKA" },
  { name: "DPR Construction", placeholder: "DPR" },
  { name: "United Rentals", placeholder: "UNITED RENTALS" },
  { name: "Turner", placeholder: "TURNER" },
];

export function Partners() {
  return (
    <section id="partners" className="section-tight">
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 3fr)",
            gap: "var(--space-10)",
            alignItems: "center",
          }}
          className="prt-grid"
        >
          <div>
            <p
              className="label-mono-accent"
              style={{ marginBottom: "var(--space-3)" }}
            >
              06 / Trusted with
            </p>
            <h3
              style={{
                fontSize: "var(--text-xl)",
                lineHeight: 1.25,
                color: "var(--color-ink-0)",
              }}
            >
              The general contractors building South Florida.
            </h3>
          </div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "var(--space-8) var(--space-6)",
              alignItems: "center",
              borderTop: "1px solid var(--color-rule)",
              borderBottom: "1px solid var(--color-rule)",
              padding: "var(--space-8) 0",
            }}
          >
            {PARTNERS.map((p) => (
              <li
                key={p.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "var(--color-ink-3)",
                  textTransform: "uppercase",
                }}
                aria-label={p.name}
              >
                {p.placeholder}
              </li>
            ))}
          </ul>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .prt-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
