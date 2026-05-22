"use client";

import Image from "next/image";

/**
 * Infinite-scroll trust ticker. Logos render in grayscale at reduced
 * opacity by default; hover restores full color. Animation pauses on
 * hover so users can read individual logos.
 *
 * To add or remove logos: drop the file into /public/partners/ and
 * update the LOGOS array below.
 */

type Logo = {
  name: string;
  src: string;
  /** Per-logo height override (px) — for logos with extra padding baked
      into the source PNG/SVG that need a visual size boost to match peers. */
  height?: number;
};

// Ordered so dense wordmarks bookend the list (first AND last position)
// for a tight loop seam. Narrower / squarer marks live in the middle.
// Walsh is omitted because the supplied PNG is white-on-transparent
// and renders invisibly against the white section background — drop a
// dark-version Walsh logo into /partners/walsh.png to re-enable.
const LOGOS: Logo[] = [
  { name: "Whiting-Turner", src: "/partners/whiting-turner.png" },
  { name: "HCA Florida", src: "/partners/hca-florida.png" },
  { name: "Memorial", src: "/partners/memorial.png" },
  { name: "Lifetime Fitness", src: "/partners/lifetime-fitness.png" },
  { name: "Tim Hortons", src: "/partners/tim-hortons.png" },
  { name: "United Rentals", src: "/partners/united-rentals.svg" },
  { name: "Gilbane", src: "/partners/gilbane.png" },
  { name: "LEGO", src: "/partners/lego.avif" },
  { name: "WBC", src: "/partners/wbc.avif" },
  { name: "Skechers", src: "/partners/207969882.png" },
  { name: "Baptist Health", src: "/partners/baptist-health.png", height: 88 },
  { name: "Fulcrum Construction", src: "/partners/fulcrum.webp" },
];

export function LogoTicker() {
  // Duplicate the list so the marquee loops seamlessly.
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="lt-section" aria-label="Trusted by">
      <div className="container-wide lt-header">
        <span className="lt-label">Trusted by the teams building</span>
        <span className="lt-rule" aria-hidden />
      </div>

      <div className="lt-track-wrap">
        <div className="lt-track">
          {doubled.map((logo, i) => (
            <div className="lt-item" key={`${logo.name}-${i}`}>
              <Image
                src={logo.src}
                alt={logo.name}
                width={300}
                height={120}
                sizes="200px"
                style={{
                  height: `${logo.height ?? 60}px`,
                  width: "auto",
                  maxWidth: "200px",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .lt-section {
          background: var(--color-paper-0);
          padding-block: var(--space-5);
          border-bottom: 1px solid var(--color-rule);
        }
        /* Compress dramatically on short viewports so hero + ticker
           both fit above the fold on 13" laptops. */
        @media (max-height: 900px) {
          .lt-section { padding-block: var(--space-3); }
        }
        @media (max-height: 800px) {
          .lt-section { padding-block: var(--space-2); }
        }
        .lt-header {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-3);
        }
        @media (max-height: 900px) {
          .lt-header { margin-bottom: var(--space-2); }
        }
        @media (max-height: 800px) {
          .lt-header { display: none; }
        }
        .lt-label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-ink-3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .lt-rule {
          flex: 1;
          height: 1px;
          background: var(--color-rule);
        }
        .lt-track-wrap {
          overflow: hidden;
          width: 100%;
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 6%,
            black 94%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black 6%,
            black 94%,
            transparent 100%
          );
        }
        .lt-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: lt-scroll 140s linear infinite;
          padding-block: var(--space-2);
        }
        .lt-track:hover {
          animation-play-state: paused;
        }
        /* Spacing is margin-right on each item, NOT a flex gap, so the
           total track width is exactly 2 × (one-set width). That makes
           translateX(-50%) land on the first item of the second copy,
           which is visually identical to item 1 of the first copy →
           seamless loop, no visible restart. */
        /* Each item is auto-width (logo's natural width at fixed height),
           with a uniform margin-right that creates pixel-even spacing
           between every adjacent pair of logos. */
        .lt-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: var(--space-12);
        }
        @media (max-height: 900px) {
          .lt-item :global(img) { height: 48px !important; max-width: 160px !important; }
          .lt-item { margin-right: var(--space-10); }
        }
        @media (max-height: 800px) {
          .lt-item :global(img) { height: 40px !important; max-width: 140px !important; }
          .lt-item { margin-right: var(--space-8); }
        }
        .lt-item :global(img) {
          filter: grayscale(100%) opacity(0.5);
          transition: filter var(--dur-base) var(--ease-out);
        }
        .lt-item:hover :global(img) {
          filter: grayscale(0%) opacity(1);
        }
        @keyframes lt-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .lt-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
