import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
// import { prisma } from '@/lib/prisma' // Mocking prisma

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, language } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mocking database check
    if (email === 'test@test.com') {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    // Mocking user creation
    const user = {
      id: 'mock-user-id',
      email,
      name,
    }

    return NextResponse.json({
      success: true,
      user,
      message: 'Account created successfully'
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
