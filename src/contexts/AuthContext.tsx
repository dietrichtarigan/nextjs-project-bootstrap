"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { checkAuthStatus, loginAdmin, logoutAdmin } from "@/lib/auth"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = () => {
      const isAuthenticated = checkAuthStatus()
      if (isAuthenticated) {
        // In a real app, you would decode the JWT token to get user info
        setUser({
          id: "1",
          email: "admin@himafi.org",
          role: "admin"
        })
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const result = await loginAdmin(email, password)
      if (result.success) {
        setUser({
          id: "1",
          email: email,
          role: "admin"
        })
        router.push("/admin/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = () => {
    logoutAdmin()
    setUser(null)
    router.push("/admin")
  }

  const value = {
    user,
    isLoading,
    login,
    logout
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
