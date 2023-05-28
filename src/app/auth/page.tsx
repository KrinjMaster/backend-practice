'use client'
import Link from 'next/link'
import { GET } from '../../api/user'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { Target } from '@/interface/IUserInfo'

export default function Page() {
  const { push } = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement> & {target: Target}) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password1.value
    GET(username).then((response: any) => {
      if (JSON.stringify(response) !== undefined) {
        if (response.password === password) {
          push(`/users/${username}`)
        }
        else {
          alert('Password must match')
        }
      }
      else {
        alert('User does not already exists')
      }
    })
  }

  return (
    <div className="text-white font-bold flex h-screen">
      <div className="w-[300px] flex bg-slate-100/20 h-[350px] m-auto text-3xl rounded-lg align-middle justify-center items-center">
        <form className="flex flex-col w-[250px] text-left m-auto" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" id='username' minLength={3} maxLength={15} className="bg-transparent border rounded-lg text-lg"></input>
          <label>Password:</label>
          <input type="password" id='password1' minLength={1} className="bg-transparent rounded-lg text-lg border"></input>
          <button className="text-zinc-600 bg-white rounded-lg relative bottom-0 mt-5 hover:text-black transition-all duration-300 ease-in-out" type="submit">Log in</button>
          <Link href='/auth/reg' className="text-gray-400 text-center text-sm mt-5 hover:text-black bg-white w-fit px-1.5 rounded-md m-auto transition-all duration-300 ease-in-out">I don&lsquo;t have an account</Link>
        </form>
      </div>
    </div>
  )
}