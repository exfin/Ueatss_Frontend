"use client"

import { useDispatch } from "react-redux"
import { addToCart } from "../../../redux/cart.slice"
import { ShoppingBag } from "lucide-react"

interface Food {
  id: string
  name: string
  image: string
  price: number
  description: string
}

interface FoodCardProps {
  product: Food
}

export default function FoodCard({ product }: FoodCardProps) {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    alert(`¡${product.name} ha sido añadido al carrito!`)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-3 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-semibold text-green-600">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <ShoppingBag size={16} />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  )
}
