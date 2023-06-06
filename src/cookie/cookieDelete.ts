'use server'
import { cookies } from 'next/headers'

export async function COOKIEDELETE(username: string) {
  cookies().delete(username)
}
