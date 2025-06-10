import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function RakebackTiers() {
  // Standardized image filenames (all lowercase, hyphens)
  const tiers = [
    { level: "Iron", threshold: "$1,000", coins: 5, color: "gray", image: "/images/tiers/iron.png" },
    { level: "Bronze", threshold: "$2,500", coins: 12.5, color: "amber", image: "/images/tiers/bronze.png" },
    { level: "Silver", threshold: "$5,000", coins: 25, color: "slate", image: "/images/tiers/silver.png" },
    { level: "Gold", threshold: "$10,000", coins: 50, color: "yellow", image: "/images/tiers/gold.png" },
    { level: "Platinum", threshold: "$15,000", coins: 75, color: "purple", image: "/images/tiers/platinum.png" },
    { level: "Emerald", threshold: "$25,000", coins: 125, color: "emerald", image: "/images/tiers/emerald.png" },
    { level: "Diamond", threshold: "$50,000", coins: 250, color: "cyan", image: "/images/tiers/diamond.png" },
    { level: "Blood Diamond", threshold: "$75,000", coins: 375, color: "rose", image: "/images/tiers/blood-diamond.png" },
    { level: "Obsidian", threshold: "$100,000", coins: 500, color: "slate", image: "/images/tiers/obsidian.png" },
    { level: "Imperial", threshold: "$150,000", coins: 750, color: "amber", image: "/images/tiers/imperial.png" },
    { level: "Ascendent", threshold: "$200,000", coins: 1000, color: "fuchsia", image: "/images/tiers/ascendent.png" },
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
          This is a showcase of our rakeback system. Connect your Rain.gg account to view your personal tier and
          progress.
        </p>
      </div>

      <div className="space-y-4 xs:space-y-2">
        {tiers.map((tier, index) => (
          <div
            key={tier.level}
            className={`p-4 rounded-lg border transition-all hover:border-${tier.color}-500/50 ${
              index === 0
                ? "bg-gradient-to-r from-gray-800/70 to-gray-700/50 border-gray-500/50"
                : "bg-gray-900/50 border-gray-800"
            } xs:p-2 xs:rounded-md`}
          >
            <div className="flex justify-between items-center mb-2 xs:flex-col xs:items-start xs:gap-1 xs:mb-1">
              <div className="flex items-center gap-3 xs:gap-2">
                <Image
                  src={erroredImages[tier.level] ? "/placeholder.svg" : tier.image}
                  alt={`${tier.level} tier`}
                  width={24}
                  height={24}
                  className="w-6 h-6 xs:w-5 xs:h-5"
                  onError={() => handleImgError(tier.level)}
                  priority={index < 3}
                />
                <span className="font-medium text-lg xs:text-base">{tier.level}</span>
                {index === 0 && (
                  <span className="px-2 py-0.5 text-xs bg-gray-500/30 text-gray-300 rounded-full xs:px-1 xs:text-[10px]">Entry Tier</span>
                )}
              </div>
              <div className="flex items-center gap-2 xs:mt-1 xs:text-xs">
                <span className="text-sm text-gray-400 xs:text-xs">Rakeback:</span>
                <span className="font-bold text-cyan-400 xs:text-xs">0.5%</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 xs:flex-col xs:items-start xs:gap-1 xs:mb-1">
              <div className="flex items-center gap-2 xs:text-xs">
                <span className="text-sm text-gray-400 xs:text-xs">Wager:</span>
                <span className="text-white xs:text-xs">{tier.threshold}</span>
              </div>
              <div className="flex items-center gap-2 xs:text-xs">
                <span className="text-sm text-gray-400 xs:text-xs">Coins:</span>
                <span className="text-yellow-400 font-bold xs:text-xs">{tier.coins}</span>
              </div>
            </div>

            {index < tiers.length - 1 && (
              <div className="mt-3 xs:mt-2">
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${tier.color}-600 to-${tier.color}-400`}
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4">
        <div className="text-center text-gray-400 text-sm xs:text-xs">
          <p>View your current tier and track your personal progress in your dashboard</p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 w-full"
          asChild
        >
          <Link href="/dashboard">
            View Your Rakeback Progress
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
