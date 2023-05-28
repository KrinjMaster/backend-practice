'use server'
import kv from '@vercel/kv'
import { IUserInfo } from '../interface/IUserInfo'
import { IPost } from '../interface/IUserInfo'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function POST(username: string, password: string, posts: IPost[]) {
  try {
    await kv.set(`user:${username}`, {
      username: username,
      password: password,
      posts: posts,
    })
  } catch (err) {
    console.log('Error: ' + err)
  }
}

export async function GET(username: string) {
  return await kv.get<IUserInfo>(`user:${username}`)
}

export async function POSTDATE(username: string) {
  const date = new Date()
  try {
    await kv.set(`date:${username}`, date)
  } catch (err) {
    console.log('Error: ' + err)
  }
}

export async function COOKIEADD(username: string) {
  cookies().set(username, 'true')
}

export async function UPVOTE(username: string, id: number) {
  await kv.get<IUserInfo>(`user:${username}`).then((user) => {
    const post = Object.assign(
      {},
      user?.posts.filter((post) => post?.date === id)[0]
    )
    if (post) {
      post.rating++
      const newArray = user?.posts.map((postEl) => {
        if (postEl.date === id) {
          return post
        } else {
          return postEl
        }
      })
      kv.set(`user:${username}`, {
        username: user?.username,
        password: user?.password,
        posts: newArray,
      })
      revalidatePath(`users/${user?.username}`)
    }
  })
}

export async function DOWNVOTE(username: string, id: number) {
  await kv.get<IUserInfo>(`user:${username}`).then((user) => {
    const post = Object.assign(
      {},
      user?.posts.filter((post) => post?.date === id)[0]
    )
    if (post) {
      post.rating--
      const newArray = user?.posts.map((postEl) => {
        if (postEl.date === id) {
          return post
        } else {
          return postEl
        }
      })
      kv.set(`user:${username}`, {
        username: user?.username,
        password: user?.password,
        posts: newArray,
      })
      revalidatePath(`users/${user?.username}`)
    }
  })
}
