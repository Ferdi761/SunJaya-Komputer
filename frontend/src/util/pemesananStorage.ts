import create from 'zustand'
import { persist } from 'zustand/middleware'

type Pemesanan = {
  pemesananStatus: number
  changePemesanan: () => void
}

export const pemesananStorage = create(
  persist<Pemesanan>(
    (set) => ({
      pemesananStatus: 0,
      changePemesanan: () =>
        set((state) => ({
          pemesananStatus: state.pemesananStatus + 1,
        })),
    }),
    {
      name: 'pemesanan',
      getStorage: () => localStorage,
    }
  )
)
