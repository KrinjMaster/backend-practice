'use client'
import { ReactNode, useEffect } from 'react'
import { COOKIEALL } from '@/cookie/cookieAll'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { push } = useRouter()

  useEffect(() => {
    COOKIEALL().then((value) => {
      if (value.toString() === '') {
        push('/auth')
      }
    })
  },[])

  return (
    <div className='flex px-16'>
      <Navbar/>
      {children}
    </div>
  )
}
