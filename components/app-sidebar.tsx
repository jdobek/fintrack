"use client"

import * as React from "react"
import Image from "next/image"
import { LayoutDashboardIcon, SwitchCameraIcon } from "lucide-react"
import { useEffect, useState } from "react"  // Dodane: useState i useEffect do dynamicznego pobierania usera
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Typ dla użytkownika z localStorage (zgodny z backendem + NavUser)
interface User {
  id: string
  fullName: string
  email: string
  avatar?: string  // Opcjonalny avatar
}

// Typ dla NavUser (dostosowany do komponentu – name z fullName, default avatar + inicjały opcjonalne)
interface NavUserProps {
  name: string
  email: string
  avatar: string
  initials?: string  // Opcjonalne – jeśli NavUser nie używa, TS nie zgłosi błędu
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      badge: {
        text: "soon",
      },
    },
    { 
      title: "Balance", 
      url: "/balance", 
      icon: SwitchCameraIcon 
    },
  ],
  navClouds: [],
  navSecondary: [],
  documents: [],
}

// NOWA FUNKCJA: Generuj inicjały z fullName (np. "Jan Kowalski" → "JK")
const getInitials = (fullName: string): string => {
  if (!fullName) return "??"
  return fullName
    .split(' ')  // Podziel na słowa
    .map(word => word.charAt(0).toUpperCase())  // Pierwsza litera upperCase
    .join('')  // Połącz
    .slice(0, 2)  // Ogranicz do 2 liter
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<User | null>(null)  // Stan dla dynamicznego usera
  const [loading, setLoading] = useState(true)  // Opcjonalne: loading podczas pobierania z localStorage

  useEffect(() => {
    // Pobierz user z localStorage (zapisany po rejestracji/logowaniu)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User
        setUser(parsedUser)
      } catch (err) {
        console.error('Error parsing user from localStorage:', err)
        localStorage.removeItem('user')  // Wyczyść invalid data
      }
    } else {
      // Brak usera – opcjonalnie przekieruj do login
      // window.location.href = '/login'
    }
    setLoading(false)
  }, [])

  // Opcjonalne: Jeśli loading, pokaż placeholder
  if (loading) {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <a href="#" className="flex items-center">
                  <Image 
                    src="/logo.svg" 
                    alt="fintrack" 
                    width={160} 
                    height={40}
                    className="h-auto"
                  />
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <div className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          {/* Placeholder podczas loading – initials opcjonalne, więc bez błędu TS */}
          <NavUser user={{ name: "Loading...", email: "", avatar: "/avatars/shadcn.jpg" }} />
        </SidebarFooter>
      </Sidebar>
    )
  }

  // FIX: Twórz obiekt zgodny z NavUser props (name z fullName, default avatar + inicjały z fullName)
  const displayUser: NavUserProps = user 
    ? {
        name: user.fullName || user.email.split('@')[0],  // fullName z backendu lub fallback z email
        email: user.email,
        avatar: user.avatar || "/avatars/shadcn.jpg",  // Default avatar
        initials: getInitials(user.fullName),  // NOWE: Dynamiczne inicjały z fullName (zamiast stałego "CN")
      }
    : { 
        name: "Guest", 
        email: "Log in", 
        avatar: "/avatars/shadcn.jpg",
        initials: "G"  // Fallback inicjały
      }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent hover:text-inherit active:bg-transparent active:text-inherit focus-visible:ring-0"
            >
              <a href="/balance" className="flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="fintrack" 
                  width={160} 
                  height={40}
                  className="h-auto"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {/* FIX: Przekazuj typowany displayUser – błąd TS zniknie */}
        <NavUser user={displayUser} />
      </SidebarFooter>
    </Sidebar>
  )
}