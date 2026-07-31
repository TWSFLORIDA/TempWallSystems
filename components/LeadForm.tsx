"use client";

import { useState } from "react";
import { useSubmitLead } from "@/app/useLeads";

type Variant = "hero" | "section";

const PROJECT_TYPES = [
  { value: "healthcare", label: "Healthcare / ICRA" },
  { value: "airport", label: "Airport / Transit" },
  { value: "lab", label: "Lab / Cleanroom" },
  { value: "office", label: "Office / Commercial" },
  { value: "retail", label: "Retail / Hospitality" },
  { value: "school", label: "School / University" },
  { value: "government", label: "Government" },
  { value: "other", label: "Other" },
];

export function LeadForm({ variant = "hero" }: { variant?: Variant }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const submitLead = useSubmitLead();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const fd = new FormData(e.currentTarget);
    try {
      await submitLead({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        company: String(fd.get("company") ?? ""),
        projectType: String(fd.get("project-type") ?? ""),
        zip: String(fd.get("zip") ?? ""),
        message: String(fd.get("message") ?? ""),
        source: variant === "hero" ? "hero_form" : "section_form",
      });
      setState("success");
    } catch (err) {
      console.error("Lead submit failed", err);
      setState("error");
    }
  }

  const isHero = variant === "hero";

  if (state === "success") {
    return (
      <div
        style={{
          background: isHero
            ? "var(--color-glass)"
            : "var(--color-paper-1)",
          backdropFilter: isHero ? "blur(18px) saturate(140%)" : undefined,
          WebkitBackdropFilter: isHero
            ? "blur(18px) saturate(140%)"
            : undefined,
          border: isHero
            ? "1px solid var(--color-glass-border)"
            : "1px solid var(--color-rule)",
          borderRadius: "var(--radius-sm)",
          boxShadow: isHero ? "var(--shadow-glass)" : undefined,
          padding: "var(--space-8)",
          textAlign: "left",
        }}
      >
        <p
          className="label-mono-accent"
          style={{ marginBottom: "var(--space-3)" }}
        >
          Request received
        </p>
        <h3
          style={{
            fontSize: "var(--text-xl)",
            marginBottom: "var(--space-3)",
            color: "var(--color-ink-0)",
          }}
        >
          Nick will get back to you personally.
        </h3>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-3)" }}>
          For active jobs, ring{" "}
          <a
            href="tel:+15617774958"
            style={{ color: "var(--color-accent)", fontWeight: 600 }}
          >
            (561) 777-4958
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: isHero ? "var(--color-glass)" : "var(--color-paper-0)",
        backdropFilter: isHero ? "blur(18px) saturate(140%)" : undefined,
        WebkitBackdropFilter: isHero ? "blur(18px) saturate(140%)" : undefined,
        border: isHero
          ? "1px solid var(--color-glass-border)"
          : "1px solid var(--color-rule-strong)",
        borderRadius: "var(--radius-sm)",
        boxShadow: isHero ? "var(--shadow-glass)" : undefined,
        padding: isHero ? "var(--space-5)" : "var(--space-10) var(--space-8)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
      }}
    >
      <div className="lf-header" style={{ marginBottom: "var(--space-1)" }}>
        <p
          className="label-mono-accent lf-eyebrow"
          style={{ marginBottom: "var(--space-1)" }}
        >
          {isHero ? "Request a quote" : "Talk to our team"}
        </p>
        <h2
          className="lf-title"
          style={{
            fontSize: isHero ? "var(--text-lg)" : "var(--text-2xl)",
            color: "var(--color-ink-0)",
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          Get a clear proposal.
        </h2>
      </div>

      <div className="lf-row">
        <Field label="Name" name="name" required type="text" />
        <Field label="Company" name="company" type="text" />
      </div>

      <div className="lf-row">
        <Field label="Email" name="email" required type="email" />
        <Field label="Phone" name="phone" required type="tel" />
      </div>

      <div className="lf-row lf-row-21">
        <div>
          <FieldLabel htmlFor={`lf-project-type-${variant}`}>
            Project type
          </FieldLabel>
          <select
            id={`lf-project-type-${variant}`}
            name="project-type"
            className="select"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select industry
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <Field
          label="Project ZIP"
          name="zip"
          required
          type="text"
          inputMode="numeric"
          maxLength={5}
        />
      </div>

      {/* Textarea only on the bottom CTA form — keeps the hero form short
          and lets the hero breathe. Hero leads still get all the routing
          info (industry + ZIP + contact); detailed notes happen in the
          bottom form for users who scroll. */}
      {!isHero && (
        <div>
          <FieldLabel htmlFor={`lf-message-${variant}`}>
            Project details
          </FieldLabel>
          <textarea
            id={`lf-message-${variant}`}
            name="message"
            className="textarea lf-textarea-compact"
            placeholder="Tell us about the space, timeline, and any compliance requirements."
          />
        </div>
      )}

      {state === "error" && (
        <p
          role="alert"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-accent)",
            margin: 0,
          }}
        >
          Something went wrong. Please try again, or call{" "}
          <a href="tel:+15617774958" style={{ fontWeight: 600 }}>
            (561) 777-4958
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        className="lf-primary-btn"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? (
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

      <style jsx>{`
        .lf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
        }
        .lf-row-21 {
          grid-template-columns: 2fr 1fr;
        }
        :global(.lf-textarea-compact) {
          min-height: 4.5rem;
        }
        :global(.input),
        :global(.select) {
          padding-block: 0.625rem;
        }
        @media (max-width: 540px) {
          .lf-row,
          .lf-row-21 {
            grid-template-columns: 1fr !important;
          }
        }
        :global(.lf-primary-btn) {
          margin-top: var(--space-1);
          width: 100%;
          padding: var(--space-3) var(--space-4);
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
          transition: background-color var(--dur-fast) var(--ease-out),
            transform var(--dur-fast) var(--ease-out);
        }
        /* Tighter form on short viewports so hero + ticker fit above the fold on 13" laptops */
        @media (max-height: 900px) {
          :global(.input),
          :global(.select) {
            padding-block: 0.5rem !important;
          }
          :global(.lf-eyebrow) {
            display: none !important;
          }
          :global(.lf-title) {
            font-size: var(--text-base) !important;
          }
          .lf-row, .lf-row-21 {
            gap: var(--space-2) !important;
          }
          form {
            gap: var(--space-2) !important;
          }
        }
        @media (max-height: 800px) {
          :global(.input),
          :global(.select) {
            padding-block: 0.375rem !important;
            font-size: var(--text-sm) !important;
          }
          :global(.lf-textarea-compact) {
            min-height: 2.5rem !important;
            font-size: var(--text-sm) !important;
          }
          :global(.lf-header) {
            display: none !important;
          }
        }
        :global(.lf-primary-btn:hover) {
          background: var(--color-accent-hover);
        }
        :global(.lf-primary-btn:active) {
          transform: translateY(1px);
        }
        :global(.lf-primary-btn:disabled) {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </form>
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
  const id = `lf-${name}`;
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        maxLength={maxLength}
        className="input"
      />
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="label-mono"
      style={{
        display: "block",
        marginBottom: "var(--space-2)",
        fontSize: "0.6875rem",
      }}
    >
      {children}
    </label>
  );
}
