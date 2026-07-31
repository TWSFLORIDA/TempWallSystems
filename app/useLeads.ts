"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * True once `npx convex dev` has written NEXT_PUBLIC_CONVEX_URL. Before that,
 * capture forms fall back to a simulated submit so the marketing site keeps
 * working — no lead is silently dropped once Convex is live.
 */
export const convexEnabled = !!process.env.NEXT_PUBLIC_CONVEX_URL;

type LeadSource = "hero_form" | "section_form" | "quote_flow" | "exit_intent";

export type NewLead = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  city?: string;
  projectType?: string;
  industry?: string;
  scope?: string;
  timeline?: string;
  zip?: string;
  message?: string;
  source: LeadSource;
};

/**
 * Returns a submit function that persists a lead to Convex, or (pre-setup)
 * resolves after a short delay so the form's success state still fires.
 */
export function useSubmitLead() {
  const create = useMutation(api.leads.create);
  return async (lead: NewLead) => {
    // Drop empty optional strings so we don't store "".
    const clean = Object.fromEntries(
      Object.entries(lead).filter(([, v]) => v !== "" && v != null)
    ) as NewLead;
    if (!convexEnabled) {
      await new Promise((r) => setTimeout(r, 500));
      return;
    }
    await create(clean);
  };
}
