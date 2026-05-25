import DragonCard from './DragonCard'
import type { Dragon } from '../services/DragonService'


export default function DragonList({ dragons }: { dragons: Dragon[] }) {
  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {dragons.map((dragon) => (
        
        <DragonCard key={dragon.name} dragon={dragon} />
      ))}
    </div>
  )
}