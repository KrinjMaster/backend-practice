import { IUserInfo } from '@/interface/IUserInfo'
import kv from '@vercel/kv'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Reg() {
  const handleSubmit = async (formdata: FormData) => {
    'use server'

    const username = formdata.get('username')
    const password1 = formdata.get('password1')
    const password2 = formdata.get('password2')

    if (username && password1 && password2) {
      const potentialUser = await kv.get<IUserInfo | null>(username.toString())
      if (potentialUser === null) {
          if (password1 === password2) {
            await kv.set(username.toString(), {
              username: username.toString(),
              password: password1.toString(),
              posts: []
            })
            cookies().set(username.toString(), 'true')
          }
      }
    }
  }

  if (typeof document !== 'undefined') {
    const form = document.querySelector('form')
    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault()
      form.clear()
    })
  }
  

  return (
    <div className="text-white font-bold flex h-screen">
      <div className="w-[300px] flex flex-col bg-slate-100/20 h-[350px] m-auto text-3xl rounded-lg align-middle justify-center items-center p-2">
        <form className="flex flex-col w-[250px] text-center m-auto text-2xl" action={handleSubmit} id='form'>
          <label>Username:</label>
          <input type="text" spellCheck='false' name='username' minLength={3} maxLength={15} required className="bg-transparent rounded-lg text-lg border-2 decoration-transparent"></input>
          <label>Password:</label>
          <input type="password" name='password1' required className="bg-transparent border-2 rounded-lg text-lg"></input>
          <label>Re-enter password:</label>
          <input type="password" name='password2' required className="bg-transparent rounded-lg text-lg border-2"></input>
          <input className="text-zinc-600 bg-white rounded-lg relative bottom-0 mt-5" type="submit" value="Submit"/>
        </form>
        <Link href='/auth' className='bg-red-500 px-3 rounded-lg text-xl'>Back</Link>
      </div>
    </div>
  )
}