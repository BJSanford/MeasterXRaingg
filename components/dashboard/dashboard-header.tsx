"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"; // Removed as XP bar is not in original logic
import { Settings, Bell, Zap, Crown, Gift } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { CoinIcon } from "@/components/ui/coin-icon" // Re-added from original for progress bar context

export function DashboardHeader() {
  const { user } = useAuth()
  const [rainAvatar, setRainAvatar] = useState("/placeholder-user.jpg") // Default placeholder
  const [totalDeposited, setTotalDeposited] = useState(0)
  const [level, setLevel] = useState("Bronze") // Default level

  useEffect(() => {
    if (user) {
      // Ensure user and username are available
      const fetchLeaderboardData = async (type: string) => {
        const startDate = "2023-01-01T00:00:00.00Z" // Using fixed dates as in original
        const endDate = "2028-01-01T00:00:00.00Z"

        try {
          const response = await fetch(
            `/api/proxy/leaderboard?type=${type}&start_date=${startDate}&end_date=${endDate}`,
          )
          if (!response.ok) {
            throw new Error(`Failed to fetch ${type} leaderboard: ${response.statusText}`)
          }
          const data = await response.json()
          const participant = data.results.find((p: any) => p.username === user.username)
          if (participant) {
            if (type === "wagered") {
              setRainAvatar(participant.avatar || "/placeholder-user.jpg")
            } else if (type === "deposited") {
              setTotalDeposited(participant.deposited !== undefined ? participant.deposited : 0)
            }
          } else {
            console.warn(`Participant not found in ${type} leaderboard for username:`, user.username)
            // Set defaults if participant not found to avoid issues with calculations
            if (type === "wagered") setRainAvatar("/placeholder-user.jpg")
            if (type === "deposited") setTotalDeposited(0)
          }
        } catch (error) {
          console.error(`Error fetching proxy leaderboard (${type}):`, error)
          // Set defaults on error
          if (type === "wagered") setRainAvatar("/placeholder-user.jpg")
          if (type === "deposited") setTotalDeposited(0)
        }
      }

      fetchLeaderboardData("wagered")
      fetchLeaderboardData("deposited")

      const calculateLevel = (wagered: number) => {
        if (wagered >= 200000) return "Diamond"
        if (wagered >= 150000) return "Platinum"
        if (wagered >= 100000) return "Gold"
        if (wagered >= 75000) return "Silver"
        if (wagered >= 50000) return "Bronze+"
        if (wagered >= 25000) return "Iron+"
        if (wagered >= 15000) return "Iron"
        if (wagered >= 10000) return "Wood+"
        if (wagered >= 5000) return "Wood"
        if (wagered >= 2500) return "Stone+"
        if (wagered >= 1000) return "Stone"
        return "Bronze" // Default if no conditions met
      }
      setLevel(calculateLevel(user?.totalWagered || 0))
    }
  }, [user])

  // Original loading state from your file
  if (!user) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 mb-8">
          <div className="h-20 animate-pulse bg-gray-800/50 rounded-lg"></div>
        </div>
      </div>
    )
  }

  // Updated rank calculation and rakeback percentage logic based on the provided graph.
  // Added rank icon display next to the rank name.
  const calculateRank = (wagered: number) => {
    if (wagered >= 200000) return { name: "Ascendent", icon: "/icons/ascendent.png", rakeback: 0.7 }
    if (wagered >= 150000) return { name: "Imperial", icon: "/icons/imperial.png", rakeback: 0.65 }
    if (wagered >= 100000) return { name: "Obsidian", icon: "/icons/obsidian.png", rakeback: 0.6 }
    if (wagered >= 75000) return { name: "Blood Diamond", icon: "/icons/blood-diamond.png", rakeback: 0.55 }
    if (wagered >= 50000) return { name: "Diamond", icon: "/icons/diamond.png", rakeback: 0.5 }
    if (wagered >= 25000) return { name: "Emerald", icon: "/icons/emerald.png", rakeback: 0.45 }
    if (wagered >= 15000) return { name: "Platinum", icon: "/icons/platinum.png", rakeback: 0.4 }
    if (wagered >= 10000) return { name: "Gold", icon: "/icons/gold.png", rakeback: 0.35 }
    if (wagered >= 5000) return { name: "Silver", icon: "/icons/silver.png", rakeback: 0.3 }
    if (wagered >= 2500) return { name: "Bronze", icon: "/icons/bronze.png", rakeback: 0.25 }
    if (wagered >= 1000) return { name: "Iron", icon: "/icons/iron.png", rakeback: 0.2 }
    return { name: "Unranked", icon: "/icons/unranked.png", rakeback: 0 }
  }

  const rank = calculateRank(user?.totalWagered || 0)

  // Updated display logic for rank and rakeback percentage.
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 rounded-3xl blur-md opacity-25 group-hover:opacity-50 transition-opacity duration-300 animate-tilt"></div>

      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/60 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl shadow-purple-500/20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(60%_90%_at_50%_0%,white,transparent)]">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-white/40 stroke-white/50"
          >
            <defs>
              <pattern id="hex-pattern-header" width="72" height="72" patternUnits="userSpaceOnUse" x="50%" y="100%">
                <path d="M.5 36V.5h35.5V36M36.5 71.5V36h35.5v35.5H.5z"></path>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-pattern-header)"></rect>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4 md:gap-6 animate-fadeInLeft">
            <div className="relative shrink-0">
              <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-cyan-400/50 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-500/30">
                <AvatarImage src={rainAvatar || "/placeholder.svg"} alt={user.username || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-500 text-white text-lg md:text-xl font-semibold">
                  {user.username?.slice(0, 2).toUpperCase() || "ME"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 p-1.5 rounded-full shadow-md transform transition-all duration-300 group-hover:scale-110">
                <Crown className="h-3 w-3 md:h-4 md:w-4 text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="block bg-gradient-to-r from-white via-neutral-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                  Welcome back,
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight animate-text-reveal">
                  {user.username}!
                </span>
              </h1>
              <p className="text-xs md:text-sm text-cyan-300/80 font-medium flex items-center gap-2">
                <Gift size={14} className="opacity-70" />
                Rakeback: <span className="font-bold text-cyan-200">{(rank.rakeback * 100).toFixed(2)}%</span>
                <span className="ml-1 px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs rounded-full border border-cyan-500/20 flex items-center gap-1">
                  <img src={rank.icon} alt={rank.name} className="h-4 w-4" />
                  {rank.name} Tier
                </span>
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 animate-fadeInRight">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold px-4 py-2 md:px-5 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 group/button"
            >
              <Link href="/rewards" className="flex items-center gap-2 text-sm md:text-base">
                <Zap className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover/button:rotate-[15deg] group-hover/button:scale-110" />
                Shop Rewards
              </Link>
            </Button>
          </div>
        </div>

        {/* Original Progress Bar (Wagered vs Deposited) - Styled with new UI elements */}
        <div className="mt-6 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span className="flex items-center gap-1">
              <CoinIcon size={12} className="mb-0.5 opacity-70" />
              {(user.totalWagered || 0).toLocaleString()} Wagered
            </span>
            <span className="flex items-center gap-1">
              <CoinIcon size={12} className="mb-0.5 opacity-70" />
              {totalDeposited.toLocaleString()} Deposited
            </span>
          </div>
          <div className="h-2 bg-gray-800/60 rounded-full overflow-hidden border border-gray-700/50">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(100, progressPercentage)}%` }} // Cap at 100%
            ></div>
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-gray-900 animate-pulse"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Remember to add these keyframes and animations to your tailwind.config.ts or globals.css
// (As provided in the previous response)
/* In tailwind.config.ts:
theme: {
extend: {
  keyframes: {
    tilt: { '0%, 100%': { transform: 'rotate(0deg)' }, '50%': { transform: 'rotate(0.5deg)' }, },
    fadeInLeft: { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' }, },
    fadeInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' }, },
    fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }, },
    textReveal: { '0%': { 'clip-path': 'inset(0 100% 0 0)' }, '100%': { 'clip-path': 'inset(0 0 0 0)' }, }
  },
  animation: {
    tilt: 'tilt 10s infinite linear',
    fadeInLeft: 'fadeInLeft 0.5s ease-out forwards',
    fadeInRight: 'fadeInRight 0.5s ease-out forwards',
    fadeInUp: 'fadeInUp 0.5s ease-out forwards',
    'text-reveal': 'textReveal 1s ease-out 0.3s forwards',
  },
},
},
*/
