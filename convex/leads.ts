import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { LEAD_STATUSES } from "./schema";
import { internal } from "./_generated/api";

const statusValidator = v.union(...LEAD_STATUSES.map((s) => v.literal(s)));

// Stage win-probabilities + open (in-flight) stages — mirrors lib/pipeline.ts.
const STAGE_PROB: Record<string, number> = {
  NEW: 0.1,
  CONTACTED: 0.25,
  QUALIFIED: 0.45,
  PROPOSAL_SENT: 0.65,
  NEGOTIATING: 0.8,
  WON: 1.0,
  LOST: 0.0,
  ARCHIVED: 0.0,
};
const OPEN = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATING"];

// Human labels for capture-surface source tags — mirrors lib/pipeline.ts's
// formatSource (duplicated here since Convex's bundler only resolves within
// convex/).
const SOURCE_LABELS: Record<string, string> = {
  hero_form: "Hero form",
  section_form: "Section form",
  quote_flow: "Quote flow",
  exit_intent: "Exit intent",
};
function formatSource(source: string): string {
  return SOURCE_LABELS[source] ?? source.replace(/_/g, " ");
}

/**
 * Public mutation — called from the marketing site's capture forms.
 * Creates the lead in the NEW stage and logs a `created` event.
 */
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    city: v.optional(v.string()),
    zip: v.optional(v.string()),
    message: v.optional(v.string()),
    projectType: v.optional(v.string()),
    industry: v.optional(v.string()),
    scope: v.optional(v.string()),
    timeline: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Derive the CRM "service" label from whichever qualifier the form sent.
    const service = args.service ?? args.projectType ?? args.industry;
    const leadId = await ctx.db.insert("leads", {
      ...args,
      service,
      status: "NEW",
    });
    await ctx.db.insert("leadEvents", {
      leadId,
      type: "created",
      detail: `Lead captured${args.source ? ` via ${formatSource(args.source)}` : ""}`,
      toStatus: "NEW",
      at: Date.now(),
    });
    await ctx.scheduler.runAfter(0, internal.email.sendLeadNotification, {
      name: args.name,
      email: args.email,
      phone: args.phone,
      company: args.company,
      service,
      city: args.city,
      zip: args.zip,
      message: args.message,
      source: args.source,
    });
    return leadId;
  },
});

/**
 * List leads for the CRM. Returns { items, pagination } so the dashboard and
 * pipeline can pull everything in one call (limit defaults high).
 */
export const list = query({
  args: {
    status: v.optional(v.string()),
    service: v.optional(v.string()),
    search: v.optional(v.string()),
    page: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    const page = args.page || 1;
    const offset = (page - 1) * limit;

    let results;
    if (args.status && args.status !== "ALL") {
      const statusValue = args.status;
      results = await ctx.db
        .query("leads")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .withIndex("by_status", (q) => q.eq("status", statusValue as any))
        .collect();
    } else {
      results = await ctx.db.query("leads").collect();
    }

    if (args.service && args.service !== "ALL") {
      results = results.filter((lead) => lead.service === args.service);
    }

    if (args.search) {
      const s = args.search.toLowerCase();
      results = results.filter(
        (lead) =>
          lead.name.toLowerCase().includes(s) ||
          lead.email.toLowerCase().includes(s) ||
          (lead.phone ?? "").toLowerCase().includes(s)
      );
    }

    results.sort((a, b) => b._creationTime - a._creationTime);

    const total = results.length;
    const items = results.slice(offset, offset + limit);
    return {
      items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  },
});

/**
 * Roll-up powering the dashboard KPI cards, funnel, and forecast.
 */
export const pipelineStats = query({
  args: {},
  handler: async (ctx) => {
    const leads = await ctx.db.query("leads").collect();

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const quarterStart = new Date(
      now.getFullYear(),
      Math.floor(now.getMonth() / 3) * 3,
      1
    ).getTime();
    const in7Days = Date.now() + 7 * 24 * 60 * 60 * 1000;

    const byStage: Record<string, { count: number; totalValue: number }> = {};
    for (const key of Object.keys(STAGE_PROB)) {
      byStage[key] = { count: 0, totalValue: 0 };
    }

    let openPipeline = 0;
    let weightedForecast = 0;
    let wonThisMonth = 0;
    let wonThisQuarter = 0;
    let wonCount = 0;
    let lostCount = 0;
    let wonValueTotal = 0;
    let newLeadsCount = 0;
    let upcomingFollowUps = 0;

    for (const lead of leads) {
      const status = lead.status;
      const value = lead.estimatedValue || 0;
      if (byStage[status]) {
        byStage[status].count += 1;
        byStage[status].totalValue += value;
      }
      if (OPEN.includes(status)) {
        openPipeline += value;
        weightedForecast += value * (STAGE_PROB[status] ?? 0);
      }
      if (status === "NEW") newLeadsCount += 1;
      if (status === "WON") {
        wonCount += 1;
        wonValueTotal += value;
        const closed = lead.closedAt ?? lead._creationTime;
        if (closed >= monthStart) wonThisMonth += value;
        if (closed >= quarterStart) wonThisQuarter += value;
      }
      if (status === "LOST") lostCount += 1;
      if (
        lead.followUpDate &&
        lead.followUpDate >= Date.now() &&
        lead.followUpDate <= in7Days &&
        OPEN.includes(status)
      ) {
        upcomingFollowUps += 1;
      }
    }

    const decided = wonCount + lostCount;
    const winRate = decided > 0 ? wonCount / decided : 0;
    const avgDealSize = wonCount > 0 ? wonValueTotal / wonCount : 0;

    return {
      byStage,
      openPipeline,
      weightedForecast,
      wonThisMonth,
      wonThisQuarter,
      wonCount,
      lostCount,
      winRate,
      avgDealSize,
      newLeadsCount,
      upcomingFollowUps,
      totalLeads: leads.length,
    };
  },
});

export const get = query({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    const lead = await ctx.db.get(args.id);
    if (!lead) return null;
    const events = await ctx.db
      .query("leadEvents")
      .withIndex("by_lead", (q) => q.eq("leadId", args.id))
      .order("desc")
      .collect();
    return { lead, events };
  },
});

/**
 * Patch a lead — used by the pipeline drag/drop, the detail editor, etc.
 * Stamps closedAt on WON/LOST and logs a status_changed event.
 */
export const update = mutation({
  args: {
    id: v.id("leads"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    city: v.optional(v.string()),
    message: v.optional(v.string()),
    status: v.optional(statusValidator),
    estimatedValue: v.optional(v.number()),
    expectedCloseDate: v.optional(v.union(v.number(), v.null())),
    followUpDate: v.optional(v.union(v.number(), v.null())),
  },
  handler: async (ctx, args) => {
    const { id, followUpDate, expectedCloseDate, ...rest } = args;
    const current = await ctx.db.get(id);
    if (!current) throw new Error("Lead not found");

    const updates: Record<string, unknown> = { ...rest };
    if (followUpDate !== undefined) {
      updates.followUpDate = followUpDate ?? undefined;
    }
    if (expectedCloseDate !== undefined) {
      updates.expectedCloseDate = expectedCloseDate ?? undefined;
    }
    if (updates.status === "WON" || updates.status === "LOST") {
      updates.closedAt = Date.now();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await ctx.db.patch(id, updates as any);

    if (args.status && args.status !== current.status) {
      await ctx.db.insert("leadEvents", {
        leadId: id,
        type: "status_changed",
        detail: `${current.status} → ${args.status}`,
        fromStatus: current.status,
        toStatus: args.status,
        at: Date.now(),
      });
    }
    return id;
  },
});

export const addNote = mutation({
  args: { id: v.id("leads"), note: v.string() },
  handler: async (ctx, args) => {
    const lead = await ctx.db.get(args.id);
    if (!lead) throw new Error("Lead not found");
    await ctx.db.patch(args.id, { ownerNote: args.note });
    await ctx.db.insert("leadEvents", {
      leadId: args.id,
      type: "note_added",
      detail: args.note,
      at: Date.now(),
    });
  },
});

export const bulkDeleteLeads = mutation({
  args: { ids: v.array(v.id("leads")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      const events = await ctx.db
        .query("leadEvents")
        .withIndex("by_lead", (q) => q.eq("leadId", id))
        .collect();
      for (const e of events) await ctx.db.delete(e._id);
      await ctx.db.delete(id);
    }
    return { success: true, deleted: args.ids.length };
  },
});
