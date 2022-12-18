import create from 'zustand'
import { persist } from 'zustand/middleware'

type Cart = {
  cartStatus: number
  changeCart: () => void
}

export const cartStorage = create(
  persist<Cart>(
    (set) => ({
      cartStatus: 0,
      changeCart: () =>
        set((state) => ({ cartStatus: state.cartStatus + 1 })),
    }),
    {
      name: 'cart',
      getStorage: () => localStorage,
    }
  )
)
