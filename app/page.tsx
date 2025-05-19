import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Gift, Users, DollarSign, Gamepad2 } from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LeaderboardPreview } from "@/components/leaderboard-preview"
import { HowItWorks } from "@/components/how-it-works"
import { RewardsShowcase } from "@/components/rewards-showcase"

export default function Home() {
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
                    Earn Rewards. Climb the Leaderboard. Win More.
                  </h1>
                  <p className="mt-6 text-lg text-gray-300 max-w-xl">
                    Connect your Rain.gg and Discord accounts to start earning Measter Coins based on your wagered
                    amounts.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                  >
                    Start Earning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-500/50 text-white hover:bg-purple-500/20"
                  >
                    Learn More
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
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-75"></div>
                <div className="relative bg-black rounded-lg p-6 shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    width={600}
                    height={400}
                    alt="MeasterSkins Dashboard Preview"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <LeaderboardPreview />

        {/* How It Works */}
        <HowItWorks />

        {/* Rewards Showcase */}
        <RewardsShowcase />

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Active Users</p>
                      <p className="text-2xl font-bold">5,000+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Wagered</p>
                      <p className="text-2xl font-bold">$2.5M+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <Gift className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Rewards Given</p>
                      <p className="text-2xl font-bold">1,200+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-yellow-500/50 transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <Gamepad2 className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Tournaments</p>
                      <p className="text-2xl font-bold">50+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-0 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 bg-cover bg-center"></div>
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
                  <p className="text-gray-300 mb-8">
                    Join thousands of players already earning rewards through the Measter affiliate program. Connect
                    your accounts and start earning today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                    >
                      Connect Accounts
                    </Button>
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                      Learn More
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
