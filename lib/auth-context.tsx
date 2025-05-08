"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { type UserProfile, fetchUserProfile } from "@/lib/server-api"

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (userId: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (userId) {
          await loadUser(userId)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const loadUser = async (userId: string) => {
    setIsLoading(true)
    try {
      const userProfile = await fetchUserProfile(userId)
      if (userProfile) {
        setUser(userProfile)
      } else {
        // If user profile couldn't be loaded, log out
        localStorage.removeItem("userId")
      }
    } catch (error) {
      console.error("Error loading user:", error)
      localStorage.removeItem("userId")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (userId: string) => {
    // Use demo-user as a special case for demo account
    const finalUserId = userId === "demo-user" ? "mock-user-id-123" : userId
    localStorage.setItem("userId", finalUserId)
    await loadUser(finalUserId)
  }

  const logout = () => {
    localStorage.removeItem("userId")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
