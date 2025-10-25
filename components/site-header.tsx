"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="pt-6 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-6 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
      </div>
    </header>
  )
}
