import { NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma' // Mocking prisma

export async function POST(req: Request) {
  try {
    const { userId, style, colors, rooms, budget } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Mocking user update
    const user = {
      id: userId,
      stylePreference: style,
      colorPreferences: colors,
      roomPreferences: rooms,
      budgetRange: budget,
    }

    return NextResponse.json({ success: true, user })

  } catch (error) {
    console.error('Preferences error:', error)
    return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 })
  }
}
