"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  User,
  Settings,
  Book,
  Calendar,
  LogOut
} from "lucide-react"

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/dashboard/materials",
    label: "Materials",
    icon: Book,
  },
  {
    href: "/dashboard/schedule",
    label: "Schedule",
    icon: Calendar,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6" />
              <span className="font-bold">Teach the World</span>
            </Link>
            <div className="hidden md:flex space-x-2">
              {routes.map((route) => {
                const Icon = route.icon
                return (
                  <Link key={route.href} href={route.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center space-x-2",
                        pathname === route.href && "bg-secondary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{route.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
