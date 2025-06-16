import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Gift, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Rewards Shop - Coming Soon | MeasterSkins",
  description:
    "The MeasterSkins Rewards Shop is coming soon! Get ready to redeem exclusive rewards with your Measter Coins on Rain.gg.",
}

export default function RewardsPage() {
  return (
    <div className="min-h-screen text-white flex flex-col bg-gray-950">
      <AnimatedBackground />

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
        {/* Blurred Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Rewards Shop Preview"
            layout="fill"
            objectFit="cover"
            className="filter blur-xl scale-110 opacity-30" // Increased blur, adjusted opacity
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>{" "}
          {/* Smoother blend with background */}
        </div>

        {/* Coming Soon Content */}
        <div className="relative z-10 flex flex-col items-center p-6 bg-black/30 backdrop-blur-sm rounded-xl shadow-2xl max-w-2xl">
          <div className="p-4 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-full mb-6 shadow-lg">
            <Gift className="w-16 h-16 md:w-20 md:h-20 text-purple-400 animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-text">
              Rewards Shop
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
            Launching Soon!
          </p>
          <p className="text-md sm:text-lg text-gray-300 max-w-lg mb-8 leading-relaxed">
            We're crafting an incredible rewards experience just for you. Soon, you'll be able to redeem your Measter
            Coins for exclusive skins, site credits, and much more. Stay tuned!
          </p>
          <Button
            size="lg"
            variant="default"
            asChild
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-lg shadow-xl hover:shadow-purple-500/30 transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            <Link href="/">
              <Sparkles className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              Explore MeasterSkins
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
