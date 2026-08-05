"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  ArrowLeft, Phone, Mail, MapPin, Building2, Trash2, Radio,
} from "lucide-react"
import {
  BOARD_STAGES, STAGE_META, stageMeta, formatCurrency, formatSource, type LeadStatus,
} from "@/lib/pipeline"

const CARD = "bg-white border border-[#e8eef4] rounded-[3px] shadow-[0_1px_3px_rgba(10,34,64,0.04)]"

function toDateInput(ms?: number | null): string {
  if (ms == null) return ""
  const d = new Date(ms)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}
function fromDateInput(value: string): number | null {
  if (!value) return null
  const [y, m, d] = value.split("-").map(Number)
  return new Date(y, m - 1, d, 9, 0, 0).getTime()
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const data = useQuery(api.leads.get, { id: id as Id<"leads"> })
  const update = useMutation(api.leads.update)
  const addNote = useMutation(api.leads.addNote)
  const bulkDelete = useMutation(api.leads.bulkDeleteLeads)

  const [note, setNote] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (data === undefined) {
    return <p className="text-sm text-[#8a9db0]">Loading…</p>
  }
  if (data === null) {
    return (
      <div>
        <Link href="/admin/leads" className="text-[13px] text-[#2d72a8] hover:underline">← Back to pipeline</Link>
        <p className="text-sm text-[#8a9db0] mt-4">Lead not found.</p>
      </div>
    )
  }

  const { lead, events } = data
  const m = stageMeta(lead.status)

  async function patch(fields: Record<string, unknown>) {
    try {
      await update({ id: id as Id<"leads">, ...fields })
    } catch {
      toast.error("Couldn't save change")
    }
  }

  async function saveNote() {
    if (!note.trim()) return
    await addNote({ id: id as Id<"leads">, note: note.trim() })
    setNote("")
    toast.success("Note added")
  }

  async function remove() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    await bulkDelete({ ids: [id as Id<"leads">] })
    toast.success("Lead deleted")
    router.replace("/admin/leads")
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6b7f8e] hover:text-[#2d72a8] mb-5">
        <ArrowLeft className="w-4 h-4" /> Back to pipeline
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-[30px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>{lead.name}</h1>
          <p className="text-sm text-[#6b7f8e] mt-1.5">{lead.service || "General inquiry"}{lead.city ? ` · ${lead.city}` : ""}</p>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-[2px]" style={{ color: m.color, background: m.tint }}>{m.label}</span>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-6">
        <a href={`tel:${lead.phone}`} className={cn("inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[3px] text-[12.5px] font-semibold border border-[#dce8f0] bg-white text-[#0a2240] hover:bg-[#f4f8fb] transition-colors", !lead.phone && "pointer-events-none opacity-40")}>
          <Phone className="w-3.5 h-3.5" /> Call
        </a>
        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-[3px] text-[12.5px] font-semibold border border-[#dce8f0] bg-white text-[#0a2240] hover:bg-[#f4f8fb] transition-colors">
          <Mail className="w-3.5 h-3.5" /> Email
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: contact + activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`${CARD} p-6`}>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#8a9db0] mb-4">Contact</h2>
            <div className="space-y-2.5 text-[13px] text-[#0a2240]">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-2.5 hover:text-[#2d72a8]"><Mail className="w-4 h-4 text-[#8a9db0]" />{lead.email}</a>
              {lead.phone && <a href={`tel:${lead.phone}`} className="flex items-center gap-2.5 hover:text-[#2d72a8]"><Phone className="w-4 h-4 text-[#8a9db0]" />{lead.phone}</a>}
              {lead.company && <p className="flex items-center gap-2.5"><Building2 className="w-4 h-4 text-[#8a9db0]" />{lead.company}</p>}
              {(lead.city || lead.zip) && <p className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-[#8a9db0]" />{[lead.city, lead.zip].filter(Boolean).join(" · ")}</p>}
              {lead.source && <p className="flex items-center gap-2.5"><Radio className="w-4 h-4 text-[#8a9db0]" />Source: <span className="font-semibold">{formatSource(lead.source)}</span></p>}
            </div>
            {lead.message && (
              <div className="mt-5 pt-5 border-t border-[#eef4f9]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a9db0] mb-2">Message</p>
                <p className="text-[13px] text-[#334] leading-relaxed">{lead.message}</p>
              </div>
            )}
            {(lead.scope || lead.timeline) && (
              <div className="mt-4 flex gap-4 text-[12px] text-[#6b7f8e]">
                {lead.scope && <span>Scope: <span className="font-semibold text-[#0a2240] capitalize">{lead.scope}</span></span>}
                {lead.timeline && <span>Timeline: <span className="font-semibold text-[#0a2240] capitalize">{lead.timeline}</span></span>}
              </div>
            )}
          </div>

          {/* Activity */}
          <div className={`${CARD} p-6`}>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#8a9db0] mb-4">Activity & notes</h2>
            <div className="flex gap-2 mb-4">
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note…"
                className="flex-1 h-9 px-3 rounded-[3px] border border-[#dce8f0] bg-white text-[13px] text-[#0a2240] focus:outline-none focus:border-[#2d72a8]"
                onKeyDown={(e) => e.key === "Enter" && saveNote()}
              />
              <button onClick={saveNote} className="px-3.5 h-9 rounded-[3px] text-[12.5px] font-semibold text-white" style={{ background: "#0a2240" }}>Add</button>
            </div>
            {events.length === 0 ? (
              <p className="text-[13px] text-[#8a9db0]">No activity yet.</p>
            ) : (
              <ul className="space-y-3">
                {events.map((e) => (
                  <li key={e._id} className="flex gap-3 text-[12.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d72a8] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-[#0a2240]">{e.detail}</p>
                      <p className="text-[11px] text-[#8a9db0]">{new Date(e.at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right: pipeline controls */}
        <div className="space-y-6">
          <div className={`${CARD} p-6`}>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#8a9db0] mb-4">Stage</h2>
            <select
              value={lead.status}
              onChange={(e) => patch({ status: e.target.value as LeadStatus })}
              className="w-full h-9 px-3 rounded-[3px] border border-[#dce8f0] bg-white text-[13px] font-semibold text-[#0a2240] focus:outline-none focus:border-[#2d72a8]"
            >
              {BOARD_STAGES.map((s) => (
                <option key={s} value={s}>{STAGE_META[s].label}</option>
              ))}
            </select>

            <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a9db0] mt-5 mb-2">Estimated value</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8a9db0]">$</span>
              <input
                type="number"
                defaultValue={lead.estimatedValue ?? ""}
                onBlur={(e) => patch({ estimatedValue: e.target.value ? Number(e.target.value) : 0 })}
                placeholder="0"
                className="w-full h-9 pl-7 pr-3 rounded-[3px] border border-[#dce8f0] bg-white text-[13px] text-[#0a2240] focus:outline-none focus:border-[#2d72a8]"
              />
            </div>

            <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a9db0] mt-5 mb-2">Expected close date</label>
            <input
              type="date"
              defaultValue={toDateInput(lead.expectedCloseDate)}
              onChange={(e) => patch({ expectedCloseDate: fromDateInput(e.target.value) })}
              className="w-full h-9 px-3 rounded-[3px] border border-[#dce8f0] bg-white text-[13px] text-[#0a2240] focus:outline-none focus:border-[#2d72a8]"
            />

            <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a9db0] mt-5 mb-2">Follow-up date</label>
            <input
              type="date"
              defaultValue={toDateInput(lead.followUpDate)}
              onChange={(e) => patch({ followUpDate: fromDateInput(e.target.value) })}
              className="w-full h-9 px-3 rounded-[3px] border border-[#dce8f0] bg-white text-[13px] text-[#0a2240] focus:outline-none focus:border-[#2d72a8]"
            />

            {lead.estimatedValue ? (
              <p className="text-[12px] text-[#6b7f8e] mt-4">Weighted forecast: <span className="font-semibold text-[#2d8a5b]">{formatCurrency(lead.estimatedValue * m.probability)}</span></p>
            ) : null}
          </div>

          <button
            onClick={remove}
            className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-[3px] text-[12.5px] font-semibold transition-colors"
            style={confirmDelete ? { background: "#c0492e", color: "#fff" } : { background: "#f9ebe7", color: "#c0492e" }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {confirmDelete ? "Confirm delete" : "Delete lead"}
          </button>
        </div>
      </div>
    </div>
  )
}
