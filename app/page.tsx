"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Trophy, Zap, Users, ArrowRight, Star, DollarSign, Coins } from "lucide-react"
import { motion } from "framer-motion"
import CityOverlay from "./city-overlay"
import SnowOverlay from "./snow-overlay"
import { fadeIn, staggerContainer, textVariant, floatAnimation, pulseAnimation } from "@/lib/animation-utils"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CityOverlay />
      <SnowOverlay />

      {/* Header/Nav */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900 to-black"></div>
        <div className="container relative z-20 mx-auto px-4 py-6">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} className="flex h-10 w-auto items-center text-xl font-bold">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  RAIN.GG X MEASTER
                </span>
              </motion.div>
              <Link href="/leaderboard" className="text-sm font-medium text-gray-300 hover:text-white">
                Leaderboard
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </motion.div>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl mb-4">Join Measter</h1>
            <p className="text-xl text-gray-300 mb-6">
              Use code <span className="text-yellow-500 font-bold">MEASTER</span> to unlock exclusive rewards and
              benefits.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
            >
              <Link href="https://rain.gg/r/measter" target="_blank" rel="noopener noreferrer">
                Register with Code MEASTER
              </Link>
            </Button>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Top 3 Players</h2>
            <ul className="space-y-2">
              <li className="flex justify-between text-gray-300">
                <span>Player1</span>
                <span>$10,000</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Player2</span>
                <span>$8,500</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Player3</span>
                <span>$7,200</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Leaderboard</h2>
          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="p-4">Rank</th>
                <th className="p-4">Username</th>
                <th className="p-4">Wagered Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="p-4">1</td>
                <td className="p-4">Player1</td>
                <td className="p-4">$10,000</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-4">2</td>
                <td className="p-4">Player2</td>
                <td className="p-4">$8,500</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-4">3</td>
                <td className="p-4">Player3</td>
                <td className="p-4">$7,200</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-6">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
            >
              <Link href="/leaderboard">View Full Leaderboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Gift className="mx-auto h-10 w-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold">Community Rewards</h3>
            <p className="text-gray-400">Exclusive giveaways and events</p>
          </div>
          <div className="text-center">
            <DollarSign className="mx-auto h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold">Dynamic Rakeback</h3>
            <p className="text-gray-400">Earn more back on your plays</p>
          </div>
          <div className="text-center">
            <Trophy className="mx-auto h-10 w-10 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold">Community Giveaways</h3>
            <p className="text-gray-400">Join exclusive tournaments</p>
          </div>
        </div>
      </section>

      {/* Rakeback System */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/70">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Dynamic Rakeback System</h2>
          <p className="text-center text-gray-400 mb-6">Earn more based on your total wagered amount</p>
          <div className="overflow-hidden rounded-lg border border-gray-800">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900">
                  <th className="p-4 text-left">Wager Tier</th>
                  <th className="p-4 text-left">Rakeback Percentage</th>
                  <th className="p-4 text-left">Example Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-4">$1,000+</td>
                  <td className="p-4">5%</td>
                  <td className="p-4">$50 on $1,000 wagered</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4">$5,000+</td>
                  <td className="p-4">7.5%</td>
                  <td className="p-4">$375 on $5,000 wagered</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-4">$10,000+</td>
                  <td className="p-4">10%</td>
                  <td className="p-4">$1,000 on $10,000 wagered</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Measter Coin Rewards */}
      <section className="py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">How to Earn Coins</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <DollarSign className="h-6 w-6 text-amber-500" />
                <span>Earn 1 Measter Coin for every $10 wagered</span>
              </li>
              <li className="flex items-center gap-4">
                <Users className="h-6 w-6 text-amber-500" />
                <span>Earn 50 Measter Coins for each affiliate</span>
              </li>
              <li className="flex items-center gap-4">
                <Trophy className="h-6 w-6 text-amber-500" />
                <span>Earn 25-100 Measter Coins per tournament</span>
              </li>
              <li className="flex items-center gap-4">
                <Coins className="h-6 w-6 text-amber-500" />
                <span>Earn 5 Measter Coins for logging in daily</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">Reward Shop</h2>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Current Coins</span>
                <span className="text-yellow-500 font-bold">250</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
                <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <div className="flex gap-4">
                <Button className="bg-blue-500 text-white">Track Progress</Button>
                <Button className="bg-green-500 text-white">View History</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-gray-400">
        <div className="container mx-auto flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-500">
            This is a promotional website for Rain.gg affiliate code MEASTER. Rain.gg and its logos are property of their
            respective owners.
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MEASTER Affiliate Program. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
