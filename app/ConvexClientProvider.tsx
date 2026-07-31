"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// One client for the whole app. NEXT_PUBLIC_CONVEX_URL is written by
// `npx convex dev` into .env.local. We always mount the provider (even before
// Convex is configured) so components can call useMutation/useQuery without
// crashing; the placeholder URL is never contacted because forms guard on the
// env var before invoking a mutation. See `convexEnabled` in useLeads.ts.
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://placeholder.convex.cloud"
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
