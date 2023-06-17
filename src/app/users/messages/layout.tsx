import MessagesNav from '../../../components/messagesNav'
import { ReactNode } from 'react'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  return (
    <div className='w-full flex flex-col'>
        <MessagesNav/>
        {children}
    </div>
  )
}