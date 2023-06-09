'use server'
import { IListUser } from '@/interface/IListUser'
import Image from 'next/image'
import Link from 'next/link'

const ListUser = (user: IListUser) => {
  return (
    <Link href={`users/${user.username}`} className='font-bold text-5xl'>
        <div className='hover:bg-[#202020] rounded-lg w-full flex gap-1 p-1 transition-all duration-150 ease-in-out'>
            <Image src={user.profileImage} alt='userImage' width={30} height={30} className='w-16 h-16 rounded-xl'/> 
            <h1 className='my-auto'>{user.username}</h1>
        </div>
    </Link>
  )
}

export default ListUser
