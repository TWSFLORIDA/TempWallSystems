"use client"

import { Suspense } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { LeadsPageClient } from "@/components/admin/LeadsPageClient"

function LeadsLoader() {
  const leadsResult = useQuery(api.leads.list, { limit: 1000 })

  if (leadsResult === undefined) {
    return (
      <div className="max-w-[1760px] mx-auto">
        <h1 className="text-2xl lg:text-[30px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>Pipeline</h1>
        <p className="text-sm text-[#8a9db0] mt-4">Loading leads…</p>
      </div>
    )
  }

  return <LeadsPageClient leads={leadsResult.items} />
}

export default function LeadsPage() {
  return (
    <Suspense fallback={null}>
      <LeadsLoader />
    </Suspense>
  )
}
