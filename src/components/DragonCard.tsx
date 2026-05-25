import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useFavorites } from '../context/FavoritesContext'
import type { Dragon } from '../services/DragonService'

export default function DragonCard({ dragon }: { dragon: Dragon }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  return (
    <div className="bg-gray-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg hover:shadow-yellow-400/20 transition-shadow">

      {dragon.image && (
        <img
          src={dragon.image}
          alt={dragon.name}
          className="w-32 h-32 object-contain mx-auto"
        />
      )}

      
      <Link to={`/dragon/${dragon.name}`}>
        <h2 className="text-yellow-400 text-xl font-bold capitalize hover:underline text-center">
          {dragon.name}
        </h2>
      </Link>

      
      <p className="text-gray-300 text-sm text-center capitalize">{dragon.type}</p>

    
      <button
        onClick={() =>
          isFavorite(dragon.name)
            ? removeFavorite(dragon.name)
            : addFavorite(dragon)
        }
        className="self-end text-2xl mt-auto"
        aria-label="favorito"
      >
        {isFavorite(dragon.name)
          ? <FaHeart className="text-red-400" />
          : <FaRegHeart className="text-gray-300" />
        }
      </button>

    </div>
  )
}