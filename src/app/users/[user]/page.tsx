import PostBody from '@/components/postBody'
import { IPost } from '@/interface/IPost'
import kv from '@vercel/kv'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { IUserInfo } from '../../../interface/IUserInfo'
import Image from 'next/image'

export default async function Page({ params }:  {params: {user: string}}) {
  const [user, posts] = await Promise.all([
    await kv.get<IUserInfo | null>(`user:${params.user}`),
    await kv.lrange<IPost>(`posts:${params.user}`, 0, -1)
  ])
  const isCurrentUser = cookies().get(params.user)
  
  if (user) {
    const date = new Date(user.date)
    const addPost = async (formdata: FormData) => {
      'use server'
      const body = formdata.get('postBody')
      if (body) {
        const date = new Date()
        await kv.lpush(`posts:${params.user}`, {
          user: params.user,
          date: date.getTime(),
          body: body.toString(),
          rating: 0
        })
        revalidatePath(`users/${params.user}`)
      }
    }
    
    return (<>
      <div className='flex justify-end w-full h-full md:mb-0 mb-24'>
        <div className='w-full h-fit text-white text-xl flex flex-col px-2'>
          <div className='flex gap-1.5'>
            <Image src={user.profileImage} alt='userImage' width={30} height={30} className='md:w-24 md:h-24 h-20 w-20 rounded-xl mt-auto mb-auto'/>
            <div className='flex flex-col gap-1 my-auto'>
              <h1 className='bg-transparent font-bold md:text-7xl text-lg min-[300px]:text-3xl'>{user.username}</h1>
              <h1 className='text-zinc-500 font-bold md:text-xl text-sm'>joined {`${date.getDate() > 10 ? date.getDate() : '0'+date.getDate()}.${date.getMonth() > 10 ? date.getMonth() : '0'+date.getMonth()}.${date.getFullYear()}`}</h1>
            </div>
          </div>
          <div className='md:w-[80%] w-full h-full mt-5'> 
            {!!isCurrentUser?.value && <div className='h-9 bg-transparent flex gap-2.5'>
            <form name='form' action={addPost} className='flex gap-2 w-full'>
              <input className='bg-[#202020] h-full w-[95%] placeholder:font-normal font-normal px-2 rounded-lg text-xl' type='text' placeholder='new post' name='postBody' spellCheck={true}/>
              <button type='submit' className='bg-indigo-600 w-9 rounded-xl flex items-center justify-center align-middle'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-white md:w-[24px] md:h-[24px] w-[20px] h-[20px]'>
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                </svg>
              </button> 
            </form>
            </div>}
            {posts?.length === 0 
            ? <h1 className='font-bold text-center'>No posts yet</h1> 
            : <div className='flex flex-col gap-2 mt-2'>
            {posts.map((post, index) => 
                // @ts-expect-error Server Component 
                <PostBody post={post} index={index} isCurrentUser={!!isCurrentUser?.value} profileImage={user.profileImage} key={post.date}/>  
                )}
            </div>}
          </div> 
        </div>
      </div>
    </>
    )
  } else {
    return
  }
}


