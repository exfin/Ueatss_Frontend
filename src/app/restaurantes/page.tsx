"use client"

<<<<<<< Updated upstream
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/app/components/Header"
import FoodCard from "@/app/components/FoodCard"
import Footer from "@/app/components/Footer"
import { Filter, PlusCircle } from "lucide-react"

interface Food {
=======
import type React from "react"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RestaurantCard from "../components/RestaurantCard"
import { PlusCircle, Store, Search } from "lucide-react"

interface Restaurant {
>>>>>>> Stashed changes
  id: string
  name: string
  description: string
  image: string
<<<<<<< Updated upstream
  price: number
  category: string
}

export default function RestaurantPage() {
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

        // Extraer categorías únicas
        const uniqueCategories = [...new Set(data.map((food) => food.category))]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching foods:", error)
      }
    }

    if (restaurantId) fetchFoods()
  }, [restaurantId])

  useEffect(() => {
    let filtered = foods
=======
  address: string
}

export default function Page() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchRestaurants() {
      setIsLoading(true)
      try {
        const res = await fetch("/api/restaurants")
        const data: Restaurant[] = await res.json()
        // Asegurarse de que data es un array antes de asignarlo
        setRestaurants(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching restaurants:", error)
        // En caso de error, inicializar restaurants como un array vacío
        setRestaurants([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  const handleAddRestaurant = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
>>>>>>> Stashed changes

    if (categoryFilter) {
      filtered = filtered.filter((food) => food.category === categoryFilter)
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
      const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
<<<<<<< Updated upstream
        body: JSON.stringify({ ...newFood, price: Number.parseFloat(newFood.price) }),
      })
      if (!res.ok) throw new Error("Failed to add food")

      const addedFood = await res.json()
      setFoods([...foods, addedFood])

      if (!categories.includes(addedFood.category)) {
        setCategories([...categories, addedFood.category])
=======
        body: JSON.stringify({ name, description, image, address }),
      })

      if (res.ok) {
        const newRestaurant = await res.json()
        // Asegurarse de que restaurants es un array antes de actualizarlo
        setRestaurants((prevRestaurants) =>
          Array.isArray(prevRestaurants) ? [...prevRestaurants, newRestaurant] : [newRestaurant],
        )
        setMessage("¡Restaurante añadido con éxito!")
        setName("")
        setDescription("")
        setImage("")
        setAddress("")
        setIsFormVisible(false)
      } else {
        setMessage("Error al añadir el restaurante")
>>>>>>> Stashed changes
      }

      setNewFood({ name: "", description: "", image: "", price: "", category: "" })
    } catch (error) {
<<<<<<< Updated upstream
      console.error("Error adding food:", error)
    }
  }
=======
      setMessage("Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  // Asegurarse de que restaurants es un array antes de filtrar
  const filteredRestaurants = Array.isArray(restaurants)
    ? restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (restaurant.description && restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (restaurant.address && restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : []
>>>>>>> Stashed changes

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <Header />
<<<<<<< Updated upstream
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

        {/* Formulario para añadir comida */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PlusCircle size={20} className="text-green-500" />
            Añadir Comida
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <input
              type="text"
              placeholder="Descripción"
              value={newFood.description}
              onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <input
              type="text"
              placeholder="Imagen URL"
              value={newFood.image}
              onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <input
              type="number"
              placeholder="Precio"
              value={newFood.price}
              onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <select
              value={newFood.category}
              onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddFood}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <PlusCircle size={18} />
              Agregar Comida
            </button>
          </div>
        </div>
      </div>
=======
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-3xl font-bold mb-4 text-emerald-800 relative inline-block">
            Restaurantes Disponibles
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
          </h1>
          <p className="text-emerald-600 max-w-2xl mx-auto">
            Explora nuestra selección de restaurantes y encuentra tu comida favorita para ordenar
          </p>
        </div>

        {/* Barra de búsqueda y botón de añadir */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-emerald-500" />
            </div>
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-full border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 md:w-auto w-full"
          >
            <PlusCircle size={20} />
            <span>{isFormVisible ? "Cancelar" : "Añadir Restaurante"}</span>
          </button>
        </div>

        {/* Formulario para añadir restaurante */}
        {isFormVisible && (
          <div
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-emerald-100 animate-slide-in"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-emerald-800">
              <Store size={20} className="text-emerald-500" />
              Añadir Restaurante
            </h2>
            <form onSubmit={handleAddRestaurant} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="URL de imagen"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="px-4 py-3 w-full rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {loading ? (
                  <>
                    <span className="animate-pulse">Añadiendo...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} />
                    <span>Añadir Restaurante</span>
                  </>
                )}
              </button>
            </form>
            {message && (
              <div
                className={`mt-4 text-center text-sm p-3 rounded-lg ${message.includes("éxito") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
              >
                {message}
              </div>
            )}
          </div>
        )}

        {/* Estado de carga */}
        {isLoading && (
          <div className="text-center py-12 animate-pulse">
            <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
              <Store size={48} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-medium text-emerald-800">Cargando restaurantes...</h3>
          </div>
        )}

        {/* Lista de restaurantes */}
        {!isLoading && (
          <>
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredRestaurants.map((restaurant, index) => (
                  <div
                    key={restaurant.id}
                    className="animate-slide-in"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="text-center py-12 bg-white rounded-xl shadow-sm border border-emerald-100 animate-slide-in"
                style={{ animationDelay: "0.2s" }}
              >
                {searchTerm ? (
                  <>
                    <div className="text-emerald-500 mb-4">
                      <Search size={48} className="mx-auto opacity-50" />
                    </div>
                    <h3 className="text-xl font-medium text-emerald-800 mb-2">No se encontraron resultados</h3>
                    <p className="text-emerald-600">No hay restaurantes que coincidan con "{searchTerm}"</p>
                  </>
                ) : (
                  <>
                    <div className="text-emerald-500 mb-4">
                      <Store size={48} className="mx-auto opacity-50" />
                    </div>
                    <h3 className="text-xl font-medium text-emerald-800 mb-2">No hay restaurantes disponibles</h3>
                    <p className="text-emerald-600">¡Sé el primero en añadir un restaurante!</p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </main>
>>>>>>> Stashed changes
      <Footer />
    </div>
  )
}
