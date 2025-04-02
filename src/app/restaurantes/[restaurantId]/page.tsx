"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import FoodCard from "@/app/components/FoodCard";
import Footer from "@/app/components/Footer";

interface Food {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params?.restaurantId as string;
  const [foods, setFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch(`/api/restaurants/${restaurantId}`);
        const data: Food[] = await res.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    }

    if (restaurantId) fetchFoods();
  }, [restaurantId]);

  async function handleAddFood() {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newFood, price: parseFloat(newFood.price) }),
      });
      if (!res.ok) throw new Error("Failed to add food");

      const addedFood = await res.json();
      setFoods([...foods, addedFood]);
      setNewFood({ name: "", description: "", image: "", price: "", category: "" });
    } catch (error) {
      console.error("Error adding food:", error);
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">Menú</h1>
        <div className="flex justify-around flex-wrap p-6 gap-4">
          {foods.length > 0 ? (
            foods.map((food) => <FoodCard key={food.id} product={food} />)
          ) : (
            <p className="text-gray-500">No food items available</p>
          )}
        </div>
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
      </div>
      <Footer />
    </div>
  );
}
