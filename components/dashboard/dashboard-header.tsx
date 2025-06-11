"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, Bell, Crown, Zap } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export function DashboardHeader() {
  const { user } = useAuth()

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

  const progressPercentage = (user.xp / user.nextLevelXp) * 100

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>

      <div className="relative bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-gradient-to-r from-purple-500 to-cyan-500 shadow-2xl">
                <AvatarImage src={user?.avatar || "/placeholder.svg?height=80&width=80"} alt={user?.name || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-xl font-bold">
                  {user.name.slice(0, 2).toUpperCase() || "JE"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  Welcome, {user?.name || "User"}
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full">
                  <span className="text-emerald-400 text-sm font-semibold">{user.level}</span>
                </div>
              </div>

              <p className="text-gray-400 text-sm">
                Member since {user?.joinDate || "May 2023"} • Level {user.level}
              </p>

              {/* XP Progress Bar */}
              <div className="w-64 space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{user.xp.toLocaleString()} XP</span>
                  <span>{user.nextLevelXp.toLocaleString()} XP</span>
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
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="sr-only">Notifications</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="border-gray-700/50 bg-gray-800/50 backdrop-blur-sm text-white hover:bg-gray-700/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
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
