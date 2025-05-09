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
	const [activeTab, setActiveTab] = useState("all")
	const [isLoading, setIsLoading] = useState(true)
	const [recentVideos, setRecentVideos] = useState<any[]>([])

	useEffect(() => {
		// Fetch latest YouTube videos
		fetch("/api/youtube/latest-videos")
			.then((res) => res.json())
			.then((data) => setRecentVideos(data.videos || []))
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

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
					<Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
						<TabsList className="mb-8 grid w-full grid-cols-4 gap-4 bg-transparent">
							<motion.div whileHover={{ y: -2 }}>
								<TabsTrigger
									value="all"
									className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
								>
									All Platforms
								</TabsTrigger>
							</motion.div>
							<motion.div whileHover={{ y: -2 }}>
								<TabsTrigger
									value="youtube"
									className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-red-900/50 data-[state=active]:text-white"
								>
									YouTube
								</TabsTrigger>
							</motion.div>
							<motion.div whileHover={{ y: -2 }}>
								<TabsTrigger
									value="twitter"
									className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-blue-900/50 data-[state=active]:text-white"
								>
									Twitter
								</TabsTrigger>
							</motion.div>
							<motion.div whileHover={{ y: -2 }}>
								<TabsTrigger
									value="kick"
									className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-green-900/50 data-[state=active]:text-white"
								>
									Kick
								</TabsTrigger>
							</motion.div>
						</TabsList>

						{/* All Platforms Tab */}
						<TabsContent value="all" className="mt-0">
							<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
								{socialLinks.map((social, index) => (
									<motion.div
										key={social.platform}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 + index * 0.1 }}
										whileHover={{ y: -10, transition: { duration: 0.3 } }}
									>
										<Card className="border-gray-800 bg-gray-900/70 text-white h-full overflow-hidden">
											<div className={`h-2 w-full bg-gradient-to-r ${social.color}`}></div>
											<CardHeader className="flex flex-row items-center gap-4">
												<div className="h-12 w-12 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
													{social.platform === "Kick" ? (
														<span className="text-green-500 text-xl font-bold">K</span>
													) : social.platform === "Twitter" ? (
														<Twitter className="h-6 w-6 text-blue-400" />
													) : (
														<Youtube className="h-6 w-6 text-red-500" />
													)}
												</div>
												<div>
													<CardTitle>{social.platform}</CardTitle>
													<CardDescription className="text-gray-400">@{social.username}</CardDescription>
												</div>
											</CardHeader>
											<CardContent className="space-y-4">
												<p className="text-gray-300">{social.description}</p>
												<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
													<Button asChild className={`w-full bg-gradient-to-r ${social.color} hover:opacity-90`}>
														<a href={social.url} target="_blank" rel="noopener noreferrer">
															Follow <ExternalLink className="ml-2 h-4 w-4" />
														</a>
													</Button>
												</motion.div>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="mt-12"
							>
								<h2 className="mb-6 text-2xl font-bold">Latest YouTube Video</h2>
								<div className="rounded-lg border border-gray-800 bg-gray-900/70 p-6">
									{recentVideos.length > 0 ? (
										<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
											<div className="relative rounded-lg overflow-hidden">
												<div className="aspect-video bg-gray-800">
													<img
														src={recentVideos[0].thumbnail || "/placeholder.svg"}
														alt={recentVideos[0].title}
														className="w-full h-full object-cover"
													/>
												</div>
												<div className="absolute inset-0 flex items-center justify-center">
													<motion.div
														whileHover={{ scale: 1.1 }}
														className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center"
													>
														<Play className="h-8 w-8 text-white" />
													</motion.div>
												</div>
											</div>
											<div className="flex flex-col justify-between">
												<div>
													<h3 className="text-xl font-bold mb-2">{recentVideos[0].title}</h3>
												</div>
												<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
													<Button asChild className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90">
														<a
															href={`https://www.youtube.com/watch?v=${recentVideos[0].id}`}
															target="_blank"
															rel="noopener noreferrer"
														>
															Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
														</a>
													</Button>
												</motion.div>
											</div>
										</div>
									) : (
										<div className="text-gray-400">No videos found.</div>
									)}
								</div>
							</motion.div>
						</TabsContent>

						{/* YouTube Tab */}
						<TabsContent value="youtube" className="mt-0">
							<Card className="border-gray-800 bg-gray-900/70 text-white">
								<CardHeader>
									<CardTitle>Measter's YouTube Channel</CardTitle>
									<CardDescription>
										Subscribe to Measter's YouTube channel for the latest videos and tutorials
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
										<div className="h-24 w-24 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
											<Youtube className="h-12 w-12 text-red-500" />
										</div>
										<div className="text-center sm:text-left">
											<h3 className="text-xl font-bold">@MeasterCS_Skins</h3>
											<p className="text-gray-400 mb-2">CS2 Case Openings, Gambling & Tutorials</p>
											<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
												<Button asChild className="bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90">
													<a
														href="https://www.youtube.com/@MeasterCS_Skins"
														target="_blank"
														rel="noopener noreferrer"
													>
														Subscribe
													</a>
												</Button>
											</motion.div>
										</div>
									</div>

									<h3 className="mb-4 text-xl font-bold">Recent Videos</h3>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
										{recentVideos.length > 0 ? (
											recentVideos.map((video, index) => (
												<motion.div
													key={video.id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: 0.2 + index * 0.1 }}
													whileHover={{ y: -5, transition: { duration: 0.2 } }}
												>
													<div className="rounded-lg border border-gray-800 overflow-hidden">
														<div className="relative">
															<img
																src={video.thumbnail || "/placeholder.svg"}
																alt={video.title}
																className="w-full aspect-video object-cover"
															/>
														</div>
														<div className="p-4">
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
													</div>
												</motion.div>
											))
										) : (
											<div className="text-gray-400">No videos found.</div>
										)}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Twitter Tab */}
						<TabsContent value="twitter" className="mt-0">
							<Card className="border-gray-800 bg-gray-900/70 text-white">
								<CardHeader>
									<CardTitle>Measter on Twitter</CardTitle>
									<CardDescription>Follow Measter for the latest updates and announcements</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
										<div className="h-24 w-24 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
											<Twitter className="h-12 w-12 text-blue-400" />
										</div>
										<div className="text-center sm:text-left">
											<h3 className="text-xl font-bold">@MeasterAce</h3>
											<p className="text-gray-400 mb-2">CS2 Player & Content Creator</p>
											<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
												<Button asChild className="bg-gradient-to-r from-blue-400 to-blue-600 hover:opacity-90">
													<a href="https://x.com/MeasterAce" target="_blank" rel="noopener noreferrer">
														Follow
													</a>
												</Button>
											</motion.div>
										</div>
									</div>

									<h3 className="mb-4 text-xl font-bold">Recent Tweets</h3>
									<div className="space-y-4">
										{twitterFeed.map((tweet, index) => (
											<motion.div
												key={tweet.id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.2 + index * 0.1 }}
												whileHover={{ y: -5, transition: { duration: 0.2 } }}
												className="rounded-lg border border-gray-800 p-4"
											>
												<div className="flex items-center gap-3 mb-3">
													<div className="h-10 w-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
														<Twitter className="h-5 w-5 text-blue-400" />
													</div>
													<div>
														<p className="font-medium">Measter</p>
														<p className="text-gray-400 text-xs">@MeasterAce</p>
													</div>
													<div className="ml-auto text-gray-400 text-xs">{tweet.date}</div>
												</div>
												<p className="mb-4">{tweet.content}</p>
												<div className="flex items-center gap-4 text-gray-400 text-sm">
													<div className="flex items-center gap-1">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-4 w-4"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
															/>
														</svg>
														<span>{tweet.likes}</span>
													</div>
													<div className="flex items-center gap-1">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-4 w-4"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
															/>
														</svg>
														<span>{tweet.retweets}</span>
													</div>
												</div>
											</motion.div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Kick Tab */}
						<TabsContent value="kick" className="mt-0">
							<Card className="border-gray-800 bg-gray-900/70 text-white">
								<CardHeader>
									<CardTitle>Measter on Kick</CardTitle>
									<CardDescription>Watch Measter's live streams on Kick</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
										<div className="h-24 w-24 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
											<span className="text-green-500 text-4xl font-bold">K</span>
										</div>
										<div className="text-center sm:text-left">
											<h3 className="text-xl font-bold">meastercs-skins</h3>
											<p className="text-gray-400 mb-2">CS2 Case Openings & Giveaways</p>
											<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
												<Button asChild className="bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90">
													<a
														href="https://kick.com/meastercs-skins"
														target="_blank"
														rel="noopener noreferrer"
													>
														Follow
													</a>
												</Button>
											</motion.div>
										</div>
									</div>

									<div className="rounded-lg border border-gray-800 overflow-hidden">
										<div className="relative">
											<div className="aspect-video bg-gray-800">
												<img
													src="/placeholder.svg?height=360&width=640"
													alt="Measter's Kick Stream"
													className="w-full h-full object-cover"
												/>
											</div>
											{kickStreamInfo.status === "Live" && (
												<div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
													<span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
													LIVE
												</div>
											)}
											<div className="absolute bottom-4 left-4 bg-black/80 px-2 py-1 rounded text-xs">
												{kickStreamInfo.viewers} viewers
											</div>
										</div>
										<div className="p-6">
											<h3 className="text-xl font-bold mb-2">{kickStreamInfo.title}</h3>
											<div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
												<span>{kickStreamInfo.category}</span>
												<span>•</span>
												<span>{kickStreamInfo.status === "Live" ? "Live Now" : "Offline"}</span>
											</div>
											<p className="text-gray-300 mb-6">
												Join Measter's stream for exciting CS2 case openings, giveaways, and more! Use code MEASTER for
												exclusive bonuses on Rain.gg.
											</p>
											<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
												<Button
													asChild
													className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:opacity-90"
												>
													<a
														href="https://kick.com/meastercs-skins"
														target="_blank"
														rel="noopener noreferrer"
													>
														{kickStreamInfo.status === "Live" ? "Watch Stream" : "Visit Channel"}
													</a>
												</Button>
											</motion.div>
										</div>
									</div>

									<div className="mt-8">
										<h3 className="mb-4 text-xl font-bold">Stream Schedule</h3>
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<div className="rounded-lg border border-gray-800 p-4">
												<div className="flex items-center justify-between mb-2">
													<span className="font-medium">Monday</span>
													<span className="text-green-500">8:00 PM - 12:00 AM EST</span>
												</div>
												<p className="text-gray-400 text-sm">CS2 Case Openings & Giveaways</p>
											</div>
											<div className="rounded-lg border border-gray-800 p-4">
												<div className="flex items-center justify-between mb-2">
													<span className="font-medium">Wednesday</span>
													<span className="text-green-500">9:00 PM - 1:00 AM EST</span>
												</div>
												<p className="text-gray-400 text-sm">Rain.gg Gambling & Viewer Battles</p>
											</div>
											<div className="rounded-lg border border-gray-800 p-4">
												<div className="flex items-center justify-between mb-2">
													<span className="font-medium">Friday</span>
													<span className="text-green-500">7:00 PM - 2:00 AM EST</span>
												</div>
												<p className="text-gray-400 text-sm">Weekend Kickoff - Big Giveaways</p>
											</div>
											<div className="rounded-lg border border-gray-800 p-4">
												<div className="flex items-center justify-between mb-2">
													<span className="font-medium">Saturday</span>
													<span className="text-green-500">3:00 PM - 8:00 PM EST</span>
												</div>
												<p className="text-gray-400 text-sm">Subscriber Games & Special Events</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</motion.div>
			</main>
		</div>
	)
}
