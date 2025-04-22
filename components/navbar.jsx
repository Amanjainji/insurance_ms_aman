"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, User, LogOut, Bell } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = user?.role === "admin"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex items-center justify-between p-4 container">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            InsureHub
            {isAdmin && (
              <Badge variant="outline" className="ml-2">
                Admin
              </Badge>
            )}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            isAdmin ? (
              <>
                <Link href="/admin" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/admin/customers" className="text-sm font-medium hover:text-primary">
                  Customers
                </Link>
                <Link href="/admin/policies" className="text-sm font-medium hover:text-primary">
                  Policies
                </Link>
                <Link href="/admin/claims" className="text-sm font-medium hover:text-primary">
                  Claims
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/policies" className="text-sm font-medium hover:text-primary">
                  Policies
                </Link>
                <Link href="/claims" className="text-sm font-medium hover:text-primary">
                  Claims
                </Link>
                <Link href="/payments" className="text-sm font-medium hover:text-primary">
                  Payments
                </Link>
              </>
            )
          ) : (
            <>
              <Link href="/features" className="text-sm font-medium hover:text-primary">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary">
                Pricing
              </Link>
              <Link href="/faqs" className="text-sm font-medium hover:text-primary">
                FAQs
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  {isAdmin ? "8" : "3"}
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder2.svg" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.name}
                    {isAdmin && (
                      <Badge variant="outline" className="ml-2">
                        Admin
                      </Badge>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={isAdmin ? "/admin/settings" : "/profile"}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{isAdmin ? "Settings" : "Profile"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}

          <ModeToggle />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-6">
                {user ? (
                  isAdmin ? (
                    <>
                      <Link href="/admin" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <Link
                        href="/admin/customers"
                        className="text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Customers
                      </Link>
                      <Link
                        href="/admin/policies"
                        className="text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Policies
                      </Link>
                      <Link
                        href="/admin/claims"
                        className="text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Claims
                      </Link>
                      <Link
                        href="/admin/payments"
                        className="text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Payments
                      </Link>
                      <Link
                        href="/admin/analytics"
                        className="text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Analytics
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/dashboard" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Dashboard
                      </Link>
                      <Link href="/policies" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Policies
                      </Link>
                      <Link href="/claims" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Claims
                      </Link>
                      <Link href="/payments" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Payments
                      </Link>
                      <Link href="/profile" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                        Profile
                      </Link>
                    </>
                  )
                ) : (
                  <>
                    <Link href="/features" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Features
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Pricing
                    </Link>
                    <Link href="/faqs" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                      FAQs
                    </Link>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Sign up</Button>
                    </Link>
                  </>
                )}
                <Button
                  variant="ghost"
                  className="justify-start p-0"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
