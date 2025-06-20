import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET() {
  // Read cookies synchronously
  const cookieStore = cookies()
  const rainUsername = cookieStore.get('rainUsername')?.value
  if (!rainUsername) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Compute date range: last 7 days
  const now = new Date()
  const end = now.toISOString()
  const startDate = new Date(now)
  startDate.setDate(now.getDate() - 7)
  const start = startDate.toISOString()

  // Call external Rain API on server
  const apiUrl = `https://api.rain.gg/v1/affiliates/leaderboard?start_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}&type=deposited`
  const external = await fetch(apiUrl)
  if (!external.ok) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 502 })
  }
  const json = await external.json()

  // Find this user entry
  const entry = json.results?.find((e: any) => e.username?.toLowerCase() === rainUsername.toLowerCase())
  const rakebackWagered = entry?.deposited ?? 0

  // Get last claim from DB
  const lastClaim = await (prisma as any).rakebackClaim.findFirst({
    where: { rainUsername },
    orderBy: { claimedAt: 'desc' },
  })
  const previousClaimedWagered = lastClaim?.claimedWagered ?? 0

  return NextResponse.json({ rakebackWagered, previousClaimedWagered })
}
