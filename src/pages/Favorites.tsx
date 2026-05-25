import { useFavorites } from '../context/FavoritesContext'
import DragonList from '../components/DragonList'
import EmptyState from '../components/EmptyState'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="p-6 min-h-screen bg-purple-500">
      <h1 className="text-3xl text-yellow-400 font-bold mb-6">Mis chiquillos favoritos</h1>

      {favorites.length === 0
        ? <EmptyState />
        : <DragonList dragons={favorites} />
      }
    </div>
  )
}