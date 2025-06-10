"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, Youtube, Twitter, Play, ExternalLink } from "lucide-react"
import CityOverlay from "../city-overlay"
import SnowOverlay from "../snow-overlay"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"

// Social media data
const socialLinks = [
	{
		platform: "Kick",
		username: "meastercs-skins",
		url: "https://kick.com/meastercs-skins",
		icon: "/images/kick-icon.png",
		color: "from-green-500 to-green-700",
		description: "Watch Measter's live streams on Kick",
	},
	{
		platform: "Twitter",
		username: "MeasterAce",
		url: "https://x.com/MeasterAce",
		icon: "/images/twitter-icon.png",
		color: "from-blue-400 to-blue-600",
		description: "Follow Measter for updates and announcements",
	},
	{
		platform: "YouTube",
		username: "MeasterCS_Skins",
		url: "https://www.youtube.com/@MeasterCS_Skins/videos",
		icon: "/images/youtube-icon.png",
		color: "from-red-500 to-red-700",
		description: "Watch Measter's videos and tutorials",
	},
]

// Mock Kick stream data
const kickStreamInfo = {
	status: "Live",
	title: "CS2 Case Openings & Giveaways - Code MEASTER",
	viewers: 1245,
	category: "Counter-Strike 2",
}

// Mock Twitter feed
const twitterFeed = [
	{
		id: "tweet1",
		content: "Just went live on Kick! Come join the stream and use code MEASTER for exclusive bonuses! 🔥",
		date: "2 hours ago",
		likes: 124,
		retweets: 32,
	},
	{
		id: "tweet2",
		content: "New YouTube video dropping tomorrow! Biggest win yet on Rain.gg 👀 #CS2 #Gambling",
		date: "1 day ago",
		likes: 87,
		retweets: 15,
	},
	{
		id: "tweet3",
		content:
			"Thanks for the amazing support on yesterday's stream! We hit 1000+ viewers! Don't forget to use code MEASTER for the best bonuses 🙏",
		date: "3 days ago",
		likes: 215,
		retweets: 45,
	},
]

export default function SocialsPage() {
	const [isLoading, setIsLoading] = useState(true)
	const [recentVideos, setRecentVideos] = useState<any[]>([])
	const [videoError, setVideoError] = useState<string | null>(null)

	useEffect(() => {
		// Fetch latest YouTube videos
		fetch("/api/youtube/latest-videos")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch videos")
				return res.json()
			})
			.then((data) => {
				setRecentVideos(data.videos || [])
				setVideoError(null)
			})
			.catch(() => {
				setVideoError("Could not load YouTube videos.")
				setRecentVideos([])
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div className="min-h-screen bg-black text-white">
			<CityOverlay />
			<SnowOverlay />

			{/* Header */}
			<motion.header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative border-b border-gray-800 bg-black/80 backdrop-blur-sm"
			>
				<div className="container mx-auto flex items-center justify-between px-4 py-4">
					<motion.div whileHover={{ scale: 1.05 }}>
						<Link href="/" className="flex items-center gap-2">
							<div className="flex h-8 w-auto items-center text-lg font-bold">
								<span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
									RAIN.GG
								</span>
							</div>
							<span className="text-sm text-gray-400">×</span>
							<span className="text-sm text-gray-400">Code MEASTER</span>
						</Link>
					</motion.div>
					<div className="flex items-center gap-4">
						<motion.div whileHover={{ y: -2 }}>
							<Link href="/" className="text-sm text-gray-400 hover:text-white">
								Home
							</Link>
						</motion.div>
						<motion.div whileHover={{ y: -2 }}>
							<Link href="/leaderboard" className="text-sm text-gray-400 hover:text-white">
								Leaderboard
							</Link>
						</motion.div>
						<motion.div whileHover={{ y: -2 }}>
							<Link href="/login" className="text-sm text-gray-400 hover:text-white">
								Dashboard
							</Link>
						</motion.div>
					</div>
				</div>
			</motion.header>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
					className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
				>
					<motion.div variants={fadeIn("right", 0.2)}>
						<h1 className="text-3xl font-bold">MEASTER Social Media</h1>
						<p className="text-gray-400">Follow Measter across all platforms</p>
					</motion.div>
					<motion.div variants={fadeIn("left", 0.2)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
							<Link href="/">
								<ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
							</Link>
						</Button>
					</motion.div>
				</motion.div>

				{/* Social Buttons */}
				<div className="mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
					<Button
						asChild
						variant="outline"
						className="flex items-center gap-2 border-blue-600 text-blue-400 hover:bg-blue-900/30"
						size="sm"
					>
						<a href="https://x.com/MeasterAce" target="_blank" rel="noopener noreferrer">
							<Twitter className="h-5 w-5" />
							Follow on Twitter
							<ExternalLink className="h-4 w-4" />
						</a>
					</Button>
					<Button
						asChild
						variant="outline"
						className="flex items-center gap-2 border-green-600 text-green-400 hover:bg-green-900/30"
						size="sm"
					>
						<a href="https://kick.com/meastercs-skins" target="_blank" rel="noopener noreferrer">
							<span className="text-green-500 font-bold text-lg">K</span>
							Follow on Kick
							<ExternalLink className="h-4 w-4" />
						</a>
					</Button>
					<Button
						asChild
						className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white hover:opacity-90"
						size="sm"
					>
						<a
							href="https://www.youtube.com/@MeasterCS_Skins"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Youtube className="h-5 w-5" />
							Subscribe on YouTube
							<ExternalLink className="h-4 w-4" />
						</a>
					</Button>
				</div>

				{/* YouTube Videos Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<h2 className="mb-6 text-2xl font-bold">Latest YouTube Videos</h2>
					<div className="rounded-lg border border-gray-800 bg-gray-900/70 p-3 sm:p-6">
						{isLoading ? (
							<div className="text-gray-400">Loading videos...</div>
						) : videoError ? (
							<div className="text-red-400">{videoError}</div>
						) : recentVideos.length > 0 ? (
							<div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
								{recentVideos.slice(0, 6).map((video, index) => (
									<motion.div
										key={video.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 + index * 0.1 }}
										whileHover={{ y: -5, transition: { duration: 0.2 } }}
										className="rounded-lg border border-gray-800 overflow-hidden bg-gray-900/80"
									>
										<div className="relative">
											<img
												src={video.thumbnail || "/placeholder.svg"}
												alt={video.title}
												className="w-full aspect-video object-cover"
											/>
											<a
												href={`https://www.youtube.com/watch?v=${video.id}`}
												target="_blank"
												rel="noopener noreferrer"
												className="absolute inset-0 flex items-center justify-center"
											>
												<motion.div
													whileHover={{ scale: 1.1 }}
													className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center"
												>
													<Play className="h-8 w-8 text-white" />
												</motion.div>
											</a>
										</div>
										<div className="p-4 flex flex-col justify-between h-full">
											<h4 className="font-medium mb-2 line-clamp-2">{video.title}</h4>
											<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
												<Button
													asChild
													variant="outline"
													size="sm"
													className="w-full border-gray-700 hover:bg-gray-800"
												>
													<a
														href={`https://www.youtube.com/watch?v=${video.id}`}
														target="_blank"
														rel="noopener noreferrer"
													>
														Watch Video
													</a>
												</Button>
											</motion.div>
										</div>
									</motion.div>
								))}
							</div>
						) : (
							<div className="text-gray-400">No videos found.</div>
						)}
					</div>
				</motion.div>
			</main>
		</div>
	)
}
