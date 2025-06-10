import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function TopPlayers({ topPlayers }: { topPlayers: any[] }) {
	const positions = [
		{
			rank: 2,
			borderColor: "border-gray-400",
			badgeColor:
				"bg-gray-400/20 text-gray-300 border-gray-400/30",
		}, // Silver
		{
			rank: 1,
			borderColor: "border-yellow-500",
			badgeColor:
				"bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
		}, // Gold
		{
			rank: 3,
			borderColor: "border-amber-700",
			badgeColor:
				"bg-amber-700/20 text-amber-500 border-amber-700/30",
		}, // Bronze
	]

	return (
		<div className="mb-10">
			<h2 className="text-2xl font-bold mb-6">
				
			</h2>
			<div className="grid grid-cols-3 gap-6 items-end">
				{positions.map((position, idx) => {
					const player = topPlayers[position.rank - 1]
					if (!player) return null

					return (
						<Card
							key={player.username}
							className={`bg-gray-900/50 border-gray-800 overflow-hidden relative ${position.borderColor} ${
								position.rank === 1 ? "md:transform md:-translate-y-4" : ""
							}`}
						>
							<div className="absolute top-3 right-3">
								<Badge className={position.badgeColor}>
									#{position.rank}
								</Badge>
							</div>
							<CardContent className="p-6 pt-8">
								<div className="flex flex-col items-center">
									<Avatar className="h-20 w-20 mb-4 ring-2 ring-offset-2 ring-offset-black ring-purple-500">
										<AvatarImage
											src={
												player.avatar || "/placeholder.svg"
											}
											alt={player.username}
										/>
										<AvatarFallback className="bg-purple-900 text-white">
											{player.username
												.substring(0, 2)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<h3 className="text-xl font-bold mb-1 text-white">
										{player.username}
									</h3>

									<div className="w-full mt-6 space-y-4">
										<div className="bg-black/30 rounded-lg p-3">
											<p className="text-xs text-gray-400 mb-1">
												WAGERED
											</p>
											<div className="flex items-center">
												<Image
													src="/coin.png"
													alt="Coin"
													width={16}
													height={16}
													className="mr-1"
												/>
												<p className="font-bold text-cyan-400">
													{player.wagered.toLocaleString()}
												</p>
											</div>
										</div>

										<div className="bg-black/30 rounded-lg p-3">
											<p className="text-xs text-gray-400 mb-1">
												PRIZE
											</p>
											<div className="flex items-center">
												<Image
													src="/coin.png"
													alt="Coin"
													width={16}
													height={16}
													className="mr-1"
												/>
												<p className="font-bold text-yellow-400">
													{player.prize.toLocaleString()}
												</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
