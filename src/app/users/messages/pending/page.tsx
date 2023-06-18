import { IFriendReq } from '@/interface/IFriendReq'
import kv from '@vercel/kv'
import { cookies } from 'next/headers'
import ListFriendsReq from '@/components/ListFriendsReq'

const page = async () => {
  const username = cookies().getAll()[0].name
  const pendingList = await kv.lrange<IFriendReq>(`user:${username}:pending`, 0, -1)
  return (
     <div className='w-full h-screen rounded-lg text-white text-xl p-1 flex'>
       <div className='grid grid-cols-2 h-fit w-full'>
         {pendingList.map((user) =>
           // @ts-expect-error Server Component 
           <ListFriendsReq {...user} key={user.username}/>
         )}
       </div>
    </div>
  )
}

export default page