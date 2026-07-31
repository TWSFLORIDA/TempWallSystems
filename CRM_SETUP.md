# TWS Lead CRM + Analytics — setup

A Convex-backed CRM ported to match the Lot Sealers admin: a Pipeline Overview
dashboard + a drag-and-drop Board/Table pipeline, password-gated at `/admin`.

## What's included

- **Convex backend** (`convex/`)
  - `schema.ts` — `leads` (7-stage pipeline: New → Contacted → Qualified →
    Proposal Sent → Negotiating → Won/Lost, plus `estimatedValue`, `service`,
    `city`, `followUpDate`, `closedAt`) + `leadEvents` activity log.
  - `leads.ts` — `create` (called by the forms), `list`, `pipelineStats`
    (KPIs + weighted forecast), `get`, `update` (drag/detail edits),
    `addNote`, `bulkDeleteLeads`.
- **Wired capture forms** — the hero/section `LeadForm`, `QuoteFlowModal`, and
  `ExitIntentModal` all persist real leads (project type → `service`).
- **/admin dashboard** (ported from Lot Sealers, `components/admin/`)
  - `/admin` — Pipeline Overview: KPI cards, 6-month trend chart (recharts),
    pipeline-by-stage funnel, follow-ups due, recent leads, top services.
  - `/admin/leads` — the Pipeline: drag-and-drop Board + Table view, search,
    multi-select bulk delete, stage filter.
  - `/admin/leads/[id]` — lead detail: stage, estimated value, follow-up date,
    notes, activity log, delete.
  - Dark navy sidebar; gated by a single shared password (`middleware.ts`).

## Activate it (one-time)

1. **Set the admin password** in `.env.local` (currently `1234` for testing):
   ```
   ADMIN_PASSWORD=your-strong-secret
   ```

2. **Start Convex** — logs you in (browser), creates the deployment, pushes the
   schema/functions, generates types, writes `NEXT_PUBLIC_CONVEX_URL`:
   ```
   ! npx convex dev
   ```
   Leave it running, then restart `npm run dev` so Next picks up the URL.

3. **Log in** at `/admin/login`. The dashboard + pipeline populate as leads
   arrive. Set each lead's estimated value in the detail view to light up the
   forecast/pipeline-value figures.

> Before `npx convex dev` runs, the forms fall back to a simulated submit and
> the pipeline shows "Loading leads…". Everything lights up once Convex is live.

## Deploy

- Set `ADMIN_PASSWORD` and `NEXT_PUBLIC_CONVEX_URL` in your host (e.g. Vercel).
- Run `npx convex deploy` for the production Convex deployment.

## Dependencies added

`recharts`, `react-is`, `lucide-react`, `clsx`, `tailwind-merge`,
`@dnd-kit/core`, `sonner` — the same stack the Lot Sealers CRM uses.
