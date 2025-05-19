import { Progress } from "@/components/ui/progress"

export function RakebackTiers() {
  const tiers = [
    { level: "Bronze", percentage: "5%", threshold: "$1,000+", active: true },
    { level: "Silver", percentage: "7.5%", threshold: "$2,500+", active: false },
    { level: "Gold", percentage: "10%", threshold: "$5,000+", active: false },
    { level: "Platinum", percentage: "12.5%", threshold: "$10,000+", active: false },
    { level: "Diamond", percentage: "15%", threshold: "$25,000+", active: false },
  ]

  return (
    <div className="space-y-4">
      {tiers.map((tier, index) => (
        <div
          key={tier.level}
          className={`p-3 rounded-lg border ${
            tier.active ? "bg-gray-800/70 border-purple-500/50" : "bg-gray-900/50 border-gray-800"
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${tier.active ? "bg-purple-500" : "bg-gray-700"}`}></div>
              <span className="font-medium">{tier.level}</span>
            </div>
            <span className={`font-bold ${tier.active ? "text-purple-400" : "text-gray-400"}`}>{tier.percentage}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Wager {tier.threshold}</span>
            {tier.active && <span>Your current tier</span>}
          </div>
          {index < tiers.length - 1 && (
            <div className="mt-2">
              <Progress
                value={tier.active ? 65 : 0}
                className="h-1 bg-gray-800"
                indicatorClassName={tier.active ? "bg-gradient-to-r from-purple-600 to-cyan-600" : ""}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
