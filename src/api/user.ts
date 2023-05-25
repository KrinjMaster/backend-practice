'use server'
import kv from '@vercel/kv'
import { IUserInfo } from '../interface/IUserInfo'
import { IPost } from '../interface/IUserInfo'

export async function POST(username: string, password: string, posts: IPost[]) {
  await kv.set(username, {
    username: username,
    password: password,
    posts: posts,
  })
  return
}

export async function GET(username: string): Promise<IUserInfo | null> {
  const session = await kv.get<IUserInfo>(username)
  return session
}
