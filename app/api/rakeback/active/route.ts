import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Read cookies
    const cookieStore: any = cookies()
    const rainUsername = cookieStore.get('rainUsername')?.value
    if (!rainUsername) {
      console.error('No rainUsername cookie')
      return NextResponse.json({ rakebackWagered: 0, previousClaimedWagered: 0 })
    }

    // Use fixed perpetual window: from June 18, 2025 through Jan 1, 2030
    const start = '2025-06-11T00:00:00.00Z'
    const end = '2030-01-01T00:00:00.00Z'

    // Support either env var name
    const rainApiKey = process.env.RAIN_API_KEY || process.env.RAIN_API_TOKEN || ''
    let json: any = {}
    try {
      // Fetch leaderboard from Rain API
      const external = await fetch(
        `https://api.rain.gg/v1/affiliates/leaderboard?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}&type=wagered`,
        {
          headers: {
            'x-api-key': rainApiKey,
          },
        }
      )
      if (external.ok) json = await external.json()
      else console.error('Rain API status', external.status)
    } catch (err) {
      console.error('Error calling Rain API:', err)
    }

    // Determine wagered
    const entry = json.results?.find((e: any) => e.username?.toLowerCase() === rainUsername.toLowerCase())
    const rakebackWagered = entry?.deposited ?? 0

    // Get previous claim
    const lastClaim = await (prisma as any).rakebackClaim.findFirst({
      where: { rainUsername },
      orderBy: { claimedAt: 'desc' },
    })
    const previousClaimedWagered = lastClaim?.claimedWagered ?? 0

    return NextResponse.json({ rakebackWagered, previousClaimedWagered })
  } catch (err) {
    console.error('Error in /api/rakeback/active GET:', err)
    return NextResponse.json({ rakebackWagered: 0, previousClaimedWagered: 0 })
  }
}
