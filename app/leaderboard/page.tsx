import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { TopPlayers } from "@/components/leaderboard/top-players"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardCountdown } from "@/components/leaderboard/leaderboard-countdown"

export const metadata: Metadata = {
  title: "Leaderboard | MeasterSkins",
  description: "View the current MeasterSkins leaderboard and see who's winning the most rewards.",
}

export default function LeaderboardPage() {
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
