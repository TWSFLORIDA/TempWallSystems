/**
 * Pipeline stage definitions for the TWS CRM.
 * Single source of truth for stage order, labels, win-probabilities, and colors.
 * Weighted forecast = Σ (lead.estimatedValue × stage probability).
 */

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL_SENT"
  | "NEGOTIATING"
  | "WON"
  | "LOST"
  | "ARCHIVED"

export interface StageMeta {
  key: LeadStatus
  label: string
  /** win probability 0..1 used for weighted forecasting */
  probability: number
  /** accent color */
  color: string
  /** light tint for backgrounds/chips */
  tint: string
  /** true for terminal stages (won/lost/archived) */
  terminal?: boolean
}

// Palette only: a navy→blue ramp for open stages, green for won, red for lost,
// slate for neutral.
export const STAGE_META: Record<LeadStatus, StageMeta> = {
  NEW:           { key: "NEW",           label: "New",           probability: 0.10, color: "#8a9db0", tint: "#eef2f6" },
  CONTACTED:     { key: "CONTACTED",     label: "Contacted",     probability: 0.25, color: "#4a90c2", tint: "#e9f2f9" },
  QUALIFIED:     { key: "QUALIFIED",     label: "Qualified",     probability: 0.45, color: "#2d72a8", tint: "#e6f0f7" },
  PROPOSAL_SENT: { key: "PROPOSAL_SENT", label: "Proposal Sent", probability: 0.65, color: "#1e5a86", tint: "#e4eef5" },
  NEGOTIATING:   { key: "NEGOTIATING",   label: "Negotiating",   probability: 0.80, color: "#0a2240", tint: "#e7ebf1" },
  WON:           { key: "WON",           label: "Won",           probability: 1.00, color: "#2d8a5b", tint: "#e6f4ec", terminal: true },
  LOST:          { key: "LOST",          label: "Lost",          probability: 0.00, color: "#c0492e", tint: "#f9ebe7", terminal: true },
  ARCHIVED:      { key: "ARCHIVED",      label: "Archived",      probability: 0.00, color: "#8a9db0", tint: "#f1f5f9", terminal: true },
}

/** Ordered stages shown as columns on the pipeline board. */
export const BOARD_STAGES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATING",
  "WON",
  "LOST",
]

/** Open (in-flight) stages — everything except terminal. Used for "open pipeline" totals. */
export const OPEN_STAGES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATING",
]

export const STAGE_PROBABILITY: Record<LeadStatus, number> = Object.fromEntries(
  (Object.keys(STAGE_META) as LeadStatus[]).map((k) => [k, STAGE_META[k].probability])
) as Record<LeadStatus, number>

export function stageMeta(status: string | null | undefined): StageMeta {
  return STAGE_META[(status as LeadStatus)] ?? STAGE_META.NEW
}

/** Format a number as USD with no cents (e.g. $12,500). */
export function formatCurrency(n: number | null | undefined): string {
  const v = Math.round(n || 0)
  return "$" + v.toLocaleString("en-US")
}

/** Compact currency for tight spaces (e.g. $12.5k, $9M, $4.05M). */
export function formatCurrencyCompact(n: number | null | undefined): string {
  const v = n || 0
  const abs = Math.abs(v)
  if (abs >= 1_000_000) {
    const m = v / 1_000_000
    return "$" + (m % 1 === 0 ? m.toFixed(0) : m.toFixed(m < 10 ? 2 : 1)) + "M"
  }
  if (abs >= 1000) {
    const k = v / 1000
    return "$" + (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)) + "k"
  }
  return "$" + Math.round(v).toLocaleString("en-US")
}
