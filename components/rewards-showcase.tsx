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
    cost: 750,
    category: "Event",
    isNew: false,
  },
]

export function RewardsShowcase() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Rewards Showcase</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our exclusive rewards and start redeeming your Measter Coins for amazing prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card key={reward.id} className="bg-gray-900/50 border-gray-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="relative">
                  <Image
                    src={reward.image}
                    alt={reward.title}
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-auto"
                  />
                  {reward.isNew && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
                      New
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-bold mt-4">{reward.title}</h3>
                <p className="text-sm text-gray-400">{reward.category}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">{reward.cost.toLocaleString()}</span>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white">
                  Redeem
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
