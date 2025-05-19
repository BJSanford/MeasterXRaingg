import { Card, CardContent } from "@/components/ui/card"
import { Coins, DollarSign, Zap } from "lucide-react"

export function DashboardStats() {
  // This would normally come from your API
  const stats = {
    totalWagered: 1166.39,
    currentRakeback: 5,
    rakebackEarned: 0,
    measterCoins: 0,
    allTimeDeposited: 2500,
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <DollarSign className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Wagered</p>
            <p className="text-xl font-bold">${stats.totalWagered.toLocaleString()}</p>
            <p className="text-xs text-gray-500">All time</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-cyan-500/20 p-3 rounded-lg">
            <Zap className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Current Rakeback</p>
            <p className="text-xl font-bold">{stats.currentRakeback}%</p>
            <p className="text-xs text-gray-500">This month</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 transition-all">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-yellow-500/20 p-3 rounded-lg">
            <DollarSign className="h-5 w-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">All Time Deposited</p>
            <p className="text-xl font-bold">${stats.allTimeDeposited.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total deposits</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
