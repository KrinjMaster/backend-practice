'use client'
import { COOKIEALL } from '@/cookie/cookieAll'
import { IState } from '@/interface/IState'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const pathname = usePathname()
    const [url, setUrl] = useState<IState | null>(null)

    useEffect(() => {
        COOKIEALL().then((response) => {
            setUrl({
                url: response[0].value,
                user: response[0].name
            })
        })
    },[])

    return (
        <div className="w-[25%] h-screen">
            <div className='flex flex-col items-center gap-0.5'>
                    <Link href={url?.url === undefined ? '/users/user' : url?.url} className={`${pathname === url?.url ? 'text-white bg-indigo-600' : 'text-gray-500 hover:bg-zinc-400 hover:bg-opacity-10'} flex text-2xl font-bold hover:text-white px-3 rounded-lg w-full items-center gap-3 transition-all duration-150 ease-in-out`}>
                        <svg className="fill-current p-1 h-10 w-10" viewBox="0 0 18 18">
                            <path d="M9 0C4 0 0 4 0 9s4 9 9 9 9-4 9-9-4-9-9-9zM4.3 14.9c1.2-1.3 2.9-2.1 4.7-2.1s3.5.8 4.7 2.1c-1.3 1-2.9 1.6-4.7 1.6s-3.4-.6-4.7-1.6zm10.5-1.1c-1.5-1.6-3.6-2.6-5.8-2.6s-4.3.9-5.8 2.6c-1.1-1.3-1.7-3-1.7-4.8 0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5c0 1.8-.7 3.5-1.7 4.8z"></path>
                            <path d="M9 3.6C7.1 3.6 5.6 5.1 5.6 7s1.5 3.4 3.4 3.4 3.4-1.5 3.4-3.4S10.9 3.6 9 3.6zm0 5.3C8 8.9 7.1 8 7.1 7S8 5.1 9 5.1s1.9.9 1.9 1.9S10 8.9 9 8.9z"></path>
                        </svg>
                        Profile
                    </Link>
                    <Link href={'/users'} className={`${pathname === '/users' ? 'text-white bg-indigo-600' : 'text-gray-500 hover:bg-zinc-400 hover:bg-opacity-10'} flex text-2xl font-bold hover:text-white px-3 rounded-lg w-full items-center gap-3 transition-all duration-150 ease-in-out`}>
                        <svg className="fill-current p-1 h-10 w-10" viewBox="0 0 18 18">
                            <path d="M5.9 7.8C8 7.8 9.8 6 9.8 3.9S8 0 5.9 0 2 1.7 2 3.9s1.7 3.9 3.9 3.9zm0-6.3c1.3 0 2.4 1.1 2.4 2.4S7.2 6.3 5.9 6.3 3.5 5.2 3.5 3.9s1.1-2.4 2.4-2.4zM13 8.8c1.5 0 2.8-1.2 2.8-2.8S14.5 3.3 13 3.3 10.3 4.5 10.3 6s1.2 2.8 2.7 2.8zm0-4c.7 0 1.3.6 1.3 1.3s-.6 1.2-1.3 1.2-1.2-.6-1.2-1.3.5-1.2 1.2-1.2zM13 10.3c-1 0-2 .3-2.8.9C9.1 10 7.6 9.3 5.9 9.3 2.6 9.3 0 11.9 0 15.1v1.1c0 1 .8 1.8 1.8 1.8h14.5c1 0 1.8-.8 1.8-1.8v-1c-.1-2.7-2.4-4.9-5.1-4.9zm-4.3 6.2h-7c-.1 0-.3-.1-.3-.3v-1.1c0-2.4 2-4.4 4.4-4.4s4.4 2 4.4 4.4v1.4H8.7zm7.8-.2c0 .1-.1.3-.3.3h-4.5v-1.4c0-1-.3-2-.7-2.8.6-.4 1.2-.6 1.9-.6 1.9 0 3.5 1.6 3.5 3.5v1z"></path>
                        </svg>
                        Users
                    </Link>
                    <Link href={'/users/settings'} className={`${pathname === '/users/settings' ? 'text-white bg-indigo-600' : 'text-gray-500 hover:bg-zinc-400 hover:bg-opacity-10'} flex text-2xl font-bold hover:text-white px-3 rounded-lg w-full items-center gap-3 transition-all duration-150 ease-in-out`}>
                        <svg className="fill-current p-1 h-10 w-10" viewBox="0 0 18 18">
                            <path d="M9 12.8c-2.1 0-3.8-1.7-3.8-3.8S6.9 5.3 9 5.3s3.8 1.7 3.8 3.8-1.7 3.7-3.8 3.7zm0-6c-1.2 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3S10.2 6.8 9 6.8z"></path>
                            <path d="M9.6 18H8.4c-.9 0-1.6-.7-1.7-1.5l-.2-1.1c-.1 0-.2-.1-.2-.1l-.9.7c-.7.5-1.7.4-2.3-.2l-.9-.9c-.6-.6-.7-1.6-.2-2.3l.7-.9c0-.1-.1-.2-.1-.2l-1.1-.2C.7 11.2 0 10.5 0 9.6V8.4c0-.9.7-1.6 1.5-1.7l1.1-.2c0-.1.1-.2.1-.2L2 5.4c-.5-.7-.4-1.7.2-2.3l.9-.9c.6-.6 1.6-.7 2.3-.2l.9.7c.1 0 .2-.1.2-.1l.2-1.1C6.8.7 7.5 0 8.4 0h1.3c.9 0 1.6.7 1.7 1.5l.2 1.1c.1 0 .2.1.2.1l.8-.7c.7-.5 1.7-.4 2.3.2l.9.9c.6.6.7 1.6.2 2.3l-.7.9c0 .1.1.2.1.2l1.1.2c.8.1 1.5.8 1.5 1.7v1.3c0 .9-.7 1.6-1.5 1.7l-1.1.2c0 .1-.1.2-.1.2l.7.9c.5.7.4 1.7-.2 2.3l-.9.9c-.6.6-1.6.7-2.3.2l-.9-.7c-.1 0-.2.1-.2.1l-.2 1.1c-.1.7-.8 1.4-1.7 1.4zm-3.5-4.4.4.2c.3.2.6.3.9.4l.5.1.3 2c0 .1.1.2.2.2h1.3c.1 0 .2-.1.2-.2l.3-2 .5-.1c.3-.1.6-.2.9-.4l.4-.2 1.6 1.2c.1.1.3 0 .3 0l.9-.9c.1-.1.1-.2 0-.3L13.6 12l.2-.4c.2-.3.3-.6.4-.9l.1-.5 2-.3c.1 0 .2-.1.2-.2V8.4c0-.1-.1-.2-.2-.2l-2-.3-.1-.5c-.1-.3-.2-.6-.4-.9l-.2-.4 1.2-1.6c.1-.1 0-.3 0-.3l-.9-.9c-.1-.1-.2-.1-.3 0L12 4.5l-.4-.2c-.3-.2-.6-.3-.9-.4l-.5-.1-.3-2c0-.1-.1-.2-.2-.2H8.4c-.1 0-.2.1-.2.2l-.3 2h-.5c-.3.1-.6.3-.9.4l-.4.2-1.6-1.2c-.1-.1-.3 0-.3 0l-.9.9c-.1.1-.1.2 0 .3L4.5 6l-.3.5c-.1.3-.3.6-.4.9l-.1.4-2 .3c-.1 0-.2.1-.2.2v1.3c0 .1.1.2.2.2l2 .3.1.5c.1.3.2.6.4.9l.2.4-1.2 1.6c-.1.1 0 .3 0 .3l.9.9c.1.1.2.1.3 0l1.7-1.1z"></path>
                        </svg>
                        Settings
                    </Link>
            </div>
        </div>
    )
}

export default Navbar