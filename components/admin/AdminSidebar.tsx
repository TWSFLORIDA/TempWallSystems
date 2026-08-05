"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  List,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect, createContext, useContext } from "react"

// ---------------------------------------------------------------------------
// Sidebar context
// ---------------------------------------------------------------------------

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  setIsCollapsed: () => {},
})

export function useSidebar() {
  return useContext(SidebarContext)
}

// ---------------------------------------------------------------------------
// Navigation items
// ---------------------------------------------------------------------------

interface NavItem {
  name: string
  href: string
  icon: typeof LayoutDashboard
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Pipeline", href: "/admin/leads", icon: Users },
  { name: "Leads", href: "/admin/leads?view=table", icon: List },
]

// ---------------------------------------------------------------------------
// Theme tokens (navy sidebar)
// ---------------------------------------------------------------------------

const NAVY = "#0a2240"
const BORDER = "rgba(179,218,241,0.12)"

interface AdminSidebarProps {
  isCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function AdminSidebar({ isCollapsed: controlledCollapsed, onCollapsedChange }: AdminSidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [internalCollapsed, setInternalCollapsed] = useState(false)

  const isCollapsed = controlledCollapsed ?? internalCollapsed
  const setIsCollapsed = onCollapsedChange ?? setInternalCollapsed

  useEffect(() => {
    const saved = localStorage.getItem("admin-sidebar-collapsed")
    if (saved !== null) {
      const collapsed = JSON.parse(saved)
      if (onCollapsedChange) {
        onCollapsedChange(collapsed)
      } else {
        setInternalCollapsed(collapsed)
      }
    }
  }, [onCollapsedChange])

  const handleCollapsedChange = (collapsed: boolean) => {
    localStorage.setItem("admin-sidebar-collapsed", JSON.stringify(collapsed))
    setIsCollapsed(collapsed)
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    const [hrefPath, hrefQuery] = href.split("?")
    if (pathname !== hrefPath) return false
    if (hrefPath !== "/admin/leads") return true
    const hrefView = new URLSearchParams(hrefQuery).get("view") ?? "board"
    const currentView = searchParams.get("view") ?? "board"
    return hrefView === currentView
  }

  const NavContent = ({ showLabels = true }: { showLabels?: boolean }) => (
    <>
      {/* ---- Logo header ---- */}
      <div
        className={cn(
          "flex h-[60px] shrink-0 items-center",
          showLabels ? "px-5 justify-between" : "px-3 justify-center"
        )}
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-[3px] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105" style={{ background: "#2d72a8" }}>
            <span className="text-white font-bold text-sm tracking-tight">TWS</span>
          </div>
          {showLabels && (
            <span className="font-semibold text-white text-[15px] tracking-[-0.01em] whitespace-nowrap">
              TWS Florida
            </span>
          )}
        </Link>
        {showLabels && (
          <button
            onClick={() => handleCollapsedChange(true)}
            className="p-1.5 rounded-[3px] transition-all duration-150 text-[#7a9ab5] hover:text-white hover:bg-white/[0.06] lg:flex hidden"
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ---- Navigation links ---- */}
      <nav className="flex flex-1 flex-col px-3 py-4">
        <ul role="list" className="flex flex-col gap-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "group relative flex items-center text-[13.5px] font-medium rounded-[3px]",
                    "transition-all duration-150 ease-out",
                    showLabels ? "gap-x-3 px-3 py-2.5" : "justify-center p-2.5",
                    active
                      ? "text-white"
                      : "text-[#7a9ab5] hover:text-white hover:bg-white/[0.06]"
                  )}
                  style={active ? { background: "rgba(45,114,168,0.28)" } : undefined}
                  title={!showLabels ? item.name : undefined}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                      style={{ background: "#b3daf1" }}
                      aria-hidden
                    />
                  )}
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 transition-colors duration-150",
                      active ? "text-[#b3daf1]" : "text-[#5b7a94] group-hover:text-[#b3daf1]"
                    )}
                  />
                  {showLabels && <span className="truncate">{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* ---- Expand button (collapsed state) ---- */}
        {!showLabels && (
          <button
            onClick={() => handleCollapsedChange(false)}
            className="mt-3 p-2.5 rounded-[3px] flex items-center justify-center text-[#7a9ab5] hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            title="Expand sidebar"
          >
            <ChevronRight className="h-[18px] w-[18px]" />
          </button>
        )}

        {/* ---- Footer: sign out ---- */}
        <div
          className={cn("mt-auto pt-3", !showLabels && "flex flex-col items-center")}
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          <button
            onClick={() => void signOut()}
            className={cn(
              "group flex w-full rounded-[3px] text-[13.5px] font-medium",
              "text-[#7a9ab5] hover:text-white hover:bg-white/[0.06] transition-all duration-150",
              showLabels ? "gap-x-3 px-3 py-2.5" : "justify-center p-2.5"
            )}
            title={!showLabels ? "Sign out" : undefined}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0 text-[#5b7a94] group-hover:text-[#b3daf1] transition-colors duration-150" />
            {showLabels && "Sign out"}
          </button>
        </div>
      </nav>
    </>
  )

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed: handleCollapsedChange }}>
      {/* MOBILE: sticky top bar + slide-out drawer */}
      <div
        className="sticky top-0 z-40 flex items-center gap-x-4 px-4 py-3 sm:px-6 lg:hidden"
        style={{ background: NAVY, borderBottom: `1px solid ${BORDER}` }}
      >
        <button
          type="button"
          className="p-2 -m-2 rounded-[3px] text-[#7a9ab5] hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex-1 flex items-center gap-2">
          <div className="w-6 h-6 rounded-[3px] flex items-center justify-center" style={{ background: "#2d72a8" }}>
            <span className="text-white font-bold text-[10px]">TWS</span>
          </div>
          <span className="text-sm font-semibold text-white tracking-[-0.01em]">TWS Florida</span>
        </div>
      </div>

      {/* Mobile slide-out */}
      {mobileMenuOpen && (
        <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[272px] overflow-y-auto pb-4 shadow-2xl" style={{ background: NAVY }}>
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="p-2 rounded-[3px] text-[#7a9ab5] hover:text-white hover:bg-white/[0.06] transition-colors duration-150"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavContent showLabels={true} />
          </div>
        </div>
      )}

      {/* DESKTOP: fixed sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:w-16" : "lg:w-[272px]"
        )}
      >
        <div className="flex grow flex-col overflow-y-auto" style={{ background: NAVY, borderRight: `1px solid ${BORDER}` }}>
          <NavContent showLabels={!isCollapsed} />
        </div>
      </div>
    </SidebarContext.Provider>
  )
}
