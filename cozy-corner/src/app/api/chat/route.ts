import { NextResponse } from 'next/server'
import { getChatResponse } from '@/lib/gemini'

export async function POST(req: Request) {
  try {
    const { message, language, context } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const reply = await getChatResponse(
      message,
      language || 'en',
      context
    )

    return NextResponse.json({ reply, success: true })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
