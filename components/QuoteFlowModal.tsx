"use client";

import { useEffect, useState } from "react";
import { useSubmitLead } from "@/app/useLeads";

/**
 * Full-screen multi-step quote flow.
 * Triggered by `window.dispatchEvent(new CustomEvent("open-quote-flow"))`
 * — the Nav's "Get a Quote" button fires this event.
 *
 * Steps: Industry → Scope → Timeline → Contact details → Success.
 * Picking a card on steps 1–3 auto-advances. Step 4 is the conversion form.
 */

type Selections = {
  industry?: string;
  scope?: string;
  timeline?: string;
};

type Card = {
  value: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
};

const INDUSTRIES: Card[] = [
  { value: "healthcare", label: "Healthcare", desc: "ICRA · infection control", icon: <ShieldIcon /> },
  { value: "airport", label: "Airport / Transit", desc: "Terminals · concourses · airside", icon: <PlaneIcon /> },
  { value: "lab", label: "Lab / Cleanroom", desc: "Cleanroom-grade containment", icon: <FlaskIcon /> },
  { value: "office", label: "Office / Commercial", desc: "Tenant build-outs · lobbies", icon: <BuildingIcon /> },
  { value: "retail", label: "Retail / Hospitality", desc: "Storefronts · venues · BOH", icon: <BagIcon /> },
  { value: "school", label: "School / University", desc: "Class-hour quiet zones", icon: <CapIcon /> },
  { value: "government", label: "Government", desc: "Secure-perimeter renos", icon: <FlagIcon /> },
  { value: "other", label: "Other", desc: "Tell us about it", icon: <DotsIcon /> },
];

const SCOPES: Card[] = [
  { value: "small", label: "Single zone", desc: "Under ~50 linear feet · one phase", icon: <SmallIcon /> },
  { value: "medium", label: "Multi-zone", desc: "50–200 LF · one or two phases", icon: <MediumIcon /> },
  { value: "large", label: "Large / multi-phase", desc: "200+ LF · reconfigured between phases", icon: <LargeIcon /> },
];

const TIMELINES: Card[] = [
  { value: "now", label: "Active project", desc: "Need a quote this week", icon: <BoltIcon /> },
  { value: "soon", label: "Next 30 days", desc: "Planning a near-term install", icon: <CalIcon /> },
  { value: "later", label: "30–90 days out", desc: "Scoping a longer-range job", icon: <ClockIcon /> },
  { value: "exploring", label: "Just exploring", desc: "Researching options", icon: <SearchIcon /> },
];

const TOTAL_STEPS = 4;

export function QuoteFlowModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const submitLead = useSubmitLead();

  // Listen for the nav's open event
  useEffect(() => {
    function handleOpen() {
      setOpen(true);
      setStep(0);
      setSelections({});
      setSubmitError(false);
    }
    window.addEventListener("open-quote-flow", handleOpen as EventListener);
    return () =>
      window.removeEventListener("open-quote-flow", handleOpen as EventListener);
  }, []);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function selectAndAdvance<K extends keyof Selections>(key: K, value: string) {
    setSelections((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      await submitLead({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        company: String(fd.get("company") ?? ""),
        zip: String(fd.get("zip") ?? ""),
        message: String(fd.get("notes") ?? ""),
        industry: selections.industry,
        scope: selections.scope,
        timeline: selections.timeline,
        source: "quote_flow",
      });
      setStep(4);
    } catch (err) {
      console.error("Quote lead submit failed", err);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="qf-overlay" role="dialog" aria-modal="true" aria-label="Get a quote">
      <div className="qf-shell">
        {/* Top bar — close + progress */}
        <header className="qf-top">
          <div className="qf-brand">TWS · SOUTHEAST FLORIDA</div>
          {step < 4 && <ProgressDots current={step} total={TOTAL_STEPS} />}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="qf-close"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          </button>
        </header>

        {/* Step content */}
        <div className="qf-content">
          {step === 0 && (
            <Step
              stepNum={1}
              eyebrow="What kind of space?"
              title="Pick the closest match."
              cards={INDUSTRIES}
              selected={selections.industry}
              cols={4}
              onSelect={(v) => selectAndAdvance("industry", v)}
            />
          )}
          {step === 1 && (
            <Step
              stepNum={2}
              eyebrow="How big is the project?"
              title="A rough range works."
              cards={SCOPES}
              selected={selections.scope}
              cols={3}
              onSelect={(v) => selectAndAdvance("scope", v)}
            />
          )}
          {step === 2 && (
            <Step
              stepNum={3}
              eyebrow="What's the timeline?"
              title="When do you need to start?"
              cards={TIMELINES}
              selected={selections.timeline}
              cols={4}
              onSelect={(v) => selectAndAdvance("timeline", v)}
            />
          )}
          {step === 3 && (
            <DetailsForm
              selections={selections}
              submitting={submitting}
              error={submitError}
              onSubmit={handleSubmit}
            />
          )}
          {step === 4 && <Success onClose={() => setOpen(false)} />}
        </div>

        {/* Back button — only on steps 1–3 */}
        {step > 0 && step < 4 && (
          <button
            type="button"
            className="qf-back"
            onClick={() => setStep((s) => s - 1)}
          >
            ← Back
          </button>
        )}
      </div>

      <style jsx>{`
        .qf-overlay {
          position: fixed;
          inset: 0;
          z-index: 110;
          background: rgba(7, 21, 77, 0.92);
          backdrop-filter: blur(10px) saturate(140%);
          -webkit-backdrop-filter: blur(10px) saturate(140%);
          display: flex;
          align-items: stretch;
          justify-content: center;
          animation: qf-fade 0.25s ease-out;
        }
        .qf-shell {
          width: 100%;
          max-width: 100vw;
          height: 100dvh;
          background: var(--color-paper-0);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .qf-top {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: var(--space-5) var(--space-8);
          border-bottom: 1px solid var(--color-rule);
          position: sticky;
          top: 0;
          background: var(--color-paper-0);
          z-index: 2;
        }
        .qf-brand {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--color-ink-3);
          justify-self: start;
        }
        .qf-close {
          justify-self: end;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--color-rule);
          border-radius: var(--radius-xs);
          color: var(--color-ink-2);
          cursor: pointer;
          transition: background var(--dur-fast) var(--ease-out);
        }
        .qf-close:hover {
          background: var(--color-paper-2);
          color: var(--color-ink-0);
        }
        .qf-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-12) var(--space-8);
        }
        .qf-back {
          position: fixed;
          bottom: var(--space-6);
          left: var(--space-6);
          padding: var(--space-3) var(--space-5);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          background: var(--color-paper-0);
          color: var(--color-ink-2);
          border: 1px solid var(--color-rule-strong);
          border-radius: var(--radius-xs);
          cursor: pointer;
          z-index: 3;
          transition: background var(--dur-fast) var(--ease-out);
        }
        .qf-back:hover {
          background: var(--color-paper-2);
          color: var(--color-ink-0);
        }
        @keyframes qf-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

/* ──────────── Step (card-selection) ──────────── */

function Step({
  stepNum,
  eyebrow,
  title,
  cards,
  selected,
  cols,
  onSelect,
}: {
  stepNum: number;
  eyebrow: string;
  title: string;
  cards: Card[];
  selected?: string;
  cols: 2 | 3 | 4;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="qf-step">
      <p className="qf-step-eyebrow">
        STEP {stepNum} OF {TOTAL_STEPS} · {eyebrow.toUpperCase()}
      </p>
      <h2 className="qf-step-title">{title}</h2>
      <ul className={`qf-cards qf-cards--${cols}`}>
        {cards.map((card) => (
          <li key={card.value}>
            <button
              type="button"
              onClick={() => onSelect(card.value)}
              className={`qf-card ${selected === card.value ? "qf-card--selected" : ""}`}
            >
              <span className="qf-card-icon">{card.icon}</span>
              <span className="qf-card-label">{card.label}</span>
              <span className="qf-card-desc">{card.desc}</span>
            </button>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .qf-step {
          width: 100%;
          max-width: 72rem;
          text-align: center;
        }
        .qf-step-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          margin: 0 0 var(--space-3);
        }
        .qf-step-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.6vw, 3rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--color-ink-0);
          margin: 0 0 var(--space-10);
        }
        .qf-cards {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: var(--space-4);
        }
        .qf-cards--2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .qf-cards--3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .qf-cards--4 {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .qf-card {
          width: 100%;
          padding: var(--space-6) var(--space-5);
          background: var(--color-paper-0);
          border: 1px solid var(--color-rule-strong);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: var(--space-3);
          cursor: pointer;
          transition: transform var(--dur-fast) var(--ease-out),
            border-color var(--dur-fast) var(--ease-out),
            box-shadow var(--dur-fast) var(--ease-out);
          font-family: inherit;
          min-height: 9rem;
        }
        .qf-card:hover {
          transform: translateY(-2px);
          border-color: var(--color-accent);
          box-shadow: 0 12px 24px rgba(7, 21, 77, 0.08),
            0 4px 8px rgba(7, 21, 77, 0.04);
        }
        .qf-card--selected {
          border-color: var(--color-accent);
          background: var(--color-accent-soft);
        }
        .qf-card-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          background: var(--color-paper-2);
          border-radius: var(--radius-xs);
        }
        .qf-card-label {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--color-ink-0);
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin-top: auto;
        }
        .qf-card-desc {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--color-ink-3);
          line-height: 1.45;
        }
        @media (max-width: 900px) {
          .qf-cards--3,
          .qf-cards--4 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 540px) {
          .qf-cards--2,
          .qf-cards--3,
          .qf-cards--4 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ──────────── Final step — details form ──────────── */

function DetailsForm({
  selections,
  submitting,
  error,
  onSubmit,
}: {
  selections: Selections;
  submitting: boolean;
  error?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="qf-form-wrap">
      <p className="qf-step-eyebrow">
        STEP {TOTAL_STEPS} OF {TOTAL_STEPS} · LAST STEP
      </p>
      <h2 className="qf-step-title">Where should we send the quote?</h2>

      <div className="qf-recap">
        <RecapChip label="Industry" value={selections.industry} />
        <RecapChip label="Scope" value={selections.scope} />
        <RecapChip label="Timeline" value={selections.timeline} />
      </div>

      <form onSubmit={onSubmit} className="qf-form">
        <div className="qf-row">
          <Field label="Name" name="name" required />
          <Field label="Company" name="company" />
        </div>
        <div className="qf-row">
          <Field label="Work email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" required />
        </div>
        <Field
          label="Project ZIP"
          name="zip"
          type="text"
          inputMode="numeric"
          maxLength={5}
          required
        />
        <div>
          <label htmlFor="qf-notes" className="qf-label">Anything else? (optional)</label>
          <textarea
            id="qf-notes"
            name="notes"
            className="textarea"
            placeholder="Site quirks, compliance requirements, dates we should know about…"
          />
        </div>

        {error && (
          <p
            role="alert"
            style={{ color: "var(--color-accent)", fontSize: "var(--text-sm)", margin: 0 }}
          >
            Something went wrong sending your request. Please try again, or call
            (561) 777-4958.
          </p>
        )}

        <button type="submit" disabled={submitting} className="qf-submit">
          {submitting ? (
            "Sending…"
          ) : (
            <>
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
            </>
          )}
        </button>
      </form>

      <style jsx>{`
        .qf-form-wrap {
          width: 100%;
          max-width: 44rem;
          text-align: center;
        }
        .qf-step-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          margin: 0 0 var(--space-3);
        }
        .qf-step-title {
          font-family: var(--font-display);
          font-size: clamp(1.875rem, 3vw, 2.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-ink-0);
          margin: 0 0 var(--space-6);
        }
        .qf-recap {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
          justify-content: center;
          margin-bottom: var(--space-8);
        }
        .qf-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          text-align: left;
        }
        .qf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
        }
        .qf-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-ink-3);
          margin-bottom: var(--space-2);
        }
        .qf-submit {
          margin-top: var(--space-4);
          padding: var(--space-4) var(--space-6);
          font-size: var(--text-base);
          font-weight: 600;
          background: var(--color-accent);
          color: var(--color-accent-ink);
          border: none;
          border-radius: var(--radius-xs);
          font-family: var(--font-body);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          white-space: nowrap;
          transition: background var(--dur-fast) var(--ease-out);
        }
        .qf-submit:hover:not(:disabled) {
          background: var(--color-accent-hover);
        }
        .qf-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        @media (max-width: 540px) {
          .qf-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function RecapChip({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-3)",
        background: "var(--color-paper-2)",
        border: "1px solid var(--color-rule)",
        borderRadius: "var(--radius-xs)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.6875rem",
        letterSpacing: "0.04em",
      }}
    >
      <span style={{ color: "var(--color-ink-3)", textTransform: "uppercase" }}>
        {label}:
      </span>
      <span style={{ color: "var(--color-ink-0)", fontWeight: 600, textTransform: "capitalize" }}>
        {value}
      </span>
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  inputMode,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputMode?: "numeric" | "tel" | "email" | "text";
  maxLength?: number;
}) {
  const id = `qf-${name}`;
  return (
    <div>
      <label htmlFor={id} className="qf-field-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        className="input"
      />
      <style jsx>{`
        .qf-field-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-ink-3);
          margin-bottom: var(--space-2);
        }
      `}</style>
    </div>
  );
}

function Success({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "36rem" }}>
      <p
        className=""
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "var(--color-accent)",
          marginBottom: "var(--space-3)",
        }}
      >
        REQUEST RECEIVED
      </p>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 3.4vw, 2.75rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          color: "var(--color-ink-0)",
          marginBottom: "var(--space-4)",
        }}
      >
        Nick will get back to you personally.
      </h2>
      <p
        style={{
          fontSize: "var(--text-md)",
          color: "var(--color-ink-2)",
          lineHeight: 1.55,
          marginBottom: "var(--space-8)",
        }}
      >
        For active jobs, ring{" "}
        <a
          href="tel:+15617774958"
          style={{ color: "var(--color-accent)", fontWeight: 600 }}
        >
          (561) 777-4958
        </a>
        .
      </p>
      <button
        type="button"
        onClick={onClose}
        style={{
          padding: "var(--space-4) var(--space-6)",
          fontSize: "var(--text-base)",
          fontWeight: 600,
          background: "var(--color-accent)",
          color: "var(--color-accent-ink)",
          border: "none",
          borderRadius: "var(--radius-xs)",
          fontFamily: "var(--font-body)",
          cursor: "pointer",
        }}
      >
        Done
      </button>
    </div>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: "var(--space-2)", alignItems: "center", justifySelf: "center" }}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: i === current ? "20px" : "8px",
            height: "8px",
            borderRadius: "9999px",
            background:
              i === current
                ? "var(--color-accent)"
                : i < current
                ? "var(--color-ink-2)"
                : "var(--color-rule-strong)",
            transition: "width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
          }}
        />
      ))}
    </div>
  );
}

/* ──────────── Inline icons ──────────── */

function svgProps() {
  return {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "square" as const,
    strokeLinejoin: "round" as const,
  };
}
function ShieldIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 2L20 5V12C20 16.5 16.5 20 12 21C7.5 20 4 16.5 4 12V5L12 2Z" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  );
}
function PlaneIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M21 16l-7-4V5.5a1.5 1.5 0 0 0-3 0V12L4 16v2l7-2v4l-2 1.5V22l3-1 3 1v-.5L13 20v-4l8 2v-2z" />
    </svg>
  );
}
function FlaskIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M9 2v6L4 20a1 1 0 0 0 .9 1.4h14.2A1 1 0 0 0 20 20L15 8V2" />
      <path d="M9 2h6" />
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="4" y="3" width="16" height="18" />
      <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M4 7h16l-1 13H5L4 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function CapIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M3 9l9-5 9 5-9 5-9-5z" />
      <path d="M7 11v5a5 3 0 0 0 10 0v-5" />
    </svg>
  );
}
function FlagIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M3 21h18" />
      <path d="M5 21V10h14v11" />
      <path d="M3 10l9-6 9 6" />
    </svg>
  );
}
function DotsIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
function SmallIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="9" y="9" width="6" height="6" />
    </svg>
  );
}
function MediumIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="9" width="6" height="6" />
      <rect x="15" y="9" width="6" height="6" />
    </svg>
  );
}
function LargeIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="2" y="9" width="5" height="6" />
      <rect x="9" y="9" width="6" height="6" />
      <rect x="17" y="9" width="5" height="6" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="16" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15.5 14" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16L21 21" />
    </svg>
  );
}
