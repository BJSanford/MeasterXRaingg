"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { verifyUser } from "@/lib/server-api" // Make sure this is imported
import oldApiData from "@/lib/static-data/old-api-data.json"; // Import the static data

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (userId: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getWeeklyWagerHistory = async (username: string): Promise<{ date: string, amount: number }[]> => {
  const API_BASE_URL = "https://api.rain.gg/v1"
  const API_KEY = process.env.RAIN_API_KEY || "14d2ae5d-cea5-453a-b814-6fd810bda580"
  const headers = {
    accept: "application/json",
    "x-api-key": API_KEY,
  }
  const now = new Date()
  const weeks: { date: string, amount: number }[] = []

  for (let i = 0; i < 4; i++) {
    // Calculate week start/end
    const end = new Date(now)
    end.setDate(now.getDate() - (7 * i))
    const start = new Date(end)
    start.setDate(end.getDate() - 6)
    // Format as ISO string
    const startStr = start.toISOString().split(".")[0] + ".00Z"
    const endStr = end.toISOString().split(".")[0] + ".00Z"
    const url = `${API_BASE_URL}/affiliates/leaderboard?start_date=${encodeURIComponent(startStr)}&end_date=${encodeURIComponent(endStr)}&type=wagered`
    try {
      const res = await fetch(url, { headers, cache: "no-store" })
      if (!res.ok) continue
      const data = await res.json()
      const arr = Array.isArray(data.results)
        ? data.results
        : Array.isArray(data.leaderboard)
          ? data.leaderboard
          : []
      const userEntry = arr.find((u: any) =>
        typeof u.username === "string" &&
        u.username.trim().toLowerCase() === username.trim().toLowerCase()
      )
      weeks.unshift({
        date: startStr.substring(0, 10), // show week start date
        amount: userEntry?.wagered ?? 0,
      })
    } catch {
      weeks.unshift({
        date: startStr.substring(0, 10),
        amount: 0,
      })
    }
  }
  return weeks
}

const getUserWageredFromLeaderboard = async (username: string): Promise<number> => {
  try {
    // Call your own API route to avoid CORS
    const res = await fetch(`/api/user/wagered?username=${encodeURIComponent(username)}`)
    if (!res.ok) return 0
    const data = await res.json()
    return data.wagered ?? 0
  } catch {
    return 0
  }
}

const getUserDepositedFromLeaderboard = async (username: string): Promise<number> => {
  try {
    // Call your own API route to avoid CORS
    const res = await fetch(`/api/user/deposited?username=${encodeURIComponent(username)}`)
    if (!res.ok) return 0
    const data = await res.json()
    return data.deposited ?? 0
  } catch {
    return 0
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // Try to load user from localStorage first
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const userObj = JSON.parse(userStr);
          setUser({ ...userObj, verified: userObj.verified ?? true });
          // If not verified, redirect to verification pending
          if (userObj.verified === false) {
            router.replace("/verification-pending");
          }
          setIsLoading(false);
          return;
        }
        const rainUsername = localStorage.getItem("rainUsername");
        if (rainUsername) {
          await loadUser(rainUsername);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [])

  const loadUser = async (rainUsername: string) => {
    setIsLoading(true)
    try {
      const userProfile = await verifyUser(rainUsername)
      let wagerHistory: { date: string, amount: number }[] = []
      let totalWagered = 0
      if (userProfile) {
        // Fetch correct wagered and deposited values from your API
        totalWagered = await getUserWageredFromLeaderboard(userProfile.username)
        const totalDeposited = await getUserDepositedFromLeaderboard(userProfile.username)
        wagerHistory = await getWeeklyWagerHistory(userProfile.username)
        setUser({
          id: userProfile.username, // Use username as fallback if id is missing
          username: userProfile.username,
          avatar: userProfile.avatar,
          totalWagered,
          totalDeposited,
          rakebackPercentage: 5,
          rakebackEarned: Math.round((totalWagered ?? 0) * 0.05),
          measterCoins: Math.floor((totalWagered ?? 0) / 10),
          joinDate: "",
          depositHistory: [],
          wagerHistory,
          verified: userProfile.verified ?? true, // Default to true if not present
        })
      } else {
        localStorage.removeItem("rainUsername")
        router.replace("/login") // Redirect to login if user not found
      }
    } catch (error) {
      console.error("Error loading user:", error)
      localStorage.removeItem("rainUsername")
      router.replace("/login") // Redirect to login on error
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
