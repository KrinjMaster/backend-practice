'use server'
import kv from '@vercel/kv'
import { IPost } from '../interface/IPost'
import { revalidatePath } from 'next/cache'

export async function DELETEPOST(post: IPost) {
  await kv.lrem(`posts:${post.user}`, 1, post)
  revalidatePath(`users/${post.user}`)
}
