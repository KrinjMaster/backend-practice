'use client'
import { useStore } from '../store/store'
import { redirect } from 'next/navigation'

export default async function Home() {
  const {isLoggedIn} = useStore()

  if (!isLoggedIn) {
    return redirect('/auth')
  }
  else {
    <h1>Home</h1>
  }
}
