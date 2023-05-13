'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { GET, POST } from '../../api/user'
import { useRouter } from 'next/navigation'

export default function Reg() {
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const password1Ref = useRef<HTMLInputElement | null>(null)
  const password2Ref = useRef<HTMLInputElement | null>(null)
  const { push } = useRouter()
  
  const handleAddUser = (username: string, password: string) => {
    POST(username, password)
    push('/auth')
  }

  const handleSubmit = () => {
    if (password1Ref.current?.value.length !== 0 && usernameRef.current?.value.length !== 0 && usernameRef.current !== null && password2Ref.current && password2Ref.current.value.length < 15) {
      if (password1Ref.current?.value === password2Ref.current.value) {
        GET(usernameRef.current.value)
        .then(response => response === null && usernameRef.current && password1Ref.current
        ? handleAddUser(usernameRef.current.value, password1Ref.current.value)
        : alert('User already exists')
        )
      } else alert('Passwords must match')
    }
    else {
      alert('Password and username must contain characters or password must have no more than 15 characters')
    }
  }

  return (
    <main className="text-white font-bold flex h-screen">
      <div className="w-[300px] flex bg-slate-100/20 h-[350px] m-auto text-3xl rounded-lg align-middle justify-center items-center">
        <form className="flex flex-col w-[250px] text-center m-auto text-2xl">
          <label>Username:</label>
          <input ref={usernameRef} type="text" spellCheck='false' className="bg-transparent rounded-lg text-lg border-2 decoration-transparent"></input>
          <label>Password:</label>
          <input ref={password1Ref} type="password" className="bg-transparent border-2 rounded-lg text-lg"></input>
          <label>Re-enter password:</label>
          <input ref={password2Ref} type="password" className="bg-transparent rounded-lg text-lg border-2"></input>
          <input onClick={handleSubmit} className="text-zinc-600 bg-white rounded-lg relative bottom-0 mt-5" type="button" value="Submit"/>
          <Link href='/auth' className="text-gray-400 text-sm mt-5 hover:text-white">Go back</Link>
        </form>
      </div>
    </main>
  )
}