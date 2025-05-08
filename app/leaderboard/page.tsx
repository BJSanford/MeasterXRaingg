"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, ArrowLeft, AlertCircle, Timer } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"
import { fetchLeaderboard } from "@/lib/server-api"

export default function WeeklyRacePage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [raceInfo, setRaceInfo] = useState({
    startDate: '',
    endDate: '',
    timeLeft: ''
  })

  useEffect(() => {
    loadLeaderboard()
    const timer = setInterval(updateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  function updateTimeLeft() {
    if (!raceInfo.endDate) return

    const now = new Date().getTime()
    const end = new Date(raceInfo.endDate).getTime()

    // Check if dates are valid
    if (isNaN(end)) {
      setRaceInfo(prev => ({ ...prev, timeLeft: 'Invalid date' }))
      return
    }

    const timeLeft = end - now

    if (timeLeft <= 0) {
      setRaceInfo(prev => ({ ...prev, timeLeft: 'Race Ended' }))
      return
    }

    // Calculate remaining time
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    // Update state with formatted time
    setRaceInfo(prev => ({
      ...prev,
      timeLeft: `${days}d ${hours}h ${minutes}m ${seconds}s`
    }))
  }

  async function loadLeaderboard() {
    setIsLoading(true)
    setError(null)
    setUsingMockData(false)

    try {
      const data = await fetchLeaderboard()
      if (!data || !data.results) {
        setError("No data available. Please try again later.")
        setUsingMockData(true)
        setLeaderboard([])
        return
      }

      setLeaderboard(data.results)
      
      // Parse dates from race info
      if (data.race) {
        const startDate = new Date(data.race.starts_at)
        const endDate = new Date(data.race.ends_at)
        
        setRaceInfo({
          startDate: startDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
          }),
          endDate: data.race.ends_at,
          timeLeft: ''  // This will be updated by the timer
        })
      }

      if (data.results[0]?.username === "Player123") {
        setUsingMockData(true)
      }
    } catch (err) {
      console.error("Error loading race data:", err)
      setError("Failed to load race data. Please try again later.")
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

      <main className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="show"
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <motion.div variants={fadeIn("right", 0.2)}>
            <h1 className="text-3xl font-bold">Weekly Race</h1>
            <p className="text-gray-400">Compete for prizes using the MEASTER code</p>
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
          <Card className="mb-6 border-gray-800 bg-gray-900/70 text-white">
            <CardHeader>
              <CardTitle>Race Information</CardTitle>
              <CardDescription>Current weekly race status and timing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border border-gray-800 p-4 text-center">
                  <p className="text-sm text-gray-400">Start Date</p>
                  <p className="text-lg font-medium">{raceInfo.startDate}</p>
                </div>
                <div className="rounded-lg border border-gray-800 p-4 text-center">
                  <p className="text-sm text-gray-400">Time Remaining</p>
                  <p className="text-lg font-medium flex items-center justify-center gap-2">
                    <Timer className="h-4 w-4" />
                    {raceInfo.timeLeft || 'Calculating...'}
                  </p>
                </div>
                <div className="rounded-lg border border-gray-800 p-4 text-center">
                  <p className="text-sm text-gray-400">Prize Pool</p>
                  <p className="text-lg font-medium">$500</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardHeader>
              <CardTitle>Current Rankings</CardTitle>
              <CardDescription>Top players in this week's race</CardDescription>
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
                        <th className="p-4 text-left">Wagered</th>
                        <th className="p-4 text-left">Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.slice(0, 15).map((user, index) => (
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
                            {Math.round(user.wagered).toLocaleString()} coins
                          </td>
                          <td className="p-4">
                            <span className="rounded-full bg-purple-900/30 px-2 py-1 text-xs text-purple-400">
                              ${index === 0 ? '250' : index === 1 ? '150' : index === 2 ? '100' : '0'}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
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
