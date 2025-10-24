import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-4 py-8 lg:px-6">
            <h1 className="text-4xl font-orelega tracking-tight text-slate-900">
              Expenses
            </h1>
            <Button className="bg-slate-900 text-white hover:bg-slate-900/90">
              Add expense
            </Button>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
