import Image from "next/image";

type Industry = {
  key: string;
  name: string;
  blurb: string;
};

const SECONDARY: Industry[] = [
  { key: "airport", name: "Airports & Transit", blurb: "Keep terminals operational." },
  { key: "lab", name: "Labs & Cleanrooms", blurb: "Hold cleanroom standards." },
  { key: "office", name: "Offices", blurb: "Contain noise and dust." },
  { key: "retail", name: "Retail & Hospitality", blurb: "Business-as-usual storefronts." },
  { key: "school", name: "Schools & Universities", blurb: "Learning-focused quiet zones." },
  { key: "telecom", name: "Telecom & Datacenters", blurb: "Protect critical infrastructure." },
  { key: "events", name: "Events & Venues", blurb: "Crowd control and back-of-house." },
  { key: "government", name: "Government Buildings", blurb: "Secure-perimeter renovations." },
];

export function Industries() {
  return (
    <section id="industries" className="section">
      <div className="container-wide">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: "var(--space-12)",
            gap: "var(--space-8)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p className="label-mono-accent" style={{ marginBottom: "var(--space-3)" }}>
              03 / Industries served
            </p>
            <h2
              className="display-head"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3rem)",
                lineHeight: 1.05,
                maxWidth: "22ch",
              }}
            >
              Built for areas that have to stay open during construction.
            </h2>
          </div>
        </div>

        {/* ICRA spike — feature row */}
        <article
          id="icra"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
            gap: "var(--space-12)",
            alignItems: "stretch",
            border: "1px solid var(--color-rule-strong)",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            background: "var(--color-paper-1)",
          }}
          className="icra-spike"
        >
          <div
            style={{
              padding: "var(--space-12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "var(--space-10)",
            }}
          >
            <div>
              <p
                className="label-mono-accent"
                style={{ marginBottom: "var(--space-4)" }}
              >
                ICRA · Healthcare
              </p>
              <h3
                style={{
                  fontSize: "var(--text-2xl)",
                  lineHeight: 1.15,
                  marginBottom: "var(--space-5)",
                  color: "var(--color-ink-0)",
                }}
              >
                Containment that infection-control teams sign off on.
              </h3>
              <p
                style={{
                  fontSize: "var(--text-md)",
                  color: "var(--color-ink-2)",
                  lineHeight: 1.6,
                  maxWidth: "48ch",
                  marginBottom: "var(--space-6)",
                }}
              >
                Negative-pressure compatible. HEPA-ready. Anti-microbial panels,
                gasketed seals, ICRA-rated penetration management. We install
                while your unit stays open and document every barrier for survey.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--space-3) var(--space-6)",
                  maxWidth: "36rem",
                }}
                className="icra-points"
              >
                {[
                  "Class I–IV barrier construction",
                  "Negative-pressure ready",
                  "HEPA & airlock compatible",
                  "Joint Commission survey documentation",
                  "After-hours installation",
                  "Phased reconfiguration",
                ].map((p) => (
                  <li
                    key={p}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "var(--space-2)",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-ink-1)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        color: "var(--color-accent)",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                      }}
                    >
                      —
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="btn btn-primary" style={{ alignSelf: "start" }}>
              Request a Proposal
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                <path d="M9 1L13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </a>
          </div>

          {/* Real ICRA project photo with broadcast-style lower third */}
          <div
            style={{
              minHeight: "24rem",
              position: "relative",
              borderLeft: "1px solid var(--color-rule)",
              overflow: "hidden",
            }}
            className="icra-photo"
          >
            <Image
              src="/icra-containment-wall-hospital-nursing-station.png"
              alt="Healthcare ICRA containment — nurse at a hospital nursing station beside a sealed corridor with TWS modular wall panels"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            {/* Navy lower-third with TWS logo + ICRA caption */}
            <div className="icra-lt">
              <Image
                src="/tws-logo-white.webp"
                alt="TWS"
                width={300}
                height={143}
                style={{
                  height: "48px",
                  width: "auto",
                  display: "block",
                  flexShrink: 0,
                }}
              />
              <div className="icra-lt-divider" aria-hidden />
              <div className="icra-lt-text">
                <div className="icra-lt-label">ICRA-Rated Containment</div>
                <div className="icra-lt-sub">CLASS I – IV · INFECTION CONTROL</div>
              </div>
            </div>
          </div>
        </article>

        {/* Secondary industries — compact strip */}
        <div style={{ marginTop: "var(--space-16)" }}>
          <p
            className="label-mono"
            style={{ marginBottom: "var(--space-6)" }}
          >
            Also serving
          </p>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "var(--space-px) 0",
              listStyle: "none",
              padding: 0,
              margin: 0,
              borderTop: "1px solid var(--color-rule)",
            }}
            className="ind-grid"
          >
            {SECONDARY.map((it) => (
              <li
                key={it.key}
                style={{
                  borderBottom: "1px solid var(--color-rule)",
                  borderRight: "1px solid var(--color-rule)",
                  padding: "var(--space-6)",
                }}
                className="ind-cell"
              >
                <h4
                  style={{
                    fontSize: "var(--text-base)",
                    fontWeight: 600,
                    marginBottom: "var(--space-2)",
                    color: "var(--color-ink-0)",
                  }}
                >
                  {it.name}
                </h4>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-ink-3)",
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {it.blurb}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <style>{`
          /* ICRA lower-third — navy gradient banner with logo + caption */
          .icra-lt {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: var(--space-10) var(--space-6) var(--space-5);
            display: flex;
            align-items: center;
            gap: var(--space-5);
            background: linear-gradient(
              180deg,
              rgba(7, 21, 77, 0) 0%,
              rgba(7, 21, 77, 0.75) 45%,
              rgba(7, 21, 77, 0.96) 100%
            );
            z-index: 2;
          }
          .icra-lt-divider {
            width: 1px;
            height: 36px;
            background: rgba(255, 255, 255, 0.25);
            flex-shrink: 0;
          }
          .icra-lt-text {
            min-width: 0;
            color: #fff;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .icra-lt-label {
            font-family: var(--font-display);
            font-size: var(--text-base);
            font-weight: 600;
            color: #fff;
            line-height: 1.2;
            letter-spacing: -0.01em;
          }
          .icra-lt-sub {
            font-family: var(--font-mono);
            font-size: 0.625rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.78);
            line-height: 1;
          }
          @media (max-width: 900px) {
            .icra-spike { grid-template-columns: 1fr !important; }
            .icra-spike > div:first-child { padding: var(--space-8) !important; }
            .icra-photo { min-height: 16rem !important; border-left: 0 !important; border-top: 1px solid var(--color-rule); }
            .ind-meta { text-align: left !important; }
          }
          @media (max-width: 768px) {
            .ind-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .icra-points { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 480px) {
            .ind-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
