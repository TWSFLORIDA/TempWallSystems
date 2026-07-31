import Image from "next/image";
import type { IndustryKey } from "@/lib/serviceAreas";

type GalleryItem = {
  key: IndustryKey;
  label: string;
  caption: string;
  src: string;
};

const ITEMS: GalleryItem[] = [
  {
    key: "healthcare",
    label: "Healthcare Facilities",
    caption: "ICRA-rated infection control containment",
    src: "/gallery/industry-healthcare.jpg",
  },
  {
    key: "airport",
    label: "Airports & Transit",
    caption: "Concourse crowd-control containment",
    src: "/gallery/industry-airport.webp",
  },
  {
    key: "lab",
    label: "Labs & Cleanrooms",
    caption: "Cleanroom-grade barrier construction",
    src: "/gallery/industry-lab.jpg",
  },
  {
    key: "office",
    label: "Offices & Commercial",
    caption: "Operational tenant build-outs",
    src: "/gallery/industry-office.jpg",
  },
  {
    key: "retail",
    label: "Retail & Malls",
    caption: "Storefront renovation, business-as-usual",
    src: "/gallery/industry-retail.jpg",
  },
  {
    key: "events",
    label: "Events & Hospitality",
    caption: "Back-of-house and crowd partitioning",
    src: "/gallery/industry-events.png",
  },
  {
    key: "school",
    label: "Schools & Universities",
    caption: "Quiet-zone separation during class hours",
    src: "/gallery/industry-school.webp",
  },
  {
    key: "telecom",
    label: "Telecom & Datacenters",
    caption: "Critical-infrastructure perimeter",
    src: "/gallery/industry-telecom.webp",
  },
  {
    key: "government",
    label: "Government Buildings",
    caption: "Secure-perimeter renovations",
    src: "/gallery/industry-government.jpg",
  },
];

function rank(key: IndustryKey, emphasis: IndustryKey[]): number {
  const i = emphasis.indexOf(key);
  return i === -1 ? emphasis.length : i;
}

export function Gallery({
  emphasisIndustries,
}: { emphasisIndustries?: IndustryKey[] } = {}) {
  const items = emphasisIndustries?.length
    ? [...ITEMS].sort((a, b) => rank(a.key, emphasisIndustries) - rank(b.key, emphasisIndustries))
    : ITEMS;

  return (
    <section
      id="gallery"
      className="section"
      style={{ background: "var(--color-paper-2)" }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            flexWrap: "wrap",
            gap: "var(--space-6)",
            marginBottom: "var(--space-12)",
          }}
        >
          <div>
            <p
              className="label-mono-accent"
              style={{ marginBottom: "var(--space-3)" }}
            >
              04 / Industries we serve
            </p>
            <h2
              className="display-head"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3rem)",
                lineHeight: 1.05,
                whiteSpace: "nowrap",
              }}
            >
              Making construction zones blend in.
            </h2>
          </div>
          <a href="#contact" className="btn btn-ghost">
            See more on request
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M9 1L13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </a>
        </div>

        {/* Uniform 3 × 3 grid — every cell same width AND height */}
        <ul className="gallery-grid">
          {items.map((item) => (
            <li key={item.key} className="gallery-cell">
              <div className="gallery-img">
                <Image
                  src={item.src}
                  alt={`${item.label} — ${item.caption}`}
                  fill
                  sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 30vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="gallery-icon" aria-hidden>
                  <IndustryIcon name={item.key} />
                </span>
              </div>
              <div className="gallery-meta">
                <div className="gallery-label">{item.label}</div>
                <div className="gallery-caption">{item.caption}</div>
              </div>
            </li>
          ))}
        </ul>

        <style>{`
          .gallery-grid {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: var(--space-5);
          }
          .gallery-cell {
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule);
            border-radius: var(--radius-md);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform var(--dur-base) var(--ease-out),
                        box-shadow var(--dur-base) var(--ease-out),
                        border-color var(--dur-base) var(--ease-out);
          }
          .gallery-cell:hover {
            transform: translateY(-3px);
            border-color: var(--color-ink-3);
            box-shadow: 0 16px 32px rgba(7, 21, 77, 0.08),
                        0 4px 8px rgba(7, 21, 77, 0.04);
          }
          .gallery-img {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 3;
            background: var(--color-paper-dark);
            overflow: hidden;
          }
          .gallery-cell :global(img) {
            transition: transform var(--dur-slow) var(--ease-out);
          }
          .gallery-cell:hover :global(img) {
            transform: scale(1.04);
          }
          .gallery-icon {
            position: absolute;
            top: var(--space-3);
            left: var(--space-3);
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-paper-0);
            color: var(--color-ink-0);
            border-radius: var(--radius-xs);
            box-shadow: 0 2px 6px rgba(7, 21, 77, 0.15);
            z-index: 2;
          }
          .gallery-meta {
            padding: var(--space-5) var(--space-5) var(--space-6);
            border-top: 1px solid var(--color-rule);
            display: flex;
            flex-direction: column;
            gap: var(--space-1);
          }
          .gallery-label {
            font-family: var(--font-display);
            font-size: var(--text-base);
            font-weight: 600;
            color: var(--color-ink-0);
            letter-spacing: -0.01em;
            line-height: 1.25;
          }
          .gallery-caption {
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: var(--color-ink-3);
            line-height: 1.4;
          }
          @media (max-width: 900px) {
            .gallery-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }
          @media (max-width: 540px) {
            .gallery-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ──────────── Industry icons — line, 1.5px stroke, currentColor ──────────── */

function IndustryIcon({ name }: { name: IndustryKey }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "square" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "healthcare":
      return (
        <svg {...common}>
          <path d="M12 3v18M3 12h18" />
          <rect x="4" y="4" width="16" height="16" rx="1" />
        </svg>
      );
    case "airport":
      return (
        <svg {...common}>
          <path d="M21 16l-7-4V5.5a1.5 1.5 0 0 0-3 0V12L4 16v2l7-2v4l-2 1.5V22l3-1 3 1v-.5L13 20v-4l8 2v-2z" />
        </svg>
      );
    case "lab":
      return (
        <svg {...common}>
          <path d="M9 2v6L4 20a1 1 0 0 0 .9 1.4h14.2A1 1 0 0 0 20 20L15 8V2" />
          <path d="M9 2h6" />
          <path d="M6.5 14h11" />
        </svg>
      );
    case "office":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" />
          <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
        </svg>
      );
    case "retail":
      return (
        <svg {...common}>
          <path d="M4 7h16l-1 13H5L4 7z" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "events":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V9l7-5 7 5v12" />
          <path d="M10 21v-6h4v6" />
        </svg>
      );
    case "school":
      return (
        <svg {...common}>
          <path d="M3 9l9-5 9 5-9 5-9-5z" />
          <path d="M7 11v5a5 3 0 0 0 10 0v-5" />
          <path d="M21 9v5" />
        </svg>
      );
    case "telecom":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="6" rx="1" />
          <rect x="5" y="13" width="14" height="6" rx="1" />
          <circle cx="8" cy="6" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "government":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V10h14v11" />
          <path d="M3 10l9-6 9 6" />
          <path d="M9 21v-6M15 21v-6" />
        </svg>
      );
  }
}
