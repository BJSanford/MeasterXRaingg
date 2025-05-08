"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, ArrowLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addDays } from "date-fns"
import type { LeaderboardUser } from "@/lib/server-api"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"

// Import the server action
import { fetchLeaderboard } from "@/lib/server-api"

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [leaderboardType, setLeaderboardType] = useState<"wagered" | "deposited">("wagered")

  // Default date range: last 30 days
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  useEffect(() => {
    loadLeaderboard()
  }, [leaderboardType, dateRange])

  async function loadLeaderboard() {
    setIsLoading(true)
    setError(null)
    setUsingMockData(false)

    try {
      // Call the server action with the selected type
      const data = await fetchLeaderboard(leaderboardType)

      if (!data || !data.results) {
        console.error("No data returned from API")
        setError("No data available. Please try again later.")
        setUsingMockData(true)
        setLeaderboard([])
        return
      }

      setLeaderboard(data.results)

      // Check if we're using mock data (this is a heuristic)
      // If the first username is "Player123", we're likely using mock data
      if (data.results.length > 0 && data.results[0].username === "Player123") {
        setUsingMockData(true)
      }
    } catch (err) {
      console.error("Error loading leaderboard:", err)
      setError("Failed to load leaderboard data. Please try again later.")
      setUsingMockData(true)
      setLeaderboard([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/" className="text-sm text-gray-400 hover:text-white">
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/socials" className="text-sm text-gray-400 hover:text-white">
                Socials
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link href="/login" className="text-sm text-gray-400 hover:text-white">
                Dashboard Login
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="show"
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <motion.div variants={fadeIn("right", 0.2)}>
            <h1 className="text-3xl font-bold">MEASTER Leaderboard</h1>
            <p className="text-gray-400">Top players using the MEASTER affiliate code</p>
          </motion.div>
          <motion.div variants={fadeIn("left", 0.2)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>

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

        <motion.div variants={fadeIn("up", 0.4)} initial="hidden" animate="show">
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Top Players</CardTitle>
                  <CardDescription>Players ranked by total amount {leaderboardType}</CardDescription>
                </div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Tabs
                    defaultValue="wagered"
                    value={leaderboardType}
                    onValueChange={(value) => setLeaderboardType(value as "wagered" | "deposited")}
                    className="w-full md:w-auto"
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                      <TabsTrigger value="wagered">Wagered</TabsTrigger>
                      <TabsTrigger value="deposited">Deposited</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </motion.div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-[300px] items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="h-8 w-8 rounded-full border-4 border-gray-700 border-t-yellow-500"
                  ></motion.div>
                </div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-[200px] flex-col items-center justify-center text-center"
                >
                  <p className="mb-4 text-red-400">{error}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => loadLeaderboard()}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-800">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-900">
                        <th className="p-4 text-left">Rank</th>
                        <th className="p-4 text-left">Player</th>
                        <th className="p-4 text-left">
                          Total {leaderboardType === "wagered" ? "Wagered" : "Deposited"}
                        </th>
                        {leaderboardType === "wagered" && <th className="p-4 text-left">Rakeback</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((user, index) => {
                        // Calculate rakeback percentage based on wagered amount
                        let rakebackPercentage = 5 // Default
                        if (user.wagered >= 10000) {
                          rakebackPercentage = 10
                        } else if (user.wagered >= 5000) {
                          rakebackPercentage = 7.5
                        }

                        return (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.2)" }}
                            className="border-b border-gray-800"
                          >
                            <td className="p-4">
                              {index === 0 ? (
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-black"
                                >
                                  <Trophy className="h-4 w-4" />
                                </motion.div>
                              ) : index === 1 ? (
                                <motion.div
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-black"
                                >
                                  <Trophy className="h-4 w-4" />
                                </motion.div>
                              ) : index === 2 ? (
                                <motion.div
                                  animate={{ scale: [1, 1.05, 1] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                                  className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-black"
                                >
                                  <Trophy className="h-4 w-4" />
                                </motion.div>
                              ) : (
                                <span className="font-medium">#{index + 1}</span>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 overflow-hidden rounded-full">
                                  {user.avatar ? (
                                    <img
                                      src={user.avatar.small || "/placeholder.svg?height=50&width=50"}
                                      alt={user.username}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                  )}
                                </div>
                                <span className="font-medium">{user.username}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {(leaderboardType === "wagered" ? user.wagered : user.deposited).toLocaleString()} coins
                            </td>
                            {leaderboardType === "wagered" && (
                              <td className="p-4">
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className="rounded-full bg-purple-900/30 px-2 py-1 text-xs text-purple-400"
                                >
                                  {rakebackPercentage}%
                                </motion.span>
                              </td>
                            )}
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
