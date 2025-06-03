import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample data for the leaderboard
const topPlayers = [
	{
		id: 1,
		username: "emotion",
		avatar: "/placeholder.svg",
		wagered: 21563.2,
		coins: 4312,
		rank: 1,
	},
	{
		id: 2,
		username: "Koahla",
		avatar: "/placeholder.svg",
		wagered: 18045.53,
		coins: 3609,
		rank: 2,
	},
	{
		id: 3,
		username: "Djop",
		avatar: "/placeholder.svg",
		wagered: 6294.96,
		coins: 1258,
		rank: 3,
	},
]

export function LeaderboardPreview() {
	return (
		<section className="py-20 px-4">
			<div className="container mx-auto max-w-7xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Top Players</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						The highest wagering players earn the most Measter Coins and exclusive rewards. Will you make it to the
						top?
					</p>
				</div>

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
							<div className="absolute top-0 right-0 p-2">
								<div
									className={`rounded-full p-2 text-xs font-bold ${
										player.rank === 1
											? "bg-yellow-500/20 text-yellow-300"
											: player.rank === 2
											? "bg-gray-400/20 text-gray-300"
											: "bg-amber-700/20 text-amber-500"
									}`}
								>
									#{player.rank}
								</div>
							</div>
							<CardContent className="p-6">
								<div className="flex flex-col items-center">
									<Avatar className="h-20 w-20 mb-4 ring-2 ring-offset-2 ring-offset-black ring-purple-500">
										<AvatarImage
											src={player.avatar || "/placeholder.svg"}
											alt={player.username}
										/>
										<AvatarFallback className="bg-purple-900 text-white">
											{player.username.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<h3 className="text-xl font-bold mb-1">{player.username}</h3>
									<div className="grid grid-cols-2 gap-4 w-full mt-4">
										<div className="text-center p-2 bg-black/30 rounded-lg">
											<p className="text-xs text-gray-400">Wagered</p>
											<div className="flex items-center justify-center">
												<Image
													src="/coin.png"
													alt="Coin"
													width={16}
													height={16}
													className="mr-1"
												/>
												<p className="font-bold text-cyan-400">
													{player.wagered?.toLocaleString() || "0"}
												</p>
											</div>
										</div>
										<div className="text-center p-2 bg-black/30 rounded-lg">
											<p className="text-xs text-gray-400">Coins</p>
											<p className="font-bold text-purple-400">
												{player.coins?.toLocaleString() || "0"}
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-10 text-center">
					<Button
						variant="outline"
						className="border-purple-500/30 text-white hover:bg-purple-500/20"
						asChild
					>
						<Link href="/leaderboard">
							View Full Leaderboard
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
