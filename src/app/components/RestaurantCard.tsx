import Link from "next/link"

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{restaurant.name}</h2>
        <Link href={`/restaurantes/${restaurant.id}`} className="mt-auto">
          <button className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Menú
          </button>
        </Link>
      </div>
    </div>
  )
}
