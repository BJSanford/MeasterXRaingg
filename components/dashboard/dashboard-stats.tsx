"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Coins, DollarSign, Zap, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function DashboardStats() {
  const { user } = useAuth()

  if (!user) {
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

  const stats = [
    {
      title: "Total Wagered",
      value: `$${user.totalWagered.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-500/10 to-purple-600/5",
      description: "All time wagering",
    },
    {
      title: "Current Rakeback",
      value: `${user.rakebackRate}%`,
      change: "Active",
      changeType: "neutral" as const,
      icon: Zap,
      gradient: "from-cyan-500 to-cyan-600",
      bgGradient: "from-cyan-500/10 to-cyan-600/5",
      description: `${user.level} tier rate`,
    },
    {
      title: "Total Deposited",
      value: `$${user.totalDeposited.toLocaleString()}`,
      change: "+8.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/10 to-orange-500/5",
      description: "Lifetime deposits",
    },
    {
      title: "Measter Coins",
      value: user.measterCoins.toLocaleString(),
      change: "+156",
      changeType: "positive" as const,
      icon: Coins,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/5",
      description: "Available to spend",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
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
                <p className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {stat.value}
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
