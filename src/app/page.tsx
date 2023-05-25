'use client'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  if (typeof  window !== 'undefined'){
    const user = localStorage.getItem('user')
    console.log(user)
    if (user === undefined) redirect('/auth')
  }
  return (
    <div>
    </div>
  )
}
