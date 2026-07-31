"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Doc, Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  DndContext, PointerSensor, useSensor, useSensors, useDraggable, useDroppable,
  DragOverlay, closestCorners, type DragEndEvent,
} from "@dnd-kit/core"
import {
  LayoutGrid, List, Search, MapPin, GripVertical, CalendarClock, X,
  CheckSquare, Check, Trash2,
} from "lucide-react"
import {
  BOARD_STAGES, OPEN_STAGES, STAGE_META, stageMeta,
  formatCurrency, formatCurrencyCompact, type LeadStatus,
} from "@/lib/pipeline"

type Lead = Doc<"leads">

const CARD = "bg-white border border-[#e8eef4] rounded-[3px]"

// ---------------------------------------------------------------------------
// Checkbox (palette only)
// ---------------------------------------------------------------------------

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "w-[18px] h-[18px] rounded-[3px] border flex items-center justify-center shrink-0 transition-colors",
        checked ? "bg-[#0a2240] border-[#0a2240]" : "bg-white border-[#c4d2de]"
      )}
    >
      {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function LeadCardBody({ lead }: { lead: Lead }) {
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13.5px] font-semibold text-[#0a2240] leading-tight truncate">{lead.name}</p>
        {lead.estimatedValue ? (
          <span className="text-[12px] font-bold text-[#2d8a5b] shrink-0">{formatCurrencyCompact(lead.estimatedValue)}</span>
        ) : null}
      </div>
      <p className="text-[12px] text-[#6b7f8e] truncate mt-1">{lead.service || "General inquiry"}</p>
      <div className="flex items-center gap-2.5 mt-2.5 text-[11.5px] text-[#8a9db0]">
        {lead.city && <span className="inline-flex items-center gap-1 truncate"><MapPin className="w-3 h-3 shrink-0" />{lead.city}</span>}
        {lead.followUpDate && (
          <span className="inline-flex items-center gap-1 shrink-0">
            <CalendarClock className="w-3 h-3" />
            {new Date(lead.followUpDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        )}
      </div>
    </>
  )
}

function KanbanCard({
  lead, selectMode, selected, onToggle,
}: {
  lead: Lead; selectMode: boolean; selected: boolean; onToggle: (id: string) => void
}) {
  const router = useRouter()
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead._id,
    disabled: selectMode,
  })
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        CARD, "p-3.5 mb-3 flex gap-2.5 group transition-shadow",
        isDragging && "opacity-40",
        selected ? "border-[#2d72a8] ring-1 ring-[#2d72a8]/30" : "hover:shadow-[0_2px_10px_rgba(10,34,64,0.06)]"
      )}
    >
      {selectMode && (
        <button onClick={() => onToggle(lead._id)} className="pt-0.5" aria-label="Select lead">
          <Checkbox checked={selected} />
        </button>
      )}
      <button
        onClick={() => (selectMode ? onToggle(lead._id) : router.push(`/admin/leads/${lead._id}`))}
        className="text-left min-w-0 flex-1"
      >
        <LeadCardBody lead={lead} />
      </button>
      {!selectMode && (
        <button
          {...listeners}
          {...attributes}
          className="shrink-0 self-stretch flex items-center text-[#c4d2de] hover:text-[#2d72a8] cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to move"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Column
// ---------------------------------------------------------------------------

function Column({
  stage, leads, selectMode, selected, onToggle,
}: {
  stage: LeadStatus; leads: Lead[]; selectMode: boolean; selected: Set<string>; onToggle: (id: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  const m = STAGE_META[stage]
  const total = leads.reduce((n, l) => n + (l.estimatedValue || 0), 0)
  return (
    <div className="flex-1 min-w-[188px] flex flex-col">
      <div className="flex items-center justify-between px-1.5 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: m.color }} />
          <span className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#0a2240] truncate">{m.label}</span>
          <span className="text-[11.5px] font-semibold text-[#8a9db0]">{leads.length}</span>
        </div>
        <span className="text-[12px] font-semibold text-[#6b7f8e] shrink-0">{formatCurrencyCompact(total)}</span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-[3px] p-2.5 min-h-[220px] transition-colors border",
          isOver ? "bg-[#eef5fb] border-[#2d72a8]/40" : "bg-[#f4f8fb] border-[#e8eef4]"
        )}
        style={{ borderTop: `3px solid ${m.color}` }}
      >
        {leads.map((l) => (
          <KanbanCard key={l._id} lead={l} selectMode={selectMode} selected={selected.has(l._id)} onToggle={onToggle} />
        ))}
        {leads.length === 0 && (
          <p className="text-[12px] text-[#b3c4d1] text-center py-10">Drop here</p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Table view
// ---------------------------------------------------------------------------

function TableView({
  leads, selectMode, selected, onToggle, onToggleAll,
}: {
  leads: Lead[]; selectMode: boolean; selected: Set<string>; onToggle: (id: string) => void; onToggleAll: () => void
}) {
  const allChecked = leads.length > 0 && leads.every((l) => selected.has(l._id))
  return (
    <div className={cn(CARD, "overflow-hidden")}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e8eef4] bg-[#f7fafc]">
              {selectMode && (
                <th className="px-4 py-3 w-10">
                  <button onClick={onToggleAll} aria-label="Select all"><Checkbox checked={allChecked} /></button>
                </th>
              )}
              {["Name", "Service", "City", "Value", "Stage", "Created"].map((h) => (
                <th key={h} className="px-4 py-3 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#8a9db0]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => {
              const m = stageMeta(l.status)
              const isSel = selected.has(l._id)
              return (
                <tr key={l._id} className={cn("border-b border-[#eef4f9] last:border-0", isSel ? "bg-[#eef5fb]" : "hover:bg-[#f7fafc]")}>
                  {selectMode && (
                    <td className="px-4 py-3">
                      <button onClick={() => onToggle(l._id)} aria-label="Select"><Checkbox checked={isSel} /></button>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${l._id}`} className="text-[13px] font-semibold text-[#0a2240] hover:text-[#2d72a8]">{l.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-[12.5px] text-[#6b7f8e]">{l.service || "—"}</td>
                  <td className="px-4 py-3 text-[12.5px] text-[#6b7f8e]">{l.city || "—"}</td>
                  <td className="px-4 py-3 text-[12.5px] font-semibold text-[#0a2240]">{l.estimatedValue ? formatCurrency(l.estimatedValue) : "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10.5px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[2px]" style={{ color: m.color, background: m.tint }}>{m.label}</span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-[#8a9db0]">{new Date(l._creationTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                </tr>
              )
            })}
            {leads.length === 0 && (
              <tr><td colSpan={selectMode ? 7 : 6} className="px-4 py-12 text-center text-[13px] text-[#8a9db0]">No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export function LeadsPageClient({ leads: initial }: { leads: Lead[] }) {
  const searchParams = useSearchParams()
  const initialStage = searchParams.get("stage") as LeadStatus | null

  const [leads, setLeads] = useState<Lead[]>(initial)
  const [view, setView] = useState<"board" | "table">(initialStage ? "table" : "board")
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState<LeadStatus | null>(initialStage)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const updateLead = useMutation(api.leads.update)
  const bulkDelete = useMutation(api.leads.bulkDeleteLeads)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return leads.filter((l) => {
      if (stageFilter && l.status !== stageFilter) return false
      if (!q) return true
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.city || "").toLowerCase().includes(q) ||
        (l.service || "").toLowerCase().includes(q)
      )
    })
  }, [leads, search, stageFilter])

  const byStage = useMemo(() => {
    const map: Record<string, Lead[]> = {}
    for (const s of BOARD_STAGES) map[s] = []
    for (const l of filtered) (map[l.status] ??= []).push(l)
    return map
  }, [filtered])

  const activeLead = activeId ? leads.find((l) => l._id === activeId) ?? null : null
  const openTotal = OPEN_STAGES.reduce((n, s) => n + (byStage[s]?.reduce((a, l) => a + (l.estimatedValue || 0), 0) || 0), 0)

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
    setConfirmDelete(false)
  }
  function toggleAll() {
    setSelected((prev) => {
      if (filtered.every((l) => prev.has(l._id))) return new Set()
      return new Set(filtered.map((l) => l._id))
    })
    setConfirmDelete(false)
  }
  function exitSelect() {
    setSelectMode(false)
    setSelected(new Set())
    setConfirmDelete(false)
  }

  async function handleBulkDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    const ids = Array.from(selected)
    setDeleting(true)
    try {
      await bulkDelete({ ids: ids as Id<"leads">[] })
      setLeads((prev) => prev.filter((l) => !selected.has(l._id)))
      toast.success(`Deleted ${ids.length} lead${ids.length === 1 ? "" : "s"}`)
      exitSelect()
    } catch {
      toast.error("Couldn't delete leads")
    } finally {
      setDeleting(false)
    }
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveId(null)
    const over = e.over
    if (!over) return
    const leadId = e.active.id as string
    const newStatus = over.id as LeadStatus
    const lead = leads.find((l) => l._id === leadId)
    if (!lead || lead.status === newStatus) return
    const prevStatus = lead.status
    setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l)))
    updateLead({ id: leadId as Id<"leads">, status: newStatus })
      .then(() => toast.success(`${lead.name} → ${STAGE_META[newStatus].label}`))
      .catch(() => {
        toast.error("Couldn't move lead")
        setLeads((prev) => prev.map((l) => (l._id === leadId ? { ...l, status: prevStatus } : l)))
      })
  }

  const btnBase = "px-3 h-9 flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors"

  return (
    <div className="max-w-[1760px] mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-[30px] font-bold text-[#0a2240] uppercase tracking-tight" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>Pipeline</h1>
          <p className="text-sm text-[#6b7f8e] mt-1.5">
            {filtered.length} leads · <span className="font-semibold text-[#2d8a5b]">{formatCurrency(openTotal)}</span> open value
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9db0]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="pl-9 pr-3 h-9 w-[220px] rounded-[3px] border border-[#dce8f0] bg-white text-[13px] text-[#0a2240] focus:outline-none focus:border-[#2d72a8]"
            />
          </div>
          <button
            onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
            className={cn(btnBase, "rounded-[3px] border", selectMode ? "bg-[#0a2240] text-white border-[#0a2240]" : "bg-white text-[#6b7f8e] border-[#dce8f0] hover:bg-[#f4f8fb]")}
          >
            <CheckSquare className="w-4 h-4" /> Select
          </button>
          <div className="flex rounded-[3px] border border-[#dce8f0] overflow-hidden">
            <button onClick={() => setView("board")} className={cn(btnBase, view === "board" ? "bg-[#0a2240] text-white" : "bg-white text-[#6b7f8e] hover:bg-[#f4f8fb]")}>
              <LayoutGrid className="w-4 h-4" /> Board
            </button>
            <button onClick={() => setView("table")} className={cn(btnBase, "border-l border-[#dce8f0]", view === "table" ? "bg-[#0a2240] text-white" : "bg-white text-[#6b7f8e] hover:bg-[#f4f8fb]")}>
              <List className="w-4 h-4" /> Table
            </button>
          </div>
        </div>
      </div>

      {/* Active stage filter chip */}
      {stageFilter && (
        <button onClick={() => setStageFilter(null)} className="inline-flex items-center gap-1.5 mb-5 px-2.5 py-1 rounded-[2px] text-[11.5px] font-semibold" style={{ color: STAGE_META[stageFilter].color, background: STAGE_META[stageFilter].tint }}>
          Stage: {STAGE_META[stageFilter].label} <X className="w-3 h-3" />
        </button>
      )}

      {/* Body */}
      {view === "board" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(e) => setActiveId(e.active.id as string)}
          onDragEnd={onDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <div className="flex gap-3 overflow-x-auto pb-4 admin-scrollbar">
            {BOARD_STAGES.map((s) => (
              <Column key={s} stage={s} leads={byStage[s] || []} selectMode={selectMode} selected={selected} onToggle={toggle} />
            ))}
          </div>
          <DragOverlay>
            {activeLead ? (
              <div className={cn(CARD, "p-3.5 shadow-lg w-[272px] rotate-1")}>
                <LeadCardBody lead={activeLead} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        <TableView leads={filtered} selectMode={selectMode} selected={selected} onToggle={toggle} onToggleAll={toggleAll} />
      )}

      {/* Bulk action bar */}
      {selectMode && selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 pl-5 pr-3 py-2.5 rounded-[4px] shadow-[0_10px_40px_rgba(10,34,64,0.25)]" style={{ background: "#0a2240" }}>
          <span className="text-[13px] font-semibold text-white">{selected.size} selected</span>
          <button onClick={() => { setSelected(new Set()); setConfirmDelete(false) }} className="text-[12.5px] font-medium text-[#b3daf1] hover:text-white px-2">Clear</button>
          <button
            onClick={handleBulkDelete}
            disabled={deleting}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[3px] text-[12.5px] font-semibold transition-colors",
              confirmDelete ? "bg-[#c0492e] text-white hover:bg-[#a63d26]" : "bg-white text-[#c0492e] hover:bg-[#f9ebe7]"
            )}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {deleting ? "Deleting..." : confirmDelete ? `Confirm delete ${selected.size}` : "Delete"}
          </button>
        </div>
      )}
    </div>
  )
}
