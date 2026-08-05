"use client";

/**
 * The mobile hero peek card's button — split into its own client component
 * because Hero.tsx is a server component (used across many statically
 * generated pages) and can't hold an onClick directly.
 */
export function HeroPeekCTA() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-quote-flow"))}
      className="btn btn-primary hero-peek-btn"
    >
      Request a Proposal
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
        <path
          d="M9 1L13 5L9 9M13 5H1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
}
