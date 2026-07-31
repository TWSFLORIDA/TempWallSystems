"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Brochure download — clean editorial layout.
 * Light section, book floats on left, copy + minimal form on right.
 */
export function Brochure() {
  const [state, setState] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    // [PLACEHOLDER] Wire to your real form handler.
    await new Promise((r) => setTimeout(r, 700));
    setState("success");
    // Auto-trigger the PDF download from /public/
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = "/tws-south-florida-brochure.pdf";
      link.download = "TWS-South-Florida-Brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <section
      id="brochure"
      style={{
        background: "var(--color-paper-1)",
        paddingBlock: "var(--space-24)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-wide">
        <div
          className="br-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "var(--space-20)",
            alignItems: "center",
          }}
        >
          {/* LEFT — book, transparent PNG floats naturally on light bg */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="br-book">
              <Image
                src="/tws-book.png?v=3"
                alt="TWS Southeast Florida brochure — 3D hardcover mockup"
                width={1122}
                height={1402}
                priority={false}
                sizes="(max-width: 900px) 80vw, 40vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* RIGHT — copy + form */}
          <div>
            <p
              className="label-mono-accent"
              style={{ marginBottom: "var(--space-4)" }}
            >
              FREE PDF · 12 PAGES
            </p>

            <h2
              className="display-head"
              style={{
                fontSize: "clamp(2.25rem, 4.2vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "var(--color-ink-0)",
                marginBottom: "var(--space-5)",
                maxWidth: "16ch",
              }}
            >
              The full spec sheet, on&nbsp;demand.
            </h2>

            <p
              style={{
                fontSize: "var(--text-md)",
                lineHeight: 1.6,
                color: "var(--color-ink-2)",
                marginBottom: "var(--space-8)",
                maxWidth: "48ch",
              }}
            >
              Hand the architect or facilities director a brochure with
              everything they need &mdash; panel specs, ICRA configurations,
              install logistics, project case studies.
            </p>

            {/* Benefit chips — single row, hairline-divided */}
            <ul
              className="br-chips"
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 var(--space-10) 0",
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-3) var(--space-6)",
              }}
            >
              <Chip>Secure containment</Chip>
              <Chip>Fast installation</Chip>
              <Chip>Flexible &amp; reconfigurable</Chip>
            </ul>

            {/* Form */}
            {state === "success" ? (
              <SuccessCard />
            ) : (
              <form onSubmit={handleSubmit} className="br-form">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--space-3)",
                  }}
                  className="br-row"
                >
                  <Field label="Name" name="name" required type="text" />
                  <Field label="Phone" name="phone" required type="tel" />
                </div>
                <Field label="Work email" name="email" required type="email" />
                <button
                  type="submit"
                  className="br-submit"
                  disabled={state === "submitting"}
                >
                  <DownloadIcon />
                  {state === "submitting"
                    ? "Sending…"
                    : "Download the brochure"}
                </button>
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-ink-4)",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.04em",
                  }}
                >
                  No spam · Instant download
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .br-book {
          width: 100%;
          max-width: 30rem;
          filter:
            drop-shadow(0 30px 36px rgba(7, 21, 77, 0.22))
            drop-shadow(0 12px 16px rgba(7, 21, 77, 0.15))
            drop-shadow(0 2px 4px rgba(7, 21, 77, 0.10));
          transform: perspective(1600px) rotateY(-4deg) rotateX(1deg);
          transform-origin: center center;
          transition: transform var(--dur-slow) var(--ease-out);
        }
        .br-book:hover {
          transform: perspective(1600px) rotateY(-2deg) rotateX(0deg);
        }
        .br-form {
          background: var(--color-paper-0);
          border: 1px solid var(--color-rule-strong);
          border-radius: var(--radius-sm);
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          box-shadow: 0 1px 0 rgba(7, 21, 77, 0.04);
        }
        .br-submit {
          margin-top: var(--space-2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          width: 100%;
          padding: var(--space-4);
          font-size: var(--text-base);
          font-weight: 600;
          background: var(--color-accent);
          color: var(--color-accent-ink);
          border: none;
          border-radius: var(--radius-xs);
          font-family: var(--font-body);
          cursor: pointer;
          transition: background-color var(--dur-fast) var(--ease-out),
            transform var(--dur-fast) var(--ease-out);
        }
        .br-submit:hover {
          background: var(--color-accent-hover);
        }
        .br-submit:active {
          transform: translateY(1px);
        }
        .br-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        @media (max-width: 900px) {
          :global(.br-grid) {
            grid-template-columns: 1fr !important;
            gap: var(--space-12) !important;
          }
          .br-book {
            transform: none;
            max-width: 22rem;
          }
          :global(.br-row) {
            grid-template-columns: 1fr !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .br-book {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--color-ink-1)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "6px",
          height: "6px",
          background: "var(--color-accent)",
          borderRadius: "9999px",
          flexShrink: 0,
        }}
      />
      {children}
    </li>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `br-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="label-mono"
        style={{
          display: "block",
          marginBottom: "var(--space-2)",
          fontSize: "0.6875rem",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="input"
      />
    </div>
  );
}

function SuccessCard() {
  return (
    <div
      style={{
        background: "var(--color-paper-0)",
        border: "1px solid var(--color-rule-strong)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-6)",
      }}
    >
      <p
        className="label-mono-accent"
        style={{ marginBottom: "var(--space-3)" }}
      >
        Sent
      </p>
      <h3
        style={{
          fontSize: "var(--text-xl)",
          color: "var(--color-ink-0)",
          marginBottom: "var(--space-3)",
          lineHeight: 1.2,
        }}
      >
        Your download is starting.
      </h3>
      <p style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-3)" }}>
        If the file doesn&apos;t open,{" "}
        <a
          href="/tws-south-florida-brochure.pdf"
          download
          style={{ color: "var(--color-accent)", fontWeight: 600 }}
        >
          click here to grab it
        </a>
        .
      </p>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1V11M8 11L4 7M8 11L12 7M2 13.5H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
