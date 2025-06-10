"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TopPlayers } from "@/components/leaderboard/top-players"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Zap } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { RakebackTiers } from "@/components/rakeback-tiers"
import { AnimatedBackground } from "@/components/animated-background"
import { HowItWorks } from "@/components/how-it-works"

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
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Weekly Champions Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                <Trophy className="h-10 w-10 text-yellow-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-300 animate-text">
                  Weekly Champions
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                The top 3 players competing in this week's leaderboard race. Competition resets every Friday.
              </p>
            </div>

            {/* Top Players Component - Keep as is */}
            <div className="mb-16">
              {isLoading ? (
                <p className="text-center text-gray-400">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-400">{error}</p>
              ) : (
                <TopPlayers topPlayers={topPlayers} />
              )}
            </div>

            {/* CTA Box */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <Card className="relative bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-0 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10"></div>
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
        <section className="py-16 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
          <div className="container mx-auto max-w-4xl relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                <Zap className="h-8 w-8 text-cyan-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 animate-text">
                  Rakeback Tiers
                </span>
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
                Earn more coins as you wager and level up through our tier system. All tiers maintain a 0.5% rakeback
                rate.
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                <RakebackTiers />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />
      </main>

      <div className="relative z-20">
        <Footer />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-text {
          background-size: 300% 300%;
          animation: animate-text 4s ease infinite;
        }
        
        @keyframes animate-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
