"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import RestaurantCard from "../components/RestaurantCard"
import { PlusCircle, Store, Search } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  description: string
  image: string
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

    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      }
    } catch (error) {
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

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <Header />
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
      <Footer />
    </div>
  )
}
