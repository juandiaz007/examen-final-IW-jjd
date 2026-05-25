export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  return (
    <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg mb-6">
      <span className="text-gray-400 text-xl"></span>
      <input
        type="text"
        placeholder="Buscar dragón..."
        onChange={(e) => onSearch(e.target.value)}
        className="bg-transparent text-white outline-none w-full placeholder-gray-400"
      />
    </div>
  )