import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Zap } from "lucide-react"

export function DashboardStats() {
  const { user } = useAuth()
  const totalWagered = user?.totalWagered || 0
  const allTimeDeposited = user?.totalDeposited || 0
  const currentRakeback = user && user.totalWagered >= 1000
    ? getRakebackPercent(user.totalWagered)
    : null

  function getRakebackPercent(wagered: number) {
    if (wagered >= 200000) return 0.7
    if (wagered >= 150000) return 0.65
    if (wagered >= 100000) return 0.6
    if (wagered >= 75000) return 0.55
    if (wagered >= 50000) return 0.5
    if (wagered >= 25000) return 0.45
    if (wagered >= 15000) return 0.4
    if (wagered >= 10000) return 0.35
    if (wagered >= 5000) return 0.3
    if (wagered >= 2500) return 0.25
    if (wagered >= 1000) return 0.2
    return null
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
            <div className="flex items-center gap-1">
              <img src="/coin.png" alt="coin" className="h-4 w-4" />
              <p className="text-xl font-bold text-white">{totalWagered.toLocaleString()}</p>
            </div>
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
            {currentRakeback !== null ? (
              <p className="text-xl font-bold text-white">{(currentRakeback * 100).toFixed(2)}%</p>
            ) : (
              <p className="text-xl font-bold text-white">-</p>
            )}
            <p className="text-xs text-gray-500">{currentRakeback !== null ? "Active" : ""}</p>
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
            <div className="flex items-center gap-1">
              <img src="/coin.png" alt="coin" className="h-4 w-4" />
              <p className="text-xl font-bold text-white">{allTimeDeposited.toLocaleString()}</p>
            </div>
            <p className="text-xs text-gray-500">Total deposits</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
