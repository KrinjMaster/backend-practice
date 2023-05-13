'use client'
import { useEffect, useState } from 'react'
import { useStore } from '../store/store'
import { redirect } from 'next/navigation'
import { GET } from './api/user'
import { IUserInfo } from './interface/IUserInfo'

export default function Home() {
  const {isLoggedIn, username, changeState} = useStore()
  const [ open, setOpen ] = useState(false)
  const [userProfile, setUserProfile ] = useState<IUserInfo | null>()

  useEffect(() => {
    if (!isLoggedIn) redirect('/auth')
  },[isLoggedIn])

  GET(username)
  .then((response: any) => setUserProfile(response))

  return (
    <main>
      <div className='w-fit h-fit bg-violet-500 rounded-full absolute right-2 top-2 border-2 border-violet-100 z-10' onClick={() => setOpen(!open)}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 128 128" fill='white'>
          <path d="M 64 27 C 51.3 27 41 37.3 41 50 C 41 62.7 51.3 73 64 73 C 76.7 73 87 62.7 87 50 C 87 37.3 76.7 27 64 27 z M 64 33 C 73.4 33 81 40.6 81 50 C 81 59.4 73.4 67 64 67 C 54.6 67 47 59.4 47 50 C 47 40.6 54.6 33 64 33 z M 64 81 C 47.6 81 32.400781 89.899609 24.300781 104.09961 C 23.500781 105.49961 24 107.39922 25.5 108.19922 C 26 108.49922 26.5 108.59961 27 108.59961 C 28 108.59961 29.099609 108.09961 29.599609 107.09961 C 36.599609 94.699609 49.8 87 64 87 C 78.2 87 91.4 94.699609 98.5 107.09961 C 99.3 108.49961 101.09961 108.99922 102.59961 108.19922 C 103.99961 107.39922 104.49922 105.59961 103.69922 104.09961 C 95.599219 89.899609 80.4 81 64 81 z"></path>
        </svg>
      </div>
      {open &&
      <div className='w-[250px] h-fit bg-violet-400 absolute right-1 top-1 rounded-lg text-white text-xl p-1'>
      <h2 className='font-light'>Username:</h2>
      <h1 className='font-bold'>{userProfile?.username}</h1>
      <h2 className='font-light'>Password:</h2>
      <h1 className='font-bold'>{userProfile?.password}</h1>
      <button className='w-fit h-fit p-1 font-bold text-black bg-red-500 rounded-lg' onClick={() => changeState(false)}>Log out</button>
      </div>}
    </main>
  )
}
