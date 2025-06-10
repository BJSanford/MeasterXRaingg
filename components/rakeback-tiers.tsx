import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function RakebackTiers() {
  const tiers = [
    { level: "Iron", threshold: "1,000", coins: 5, color: "gray", img: "/images/iron.png" },
    { level: "Bronze", threshold: "2,500", coins: 12.5, color: "amber", img: "/images/bronze.png" },
    { level: "Silver", threshold: "5,000", coins: 25, color: "slate", img: "/images/silver.png" },
    { level: "Gold", threshold: "10,000", coins: 50, color: "yellow", img: "/images/gold.png" },
    { level: "Platinum", threshold: "15,000", coins: 75, color: "purple", img: "/images/platinum.png" },
    { level: "Emerald", threshold: "25,000", coins: 125, color: "emerald", img: "/images/emerald.png" },
    { level: "Diamond", threshold: "50,000", coins: 250, color: "cyan", img: "/images/diamond.png" },
    { level: "Blood Diamond", threshold: "75,000", coins: 375, color: "rose", img: "/images/blood-diamond.png" },
    { level: "Obsidian", threshold: "100,000", coins: 500, color: "slate", img: "/images/obsidian.png" },
    { level: "Imperial", threshold: "150,000", coins: 750, color: "amber", img: "/images/imperial.png" },
    { level: "Ascendent", threshold: "200,000", coins: 1000, color: "fuchsia", img: "/images/ascendent.png" },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 p-4 rounded-lg mb-6">
        <p className="text-center text-sm text-gray-300">
          This is a showcase of our rakeback system. Connect your Rain.gg account to view your personal tier and
          progress.
        </p>
      </div>

      <div className="space-y-4">
        {tiers.map((tier, index) => (
          <div
            key={tier.level}
            className={`p-4 rounded-lg border transition-all hover:border-${tier.color}-500/50 ${
              index === 0
                ? "bg-gradient-to-r from-gray-800/70 to-gray-700/50 border-gray-500/50"
                : "bg-gray-900/50 border-gray-800"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${tier.color}-500`}></div>
                <Image
                  src={tier.img}
                  alt={tier.level}
                  width={32}
                  height={32}
                  className="inline-block mr-2"
                />
                <span className="font-medium text-lg">{tier.level}</span>
                {index === 0 && (
                  <span className="px-2 py-0.5 text-xs bg-gray-500/30 text-gray-300 rounded-full">Entry Tier</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Rakeback:</span>
                <span className="font-bold text-cyan-400">0.5%</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Wager:</span>
                <span className="text-white flex items-center">
                  <Image src="/coin.png" alt="coin" width={16} height={16} className="inline-block mr-1" />
                  {tier.threshold}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Coins:</span>
                <span className="text-yellow-400 font-bold">{tier.coins}</span>
              </div>
            </div>

            {index < tiers.length - 1 && (
              <div className="mt-3">
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
        <div className="text-center text-gray-400 text-sm">
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
