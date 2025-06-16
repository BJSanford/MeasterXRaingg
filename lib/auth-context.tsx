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
      const userEntry = data.results?.find((u: any) => u.username?.toLowerCase().trim() === username.toLowerCase().trim());

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
        // Fallback for username
        if (!userProfile.username) {
          console.warn("Username not found in user profile. Attempting fallback.");
          const fallbackUsername = localStorage.getItem("rainUsername") || "unknown";
          userProfile.username = fallbackUsername;
        }

        // Get wagered from API
        let apiWagered = await getUserWageredFromLeaderboard(userProfile.username || "");
        // Check old-api-data.json for extra wagered
        let oldWagered = 0;
        if (userProfile.username) {
          const oldEntry = oldApiData.results.find((u: any) => u.username === userProfile.username);
          if (oldEntry) {
            oldWagered = oldEntry.wagered || 0;
          }
        }
        // Add both
        const totalWagered = apiWagered + oldWagered;
        const totalDeposited = await getUserDepositedFromLeaderboard(userProfile.username || "");
        const wagerHistory = await getWeeklyWagerHistory(userProfile.username || "");

        setUser({
          id: userProfile.username || "unknown",
          username: userProfile.username || "unknown",
          avatar: userProfile.avatar || { large: "placeholder.jpg", medium: "placeholder.jpg", small: "placeholder.jpg" },
          totalWagered,
          totalDeposited,
          rakebackPercentage: 5,
          rakebackEarned: Math.round(totalWagered * 0.05),
          measterCoins: Math.floor(totalWagered / 10),
          joinDate: userProfile.joinDate || "Unknown",
          depositHistory: userProfile.depositHistory || [],
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
    localStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });
    setUser(null);
    router.push("/");
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
