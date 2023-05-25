// import { useStore } from '../../../store/store'
// import { redirect } from 'next/navigation'
import { IUserInfo } from '../../../interface/IUserInfo'
// import { usePathname } from 'next/navigation'
// import PostBody from '@/components/postBody'
// // import { useEffect, useRef, useState } from 'react'
import kv from '@vercel/kv'

export default async function Page({ params }:  {params: {user: string}}) {
  // const postRef = useRef<HTMLInputElement | null>(null)
  // const { pathname } = usePathname()
  // const {isLoggedIn, username, updateData} = useStore()
  // const [open, setOpen] = useState(false)
  // const currentDate = new Date()
  // const [letters, setLetters] = useState(0)
  const user = await kv.get<IUserInfo>(params.user)

  // useEffect(() => {
  //   if (!isLoggedIn) redirect('/auth')
  // },[isLoggedIn])

  // const onChangeText = (() => {
  //   if (postRef.current?.value.length && postRef.current?.value.length > 150) {
  //     alert('Only 150 characters are allowed')
  //   }
  //   if (postRef.current?.value.length && postRef.current && postRef.current.value.length <= 150) {
  //     setLetters(postRef.current.value.length)
  //   }
  //   else if (postRef.current?.value === '') {
  //     setLetters(0)
  //   }
  // })

  // useEffect(() => {
  //   if (pathname.slice(7,pathname.length) === username) [
  //     setOpen(true)
  //   ]
  // },[updateData])

  // const handlesubmit = async () => {
  //   if (postRef.current?.value !== '' && postRef.current && user) {
  //       const posts = user.posts
  //       POST(username, user.password, [...posts, {user: username, date: currentDate.getTime(), body: postRef.current.value.substring(0,150), rating: 0}])
  //       postRef.current.value = ''
  //       setLetters(0)
  //   } else {
  //     alert('Plese enter a post')
  //   }
  // }

  return (
    <div className='flex justify-end'>
      <form className='w-[80vw] h-screen bg-zinc-800 rounded-lg text-white text-xl flex flex-col p-3.5'>
        <label className='bg-transparent font-bold text-7xl'>{user?.username}</label>
        {/* <div className='w-[70%] h-full mt-5'>
          {open &&
          <div className='h-9 bg-transparent flex gap-2.5'>
              <h1 className='text-gray-400 m-auto'>{letters}/150</h1>
              <input className='bg-transparent border w-[95%] rounded-lg px-1' type='text' placeholder='new post' ref={postRef} onChange={onChangeText} value={postRef.current?.value.substring(0,150)}/>
              <div className='bg-white w-9 rounded-xl flex items-center justify-center align-middle' onClick={() => handlesubmit()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                </svg>
              </div>
          </div>
          }
          {user?.posts.length === 0 
           ? <h1 className='font-bold text-center'>No posts yet</h1> 
           : <div className='flex flex-col-reverse gap-2 mt-2'>
              {user?.posts.map(post => 
                <PostBody {...post} key={post.date}/>  
              )}
            </div>}
        </div> */}
      </form>
    </div>
  )
}


