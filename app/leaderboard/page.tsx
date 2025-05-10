"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, ArrowLeft, AlertCircle, Timer, Award } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"
import { fetchLeaderboard } from "@/lib/server-api"
import Image from "next/image"

// Hardcoded payout distribution for top 8 places
const payouts = [500, 250, 150, 50, 20, 15, 10, 5]
const prizePool = payouts.reduce((a, b) => a + b, 0)
const coinImg = "/coin.png" // Make sure /public/coin.png exists

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

  const updateTimeLeft = useCallback(() => {
    if (!raceInfo.endDate) return
    const now = Date.now()
    const end = new Date(raceInfo.endDate).getTime()
    if (isNaN(end)) {
      setRaceInfo(prev => ({ ...prev, timeLeft: 'Invalid date' }))
      return
    }
    const timeLeft = end - now
    if (timeLeft <= 0) {
      setRaceInfo(prev => ({ ...prev, timeLeft: 'Race Ended' }))
      return
    }
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
    setRaceInfo(prev => ({
      ...prev,
      timeLeft: `${days}d ${hours}h ${minutes}m ${seconds}s`
    }))
  }, [raceInfo.endDate])

  useEffect(() => {
    loadLeaderboard()
    // Only start timer after endDate is set
    let timer: NodeJS.Timeout | undefined
    if (raceInfo.endDate) {
      timer = setInterval(updateTimeLeft, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raceInfo.endDate])

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
        setRaceInfo({
          startDate: startDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
          }),
          endDate: data.race.ends_at,
          timeLeft: ''
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

  const obfuscateName = (name: string) => {
    if (!name) return ""
    if (name.length <= 2) return name[0] + "*"
    if (name.length <= 4) return name[0] + "*".repeat(name.length - 1)
    return name.slice(0, 2) + "*".repeat(name.length - 4) + name.slice(-2)
  }

  // --- Podium for Top 3 (reworked, more modern, no crown, no color borders) ---
  const podium = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3, 15) // Only show up to 15 players total

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

        {/* Race Info */}
        <motion.div variants={fadeIn("up", 0.4)} initial="hidden" animate="show">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-gray-800 bg-gray-900/70 text-white">
              <CardHeader>
                <CardTitle>Start Date</CardTitle>
                <CardDescription>Race begins</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{raceInfo.startDate}</p>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-900/70 text-white">
              <CardHeader>
                <CardTitle>Time Remaining</CardTitle>
                <CardDescription>Until race ends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  {raceInfo.timeLeft || 'Calculating...'}
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-900/70 text-white">
              <CardHeader>
                <CardTitle>Prize Pool</CardTitle>
                <CardDescription>Total for top 8</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium flex items-center gap-1">
                  <Image src={coinImg} alt="Coin" width={24} height={24} className="inline-block mr-1" />
                  {prizePool}
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Reworked Podium for Top 3 */}
        <motion.div
          className="flex justify-center items-end gap-8 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {podium.map((user, idx) => (
            <div
              key={user?.id || user?.username || idx}
              className={`flex flex-col items-center justify-end z-10 ${idx === 1 ? "scale-105" : "scale-100"}`}
            >
              <div className="mb-2">
                <div className={`rounded-full border-4 ${idx === 0 ? "border-yellow-400" : idx === 1 ? "border-gray-400" : "border-orange-400"} bg-[#23263a] shadow-lg w-24 h-24 flex items-center justify-center`}>
                  <img src={user?.avatar?.medium || "/placeholder.svg"} alt={user?.username} className="w-20 h-20 rounded-full object-cover" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Award className={`h-5 w-5 ${idx === 0 ? "text-yellow-400" : idx === 1 ? "text-gray-400" : "text-orange-400"}`} />
                <span className="text-lg font-bold">{user?.username}</span>
              </div>
              <div className="text-gray-400 font-semibold mt-1">{["1st Place", "2nd Place", "3rd Place"][idx]}</div>
              <div className="text-white text-xl font-bold mb-1 flex items-center justify-center">
                <img src={coinImg} alt="Coin" width={22} height={22} className="inline-block mr-1" />
                {user?.wagered?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={`rounded px-4 py-1 text-md font-bold ${idx === 0 ? "bg-yellow-400 text-black" : idx === 1 ? "bg-gray-400 text-black" : "bg-orange-400 text-black"} mb-2`}>
                {payouts[idx] > 0 ? <>+{payouts[idx]}</> : <>-</>}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Leaderboard Table - up to 15 players, reworked row style */}
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
                      <tr
                        key={user.id || user.username}
                        className={`border-b border-gray-800 hover:bg-gray-800/60 transition-colors`}
                      >
                        <td className="p-4 font-bold text-lg text-gray-300">#{index + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-800 border border-gray-700">
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
                        <td className="p-4 flex items-center gap-1 font-mono text-base text-yellow-300">
                          <img src={coinImg} alt="Coin" width={16} height={16} className="inline-block mr-1" />
                          {Math.round(user.wagered).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className={`inline-block rounded px-3 py-1 font-semibold text-sm ${index < payouts.length ? "bg-yellow-900/60 text-yellow-300" : "bg-gray-800 text-gray-400"}`}>
                            {index < payouts.length && payouts[index] > 0 ? `+${payouts[index]}` : "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
