import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import DragonList from '../components/DragonList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { fetchDragons } from '../services/DragonService'
import type { Dragon } from '../services/DragonService'

export default function Home() {
  const [dragons, setDragons] = useState<Dragon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchDragons()
      setDragons(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const filtered = dragons.filter((dragon) =>
    dragon.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} onRetry={fetchData} />

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      <h1 className="text-3xl text-yellow-400 font-bold mb-6">DragonDex</h1>

      <SearchBar onSearch={setSearch} />

      {filtered.length === 0
        ? <EmptyState />
        : <DragonList dragons={filtered} />
      }
    </div>
  )
}