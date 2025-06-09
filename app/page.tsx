"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TopPlayers } from "@/components/leaderboard/top-players"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, DollarSign, Zap, Gift } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works"
import { RakebackTiers } from "@/components/rakeback-tiers"

export default function HomePage() {
  const [topPlayers, setTopPlayers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTopPlayers() {
      try {
        const response = await fetch("/api/leaderboard")
        const data = await response.json()
        if (data && data.leaderboard) {
          setTopPlayers(data.leaderboard.slice(0, 3)) // Get top 3 players
        } else {
          setError("Failed to load leaderboard data.")
        }
      } catch (err) {
        console.error("Error fetching leaderboard data:", err)
        setError("An error occurred while loading leaderboard data.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopPlayers()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Background animations */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-50 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5}px`,
              height: `${Math.random() * 5}px`,
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Leaderboard Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <Trophy className="h-12 w-12 text-yellow-400" />
                Weekly Champions
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                The top 3 players competing in this week's leaderboard race. Competition resets every Monday at 00:00
                UTC.
              </p>
            </div>

            {/* Top Players Component - Keep unchanged */}
            <div className="mb-16">
              {isLoading ? (
                <p className="text-center text-gray-400">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-400">{error}</p>
              ) : (
                <TopPlayers topPlayers={topPlayers} />
              )}
            </div>

            {/* CTA Box from image */}
            <div className="relative">
              <Card className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-0 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20"></div>
                <CardContent className="p-12 relative z-10">
                  <div className="text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                      Ready to Dominate the Leaderboard?
                    </h2>
                    <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
                      Join thousands of players competing for the top spot. Use code MEASTER and start your climb to
                      victory today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-lg px-8 py-4"
                        asChild
                      >
                        <Link href="/leaderboard">Join Competition</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 bg-white/5 backdrop-blur-sm"
                        asChild
                      >
                        <Link href="/about">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Rakeback Tiers Section */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Rakeback Tiers</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
            Unlock higher rakeback percentages as you wager more. Check out the tiers below to see how much you can
            earn!
          </p>
          <RakebackTiers />
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Exclusive Rewards Section */}
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
      </main>

      <Footer />
    </div>
  )
}
