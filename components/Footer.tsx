import Image from "next/image";
import Link from "next/link";
import { SERVICE_AREAS, TOTAL_CITY_COUNT } from "@/lib/serviceAreas";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-paper-dark-2)",
        color: "var(--color-ink-on-dark-soft)",
        paddingBlock: "var(--space-20) var(--space-10)",
        borderTop: "1px solid var(--color-ink-1)",
      }}
    >
      <div className="container-wide">
        {/* Brand row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr)",
            gap: "var(--space-10)",
            alignItems: "start",
            paddingBottom: "var(--space-12)",
            borderBottom: "1px solid var(--color-rule-on-dark)",
          }}
          className="ft-top"
        >
          {/* LEFT — brand identity */}
          <div>
            <Image
              src="/tws-logo-white.webp"
              alt="TWS — Temporary Wall Systems"
              width={300}
              height={143}
              style={{
                height: "72px",
                width: "auto",
                display: "block",
                marginBottom: "var(--space-5)",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: "var(--text-sm)",
                lineHeight: 1.6,
                color: "var(--color-ink-on-dark-soft)",
                maxWidth: "36ch",
              }}
            >
              ICRA-rated modular wall systems for occupied renovations across
              Southeast Florida.
            </p>
          </div>

          {/* MIDDLE — contact (operational) */}
          <div>
            <div
              className="label-mono"
              style={{
                color: "var(--color-ink-on-dark-soft)",
                marginBottom: "var(--space-5)",
              }}
            >
              Contact
            </div>
            <FooterContactLink
              href="tel:+15617774958"
              label="(561) 777-4958"
            />
            <FooterContactLink
              href="mailto:nick.thomson@tempwallsystems.com"
              label="nick.thomson@tempwallsystems.com"
            />
            <address
              style={{
                marginTop: "var(--space-4)",
                fontStyle: "normal",
                fontSize: "var(--text-sm)",
                lineHeight: 1.55,
                color: "var(--color-ink-on-dark-soft)",
              }}
            >
              2240 W Woolbright Road, Suite #416
              <br />
              Boynton Beach, FL 33426
            </address>
          </div>

          {/* RIGHT — explore (navigation) */}
          <div>
            <div
              className="label-mono"
              style={{
                color: "var(--color-ink-on-dark-soft)",
                marginBottom: "var(--space-5)",
              }}
            >
              Explore
            </div>
            <FooterContactLink href="#industries" label="Industries we serve" />
            <FooterContactLink href="#icra" label="ICRA containment" />
            <FooterContactLink href="#gallery" label="Project gallery" />
            <FooterContactLink href="/use-cases" label="Use cases by facility type" />
            <FooterContactLink href="#contact" label="Request a proposal" />
          </div>
        </div>

        {/* Service-area list */}
        <div style={{ paddingBlock: "var(--space-12)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              marginBottom: "var(--space-8)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                color: "var(--color-ink-on-dark)",
                fontWeight: 600,
              }}
            >
              Service area
            </h3>
            <span
              className="label-mono"
              style={{ color: "var(--color-ink-on-dark-soft)" }}
            >
              Treasure Coast → Miami · {TOTAL_CITY_COUNT}+ cities
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: "var(--space-8)",
            }}
            className="ft-areas"
          >
            {SERVICE_AREAS.map((region) => (
              <div key={region.name}>
                <div
                  className="label-mono-accent"
                  style={{ marginBottom: "var(--space-3)" }}
                >
                  {region.name}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                  }}
                >
                  {region.cities.map((city) => (
                    <li
                      key={city.slug}
                      style={{
                        fontSize: "var(--text-sm)",
                        lineHeight: 1.4,
                      }}
                    >
                      <Link href={`/locations/${city.slug}`} className="ft-area-link">
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Base row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--space-8)",
            borderTop: "1px solid var(--color-rule-on-dark)",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            fontSize: "var(--text-xs)",
            fontFamily: "var(--font-mono)",
            color: "var(--color-ink-on-dark-soft)",
            letterSpacing: "0.04em",
          }}
        >
          <span>© {new Date().getFullYear()} TWS Southeast Florida · A Temporary Wall Systems franchise</span>
          <span>Privacy · Terms</span>
        </div>
      </div>

      <style>{`
        .ft-link {
          display: block;
          color: var(--color-ink-on-dark);
          text-decoration: none;
          font-size: var(--text-sm);
          font-weight: 500;
          margin-bottom: var(--space-3);
          line-height: 1.4;
          transition: color var(--dur-fast) var(--ease-out);
        }
        .ft-link:hover { color: var(--color-accent); }
        .ft-area-link {
          color: var(--color-ink-on-dark-soft);
          text-decoration: none;
          transition: color var(--dur-fast) var(--ease-out);
        }
        .ft-area-link:hover { color: var(--color-accent); }
        @media (max-width: 1024px) {
          .ft-areas { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          .ft-top {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          .ft-areas {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: var(--space-6) !important;
          }
        }
        @media (max-width: 480px) {
          .ft-areas { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="ft-link">
      {label}
    </a>
  );
}

