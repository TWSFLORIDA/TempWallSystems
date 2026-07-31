"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DollarSign, Trophy, Percent, Users, Calculator,
  ArrowRight, Clock, MapPin, CalendarClock, Activity, Layers,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts"
import {
  BOARD_STAGES, OPEN_STAGES, STAGE_META, stageMeta,
  formatCurrency, formatCurrencyCompact, type LeadStatus,
} from "@/lib/pipeline"

interface Lead {
  _id: string
  name: string
  service?: string | null
  city?: string | null
  status: string
  estimatedValue?: number | null
  followUpDate?: number | null
  closedAt?: number | null
  _creationTime: number
}

interface Stats {
  byStage: Record<string, { count: number; totalValue: number }>
  openPipeline: number
  weightedForecast: number
  wonThisMonth: number
  wonThisQuarter: number
  wonCount: number
  lostCount: number
  winRate: number
  avgDealSize: number
  newLeadsCount: number
  upcomingFollowUps: number
  totalLeads: number
}

const CARD = "bg-white border border-[#e8eef4] rounded-[3px]"
const CARD_SHADOW = "shadow-[0_1px_3px_rgba(10,34,64,0.04)]"

function Kpi({ label, value, sub, icon: Icon, accent }: {
  label: string; value: string; sub?: string; icon: typeof DollarSign; accent: string
}) {
  return (
    <div className={`relative overflow-hidden ${CARD} ${CARD_SHADOW} p-5 h-[150px] flex flex-col transition-shadow hover:shadow-[0_3px_16px_rgba(10,34,64,0.08)]`}>
      <span className="absolute inset-x-0 top-0 h-[3px]" style={{ background: accent }} />
      <div className="flex items-start justify-between">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#8a9db0] leading-[1.35] pr-2">{label}</p>
        <div className="w-8 h-8 rounded-[3px] flex items-center justify-center shrink-0" style={{ background: `${accent}14` }}>
          <Icon className="w-[17px] h-[17px]" style={{ color: accent }} />
        </div>
      </div>
      <p className="mt-auto text-[32px] leading-none font-bold text-[#0a2240]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
        {value}
      </p>
      {sub && <p className="mt-2 text-[12px] text-[#6b7f8e]">{sub}</p>}
    </div>
  )
}

export function DashboardClient({ stats, leads }: { stats: Stats | null; leads: Lead[] }) {
  const s = stats ?? {
    byStage: {}, openPipeline: 0, weightedForecast: 0, wonThisMonth: 0, wonThisQuarter: 0,
    wonCount: 0, lostCount: 0, winRate: 0, avgDealSize: 0, newLeadsCount: 0, upcomingFollowUps: 0, totalLeads: 0,
  }

  const now = Date.now()
  const in14 = now + 14 * 24 * 60 * 60 * 1000
  const followUps = leads
    .filter((l) => l.followUpDate && l.followUpDate >= now && l.followUpDate <= in14 && OPEN_STAGES.includes(l.status as LeadStatus))
    .sort((a, b) => (a.followUpDate! - b.followUpDate!))
    .slice(0, 6)
  const recent = leads.slice(0, 6)

  // Funnel scaling — widest bar = largest stage value
  const maxVal = Math.max(1, ...BOARD_STAGES.map((k) => s.byStage[k]?.totalValue || 0))

  // Trend metrics — last 6 months, all series computed once
  const monthly = (() => {
    const base = new Date()
    const arr: { label: string; leads: number; wonRevenue: number; wonCount: number; pipelineAdded: number }[] = []
    for (let i = 5; i >= 0; i--) {
      const start = new Date(base.getFullYear(), base.getMonth() - i, 1).getTime()
      const end = new Date(base.getFullYear(), base.getMonth() - i + 1, 1).getTime()
      const created = leads.filter((l) => l._creationTime >= start && l._creationTime < end)
      const wonInMonth = leads.filter((l) => l.status === "WON" && l.closedAt && l.closedAt >= start && l.closedAt < end)
      arr.push({
        label: new Date(start).toLocaleString("en-US", { month: "short" }),
        leads: created.length,
        wonRevenue: wonInMonth.reduce((n, l) => n + (l.estimatedValue || 0), 0),
        wonCount: wonInMonth.length,
        pipelineAdded: created.reduce((n, l) => n + (l.estimatedValue || 0), 0),
      })
    }
    return arr
  })()

  // Selectable trend metric for the chart
  const METRICS = [
    { key: "leads", label: "New Leads", type: "count" as const, color: "#2d72a8" },
    { key: "wonRevenue", label: "Revenue Won", type: "currency" as const, color: "#2d8a5b" },
    { key: "wonCount", label: "Deals Won", type: "count" as const, color: "#1e5a86" },
    { key: "pipelineAdded", label: "Pipeline Added", type: "currency" as const, color: "#4a90c2" },
  ]
  const [metricKey, setMetricKey] = useState<string>("leads")
  const metric = METRICS.find((m) => m.key === metricKey) ?? METRICS[0]
  const fmtY = (v: number) => (metric.type === "currency" ? formatCurrencyCompact(v) : String(v))

  // Top services by lead count
  const topServices = (() => {
    const map = new Map<string, number>()
    for (const l of leads) { const k = l.service || "Other"; map.set(k, (map.get(k) || 0) + 1) }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  })()
  const maxSvc = Math.max(1, ...topServices.map(([, n]) => n))

  return (
    <div className="max-w-[1500px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-[30px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
            Pipeline Overview
          </h1>
          <p className="text-sm text-[#6b7f8e] mt-1.5">Your leads, forecast, and follow-ups at a glance.</p>
        </div>
        <Link href="/admin/leads" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[3px] text-[13px] font-semibold text-white transition-colors hover:opacity-90" style={{ background: "#0a2240" }}>
          Open Pipeline <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <Kpi label="Open Pipeline" value={formatCurrencyCompact(s.openPipeline)} sub={`${OPEN_STAGES.reduce((n, k) => n + (s.byStage[k]?.count || 0), 0)} active jobs`} icon={DollarSign} accent="#2d72a8" />
        <Kpi label="Won This Month" value={formatCurrencyCompact(s.wonThisMonth)} sub={formatCurrencyCompact(s.wonThisQuarter) + " this quarter"} icon={Trophy} accent="#2d8a5b" />
        <Kpi label="Win Rate" value={`${Math.round(s.winRate * 100)}%`} sub={`${s.wonCount} won · ${s.lostCount} lost`} icon={Percent} accent="#0a2240" />
        <Kpi label="New Leads" value={String(s.newLeadsCount)} sub="Awaiting first contact" icon={Users} accent="#8a9db0" />
        <Kpi label="Avg Deal" value={formatCurrencyCompact(s.avgDealSize)} sub="Per won job" icon={Calculator} accent="#1e5a86" />
      </div>

      {/* Trend chart — metric selectable */}
      <div className={`${CARD} ${CARD_SHADOW} p-6 mb-6`}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" style={{ color: metric.color }} />
            <h2 className="text-[15px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>{metric.label}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-[#8a9db0] hidden sm:inline">Last 6 months</span>
            <div className="relative">
              <select
                value={metricKey}
                onChange={(e) => setMetricKey(e.target.value)}
                className="appearance-none h-8 pl-3 pr-8 rounded-[3px] text-[12.5px] font-semibold text-[#0a2240] bg-[#f4f8fb] border border-[#e8eef4] outline-none cursor-pointer hover:border-[#2d72a8] transition-colors"
              >
                {METRICS.map((m) => (
                  <option key={m.key} value={m.key}>{m.label}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3" viewBox="0 0 12 12" fill="none" style={{ color: "#8a9db0" }}>
                <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="h-[240px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly} margin={{ top: 6, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={metric.color} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={metric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#8a9db0" }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fontSize: 11, fill: "#8a9db0" }} axisLine={false} tickLine={false} allowDecimals={false} width={48} tickFormatter={fmtY} />
              <Tooltip
                cursor={{ stroke: "#dce8f0" }}
                contentStyle={{ borderRadius: 3, border: "1px solid #e8eef4", fontSize: 12, boxShadow: "0 4px 16px rgba(10,34,64,0.08)" }}
                labelStyle={{ color: "#0a2240", fontWeight: 700, marginBottom: 2 }}
                itemStyle={{ color: metric.color }}
                formatter={((v: number | string) => (metric.type === "currency" ? formatCurrency(Number(v)) : v)) as never}
              />
              <Area type="monotone" dataKey={metric.key} name={metric.label} stroke={metric.color} strokeWidth={2.5} fill="url(#trendGrad)" isAnimationActive={false} dot={{ r: 3, fill: metric.color, strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Funnel */}
        <div className={`${CARD} ${CARD_SHADOW} p-6 lg:col-span-3`}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>Pipeline by Stage</h2>
            <span className="text-[12px] text-[#8a9db0]">{s.totalLeads} total leads</span>
          </div>
          <div className="space-y-4">
            {BOARD_STAGES.map((key) => {
              const m = STAGE_META[key]
              const cell = s.byStage[key] || { count: 0, totalValue: 0 }
              const pct = Math.max(cell.totalValue > 0 ? 4 : 0, (cell.totalValue / maxVal) * 100)
              return (
                <Link key={key} href={`/admin/leads?stage=${key}`} className="block group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: m.color }} />
                      <span className="text-[13px] font-semibold text-[#0a2240]">{m.label}</span>
                      <span className="text-[11px] font-medium text-[#8a9db0]">{cell.count} {cell.count === 1 ? "lead" : "leads"}</span>
                      {!m.terminal && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-[2px]" style={{ color: m.color, background: m.tint }}>{Math.round(m.probability * 100)}%</span>
                      )}
                    </div>
                    <span className="text-[13px] font-bold text-[#0a2240]">{formatCurrency(cell.totalValue)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#eef2f6] overflow-hidden">
                    <div className="h-full rounded-full transition-all group-hover:opacity-90" style={{ width: `${pct}%`, background: m.color }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Follow-ups + recent */}
        <div className="lg:col-span-2 space-y-6">
          {/* Follow-ups */}
          <div className={`${CARD} ${CARD_SHADOW} p-6`}>
            <div className="flex items-center gap-2 mb-3">
              <CalendarClock className="w-4 h-4 text-[#2d72a8]" />
              <h2 className="text-[15px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>Follow-ups Due</h2>
            </div>
            {followUps.length === 0 ? (
              <p className="text-[13px] text-[#8a9db0] py-2">No follow-ups in the next 2 weeks.</p>
            ) : (
              <ul className="divide-y divide-[#eef4f9]">
                {followUps.map((l) => (
                  <li key={l._id}>
                    <Link href={`/admin/leads/${l._id}`} className="flex items-center justify-between gap-2 py-2.5 group">
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#0a2240] truncate group-hover:text-[#2d72a8]">{l.name}</p>
                        <p className="text-[11.5px] text-[#8a9db0] truncate">{l.service || "General"}{l.city ? ` · ${l.city}` : ""}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[11.5px] font-medium text-[#6b7f8e] shrink-0">
                        <Clock className="w-3 h-3" />
                        {new Date(l.followUpDate!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent leads */}
          <div className={`${CARD} ${CARD_SHADOW} p-6`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>Recent Leads</h2>
              <Link href="/admin/leads" className="text-[12px] font-semibold text-[#2d72a8] hover:underline">View all</Link>
            </div>
            {recent.length === 0 ? (
              <p className="text-[13px] text-[#8a9db0] py-2">No leads yet.</p>
            ) : (
              <ul className="divide-y divide-[#eef4f9]">
                {recent.map((l) => {
                  const m = stageMeta(l.status)
                  return (
                    <li key={l._id}>
                      <Link href={`/admin/leads/${l._id}`} className="flex items-center justify-between gap-2 py-2.5 group">
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0a2240] truncate group-hover:text-[#2d72a8]">{l.name}</p>
                          <p className="text-[11.5px] text-[#8a9db0] truncate flex items-center gap-1">
                            {l.city && <MapPin className="w-3 h-3" />}{l.service || "General"}{l.city ? ` · ${l.city}` : ""}
                          </p>
                        </div>
                        <span className="text-[10.5px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[2px] shrink-0" style={{ color: m.color, background: m.tint }}>
                          {m.label}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Top services */}
          <div className={`${CARD} ${CARD_SHADOW} p-6`}>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-[#2d72a8]" />
              <h2 className="text-[15px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>Top Services</h2>
            </div>
            {topServices.length === 0 ? (
              <p className="text-[13px] text-[#8a9db0] py-2">No data yet.</p>
            ) : (
              <div className="space-y-3.5">
                {topServices.map(([name, count]) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12.5px] font-semibold text-[#0a2240] truncate pr-2">{name}</span>
                      <span className="text-[11.5px] font-semibold text-[#6b7f8e] shrink-0">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#eef2f6] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(count / maxSvc) * 100}%`, background: "#2d72a8" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
