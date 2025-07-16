import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

const AnimalCard = ({ animal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={animal.imageUrl || "/placeholder.svg?height=200&width=300"}
        alt={animal.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{animal.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{animal.description}</p>
        <Link
          to={`/donate/${animal._id}`}
          className="inline-flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          <Heart className="h-4 w-4" />
          <span>Donate Now</span>
        </Link>
      </div>
    </div>
  )
}

export default AnimalCard
