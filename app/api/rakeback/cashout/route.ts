import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  // Read cookies for authentication
  const cookieStore: any = await cookies()
  const rainUsername = cookieStore.get('rainUsername')?.value
  const rainId = cookieStore.get('rainId')?.value
  if (!rainUsername || !rainId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const { claimedWagered, claimedAmount } = await request.json()
    // Record the cashout in database
    // @ts-ignore
    await (prisma as any).rakebackClaim.create({
      data: {
        rainId,
        rainUsername,
        claimedWagered,
        claimedAmount,
      },
    })

    return NextResponse.json({ message: 'Cashout recorded successfully.' })
  } catch (err) {
    console.error('Cashout API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
