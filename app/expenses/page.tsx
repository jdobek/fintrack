"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Empty } from "@/components/ui/empty"
import Image from "next/image"
import { fontInterTight, fontSans } from "@/lib/fonts"

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
                {expenses.length > 0 && (
                  <Button variant="default" onClick={addExpense}>
                    <Plus /> Add Expense
                  </Button>
                )}
              </div>

              <div className="px-4 lg:px-6">
                {expenses.length === 0 ? (
                  <Empty className="p-8 flex items-center justify-center gap-6 text-left">
                    
                    <Image
                      src="/cucumber-empty.svg"
                      alt="Empty state illustration"
                      width={120}
                      height={120}
                    />
                    <div className={`${fontInterTight.className}`}> 
                      
                      <h2 className="font-bold leading-tight" style={{ fontSize: "40px" }}>
                        <span className="block">You haven’t</span>
                        <span className="block">added any</span>
                        <span className="block">expenses yet.</span>
                      </h2>
                      <p className="text-muted-foreground mt-2">
                        Once you add an expense, it will appear on the list.
                      </p>
                      <Button 
                        className={`mt-4 ${fontSans.className} font-semibold`} 
                        variant="default" 
                        onClick={addExpense}>
                        <Plus /> Add Expense
                      </Button>
                    </div>
                  </Empty>
                ) : (
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
