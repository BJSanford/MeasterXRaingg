"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LeaderboardPlayer {
	user_id: string
	username: string
	avatar?: {
		medium?: string
	}
	wagered: number
	prize: number
}

export function LeaderboardTable() {
	const [leaderboardData, setLeaderboardData] = useState<LeaderboardPlayer[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchLeaderboard() {
			try {
				const response = await fetch("https://api.rain.gg/v1/affiliates/races?participant_count=50")
				if (!response.ok) {
					throw new Error("Failed to fetch leaderboard data")
				}
				const data = await response.json()
				setLeaderboardData(data.results || [])
			} catch (error) {
				console.error("Error fetching leaderboard data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchLeaderboard()
	}, [])

	if (loading) {
		return <p className="text-white">Loading leaderboard...</p>
	}

	return (
		<div className="mt-10">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-white">Player</TableHead>
						<TableHead className="text-white">Wagered</TableHead>
						<TableHead className="text-white">Reward</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{leaderboardData.map((player) => (
						<TableRow key={player.user_id}>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarImage src={player.avatar?.medium || "/placeholder.svg"} alt={player.username} />
										<AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
									</Avatar>
									<span className="text-white">{player.username}</span>
								</div>
							</TableCell>
							<TableCell className="text-white">${player.wagered.toLocaleString()}</TableCell>
							<TableCell className="text-white">${player.prize.toLocaleString()}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
