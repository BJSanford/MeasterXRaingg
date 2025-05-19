import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"
import Image from "next/image"

// Sample rewards data
const rewards = [
  {
    id: 1,
    title: "AK-47 | Neon Revolution",
    image: "/placeholder.svg?height=200&width=300",
    cost: 5000,
    category: "Skin",
    isNew: true,
  },
  {
    id: 2,
    title: "$50 Rain.gg Deposit",
    image: "/placeholder.svg?height=200&width=300",
    cost: 2500,
    category: "Credit",
    isNew: false,
  },
  {
    id: 3,
    title: "Karambit | Fade",
    image: "/placeholder.svg?height=200&width=300",
    cost: 15000,
    category: "Knife",
    isNew: true,
  },
  {
    id: 4,
    title: "Exclusive Discord Role",
    image: "/placeholder.svg?height=200&width=300",
    cost: 1000,
    category: "Perk",
    isNew: false,
  },
  {
    id: 5,
    title: "AWP | Dragon Lore",
    image: "/placeholder.svg?height=200&width=300",
    cost: 25000,
    category: "Skin",
    isNew: false,
  },
  {
    id: 6,
    title: "Tournament Entry Ticket",
    image: "/placeholder.svg?height=200&width=300",
    cost: 3500,
    category: "Event",
    isNew: true,
  },
]

export function RewardsShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Rewards Shop</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Spend your hard-earned Measter Coins on exclusive skins, credits, and perks. New items added regularly!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card
              key={reward.id}
              className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:border-purple-500/50 transition-all"
            >
              <div className="relative">
                <Image
                  src={reward.image || "/placeholder.svg"}
                  alt={reward.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                {reward.isNew && <Badge className="absolute top-2 right-2 bg-purple-600">NEW</Badge>}
                <Badge className="absolute bottom-2 left-2 bg-gray-800/80">{reward.category}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">{reward.title}</h3>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-bold text-yellow-400">{reward.cost.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 ml-1">Measter Coins</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full border-purple-500/30 text-white hover:bg-purple-500/20">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
            Browse All Rewards
          </Button>
        </div>
      </div>
    </section>
  )
}
