"use client"

import { motion } from "framer-motion"
import { MessageCircle, Link, Gamepad2, TrendingUp, Coins, Tv } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      title: "Connect with Discord",
      description:
        "Login with your Discord account to create your MeasterSkins profile and start tracking your progress.",
      icon: MessageCircle,
      color: "bg-[#5865F2]",
    },
    {
      title: "Link Rain.gg Account",
      description: "Connect your Rain.gg account to enable automatic tracking of your wagers and rewards.",
      icon: Link,
      color: "bg-[#00A8E8]",
    },
    {
      title: "Wager with Code MEASTER",
      description: "Play games on Rain.gg using code MEASTER to earn rakeback and climb the tier system.",
      icon: Gamepad2,
      color: "bg-[#FF6B6B]",
    },
    {
      title: "Earn Rakeback Rewards",
      description: "Your rakeback rank determines your percentage - higher ranks mean more Measter Coins per wager!",
      icon: TrendingUp,
      color: "bg-[#4CAF50]",
    },
    {
      title: "Watch Kick Streams",
      description: "Join our Kick streams for random Measter Coin drops directly to active viewers in chat.",
      icon: Tv,
      color: "bg-[#9C27B0]",
    },
    {
      title: "Redeem Exclusive Rewards",
      description: "Spend your earned Measter Coins on exclusive skins, bonuses, and more in our rewards shop.",
      icon: Coins,
      color: "bg-[#FFC107]",
    },
  ]

  return (
    <section className="py-24">
      <div className="container relative mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">
              How It Works
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Earning rewards with MeasterSkins is simple. Follow these steps to start collecting Measter Coins through
            rakeback and stream drops.
          </motion.p>
        </div>

        {/* Steps Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Steps navigation */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center p-4 rounded-xl bg-gray-900/50 border border-gray-800/50"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center flex-shrink-0 mr-4`}
                >
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-white">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side: Dual earning methods */}
          <div className="space-y-6">
            <motion.div
              className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-xl p-8 border border-cyan-800/30 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-600/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Rakeback Rewards</h3>
                <p className="text-gray-300 mb-6">
                  Your rakeback percentage is determined by your tier level. The more you wager, the higher your tier,
                  and the more Measter Coins you earn back automatically.
                </p>
                <div className="flex items-center space-x-2 text-cyan-400 font-medium">
                  <TrendingUp className="w-5 h-5" />
                  <span></span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-800/30 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Stream Drops</h3>
                <p className="text-gray-300 mb-6">
                  Join our Kick streams for random Measter Coin drops! Active chat participants can earn bonus coins
                  just by watching and engaging with the stream.
                </p>
                <div className="flex items-center space-x-2 text-purple-400 font-medium">
                  <Tv className="w-5 h-5" />
                  <span>Random drops during live streams</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
