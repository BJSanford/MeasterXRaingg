import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Crown, Medal, Users, DollarSign, Gamepad2, Star, Zap, Gift } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeaderboardPreview } from "@/components/leaderboard-preview"
import { HowItWorks } from "@/components/how-it-works"
import { DynamicRakeback } from "@/components/dashboard/dynamic-rakeback"

export default function Home() {
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

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 mb-4">
                    RAIN.GG AFFILIATE PROGRAM
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-text">
                    Climb the Leaderboard. Earn Epic Rewards.
                  </h1>
                  <p className="mt-6 text-lg text-gray-300 max-w-xl">
                    Join the ultimate Rain.gg leaderboard competition! Use code{" "}
                    <span className="text-cyan-400 font-bold">MEASTER</span> to start earning points, climbing ranks,
                    and winning exclusive rewards.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                    asChild
                  >
                    <Link href="/leaderboard">
                      View Leaderboard
                      <Trophy className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-500/50 text-white hover:bg-purple-500/20"
                    asChild
                  >
                    <Link href="/dashboard">Track Progress</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  <span>
                    Use code <span className="font-bold text-cyan-400">MEASTER</span> on Rain.gg
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-75 animate-pulse-slow"></div>
                <div className="relative bg-black rounded-lg p-6 shadow-2xl">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Live Leaderboard</h3>
                      <Crown className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
                            1
                          </div>
                          <span className="font-semibold">CryptoKing</span>
                        </div>
                        <span className="text-yellow-400 font-bold">$125,000</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-lg border border-gray-500/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold">
                            2
                          </div>
                          <span className="font-semibold">RainMaster</span>
                        </div>
                        <span className="text-gray-300 font-bold">$98,500</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg border border-orange-500/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold">
                            3
                          </div>
                          <span className="font-semibold">LuckyPlayer</span>
                        </div>
                        <span className="text-orange-400 font-bold">$87,200</span>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-sm text-gray-400">Updated every 5 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Rakeback Section */}
        <DynamicRakeback />

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
