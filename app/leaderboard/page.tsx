"use client"

import { useEffect, useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { LeaderboardCountdown } from "@/components/leaderboard/leaderboard-countdown"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"

const PRIZE_DISTRIBUTION = [500, 250, 150, 50, 20, 15, 10, 5]; // Hardcoded prize distribution

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [raceInfo, setRaceInfo] = useState({
    startDate: "",
    endDate: "",
    timeLeft: "",
    prizePool: 0,
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
      const response = await fetch("/api/leaderboard")
      const data = await response.json()

      if (!data || !data.leaderboard) {
        setError("No data available. Please try again later.")
        setLeaderboard([])
        return
      }

      setLeaderboard(data.leaderboard.map((participant, index) => ({
        ...participant,
        prize: PRIZE_DISTRIBUTION[index] || 0, // Assign hardcoded prize
      })))

      if (data.startDate && data.endDate) {
        setRaceInfo({
          startDate: new Date(data.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          }),
          endDate: data.endDate,
          timeLeft: "",
          prizePool: data.prizePool || 0,
        })
      }
    } catch (err) {
      console.error("Error loading leaderboard data:", err)
      setError("Failed to load leaderboard data. Please try again later.")
      setLeaderboard([])
    } finally {
      setIsLoading(false)
    }
  }

  const topThree = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3, 15)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Background particles/stars effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.7,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
            }}
          />
        ))}
      </div>

      <Navbar />
      <main className="relative z-10 container mx-auto px-4 py-8">
        <LeaderboardHeader startDate={raceInfo.startDate} prizePool={raceInfo.prizePool} />
        <LeaderboardCountdown endDate={raceInfo.endDate} />
        {/* Replace the TopPlayers component with the updated layout */}
        <div className="flex justify-center items-end gap-8 mb-12">
          {topThree.map((player, index) => (
            <div
              key={player.username}
              className={`flex flex-col items-center ${
                index === 0 ? "scale-110 z-10" : "scale-100"
              }`}
            >
              <div
                className={`mb-4 ${
                  index === 0
                    ? "border-yellow-500"
                    : index === 1
                    ? "border-gray-400"
                    : "border-amber-700"
                } bg-gray-800 shadow-lg w-28 h-28 rounded-full flex items-center justify-center border-4`}
              >
                <img
                  src={player.avatar || "/placeholder.svg"}
                  alt={player.username}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <div className="text-lg font-bold">{player.username}</div>
              <div className="text-gray-400">
                {["1st Place", "2nd Place", "3rd Place"][index]}
              </div>
              <div className="text-cyan-400 text-xl font-bold">
                <img src="/coin.png" alt="coin" className="h-4 w-4 inline-block mr-1" />
                {player.wagered.toLocaleString()}
              </div>
              <div
                className={`rounded px-4 py-1 text-md font-bold ${
                  index === 0
                    ? "bg-yellow-400 text-black"
                    : index === 1
                    ? "bg-gray-400 text-black"
                    : "bg-orange-400 text-black"
                }`}
              >
                <img src="/coin.png" alt="coin" className="h-4 w-4 inline-block mr-1" />
                {player.prize}
              </div>
            </div>
          ))}
        </div>
        <LeaderboardTable leaderboard={rest} isLoading={isLoading} error={error} reload={loadLeaderboard} />
      </main>
      <Footer />
    </div>
  )
}
