import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Krinj',
  description: 'bruh',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <MiniProfile/> */}
      </body>
    </html>
  )
}
