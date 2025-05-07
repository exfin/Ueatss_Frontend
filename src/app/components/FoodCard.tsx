"use client"

import { useDispatch } from "react-redux"
import { addToCart } from "../../../redux/cart.slice"
import { ShoppingBag, Plus } from "lucide-react"
import { useState } from "react"

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
  const [isHovered, setIsHovered] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    setIsAdded(true)

    // Reset animation after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)

    alert(`¡${product.name} ha sido añadido al carrito!`)
  }

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-emerald-100 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : ""}`}
        ></div>
      </div>
      <div className="p-4 flex flex-col flex-grow bg-gradient-to-br from-white to-emerald-50">
        <h2 className="text-lg font-semibold text-emerald-800 mb-1">{product.name}</h2>
        <p className="text-emerald-600 text-sm mb-3 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-semibold text-emerald-700">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-lg transition-all duration-300 ${isAdded ? "animate-bounce" : ""}`}
          >
            {isAdded ? <ShoppingBag size={16} /> : <Plus size={16} />}
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  )
}
