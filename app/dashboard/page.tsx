"use client"

import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { EnhancedRakebackSystem } from "@/components/dashboard/enhanced-rakeback-system"
import { AnimatedBackground } from "@/components/animated-background"

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader />
        <DashboardStats />
        <EnhancedRakebackSystem />
      </main>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  )
}
