'use server'
import kv from '@vercel/kv'
import { IUserInfo } from '../interface/IUserInfo'

export async function POST(username: string, password: string) {
  await kv.set(username, {
    username: username,
    password: password,
  })
  return
}

export async function GET(username: string): Promise<IUserInfo | null> {
  const session: any = await kv.get(username)
  return session
}
