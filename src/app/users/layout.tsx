'use client'
import { ReactNode, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { COOKIEALL } from '@/cookie/cookieAll'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={`${inter.className} flex flex-row`}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
