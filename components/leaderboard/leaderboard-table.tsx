"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from "lucide-react"

// Sample data for the leaderboard
const leaderboardData = [
	{
		id: 4,
		username: "NitroGuy",
		avatar: "/placeholder.svg",
		wagered: 5185.18,
		reward: 250.0,
	},
	{
		id: 5,
		username: "Kershey",
		avatar: "/placeholder.svg",
		wagered: 4838.47,
		reward: 100.0,
	},
	{
		id: 6,
		username: "RBGaze",
		avatar: "/placeholder.svg",
		wagered: 4713.78,
		reward: 50.0,
	},
	{
		id: 7,
		username: "LessCrazy",
		avatar: "/placeholder.svg",
		wagered: 4500.95,
		reward: 25.0,
	},
	{
		id: 8,
		username: "a******4",
		avatar: "/placeholder.svg",
		wagered: 2835.17,
		reward: 25.0,
	},
	{
		id: 9,
		username: "p******e",
		avatar: "/placeholder.svg",
		wagered: 2500.0,
		reward: 10.0,
	},
]

export function LeaderboardTable() {
	const [search, setSearch] = useState("")

	const filteredData = leaderboardData.filter((player) =>
		player.username.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className="mt-10">
			<div className="flex justify-between items-center mb-4">
				<Input
					placeholder="Search players..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-4">
							Sort By <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Wagered</DropdownMenuItem>
						<DropdownMenuItem>Reward</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Player</TableHead>
						<TableHead>Wagered</TableHead>
						<TableHead>Reward</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredData.map((player) => (
						<TableRow key={player.id}>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarImage src={player.avatar} alt={player.username} />
										<AvatarFallback>{player.username.charAt(0)}</AvatarFallback>
									</Avatar>
									<span>{player.username}</span>
								</div>
							</TableCell>
							<TableCell>${player.wagered.toLocaleString()}</TableCell>
							<TableCell>${player.reward.toLocaleString()}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
