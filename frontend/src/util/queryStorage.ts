import create from 'zustand'

type Query = {
  query: string
  setQuery: (query: string) => void
}

export const queryStorage = create<Query>((set) => ({
  query: '',
  setQuery: (query: string) => set({ query }),
}))
