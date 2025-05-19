import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Alex M.",
      avatar: "/placeholder.svg",
      role: "Regular Player",
      content:
        "The dashboard makes it so easy to track my progress. I can see exactly how much more I need to wager to reach the next rakeback tier.",
    },
    {
      id: 2,
      name: "Sarah K.",
      avatar: "/placeholder.svg",
      role: "Weekly Winner",
      content:
        "I won the weekly leaderboard competition and got an amazing skin! The tracking tools helped me stay on top of my progress the whole time.",
    },
    {
      id: 3,
      name: "Mike T.",
      avatar: "/placeholder.svg",
      role: "High Roller",
      content:
        "The rakeback system is fantastic. I've earned back thousands in rewards just by playing games I would have played anyway.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-black/50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 mb-4">
            TESTIMONIALS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what players using the MeasterSkins dashboard have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-purple-900/50">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 italic">"{testimonial.content}"</p>
                  </div>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 15.934l-6.18 3.254 1.18-6.875-5-4.867 6.9-1.002L10 0l3.1 6.447 6.9 1.002-5 4.867 1.18 6.875z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
