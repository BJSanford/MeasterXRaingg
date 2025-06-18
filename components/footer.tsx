import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter, Youtube } from "lucide-react"
import Image from "next/image"

// Add Discord SVG component
const DiscordIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                <Image src="/public/images/measter-logo.png" alt="MeasterCS Logo" fill className="object-cover" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                MeasterRewards
              </span>
            </Link>

            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              The premier Rain.gg affiliate program offering exclusive rewards, dynamic rakeback, and community
              engagement.
            </p>

            {/* Social Media Buttons */}
            <div className="flex space-x-4">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-gray-800 hover:bg-[#5865F2] transition-all duration-300 hover:scale-110"
              >
                <a href="https://discord.gg/measter" target="_blank" rel="noopener noreferrer">
                  <DiscordIcon />
                  <span className="sr-only">Discord</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-gray-800 hover:bg-black transition-all duration-300 hover:scale-110"
              >
                <a href="https://x.com/MeasterAce" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-6 w-6 text-white" />
                  <span className="sr-only">Twitter/X</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-gray-800 hover:bg-[#FF0000] transition-all duration-300 hover:scale-110"
              >
                <a href="https://www.youtube.com/@MeasterCS_Skins/videos" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-6 w-6 text-white" />
                  <span className="sr-only">YouTube</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-gray-800 hover:bg-[#53FC18] transition-all duration-300 hover:scale-110"
              >
                <a href="https://kick.com/meastercs-skins" target="_blank" rel="noopener noreferrer">
                  <div className="h-6 w-6 bg-white rounded text-black flex items-center justify-center font-bold text-sm">
                    K
                  </div>
                  <span className="sr-only">Kick</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Leaderboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/rewards"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Rewards</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-2">Need Support?</h4>
              <p className="text-gray-300">If you need support, make a ticket in the Measter Discord server.</p>
              <Button
                asChild
                className="mt-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105"
              >
                <a href="https://discord.gg/measter" target="_blank" rel="noopener noreferrer">
                  <DiscordIcon />
                  Join Discord
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} MeasterRewards. All rights reserved.
              </p>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-gray-400 text-sm">
                <span className="text-yellow-400 font-semibold">18+</span> | Gamble Responsibly |
                <a href="https://www.begambleaware.org" className="hover:text-white transition-colors underline ml-1">
                  BeGambleAware
                </a>
              </p>
              <p className="text-gray-500 text-xs mt-1">Only gamble with money you can afford to lose.</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-500 text-xs">Designed, Produced, and Powered by @jrdn</p>
        </div>
      </div>
    </footer>
  )
}
