import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trophy, Calendar } from "lucide-react"
import Link from "next/link"

export function LeaderboardHeader({ startDate }: { startDate: string }) {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
              WEEKLY RACE
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-text">
            Measter Leaderboard
          </h1>
          <p className="text-gray-400 mt-2">
            Compete for prizes using the <span className="text-cyan-400 font-semibold">MEASTER</span> code
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Start Date</p>
              <p className="font-medium text-white">{startDate}</p>
              <p className="text-xs text-gray-500">Race begins</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Trophy className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Prize Pool</p>
              <div className="flex items-center">
                <img src="/coin.png" alt="Coin" width={20} height={20} className="w-5 h-5 mr-1" />
                <p className="font-medium text-white">1,250</p>
              </div>
              <p className="text-xs text-gray-500">Total for top 8</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
