"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, Trophy, Zap } from "lucide-react"

// Helper to format large numbers
const formatNumber = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M"
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K"
  return num.toLocaleString()
}

export function TopPlayers({ topPlayers }: { topPlayers: any[] }) {
  const podiumPositions = [
    { rank: 2, icon: <Star className="h-5 w-5 text-slate-300" />, color: "slate", name: "Silver" },
    { rank: 1, icon: <Trophy className="h-6 w-6 text-yellow-400" />, color: "yellow", name: "Gold" },
    { rank: 3, icon: <Zap className="h-5 w-5 text-amber-600" />, color: "amber", name: "Bronze" },
  ]

  const rankColorClasses: {
    [key: string]: { border: string; bg: string; text: string; shadow: string; badge: string; avatarRing: string }
  } = {
    yellow: {
      border: "border-yellow-400",
      bg: "bg-yellow-500/10",
      text: "text-yellow-300",
      shadow: "shadow-[0_0_30px_5px_rgba(250,204,21,0.5)] hover:shadow-[0_0_45px_10px_rgba(250,204,21,0.7)]",
      badge: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black",
      avatarRing: "ring-yellow-400",
    },
    slate: {
      border: "border-slate-400",
      bg: "bg-slate-500/10",
      text: "text-slate-300",
      shadow: "shadow-[0_0_20px_3px_rgba(148,163,184,0.4)] hover:shadow-[0_0_30px_7px_rgba(148,163,184,0.6)]",
      badge: "bg-gradient-to-br from-slate-300 to-slate-500 text-black",
      avatarRing: "ring-slate-400",
    },
    amber: {
      border: "border-amber-600",
      bg: "bg-amber-600/10",
      text: "text-amber-400",
      shadow: "shadow-[0_0_20px_3px_rgba(217,119,6,0.4)] hover:shadow-[0_0_30px_7px_rgba(217,119,6,0.6)]",
      badge: "bg-gradient-to-br from-amber-500 to-amber-700 text-white",
      avatarRing: "ring-amber-600",
    },
  }

  if (!topPlayers || !Array.isArray(topPlayers) || topPlayers.length === 0) {
    return (
      <div className="py-12 text-center">
        <Trophy className="mx-auto h-12 w-12 text-gray-600" />
        <p className="mt-4 text-lg font-semibold text-gray-400">Leaderboard data is currently unavailable.</p>
        <p className="text-sm text-gray-500">Check back soon for updates!</p>
      </div>
    )
  }

  return (
    // The main wrapper no longer contains the title/subtitle
    <div className="py-12 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* The h2 and p tags have been removed from here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-end">
          {podiumPositions.map((positionStyle) => {
            const player = topPlayers.find((p) => p.rank === positionStyle.rank) || topPlayers[positionStyle.rank - 1]

            if (!player)
              return (
                <div
                  key={`empty-${positionStyle.rank}`}
                  className={`p-6 rounded-xl border-2 border-dashed border-gray-700 text-center 
                    ${positionStyle.rank === 1 ? "md:order-2" : positionStyle.rank === 2 ? "md:order-1" : "md:order-3"}`}
                >
                  <p className="text-gray-500">Position #{positionStyle.rank} Unclaimed</p>
                </div>
              )

            const { username = `Player ${player.rank || positionStyle.rank}`, wagered = 0, prize = 0 } = player
            const avatarSrc =
              player.avatar?.rain || player.avatar?.large || player.avatar?.medium || player.avatar?.small || `/placeholder.svg?width=128&height=128&text=${username.charAt(0)}`
            const displayUsername =
              username.length === 1
                ? username + "*"
                : username.substring(0, 2) + "*".repeat(Math.max(0, username.length - 2))
            const colors = rankColorClasses[positionStyle.color]

            return (
              <div
                key={player.id || username + positionStyle.rank}
                className={`group relative rounded-xl border-2 p-6 pt-12 transition-all duration-300 ease-out
                  ${colors.border} ${colors.bg} ${colors.shadow}
                  ${positionStyle.rank === 1 ? "md:order-2 md:scale-110 md:-translate-y-8 z-20" : positionStyle.rank === 2 ? "md:order-1" : "md:order-3"}
                  hover:scale-105 md:hover:!scale-115 hover:z-30 transform-gpu 
                `}
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  <div
                    className={
                      "absolute -top-1/2 -left-1/2 h-[200%] w-[200%] bg-gradient-to-br from-transparent via-white/20 to-transparent " +
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shine-custom group-hover:animate-none"
                    }
                    style={{
                      animationName: "shineEffect",
                      animationDuration: "1.2s",
                      animationIterationCount: "1",
                      animationTimingFunction: "ease-out",
                      transform: "translateX(-100%) rotate(-20deg)",
                    }}
                  />
                </div>

                <Badge
                  className={`absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-2 text-sm font-bold rounded-full border-2 
                            ${colors.border} ${colors.badge} shadow-lg z-30`}
                >
                  <span className="mr-2">{positionStyle.icon}</span>#{player.rank || positionStyle.rank}
                </Badge>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <Avatar
                    className={`h-24 w-24 md:h-28 md:w-28 mb-4 ring-4 ${colors.avatarRing} ring-offset-4 ring-offset-gray-900 
                              transition-transform duration-300 group-hover:scale-110 mt-4`}
                  >
                    <AvatarImage src={avatarSrc || "/placeholder.svg"} alt={displayUsername} />
                    <AvatarFallback className={`${colors.bg} ${colors.text} font-bold text-3xl`}>
                      {displayUsername.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3
                    className={`text-2xl md:text-3xl font-bold mb-1 truncate max-w-full px-2 ${colors.text} transition-colors group-hover:text-white`}
                  >
                    {displayUsername}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 group-hover:text-gray-300"></p>
                  <div className="w-full space-y-4">
                    <div
                      className={`bg-black/50 p-3 rounded-lg border border-gray-700/50 group-hover:border-${positionStyle.color}-500/50 transition-colors`}
                    >
                      <p className="text-xs text-gray-400 mb-1">WAGERED</p>
                      <div className="flex items-center justify-center text-lg font-semibold text-cyan-400 group-hover:text-cyan-300">
                        <Image
                          src="/coin.png"
                          alt="Coin"
                          width={20}
                          height={20}
                          className="mr-2 filter group-hover:brightness-110 transition-all"
                          unoptimized
                        />
                        {formatNumber(wagered)}
                      </div>
                    </div>
                    <div
                      className={`bg-black/50 p-3 rounded-lg border border-gray-700/50 group-hover:border-${positionStyle.color}-500/50 transition-colors`}
                    >
                      <p className="text-xs text-gray-400 mb-1">PRIZE</p>
                      <div className="flex items-center justify-center text-lg font-semibold text-yellow-400 group-hover:text-yellow-300">
                        <Image
                          src="/coin.png"
                          alt="Coin"
                          width={20}
                          height={20}
                          className="mr-2 filter group-hover:brightness-110 transition-all"
                          unoptimized
                        />
                        {formatNumber(prize)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style jsx global>{`
        @keyframes shineEffect {
          0% { transform: translateX(-150%) rotate(-20deg); opacity: 0; }
          50% { transform: translateX(0%) rotate(-20deg); opacity: 0.15; }
          100% { transform: translateX(150%) rotate(-20deg); opacity: 0; }
        }
        .group:hover .animate-shine-custom {
          animation: shineEffect 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
