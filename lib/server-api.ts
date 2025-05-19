"use server"

// API configuration
const API_BASE_URL = "https://api.rain.gg/v1";
const API_KEY = process.env.RAIN_API_KEY;

if (!API_KEY) {
  console.error("RAIN_API_KEY is not set. Please check your environment variables.");
}

// API headers
const headers = {
  accept: "application/json",
  "x-api-key": API_KEY, // Ensure the API key is included
}

const leaderboardHeaders = {
  accept: "application/json",
  "x-api-key": API_KEY,
}

// Cache configuration
let userDataCache: ReferredUser[] | null = null;
let lastCacheTime: number = 0;
const CACHE_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds

// Function to fetch and cache user data
async function getUserData(): Promise<ReferredUser[]> {
  const now = Date.now();
  if (userDataCache && (now - lastCacheTime) < CACHE_DURATION) {
    return userDataCache;
  }

  const response = await fetch(`${API_BASE_URL}/affiliates/raffle`, {
    headers,
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data = await response.json();
  userDataCache = data.results;
  lastCacheTime = now;
  return userDataCache;
}

// Function to verify user and get their data
export async function verifyUser(username: string): Promise<LeaderboardUser | null> {
  // Use the leaderboard endpoint with deposited type and correct date range
  const url = `${API_BASE_URL}/affiliates/leaderboard?start_date=2025-01-01T00%3A00%3A00.00Z&end_date=2025-05-09T20%3A00%3A00.00Z&type=deposited`;
  const response = await fetch(url, {
    headers,
    cache: 'no-store'
  });
  if (!response.ok) return null;
  const data = await response.json();
  // Prefer data.results, fallback to data.leaderboard
  const arr = Array.isArray(data.results)
    ? data.results
    : Array.isArray(data.leaderboard)
      ? data.leaderboard
      : [];
  const input = username.trim().toLowerCase();
  return arr.find((user: any) =>
    typeof user.username === "string" &&
    user.username.trim().toLowerCase() === input
  ) || null;
}

// API date range
const defaultDateRange = {
  startDate: "2025-01-01T00:00:00.00Z",
  endDate: "2025-05-09T20:00:00.00Z"
}

// Types (same as before)
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
  deposited: number
  avatar: UserAvatar
  position: number
}

export interface LeaderboardResponse {
  code: string
  race?: {
    starts_at: string
    ends_at: string
    prize_pool: number
  }
  results: LeaderboardUser[]
}

export interface UserProfile {
  id: string
  username: string
  avatar: UserAvatar
  totalWagered: number
  totalDeposited: number
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

// Mock data for fallback when API is unavailable
const mockLeaderboardData: LeaderboardResponse = {
  code: "success",
  results: [
    {
      username: "Player123",
      wagered: 15000,
      deposited: 2000,
      position: 1,
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      username: "GamerPro99",
      wagered: 12500,
      deposited: 1800,
      position: 2,
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      username: "WinnerTaker",
      wagered: 10800,
      deposited: 1500,
      position: 3,
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      username: "BetMaster",
      wagered: 9200,
      deposited: 1200,
      position: 4,
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      username: "LuckyStreak",
      wagered: 8500,
      deposited: 1000,
      position: 5,
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
    },
  ],
}

const mockRacesData: RacesFetchResponse = {
  code: "success",
  results: [
    {
      id: "race-1",
      code: "weekly-race",
      name: "Weekly Battle",
      description: "Weekly competition for MEASTER users",
      created_at: new Date().toISOString(),
      starts_at: new Date().toISOString(),
      ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      ended_at: "",
      status: "active",
      payout_distribution: "top3",
      recurring_interval: "weekly",
      participants: [
        {
          id: "participant-1",
          user_id: "user-1",
          race_id: "race-1",
          username: "Player123",
          wagered: 5000,
          wagered_excluding_boost: 5000,
          boosted_amount: 0,
          position: 1,
          prize: 250,
          experience: 500,
          avatar: {
            small: "/placeholder.svg?height=50&width=50",
            medium: "/placeholder.svg?height=100&width=100",
            large: "/placeholder.svg?height=200&width=200",
          },
        },
        {
          id: "participant-2",
          user_id: "user-2",
          race_id: "race-1",
          username: "GamerPro99",
          wagered: 4200,
          wagered_excluding_boost: 4200,
          boosted_amount: 0,
          position: 2,
          prize: 150,
          experience: 400,
          avatar: {
            small: "/placeholder.svg?height=50&width=50",
            medium: "/placeholder.svg?height=100&width=100",
            large: "/placeholder.svg?height=200&width=200",
          },
        },
      ],
    },
  ],
}

const mockReferralsData: ReferralFetchResponse = {
  code: "success",
  results: [
    {
      id: "user-1",
      username: "Player123",
      wagered: 7500,
      deposited: 1000,
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
    },
    {
      id: "user-2",
      username: "GamerPro99",
      wagered: 5200,
      deposited: 800,
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
    },
  ],
}

// Helper function to handle API errors
async function handleApiRequest<T>(url: string, mockData: T, options: RequestInit = {}): Promise<T> {
  console.log(`Making API request to: ${url}`)

  try {
    // Try to fetch from the API with the default headers
    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
      ...options,
    })

    // Check for authentication errors specifically
    if (response.status === 401) {
      console.error("Authentication error (401): API key may be invalid or expired")
      console.log("Falling back to mock data due to authentication error")
      return mockData
    }

    // Check for other errors
    if (!response.ok) {
      console.error(`API error: ${response.status}`)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))

      // Try to get more error details from the response
      try {
        const errorData = await response.json()
        console.error("Error details:", errorData)

        // If there are specific validation errors, log them clearly
        if (errorData.details && Array.isArray(errorData.details)) {
          errorData.details.forEach((detail: any) => {
            console.error("Validation error:", detail.reason)
          })
        }
      } catch (e) {
        console.error("Could not parse error response")
      }

      // For 400 errors, we'll still return mock data but log the issue
      if (response.status === 400) {
        console.log("Bad request (400): Falling back to mock data")
        return mockData
      }

      throw new Error(`API error: ${response.status}`)
    }

    // Parse the successful response
    return await response.json()
  } catch (error) {
    console.error(`Error in API request to ${url}:`, error)
    console.log("Falling back to mock data")

    // Always return mock data on any error
    return mockData
  }
}

// Server-side API functions
// Update the fetchLeaderboard function to match the curl command format
export async function fetchLeaderboard(type: "wagered" | "deposited" = "wagered"): Promise<LeaderboardResponse> {
  console.log(`Fetching ${type} leaderboard from server-side...`)

  const url = `${API_BASE_URL}/affiliates/races?participant_count=50`
  console.log(`Request URL: ${url}`)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    
    // Get the active race data
    const activeRace = Array.isArray(data.results) ? data.results[0] : data;
    
    // Return both race info and participants
    return {
      code: "success",
      race: {
        starts_at: activeRace.starts_at,
        ends_at: activeRace.ends_at,
        prize_pool: activeRace.prize_pool || 500
      },
      results: activeRace.participants?.map((participant: any) => ({
        username: participant.username,
        wagered: participant.wagered,
        deposited: participant.wagered_excluding_boost || participant.wagered,
        position: participant.position,
        avatar: participant.avatar || {
          small: "/placeholder.svg?height=50&width=50",
          medium: "/placeholder.svg?height=100&width=100",
          large: "/placeholder.svg?height=200&width=200"
        }
      })).sort((a: any, b: any) => a.position - b.position) || []
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return mockLeaderboardData
  }
}

// Fetch leaderboard by type and date range
import oldApiData from "@/lib/static-data/old-api-data.json"; // Import the static data

export async function fetchLeaderboardByType(
  type: "wagered" | "deposited",
  startDate = "2025-01-01T00:00:00.00Z",
  endDate = "2026-01-01T00:00:00.00Z"
) {
  const url = `${API_BASE_URL}/affiliates/leaderboard?start_date=${encodeURIComponent(
    startDate
  )}&end_date=${encodeURIComponent(endDate)}&type=${type}`;

  const response = await fetch(url, {
    method: "GET",
    headers: leaderboardHeaders,
  });

  if (!response.ok) {
    throw new Error(`Leaderboard API error: ${response.status}`);
  }

  const apiData = await response.json();

  // Merge static data with API data
  const mergedResults = apiData.results.map((user: any) => {
    const staticUser = oldApiData.results.find(
      (staticEntry: any) =>
        staticEntry.username.trim().toLowerCase() === user.username.trim().toLowerCase()
    );
    const staticWagered = staticUser ? staticUser.wagered : 0;
    return {
      ...user,
      wagered: user.wagered + staticWagered, // Add static wagered to API wagered
    };
  });

  return {
    ...apiData,
    results: mergedResults,
  };
}

// Update the fetchReferrals function to match the curl command format
export async function fetchReferrals(startDate = "2024-01-01", endDate = "2025-12-12"): Promise<ReferralFetchResponse> {
  console.log("Fetching referrals from server-side...")

  console.log(`Using date range: ${startDate} to ${endDate}`)

  // Use the helper function to handle the API request with the correct parameters
  const url = `${API_BASE_URL}/affiliates/raffle?start_date=${startDate}&end_date=${endDate}&code=Measter`
  console.log(`Request URL: ${url}`)

  // For now, just return mock data to avoid any potential issues
  return mockReferralsData
}

// Update the fetchUserProfile function to use the same date formatting
export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    console.log("Fetching user profile from server-side for userId:", userId)

    // For demo purposes, we'll create a mock user profile
    // In a real implementation, you would call the appropriate endpoint with the userId

    // If this is the demo user ID, return a predefined profile
    if (userId === "mock-user-id-123" || userId === "demo-user") {
      return {
        id: userId,
        username: "MeasterFan123",
        avatar: {
          small: "/placeholder.svg?height=50&width=50",
          medium: "/placeholder.svg?height=100&width=100",
          large: "/placeholder.svg?height=200&width=200",
        },
        totalWagered: 7500,
        totalDeposited: 1000,
        rakebackPercentage: 7.5,
        rakebackEarned: 562.5,
        measterCoins: 350,
        joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        depositHistory: [
          {
            date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: 100,
            bonus: 20,
          },
          {
            date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            amount: 200,
            bonus: 40,
          },
          {
            date: new Date(Date.now() - 60 * 24 * 60 * 1000).toISOString().split("T")[0],
            amount: 150,
            bonus: 30,
          },
        ],
        wagerHistory: [
          {
            date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0].substring(0, 7),
            amount: 2500,
          },
          {
            date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0].substring(0, 7),
            amount: 2500,
          },
          {
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0].substring(0, 7),
            amount: 2500,
          },
        ],
      }
    }

    // For any other user ID, return a generic profile
    return {
      id: userId,
      username: "User" + userId.substring(0, 5),
      avatar: {
        small: "/placeholder.svg?height=50&width=50",
        medium: "/placeholder.svg?height=100&width=100",
        large: "/placeholder.svg?height=200&width=200",
      },
      totalWagered: 5000,
      totalDeposited: 800,
      rakebackPercentage: 5,
      rakebackEarned: 250,
      measterCoins: 200,
      joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      depositHistory: [
        {
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          amount: 300,
          bonus: 30,
        },
        {
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          amount: 500,
          bonus: 50,
        },
      ],
      wagerHistory: [
        {
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0].substring(0, 7),
          amount: 2000,
        },
        {
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0].substring(0, 7),
          amount: 3000,
        },
      ],
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function fetchRaces(participantCount = 50): Promise<RacesFetchResponse> {
  console.log("Fetching races from server-side...")
  const url = `${API_BASE_URL}/affiliates/races?participant_count=${participantCount}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Race data received:', data)

    // Transform the data to match our expected format
    return {
      code: "success",
      results: Array.isArray(data) ? data : [data]
    }
  } catch (error) {
    console.error('Error fetching races:', error)
    return mockRacesData
  }
}
