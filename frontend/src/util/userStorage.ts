import create from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  nama: string
  email: string
  izin: string
  noTelp: string
  token: string
  id: number
}

interface State {
  user: User | null
  setUser: (user: State['user']) => void
  getUser: () => State['user']
  clearUser: () => void
}

export const userStorage = create(
  persist<State>(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      getUser: () => get().user,
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      getStorage: () => localStorage,
    }
  )
)
