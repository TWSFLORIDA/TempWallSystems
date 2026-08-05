import { mutation } from "./_generated/server";

// Mirrors lib/pipeline.ts's formatSource — duplicated since Convex's
// bundler only resolves within convex/.
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
 * One-off demo data for previewing the CRM. Not called from the app —
 * run manually with `npx convex run seed:seedDemoLeads`, then delete this
 * file once real leads are flowing in.
 */
export const seedDemoLeads = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const leads: Array<{
      name: string;
      email: string;
      phone: string;
      company?: string;
      service: string;
      city: string;
      zip: string;
      message?: string;
      status: "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL_SENT" | "NEGOTIATING" | "WON" | "LOST";
      estimatedValue?: number;
      followUpDate?: number;
      closedAt?: number;
      source: string;
    }> = [
      // NEW
      { name: "Marcus Feld", email: "marcus.feld@example.com", phone: "(561) 302-4471", company: "Delray Family Dental", service: "ICRA Containment", city: "Delray Beach", zip: "33445", message: "Renovating two operatories, need dust barriers up within 3 weeks.", status: "NEW", source: "hero_form" },
      { name: "Priya Nair", email: "priya.nair@example.com", phone: "(954) 610-2298", company: "Broward Health", service: "Healthcare / ICRA", city: "Fort Lauderdale", zip: "33301", status: "NEW", source: "quote_flow" },
      { name: "Dave Kowalski", email: "dave.k@example.com", phone: "(772) 440-1187", service: "Airport / Transit", city: "Port St. Lucie", zip: "34952", message: "Terminal B concourse renovation, phased containment.", status: "NEW", source: "section_form" },
      { name: "Angela Reyes", email: "angela.reyes@example.com", phone: "(305) 887-6620", company: "MedCore Labs", service: "Lab / Cleanroom", city: "Miami", zip: "33125", status: "NEW", estimatedValue: 42000, source: "hero_form" },
      { name: "Tom Whitfield", email: "tom.whitfield@example.com", phone: "(561) 229-3305", service: "Office / Commercial", city: "West Palm Beach", zip: "33401", status: "NEW", source: "exit_intent" },
      { name: "Sara Lindqvist", email: "sara.l@example.com", phone: "(954) 371-8842", company: "Coral Ridge Retail Group", service: "Retail / Hospitality", city: "Coral Springs", zip: "33065", status: "NEW", source: "quote_flow" },

      // CONTACTED
      { name: "Ben Okafor", email: "ben.okafor@example.com", phone: "(561) 745-9021", company: "Jupiter Medical Center", service: "Healthcare / ICRA", city: "Jupiter", zip: "33458", status: "CONTACTED", estimatedValue: 68000, followUpDate: now + 2 * day, source: "hero_form" },
      { name: "Christine Pallas", email: "christine.p@example.com", phone: "(305) 552-1147", service: "School / University", city: "Miami", zip: "33130", status: "CONTACTED", estimatedValue: 31500, followUpDate: now + 4 * day, source: "section_form" },

      // QUALIFIED
      { name: "Randall Voss", email: "randall.voss@example.com", phone: "(772) 208-6634", company: "Cleveland Clinic Indian River", service: "Healthcare / ICRA", city: "Vero Beach", zip: "32960", status: "QUALIFIED", estimatedValue: 118000, followUpDate: now + 1 * day, source: "quote_flow" },
      { name: "Melissa Grant", email: "melissa.grant@example.com", phone: "(561) 390-7712", service: "Government", city: "West Palm Beach", zip: "33409", status: "QUALIFIED", estimatedValue: 54000, followUpDate: now - 1 * day, source: "hero_form" },

      // PROPOSAL_SENT
      { name: "Harold Diaz", email: "harold.diaz@example.com", phone: "(954) 803-4416", company: "Fulcrum Construction", service: "Office / Commercial", city: "Fort Lauderdale", zip: "33316", status: "PROPOSAL_SENT", estimatedValue: 89500, followUpDate: now + 3 * day, source: "quote_flow" },
      { name: "Gwen Tanaka", email: "gwen.tanaka@example.com", phone: "(305) 671-2093", company: "Baptist Health South Florida", service: "Healthcare / ICRA", city: "Miami", zip: "33176", status: "PROPOSAL_SENT", estimatedValue: 214000, followUpDate: now + 2 * day, source: "hero_form" },

      // NEGOTIATING
      { name: "Oscar Bellamy", email: "oscar.bellamy@example.com", phone: "(561) 224-8871", company: "Palm Beach International", service: "Airport / Transit", city: "West Palm Beach", zip: "33406", status: "NEGOTIATING", estimatedValue: 342000, followUpDate: now + 1 * day, source: "section_form" },

      // WON
      { name: "Nadia Correia", email: "nadia.correia@example.com", phone: "(772) 981-2255", company: "Treasure Coast Dermatology", service: "Healthcare / ICRA", city: "Port St. Lucie", zip: "34986", status: "WON", estimatedValue: 47500, closedAt: now - 6 * day, source: "hero_form" },
      { name: "Kevin Ashworth", email: "kevin.ashworth@example.com", phone: "(954) 552-6690", company: "NSU Dental Clinic", service: "School / University", city: "Fort Lauderdale", zip: "33314", status: "WON", estimatedValue: 76000, closedAt: now - 18 * day, source: "quote_flow" },
      { name: "Renee Blackwood", email: "renee.blackwood@example.com", phone: "(561) 668-3391", company: "Delray Marketplace", service: "Retail / Hospitality", city: "Delray Beach", zip: "33446", status: "WON", estimatedValue: 29500, closedAt: now - 35 * day, source: "exit_intent" },

      // LOST
      { name: "Victor Huang", email: "victor.huang@example.com", phone: "(305) 442-7710", service: "Lab / Cleanroom", city: "Miami", zip: "33131", status: "LOST", estimatedValue: 61000, closedAt: now - 10 * day, source: "quote_flow" },
      { name: "Paula Simmons", email: "paula.simmons@example.com", phone: "(954) 291-6603", service: "Office / Commercial", city: "Coral Springs", zip: "33071", status: "LOST", estimatedValue: 22000, closedAt: now - 22 * day, source: "hero_form" },
    ];

    for (const l of leads) {
      const { status, estimatedValue, followUpDate, closedAt, ...rest } = l;
      const leadId = await ctx.db.insert("leads", {
        ...rest,
        status,
        estimatedValue,
        followUpDate,
        closedAt,
      });
      await ctx.db.insert("leadEvents", {
        leadId,
        type: "created",
        detail: `Lead captured via ${formatSource(l.source)}`,
        toStatus: "NEW",
        at: now,
      });
      if (status !== "NEW") {
        await ctx.db.insert("leadEvents", {
          leadId,
          type: "status_changed",
          detail: `NEW → ${status}`,
          fromStatus: "NEW",
          toStatus: status,
          at: now,
        });
      }
    }

    return { inserted: leads.length };
  },
});
