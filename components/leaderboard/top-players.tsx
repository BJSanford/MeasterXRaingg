import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TopPlayers({ topPlayers }: { topPlayers: any[] }) {
	return (
		<div className="mb-10">
			<h2 className="text-2xl font-bold mb-6">Top 3 Players This Week</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{topPlayers.map((player, index) => (
					<Card
						key={player.username}
						className={`bg-gray-900/50 border-gray-800 overflow-hidden relative ${
							index === 0
								? "md:transform md:-translate-y-4 border-yellow-500/50"
								: index === 1
								? "border-gray-400/50"
								: "border-amber-700/50"
						}`}
					>
						<div
							className={`absolute top-0 left-0 w-full h-1 ${
								index === 0
									? "bg-gradient-to-r from-yellow-500 to-yellow-300"
									: index === 1
									? "bg-gradient-to-r from-gray-400 to-gray-300"
									: "bg-gradient-to-r from-amber-700 to-amber-500"
							}`}
						></div>
						<div className="absolute top-3 right-3">
							<Badge
								className={`${
									index === 0
										? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
										: index === 1
										? "bg-gray-400/20 text-gray-300 border-gray-400/30"
										: "bg-amber-700/20 text-amber-500 border-amber-700/30"
								}`}
							>
								#{index + 1}
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
														<circle
															cx="12"
															cy="12"
															r="12"
															fill="#F7931A"
														/>
													</svg>
												</div>
												<p className="font-bold text-cyan-400">
													{player.wagered.toLocaleString()}
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
														<circle
															cx="12"
															cy="12"
															r="12"
															fill="#F7931A"
														/>
													</svg>
												</div>
												<p className="font-bold text-yellow-400">
													{player.prize.toLocaleString()}
												</p>
											</div>
											<div
												className={`flex items-center justify-center w-8 h-8 rounded-full ${
													index === 0
														? "bg-yellow-500/20"
														: index === 1
														? "bg-gray-400/20"
														: "bg-amber-700/20"
												}`}
											>
												<svg
													className={`w-4 h-4 ${
														index === 0
															? "text-yellow-400"
															: index === 1
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
