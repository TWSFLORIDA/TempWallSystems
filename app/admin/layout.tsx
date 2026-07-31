"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Toaster } from "sonner"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { cn } from "@/lib/utils"
import "./admin.css"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("admin-sidebar-collapsed")
    if (saved !== null) setIsCollapsed(JSON.parse(saved))
  }, [])

  // The login page renders its own full-screen layout — no chrome.
  if (pathname === "/admin/login") return <>{children}</>

  // Prevent hydration mismatch — skeleton matches the dark sidebar.
  if (!mounted) {
    return (
      <div className="admin-theme min-h-screen bg-[#f4f8fb]">
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[272px] lg:flex-col">
          <div className="flex grow flex-col overflow-y-auto border-r border-white/[0.08]" style={{ background: "#0a2240" }} />
        </div>
        <main className="lg:pl-[272px]">
          <div className="px-6 pt-8 pb-12 sm:px-8 lg:px-10 lg:pt-10">{children}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="admin-theme min-h-screen bg-[#f4f8fb]">
      <AdminSidebar isCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed} />
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:pl-16" : "lg:pl-[272px]"
        )}
      >
        <div className="px-6 pt-8 pb-12 sm:px-8 lg:px-10 lg:pt-10">{children}</div>
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
