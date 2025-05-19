"use client"

import { useEffect, useState, useCallback } from "react"
import { fetchLeaderboard } from "@/lib/server-api"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Timer } from "lucide-react"
import Image from "next/image"

const payouts = [500, 250, 150, 50, 20, 15, 10, 5]
const prizePool = payouts.reduce((a, b) => a + b, 0)
const coinImg = "/coin.png"

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [raceInfo, setRaceInfo] = useState({
    startDate: "",
    endDate: "",
    timeLeft: "",
  })

  const updateTimeLeft = useCallback(() => {
    if (!raceInfo.endDate) return
    const now = Date.now()
    const end = new Date(raceInfo.endDate).getTime()
    if (isNaN(end)) {
      setRaceInfo((prev) => ({ ...prev, timeLeft: "Invalid date" }))
      return
    }
    const timeLeft = end - now
    if (timeLeft <= 0) {
      setRaceInfo((prev) => ({ ...prev, timeLeft: "Race Ended" }))
      return
    }
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
    setRaceInfo((prev) => ({
      ...prev,
      timeLeft: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    }))
  }, [raceInfo.endDate])

  useEffect(() => {
    loadLeaderboard()
    let timer: NodeJS.Timeout | undefined
    if (raceInfo.endDate) {
      timer = setInterval(updateTimeLeft, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [raceInfo.endDate, updateTimeLeft])

  async function loadLeaderboard() {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchLeaderboard()
      if (!data || !data.results) {
        setError("No data available. Please try again later.")
        setLeaderboard([])
        return
      }

      setLeaderboard(data.results)

      if (data.race) {
        const startDate = new Date(data.race.starts_at)
        setRaceInfo({
          startDate: startDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          }),
          endDate: data.race.ends_at,
          timeLeft: "",
        })
      }
    } catch (err) {
      console.error("Error loading race data:", err)
      setError("Failed to load race data. Please try again later.")
      setLeaderboard([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardHeader>
              <CardTitle>Start Date</CardTitle>
              <CardDescription>Race begins</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{raceInfo.startDate}</p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardHeader>
              <CardTitle>Time Remaining</CardTitle>
              <CardDescription>Until race ends</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium flex items-center gap-2">
                <Timer className="h-4 w-4" />
                {raceInfo.timeLeft || "Calculating..."}
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardHeader>
              <CardTitle>Prize Pool</CardTitle>
              <CardDescription>Total for top 8</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium flex items-center gap-1">
                <Image src={coinImg} alt="Coin" width={24} height={24} className="inline-block mr-1" />
                {prizePool}
              </p>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <p>Loading leaderboard...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            {/* Render leaderboard data */}
          </div>
        )}
      </main>
    </div>
  )
}
