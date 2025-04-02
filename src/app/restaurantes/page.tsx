"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RestaurantCard from "../components/RestaurantCard";

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
}

export default function Page() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const res = await fetch("/api/restaurants");
        const data: Restaurant[] = await res.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }

    fetchRestaurants();
  }, []);

  const handleAddRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image, address }),
      });

      if (res.ok) {
        const newRestaurant = await res.json();
        setRestaurants([...restaurants, newRestaurant]); // Actualiza la lista en tiempo real
        setMessage("Restaurante añadido con éxito!");
        setName("");
        setDescription("");
        setImage("");
        setAddress("");
      } else {
        setMessage("Error al añadir el restaurante");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-6">Restaurantes</h1>

        <div className="flex flex-wrap justify-center gap-10">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p className="text-gray-500">No restaurants available</p>
          )}

<div className="p-6 mt-10 border rounded-lg shadow-md bg-white w-96">
          <h2 className="text-xl font-bold mb-4">Añadir Restaurante</h2>
          <form onSubmit={handleAddRestaurant} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="URL de imagen"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              {loading ? "Añadiendo..." : "Añadir Restaurante"}
            </button>
          </form>
          {message && <p className="mt-2 text-center text-sm text-gray-600">{message}</p>}
        </div>
        </div>

        {/* Tarjeta para añadir un nuevo restaurante */}
        
      </div>

      <Footer />
    </div>
  );
}
