import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  // Read cookies for authentication
  const cookieStore: any = cookies()
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

    // Dispatch to Discord bot for rakeback claim notification
    const discordId = cookieStore.get('discordId')?.value
    if (!discordId) {
      console.error('Cashout route: missing discordId cookie, skipping bot dispatch')
    } else {
      // Determine bot service URL
      const baseBotUrl = process.env.DISCORD_BOT_URL || process.env.API_BASE_URL || ''
      if (!baseBotUrl) {
        console.error('Cashout route: missing DISCORD_BOT_URL or API_BASE_URL env var')
      } else {
        const url = baseBotUrl.replace(/\/+$/, '') + '/discord/rakebackClaim'
        try {
          const botResp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ discordId, rainId, rainUsername, claimedWagered, claimedAmount }),
          })
          if (!botResp.ok) {
            const text = await botResp.text()
            console.error('Discord bot dispatch failed:', botResp.status, text)
          }
        } catch (botErr) {
          console.error('Error dispatching to Discord bot:', botErr)
        }
      }
    }

    return NextResponse.json({ message: 'Cashout recorded successfully.' })
  } catch (err) {
    console.error('Cashout API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
