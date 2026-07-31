"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICE_AREAS } from "@/lib/serviceAreas";
import { SERVICE_LIST } from "@/lib/services";

const PHONE_DISPLAY = "(561) 777-4958";
const PHONE_TEL = "+15617774958";

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M12.5 9.5v2.2c0 .6-.5 1.1-1.1 1.1A10.4 10.4 0 0 1 1 2.6c0-.6.5-1.1 1.1-1.1h2.2c.3 0 .5.2.6.5l.7 2.2c.1.3 0 .6-.2.8L4.2 6.2a8 8 0 0 0 3.6 3.6L9 8.5c.2-.2.5-.3.8-.2l2.2.7c.3.1.5.3.5.6z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const areaRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLLIElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);

  // Reset region selection when the menu closes
  useEffect(() => {
    if (!areaOpen) {
      const t = setTimeout(() => setSelectedRegion(null), 200);
      return () => clearTimeout(t);
    }
  }, [areaOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC + outside-click closes Service Area mega menu
  useEffect(() => {
    if (!areaOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setAreaOpen(false);
    }
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const inTrigger = areaRef.current?.contains(target) ?? false;
      const inPanel = panelRef.current?.contains(target) ?? false;
      if (!inTrigger && !inPanel) {
        setAreaOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [areaOpen]);

  // ESC + outside-click closes Services dropdown
  useEffect(() => {
    if (!servicesOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesOpen(false);
    }
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const inTrigger = servicesRef.current?.contains(target) ?? false;
      const inPanel = servicesPanelRef.current?.contains(target) ?? false;
      if (!inTrigger && !inPanel) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [servicesOpen]);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Utility bar — uses same 3-col grid as main nav so the phone
          sits directly above the CTA button with matching width. */}
      <div
        style={{
          background: "var(--color-ink-1)",
          color: "var(--color-ink-on-dark-soft)",
          fontSize: "var(--text-xs)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.08em",
          borderBottom: "1px solid var(--color-rule-on-dark)",
        }}
      >
        <div
          className="container-wide"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            paddingBlock: "var(--space-2)",
            gap: "var(--space-4)",
          }}
        >
          <span
            aria-label="Service area"
            style={{ justifySelf: "start", textTransform: "uppercase" }}
          >
            Southeast Florida · Treasure Coast → Miami
          </span>
          <span />
          <a
            href={`tel:${PHONE_TEL}`}
            className="util-phone"
            aria-label="Call or text us"
          >
            <span className="util-phone-label">Call or Text</span>
            <strong className="util-phone-number">{PHONE_DISPLAY}</strong>
          </a>
        </div>
      </div>

      {/* Main nav — 3-column grid: logo · centered links · CTA */}
      <header
        style={{
          background: "var(--color-paper-dark)",
          boxShadow: scrolled
            ? "0 1px 0 0 var(--color-rule-on-dark)"
            : "0 1px 0 0 transparent",
          transition: "box-shadow var(--dur-base) var(--ease-out)",
        }}
      >
        <nav
          className="container-wide"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            paddingBlock: "var(--space-4)",
            gap: "var(--space-6)",
          }}
        >
          <a
            href="#top"
            aria-label="TWS Southeast Florida — home"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              lineHeight: 1,
              justifySelf: "start",
            }}
          >
            <Image
              src="/tws-logo-white.webp"
              alt="TWS — Temporary Wall Systems"
              width={300}
              height={143}
              priority
              style={{ height: "56px", width: "auto", display: "block" }}
            />
          </a>

          <ul className="nav-links" ref={areaRef}>
            <li>
              <a href="#industries">Industries</a>
            </li>
            <li>
              <a href="#gallery">Projects</a>
            </li>
            <li ref={servicesRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className="nav-area-btn"
              >
                Services
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden
                  style={{
                    transform: servicesOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform var(--dur-fast) var(--ease-out)",
                  }}
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setAreaOpen((v) => !v)}
                aria-expanded={areaOpen}
                className="nav-area-btn"
              >
                Service Area
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  aria-hidden
                  style={{
                    transform: areaOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform var(--dur-fast) var(--ease-out)",
                  }}
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-quote-flow"))
            }
            className="btn btn-primary nav-cta"
            style={{
              fontFamily: "var(--font-body)",
              justifySelf: "end",
            }}
          >
            Request a Proposal
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 1L13 5L9 9M13 5H1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </nav>

        {/* Services mega menu — same chrome as the Service Area mega menu,
            just a flat 3-card grid since there's no two-step flow needed. */}
        {servicesOpen && (
          <div className="area-mega" ref={servicesPanelRef}>
            <div className="container-wide area-mega-inner">
              <div className="area-mega-header">
                <p className="area-mega-eyebrow">SERVICES</p>
                <h3 className="area-mega-title">
                  What we build, wherever you need it.
                </h3>
              </div>
              <ul className="area-region-grid services-mega-grid">
                {SERVICE_LIST.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="area-region-card"
                    >
                      <span className="area-region-name">{service.name}</span>
                      <span className="area-service-tagline">{service.tagline}</span>
                      <span className="area-region-arrow" aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Bottom CTA — phone + Request a Proposal */}
              <div className="area-mega-footer">
                <div className="area-mega-footer-copy">
                  <p className="area-mega-footer-label">
                    Not sure which one you need?
                  </p>
                  <p className="area-mega-footer-text">
                    It&apos;s the same sealed containment system either way —
                    reach out and we&apos;ll confirm scope.
                  </p>
                </div>
                <div className="area-mega-footer-actions">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={() => setServicesOpen(false)}
                    className="area-mega-phone"
                  >
                    <PhoneIcon />
                    {PHONE_DISPLAY}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setServicesOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("open-quote-flow")
                      );
                    }}
                    className="area-mega-cta"
                  >
                    Request a Proposal
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M9 1L13 5L9 9M13 5H1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Area mega menu — two-step picker (county → city) */}
        {areaOpen && (
          <div className="area-mega" ref={panelRef}>
            <div className="container-wide area-mega-inner">
              {selectedRegion === null ? (
                /* STEP 1 — pick a county */
                <>
                  <div className="area-mega-header">
                    <p className="area-mega-eyebrow">SERVICE AREA · STEP 1 OF 2</p>
                    <h3 className="area-mega-title">
                      Pick a county to see the cities we serve.
                    </h3>
                  </div>
                  <ul className="area-region-grid">
                    {SERVICE_AREAS.map((region) => (
                      <li key={region.name}>
                        <button
                          type="button"
                          onClick={() => setSelectedRegion(region.name)}
                          className="area-region-card"
                        >
                          <span className="area-region-name">{region.name}</span>
                          <span className="area-region-count">
                            {region.cities.length} cities
                          </span>
                          <span className="area-region-arrow" aria-hidden>
                            →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                /* STEP 2 — pick a city in the selected county */
                <>
                  <div className="area-mega-header area-mega-header-step2">
                    <button
                      type="button"
                      onClick={() => setSelectedRegion(null)}
                      className="area-mega-back"
                    >
                      ← All counties
                    </button>
                    <div>
                      <p className="area-mega-eyebrow">
                        {selectedRegion.toUpperCase()} · STEP 2 OF 2
                      </p>
                      <h3 className="area-mega-title">
                        Pick a city to start your project.
                      </h3>
                    </div>
                  </div>
                  <ul className="area-city-grid">
                    {SERVICE_AREAS.find((r) => r.name === selectedRegion)?.cities.map(
                      (city) => (
                        <li key={city.slug}>
                          <Link
                            href={`/locations/${city.slug}`}
                            onClick={() => setAreaOpen(false)}
                            className="area-city-card"
                          >
                            <span>{city.name}</span>
                            <span className="area-city-arrow" aria-hidden>
                              →
                            </span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </>
              )}

              {/* Bottom CTA — phone + Request a Proposal */}
              <div className="area-mega-footer">
                <div className="area-mega-footer-copy">
                  <p className="area-mega-footer-label">
                    Don&apos;t see your city?
                  </p>
                  <p className="area-mega-footer-text">
                    We serve the entire Treasure Coast → Miami corridor.
                    Reach out and we&apos;ll confirm coverage.
                  </p>
                </div>
                <div className="area-mega-footer-actions">
                  <a
                    href={`tel:${PHONE_TEL}`}
                    onClick={() => setAreaOpen(false)}
                    className="area-mega-phone"
                  >
                    <PhoneIcon />
                    {PHONE_DISPLAY}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setAreaOpen(false);
                      window.dispatchEvent(
                        new CustomEvent("open-quote-flow")
                      );
                    }}
                    className="area-mega-cta"
                  >
                    Request a Proposal
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M9 1L13 5L9 9M13 5H1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .nav-links {
            display: flex;
            justify-self: center;
            gap: var(--space-12);
            list-style: none;
            margin: 0;
            padding: 0;
            font-size: var(--text-base);
          }
          .nav-links :global(a) {
            color: var(--color-ink-on-dark);
            text-decoration: none;
            font-weight: 600;
            letter-spacing: -0.005em;
            transition: color var(--dur-fast) var(--ease-out);
          }
          .nav-links :global(a:hover) {
            color: var(--color-accent);
          }
          .nav-area-btn {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            color: var(--color-ink-on-dark);
            text-decoration: none;
            font-weight: 600;
            font-size: inherit;
            font-family: inherit;
            letter-spacing: -0.005em;
            transition: color var(--dur-fast) var(--ease-out);
          }
          .nav-area-btn:hover {
            color: var(--color-accent);
          }

          /* ── Mega menu panel (white) ─────────────────────────── */
          .area-mega {
            background: var(--color-paper-0);
            border-top: 1px solid var(--color-rule);
            border-bottom: 1px solid var(--color-rule);
            box-shadow: 0 24px 48px rgba(7, 21, 77, 0.18);
            animation: area-slide 0.22s var(--ease-out);
          }
          .area-mega-inner {
            padding-block: var(--space-8);
          }
          .area-mega-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: var(--space-4);
            margin-bottom: var(--space-6);
            padding-bottom: var(--space-4);
            border-bottom: 1px solid var(--color-rule);
          }
          .area-mega-header-step2 {
            justify-content: flex-start;
            gap: var(--space-6);
            align-items: center;
          }
          .area-mega-eyebrow {
            margin: 0 0 var(--space-1);
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.14em;
            color: var(--color-accent);
          }
          .area-mega-title {
            margin: 0;
            font-family: var(--font-display);
            font-size: var(--text-lg);
            font-weight: 600;
            color: var(--color-ink-0);
            letter-spacing: -0.015em;
          }
          .area-mega-back {
            background: transparent;
            border: 1px solid var(--color-rule-strong);
            border-radius: var(--radius-xs);
            padding: var(--space-2) var(--space-4);
            font-family: var(--font-mono);
            font-size: var(--text-xs);
            font-weight: 600;
            letter-spacing: 0.06em;
            color: var(--color-ink-1);
            cursor: pointer;
            transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out);
          }
          .area-mega-back:hover {
            background: var(--color-paper-2);
            border-color: var(--color-ink-1);
          }

          /* STEP 1 — region cards */
          .area-region-grid {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: var(--space-4);
          }
          /* Services mega menu reuses .area-region-grid/.area-region-card for
             identical chrome, just 3 columns instead of 5 (3 services). */
          .services-mega-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          @media (max-width: 900px) {
            .services-mega-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }
          @media (max-width: 640px) {
            .services-mega-grid {
              grid-template-columns: 1fr !important;
            }
          }
          :global(.area-service-tagline) {
            display: block;
            margin-top: var(--space-2);
            font-family: var(--font-body);
            font-size: var(--text-sm);
            line-height: 1.4;
            color: var(--color-ink-3);
          }
          :global(.area-region-card) {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            gap: var(--space-6);
            width: 100%;
            height: 100%;
            min-height: 11rem;
            box-sizing: border-box;
            padding: var(--space-5);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule-strong);
            border-radius: var(--radius-sm);
            cursor: pointer;
            text-align: left;
            font-family: var(--font-body);
            transition: transform var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
          }
          :global(.area-region-card:hover) {
            transform: translateY(-2px);
            border-color: var(--color-accent);
            box-shadow: 0 12px 24px rgba(7, 21, 77, 0.08);
          }
          :global(.area-region-name) {
            display: block;
            font-family: var(--font-display);
            font-size: var(--text-lg);
            font-weight: 600;
            color: var(--color-ink-0);
            letter-spacing: -0.015em;
            line-height: 1.15;
          }
          :global(.area-region-count) {
            display: block;
            margin-top: var(--space-1);
            font-family: var(--font-mono);
            font-size: 0.625rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--color-ink-3);
          }
          :global(.area-region-arrow) {
            font-family: var(--font-mono);
            font-size: var(--text-lg);
            font-weight: 600;
            color: var(--color-accent);
            align-self: flex-end;
          }

          /* STEP 2 — city cards */
          .area-city-grid {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: var(--space-3);
          }
          :global(.area-city-card) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-3);
            padding: var(--space-4) var(--space-5);
            background: var(--color-paper-0);
            border: 1px solid var(--color-rule-strong);
            border-radius: var(--radius-xs);
            text-decoration: none;
            font-family: var(--font-body);
            font-size: var(--text-base);
            font-weight: 500;
            color: var(--color-ink-1);
            transition: transform var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out),
              background var(--dur-fast) var(--ease-out);
          }
          :global(.area-city-card:hover) {
            transform: translateY(-2px);
            border-color: var(--color-accent);
            color: var(--color-ink-0);
            background: var(--color-paper-1);
          }
          :global(.area-city-arrow) {
            font-family: var(--font-mono);
            color: var(--color-accent);
            opacity: 0;
            transition: opacity var(--dur-fast) var(--ease-out);
          }
          :global(.area-city-card:hover .area-city-arrow) {
            opacity: 1;
          }

          /* ── Mega menu footer CTA ──────────────────────────── */
          .area-mega-footer {
            margin-top: var(--space-8);
            padding-top: var(--space-6);
            border-top: 1px solid var(--color-rule);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: var(--space-6);
          }
          .area-mega-footer-copy {
            min-width: 0;
            max-width: 38ch;
          }
          .area-mega-footer-label {
            margin: 0 0 4px;
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--color-accent);
          }
          .area-mega-footer-text {
            margin: 0;
            font-size: var(--text-sm);
            line-height: 1.5;
            color: var(--color-ink-2);
          }
          .area-mega-footer-actions {
            display: flex;
            align-items: center;
            gap: var(--space-3);
            flex-wrap: wrap;
          }
          .area-mega-phone {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-3) var(--space-5);
            border: 1px solid var(--color-rule-strong);
            border-radius: var(--radius-xs);
            font-family: var(--font-mono);
            font-size: var(--text-sm);
            font-weight: 600;
            letter-spacing: 0.02em;
            color: var(--color-ink-0);
            text-decoration: none;
            white-space: nowrap;
            transition: background var(--dur-fast) var(--ease-out),
              border-color var(--dur-fast) var(--ease-out);
          }
          .area-mega-phone:hover {
            background: var(--color-paper-2);
            border-color: var(--color-ink-1);
          }
          .area-mega-phone :global(svg) {
            color: var(--color-accent);
          }
          .area-mega-cta {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-3) var(--space-5);
            background: var(--color-accent);
            color: var(--color-accent-ink);
            border: none;
            border-radius: var(--radius-xs);
            font-family: var(--font-body);
            font-size: var(--text-sm);
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: background var(--dur-fast) var(--ease-out),
              transform var(--dur-fast) var(--ease-out);
          }
          .area-mega-cta:hover {
            background: var(--color-accent-hover);
          }
          .area-mega-cta:active {
            transform: translateY(1px);
          }

          @keyframes area-slide {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 1100px) {
            .area-region-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
            .area-city-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 768px) {
            .area-region-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .area-city-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 480px) {
            .area-region-grid,
            .area-city-grid { grid-template-columns: 1fr !important; }
          }
          /* Phone link sits in the same grid column as the CTA below,
             with horizontal padding matching the CTA so widths align. */
          :global(.util-phone) {
            justify-self: end;
            display: inline-flex;
            align-items: baseline;
            gap: var(--space-3);
            padding: 0 var(--space-5);
            color: var(--color-ink-on-dark);
            text-decoration: none;
            font-family: var(--font-mono);
            text-transform: none;
            transition: color var(--dur-fast) var(--ease-out);
            min-width: 200px;
            justify-content: flex-end;
          }
          :global(.util-phone-label) {
            font-size: 0.6875rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--color-ink-on-dark-soft);
          }
          :global(.util-phone-number) {
            font-size: var(--text-sm);
            font-weight: 700;
            letter-spacing: 0.02em;
          }
          :global(.util-phone:hover) {
            color: var(--color-accent);
          }
          :global(.util-phone:hover .util-phone-label) {
            color: var(--color-accent);
          }
          @media (max-width: 900px) {
            .nav-links {
              display: none !important;
            }
          }
        `}</style>
      </header>
    </div>
  );
}
