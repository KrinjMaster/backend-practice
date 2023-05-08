'use server'
import kv from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST(username: string, password: string) {
  await kv.hset('KrinjMaster', {
    username: username,
    password: password,
  })
  return
}
export async function GET(username: string) {
  const session = await kv.hgetall(username)
  return session
}
