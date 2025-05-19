import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data for top players
const topPlayers = [
	{
		id: 2,
		username: "Koahla",
		avatar: "/placeholder.svg",
		wagered: 18045.53,
		coins: 250,
		rank: 2,
	},
	{
		id: 1,
		username: "emotion",
		avatar: "/placeholder.svg",
		wagered: 21563.2,
		coins: 500,
		rank: 1,
	},
	{
		id: 3,
		username: "Djop",
		avatar: "/placeholder.svg",
		wagered: 6294.96,
		coins: 150,
		rank: 3,
	},
]

export function TopPlayers() {
	return (
		<div className="mb-10">
			<h2 className="text-2xl font-bold mb-6">Top 3 Players This Week</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{topPlayers.map((player) => (
					<Card
						key={player.id}
						className={`bg-gray-900/50 border-gray-800 overflow-hidden relative ${
							player.rank === 1
								? "md:transform md:-translate-y-4 border-yellow-500/50"
								: player.rank === 2
								? "border-gray-400/50"
								: "border-amber-700/50"
						}`}
					>
						<div
							className={`absolute top-0 left-0 w-full h-1 ${
								player.rank === 1
									? "bg-yellow-500"
									: player.rank === 2
									? "bg-gray-400"
									: "bg-amber-700"
							}`}
						></div>
						<CardContent className="p-6">
							<div className="flex flex-col items-center">
								<Avatar className="h-16 w-16 border-2 border-gray-800">
									<AvatarImage
										src={player.avatar}
										alt={player.username}
									/>
									<AvatarFallback>
										{player.username.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<h3 className="text-lg font-medium mt-4">
									{player.username}
								</h3>
								<p className="text-sm text-gray-400">
									Wagered: ${player.wagered.toLocaleString()}
								</p>
								<Badge className="mt-2">Rank #{player.rank}</Badge>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
