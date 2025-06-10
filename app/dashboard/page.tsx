import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RakebackSystem } from "@/components/dashboard/rakeback-system"

export const metadata: Metadata = {
  title: "Dashboard | MeasterSkins",
  description: "View your MeasterSkins dashboard, stats, and rewards.",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <main className="relative z-10 container mx-auto px-4 py-8">
        <DashboardHeader />
        <DashboardStats />
        <RakebackSystem />
      </main>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  )
}
