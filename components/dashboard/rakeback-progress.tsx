import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap } from "lucide-react"

export function RakebackProgress() {
  // This would normally come from your API
  const rakeback = {
    currentTier: "5%",
    nextTier: "7.5%",
    progress: 65,
    amountToNext: 1000,
    currentWagered: 1166.39,
    nextTierThreshold: 2500,
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Rakeback Progress</CardTitle>
        <p className="text-sm text-gray-400">Progress to your next rakeback tier</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500/20 p-2 rounded-lg">
              <Zap className="h-4 w-4 text-cyan-400" />
            </div>
            <span className="text-sm">Current: {rakeback.currentTier}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <Zap className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-sm">Next: {rakeback.nextTier}</span>
          </div>
        </div>

        <Progress
          value={rakeback.progress}
          className="h-2 bg-gray-800"
          style={{ background: "linear-gradient(to right, #06b6d4, #a855f7)" }}
        />

        <div className="mt-4 text-sm text-gray-400">
          <p>
            Wager ${rakeback.amountToNext.toLocaleString()} more to reach {rakeback.nextTier} rakeback
          </p>
          <div className="flex justify-between mt-2 text-xs">
            <span>${rakeback.currentWagered.toLocaleString()}</span>
            <span>${rakeback.nextTierThreshold.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
