import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TopPlayers({ topPlayers }: { topPlayers: any[] }) {
	return (
		<div className="mb-10">
			<h2 className="text-2xl font-bold mb-6">Top 3 Players This Week</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{topPlayers.map((player) => (
					<Card
						key={player.username}
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
									? "bg-gradient-to-r from-yellow-500 to-yellow-300"
									: player.rank === 2
									? "bg-gradient-to-r from-gray-400 to-gray-300"
									: "bg-gradient-to-r from-amber-700 to-amber-500"
							}`}
						></div>
						<div className="absolute top-3 right-3">
							<Badge
								className={`${
									player.rank === 1
										? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
										: player.rank === 2
										? "bg-gray-400/20 text-gray-300 border-gray-400/30"
										: "bg-amber-700/20 text-amber-500 border-amber-700/30"
								}`}
							>
								#{player.rank}
							</Badge>
						</div>
						<CardContent className="p-6 pt-8">
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
								<h3 className="text-xl font-bold mb-1">
									{player.username}
								</h3>
								<div className="w-full mt-6 space-y-4">
									<div className="bg-black/30 rounded-lg p-3">
										<p className="text-xs text-gray-400 mb-1">WAGERED</p>
										<p className="font-bold text-cyan-400">
											{player.wagered.toLocaleString()}
										</p>
									</div>
									<div className="bg-black/30 rounded-lg p-3">
										<p className="text-xs text-gray-400 mb-1">PRIZE</p>
										<p className="font-bold text-yellow-400">
											{player.prize > 0 ? player.prize : "0"}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
