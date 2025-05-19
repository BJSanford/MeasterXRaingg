"use client"

import { useEffect, useState, useCallback } from "react"
import { fetchLeaderboard } from "@/lib/server-api"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { TopPlayers } from "@/components/leaderboard/top-players"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardCountdown } from "@/components/leaderboard/leaderboard-countdown"
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
        <LeaderboardHeader />
        <LeaderboardCountdown />
        <TopPlayers />
        <LeaderboardTable />
      </main>

      <Footer />
    </div>
  )
}
