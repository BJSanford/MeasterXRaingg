"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Trophy, Zap, Users, Star, DollarSign, Calendar, LogOut, BarChart3, Coins, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import {
  type LeaderboardUser,
  type Race,
  type ReferredUser,
  fetchLeaderboard,
  fetchRaces,
  fetchReferrals,
  fetchLeaderboardByType,
} from "@/lib/server-api"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"
import { fadeIn, staggerContainer, floatAnimation } from "@/lib/animation-utils"

// Rakeback tiers
const rakebackTiers = [
  { threshold: 1000, percentage: 5 },
  { threshold: 5000, percentage: 7.5 },
  { threshold: 10000, percentage: 10 },
]

// First deposit bonus tiers
const depositBonusTiers = [
  { threshold: 10, bonus: 2 },
  { threshold: 50, bonus: 10 },
  { threshold: 100, bonus: 20 },
  { threshold: 250, bonus: 50 },
  { threshold: 500, bonus: 100 },
]

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [races, setRaces] = useState<Race[]>([])
  const [referrals, setReferrals] = useState<ReferredUser[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [userWagered, setUserWagered] = useState<number | null>(null)

  useEffect(() => {
    async function loadData() {
      setIsDataLoading(true)
      setError(null)
      setUsingMockData(false)

      try {
        // Fetch all-time leaderboard (not race leaderboard)
        const leaderboardData = await fetchLeaderboardByType(
          "wagered",
          "2020-01-01T00:00:00.00Z",
          "2030-01-01T00:00:00.00Z"
        )

        // Fetch data from server actions
        const [racesData, referralsData] = await Promise.all([
          fetchRaces(),
          fetchReferrals(),
        ])
        setLeaderboard(leaderboardData.results || [])
        setRaces(racesData.results || [])
        setReferrals(referralsData.results || [])

        // Find the logged-in user's wagered value from the all-time leaderboard
        if (user && leaderboardData.results) {
          const input = user.username.trim().toLowerCase()
          const lbUser = leaderboardData.results.find(
            (u: any) =>
              typeof u.username === "string" &&
              u.username.trim().toLowerCase() === input
          )
          setUserWagered(lbUser?.wagered ?? 0)
        }

        // Check if we're using mock data (this is a heuristic)
        if (
          leaderboardData.results &&
          leaderboardData.results.length > 0 &&
          leaderboardData.results[0].username === "Player123"
        ) {
          setUsingMockData(true)
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setIsDataLoading(false)
      }
    }

    if (user) {
      loadData()
    }
  }, [user])

  // If auth is still loading or user is not logged in, show loading state
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mb-4 h-12 w-12 rounded-full border-4 border-gray-700 border-t-yellow-500 mx-auto"
          ></motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Loading your dashboard...
          </motion.p>
        </div>
      </div>
    )
  }

  // Calculate next rakeback tier
  const currentTier = rakebackTiers.find(
    (tier, index) =>
      user.totalWagered >= tier.threshold &&
      (index === rakebackTiers.length - 1 || user.totalWagered < rakebackTiers[index + 1].threshold),
  )

  const nextTier = rakebackTiers.find((tier) => user.totalWagered < tier.threshold)

  // Progress to next tier
  const progressToNextTier = nextTier
    ? ((user.totalWagered - (currentTier?.threshold || 0)) / (nextTier.threshold - (currentTier?.threshold || 0))) * 100
    : 100

  // Mock giveaways data (this would come from API in a real implementation)
  const mockGiveaways = [
    {
      id: 1,
      title: "Weekly $500 Giveaway",
      prizePool: 500,
      endsIn: "2d 14h 32m",
      participants: 124,
      type: "weekly",
    },
    {
      id: 2,
      title: "Monthly Skin Giveaway",
      prizePool: 2500,
      endsIn: "12d 8h 15m",
      participants: 342,
      type: "monthly",
    },
    {
      id: 3,
      title: "Special Tournament Prize",
      prizePool: 1000,
      endsIn: "5d 22h 45m",
      participants: 89,
      type: "special",
    },
  ]

  // Mock reward shop items (this would come from API in a real implementation)
  const mockRewardItems = [
    {
      id: 1,
      name: "Community Giveaway Entry",
      cost: 100,
      image: "/placeholder.svg?height=80&width=80",
      category: "events",
    },
    {
      id: 2,
      name: "$10 Rain Coins",
      cost: 180,
      image: "/placeholder.svg?height=80&width=80",
      category: "coins",
    },
    {
      id: 3,
      name: "Discord Nitro (1 Month)",
      cost: 250,
      image: "/placeholder.svg?height=80&width=80",
      category: "subscriptions",
    },
    {
      id: 4,
      name: "AK-47 Skin",
      cost: 400,
      image: "/placeholder.svg?height=80&width=80",
      category: "skins",
    },
    {
      id: 5,
      name: "Knife Skin",
      cost: 800,
      image: "/placeholder.svg?height=80&width=80",
      category: "skins",
    },
    {
      id: 6,
      name: "Exclusive Gloves",
      cost: 650,
      image: "/placeholder.svg?height=80&width=80",
      category: "skins",
    },
  ]

  // Helper to get avatar URL (string or object)
  const getAvatarUrl = (avatar: any) => {
    if (!avatar) return "/placeholder.svg"
    if (typeof avatar === "string") return avatar
    return avatar.medium || avatar.small || avatar.large || "/placeholder.svg"
  }

  // --- Add this block for the welcome message ---
  const WelcomeHeader = () => (
    <div className="mb-8 flex flex-col items-center justify-center">
      <div className="mb-4 flex flex-col items-center">
        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-yellow-500 bg-gray-800 mb-2">
          <img
            src={getAvatarUrl(user.avatar)}
            alt={user.username}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold mb-1">{`Welcome ${user.username}!`}</h2>
        <p className="text-gray-400 text-lg">Here is your dashboard.</p>
      </div>
    </div>
  )
  // --- End welcome block ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2b] to-[#10121a] text-white">
      <CityOverlay />
      <SnowOverlay />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative border-b border-gray-800 bg-black/80 backdrop-blur-sm"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-auto items-center text-lg font-bold">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  RAIN.GG
                </span>
              </div>
              <span className="text-sm text-gray-400">×</span>
              <span className="text-sm text-gray-400">Code MEASTER</span>
            </Link>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-purple-900 border-2 border-amber-400 shadow-lg">
                {user.avatar ? (
                  <img
                    src={user.avatar.medium || "/placeholder.svg?height=50&width=50"}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                )}
              </div>
              <span className="font-semibold">{user.username}</span>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        {/* Add welcome header here */}
        <WelcomeHeader />

        {usingMockData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Alert className="mb-6 border-amber-800 bg-amber-950/30 text-amber-400">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Using Demo Data</AlertTitle>
              <AlertDescription>
                The API is currently unavailable or requires authentication. Showing demo data for preview purposes.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Modern Stat Cards */}
        <motion.div
          variants={staggerContainer(0.05, 0.1)}
          initial="hidden"
          animate="show"
          className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={fadeIn("up", 0.1)} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="bg-gradient-to-br from-[#23263a] to-[#181c2b] border-none shadow-xl rounded-2xl">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <DollarSign className="h-10 w-10 text-green-400 mb-2" />
                <p className="text-sm text-gray-400">Total Wagered</p>
                <p className="text-3xl font-extrabold text-green-300 mt-1">
                  ${userWagered !== null
                    ? userWagered.toLocaleString(undefined, { maximumFractionDigits: 2 })
                    : (user.totalWagered ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn("up", 0.15)} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="bg-gradient-to-br from-[#23263a] to-[#181c2b] border-none shadow-xl rounded-2xl">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <Zap className="h-10 w-10 text-yellow-400 mb-2" />
                <p className="text-sm text-gray-400">Current Rakeback</p>
                <p className="text-3xl font-extrabold text-yellow-300 mt-1">{user.rakebackPercentage ?? 0}%</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn("up", 0.2)} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="bg-gradient-to-br from-[#23263a] to-[#181c2b] border-none shadow-xl rounded-2xl">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <Star className="h-10 w-10 text-purple-400 mb-2" />
                <p className="text-sm text-gray-400">Rakeback Earned</p>
                <p className="text-3xl font-extrabold text-purple-300 mt-1">${(user.rakebackEarned ?? 0).toLocaleString()}</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn("up", 0.25)} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="bg-gradient-to-br from-[#23263a] to-[#181c2b] border-none shadow-xl rounded-2xl">
              <CardContent className="flex flex-col items-center justify-center p-8">
                <Coins className="h-10 w-10 text-amber-400 mb-2" />
                <p className="text-sm text-gray-400">Measter Coins</p>
                <p className="text-3xl font-extrabold text-amber-300 mt-1">{user.measterCoins ?? 0}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            {/* Change TabsList to flex and make triggers flex-1 */}
            <TabsList className="mb-8 flex w-full gap-4 bg-transparent">
              <motion.div whileHover={{ y: -2 }} className="flex-1">
                <TabsTrigger
                  value="overview"
                  className="flex-1 border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="flex-1">
                <TabsTrigger
                  value="rakeback"
                  className="flex-1 border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
                >
                  Rakeback
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="flex-1">
                <TabsTrigger
                  value="giveaways"
                  className="flex-1 border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
                >
                  Giveaways
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="flex-1">
                <TabsTrigger
                  value="rewards"
                  className="flex-1 border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
                >
                  Rewards
                </TabsTrigger>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="flex-1">
                <TabsTrigger
                  value="tournaments"
                  className="flex-1 border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white opacity-80"
                >
                  Tournaments
                </TabsTrigger>
              </motion.div>
            </TabsList>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 rounded-lg border border-red-800 bg-red-900/20 p-4 text-center text-red-400"
              >
                <p>{error}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-2">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800"
                  >
                    Try Again
                  </Button>
                </motion.div>
              </motion.div>
            )}

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="border-gray-800 bg-gray-900/70 text-white">
                      <CardHeader>
                        <CardTitle>Wager History</CardTitle>
                        <CardDescription>Your wagering activity over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {isDataLoading ? (
                          <div className="flex h-[300px] items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="h-8 w-8 rounded-full border-4 border-gray-700 border-t-yellow-500"
                            ></motion.div>
                          </div>
                        ) : (
                          <div className="h-[300px] w-full">
                            {/* Placeholder for chart - would be replaced with actual chart */}
                            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-800/50">
                              <motion.div animate={floatAnimation}>
                                <BarChart3 className="mb-4 h-16 w-16 text-gray-600" />
                              </motion.div>
                              <p className="text-center text-gray-400">
                                Wager history data loaded from API:
                                {(user.wagerHistory ?? []).map((item, index) => (
                                  <span key={index} className="block">
                                    {item.date}: ${item.amount.toLocaleString()}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                  >
                    <Card className="border-gray-800 bg-gray-900/70 text-white">
                      <CardHeader>
                        <CardTitle>Rakeback Progress</CardTitle>
                        <CardDescription>Progress to your next rakeback tier</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm text-gray-400">Current Tier: {currentTier?.percentage || 0}%</span>
                            {nextTier && <span className="text-sm text-gray-400">Next: {nextTier.percentage}%</span>}
                          </div>
                          <Progress value={progressToNextTier} className="h-2 bg-gray-800">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progressToNextTier}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                          </Progress>
                        </div>
                        {nextTier ? (
                          <p className="text-center text-sm text-gray-400">
                            Wager ${(nextTier.threshold - user.totalWagered).toLocaleString()} more to reach{" "}
                            {nextTier.percentage}% rakeback
                          </p>
                        ) : (
                          <p className="text-center text-sm text-gray-400">
                            You've reached the highest rakeback tier! Keep wagering to maintain your status.
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="border-gray-800 bg-gray-900/70 text-white">
                      <CardHeader>
                        <CardTitle>Upcoming Giveaways</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockGiveaways.slice(0, 2).map((giveaway, index) => (
                            <motion.div
                              key={giveaway.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              whileHover={{ x: 5, transition: { duration: 0.2 } }}
                              className="rounded-lg border border-gray-800 p-4"
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <h4 className="font-medium">{giveaway.title}</h4>
                                <span className="rounded-full bg-purple-900/50 px-2 py-1 text-xs">
                                  ${giveaway.prizePool}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>Ends in: {giveaway.endsIn}</span>
                                <span>{giveaway.participants} participants</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                          <Button
                            variant="outline"
                            className="w-full border-gray-700 text-white hover:bg-gray-800"
                            onClick={() => setActiveTab("giveaways")}
                          >
                            View All Giveaways
                          </Button>
                        </motion.div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rakeback" className="mt-0">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>Rakeback Calculator</CardTitle>
                      <CardDescription>See how much rakeback you can earn based on your wager</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8 overflow-hidden rounded-lg border border-gray-800">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800 bg-gray-900">
                              <th className="p-4 text-left">Wager Tier</th>
                              <th className="p-4 text-left">Rakeback Percentage</th>
                              <th className="p-4 text-left">Potential Earnings</th>
                              <th className="p-4 text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rakebackTiers.map((tier, index) => {
                              const isActive = user.totalWagered >= tier.threshold
                              const isCurrent =
                                isActive &&
                                (index === rakebackTiers.length - 1 ||
                                  user.totalWagered < rakebackTiers[index + 1].threshold)
                              const potentialEarnings = (tier.percentage / 100) * user.totalWagered

                              return (
                                <tr key={index} className="border-b border-gray-800">
                                  <td className="p-4">
                                    <span className="font-medium">${tier.threshold.toLocaleString()}+</span>
                                  </td>
                                  <td className="p-4">{tier.percentage}%</td>
                                  <td className="p-4">${potentialEarnings.toFixed(2)}</td>
                                  <td className="p-4">
                                    {isCurrent ? (
                                      <span className="rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">
                                        Current Tier
                                      </span>
                                    ) : isActive ? (
                                      <span className="rounded-full bg-purple-900/30 px-2 py-1 text-xs text-purple-400">
                                        Achieved
                                      </span>
                                    ) : (
                                      <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-400">
                                        Locked
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                        <h3 className="mb-4 text-lg font-medium">How Rakeback Works</h3>
                        <p className="mb-4 text-gray-400">
                          Rakeback is a percentage of your total wager that is returned to you as a reward for your
                          activity. The more you wager, the higher your rakeback percentage.
                        </p>
                        <p className="text-gray-400">
                          Your rakeback is calculated based on your total lifetime wager on Rain.gg while using the
                          MEASTER referral code. Rakeback is paid out weekly to your Rain.gg account.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="mb-8 border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>Your Rakeback Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                          <span className="text-gray-400">Current Percentage</span>
                          <span className="text-xl font-bold">{user.rakebackPercentage ?? 0}%</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                          <span className="text-gray-400">Total Earned</span>
                          <span className="text-xl font-bold">${(user.rakebackEarned ?? 0).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                          <span className="text-gray-400">Next Payout</span>
                          <span className="text-xl font-bold">3d 14h</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>First Deposit Bonuses</CardTitle>
                      <CardDescription>Special bonuses for your first deposit</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-lg border border-gray-800">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800 bg-gray-900">
                              <th className="p-3 text-left text-sm">Deposit</th>
                              <th className="p-3 text-left text-sm">Bonus</th>
                            </tr>
                          </thead>
                          <tbody>
                            {depositBonusTiers.map((tier, index) => (
                              <tr key={index} className="border-b border-gray-800">
                                <td className="p-3 text-sm">${tier.threshold}</td>
                                <td className="p-3 text-sm">+${tier.bonus}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="giveaways" className="mt-0">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>Active Giveaways</CardTitle>
                      <CardDescription>Enter giveaways to win prizes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isDataLoading ? (
                        <div className="flex h-[300px] items-center justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-yellow-500"></div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-6">
                          {mockGiveaways.map((giveaway) => (
                            <div
                              key={giveaway.id}
                              className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-purple-800"
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-xl font-medium">{giveaway.title}</h3>
                                <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm">
                                  ${giveaway.prizePool}
                                </span>
                              </div>
                              <div className="mb-6 grid grid-cols-3 gap-4">
                                <div className="rounded-lg border border-gray-800 p-3 text-center">
                                  <p className="text-xs text-gray-400">Ends In</p>
                                  <p className="font-medium">{giveaway.endsIn}</p>
                                </div>
                                <div className="rounded-lg border border-gray-800 p-3 text-center">
                                  <p className="text-xs text-gray-400">Participants</p>
                                  <p className="font-medium">{giveaway.participants}</p>
                                </div>
                                <div className="rounded-lg border border-gray-800 p-3 text-center">
                                  <p className="text-xs text-gray-400">Type</p>
                                  <p className="font-medium capitalize">{giveaway.type}</p>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                  Enter Giveaway
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="mb-8 border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>Giveaway Rules</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-gray-400">
                        <div>
                          <h4 className="mb-2 font-medium text-white">Eligibility</h4>
                          <ul className="list-inside list-disc space-y-1 text-sm">
                            <li>Must be using the MEASTER referral code</li>
                            <li>Must be a member of the Discord server</li>
                            <li>Must have wagered at least $100 in the last 7 days for weekly giveaways</li>
                            <li>Must have wagered at least $500 in the last 30 days for monthly giveaways</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-white">How to Enter</h4>
                          <p className="text-sm">
                            Click the "Enter Giveaway" button to be redirected to our Discord server where you can enter
                            the giveaway by reacting to the giveaway message.
                          </p>
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-white">Winner Selection</h4>
                          <p className="text-sm">
                            Winners are selected randomly from all eligible entries. Winners will be announced on
                            Discord and contacted directly to receive their prizes.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>Past Winners</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(leaderboard ?? []).slice(0, 3).map((winner, index) => (
                          <div key={index} className="rounded-lg border border-gray-800 p-3">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="font-medium">Weekly $500 Giveaway</span>
                              <span className="text-xs text-gray-400">
                                {new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full overflow-hidden">
                                {winner.avatar ? (
                                  <img
                                    src={winner.avatar.small || "/placeholder.svg"}
                                    alt={winner.username}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gradient-to-br from-green-500 to-blue-500"></div>
                                )}
                              </div>
                              <span className="text-sm">{winner.username}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="mt-0">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card className="border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Measter Coin Rewards</CardTitle>
                        <CardDescription>Redeem your Measter Coins for rewards</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 rounded-full bg-amber-900/30 px-3 py-1">
                        <Coins className="h-4 w-4 text-amber-500" />
                        <span className="font-medium text-amber-500">{user.measterCoins ?? 0} Coins</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {mockRewardItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col rounded-lg border border-gray-800 bg-gray-900/50 transition-all hover:border-amber-800"
                          >
                            <div className="flex items-center justify-center border-b border-gray-800 p-4">
                              <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900"></div>
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 font-medium">{item.name}</h4>
                              <div className="mb-4 flex items-center gap-1 text-amber-500">
                                <Coins className="h-4 w-4" />
                                <span>{item.cost} Coins</span>
                              </div>
                              <Button
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                                disabled={user.measterCoins < item.cost}
                              >
                                Redeem
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="mb-8 border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>How to Earn Coins</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border border-gray-800 p-4">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="rounded-full bg-amber-900/30 p-2">
                              <DollarSign className="h-5 w-5 text-amber-500" />
                            </div>
                            <h4 className="font-medium">Wager on Rain.gg</h4>
                          </div>
                          <p className="text-sm text-gray-400">
                            Earn 1 Measter Coin for every $10 wagered while using the MEASTER referral code.
                          </p>
                        </div>
                        <div className="rounded-lg border border-gray-800 p-4">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="rounded-full bg-amber-900/30 p-2">
                              <Calendar className="h-5 w-5 text-amber-500" />
                            </div>
                            <h4 className="font-medium">Daily Login</h4>
                          </div>
                          <p className="text-sm text-gray-400">
                            Earn 5 Measter Coins for logging in daily and checking in on the website.
                          </p>
                        </div>
                        <div className="rounded-lg border border-gray-800 p-4">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="rounded-full bg-amber-900/30 p-2">
                              <Trophy className="h-5 w-5 text-amber-500" />
                            </div>
                            <h4 className="font-medium">Participate in Tournaments</h4>
                          </div>
                          <p className="text-sm text-gray-400">
                            Earn 25-100 Measter Coins for participating in our exclusive tournaments.
                          </p>
                        </div>
                        <div className="rounded-lg border border-gray-800 p-4">
                          <div className="mb-2 flex items-center gap-3">
                            <div className="rounded-full bg-amber-900/30 p-2">
                              <Users className="h-5 w-5 text-amber-500" />
                            </div>
                            <h4 className="font-medium">Refer Friends</h4>
                          </div>
                          <p className="text-sm text-gray-400">
                            Earn 50 Measter Coins for each friend who signs up using your referral link.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-800 bg-gray-900/70 text-white">
                    <CardHeader>
                      <CardTitle>Redemption History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-gray-400">
                        <p>You haven't redeemed any rewards yet.</p>
                        <p className="mt-2 text-sm">
                          Start earning and redeeming Measter Coins to see your history here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tournaments" className="mt-0">
              <div className="grid grid-cols-1 gap-8">
                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Occasional Tournaments</CardTitle>
                    <CardDescription>Special battle tournaments for MEASTER code users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isDataLoading ? (
                      <div className="flex h-[300px] items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-700 border-t-yellow-500"></div>
                      </div>
                    ) : races.length > 0 ? (
                      <div className="space-y-6">
                        {races.map((race) => (
                          <div key={race.id} className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                            <div className="mb-4 flex items-center justify-between">
                              <h3 className="text-xl font-medium">{race.name}</h3>
                              <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm">
                                $
                                {Array.isArray(race.participants)
                                  ? race.participants.reduce((sum, p) => sum + (p.prize || 0), 0)
                                  : 0} Prize Pool
                              </span>
                            </div>
                            <div className="mb-6 grid grid-cols-3 gap-4">
                              <div className="rounded-lg border border-gray-800 p-3 text-center">
                                <p className="text-xs text-gray-400">Date</p>
                                <p className="font-medium">{new Date(race.starts_at).toLocaleDateString()}</p>
                              </div>
                              <div className="rounded-lg border border-gray-800 p-3 text-center">
                                <p className="text-xs text-gray-400">Status</p>
                                <p className="font-medium capitalize">{race.status}</p>
                              </div>
                              <div className="rounded-lg border border-gray-800 p-3 text-center">
                                <p className="text-xs text-gray-400">Participants</p>
                                <p className="font-medium">{(race.participants ?? []).length}</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                Register
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-xl font-medium">Weekend Battle</h3>
                          <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm">$500 Prize Pool</span>
                        </div>
                        <div className="mb-6 grid grid-cols-3 gap-4">
                          <div className="rounded-lg border border-gray-800 p-3 text-center">
                            <p className="text-xs text-gray-400">Date</p>
                            <p className="font-medium">May 15, 2025</p>
                          </div>
                          <div className="rounded-lg border border-gray-800 p-3 text-center">
                            <p className="text-xs text-gray-400">Entry Fee</p>
                            <p className="font-medium">$10</p>
                          </div>
                          <div className="rounded-lg border border-gray-800 p-3 text-center">
                            <p className="text-xs text-gray-400">Participants</p>
                            <p className="font-medium">16 / 16</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Register
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-4 text-lg font-medium">How Tournaments Work</h3>
                      <p className="mb-4 text-gray-400">
                        Tournaments are occasional bracket-style competitions where users who have wagered a certain
                        amount can participate.
                      </p>
                      <p className="mb-4 text-gray-400">
                        Participants spend coins on battles, and the player with the most winning battle calls wins the
                        tournament.
                      </p>
                      <p className="text-gray-400">
                        Tournaments are held occasionally, so check back for upcoming events.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}
