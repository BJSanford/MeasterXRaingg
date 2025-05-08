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

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-900 to-black"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/30 via-black to-purple-900/20"></div>

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
            </div>
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ y: -2 }}>
                <Link href="/leaderboard" className="text-sm font-medium text-gray-300 hover:text-white">
                  Leaderboard
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link href="/socials" className="text-sm font-medium text-gray-300 hover:text-white">
                  Socials
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="https://rain.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-300 hover:text-white"
                >
                  Visit Rain.gg
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
                >
                  <Link href="/login">Login / Register</Link>
                </Button>
              </motion.div>
            </div>
          </motion.nav>

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            animate="show"
            className="mt-16 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              variants={fadeIn("up", 0.2)}
              className="mb-6 inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1"
            >
              <div className="rounded-full bg-[#0d1117] px-4 py-1">
                <span className="text-sm font-medium">CREATOR CODE</span>
              </div>
            </motion.div>
            <motion.h1 variants={textVariant(0.4)} className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Use Code{" "}
              <motion.span
                animate={pulseAnimation}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
              >
                MEASTER
              </motion.span>
            </motion.h1>
            <motion.p variants={fadeIn("up", 0.6)} className="mb-8 max-w-2xl text-xl text-gray-300">
              Join Measter&apos;s community, earn dynamic rakeback, and participate in exclusive giveaways with
              occasional tournaments.
            </motion.p>
            <motion.div variants={fadeIn("up", 0.8)} className="flex flex-col gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
                >
                  <Link href="/login">Register with Code MEASTER</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800">
                  <Link href="#benefits">
                    See Benefits <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <motion.div
              variants={fadeIn("up", 0.1)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="flex flex-col items-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm"
            >
              <motion.div animate={floatAnimation}>
                <Gift className="mb-4 h-10 w-10 text-yellow-500" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">Community Rewards</h3>
              <p className="text-gray-400">Access to exclusive giveaways and events hosted by Measter</p>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.2)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="flex flex-col items-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm"
            >
              <motion.div animate={floatAnimation}>
                <DollarSign className="mb-4 h-10 w-10 text-green-500" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">Dynamic Rakeback</h3>
              <p className="text-gray-400">Earn more back on your plays with our enhanced rakeback system</p>
            </motion.div>
            <motion.div
              variants={fadeIn("up", 0.3)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="flex flex-col items-center rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm"
            >
              <motion.div animate={floatAnimation}>
                <Trophy className="mb-4 h-10 w-10 text-purple-500" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold">Community Giveaways</h3>
              <p className="text-gray-400">Join exclusive giveaways and occasional tournaments for our community</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </header>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mb-16 text-center"
          >
            <motion.h2 variants={textVariant(0.2)} className="mb-4 text-4xl font-bold">
              Why Use Code{" "}
              <motion.span
                animate={pulseAnimation}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
              >
                MEASTER
              </motion.span>
              ?
            </motion.h2>
            <motion.p variants={fadeIn("up", 0.4)} className="mx-auto max-w-2xl text-gray-400">
              Our affiliate code connects you to Measter&apos;s community and gives you access to exclusive events and
              rakeback benefits.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <motion.div variants={fadeIn("up", 0.1)} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card className="border-gray-800 bg-gray-900/70 text-white">
                <CardHeader>
                  <motion.div animate={floatAnimation}>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </motion.div>
                  <CardTitle className="mt-4">Community Rewards</CardTitle>
                  <CardDescription className="text-gray-400">
                    Join Measter&apos;s exclusive community events and giveaways
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                      Access to exclusive community giveaways
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                      Special events hosted by Measter
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                      Opportunities for bonus rewards
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.2)} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card className="border-gray-800 bg-gray-900/70 text-white">
                <CardHeader>
                  <motion.div animate={floatAnimation}>
                    <Zap className="h-8 w-8 text-green-500" />
                  </motion.div>
                  <CardTitle className="mt-4">Dynamic Rakeback</CardTitle>
                  <CardDescription className="text-gray-400">Earn more back on every play you make</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      Up to 10% rakeback on all games
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      Weekly rakeback bonuses
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                      Loyalty tier progression boosts
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn("up", 0.3)} whileHover={{ y: -10, transition: { duration: 0.3 } }}>
              <Card className="border-gray-800 bg-gray-900/70 text-white">
                <CardHeader>
                  <motion.div animate={floatAnimation}>
                    <Users className="h-8 w-8 text-purple-500" />
                  </motion.div>
                  <CardTitle className="mt-4">Community Benefits</CardTitle>
                  <CardDescription className="text-gray-400">
                    Join an active community with exclusive events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                      Weekly giveaways for members
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                      Occasional battle tournaments
                    </li>
                    <li className="flex items-center">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                      Exclusive Discord role with special perks
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Rakeback Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/70">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mb-16 text-center"
          >
            <motion.h2 variants={textVariant(0.2)} className="mb-4 text-4xl font-bold">
              Dynamic Rakeback System
            </motion.h2>
            <motion.p variants={fadeIn("up", 0.4)} className="mx-auto max-w-2xl text-gray-400">
              Earn more back based on your total wagered amount
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-4xl"
          >
            <Card className="border-gray-800 bg-gray-900/70 text-white">
              <CardHeader>
                <CardTitle>Rakeback Tiers</CardTitle>
                <CardDescription>The more you wager, the higher your rakeback percentage</CardDescription>
              </CardHeader>
              <CardContent>
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
                        <td className="p-4">
                          <span className="font-medium">$1,000+</span>
                        </td>
                        <td className="p-4">5%</td>
                        <td className="p-4">$50 on $1,000 wagered</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="p-4">
                          <span className="font-medium">$5,000+</span>
                        </td>
                        <td className="p-4">7.5%</td>
                        <td className="p-4">$375 on $5,000 wagered</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="p-4">
                          <span className="font-medium">$10,000+</span>
                        </td>
                        <td className="p-4">10%</td>
                        <td className="p-4">$1,000 on $10,000 wagered</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 flex justify-center"
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Link href="/login">Track Your Rakeback</Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mb-16 text-center"
          >
            <motion.h2 variants={textVariant(0.2)} className="mb-4 text-4xl font-bold">
              Measter Coin Rewards
            </motion.h2>
            <motion.p variants={fadeIn("up", 0.4)} className="mx-auto max-w-2xl text-gray-400">
              Earn Measter Coins for your activity and redeem them for exclusive rewards
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            <motion.div variants={fadeIn("right", 0.2)}>
              <Card className="h-full border-gray-800 bg-gray-900/70 text-white">
                <CardHeader>
                  <CardTitle>How to Earn Coins</CardTitle>
                  <CardDescription>Multiple ways to collect Measter Coins</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 rounded-lg border border-gray-800 p-4"
                  >
                    <div className="rounded-full bg-amber-900/30 p-3">
                      <DollarSign className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Wager on Rain.gg</h4>
                      <p className="text-sm text-gray-400">Earn 1 Measter Coin for every $10 wagered</p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 rounded-lg border border-gray-800 p-4"
                  >
                    <div className="rounded-full bg-amber-900/30 p-3">
                      <Users className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Refer Friends</h4>
                      <p className="text-sm text-gray-400">Earn 50 Measter Coins for each affiliate</p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 rounded-lg border border-gray-800 p-4"
                  >
                    <div className="rounded-full bg-amber-900/30 p-3">
                      <Trophy className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Participate in Tournaments</h4>
                      <p className="text-sm text-gray-400">Earn 25-100 Measter Coins per tournament</p>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 rounded-lg border border-gray-800 p-4"
                  >
                    <div className="rounded-full bg-amber-900/30 p-3">
                      <Coins className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Daily Login</h4>
                      <p className="text-sm text-gray-400">Earn 5 Measter Coins for logging in daily</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeIn("left", 0.2)}>
              <Card className="h-full border-gray-800 bg-gray-900/70 text-white">
                <CardHeader>
                  <CardTitle>Reward Shop</CardTitle>
                  <CardDescription>Exchange your Measter Coins for these rewards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center justify-between rounded-lg border border-gray-800 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-gray-800 p-3">
                        <DollarSign className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">$5 Rain Coins</h4>
                        <p className="text-sm text-gray-400">Add to your Rain.gg balance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Coins className="h-4 w-4" />
                      <span>100 Coins</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center justify-between rounded-lg border border-gray-800 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-gray-800 p-3">
                        <Gift className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Discord Nitro (1 Month)</h4>
                        <p className="text-sm text-gray-400">Premium Discord subscription</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Coins className="h-4 w-4" />
                      <span>250 Coins</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center justify-between rounded-lg border border-gray-800 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-gray-800 p-3">
                        <Zap className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Game Skins</h4>
                        <p className="text-sm text-gray-400">Exclusive in-game items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Coins className="h-4 w-4" />
                      <span>400-800 Coins</span>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 flex justify-center"
                  >
                    <Button
                      asChild
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                    >
                      <Link href="/login">View Reward Shop</Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/40 to-black relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/30 via-black to-purple-800/20"></div>
        <div className="container relative z-20 mx-auto px-4">
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mx-auto max-w-3xl rounded-2xl border border-gray-800 bg-gray-900/80 p-8 text-center backdrop-blur-sm"
          >
            <motion.h2 variants={textVariant(0.2)} className="mb-4 text-4xl font-bold">
              Ready to Get Started?
            </motion.h2>
            <motion.p variants={fadeIn("up", 0.4)} className="mb-8 text-gray-300">
              Join thousands of players already enjoying enhanced rewards with code MEASTER
            </motion.p>
            <motion.div variants={fadeIn("up", 0.5)} className="mb-8 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-4 rounded-lg border border-gray-700 bg-gray-800 px-6 py-3"
              >
                <span className="text-xl font-bold text-yellow-500">MEASTER</span>
              </motion.div>
              <p className="text-sm text-gray-400">Use this code during registration</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black hover:from-yellow-600 hover:to-amber-600"
              >
                <Link href="/login">Register Now with Code MEASTER</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-auto items-center text-lg font-bold">
                <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  RAIN.GG
                </span>
              </div>
              <span className="text-sm text-gray-400">×</span>
              <span className="text-sm text-gray-400">Code MEASTER</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="https://rain.gg/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Terms of Service
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="https://rain.gg/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="https://rain.gg/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  FAQ
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  href="https://rain.gg/support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Support
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <Link href="/socials" className="text-sm text-gray-400 hover:text-white">
                  Measter's Socials
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500">
              This is a promotional website for Rain.gg affiliate code MEASTER. Rain.gg and its logos are property of
              their respective owners.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              © {new Date().getFullYear()} MEASTER Affiliate Program. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
