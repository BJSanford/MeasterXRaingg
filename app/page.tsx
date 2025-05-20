import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Zap, Trophy, Coins, Users, Gift } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardPreview } from "@/components/dashboard-preview"
import { RakebackTiers } from "@/components/rakeback-tiers"
import { Testimonials } from "@/components/testimonials"

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
                    Track Your Progress. Earn More Rewards.
                  </h1>
                  <p className="mt-6 text-lg text-gray-300 max-w-xl">
                    Connect your Rain.gg account and use code <span className="text-cyan-400 font-bold">MEASTER</span>{" "}
                    to unlock exclusive rewards, dynamic rakeback, and track your progress in real-time.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                    asChild
                  >
                    <Link href="/dashboard">
                      View Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-500/50 text-white hover:bg-purple-500/20"
                    asChild
                  >
                    <Link href="/leaderboard">View Leaderboard</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Over 5,000+ active users already earning rewards</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-75"></div>
                <div className="relative bg-black rounded-lg p-6 shadow-2xl">
                  <DashboardPreview />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Features */}
        <section className="py-20 px-4 bg-black/50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 mb-4">
                DASHBOARD FEATURES
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need in One Place</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our comprehensive dashboard gives you full visibility into your wagering activity, rewards, and
                progress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6 text-purple-400" />}
                title="Wager Tracking"
                description="Track your wagering history with detailed charts and analytics to optimize your strategy."
                color="purple"
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-cyan-400" />}
                title="Dynamic Rakeback"
                description="Earn increasing rakeback percentages as you wager more. Track your progress to the next tier."
                color="cyan"
              />
              <FeatureCard
                icon={<Trophy className="h-6 w-6 text-yellow-400" />}
                title="Leaderboard Position"
                description="See your current position on the weekly leaderboard and how much more you need to climb ranks."
                color="yellow"
              />
              <FeatureCard
                icon={<Coins className="h-6 w-6 text-green-400" />}
                title="Measter Coins"
                description="Track your earned Measter Coins and spend them on exclusive rewards in our shop."
                color="green"
              />
              <FeatureCard
                icon={<Gift className="h-6 w-6 text-red-400" />}
                title="Giveaways"
                description="Enter exclusive giveaways directly from your dashboard and track upcoming opportunities."
                color="red"
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-blue-400" />}
                title="Community Stats"
                description="See how you compare to other players and track community-wide wagering statistics."
                color="blue"
              />
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-50"></div>
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      width={800}
                      height={600}
                      alt="Wager History Chart"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                  WAGER TRACKING
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">Detailed Wager Analytics</h2>
                <p className="text-gray-300">
                  Our advanced wager tracking system gives you complete visibility into your wagering history. View your
                  activity by day, week, or month with interactive charts that help you understand your patterns.
                </p>
                <ul className="space-y-3">
                  <FeatureListItem text="Track your daily, weekly, and monthly wagering totals" />
                  <FeatureListItem text="Visualize your wagering patterns with interactive charts" />
                  <FeatureListItem text="Compare your current activity to previous periods" />
                  <FeatureListItem text="Set personal goals and track your progress" />
                </ul>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                  asChild
                >
                  <Link href="/dashboard">
                    View Your Stats
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Rakeback System */}
        <section className="py-20 px-4 bg-black/50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                  DYNAMIC RAKEBACK
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold">Earn More As You Play</h2>
                <p className="text-gray-300">
                  Our dynamic rakeback system rewards your loyalty. The more you wager, the higher your rakeback
                  percentage. Track your progress to the next tier and maximize your earnings.
                </p>
                <RakebackTiers />
                <Button
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                  asChild
                >
                  <Link href="/dashboard">
                    Check Your Rakeback
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-50"></div>
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      width={800}
                      height={600}
                      alt="Rakeback Progress"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 mb-4">
                WEEKLY COMPETITION
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Climb the Leaderboard</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Compete with other players in our weekly leaderboard race. Track your position and earn exclusive
                rewards based on your ranking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <LeaderboardCard rank={2} username="Koahla" wagered={18045.53} prize={250} />
              <LeaderboardCard rank={1} username="emotion" wagered={21563.2} prize={500} highlight={true} />
              <LeaderboardCard rank={3} username="Djop" wagered={6294.96} prize={150} />
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-yellow-500/30 text-white hover:bg-yellow-500/20" asChild>
                <Link href="/leaderboard">
                  View Full Leaderboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-0 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 bg-cover bg-center"></div>
              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Tracking?</h2>
                  <p className="text-gray-300 mb-8">
                    Join thousands of players already using the MeasterSkins dashboard to track their progress and earn
                    rewards. Connect your accounts and start earning today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                      asChild
                    >
                      <Link href="/dashboard">Access Dashboard</Link>
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

function FeatureCard({ icon, title, description, color }) {
  const bgColor = `bg-${color}-500/20`

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all h-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className={`p-3 rounded-lg mb-4 ${bgColor}`}>{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureListItem({ text }) {
  return (
    <li className="flex items-start">
      <div className="bg-green-500/20 p-1 rounded-full mr-3 mt-1">
        <svg className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-gray-300">{text}</span>
    </li>
  )
}

function LeaderboardCard({ rank, username, wagered, prize, highlight = false }) {
  const getBorderColor = () => {
    if (rank === 1) return "border-yellow-500/50"
    if (rank === 2) return "border-gray-400/50"
    return "border-amber-700/50"
  }

  const getBadgeColor = () => {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    if (rank === 2) return "bg-gray-400/20 text-gray-300 border-gray-400/30"
    return "bg-amber-700/20 text-amber-500 border-amber-700/30"
  }

  return (
    <Card
      className={`bg-gray-900/50 border-gray-800 overflow-hidden relative ${getBorderColor()} ${
        highlight ? "md:transform md:-translate-y-4" : ""
      }`}
    >
      <div className="absolute top-3 right-3">
        <Badge className={getBadgeColor()}>#{rank}</Badge>
      </div>
      <CardContent className="p-6 pt-8">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 bg-gray-800 rounded-full mb-4 flex items-center justify-center">
            <span className="text-xl font-bold">{username.substring(0, 2).toUpperCase()}</span>
          </div>
          <h3 className="text-xl font-bold mb-1">{username}</h3>

          <div className="w-full mt-6 space-y-4">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">WAGERED</p>
              <div className="flex items-center gap-1">
                <img src="/coin.png" alt="coin" className="h-4 w-4" />
                <p className="font-bold">{wagered?.toLocaleString() || "0"}</p>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">PRIZE</p>
              <div className="flex items-center gap-1">
                <img src="/coin.png" alt="coin" className="h-4 w-4" />
                <p className="font-bold">{prize?.toLocaleString() || "0"}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}