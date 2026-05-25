import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa'
import { fetchDragonDetail } from '../services/DragonService'
import type { Dragon } from '../services/DragonService'
import { useFavorites } from '../context/FavoritesContext'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function DragonDetail() {
  const { name } = useParams<{ name: string }>()
  const [dragon, setDragon] = useState<Dragon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    if (name) fetchData()
  }, [name])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchDragonDetail(name!)
      setDragon(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />
  if (!dragon) return <p className="text-white p-6">Lo sentimos, no encontramos ese dragón.</p>

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">

      <Link to="/" className="flex items-center gap-2 text-yellow-400 hover:underline mb-6">
        <FaArrowLeft /> Volver
      </Link>

      <div className="max-w-lg mx-auto bg-gray-800 rounded-xl p-6 flex flex-col items-center gap-4">

        {dragon.image && (
          <img src={dragon.image} alt={dragon.name} className="w-48 h-48 object-contain" />
        )}

        <h1 className="text-3xl font-bold text-yellow-400 capitalize">{dragon.name}</h1>

        <p className="text-gray-300 capitalize">Tipo: {dragon.type}</p>

        <div className="grid grid-cols-3 gap-4 w-full mt-2">
          <div className="bg-gray-600 rounded-lg p-3 text-center">
            <p className="text-yellow-200 font-bold text-xl">{dragon.hp}</p>
            <p className="text-gray-300 text-sm">HP</p>
          </div>
          <div className="bg-gray-600 rounded-lg p-3 text-center">
            <p className="text-yellow-200 font-bold text-xl">{dragon.attack}</p>
            <p className="text-gray-300 text-sm">Ataque</p>
          </div>
          <div className="bg-gray-600 rounded-lg p-3 text-center">
            <p className="text-yellow-200 font-bold text-xl">{dragon.defense}</p>
            <p className="text-gray-300 text-sm">Defensa</p>
          </div>
        </div>

        <button
          onClick={() =>
            isFavorite(dragon.name)
              ? removeFavorite(dragon.name)
              : addFavorite(dragon)
          }
          className="flex items-center gap-4 mt-3 px-5 py-2 bg-gray-300 rounded-lg"
        >
          {isFavorite(dragon.name)
            ? <FaHeart className="text-red-200 text-xl" />
            : <FaRegHeart className="text-gray-100 text-xl" />
          }
          {isFavorite(dragon.name) ? 'Eliminar de favoritos' : 'Poner enfavoritos'}
        </button>

      </div>
    </div>
  )
}