"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { LeaderboardCountdown } from "@/components/leaderboard/leaderboard-countdown"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { Podium } from "@/components/leaderboard/podium"

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("/api/leaderboard")
        const data = await response.json()
        setLeaderboardData(data)
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!leaderboardData) {
    return <div>Failed to load leaderboard data.</div>
  }

  const { startDate, endDate, prizePool, leaderboard } = leaderboardData

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
        <LeaderboardHeader startDate={startDate} prizePool={prizePool} />
        <LeaderboardCountdown startDate={startDate} endDate={endDate} />
        <Podium topThree={leaderboard.slice(0, 3)} />
        <LeaderboardTable leaderboard={leaderboard.slice(3, 15)} />
      </main>
      <Footer />
    </div>
  )
}
