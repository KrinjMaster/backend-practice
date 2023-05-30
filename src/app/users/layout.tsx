'use client'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { COOKIEALL } from '@/api/cookieAll'
import { useRouter } from 'next/navigation'
// import { MiniProfile } from '@/components/MiniProfile'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const { push } = useRouter()

  COOKIEALL().then((value) => {
    if (value.toString() === '') {
      push('/auth')
    }
  })

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
