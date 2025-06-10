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
import { AnimatedBackground } from "@/components/animated-background"

export const metadata: Metadata = {
  title: "Dashboard | MeasterSkins",
  description: "View your MeasterSkins dashboard, stats, and rewards.",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <AnimatedBackground />

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

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  )
}
