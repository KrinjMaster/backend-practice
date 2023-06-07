'use server'
import { IUserInfo } from '@/interface/IUserInfo'
import Image from 'next/image'
import kv from '@vercel/kv'

export default async function Page({ params }:  {params: {user: string}}) {
  const user = await kv.get<IUserInfo | null>(`user:${params.user}`)
  if (user) {
    return (
      <div className='w-full h-screen rounded-lg text-white text-xl p-1 flex flex-col gap-1'>
        <div className='text-white bg-zinc-800 w-full rounded-lg p-1'>
          <Image src={user.profileImage} alt='userImage' width={30} height={30} className='w-24 h-24 rounded-xl mt-auto mb-auto'/>
        </div>
        <div className='text-white bg-zinc-800 w-full rounded-lg p-1'>
          <p className='text-gray-500 font-light text-lg'>username</p>
          <h1 className='font-bold text-3xl'>{user.username}</h1>
        </div>
        <div className='text-white bg-zinc-800 w-full rounded-lg p-1'>
          <p className='text-gray-500 font-light text-lg'>password</p>
          <h1 className='font-bold text-3xl'>{user.password}</h1>
        </div>
      </div>
    )
  } else {
    return
  }
}