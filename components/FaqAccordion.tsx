import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/**
 * Centered, card-boxed FAQ accordion — extracted from components/LocationContent.tsx
 * so both location pages and the new service pages share one implementation.
 * Native <details>/<summary> (no client JS, fully crawlable when collapsed).
 * First item open by default.
 */
export interface FaqAccordionProps {
  /** Full heading content, e.g. <>Common <span className="local-faq-heading-accent">{city.name}</span> questions</> */
  heading: React.ReactNode;
  items: { question: string; answer: string }[];
}

export function FaqAccordion({ heading, items }: FaqAccordionProps) {
  return (
    <div className="local-faq-section">
      <div className="local-faq-header">
        <p className="local-faq-eyebrow">
          <span aria-hidden /> FAQ <span aria-hidden />
        </p>
        <h3 className="local-faq-heading">{heading}</h3>
        <p className="local-faq-subheading">
          Have questions? Call or text{" "}
          <a href={`tel:${PHONE_TEL}`} className="local-faq-phone">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
      <div className="local-faq-list">
        {items.map((item, i) => (
          <details key={item.question} className="local-faq-item" open={i === 0}>
            <summary className="local-faq-summary">
              <h4 className="local-faq-question">{item.question}</h4>
              <span className="local-faq-chevron" aria-hidden>
                <ChevronIcon />
              </span>
            </summary>
            <p className="local-faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>

      <style>{`
        .local-faq-section {
          margin-top: var(--space-20);
          max-width: 46rem;
          margin-inline: auto;
        }
        .local-faq-header {
          text-align: center;
          margin-bottom: var(--space-8);
        }
        .local-faq-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 var(--space-4);
        }
        .local-faq-eyebrow span {
          display: inline-block;
          width: 1.5rem;
          height: 1px;
          background: var(--color-accent);
        }
        .local-faq-heading {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 2.8vw, 2.125rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: var(--color-ink-0);
          margin: 0 0 var(--space-3);
        }
        .local-faq-heading-accent { color: var(--color-accent); }
        .local-faq-subheading {
          font-size: var(--text-sm);
          color: var(--color-ink-3);
          margin: 0;
        }
        .local-faq-phone {
          color: var(--color-ink-2);
          font-weight: 600;
          text-decoration: none;
        }
        .local-faq-phone:hover { color: var(--color-accent); }

        .local-faq-list {
          display: grid;
          gap: var(--space-3);
        }
        .local-faq-item {
          border: 1px solid var(--color-rule-strong);
          border-radius: var(--radius-sm);
          background: var(--color-paper-0);
          padding-inline: var(--space-6);
          transition: border-color var(--dur-fast) var(--ease-out);
        }
        .local-faq-item[open] {
          border-color: var(--color-accent);
        }
        .local-faq-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          padding-block: var(--space-5);
          cursor: pointer;
          list-style: none;
        }
        .local-faq-summary::-webkit-details-marker { display: none; }
        .local-faq-question {
          font-family: var(--font-display);
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--color-ink-0);
          margin: 0;
        }
        .local-faq-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--color-ink-4);
          transition: transform var(--dur-base) var(--ease-out);
        }
        details[open] > .local-faq-summary .local-faq-chevron {
          transform: rotate(180deg);
          color: var(--color-accent);
        }
        .local-faq-answer {
          font-size: var(--text-sm);
          line-height: 1.6;
          color: var(--color-ink-3);
          margin: 0 0 var(--space-5);
        }
      `}</style>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
