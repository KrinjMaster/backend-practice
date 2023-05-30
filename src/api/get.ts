'use server'
import kv from '@vercel/kv'
import { IUserInfo } from '../interface/IUserInfo'

export async function GET(username: string) {
  return await kv.get<IUserInfo>(`user:${username}`)
}
