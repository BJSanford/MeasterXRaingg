export function DynamicRakeback() {
  const tiers = [
    { name: "Bronze", threshold: 1000, percentage: 5 },
    { name: "Silver", threshold: 2500, percentage: 7.5 },
    { name: "Gold", threshold: 5000, percentage: 10 },
    { name: "Platinum", threshold: 10000, percentage: 12.5 },
    { name: "Diamond", threshold: 25000, percentage: 15 },
  ]

  const currentWagered = 3200 // Replace with actual user data
  const currentTier = tiers.find((tier) => currentWagered >= tier.threshold) || tiers[0]
  const nextTier = tiers.find((tier) => currentWagered < tier.threshold)

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Dynamic Rakeback</h2>
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">Your current tier:</p>
          <p className="text-lg font-bold text-purple-400">{currentTier.name}</p>
        </div>
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            style={{ width: `${(currentWagered / (nextTier?.threshold || currentWagered)) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>${currentTier.threshold.toLocaleString()}+</span>
          {nextTier && <span>${nextTier.threshold.toLocaleString()}+</span>}
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Earn <span className="font-bold text-cyan-400">{nextTier?.percentage || currentTier.percentage}%</span> rakeback by wagering{" "}
          <span className="font-bold text-cyan-400">${((nextTier?.threshold || 0) - currentWagered).toLocaleString()}</span> more.
        </p>
      </div>
    </section>
  )
}
