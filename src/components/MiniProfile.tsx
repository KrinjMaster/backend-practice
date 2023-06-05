'use client'
import { IUserInfo } from '@/interface/IUserInfo'
import Image from 'next/image'
import { useState } from 'react'

export const MiniProfile = (user: IUserInfo) => {
    const [buttonState, setButtonState] = useState(false)
    return (<>
    <div onClick={() => setButtonState(!buttonState)}>
        <Image src={user.profileImage} width={30} height={30} alt='userImage' className='absolute right-2 top-2 w-16 h-16 rounded-lg'/>
    </div>
    {buttonState && <div className='border-2 absolute top-20 right-2 w-fit p-2 text-white border-violet-500 rounded-lg font-bold flex gap-1 flex-col'>
        <h1 className='text-2xl text-center'>{user.username}</h1> 
        <h1>password: <br/>{user.password}</h1>
    </div>}
    </>)
}