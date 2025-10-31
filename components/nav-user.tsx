"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"  // NOWE: Do linkowania "Account" do /profile
import { useRouter } from "next/navigation"  // NOWE: Do przekierowania w logout
import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
    initials?: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()  // NOWE: Do przekierowania w logout

  const computeInitials = (value?: string) => {
    if (!value) {
      return ""
    }

    const parts = value
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    if (parts.length === 0) {
      return ""
    }

    const letters =
      parts.length === 1
        ? parts[0].slice(0, 2)
        : parts.map((part) => part[0]).join("")

    return letters.slice(0, 2).toUpperCase()
  }

  const initials =
    computeInitials(user.initials) ||
    computeInitials(user.name) ||
    computeInitials(user.email.split("@")[0]) ||
    "??"

  // NOWA FUNKCJA: Obsługa logout – wyczyść localStorage i przekieruj do /login
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* ZMIANA: Account jako Link do /profile */}
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserCircleIcon className="mr-2 h-4 w-4" />
                  Account
                </Link>
              </DropdownMenuItem>              
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* ZMIANA: Logout z onClick + handleLogout */}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}