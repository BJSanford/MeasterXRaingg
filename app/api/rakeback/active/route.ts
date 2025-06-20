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

    // Compute date range
    const now = new Date()
    const end = now.toISOString()
    const startDate = new Date(now)
    startDate.setDate(now.getDate() - 7)
    const start = startDate.toISOString()

    // Fetch from Rain API
    let json: any = {}
    try {
      const external = await fetch(
        `https://api.rain.gg/v1/affiliates/leaderboard?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}&type=deposited`
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
