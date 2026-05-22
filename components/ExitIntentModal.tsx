"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Exit-intent lead-magnet modal — split-screen design.
 * Navy book panel left, structured content stack right.
 *
 * Trigger: cursor leaves top of viewport.
 * Flow: pitch (Yes/No) → form → success.
 * Dismiss: ESC · click backdrop · X · "No thanks".
 */

type Step = "pitch" | "form" | "success";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("pitch");
  const [submitting, setSubmitting] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // ── Exit-intent detection (DEV: fires every time after 2s) ─────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pageLoadAt = Date.now();
    const MIN_TIME_ON_PAGE = 2000;
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return;
      if (Date.now() - pageLoadAt < MIN_TIME_ON_PAGE) return;
      setOpen(true);
    }
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () =>
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function handleClose() {
    setOpen(false);
    setTimeout(() => setStep("pitch"), 300);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setStep("success");
    setSubmitting(false);
    const link = document.createElement("a");
    link.href = "/tws-south-florida-brochure.pdf";
    link.download = "TWS-South-Florida-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div
      className="exit-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
    >
      <div className="exit-card" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleClose}
          className="exit-close"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path
              d="M3 3L11 11M11 3L3 11"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="square"
            />
          </svg>
        </button>

        {step === "pitch" && (
          <div className="exit-split">
            {/* LEFT — navy book panel, full height */}
            <div className="exit-book-pane">
              <Image
                src="/tws-book.png?v=3"
                alt="TWS South Florida brochure"
                width={1122}
                height={1402}
                sizes="(max-width: 768px) 60vw, 24rem"
                style={{
                  width: "100%",
                  maxWidth: "22rem",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>

            {/* RIGHT — content stack */}
            <div className="exit-content-pane">
              <p className="exit-brand">TWS · SOUTH FLORIDA</p>

              <p className="exit-eyebrow">BEFORE YOU GO</p>

              <h2 id="exit-title" className="exit-headline">
                The full spec sheet.
              </h2>

              <p className="exit-sub">
                Hand the architect or facilities director the answers up front.
              </p>

              <ul className="exit-stats">
                <li>
                  <span className="exit-stat-num">12</span>
                  <span className="exit-stat-cap">Pages</span>
                </li>
                <li>
                  <span className="exit-stat-num">ICRA</span>
                  <span className="exit-stat-cap">Class I–IV</span>
                </li>
                <li>
                  <span className="exit-stat-num">Free</span>
                  <span className="exit-stat-cap">Instant PDF</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="exit-yes"
              >
                Yes, send the PDF
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

              <button
                type="button"
                onClick={handleClose}
                className="exit-no"
              >
                No thanks
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="exit-split">
            <div className="exit-book-pane">
              <Image
                src="/tws-book.png?v=3"
                alt="TWS South Florida brochure"
                width={1122}
                height={1402}
                sizes="(max-width: 768px) 60vw, 24rem"
                style={{
                  width: "100%",
                  maxWidth: "22rem",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
            <div className="exit-content-pane">
              <p className="exit-brand">TWS · SOUTH FLORIDA</p>
              <p className="exit-eyebrow">STEP 2 OF 2</p>
              <h2 id="exit-title" className="exit-headline-sm">
                Where should we send it?
              </h2>

              <form onSubmit={handleSubmit} className="exit-form">
                <Field label="Name" name="name" required />
                <Field label="Work email" name="email" required type="email" />
                <Field label="Phone" name="phone" required type="tel" />
                <button
                  type="submit"
                  disabled={submitting}
                  className="exit-yes"
                >
                  {submitting ? "Sending…" : "Send me the brochure"}
                  {!submitting && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                      <path d="M9 1L13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setStep("pitch")}
                  className="exit-no"
                >
                  ← Back
                </button>
              </form>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="exit-split">
            <div className="exit-book-pane">
              <Image
                src="/tws-book.png?v=3"
                alt="TWS South Florida brochure"
                width={1122}
                height={1402}
                sizes="(max-width: 768px) 60vw, 24rem"
                style={{
                  width: "100%",
                  maxWidth: "22rem",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
            <div className="exit-content-pane">
              <p className="exit-brand">TWS · SOUTH FLORIDA</p>
              <p className="exit-eyebrow">SENT</p>
              <h2 id="exit-title" className="exit-headline">
                Your download is starting.
              </h2>
              <p className="exit-sub">
                If it doesn&apos;t open,{" "}
                <a
                  href="/tws-south-florida-brochure.pdf"
                  download
                  style={{ color: "var(--color-accent)", fontWeight: 600 }}
                >
                  click here
                </a>
                . We&apos;ll follow up the same day.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="exit-yes"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .exit-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(7, 21, 77, 0.78);
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
          animation: exit-fade 0.25s var(--ease-out);
        }
        .exit-card {
          background: var(--color-paper-0);
          border-radius: var(--radius-sm);
          width: 100%;
          max-width: 56rem;
          max-height: 92vh;
          overflow: hidden;
          position: relative;
          box-shadow:
            0 40px 80px rgba(0, 0, 0, 0.4),
            0 16px 32px rgba(0, 0, 0, 0.22);
          animation: exit-pop 0.32s var(--ease-out);
        }
        .exit-close {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          z-index: 10;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid var(--color-rule);
          border-radius: var(--radius-xs);
          color: var(--color-ink-2);
          cursor: pointer;
          transition: background var(--dur-fast) var(--ease-out),
            color var(--dur-fast) var(--ease-out);
        }
        .exit-close:hover {
          background: var(--color-paper-2);
          color: var(--color-ink-0);
        }

        /* ── Split layout ─────────────────────────────────────── */
        .exit-split {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
          min-height: 30rem;
        }

        /* LEFT — navy book panel, full-bleed */
        .exit-book-pane {
          background: linear-gradient(150deg, #07154d 0%, #0a1c5e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-8);
          position: relative;
          overflow: hidden;
        }
        .exit-book-pane::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 65% 55% at 50% 50%, rgba(120, 150, 220, 0.18) 0%, rgba(7, 21, 77, 0) 70%);
          pointer-events: none;
        }

        /* RIGHT — content stack */
        .exit-content-pane {
          padding: var(--space-10) var(--space-8) var(--space-8);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: var(--space-3);
        }
        .exit-brand {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--color-ink-3);
          margin: 0;
        }
        .exit-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          margin: var(--space-3) 0 0;
        }
        .exit-headline {
          font-family: var(--font-display);
          font-size: clamp(1.875rem, 3vw, 2.5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--color-ink-0);
          margin: var(--space-1) 0 var(--space-2);
        }
        .exit-headline-sm {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 2.4vw, 1.875rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-ink-0);
          margin: var(--space-1) 0 var(--space-4);
        }
        .exit-sub {
          font-size: var(--text-md);
          line-height: 1.5;
          color: var(--color-ink-2);
          margin: 0 0 var(--space-4);
        }
        .exit-stats {
          list-style: none;
          padding: var(--space-3) 0;
          margin: 0 0 var(--space-5);
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--space-3);
          border-top: 1px solid var(--color-rule);
          border-bottom: 1px solid var(--color-rule);
        }
        .exit-stats li {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .exit-stat-num {
          font-family: var(--font-display);
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--color-ink-0);
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .exit-stat-cap {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-ink-3);
          line-height: 1.2;
        }
        .exit-yes {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-5);
          font-size: var(--text-base);
          font-weight: 600;
          background: var(--color-accent);
          color: var(--color-accent-ink);
          border: none;
          border-radius: var(--radius-xs);
          font-family: var(--font-body);
          cursor: pointer;
          white-space: nowrap;
          transition: background var(--dur-fast) var(--ease-out),
            transform var(--dur-fast) var(--ease-out);
        }
        .exit-yes:hover {
          background: var(--color-accent-hover);
        }
        .exit-yes:active {
          transform: translateY(1px);
        }
        .exit-yes:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .exit-no {
          margin-top: var(--space-3);
          padding: 0;
          font-size: var(--text-sm);
          font-weight: 500;
          background: transparent;
          color: var(--color-ink-3);
          border: none;
          font-family: var(--font-body);
          cursor: pointer;
          align-self: center;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--color-rule-strong);
          transition: color var(--dur-fast) var(--ease-out);
        }
        .exit-no:hover {
          color: var(--color-ink-1);
        }

        /* ── Form variant ─────────────────────────────────────── */
        .exit-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        @keyframes exit-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes exit-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 768px) {
          .exit-split {
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .exit-book-pane {
            padding: var(--space-6);
            min-height: 14rem;
          }
          .exit-book-pane :global(img) {
            max-width: 9rem !important;
          }
          .exit-content-pane {
            padding: var(--space-6);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .exit-overlay,
          .exit-card {
            animation: none;
          }
        }
      `}</style>
    </div>
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
  const id = `exit-${name}`;
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
