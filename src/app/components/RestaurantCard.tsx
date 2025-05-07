import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  description: string
  image: string
  address: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-emerald-100 group transform hover:-translate-y-2">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-white text-sm line-clamp-2">{restaurant.address}</p>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow bg-gradient-to-br from-white to-emerald-50">
        <h2 className="text-xl font-semibold text-emerald-800 mb-2">{restaurant.name}</h2>
        <Link href={`/restaurantes/${restaurant.id}`} className="mt-auto">
          <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
            <span>Ver Menú</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </div>
  )
}
