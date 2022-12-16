import create from 'zustand'
import { persist } from 'zustand/middleware'

type Cart = {
  cartStatus: boolean
  changeCart: (cart: Cart['cartStatus']) => void
}

export const cartStorage = create(
  persist<Cart>(
    (set, get) => ({
      cartStatus: false,
      changeCart: (cart) => set({ cartStatus: cart }),
    }),
    {
      name: 'cart',
      getStorage: () => localStorage,
    }
  )
)
