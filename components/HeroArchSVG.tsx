/**
 * Architectural backdrop for the hero — blueprint grid, drafting corner
 * marks, an air scrubber elevation sketch with dimension callouts, and
 * the ICRA certification seal. All at the perimeter; nothing in the
 * content path.
 *
 * `tone="on-light"` (default) — navy strokes on a light surface.
 * `tone="on-dark"`            — white-tinted strokes on a dark surface
 *                                (e.g. layered over the photo + navy overlay).
 */
type Tone = "on-light" | "on-dark";

export function HeroArchSVG({ tone = "on-light" }: { tone?: Tone }) {
  const strokeColor =
    tone === "on-dark"
      ? "rgba(255, 255, 255, 0.32)"
      : "var(--color-blueprint)";

  return (
    <svg
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      style={{
        width: "100%",
        height: "100%",
        color: strokeColor,
        overflow: "visible",
      }}
      fontFamily="var(--font-mono)"
    >
      {/* Drafting corner crop marks */}
      <g stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.5">
        <path d="M 40 60 L 40 40 L 60 40" />
        <path d="M 1340 40 L 1360 40 L 1360 60" />
        <path d="M 40 740 L 40 760 L 60 760" />
        <path d="M 1340 760 L 1360 760 L 1360 740" />
      </g>

      {/* ──────────── TOP X-axis ruler — linear feet measurement strip ──────────── */}
      <g
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        transform="translate(80, 56)"
      >
        {/* Main ruler line */}
        <line x1="0" y1="0" x2="1240" y2="0" />
        {/* Minor ticks every 40px (= 2'-0" at 1/4" = 1' scale) */}
        {Array.from({ length: 31 }, (_, i) => i * 40).map((x) => (
          <line
            key={`xt-${x}`}
            x1={x}
            y1="-3"
            x2={x}
            y2="3"
            opacity="0.6"
          />
        ))}
        {/* Major ticks every 160px (= 8'-0") */}
        {[0, 160, 320, 480, 640, 800, 960, 1120, 1240].map((x) => (
          <line
            key={`xT-${x}`}
            x1={x}
            y1="-6"
            x2={x}
            y2="6"
            strokeWidth="0.8"
          />
        ))}
        {/* Labels every 16' */}
        {[
          { x: 0, label: "0'" },
          { x: 320, label: "16'" },
          { x: 640, label: "32'" },
          { x: 960, label: "48'" },
          { x: 1240, label: "62'" },
        ].map(({ x, label }) => (
          <text
            key={`xL-${x}`}
            x={x}
            y="-12"
            textAnchor="middle"
            fontSize="9"
            stroke="none"
            fill="currentColor"
            opacity="0.85"
          >
            {label}
          </text>
        ))}
      </g>

      {/* Scattered STA (station) markers — anchor points along the X-axis */}
      <g
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.75"
      >
        {/* STA 04+20 */}
        <g transform="translate(420, 56)">
          <line x1="0" y1="0" x2="0" y2="-22" />
          <circle cx="0" cy="-30" r="10" />
          <text
            y="-27"
            textAnchor="middle"
            fontSize="7"
            stroke="none"
            fill="currentColor"
            opacity="0.85"
          >
            STA
          </text>
          <text
            y="-19"
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            stroke="none"
            fill="currentColor"
          >
            04+20
          </text>
        </g>
        {/* STA 12+80 */}
        <g transform="translate(900, 56)">
          <line x1="0" y1="0" x2="0" y2="-22" />
          <circle cx="0" cy="-30" r="10" />
          <text
            y="-27"
            textAnchor="middle"
            fontSize="7"
            stroke="none"
            fill="currentColor"
            opacity="0.85"
          >
            STA
          </text>
          <text
            y="-19"
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            stroke="none"
            fill="currentColor"
          >
            12+80
          </text>
        </g>
      </g>

      {/* Title block has been moved out of the SVG and rendered as an
          absolutely-positioned HTML element in Hero.tsx so it sticks to
          the bottom-left of the hero section regardless of viewport. */}

      {/* ICRA certification seal removed — was overlapping the form. */}
    </svg>
  );
}
