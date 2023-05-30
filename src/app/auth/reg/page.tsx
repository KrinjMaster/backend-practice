'use client'
import { GET } from '@/api/get'
import { REG } from '@/api/registr'
import { ITarget } from '@/interface/ITarget'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormEvent } from 'react'

export default async function Reg() {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement> & {target: ITarget}) => {
    e.preventDefault()
    const username = e.target.username.value
    const password1 = e.target.password1.value
    const password2 = e.target.password2.value
    
    if (username && password1 && password2) {
      GET(username).then(user => {
        if (user === null) {
          if (password1 === password2) {
            REG(username, password1)
            router.push('/auth')
          } 
          else {
            alert('Passwords must match')
          }
        } 
        else {
          alert(`${username} profile already exists`)
        }
      })
    }
  }

  return (
    <div className="text-white font-bold flex h-screen">
      <div className="w-[300px] flex flex-col bg-slate-100/20 h-[350px] m-auto text-3xl rounded-lg align-middle justify-center items-center p-2">
        <form className="flex flex-col w-[250px] text-left m-auto text-2xl" id='form' onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" spellCheck='false' id='username' minLength={3} maxLength={15} className="bg-transparent rounded-lg text-lg border decoration-transparent"></input>
          <label>Password:</label>
          <input type="password" id='password1' className="bg-transparent border rounded-lg text-lg"></input>
          <label>Re-enter password:</label>
          <input type="password" id='password2' className="bg-transparent rounded-lg text-lg border"></input>
          <button className="text-zinc-600 bg-white rounded-lg relative bottom-0 mt-5" type="submit">Register</button>
        </form>
        <Link href='/auth' className='bg-red-500 px-3 rounded-lg text-xl'>Back</Link>
      </div>
    </div>
  )
}