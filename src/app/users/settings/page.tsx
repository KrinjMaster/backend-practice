import { IUserInfo } from '@/interface/IUserInfo'
import kv from '@vercel/kv'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = cookies().getAll()[0].name
  const userData = await kv.get<IUserInfo | null>(`user:${user}`)

  const handleSignOut = async () => {
    'use server'
    cookies().delete(user)
    redirect('/auth')
  }

  return (
    <div className='w-full h-screen rounded-lg text-white text-xl p-1 flex'>
      <form className='flex gap-1 flex-col mx-auto' action={handleSignOut}>
        <div className='text-white bg-[#202020] h-fit w-96 rounded-lg p-1 mx-auto'>
          <p className='text-gray-500 font-light text-lg'>username</p>
          <h1 className='font-bold text-3xl'>{userData?.username}</h1>
        </div>
        <div className='text-white bg-[#202020] w-96 h-fit rounded-lg p-1 mx-auto'>
          <p className='text-gray-500 font-light text-lg'>password</p>
          <h1 className='font-bold text-3xl'>{userData?.password}</h1>
        </div> 
        <input className='bg-indigo-600 hover:bg-indigo-800 rounded-lg font-bold p-1 w-fit transition-all duration-150 ease-in-out mr-auto' type='submit' value='Log out'/>
      </form>
    </div>
  )
}