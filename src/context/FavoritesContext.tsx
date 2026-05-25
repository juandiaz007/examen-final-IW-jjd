import { createContext, useContext, useState } from 'react'
import type { Dragon } from '../services/DragonService'

type FavoritesContextType = {
  favorites: Dragon[];
  addFavorite: (dragon: Dragon) => void;
  removeFavorite: (dragonN: string) => void;
  isFavorite: (dragonN: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Dragon[]>([])

  function addFavorite(dragon: Dragon) {
    if (!isFavorite(dragon.name)) {
      setFavorites([...favorites, dragon])
    }
  }

  function removeFavorite(dragonN: string) {
    setFavorites(favorites.filter(d => d.name !== dragonN))
  }

  function isFavorite(dragonN: string): boolean {
    return favorites.some(d => d.name === dragonN)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }
  return context
}