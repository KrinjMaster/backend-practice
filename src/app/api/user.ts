'use server'
import kv from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function GET() {
  await kv.set('Max', '1839193719')
  const session = await kv.get('user_1_session')
  console.log(NextResponse.json(session))
}
