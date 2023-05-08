'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { GET } from '../../api/user'

const Reg = () => {
  GET()
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const password1REf = useRef<HTMLInputElement | null>(null)
  const password2Ref = useRef<HTMLInputElement | null>(null)
  
  const [errorState, setShowError] = useState({showError1: false, showError2: false , errorContent1: 'Passwords don\'t match', errorContent2: 'Passwords don\'t match'})


  const handleSubmit = () => {
    if (password1REf.current?.value.length !== undefined) {
      if (password1REf.current?.value.length < 8) {
        setShowError((prevState) => ({
          ...prevState,
          showError2: false,
          showError1: true,
          errorContent1: 'Password must be at least 8 characters'
        }))
      }
      else if (password1REf.current?.value !== password2Ref.current?.value) {
        const ref1 = password2Ref.current
        const ref2 = password1REf.current
        if (ref1 && ref2) {
          ref1.style.borderColor = 'red'
          ref2.style.borderColor = 'red'
          setShowError((prevState) => ({
            ...prevState,
            errorContent1: 'Passwords don\'t match',
            showError1: true,
            showError2: true
          }))
        }
      } else {
        const ref1 = password2Ref.current
        const ref2 = password1REf.current
        if (ref1 && ref2) {
          ref1.style.borderColor = 'white'
          ref2.style.borderColor = 'white'
          setShowError((prevState) => ({
            ...prevState,
            showError1: false,
            showError2: false
          }))
        }
      }
    }
  }

  return (
    <main className="text-white font-bold flex h-screen">
      <div className="w-[300px] flex bg-slate-100/20 h-[350px] m-auto text-3xl rounded-lg align-middle justify-center items-center">
        <form className="flex flex-col w-[250px] text-center m-auto text-2xl">
          <label>Username:</label>
          <input ref={usernameRef} type="text" spellCheck='false' className="bg-transparent rounded-lg text-lg border-2 decoration-transparent"></input>
          <label>Password:</label>
          <input ref={password1REf} type="password" className="bg-transparent border-2 rounded-lg text-lg"></input>
          <h1 className={`text-sm text-red-500 ${errorState.showError1 ? `block` : `hidden` }`}>❌ {errorState.errorContent1}</h1>
          <label>Re-enter password:</label>
          <input ref={password2Ref} type="password" className="bg-transparent rounded-lg text-lg border-2"></input>
          <h1 className={`text-sm text-red-500 ${errorState.showError2 ? `block` : `hidden` }`}>❌ {errorState.errorContent2}</h1>
          <input onClick={handleSubmit} className="text-zinc-600 bg-white rounded-lg relative bottom-0 mt-5" type="button" value="Submit"/>
          <Link href='/auth' className="text-gray-400 text-sm mt-5 hover:text-white">Go back</Link>
        </form>
      </div>
    </main>
  )
}

export default Reg