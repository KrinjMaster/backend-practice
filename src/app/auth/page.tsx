'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { useStore } from '../../store/store'
import { useRouter } from 'next/navigation'
import { GET } from '../api/user'

export default function Page() {
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const { push } = useRouter()
  const { changeState, changeUsername } = useStore()

  const handleSignIn = () => {
    changeState(true)
    if (usernameRef.current) {
      changeUsername(usernameRef.current.value)
      push('/')
    }
  }

  const handleMatchPasswords = (response: any) => {
    passwordRef.current?.value === response?.password ? handleSignIn() : alert('Password dont`t match')
  }

  const handleSubmit = () => {
    if (usernameRef.current && passwordRef.current && passwordRef.current.value.length > 0 && usernameRef.current.value.length > 0) {
      GET(usernameRef.current.value)
      .then((response) => response === null ? alert('User doesn`t exist') : handleMatchPasswords(response))
    }
    else {
      alert('Please enter your username and password')
    }
  }

  return (
    <main className="text-white font-bold flex h-screen">
      <div className="w-[300px] flex bg-slate-100/20 h-[350px] m-auto text-3xl rounded-lg align-middle justify-center items-center">
        <form className="flex flex-col w-[250px] text-center m-auto">
          <label>Username:</label>
          <input ref={usernameRef} type="text" className="bg-transparent border-2 rounded-lg text-lg"></input>
          <label>Password:</label>
          <input ref={passwordRef} type="password" className="bg-transparent border-2 rounded-lg text-lg"></input>
          <input className="text-zinc-600 bg-white rounded-lg relative bottom-0 mt-5" type="button" value="Log in" onClick={handleSubmit}/>
          <Link href='/auth/reg' className="text-gray-400 text-sm mt-5 hover:text-white">I don&lsquo;t have an account</Link>
        </form>
      </div>
    </main>
  )
}