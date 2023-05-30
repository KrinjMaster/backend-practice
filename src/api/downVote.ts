'use server'
import kv from '@vercel/kv'
import { IPost } from '../interface/IPost'
import { revalidatePath } from 'next/cache'

export async function DOWNVOTE(post: IPost, index: number) {
  post.rating -= 1
  await kv.lset(`posts:${post.user}`, index, post)
  revalidatePath(`users/${post.user}`)
}
