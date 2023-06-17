import { IPending } from '@/interface/IPending'
import kv from '@vercel/kv'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'

const ListPending = async (request: IPending) => {
    const handleAccept = async () => {
        'use server'
        await kv.lpush(`user:${request.from}:friends`, {username: request.from, profileImage: request.profileImage})
        await kv.lrem(`user:${request.to}:pendings`, 1, request)
        revalidatePath('users/messages/pending')
    }
    
    const handleDeny = async () => {
        'use server'
        await kv.lrem(`user:${request.to}:pendings`, 1, request)
        revalidatePath('users/messages/pending')
    }

    return (
        <div className='hover:bg-[#202020] rounded-lg w-full flex gap-1 p-1 transition-all duration-150 ease-in-out flex'>
            <Link href={`/users/${request.from}`} className='font-bold text-5xl flex'>
                <Image src={request.profileImage} alt='userImage' width={30} height={30} className='w-16 h-16 rounded-xl'/> 
                <h1 className='my-auto'>{request.from}</h1>
            </Link>
            <form className='ml-auto my-auto flex gap-1 text-4xl'>
                <button formAction={handleDeny}>❌</button>
                <button formAction={handleAccept}>✅</button>
            </form>
        </div>
    )
}

export default ListPending
