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
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<div className="w-4 h-4 mr-1">
													<svg
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<circle cx="12" cy="12" r="12" fill="#F7931A" />
														<path
															d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z"
															fill="#F7931A"
														/>
														<path
															d="M14.55 10.8C14.7 9.9 14.1 9.45 13.2 9.15L13.5 7.95L12.75 7.8L12.45 9C12.3 8.85 12 8.85 11.85 8.85L12.15 7.65L11.4 7.5L11.1 8.7C10.95 8.7 10.8 8.7 10.65 8.55L9.6 8.4V9.15C9.6 9.15 10.2 9.15 10.2 9.3C10.35 9.3 10.35 9.6 10.35 9.6L9.9 11.4V11.55C9.9 11.55 9.75 11.7 9.6 11.7C9.45 11.7 9 11.7 9 11.7L9.15 12.45H10.35C10.5 12.45 10.65 12.45 10.8 12.45L10.5 13.65L11.25 13.8L11.55 12.6C11.7 12.6 11.85 12.6 12 12.75L11.7 13.95L12.45 14.1L12.75 12.9C13.95 13.05 14.85 12.75 15.15 11.7C15.45 10.8 15 10.35 14.55 10.8ZM13.8 11.55C13.65 12.15 12.6 12 12.15 11.85L12.45 10.65C12.9 10.8 13.95 10.8 13.8 11.55ZM13.05 9.9C12.9 10.5 12 10.35 11.7 10.2L12 9.15C12.3 9.3 13.2 9.3 13.05 9.9Z"
															fill="white"
														/>
													</svg>
												</div>
												<p className="font-bold text-cyan-400">
													{player.wagered?.toLocaleString() || "0"}
												</p>
											</div>
										</div>
									</div>

									<div className="bg-black/30 rounded-lg p-3">
										<p className="text-xs text-gray-400 mb-1">PRIZE</p>
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<div className="w-4 h-4 mr-1">
													<svg
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<circle cx="12" cy="12" r="12" fill="#F7931A" />
														<path
															d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z"
															fill="#F7931A"
														/>
														<path
															d="M14.55 10.8C14.7 9.9 14.1 9.45 13.2 9.15L13.5 7.95L12.75 7.8L12.45 9C12.3 8.85 12 8.85 11.85 8.85L12.15 7.65L11.4 7.5L11.1 8.7C10.95 8.7 10.8 8.7 10.65 8.55L9.6 8.4V9.15C9.6 9.15 10.2 9.15 10.2 9.3C10.35 9.3 10.35 9.6 10.35 9.6L9.9 11.4V11.55C9.9 11.55 9.75 11.7 9.6 11.7C9.45 11.7 9 11.7 9 11.7L9.15 12.45H10.35C10.5 12.45 10.65 12.45 10.8 12.45L10.5 13.65L11.25 13.8L11.55 12.6C11.7 12.6 11.85 12.6 12 12.75L11.7 13.95L12.45 14.1L12.75 12.9C13.95 13.05 14.85 12.75 15.15 11.7C15.45 10.8 15 10.35 14.55 10.8ZM13.8 11.55C13.65 12.15 12.6 12 12.15 11.85L12.45 10.65C12.9 10.8 13.95 10.8 13.8 11.55ZM13.05 9.9C12.9 10.5 12 10.35 11.7 10.2L12 9.15C12.3 9.3 13.2 9.3 13.05 9.9Z"
															fill="white"
														/>
													</svg>
												</div>
												<p className="font-bold text-yellow-400">
													{player.coins?.toLocaleString() || "0"}
												</p>
											</div>
											<div
												className={`flex items-center justify-center w-8 h-8 rounded-full ${
													player.rank === 1
														? "bg-yellow-500/20"
														: player.rank === 2
														? "bg-gray-400/20"
														: "bg-amber-700/20"
												}`}
											>
												<svg
													className={`w-4 h-4 ${
														player.rank === 1
															? "text-yellow-400"
															: player.rank === 2
															? "text-gray-300"
															: "text-amber-500"
													}`}
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
													<path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
													<path d="M4 22h16" />
													<path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
													<path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
													<path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
												</svg>
											</div>
										</div>
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
