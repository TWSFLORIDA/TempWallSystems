/**
 * [PLACEHOLDER BLOCK — Honest-copy rule]
 *
 * No invented testimonials. Replace each `quote`, `name`, `title`, and `firm`
 * with real client-approved copy before launch. Until then, the section
 * renders a labelled placeholder so the visual rhythm holds but no fake
 * social proof is shipped.
 */

type Quote = {
  quote: string | null;
  name: string | null;
  title: string | null;
  firm: string | null;
};

const QUOTES: Quote[] = [
  { quote: null, name: null, title: null, firm: null },
  { quote: null, name: null, title: null, firm: null },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-tight">
      <div className="container">
        <div style={{ marginBottom: "var(--space-10)" }}>
          <p className="label-mono-accent" style={{ marginBottom: "var(--space-3)" }}>
            05 / In their words
          </p>
          <h2
            className="display-head"
            style={{
              fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)",
              lineHeight: 1.1,
              maxWidth: "26ch",
            }}
          >
            Real quotes go here&mdash;not stock praise.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-8)",
          }}
          className="tm-grid"
        >
          {QUOTES.map((q, i) => (
            <QuoteCard key={i} index={i + 1} q={q} />
          ))}
        </div>

        <p
          style={{
            marginTop: "var(--space-8)",
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-mono)",
            color: "var(--color-ink-4)",
            letterSpacing: "0.05em",
          }}
        >
          [DEV NOTE — Replace placeholder quotes in components/Testimonials.tsx
          before launch. Per Hallmark honest-copy rule, no invented quotes are
          shipped.]
        </p>

        <style>{`
          @media (max-width: 768px) {
            .tm-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function QuoteCard({ index, q }: { index: number; q: Quote }) {
  const isPlaceholder = !q.quote;
  return (
    <figure
      style={{
        margin: 0,
        border: "1px solid var(--color-rule-strong)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-10)",
        background: "var(--color-paper-0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "14rem",
        position: "relative",
      }}
    >
      <span
        className="label-mono"
        style={{
          position: "absolute",
          top: "var(--space-5)",
          right: "var(--space-5)",
          fontSize: "0.625rem",
        }}
      >
        {String(index).padStart(2, "0")} / {String(QUOTES.length).padStart(2, "0")}
      </span>

      {isPlaceholder ? (
        <>
          <blockquote
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: 1.5,
              color: "var(--color-ink-3)",
              margin: 0,
              fontStyle: "normal",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            —
          </blockquote>
          <figcaption
            style={{
              marginTop: "var(--space-6)",
              paddingTop: "var(--space-4)",
              borderTop: "1px solid var(--color-rule)",
            }}
          >
            <div className="label-mono">Quote pending</div>
            <div
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-ink-4)",
                marginTop: "var(--space-1)",
              }}
            >
              [Client · Title · Firm]
            </div>
          </figcaption>
        </>
      ) : (
        <>
          <blockquote
            style={{
              fontSize: "var(--text-lg)",
              lineHeight: 1.5,
              color: "var(--color-ink-1)",
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 500,
            }}
          >
            &ldquo;{q.quote}&rdquo;
          </blockquote>
          <figcaption
            style={{
              marginTop: "var(--space-6)",
              paddingTop: "var(--space-4)",
              borderTop: "1px solid var(--color-rule)",
              fontSize: "var(--text-sm)",
            }}
          >
            <div style={{ fontWeight: 600, color: "var(--color-ink-0)" }}>
              {q.name}
            </div>
            <div style={{ color: "var(--color-ink-3)" }}>
              {q.title}
              {q.firm ? ` · ${q.firm}` : ""}
            </div>
          </figcaption>
        </>
      )}
    </figure>
  );
}
