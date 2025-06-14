"use client"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useState } from "react"
import { Crown, Zap, Gift, TrendingUp, Sparkles, Star, Trophy } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { CoinIcon } from "@/components/ui/coin-icon"

// Define types for rank
interface Rank {
  level: string
  threshold: number
  claimable: number
  rankReward: number
  activeRakeback: number
  color: string
  bgColor: string
  textColor: string
  glowColor: string
}

// Enhanced rakeback tiers with colors
const ranks: Rank[] = [
  {
    level: "Iron",
    threshold: 1000,
    claimable: 3.0,
    rankReward: 0.3,
    activeRakeback: 0.2,
    color: "text-gray-400",
    bgColor: "from-gray-600/30 to-gray-700/30",
    textColor: "text-gray-300",
    glowColor: "shadow-gray-500/20",
  },
  {
    level: "Bronze",
    threshold: 2500,
    claimable: 7.5,
    rankReward: 0.3,
    activeRakeback: 0.25,
    color: "text-amber-600",
    bgColor: "from-amber-600/30 to-amber-700/30",
    textColor: "text-amber-300",
    glowColor: "shadow-amber-500/20",
  },
  {
    level: "Silver",
    threshold: 5000,
    claimable: 15.0,
    rankReward: 0.3,
    activeRakeback: 0.3,
    color: "text-gray-300",
    bgColor: "from-gray-400/30 to-gray-500/30",
    textColor: "text-gray-200",
    glowColor: "shadow-gray-400/20",
  },
  {
    level: "Gold",
    threshold: 10000,
    claimable: 30.0,
    rankReward: 0.3,
    activeRakeback: 0.35,
    color: "text-yellow-400",
    bgColor: "from-yellow-500/30 to-yellow-600/30",
    textColor: "text-yellow-300",
    glowColor: "shadow-yellow-500/20",
  },
  {
    level: "Platinum",
    threshold: 15000,
    claimable: 45.0,
    rankReward: 0.3,
    activeRakeback: 0.4,
    color: "text-blue-300",
    bgColor: "from-blue-400/30 to-blue-500/30",
    textColor: "text-blue-200",
    glowColor: "shadow-blue-500/20",
  },
  {
    level: "Emerald",
    threshold: 25000,
    claimable: 75.0,
    rankReward: 0.3,
    activeRakeback: 0.45,
    color: "text-emerald-400",
    bgColor: "from-emerald-500/30 to-emerald-600/30",
    textColor: "text-emerald-300",
    glowColor: "shadow-emerald-500/20",
  },
  {
    level: "Diamond",
    threshold: 50000,
    claimable: 150.0,
    rankReward: 0.3,
    activeRakeback: 0.5,
    color: "text-cyan-400",
    bgColor: "from-cyan-500/30 to-cyan-600/30",
    textColor: "text-cyan-300",
    glowColor: "shadow-cyan-500/20",
  },
  {
    level: "Blood Diamond",
    threshold: 75000,
    claimable: 225.0,
    rankReward: 0.3,
    activeRakeback: 0.55,
    color: "text-red-400",
    bgColor: "from-red-500/30 to-red-600/30",
    textColor: "text-red-300",
    glowColor: "shadow-red-500/20",
  },
  {
    level: "Obsidian",
    threshold: 100000,
    claimable: 300.0,
    rankReward: 0.3,
    activeRakeback: 0.6,
    color: "text-purple-400",
    bgColor: "from-purple-500/30 to-purple-600/30",
    textColor: "text-purple-300",
    glowColor: "shadow-purple-500/20",
  },
  {
    level: "Imperial",
    threshold: 150000,
    claimable: 450.0,
    rankReward: 0.3,
    activeRakeback: 0.65,
    color: "text-orange-400",
    bgColor: "from-orange-500/30 to-orange-600/30",
    textColor: "text-orange-300",
    glowColor: "shadow-orange-500/20",
  },
  {
    level: "Ascendent",
    threshold: 200000,
    claimable: 600.0,
    rankReward: 0.3,
    activeRakeback: 0.7,
    color: "text-pink-400",
    bgColor: "from-pink-500/30 to-pink-600/30",
    textColor: "text-pink-300",
    glowColor: "shadow-pink-500/20",
  },
]

export function EnhancedRakebackSystem() {
  const { user, isLoading } = useAuth()
  const [cashoutLoading, setCashoutLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)

  // Cashout handler (demo version)
  const handleCashout = async () => {
    if (!user || user.rakebackEarned <= 0) return
    setCashoutLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would call an API endpoint
      setCashoutLoading(false)
    }, 1500)
  }

  // Claim handler (demo version)
  const handleClaim = async () => {
    if (!user) return
    setClaimLoading(true)

    // Simulate API call
    setTimeout(() => {
      setClaimLoading(false)
    }, 1500)
  }

  if (isLoading || !user) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl p-8 animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  // Calculate current rank based on total wagered
  const getCurrentRankIndex = (wagered: number) => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (wagered >= ranks[i].threshold) {
        return i
      }
    }
    return -1
  }

  // Ensure user and its properties are defined before accessing them
  const currentRankIndex = user && user.totalWagered ? getCurrentRankIndex(user.totalWagered) : -1
  const currentTier = currentRankIndex >= 0 ? ranks[currentRankIndex] : null
  const nextTier = currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null

  // If user hasn't reached Iron tier yet
  if (!currentTier) {
    return (
      <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Start Your Rakeback Journey</h3>
            <p className="text-gray-400">
              Reach <span className="text-cyan-400 font-bold">Iron</span> rank by wagering at least{" "}
              <span className="text-yellow-400 font-bold">1,000</span> coins to unlock rakeback rewards!
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-8 py-3">
            Start Wagering
          </Button>
        </CardContent>
      </Card>
    )
  }

  const progressToNext =
    nextTier && user && user.totalWagered
      ? ((user.totalWagered - currentTier.threshold) / (nextTier.threshold - currentTier.threshold)) * 100
      : 0

  // Calculate claimable rakeback based on tier
  const claimableRakeback = currentTier ? currentTier.claimable : 0

  return (
    <div className="space-y-8">
      {/* Current Tier Status */}
      <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 overflow-hidden relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentTier.bgColor} opacity-50`}></div>
        <CardContent className="p-8 relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentTier.bgColor} border-2 border-gray-700 flex items-center justify-center ${currentTier.glowColor} shadow-2xl`}
                >
                  <Image
                    src={`/images/tiers/${currentTier.level.toLowerCase().replace(/ /g, "-")}.png`}
                    alt={currentTier.level}
                    width={48}
                    height={48}
                    className="drop-shadow-lg"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1 animate-pulse">
                  <Crown className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className={`text-3xl font-bold ${currentTier.color}`}>{currentTier.level}</h2>
                  <div className="px-3 py-1 bg-gray-800/50 rounded-full border border-cyan-500/30">
                    <span className="text-cyan-400 text-sm font-semibold">{currentTier.activeRakeback}% Rakeback</span>
                  </div>
                </div>
                <p className="text-gray-400 flex items-center gap-1">
                  <CoinIcon className="mb-0.5" />
                  {user.totalWagered.toLocaleString()} / {currentTier.threshold.toLocaleString()} wagered
                </p>

                {nextTier && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress to {nextTier.level}</span>
                      <span className="text-white font-semibold">{progressToNext.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressToNext} className="h-2 bg-gray-800" />
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <CoinIcon size={12} className="mb-0.5" />
                      {(nextTier.threshold - user.totalWagered).toLocaleString()} to next tier
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rakeback Tiers Showcase */}
      <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 overflow-hidden">
        <CardContent className="p-6" style={{ paddingBottom: "32px" }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              Rakeback Tiers
            </h3>
            <div className="text-sm text-gray-400">Scroll to view all tiers →</div>
          </div>

          <div
            className="overflow-x-auto pt-6 pb-4 px-2"
            style={{ minHeight: "260px", overflowY: "visible" }}
          >
            <div className="inline-flex gap-4" style={{ minHeight: "260px" }}>
              {ranks.map((tier, idx) => {
                const reached = user.totalWagered >= tier.threshold;
                const isCurrent = idx === currentRankIndex;
                return (
                  <div
                    key={tier.level}
                    className={`relative flex flex-col items-center p-6 rounded-2xl border-2 min-w-[160px] transition-all duration-500 hover:scale-105 ${
                      isCurrent
                        ? `border-cyan-400 bg-gradient-to-br ${tier.bgColor} scale-105 ${tier.glowColor} shadow-2xl`
                        : reached
                        ? `border-green-500/50 bg-gradient-to-br ${tier.bgColor} hover:${tier.glowColor} hover:shadow-xl`
                        : "border-gray-700 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/60"
                    }`}
                    style={{ overflow: "visible", transformOrigin: "center" }}
                  >
                    {/* Tier Image */}
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.bgColor} border border-gray-600 flex items-center justify-center ${tier.glowColor} shadow-lg`}
                      >
                        <Image
                          src={`/images/tiers/${tier.level.toLowerCase().replace(/ /g, "-")}.png`}
                          alt={tier.level}
                          width={40}
                          height={40}
                          className="drop-shadow-lg"
                        />
                      </div>
                      {isCurrent && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse border-2 border-white z-10"></div>
                      )}
                      {reached && !isCurrent && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white z-10">
                          <Star className="h-2 w-2 text-white absolute top-0.5 left-0.5" />
                        </div>
                      )}
                    </div>

                    {/* Tier Info */}
                    <div className="text-center space-y-2">
                      <h4 className={`font-bold text-lg ${tier.color}`}>{tier.level}</h4>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                          <CoinIcon size={12} className="mb-0.5" />
                          {tier.threshold.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-center gap-1">
                          <CoinIcon size={12} className="text-yellow-400" />
                          <span className="text-sm font-bold text-yellow-400">+{tier.claimable}</span>
                        </div>
                        <div className="px-2 py-1 bg-cyan-900/30 rounded-full border border-cyan-500/30">
                          <span className="text-xs text-cyan-400 font-semibold">{tier.activeRakeback}% RB</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      {isCurrent && (
                        <div className="px-3 py-1 text-xs bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full animate-pulse shadow-lg">
                          Current
                        </div>
                      )}
                      {reached && !isCurrent && (
                        <div className="px-3 py-1 text-xs bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg">
                          Unlocked
                        </div>
                      )}
                      {!reached && (
                        <div className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">Locked</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rakeback Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Claimable Rakeback - Styled like tier showcase */}
        <div
          className={`relative flex flex-col items-center p-8 rounded-2xl border-2 transition-all duration-500 hover:scale-105 border-purple-500/50 bg-gradient-to-br ${currentTier.bgColor} ${currentTier.glowColor} shadow-2xl group`}
        >
          {/* Tier Image */}
          <div className="relative mb-6">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentTier.bgColor} border-2 border-purple-500/50 flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/30`}
            >
              <Image
                src={`/images/tiers/${currentTier.level.toLowerCase().replace(/ /g, "-")}.png`}
                alt={currentTier.level}
                width={48}
                height={48}
                className="drop-shadow-lg"
              />
            </div>
            <div className="absolute -top-2 -right-2 p-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse">
              <Gift className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Tier Info */}
          <div className="text-center space-y-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Claimable Rakeback</h3>
              <p className="text-sm text-gray-400">One-time {currentTier.level} tier reward</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CoinIcon size={24} className="text-yellow-400" />
                <span className="text-4xl font-bold text-yellow-400">{claimableRakeback}</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span className="text-sm text-yellow-400">Ready to claim!</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 py-3"
            disabled={claimLoading}
            onClick={handleClaim}
          >
            {claimLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Claim {currentTier.level} Reward
              </div>
            )}
          </Button>

          {/* Status Badge */}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="px-4 py-1 text-xs bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-lg border-2 border-white/20">
              {currentTier.level} Tier
            </div>
          </div>
        </div>

        {/* Active Rakeback - Enhanced */}
        <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 hover:border-cyan-500/50 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-green-500/10 opacity-50"></div>
          <CardContent className="p-8 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-green-500 shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Active Rakeback</h3>
                <p className="text-sm text-gray-400">Earned from wagering activity</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                  <CoinIcon size={24} className="text-green-400" />
                  <span className="text-4xl font-bold text-green-400">{user.rakebackEarned.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-400">From {currentTier.activeRakeback}% rakeback rate</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rakeback Rate:</span>
                  <span className="text-cyan-400 font-semibold">{currentTier.activeRakeback}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Wagered:</span>
                  <span className="text-white font-semibold flex items-center gap-1">
                    <CoinIcon size={14} className="mb-0.5" />
                    {user.totalWagered.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Available:</span>
                  <span className="text-green-400 font-semibold flex items-center gap-1">
                    <CoinIcon size={14} className="mb-0.5" />
                    {user.rakebackEarned.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 py-3"
                disabled={!user || user.rakebackEarned <= 0 || cashoutLoading}
                onClick={handleCashout}
              >
                {cashoutLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Cashout...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Cashout <CoinIcon size={16} className="mx-0.5" /> {user ? user.rakebackEarned.toFixed(2) : "0.00"}
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
