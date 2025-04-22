"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react"; // <-- import
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
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  // Filtros
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch(`/api/restaurants/${restaurantId}`);
        const data: Food[] = await res.json();
        setFoods(data);
        setFilteredFoods(data);

        const uniqueCategories = [
          ...new Set(data.map((food) => normalizeCategory(food.category))),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    }

    if (restaurantId) fetchFoods();
  }, [restaurantId]);

  useEffect(() => {
    let filtered = foods;

    if (categoryFilter) {
      filtered = filtered.filter(
        (food) => normalizeCategory(food.category) === normalizeCategory(categoryFilter)
      );
    }

    if (minPrice) {
      filtered = filtered.filter((food) => food.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((food) => food.price <= parseFloat(maxPrice));
    }

    setFilteredFoods(filtered);
  }, [categoryFilter, minPrice, maxPrice, foods]);

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

        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
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
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        {/* Lista de comidas */}
        <div className="flex justify-around flex-wrap p-6 gap-4">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => <FoodCard key={food.id} product={food} />)
          ) : (
            <p className="text-gray-500">No food items available</p>
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
  );
}
