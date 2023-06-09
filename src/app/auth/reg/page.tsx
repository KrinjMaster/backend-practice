'use client'
import { GET } from '@/api/get'
import { REG } from '@/api/registr'
import { ITarget } from '../../../../ITarget'
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
    <div className="text-white font-bold flex h-screen px-5 md:px-0">
      <div className="w-full md:w-[40vw] h-[50vh] bg-[rgb(38,37,37)] flex p-3 m-auto text-3xl rounded-lg align-middle justify-center items-center">
        <form className="flex gap-5 flex-col w-full h-full text-left m-auto text-2xl my-8" id='form' onSubmit={handleSubmit}>
          <input type="text" spellCheck='false' id='username' minLength={3} maxLength={15} placeholder='Username' className="bg-[rgb(29,29,29)] h-12 lg:h-20 placeholder:font-normal font-normal px-2 rounded-lg text-xl lg:text-3xl"></input>
          <input type="password" id='password1' placeholder='Password' className="bg-[rgb(29,29,29)] h-12 lg:h-20 placeholder:font-normal font-normal px-2 rounded-lg text-xl lg:text-3xl"></input>
          <input type="password" id='password2' placeholder='Re-enter password' className="bg-[rgb(29,29,29)] h-12 lg:h-20 placeholder:font-normal font-normal px-2 rounded-lg text-lg lg:text-3xl"></input>
          <div className='flex justify-between w-full'>
            <button className="text-white bg-indigo-600 text-xl md:text-3xl xl:text-4xl p-1.5 w-fit mr-auto mt-auto rounded-lg hover:text-gray-400 transition-all duration-300 ease-in-out font-bold" type="submit">Register</button>
            <Link href='/auth' className="text-white bg-zinc-700 text-xl md:text-3xl xl:text-4xl p-1.5 w-fit ml-auto mt-auto rounded-lg hover:text-red-400 transition-all duration-300 ease-in-out font-bold">Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}