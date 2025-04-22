"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/auth-provider"
import {
  LayoutDashboard,
  Shield,
  FileText,
  CreditCard,
  User,
  MessageSquare,
  HelpCircle,
  Bot,
  ChevronLeft,
  ChevronRight,
  Users,
  Settings,
  BarChart,
  FileCheck,
  Building,
  AlertTriangle,
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  // If user is not logged in or we're on auth pages, don't show sidebar
  if (!user || pathname === "/login" || pathname === "/register" || pathname === "/") {
    return null
  }

  // Routes for client users
  const clientRoutes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Policies",
      icon: Shield,
      href: "/policies",
      color: "text-violet-500",
    },
    {
      label: "Claims",
      icon: FileText,
      href: "/claims",
      color: "text-pink-700",
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/payments",
      color: "text-orange-500",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
      color: "text-emerald-500",
    },
    {
      label: "Feedback",
      icon: MessageSquare,
      href: "/feedback",
      color: "text-blue-500",
    },
    {
      label: "FAQs",
      icon: HelpCircle,
      href: "/faqs",
      color: "text-yellow-500",
    },
    {
      label: "Chatbot",
      icon: Bot,
      href: "/chatbot",
      color: "text-green-500",
    },
  ]

  // Routes for admin users
  const adminRoutes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      color: "text-sky-500",
    },
    {
      label: "Customers",
      icon: Users,
      href: "/admin/customers",
      color: "text-violet-500",
    },
    {
      label: "Policies",
      icon: Shield,
      href: "/admin/policies",
      color: "text-pink-700",
    },
    {
      label: "Claims",
      icon: FileCheck,
      href: "/admin/claims",
      color: "text-orange-500",
    },
    {
      label: "Payments",
      icon: CreditCard,
      href: "/admin/payments",
      color: "text-emerald-500",
    },
    {
      label: "Analytics",
      icon: BarChart,
      href: "/admin/analytics",
      color: "text-blue-500",
    },
    {
      label: "Agents",
      icon: Building,
      href: "/admin/agents",
      color: "text-yellow-500",
    },
    {
      label: "Risk Assessment",
      icon: AlertTriangle,
      href: "/admin/risk-assessment",
      color: "text-red-500",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      color: "text-gray-500",
    },
  ]

  // Choose routes based on user role
  const routes = user.role === "admin" ? adminRoutes : clientRoutes

  return (
    <div
      className={cn(
        "relative hidden md:flex flex-col h-full border-r pt-16 bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="absolute right-[-12px] top-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 pt-4">
        <div className="flex flex-col gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-x-2 text-sm font-medium rounded-lg px-3 py-2 hover:bg-muted transition-all",
                pathname === route.href ? "bg-muted" : "transparent",
                collapsed ? "justify-center" : "",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {!collapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
