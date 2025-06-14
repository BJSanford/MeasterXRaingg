"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, Bell, Crown, Zap } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"

export function DashboardHeader() {
  const { user } = useAuth()
  const [rainAvatar, setRainAvatar] = useState("/placeholder-user.jpg")
  const [totalDeposited, setTotalDeposited] = useState(0)

  useEffect(() => {
    if (user) {
      const fetchLeaderboardData = async (type: string) => {
        const startDate = "2023-01-01T00:00:00.00Z";
        const endDate = "2028-01-01T00:00:00.00Z";

        try {
          const response = await fetch(`/api/proxy/leaderboard?type=${type}&start_date=${startDate}&end_date=${endDate}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${type} leaderboard: ${response.statusText}`);
          }
          const data = await response.json();
          console.log(`Proxy leaderboard response (${type}):`, data);
          const participant = data.results.find((p: any) => p.username?.toLowerCase().trim() === user.username?.toLowerCase().trim());
          if (participant) {
            if (type === "wagered") {
              setRainAvatar(participant.avatar || "/placeholder-user.jpg");
            } else if (type === "deposited") {
              setTotalDeposited(participant.deposited || 0); // Match rain username and set deposited
            }
          } else {
            console.warn(`Participant not found in ${type} leaderboard for username:`, user.username);
          }
        } catch (error) {
          console.error(`Error fetching proxy leaderboard (${type}):`, error);
        }
      };

      fetchLeaderboardData("wagered");
      fetchLeaderboardData("deposited");
    }
  }, [user])

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

  const progressPercentage = (user?.totalWagered / totalDeposited) * 100

  const getRakebackPercentage = (wagered: number) => {
    if (wagered >= 200000) return 0.7;
    if (wagered >= 150000) return 0.65;
    if (wagered >= 100000) return 0.6;
    if (wagered >= 75000) return 0.55;
    if (wagered >= 50000) return 0.5;
    if (wagered >= 25000) return 0.45;
    if (wagered >= 15000) return 0.4;
    if (wagered >= 10000) return 0.35;
    if (wagered >= 5000) return 0.3;
    if (wagered >= 2500) return 0.25;
    if (wagered >= 1000) return 0.2;
    return 0;
  };

  const rakebackPercentage = getRakebackPercentage(user?.totalWagered || 0)

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>

      <div className="relative bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-gradient-to-r from-purple-500 to-cyan-500 shadow-2xl">
                <AvatarImage src={rainAvatar} alt={user?.username || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-xl font-bold">
                  {user?.username?.slice(0, 2).toUpperCase() || "JE"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  Welcome, {user?.username || "User"}
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full">
                  <span className="text-emerald-400 text-sm font-semibold">
                    {rakebackPercentage}%
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-sm">
                Rakeback {rakebackPercentage}%
              </p>

              {/* XP Progress Bar */}
              <div className="w-64 space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{user?.totalWagered.toLocaleString()} Wagered</span>
                  <span>{totalDeposited.toLocaleString()} Deposited</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 hover:border-purple-500/50 transition-all duration-300 relative group"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="sr-only">Notifications</span>
            </Button>

            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-6 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group">
              <Link href="/rewards" className="flex items-center gap-2">
                <Zap className="h-4 w-4 group-hover:animate-pulse" />
                Shop Rewards
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
