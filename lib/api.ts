// API configuration
const API_BASE_URL = "https://api.rain.gg"
const API_KEY = process.env.RAIN_API_KEY

// API headers
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
}

// Types based on the API documentation
export interface ErrorDetails {
  reason: string
}

export interface ErrorResponse {
  code: string
  details: string
  status: string
}

export interface Race {
  code: string
  created_at: string
  description: string
  ended_at: string
  ends_at: string
  id: string
  name: string
  participants: RaceParticipant[]
  payout_distribution: string
  recurring_interval: string
  starts_at: string
  status: string
}

export interface UserAvatar {
  large: string
  medium: string
  small: string
}

export interface RaceParticipant {
  avatar: UserAvatar
  boosted_amount: number
  experience: number
  id: string
  position: number
  prize: number
  race_id: string
  user_id: string
  username: string
  wagered: number
  wagered_excluding_boost: number
}

export interface RacesFetchResponse {
  code: string
  results: Race[]
}

export interface ReferredUser {
  avatar: UserAvatar
  deposited: number
  id: string
  username: string
  wagered: number
}

export interface ReferralFetchResponse {
  code: string
  results: ReferredUser[]
}

export interface LeaderboardUser {
  username: string
  wagered: number
  avatar: UserAvatar
  position: number
}

export interface LeaderboardResponse {
  code: string
  results: LeaderboardUser[]
}

export interface UserProfile {
  id: string
  username: string
  avatar: UserAvatar
  totalWagered: number
  rakebackPercentage: number
  rakebackEarned: number
  measterCoins: number
  joinDate: string
  depositHistory: {
    date: string
    amount: number
    bonus: number
  }[]
  wagerHistory: {
    date: string
    amount: number
  }[]
}

// API functions
export async function fetchLeaderboard(): Promise<LeaderboardResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/affiliates/leaderboard?code=MEASTER`, {
      method: "GET",
      headers,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    throw error
  }
}

export async function fetchRaces(): Promise<RacesFetchResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/affiliates/races?code=MEASTER`, {
      method: "GET",
      headers,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching races:", error)
    throw error
  }
}

export async function fetchReferrals(startDate?: string, endDate?: string): Promise<ReferralFetchResponse> {
  try {
    let url = `${API_BASE_URL}/affiliates/raffle?code=MEASTER`

    if (startDate && endDate) {
      url += `&startDate=${startDate}&endDate=${endDate}`
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching referrals:", error)
    throw error
  }
}

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // This is a mock function since the API doesn't seem to have a direct endpoint for user profiles
    // In a real implementation, you would call the appropriate endpoint

    // First, fetch the user's referral data
    const referrals = await fetchReferrals()

    // Find the user in the referrals
    const user = referrals.results.find((u) => u.id === userId)

    if (!user) {
      return null
    }

    // Calculate rakeback percentage based on wagered amount
    let rakebackPercentage = 5 // Default
    if (user.wagered >= 10000) {
      rakebackPercentage = 10
    } else if (user.wagered >= 5000) {
      rakebackPercentage = 7.5
    }

    // Calculate rakeback earned
    const rakebackEarned = user.wagered * (rakebackPercentage / 100)

    // Calculate Measter coins (1 coin per $10 wagered)
    const measterCoins = Math.floor(user.wagered / 10)

    // Create a mock join date (3 months ago)
    const joinDate = new Date()
    joinDate.setMonth(joinDate.getMonth() - 3)

    // Create mock deposit history
    const depositHistory = [
      {
        date: new Date(joinDate).toISOString().split("T")[0],
        amount: 100,
        bonus: 20,
      },
      {
        date: new Date(joinDate.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        amount: 200,
        bonus: 40,
      },
      {
        date: new Date(joinDate.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        amount: 150,
        bonus: 30,
      },
    ]

    // Create mock wager history (last 3 months)
    const wagerHistory = []
    for (let i = 0; i < 3; i++) {
      const date = new Date(joinDate)
      date.setMonth(date.getMonth() + i)
      wagerHistory.push({
        date: date.toISOString().split("T")[0].substring(0, 7), // YYYY-MM format
        amount: Math.round(user.wagered / 3), // Distribute total wager across 3 months
      })
    }

    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      totalWagered: user.wagered,
      rakebackPercentage,
      rakebackEarned,
      measterCoins,
      joinDate: joinDate.toISOString().split("T")[0],
      depositHistory,
      wagerHistory,
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

// Authentication functions
export async function loginUser(email: string, password: string): Promise<{ userId: string } | null> {
  try {
    // This is a mock function since the API doesn't seem to have a login endpoint
    // In a real implementation, you would call the appropriate endpoint

    // For demo purposes, we'll return a mock user ID
    // In a real implementation, this would come from the API
    return { userId: "mock-user-id-123" }
  } catch (error) {
    console.error("Error logging in:", error)
    return null
  }
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
): Promise<{ userId: string } | null> {
  try {
    // This is a mock function since the API doesn't seem to have a registration endpoint
    // In a real implementation, you would call the appropriate endpoint

    // For demo purposes, we'll return a mock user ID
    // In a real implementation, this would come from the API
    return { userId: "new-user-id-456" }
  } catch (error) {
    console.error("Error registering user:", error)
    return null
  }
}
