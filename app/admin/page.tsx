"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { DashboardClient } from "@/components/admin/DashboardClient"

export default function AdminDashboardPage() {
  const stats = useQuery(api.leads.pipelineStats, {})
  const leadsResult = useQuery(api.leads.list, { limit: 1000 })
  const leads = leadsResult?.items ?? []
  return <DashboardClient stats={stats ?? null} leads={leads} />
}
