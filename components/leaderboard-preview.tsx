import { Button } from "@/components/ui/button"
import { Podium } from "@/components/leaderboard/podium"
import Link from "next/link"

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
						The top 3 players with the highest wagers this week are displayed below. Compete to earn exclusive rewards and climb the leaderboard!
					</p>
				</div>

				{/* Podium Component */}
				<Podium topThree={topPlayers} />

				<div className="mt-10 text-center">
					<Button
						variant="outline"
						className="border-purple-500/30 text-white hover:bg-purple-500/20"
						asChild
					>
						<Link href="/leaderboard">
							View Full Leaderboard
						</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
