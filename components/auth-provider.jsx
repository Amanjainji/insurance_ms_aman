"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Redirect based on user role and current path
  useEffect(() => {
    if (!loading) {
      // If no user and trying to access protected routes
      if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
        router.push("/login")
      }

      // If admin user trying to access client routes
      if (user?.role === "admin" && pathname.startsWith("/dashboard")) {
        router.push("/admin")
      }

      // If client user trying to access admin routes
      if (user?.role === "client" && pathname.startsWith("/admin")) {
        router.push("/dashboard")
      }
    }
  }, [user, loading, pathname, router])

  const login = async (email, password) => {
    // In a real app, you would make an API call here
    // This is just a mock implementation
    try {
      // Mock admin login
      if (email === "admin@example.com" && password === "admin123") {
        const adminUser = {
          id: "admin1",
          name: "Admin User",
          email,
          role: "admin",
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        return { success: true, role: "admin" }
      }

      // Mock client login
      const clientUser = {
        id: "client1",
        name: "Aman Jain",
        email,
        role: "client",
      }

      setUser(clientUser)
      localStorage.setItem("user", JSON.stringify(clientUser))
      return { success: true, role: "client" }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (name, email, password) => {
    // In a real app, you would make an API call here
    try {
      // Mock successful registration (always as client)
      const clientUser = {
        id: "client" + Math.floor(Math.random() * 1000),
        name,
        email,
        role: "client",
      }

      setUser(clientUser)
      localStorage.setItem("user", JSON.stringify(clientUser))
      return { success: true, role: "client" }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}
