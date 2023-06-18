import { cookies } from 'next/headers'
import kv from '@vercel/kv'
import ListIncoming from '@/components/ListFriendsReq'
import { IFriendReq } from '@/interface/IFriendReq'

const page = async () => {
  const username = cookies().getAll()[0].name
  const incomingList = await kv.lrange<IFriendReq>(`user:${username}:incoming`, 0, -1)
  return (
     <div className='w-full h-screen rounded-lg text-white text-xl p-1 flex'>
      <div className='grid grid-cols-2 h-fit w-full'>
        {incomingList.map((user) =>
           // @ts-expect-error Server Component 
          <ListIncoming {...user} key={user.username}/>
        )}
      </div>
     </div>
  )
}

export default page