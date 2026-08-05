import Image from "next/image";
import { LeadForm } from "./LeadForm";
import { HeroArchSVG } from "./HeroArchSVG";
import type { CityPageData } from "@/lib/locationContent";

export interface ServiceHeroOverride {
  eyebrow: string;
  body: string;
  /** Primary, keyword-focused <h1> text — real service/city name, e.g.
   *  "ICRA Barriers & Panels in Miami, FL". Required for service pages so
   *  the H1 always carries the target keyword, never just the brand tagline. */
  headline: string;
  coverageValue: string;
}

export function Hero({
  location,
  serviceOverride,
}: { location?: CityPageData; serviceOverride?: ServiceHeroOverride } = {}) {
  const eyebrow =
    serviceOverride?.eyebrow ??
    (location ? location.content.heroEyebrow : "ICRA-Rated Containment · Southeast Florida");
  const body =
    serviceOverride?.body ??
    (location
      ? location.content.heroBody
      : "ICRA-rated modular walls for healthcare, airports, labs, and beyond. Reconfigured between phases, removed without a trace. From the Treasure Coast to Miami.");
  const coverageValue =
    serviceOverride?.coverageValue ?? (location ? location.content.trustCoverageValue : "Treasure Coast → Miami");
  // Real keyword headline (service/city name) becomes the primary <h1> text
  // whenever one is available — on headline pages the brand tagline is
  // dropped entirely (it was redundant filler under an already-specific
  // headline). On the homepage (neither prop passed), the tagline is the
  // only line — byte-identical to before.
  const headline = serviceOverride?.headline ?? location?.content.heroHeadline;
  // Two separate concerns, deliberately not conflated into one vw-based
  // clamp (that was the original bug): maxWidth controls how many lines a
  // headline wraps to (a WIDTH concern, tiered by character count — city
  // names run ~30 chars, compound use-case titles up to ~63), while
  // font-size uses vh (not vw) so it shrinks on short viewports regardless
  // of how wide the window is — a plain vw-based size has zero awareness
  // of viewport HEIGHT, which is what actually determines whether
  // LogoTicker ends up above the fold. Verified with Playwright across a
  // real device-size matrix (1024x768 through 1920x1080) after this change.
  // Uppercase runs visually wider than mixed-case at the same font-size (no
  // ascenders/descenders to break up letterforms), so maxWidth is widened
  // slightly alongside the size bump to keep the same line-wrap behavior —
  // re-verified with Playwright after this change, not assumed.
  const headlineSizing = headline
    ? headline.length <= 32
      ? { fontSize: "clamp(3rem, 6.4vh, 5.75rem)", maxWidth: "30ch" }
      : headline.length <= 45
        ? { fontSize: "clamp(2.75rem, 5.8vh, 5.25rem)", maxWidth: "36ch" }
        : { fontSize: "clamp(2.375rem, 5vh, 4.75rem)", maxWidth: "40ch" }
    : null;

  return (
    <section
      id="top"
      data-headline={headline ? "true" : "false"}
      style={{
        background: "var(--color-paper-dark)",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Hero background photo — real TWS installation */}
      <Image
        src="/modular-containment-wall-installation-parking-structure.jpg"
        alt="Modular temporary containment wall installed along a covered walkway at a Southeast Florida facility"
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
            style={{ marginBottom: headline ? "var(--space-5)" : "var(--space-6)" }}
          >
            01 / {eyebrow}
          </p>

          <h1
            className="display-head"
            style={{
              fontSize: headlineSizing ? headlineSizing.fontSize : "clamp(3rem, 6.8vh, 6rem)",
              fontWeight: 900,
              lineHeight: headline ? 1.08 : 1.02,
              letterSpacing: "-0.025em",
              color: "var(--color-ink-on-dark)",
              marginBottom: headline ? "var(--space-5)" : "var(--space-6)",
              maxWidth: headlineSizing ? headlineSizing.maxWidth : "18ch",
              hyphens: "none",
              overflowWrap: "normal",
            }}
          >
            {headline ?? <>Renovate without shutting&nbsp;down.</>}
          </h1>

          {headline && <div className="hero-h1-accent" aria-hidden />}

          <p
            style={{
              fontSize: "var(--text-md)",
              lineHeight: 1.6,
              color: "var(--color-ink-on-dark-soft)",
              marginBottom: headline ? "var(--space-8)" : "var(--space-10)",
              maxWidth: "52ch",
            }}
          >
            {body}
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
            <TrustChip label="Construction" value="Sealed & Gasketed" />
            <TrustChip label="Coverage" value={coverageValue} />
          </ul>

          {/* Title block — pure decoration (aria-hidden). Homepage only —
              on every other page it's ~150px of ballast fighting the
              above-the-fold budget for zero content value. */}
          {!headline && (
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
          )}
        </div>

        {/* Right — frosted-glass lead form (glass blur picks up the photo) */}
        <div id="quote" className="hero-form-wrap">
          <LeadForm variant="hero" />
        </div>
      </div>

      <style>{`
        /* Small architectural accent rule under the uppercase headline —
           matches the blueprint/drawing motif already in the hero
           background (HeroArchSVG) and the homepage's title-block, cheap
           in vertical space, gives the headline a designed anchor point
           instead of just floating above the body copy. */
        .hero-h1-accent {
          width: 3.5rem;
          height: 3px;
          background: var(--color-accent);
          margin-bottom: var(--space-6);
        }
        /* Hero vertical padding — vh-based clamp() instead of a fixed
           token + breakpoint overrides (same principle as the headline
           font-size above): scales continuously with viewport height, so
           it's generously roomy wherever there's space and compacts
           smoothly on short viewports instead of jumping at a hard
           cutoff. A fixed value here kept hitting the same wall — "more
           breathing room" and "never push the ticker below the fold" are
           in direct tension, and a flat number can only satisfy one. */
        .hero-content {
          padding-top: var(--space-20);
          padding-bottom: var(--space-20);
        }
        @media (max-height: 1150px) {
          .hero-content {
            padding-top: var(--space-10) !important;
            padding-bottom: var(--space-10) !important;
            gap: var(--space-12) !important;
          }
        }
        @media (max-height: 800px) {
          .hero-content {
            padding-top: var(--space-6) !important;
            padding-bottom: var(--space-6) !important;
            gap: var(--space-10) !important;
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
        @media (max-height: 800px) {
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
