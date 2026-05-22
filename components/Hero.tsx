import Image from "next/image";
import { LeadForm } from "./LeadForm";
import { HeroArchSVG } from "./HeroArchSVG";

export function Hero() {
  return (
    <section
      id="top"
      style={{
        background: "var(--color-paper-dark)",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Hero background photo — real TWS installation */}
      <Image
        src="/hero-bg.jpg?v=mdc"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "20% center",
          transform: "scale(1.4)",
          transformOrigin: "center",
          zIndex: 0,
        }}
        aria-hidden
      />

      {/* Brand #07154D navy overlay — using rgba hex directly so the displayed
          color is exactly the brand value (no OKLCH gamut-mapping drift toward violet) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(7, 21, 77, 0.95) 0%, rgba(7, 21, 77, 0.92) 35%, rgba(7, 21, 77, 0.78) 65%, rgba(7, 21, 77, 0.60) 100%)",
        }}
      />

      {/* Architectural sketch overlay — ICRA seal + air scrubber + grid in white at low opacity */}
      <div
        aria-hidden
        className="hero-arch"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <HeroArchSVG tone="on-dark" />
      </div>

      <div
        className="container hero-content"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
          gap: "var(--space-12)",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left — copy + trust chips */}
        <div className="hero-copy" style={{ paddingTop: "var(--space-4)" }}>
          <p
            className="label-mono-accent"
            style={{ marginBottom: "var(--space-6)" }}
          >
            01 / ICRA-Rated Containment · South Florida
          </p>

          <h1
            className="display-head"
            style={{
              fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "var(--color-ink-on-dark)",
              marginBottom: "var(--space-6)",
              maxWidth: "18ch",
              hyphens: "none",
              overflowWrap: "normal",
            }}
          >
            Renovate without shutting&nbsp;down.
          </h1>

          <p
            style={{
              fontSize: "var(--text-md)",
              lineHeight: 1.6,
              color: "var(--color-ink-on-dark-soft)",
              marginBottom: "var(--space-10)",
              maxWidth: "52ch",
            }}
          >
            ICRA-rated modular walls for healthcare, airports, labs, and beyond.
            Installed in hours, reconfigured between phases, removed without a
            trace. From the Treasure Coast to the Florida Keys.
          </p>

          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-6) var(--space-10)",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
            className="trust-row"
          >
            <TrustChip label="Compliance" value="ICRA Class I–IV" />
            <TrustChip label="Response" value="Same Day" />
            <TrustChip label="Coverage" value="Treasure Coast → Keys" />
          </ul>

          {/* Title block — flow element after chips on the left, can never overlap */}
          <div className="hero-title-block" aria-hidden>
            <div className="htb-row htb-row-1">
              <span className="htb-label">DRAWING</span>
              <span className="htb-label">SCALE</span>
            </div>
            <div className="htb-row htb-row-2">
              <span className="htb-value">A-04 / ICRA</span>
              <span className="htb-value">1/4&quot; = 1&apos;-0&quot;</span>
            </div>
            <div className="htb-row htb-row-3">
              <span className="htb-label">TWS · MODULAR CONTAINMENT WALL</span>
            </div>
          </div>
        </div>

        {/* Right — frosted-glass lead form (glass blur picks up the photo) */}
        <div id="quote" className="hero-form-wrap">
          <LeadForm variant="hero" />
        </div>
      </div>

      <style>{`
        /* Hero vertical padding — symmetric, generous on tall viewports,
           compressed on short ones so the LogoTicker stays above the fold. */
        .hero-content {
          padding-top: var(--space-12);
          padding-bottom: var(--space-12);
        }
        @media (max-height: 900px) {
          .hero-content {
            padding-top: var(--space-8) !important;
            padding-bottom: var(--space-8) !important;
            gap: var(--space-12) !important;
          }
          section#top h1.display-head {
            font-size: clamp(2.25rem, 4.5vw, 3.75rem) !important;
            margin-bottom: var(--space-4) !important;
          }
        }
        @media (max-height: 800px) {
          .hero-content {
            padding-top: var(--space-6) !important;
            padding-bottom: var(--space-6) !important;
            gap: var(--space-10) !important;
          }
          section#top h1.display-head {
            font-size: clamp(2rem, 4vw, 3rem) !important;
            margin-bottom: var(--space-3) !important;
          }
          section#top .hero-copy > p {
            font-size: var(--text-base) !important;
            margin-bottom: var(--space-6) !important;
            line-height: 1.5 !important;
          }
          section#top .hero-copy {
            padding-top: 0 !important;
          }
        }
        /* Title block — flow element on the left, after trust chips */
        .hero-title-block {
          margin-top: var(--space-8);
          width: 300px;
          max-width: 100%;
          pointer-events: none;
          font-family: var(--font-mono);
          color: rgba(255, 255, 255, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.32);
        }
        .hero-title-block .htb-row {
          display: flex;
          padding: 6px 10px;
        }
        .hero-title-block .htb-row-1,
        .hero-title-block .htb-row-2 {
          border-bottom: 1px solid rgba(255, 255, 255, 0.32);
        }
        .hero-title-block .htb-row-1 > span,
        .hero-title-block .htb-row-2 > span {
          width: 50%;
        }
        .hero-title-block .htb-row-1 > span + span,
        .hero-title-block .htb-row-2 > span + span {
          border-left: 1px solid rgba(255, 255, 255, 0.32);
          padding-left: 10px;
        }
        .hero-title-block .htb-label {
          font-size: 9px;
          opacity: 0.75;
          letter-spacing: 0.05em;
        }
        .hero-title-block .htb-value {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 1100px) {
          .hero-arch { opacity: 0.8; }
        }
        @media (max-width: 900px) {
          .hero-title-block { display: none; }
        }
        @media (max-width: 900px) {
          section#top > .container-wide {
            grid-template-columns: 1fr !important;
            gap: var(--space-12) !important;
            padding-block: var(--space-16) !important;
          }
          .hero-arch { display: none; }
        }
      `}</style>
    </section>
  );
}

function TrustChip({ label, value }: { label: string; value: string }) {
  return (
    <li
      style={{
        borderTop: "1px solid var(--color-rule-on-dark)",
        paddingTop: "var(--space-3)",
        minWidth: "max-content",
      }}
    >
      <div
        className="label-mono"
        style={{
          marginBottom: "var(--space-1)",
          color: "var(--color-ink-on-dark-soft)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-base)",
          fontWeight: 600,
          color: "var(--color-ink-on-dark)",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </li>
  );
}
