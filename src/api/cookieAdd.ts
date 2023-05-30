'use server'
import { cookies } from 'next/headers'

export async function COOKIEADD(username: string) {
  cookies().set(username, 'true')
}
