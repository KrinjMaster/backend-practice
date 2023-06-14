import ListUser from '@/components/listUser'
import { IListUser } from '@/interface/IListUser'
import kv from '@vercel/kv'
import { revalidatePath } from 'next/cache'

export default async function Page() {
  const usersList = await kv.lrange<IListUser>(`users`, 0, -1)
  revalidatePath('/users')

  return (
    <div className='w-full h-screen rounded-lg text-white text-xl p-1 flex flex-col gap-2 md:mb-0 mb-20'>
      <div className='h-fit w-full grid md:grid-cols-2 grid-cols-1'>
        {usersList.sort().map((user) => 
          <ListUser {...user} key={user.username}/>
        )}
      </div>
    </div>
  )
}