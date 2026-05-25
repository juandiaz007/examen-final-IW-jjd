import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DragonDetail from './pages/DragonDetail'
import Favorites from './pages/Favorites'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-400 border-b border-gray-300 px-3 py-5 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-green-200 font-bold text-xl">DragonDex</Link>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-100 hover:text-blue-200 transition-colors">Inicio</Link>
        <Link to="/favorites" className="text-red-200 hover:text-yellow-400 transition-colors">Favoritos</Link>
      </div>
    </nav>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-blue-700">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dragon/:name" element={<DragonDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
