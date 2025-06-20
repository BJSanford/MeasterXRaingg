// WEEKLY RACE LEADERBOARD PAGE
// This page displays the weekly race leaderboard using the /affiliates/races endpoint.
// Do NOT confuse this with the all-time/custom leaderboard, which uses /affiliates/leaderboard.

"use client"

import { useEffect, useState, useCallback } from "react"
import { Footer } from "@/components/footer"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { LeaderboardCountdown } from "@/components/leaderboard/leaderboard-countdown"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { TopPlayers } from "@/components/leaderboard/top-players"
import { AnimatedBackground } from "@/components/animated-background"

const PRIZE_DISTRIBUTION = [1000, 500, 250, 125, 75, 35, 10, 5] // Hardcoded prize distribution

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
  const [isBeforeStart, setIsBeforeStart] = useState(true)

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

  useEffect(() => {
    if (raceInfo.startDate) {
      setIsBeforeStart(new Date() < new Date(raceInfo.startDate))
    }
  }, [raceInfo.startDate])

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

      setLeaderboard(
        data.leaderboard.map((participant, index) => ({
          ...participant,
          prize: PRIZE_DISTRIBUTION[index] || 0, // Assign hardcoded prize
        })),
      )

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
    <div className="min-h-screen text-white overflow-hidden relative">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <LeaderboardHeader startDate={raceInfo.startDate} prizePool={raceInfo.prizePool} />
        <LeaderboardCountdown startDate={raceInfo.startDate} endDate={raceInfo.endDate} />
        {!isBeforeStart && (
          <>
            <TopPlayers topPlayers={topThree} />
            <LeaderboardTable leaderboard={rest} isLoading={isLoading} error={error} reload={loadLeaderboard} />
          </>
        )}
      </main>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  )
}
