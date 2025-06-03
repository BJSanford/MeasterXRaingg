"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Crown, Medal, Users, DollarSign, Gamepad2, Star, Zap, Gift } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeaderboardPreview } from "@/components/leaderboard-preview"
import { HowItWorks } from "@/components/how-it-works"
import { RakebackTiers } from "@/components/rakeback-tiers"

export default function HomePage() {
  const topThree = [
    { username: "Player1", avatar: "/placeholder.svg", wagered: 10000, prize: 500 },
    { username: "Player2", avatar: "/placeholder.svg", wagered: 8000, prize: 250 },
    { username: "Player3", avatar: "/placeholder.svg", wagered: 6000, prize: 150 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Enhanced Background with particles/stars effect and animated gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="absolute h-full w-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent animate-pulse-slower"></div>

        {/* Animated stars */}
        {Array.from({ length: 100 }).map((_, i) => (
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

        {/* Larger glowing orbs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)"
                  : "radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(34,211,238,0) 70%)",
              animation: `float ${Math.random() * 10 + 20}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Leaderboard Preview */}
        <LeaderboardPreview topThree={topThree} />

        {/* Rakeback Tiers */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Rakeback Tiers</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
            Unlock higher rakeback percentages as you wager more. Check out the tiers below to see how much you can
            earn!
          </p>
          <RakebackTiers />
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Simplified Rewards Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Exclusive Rewards</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Earn Measter Coins and exchange them for premium gaming gear, crypto, and exclusive perks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Gift className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gaming Gear</h3>
                  <p className="text-gray-400 text-sm">Premium headsets, keyboards, and gaming accessories</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-cyan-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Crypto Rewards</h3>
                  <p className="text-gray-400 text-sm">Bitcoin, Ethereum, and other popular cryptocurrencies</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-yellow-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">VIP Perks</h3>
                  <p className="text-gray-400 text-sm">Exclusive access, higher rakeback, and priority support</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                asChild
              >
                <Link href="/rewards">Browse All Rewards</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10"></div>
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Dominate the Leaderboard?</h2>
                  <p className="text-gray-300 mb-8">
                    Join thousands of players competing for the top spot. Use code MEASTER and start your climb to
                    victory today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                      asChild
                    >
                      <Link href="/leaderboard">Join Competition</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link href="/about">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
