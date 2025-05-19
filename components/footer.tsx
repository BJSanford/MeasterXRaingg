import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DiscIcon as Discord, Twitch, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"></div>
                <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  M
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                MeasterSkins
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              The premier Rain.gg affiliate program offering exclusive rewards, dynamic rakeback, and community
              engagement.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-500/20 hover:text-purple-400">
                <Discord className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-500/20 hover:text-purple-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-500/20 hover:text-purple-400">
                <Twitch className="h-5 w-5" />
                <span className="sr-only">Kick</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Rewards
                </Link>
              </li>
              <li>
                <Link href="/giveaways" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Giveaways
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates, giveaways, and promotions.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} MeasterSkins. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
              Privacy
            </Link>
            <Link href="/cookies" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
