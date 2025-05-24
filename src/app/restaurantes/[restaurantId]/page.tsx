"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react"; // <-- import
import Header from "@/app/components/Header";
import FoodCard from "@/app/components/FoodCard";
import Footer from "@/app/components/Footer";

interface Food {
  id: string
  name: string
  description: string
  image: string
  price: number
  category: string
}

function normalizeCategory(cat: string): string {
  return cat.trim().toLowerCase();
}

function normalizeCategory(cat: string): string {
  return cat.trim().toLowerCase();
}

export default function RestaurantPage() {
  const { data: session } = useSession(); // <-- get session
  const isAdmin = session?.user?.role === "admin"; // <-- check if admin

  const params = useParams();
  const restaurantId = params?.restaurantId as string;
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const params = useParams()
  const restaurantId = params?.restaurantId as string

  const [foods, setFoods] = useState<Food[]>([])
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  })

  // Filtros
  const [categoryFilter, setCategoryFilter] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch(`/api/restaurants/${restaurantId}`)
        const data: Food[] = await res.json()
        setFoods(data)
        setFilteredFoods(data)

        const uniqueCategories = [
          ...new Set(data.map((food) => normalizeCategory(food.category))),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching foods:", error)
      }
    }

    if (restaurantId) fetchFoods()
  }, [restaurantId])

  useEffect(() => {
    let filtered = foods

    if (categoryFilter) {
      filtered = filtered.filter(
        (food) => normalizeCategory(food.category) === normalizeCategory(categoryFilter)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((food) => food.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      filtered = filtered.filter((food) => food.price <= Number.parseFloat(maxPrice))
    }

    setFilteredFoods(filtered)
  }, [categoryFilter, minPrice, maxPrice, foods])

  async function handleAddFood() {
    try {
      const normalizedCategory = normalizeCategory(newFood.category);
      const foodToSend = {
        ...newFood,
        price: parseFloat(newFood.price),
        category: normalizedCategory,
      };

      const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodToSend),
      });

      if (!res.ok) throw new Error("Failed to add food");

      const addedFood = await res.json();
      setFoods([...foods, addedFood]);

      if (!categories.includes(normalizedCategory)) {
        setCategories([...categories, normalizedCategory]);
      }

      setNewFood({ name: "", description: "", image: "", price: "", category: "" })
    } catch (error) {
      console.error("Error adding food:", error)
    }
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Menú</h1>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <div className="flex items-center gap-2 text-gray-700 mb-4 md:mb-0">
              <Filter size={18} />
              <h2 className="font-medium">Filtros</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Precio mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

              <input
                type="number"
                placeholder="Precio máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Lista de comidas */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Productos disponibles</h2>
          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoods.map((food) => (
                <FoodCard key={food.id} product={food} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No food items available.</p>
          )}
        </div>

        {/* Formulario para añadir comida SOLO PARA ADMIN */}
        {isAdmin && (
          <div className="p-6 bg-gray-100 border rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold mb-4">Añadir Comida</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newFood.description}
              onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Imagen URL"
              value={newFood.image}
              onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Precio"
              value={newFood.price}
              onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Categoría"
              value={newFood.category}
              onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <button
              onClick={handleAddFood}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Agregar Comida
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
