"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Coins, Zap, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { CoinIcon } from "@/components/ui/coin-icon"
import { useEffect, useState } from "react"

export function DashboardStats() {
  const { user, isLoading } = useAuth()
  const [totalDeposited, setTotalDeposited] = useState(0)

  useEffect(() => {
    if (user) {
      const fetchDepositedData = async () => {
        const startDate = "2023-01-01T00:00:00.00Z"
        const endDate = "2028-01-01T00:00:00.00Z"

        try {
          const response = await fetch(`/api/proxy/leaderboard?type=deposited&start_date=${startDate}&end_date=${endDate}`)
          if (!response.ok) {
            throw new Error(`Failed to fetch deposited leaderboard: ${response.statusText}`)
          }
          const data = await response.json()
          const participant = data.results.find((p: any) => p.username?.toLowerCase().trim() === user.username?.toLowerCase().trim());
          if (participant) {
            setTotalDeposited(participant.deposited || 0)
          } else {
            console.warn(`Participant not found in deposited leaderboard for username:`, user.username)
          }
        } catch (error) {
          console.error(`Error fetching deposited leaderboard:`, error)
        }
      }

      fetchDepositedData()
    }
  }, [user])

  if (isLoading || !user) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50">
            <CardContent className="p-6">
              <div className="h-24 animate-pulse bg-gray-800/50 rounded-lg"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Calculate user level based on total wagered
  const getUserLevel = (wagered: number) => {
    if (wagered >= 200000) return "Ascendent"
    if (wagered >= 150000) return "Imperial"
    if (wagered >= 100000) return "Obsidian"
    if (wagered >= 75000) return "Blood Diamond"
    if (wagered >= 50000) return "Diamond"
    if (wagered >= 25000) return "Emerald"
    if (wagered >= 15000) return "Platinum"
    if (wagered >= 10000) return "Gold"
    if (wagered >= 5000) return "Silver"
    if (wagered >= 2500) return "Bronze"
    if (wagered >= 1000) return "Iron"
    return "Unranked"
  }

  const level = getUserLevel(user.totalWagered)

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

  const stats = [
    {
      title: "Current Rakeback",
      value: `${rakebackPercentage}%`,
      change: "Active",
      changeType: "neutral" as const,
      icon: Zap,
      gradient: "from-cyan-500 to-cyan-600",
      bgGradient: "from-cyan-500/10 to-cyan-600/5",
      description: `${level} tier rate`,
      isCoin: false,
    },
    {
      title: "Total Wagered",
      value: user.totalWagered.toLocaleString(),
      change: "",
      changeType: "positive" as const,
      icon: Coins,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      description: "All time wagering",
      isCoin: true,
    },
    {
      title: "Total Deposited",
      value: totalDeposited.toLocaleString(),
      change: "",
      changeType: "positive" as const,
      icon: TrendingUp,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/10 to-orange-500/5",
      description: "Lifetime deposits",
      isCoin: true,
    },
    {
      title: "Measter Coins",
      value: user.measterCoins.toLocaleString(),
      change: "",
      changeType: "positive" as const,
      icon: Coins,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/5",
      description: "Coming Soon",
      isCoin: true,
    },
  ]

  // Fix type comparison issue
  const statsWithCorrectTypes = stats.map((stat) => {
    if (stat.changeType === "neutral") {
      return { ...stat, changeType: "neutral" };
    }
    return stat;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsWithCorrectTypes.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 group hover:scale-105 relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background gradient effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            ></div>

            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full ${
                    stat.changeType === "positive"
                      ? "bg-green-500/20 text-green-400"
                      : stat.changeType === "negative"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {stat.change}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300 flex items-center gap-1">
                  {stat.isCoin && <CoinIcon size={20} className="mb-1" />}
                  <span className="text-white group-hover:text-white transition-colors duration-300">{stat.value}</span>
                </p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}