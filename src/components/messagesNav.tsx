/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MessagesNav = () => {
    const pathname = usePathname()
    return (
        <div className="w-full h-fit font-bold gap-1 grid grid-cols-3">
            <Link href='/users/messages' className={`${pathname === '/users/messages' ? 'bg-violet-500 text-white' : 'text-gray-500 hover:bg-zinc-400 hover:bg-opacity-10'} h-fit p-1 rounded-lg w-full text-center`}>Messages</Link>
            <Link href='/users/messages/incoming' className={`${pathname === '/users/messages/incoming' ? 'bg-violet-500 text-white' : 'text-gray-500 hover:bg-zinc-400 hover:bg-opacity-10'} h-fit p-1 rounded-lg w-full text-center`}>Incoming</Link>
            <Link href='/users/messages/pending' className={`${pathname === '/users/messages/pending' ? 'bg-violet-500 text-white' : 'text-gray-500 hover:bg-zinc-400 hover:bg-opacity-10'} h-fit p-1 rounded-lg w-full text-center`}>Pending</Link>
        </div>
    )
}

export default MessagesNav