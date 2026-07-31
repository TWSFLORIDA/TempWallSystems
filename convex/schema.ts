import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * TWS lead CRM + analytics backend.
 *
 * `leads`      — every inbound lead from the site's capture surfaces, moving
 *                through the 7-stage sales pipeline.
 * `leadEvents` — append-only activity log (status changes, notes, follow-ups)
 *                surfaced on the lead detail page.
 */

// Pipeline stages a lead moves through. Order matters for the funnel view.
export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATING",
  "WON",
  "LOST",
  "ARCHIVED",
] as const;

const statusValidator = v.union(
  ...LEAD_STATUSES.map((s) => v.literal(s))
);

export default defineSchema({
  leads: defineTable({
    // Contact
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),

    // Qualification / routing
    service: v.optional(v.string()), // normalized service/project type shown in CRM
    city: v.optional(v.string()),
    zip: v.optional(v.string()),
    message: v.optional(v.string()),
    // Raw form fields (kept for reference; `service` is derived from these)
    projectType: v.optional(v.string()),
    industry: v.optional(v.string()),
    scope: v.optional(v.string()),
    timeline: v.optional(v.string()),

    // Attribution — free-form capture surface, e.g. "hero_form"
    source: v.optional(v.string()),

    // CRM / pipeline state
    status: statusValidator,
    estimatedValue: v.optional(v.number()),
    followUpDate: v.optional(v.number()), // epoch ms
    expectedCloseDate: v.optional(v.number()),
    closedAt: v.optional(v.number()), // stamped when moved to WON/LOST
    ownerNote: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_follow_up", ["followUpDate"]),

  leadEvents: defineTable({
    leadId: v.id("leads"),
    type: v.union(
      v.literal("created"),
      v.literal("status_changed"),
      v.literal("note_added"),
      v.literal("followup_set"),
      v.literal("value_set")
    ),
    detail: v.optional(v.string()),
    fromStatus: v.optional(statusValidator),
    toStatus: v.optional(statusValidator),
    at: v.number(),
  }).index("by_lead", ["leadId", "at"]),
});
