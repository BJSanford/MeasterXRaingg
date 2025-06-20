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

    // Dispatch to Discord bot for payout via slash in verification channel
    try {
      const discordId = cookieStore.get('discordId')?.value
      if (discordId) {
        await fetch(`${process.env.API_BASE_URL}/discord/rakebackClaim`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ discordId, rainId, rainUsername, claimedWagered, claimedAmount }),
        })
      } else {
        console.error('No discordId cookie, bot dispatch skipped')
      }
    } catch (botErr) {
      console.error('Error dispatching to Discord bot:', botErr)
    }

    return NextResponse.json({ message: 'Cashout recorded successfully.' })
  } catch (err) {
    console.error('Cashout API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
