import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trophy, Calendar } from "lucide-react"
import Link from "next/link"

export function LeaderboardHeader() {
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
        <Button
          className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
          asChild
        >
          <Link href="/previous-winners">View Previous Winners</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Start Date</p>
              <p className="font-medium text-white">May 14, 2025</p>
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
                <div className="w-4 h-4 mr-1">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="12" fill="#F7931A" />
                    <path
                      d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z"
                      fill="#F7931A"
                    />
                    <path
                      d="M14.55 10.8C14.7 9.9 14.1 9.45 13.2 9.15L13.5 7.95L12.75 7.8L12.45 9C12.3 8.85 12 8.85 11.85 8.85L12.15 7.65L11.4 7.5L11.1 8.7C10.95 8.7 10.8 8.7 10.65 8.55L9.6 8.4V9.15C9.6 9.15 10.2 9.15 10.2 9.3C10.35 9.3 10.35 9.6 10.35 9.6L9.9 11.4V11.55C9.9 11.55 9.75 11.7 9.6 11.7C9.45 11.7 9 11.7 9 11.7L9.15 12.45H10.35C10.5 12.45 10.65 12.45 10.8 12.45L10.5 13.65L11.25 13.8L11.55 12.6C11.7 12.6 11.85 12.6 12 12.75L11.7 13.95L12.45 14.1L12.75 12.9C13.95 13.05 14.85 12.75 15.15 11.7C15.45 10.8 15 10.35 14.55 10.8ZM13.8 11.55C13.65 12.15 12.6 12 12.15 11.85L12.45 10.65C12.9 10.8 13.95 10.8 13.8 11.55ZM13.05 9.9C12.9 10.5 12 10.35 11.7 10.2L12 9.15C12.3 9.3 13.2 9.3 13.05 9.9Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="font-medium text-white">1,000</p>
              </div>
              <p className="text-xs text-gray-500">Total for top 8</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
