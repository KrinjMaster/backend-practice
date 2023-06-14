'use client'
import { ReactNode, useEffect } from 'react'
import { COOKIEALL } from '@/cookie/cookieAll'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import MobileNavbar from '../../components/mobileNavbar'

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
    <div className='flex max-w-[1024px] mx-auto md:flex-row flex-col'>
      <Navbar/>
      {children}
      <MobileNavbar/>
    </div>
  )
}
