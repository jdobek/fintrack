"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Empty } from "@/components/ui/empty"
import Image from "next/image"
import { fontInterTight, fontOrelega, fontSans } from "@/lib/fonts"

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
              <div className="px-6 lg:px-6 flex items-center justify-between">
              <h1 className={`${fontOrelega.className} text-2xl`} style={{ fontSize: "36px" }}>
                  Balance
                </h1>
                {expenses.length > 0 && (
                  <Button variant="default" onClick={addExpense}>
                    <Plus /> Add Expense
                  </Button>
                )}
              </div>

              <div className="px-4 lg:px-6">
                {expenses.length === 0 ? (
                  <Empty className="flex h-full min-h-[calc(100vh-18rem)] flex items-center justify-center gap-1 text-center">
                    
                    <Image
                      src="/cucumber-empty.svg"
                      alt="Empty state illustration"
                      width={140}
                      height={140}
                    />
                    <div className={`${fontInterTight.className}`}> 
                      <h2 className="font-bold leading-[1.1] mt-5" style={{ fontSize: "28px" }}>
                        <span className="block">Add your first expense</span>
                      </h2>
                    </div>
                    <div className={`${fontSans.className}`}> 
                      <p className="text-muted-foreground mt-2">
                        Once you add an expense, it will appear on the list.
                      </p>
                      <Button 
                        className={`mt-7 font-regular`} 
                        variant="default" 
                        onClick={addExpense}>
                        <Plus /> Add expense
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
