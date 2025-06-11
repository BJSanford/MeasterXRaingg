"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { verifyUser } from "@/lib/server-api" // Make sure this is imported
import oldApiData from "@/lib/static-data/old-api-data.json"; // Import the static data
import { UserProfile } from "@/lib/api";

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  login: (userId: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getWeeklyWagerHistory = async (username: string): Promise<{ date: string, amount: number }[]> => {
  const weeks: { date: string, amount: number }[] = [];
  const now = new Date();

  for (let i = 0; i < 4; i++) {
    const end = new Date(now);
    end.setDate(now.getDate() - 7 * i);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);

    const startStr = start.toISOString().split(".")[0] + ".00Z";
    const endStr = end.toISOString().split(".")[0] + ".00Z";

    try {
      const res = await fetch(
        `/api/proxy/leaderboard?start_date=${encodeURIComponent(startStr)}&end_date=${encodeURIComponent(endStr)}&type=wagered`
      );

      if (!res.ok) continue;

      const data = await res.json();
      const userEntry = data.results?.find((u: any) => u.username?.toLowerCase() === username.toLowerCase());

      weeks.unshift({
        date: startStr.substring(0, 10),
        amount: userEntry?.wagered ?? 0,
      });
    } catch {
      weeks.unshift({
        date: startStr.substring(0, 10),
        amount: 0,
      });
    }
  }

  return weeks;
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
    setIsLoading(true);
    try {
      const userProfile: Partial<UserProfile> = await verifyUser(rainUsername) || {}; // Handle null case
      if (userProfile) {
        // Ensure `totalWagered` and `totalDeposited` are included in the user object
        const userWithStats = {
          ...userProfile,
          totalWagered: await getUserWageredFromLeaderboard(userProfile.username || ""),
          totalDeposited: await getUserDepositedFromLeaderboard(userProfile.username || ""),
        };

        const wagerHistory = await getWeeklyWagerHistory(userProfile.username || "");

        setUser({
          id: userWithStats.username || "unknown",
          username: userWithStats.username || "unknown",
          avatar: userWithStats.avatar || { large: "placeholder.jpg", medium: "placeholder.jpg", small: "placeholder.jpg" }, // Ensure placeholder conforms to UserAvatar type
          totalWagered: userWithStats.totalWagered,
          totalDeposited: userWithStats.totalDeposited,
          rakebackPercentage: 5,
          rakebackEarned: Math.round(userWithStats.totalWagered * 0.05),
          measterCoins: Math.floor(userWithStats.totalWagered / 10),
          joinDate: userWithStats.joinDate || "Unknown",
          depositHistory: userWithStats.depositHistory || [],
          wagerHistory,
          verified: true,
        });
      } else {
        console.warn("User profile not found. Retaining current state.");
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setIsLoading(false);
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
