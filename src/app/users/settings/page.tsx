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

  const handleDelete = async () => {
    'use server'
    await kv.del(`user:${user}`)
    await kv.del(`posts:${user}`)
    await kv.lrem(`users`, 1, {
      username: userData?.username,
      profileImage: userData?.profileImage
    })
    cookies().delete(user)
    redirect('/auth')
  }

  return (
    <div className='w-full h-screen rounded-lg text-white text-xl p-1 flex'>
      <form className='flex md:w-fit w-full gap-1 flex-col md:mx-auto' action={handleSignOut}>
        <div className='text-white bg-[#202020] h-fit md:w-96 w-full rounded-lg p-1 md:mx-auto'>
          <p className='text-gray-500 font-light text-lg'>username</p>
          <h1 className='font-bold text-3xl'>{userData?.username}</h1>
        </div>
        <div className='text-white bg-[#202020] md:w-96 w-full h-fit rounded-lg p-1 md:mx-auto'>
          <p className='text-gray-500 font-light text-lg'>password</p>
          <h1 className='font-bold text-3xl'>{userData?.password}</h1>
        </div> 
        <div className='flex'>
          <input className='bg-violet-500 hover:bg-violet-700 rounded-lg font-bold p-1 w-fit transition-all duration-150 ease-in-out mr-auto' type='submit' value='Log out'/>
          <button className='bg-violet-500 hover:bg-red-500 rounded-lg font-bold p-1 w-fit transition-all duration-150 ease-in-out ml-auto' value='Delete profile' formAction={handleDelete}>Delete profile</button>
        </div>
      </form>
    </div>
  )
}