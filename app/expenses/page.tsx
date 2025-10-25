"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Empty } from "@/components/ui/empty"

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<{ id: number; name: string; amount: number }[]>([])

  const addExpense = () => {
    const newExpense = {
      id: expenses.length + 1,
      name: `Expense ${expenses.length + 1}`,
      amount: Math.floor(Math.random() * 100) + 1,
    }
    setExpenses([...expenses, newExpense])
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              <div className="px-4 lg:px-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Expenses</h1>
                {/* <-- PRZYCISK W NAGŁÓWKU tylko jeśli są wydatki */}
                {expenses.length > 0 && (
                  <Button variant="default" onClick={addExpense}>
                    <Plus /> Add Expense
                  </Button>
                )}
              </div>

              <div className="px-4 lg:px-6">
                {expenses.length === 0 ? (
                  // <-- EMPTY STATE gdy brak wydatków
                  <Empty className="p-8 text-center">
                    <h2 className="text-lg font-semibold">No expenses yet</h2>
                    <p className="text-muted-foreground mt-2">
                      You haven’t added any expenses. Start tracking your spending now!
                    </p>
                    <Button className="mt-4" variant="default" onClick={addExpense}>
                      <Plus /> Add Expense
                    </Button>
                  </Empty>
                ) : (
                  // <-- LISTA WYDATKÓW gdy są dane
                  <div className="flex flex-col gap-2">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="rounded-lg border p-4 flex justify-between">
                        <span>{expense.name}</span>
                        <span>${expense.amount}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
