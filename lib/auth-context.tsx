"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { verifyUser } from "@/lib/server-api" // Make sure this is imported

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
        const rainUsername = localStorage.getItem("rainUsername")
        if (rainUsername) {
          await loadUser(rainUsername)
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

  const loadUser = async (rainUsername: string) => {
    setIsLoading(true)
    try {
      // Fetch user data by username
      const userProfile = await verifyUser(rainUsername)
      if (userProfile) {
        setUser({
          id: userProfile.id || userProfile.username, // fallback if id missing
          username: userProfile.username,
          avatar: userProfile.avatar,
          totalWagered: userProfile.wagered,
          totalDeposited: userProfile.deposited,
          rakebackPercentage: 5, // You can calculate this based on wagered if needed
          rakebackEarned: Math.round(userProfile.wagered * 0.05), // Example calculation
          measterCoins: Math.floor(userProfile.wagered / 10), // Example calculation
          joinDate: "", // Not available from API
          depositHistory: [],
          wagerHistory: [],
        })
      } else {
        localStorage.removeItem("rainUsername")
      }
    } catch (error) {
      console.error("Error loading user:", error)
      localStorage.removeItem("rainUsername")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (rainUsername: string) => {
    localStorage.setItem("rainUsername", rainUsername)
    await loadUser(rainUsername)
  }

  const logout = () => {
    localStorage.removeItem("rainUsername")
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
