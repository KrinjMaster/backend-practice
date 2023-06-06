'use server'
import { cookies } from 'next/headers'

export async function COOKIEALL() {
  return cookies().getAll()
}
