import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Sample data for the leaderboard
const topPlayers = [
  {
    id: 1,
    username: "emotion",
    avatar: "/placeholder.svg",
    wagered: 21563.2,
    coins: 4312,
    rank: 1,
  },
  {
    id: 2,
    username: "Koahla",
    avatar: "/placeholder.svg",
    wagered: 18045.53,
    coins: 3609,
    rank: 2,
  },
  {
    id: 3,
    username: "Djop",
    avatar: "/placeholder.svg",
    wagered: 6294.96,
    coins: 1258,
    rank: 3,
  },
]

export function LeaderboardPreview() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Players</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The highest wagering players earn the most Measter Coins and exclusive rewards. Will you make it to the top?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPlayers.map((player) => (
            <Card
              key={player.id}
              className={`bg-gray-900/50 border-gray-800 overflow-hidden relative ${
                player.rank === 1
              }`}
            >
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={player.avatar} alt={player.username} />
                    <AvatarFallback>{player.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold">{player.username}</p>
                    <p className="text-sm text-gray-400">Wagered: ${player.wagered.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
