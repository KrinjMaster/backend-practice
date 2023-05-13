/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
interface IStore {
  isLoggedIn: boolean
  username: string
  changeUsername: (by: string) => void
  changeState: (by: boolean) => void
}

export const useStore = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        username: '',
        changeState: (by) => set(() => ({ isLoggedIn: by })),
        changeUsername: (by) => set(() => ({ username: by })),
      }),
      {
        name: 'log-storage',
      }
    )
  )
)
