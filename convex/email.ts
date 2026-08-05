import { internalAction } from "./_generated/server";
import { v } from "convex/values";

/**
 * Fires on every new lead. Uses Resend's plain HTTPS API directly (no SDK,
 * no Node runtime needed) so this stays a lightweight default-runtime action.
 */
export const sendLeadNotification = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    service: v.optional(v.string()),
    city: v.optional(v.string()),
    zip: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (_ctx, lead) => {
    const to = process.env.LEAD_NOTIFY_EMAIL ?? "nick.thomson@tempwallsystems.com";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "TWS Lead Alerts <leads@twssouthfl.com>",
        to,
        subject: `New lead: ${lead.name}${lead.service ? ` — ${lead.service}` : ""}`,
        text: [
          `Name: ${lead.name}`,
          `Email: ${lead.email}`,
          lead.phone && `Phone: ${lead.phone}`,
          lead.company && `Company: ${lead.company}`,
          lead.service && `Service: ${lead.service}`,
          lead.city && `City: ${lead.city}`,
          lead.zip && `Zip: ${lead.zip}`,
          lead.source && `Source: ${lead.source}`,
          lead.message && `\nMessage:\n${lead.message}`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend send failed: ${res.status} ${await res.text()}`);
    }
  },
});
