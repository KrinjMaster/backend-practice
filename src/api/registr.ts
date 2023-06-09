'use server'
import kv from '@vercel/kv'
import { IUserInfo } from '../interface/IUserInfo'
import { cookies } from 'next/headers'

export async function REG(username: string, password: string) {
  const date = new Date()
  await kv.set<IUserInfo>(`user:${username}`, {
    profileImage: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${username}`,
    username: username,
    password: password,
    date: date.getTime(),
  })
  await kv.lpush(`posts:${username}`, '')
  await kv.lrem(`posts:${username}`, 1, '')
  await kv.lpush('users', {
    username: username,
    profileImage: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${username}`,
  })
  cookies().set({
    name: username,
    value: 'true',
    httpOnly: true,
  })
}
