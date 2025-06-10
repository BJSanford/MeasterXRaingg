import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function RakebackTiers() {
  // Standardized image filenames (all lowercase, hyphens)
  const tiers = [
    { level: "Iron", threshold: 1000, claimable: 3.00, rankReward: 0.3, activeRakeback: 0.2 },
    { level: "Bronze", threshold: 2500, claimable: 7.50, rankReward: 0.3, activeRakeback: 0.25 },
    { level: "Silver", threshold: 5000, claimable: 15.00, rankReward: 0.3, activeRakeback: 0.3 },
    { level: "Gold", threshold: 10000, claimable: 30.00, rankReward: 0.3, activeRakeback: 0.35 },
    { level: "Platinum", threshold: 15000, claimable: 45.00, rankReward: 0.3, activeRakeback: 0.4 },
    { level: "Emerald", threshold: 25000, claimable: 75.00, rankReward: 0.3, activeRakeback: 0.45 },
    { level: "Diamond", threshold: 50000, claimable: 150.00, rankReward: 0.3, activeRakeback: 0.5 },
    { level: "Blood Diamond", threshold: 75000, claimable: 225.00, rankReward: 0.3, activeRakeback: 0.55 },
    { level: "Obsidian", threshold: 100000, claimable: 300.00, rankReward: 0.3, activeRakeback: 0.6 },
    { level: "Imperial", threshold: 150000, claimable: 450.00, rankReward: 0.3, activeRakeback: 0.65 },
    { level: "Ascendent", threshold: 200000, claimable: 600.00, rankReward: 0.3, activeRakeback: 0.7 },
  ]

  // Helper to handle image error fallback
  const [erroredImages, setErroredImages] = useState<{ [key: string]: boolean }>({});

  const handleImgError = (level: string) => {
    setErroredImages((prev) => ({ ...prev, [level]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-4 rounded-lg mb-6">
        <p className="text-center text-sm text-gray-300 xs:text-xs xs:leading-tight">
          This is a <span className="font-bold text-cyan-400">showcase</span> of our rakeback system. The tiers below are for demonstration only and are not interactable. Connect your Rain.gg account in your dashboard to view and claim your real rewards.
        </p>
      </div>

      <div className="space-y-4 xs:space-y-2">
        {tiers.map((tier, index) => (
          <div
            key={tier.level}
            className={`p-4 rounded-lg border transition-all hover:border-cyan-500/50 ${
              index === 0
                ? "bg-gradient-to-r from-gray-800/70 to-gray-700/50 border-gray-500/50"
                : "bg-gray-900/50 border-gray-800"
            } sm:p-2 sm:rounded-md`}
          >
            {/* Responsive flex: always stack on mobile, more margin for badge and rakeback */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
              <div className="flex items-center gap-3 sm:gap-3">
                <Image
                  src={erroredImages[tier.level] ? "/placeholder.svg" : `/images/tiers/${tier.level.toLowerCase().replace(/ /g, '-')}.png`}
                  alt={`${tier.level} tier`}
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-6 sm:h-6"
                  onError={() => handleImgError(tier.level)}
                  priority={index < 3}
                />
                <span className="font-medium text-lg sm:text-lg text-base">{tier.level}</span>
                {index === 0 && (
                  <span className="px-2 py-0.5 text-xs bg-gray-500/30 text-gray-300 rounded-full ml-2 mt-0 sm:ml-2 sm:mt-0">Entry Tier</span>
                )}
              </div>
              {/* Rakeback always below on mobile, right on desktop */}
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2 sm:mt-0 text-xs sm:text-base">
                <span className="text-gray-400">Rank Reward: <span className="font-bold text-cyan-400">{tier.rankReward}%</span></span>
                <span className="text-gray-400">Active Rakeback: <span className="font-bold text-green-400">{tier.activeRakeback}%</span></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
              <div className="flex items-center gap-2 text-xs sm:text-base">
                <span className="text-gray-400">Wager Requirement:</span>
                <span className="text-white">{tier.threshold.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-base">
                <span className="text-gray-400">Claimable Coins:</span>
                <span className="text-yellow-400 font-bold">{tier.claimable}</span>
              </div>
            </div>

            {index === 0 && (
              <div className="text-xs text-gray-400 mt-2">
                <p>Wager {tier.threshold} coins to unlock this rank. You will be able to claim <span className="text-yellow-400 font-bold">{tier.claimable}</span> coins as a one-time reward. After reaching this rank, every wager you make earns <span className="font-bold text-green-400">{tier.activeRakeback}%</span> rakeback, redeemable at any time.</p>
              </div>
            )}
            {index !== 0 && (
              <div className="text-xs text-gray-400 mt-2">
                <p>Wager {tier.threshold} coins to unlock this rank. Claim <span className="text-yellow-400 font-bold">{tier.claimable}</span> coins instantly. Then, earn <span className="font-bold text-green-400">{tier.activeRakeback}%</span> rakeback on all future wagers, redeemable at any time.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="text-center text-gray-400 text-sm xs:text-xs">
          <p>This is a static showcase. To view your current tier and track your personal progress, visit your dashboard.</p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 w-full"
          asChild
        >
          <Link href="/dashboard">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
