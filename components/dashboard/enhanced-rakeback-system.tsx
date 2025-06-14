
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
const ranks: Rank[] = [/* your original ranks config stays unchanged here */]

export function EnhancedRakebackSystem() {
  const { user, isLoading } = useAuth()
  const [cashoutLoading, setCashoutLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)

  const handleCashout = async () => {
    if (!user || user.rakebackEarned <= 0) return
    setCashoutLoading(true)
    setTimeout(() => setCashoutLoading(false), 1500)
  }

  const handleClaim = async () => {
    if (!user) return
    setClaimLoading(true)
    setTimeout(() => setClaimLoading(false), 1500)
  }

  const getCurrentRankIndex = (wagered: number) => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (wagered >= ranks[i].threshold) return i
    }
    return -1
  }

  const currentRankIndex = user && user.totalWagered ? getCurrentRankIndex(user.totalWagered) : -1
  const currentTier = currentRankIndex >= 0 ? ranks[currentRankIndex] : null
  const nextTier = currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : null

  const progressToNext = nextTier && user && user.totalWagered
    ? ((user.totalWagered - currentTier!.threshold) / (nextTier.threshold - currentTier!.threshold)) * 100
    : 0

  const claimableRakeback = currentTier ? currentTier.claimable : 0

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
              Reach <span className="text-cyan-400 font-bold">Iron</span> rank by wagering at least <span className="text-yellow-400 font-bold">1,000</span> coins to unlock rakeback rewards!
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 px-8 py-3">Start Wagering</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Current Tier Card (no change) */}
      {/* ...retain full Current Tier Status Card code here... */}

      {/* Updated Tier Showcase UI */}
      <Card className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 overflow-hidden">
        <CardContent className="p-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              Rakeback Tiers
            </h3>
            <div className="text-sm text-gray-400">Scroll to view all tiers →</div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-[1200px] pb-4">
              {ranks.map((tier, idx) => {
                const reached = user.totalWagered >= tier.threshold
                const isCurrent = idx === currentRankIndex

                return (
                  <div
                    key={tier.level}
                    className={`relative flex flex-col items-center p-6 rounded-2xl border-2 min-w-[160px] h-[300px] transition-all duration-500 hover:scale-105 overflow-hidden
                      ${isCurrent
                        ? `border-cyan-400 bg-gradient-to-br ${tier.bgColor} scale-105 ${tier.glowColor} shadow-2xl`
                        : reached
                          ? `border-green-500/50 bg-gradient-to-br ${tier.bgColor} hover:${tier.glowColor} hover:shadow-xl`
                          : "border-gray-700 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/60"}
                    `}
                  >
                    {(isCurrent || reached) && (
                      <div className="absolute top-2 right-2">
                        <div className={`px-2 py-0.5 text-[10px] font-semibold rounded-full shadow-md whitespace-nowrap
                          ${isCurrent
                            ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white animate-pulse'
                            : 'bg-green-600 text-white'}
                        `}>
                          {isCurrent ? 'Current' : 'Unlocked'}
                        </div>
                      </div>
                    )}

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
                    </div>

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

                    {!reached && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">Locked</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rakeback Actions section can remain unchanged unless you want styling help there too */}
    </div>
  )
}
