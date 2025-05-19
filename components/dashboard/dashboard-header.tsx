import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, Bell } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  // This would normally come from your authentication system
  const user = {
    name: "jrdnEX.!",
    avatar: "/placeholder.svg",
    joinDate: "May 2023",
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <Avatar className="h-16 w-16 border-2 border-purple-500">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="bg-purple-900 text-white">JE</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-400 text-sm">Member since {user.joinDate}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="icon" className="border-gray-800 bg-gray-900/50 text-white">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="outline" size="icon" className="border-gray-800 bg-gray-900/50 text-white">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0">
          <Link href="/rewards">Shop Rewards</Link>
        </Button>
      </div>
    </div>
  )
}
