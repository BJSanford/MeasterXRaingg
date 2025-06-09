import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { WagerHistory } from "@/components/dashboard/wager-history"
import { RakebackProgress } from "@/components/dashboard/rakeback-progress"
import { UpcomingGiveaways } from "@/components/dashboard/upcoming-giveaways"
import { LeaderboardPosition } from "@/components/dashboard/leaderboard-position"
import { RecentRewards } from "@/components/dashboard/recent-rewards"
import { RakebackSystem } from "@/components/dashboard/rakeback-system"

export const metadata: Metadata = {
  title: "Dashboard | MeasterSkins",
  description: "View your MeasterSkins dashboard, stats, and rewards.",
}

export default function DashboardPage() {
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

      <main className="relative z-10 container mx-auto px-4 py-8">
        <DashboardHeader />
        <DashboardStats />
        <DashboardTabs />
        <RakebackSystem />
        <WagerHistory />
        <RakebackProgress />
        <UpcomingGiveaways />
        <LeaderboardPosition />
        <RecentRewards />
      </main>

      <Footer />
    </div>
  )
}
