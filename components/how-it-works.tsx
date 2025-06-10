import { Card, CardContent } from "@/components/ui/card"
import { Link2, Gamepad2, Coins, ShoppingCart } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Connect Your Accounts",
    description: "Link your Rain.gg and Discord accounts to start tracking your progress.",
    icon: Link2,
    color: "from-purple-600 to-purple-400",
  },
  {
    id: 2,
    title: "Wager on Rain.gg",
    description: "Play games and place wagers using code MEASTER for bonus rewards.",
    icon: Gamepad2,
    color: "from-cyan-600 to-cyan-400",
  },
  {
    id: 3,
    title: "Earn Measter Coins",
    description: "Automatically earn coins based on your wagered amounts and activities.",
    icon: Coins,
    color: "from-yellow-600 to-yellow-400",
  },
  {
    id: 4,
    title: "Redeem in the Shop",
    description: "Spend your earned coins on exclusive skins, bonuses, and more.",
    icon: ShoppingCart,
    color: "from-green-600 to-green-400",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Earning rewards with MeasterSkins is simple. Follow these steps to start collecting Measter Coins and unlock
            exclusive rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.id} className="bg-gray-900/50 border-gray-800 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div
                      className={`h-16 w-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}
                    >
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-900 border border-gray-800 text-white text-xs flex items-center justify-center font-bold">
                      {step.id}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
