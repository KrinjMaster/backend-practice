/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Store {
  isLoggedIn: boolean
  changeState: (by: boolean) => void
}

export const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        changeState: (by) => set(() => ({ isLoggedIn: by })),
      }),
      {
        name: 'log-storage',
      }
    )
  )
)
